#!/usr/bin/env node
/**
 * Automated Canonical URL Change Detector for Evostackr
 * 
 * Inspects Git commit changes, content data structures, and sitemap state
 * to identify newly published or meaningfully updated canonical production URLs.
 * 
 * Usage:
 *   node scripts/detect-changed-urls.mjs               # Detect changes in HEAD vs HEAD~1
 *   node scripts/detect-changed-urls.mjs --all         # Output all canonical production URLs
 *   node scripts/detect-changed-urls.mjs --commit HEAD # Specify commit or range
 */

import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

if (!process.execArgv.includes('--experimental-strip-types')) {
  const result = spawnSync(
    process.execPath,
    ['--experimental-strip-types', __filename, ...process.argv.slice(2)],
    {
      stdio: ['inherit', 'pipe', 'inherit'],
      cwd: PROJECT_ROOT,
      env: process.env,
      encoding: 'utf-8',
    }
  );
  if (result.stdout) process.stdout.write(result.stdout);
  process.exit(result.status ?? 0);
}

const { blogArticles, blogCategories } = await import('../src/data/blogArticles.ts');

const BASE_URL = 'https://evostackr.in';
const HISTORY_FILE = path.join(PROJECT_ROOT, '.indexnow-history.json');

// Blacklist of non-canonical / private / unindexed URLs
const EXCLUDED_PATHS = new Set([
  '/admin/seo',
  '/system/seo',
  '/optimization',
]);

function hashContent(content) {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
}

function loadHistory() {
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    } catch {
      return {};
    }
  }
  return {};
}

function getAllCanonicalUrls() {
  const urls = [];

  // Core pages
  urls.push({
    url: `${BASE_URL}/`,
    type: 'core',
    identifier: 'home',
  });
  urls.push({
    url: `${BASE_URL}/products`,
    type: 'core',
    identifier: 'products-index',
  });
  urls.push({
    url: `${BASE_URL}/services`,
    type: 'core',
    identifier: 'services-index',
  });
  urls.push({
    url: `${BASE_URL}/services/google-play-closed-testing`,
    type: 'service',
    identifier: 'google-play-closed-testing',
  });
  urls.push({
    url: `${BASE_URL}/store`,
    type: 'store',
    identifier: 'store-index',
  });
  urls.push({
    url: `${BASE_URL}/store/evoedu-pro`,
    type: 'store',
    identifier: 'evoedu-pro',
  });
  urls.push({
    url: `${BASE_URL}/return-policy`,
    type: 'core',
    identifier: 'return-policy',
  });
  urls.push({
    url: `${BASE_URL}/blog`,
    type: 'blog',
    identifier: 'blog-index',
  });

  // Category pages
  for (const cat of blogCategories) {
    urls.push({
      url: `${BASE_URL}/blog/category/${cat.slug}`,
      type: 'category',
      identifier: `category-${cat.slug}`,
    });
  }

  // Articles
  for (const article of blogArticles) {
    urls.push({
      url: `${BASE_URL}/blog/${article.slug}`,
      type: 'article',
      identifier: `article-${article.slug}`,
      lastmod: article.modifiedDate || article.publishedDate,
      contentHash: hashContent(JSON.stringify({
        title: article.title,
        headline: article.headline,
        excerpt: article.excerpt,
        directAnswerSnippet: article.directAnswerSnippet,
        faqs: article.faqs,
      })),
    });
  }

  return urls;
}

function detectChangedUrls() {
  const args = process.argv.slice(2);
  const isJson = args.includes('--json');
  const isForceAll = args.includes('--all') || process.env.INDEXNOW_FORCE_ALL === 'true';
  const customUrlsArg = args.find((a) => a.startsWith('--urls='));

  const log = (...msg) => {
    if (!isJson) console.log(...msg);
  };

  if (customUrlsArg) {
    const rawList = customUrlsArg.slice('--urls='.length).split(/[,\n]/);
    const cleaned = rawList
      .map((u) => u.trim())
      .filter((u) => u.startsWith(BASE_URL) && !EXCLUDED_PATHS.has(new URL(u).pathname));
    return [...new Set(cleaned)];
  }

  const allCanonicals = getAllCanonicalUrls();

  if (isForceAll) {
    log('[INFO] --all flag active: Including all canonical production URLs.');
    return allCanonicals;
  }

  // 1. Inspect Git diff
  let gitDiffFiles = [];
  try {
    const gitRange = process.env.GIT_DIFF_RANGE || 'HEAD~1...HEAD';
    const gitDiff = spawnSync('git', ['diff', '--name-only', gitRange], {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
    });
    if (gitDiff.status === 0 && gitDiff.stdout) {
      gitDiffFiles = gitDiff.stdout.trim().split(/\r?\n/).filter(Boolean);
    }
  } catch (err) {
    if (!isJson) console.warn('[WARN] Could not retrieve git diff, falling back to content hash comparison:', err.message);
  }

  log(`[INFO] Git changed files (${gitDiffFiles.length}):`, gitDiffFiles.join(', ') || 'None detected via git diff');

  const history = loadHistory();
  const changedUrls = [];

  // Check article additions and modifications
  for (const item of allCanonicals) {
    if (EXCLUDED_PATHS.has(new URL(item.url).pathname)) continue;

    const previousEntry = history[item.url];
    const isNew = !previousEntry;
    const isModified = Boolean(previousEntry && item.contentHash && previousEntry.contentHash && previousEntry.contentHash !== item.contentHash);

    // Check git file affiliation
    let gitTriggered = false;
    if (gitDiffFiles.length > 0) {
      if (item.type === 'article' && gitDiffFiles.some((f) => f.includes('blogArticles.ts') || f.includes(item.identifier))) {
        gitTriggered = isNew || isModified;
      } else if (item.type === 'service' && gitDiffFiles.some((f) => f.includes('services.ts') || f.includes('ServicesPage.tsx'))) {
        gitTriggered = true;
      } else if (item.type === 'store' && gitDiffFiles.some((f) => f.includes('storeProducts.ts') || f.includes('Store'))) {
        gitTriggered = true;
      }
    }

    if (isNew || isModified || gitTriggered) {
      changedUrls.push({
        url: item.url,
        reason: isNew ? 'new_content' : isModified ? 'content_modified' : 'git_changed',
        type: item.type,
      });
    }
  }

  return [...new Map(changedUrls.map((u) => [u.url, u])).values()];
}

const detected = detectChangedUrls();

// Support --json or pipe output
const isJsonOutput = process.argv.includes('--json');
const outputPathArg = process.argv.find((a) => a.startsWith('--output='));

if (outputPathArg) {
  const outPath = path.resolve(PROJECT_ROOT, outputPathArg.slice('--output='.length));
  fs.writeFileSync(outPath, JSON.stringify(detected, null, 2), 'utf-8');
  console.log(`[SUCCESS] Wrote ${detected.length} detected URLs to ${outPath}`);
} else if (isJsonOutput) {
  console.log(JSON.stringify(detected));
} else {
  console.log('\n========================================================');
  console.log(`          EVOSTACKR URL DETECTION REPORT                `);
  console.log('========================================================');
  console.log(`Total URLs Eligible for Submission: ${detected.length}\n`);
  detected.forEach((entry, idx) => {
    const urlStr = typeof entry === 'string' ? entry : entry.url;
    const reason = typeof entry === 'object' ? ` (${entry.reason})` : '';
    console.log(`  ${idx + 1}. ${urlStr}${reason}`);
  });
  console.log('========================================================\n');
}

