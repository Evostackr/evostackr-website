#!/usr/bin/env node
/**
 * Automated Content Feed Synchronizer for Evostackr
 * 
 * Synchronizes public/sitemap.xml, public/rss.xml, and public/llms.txt
 * directly from typed content sources in src/data/*.ts.
 * 
 * Usage:
 *   node scripts/sync-content-feeds.mjs           # Updates all feeds
 *   node scripts/sync-content-feeds.mjs --check   # Validates feeds match current content
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// 1. Transparent self-spawn with --experimental-strip-types for TypeScript imports
if (!process.execArgv.includes('--experimental-strip-types')) {
  const result = spawnSync(
    process.execPath,
    ['--experimental-strip-types', __filename, ...process.argv.slice(2)],
    {
      stdio: 'inherit',
      cwd: PROJECT_ROOT,
      env: process.env,
    }
  );
  process.exit(result.status ?? 0);
}

// 2. Load typed content data
const { blogArticles, blogCategories } = await import('../src/data/blogArticles.ts');
const { products } = await import('../src/data/products.ts');
const { services } = await import('../src/data/services.ts');
const { storeProducts } = await import('../src/data/storeProducts.ts');

const BASE_URL = 'https://evostackr.in';
const isCheckOnly = process.argv.includes('--check');

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDateIso(dateStr) {
  try {
    return new Date(dateStr).toISOString().split('T')[0];
  } catch {
    return '2026-11-03';
  }
}

// 3. Generate Sitemap XML
function buildSitemapXml() {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ];

  // Core Static Pages
  const staticPages = [
    {
      loc: `${BASE_URL}/`,
      lastmod: '2026-11-05',
      changefreq: 'daily',
      priority: '1.0',
      image: {
        loc: `${BASE_URL}/evostackr-logo.png`,
        title: 'Evostackr — Independent Software Products and Custom Engineering',
        caption: 'Official visual identity of Evostackr',
      },
    },
    {
      loc: `${BASE_URL}/products`,
      lastmod: '2026-11-05',
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      loc: `${BASE_URL}/services`,
      lastmod: '2026-11-05',
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      loc: `${BASE_URL}/services/google-play-closed-testing`,
      lastmod: '2026-11-05',
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      loc: `${BASE_URL}/store`,
      lastmod: '2026-11-05',
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      loc: `${BASE_URL}/store/evoedu-pro`,
      lastmod: '2026-11-05',
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      loc: `${BASE_URL}/blog`,
      lastmod: '2026-11-05',
      changefreq: 'daily',
      priority: '0.9',
      image: {
        loc: `${BASE_URL}/images/blog/agentic-ai-architecture-enterprise-guide/banner.png`,
        title: 'Evostackr Engineering Blog & Architecture Blueprints',
        caption: 'Authoritative engineering blueprints, Play Console testing, and distributed architecture guides',
      },
    },
  ];

  for (const page of staticPages) {
    lines.push('  <url>');
    lines.push(`    <loc>${page.loc}</loc>`);
    lines.push(`    <lastmod>${page.lastmod}</lastmod>`);
    lines.push(`    <changefreq>${page.changefreq}</changefreq>`);
    lines.push(`    <priority>${page.priority}</priority>`);
    if (page.image) {
      lines.push('    <image:image>');
      lines.push(`      <image:loc>${page.image.loc}</image:loc>`);
      lines.push(`      <image:title>${escapeXml(page.image.title)}</image:title>`);
      lines.push(`      <image:caption>${escapeXml(page.image.caption)}</image:caption>`);
      lines.push('    </image:image>');
    }
    lines.push('  </url>');
  }

  // Categories
  for (const cat of blogCategories) {
    lines.push('  <url>');
    lines.push(`    <loc>${BASE_URL}/blog/category/${cat.slug}</loc>`);
    lines.push('    <lastmod>2026-11-05</lastmod>');
    lines.push('    <changefreq>weekly</changefreq>');
    lines.push('    <priority>0.8</priority>');
    lines.push('  </url>');
  }

  // Published Blog Articles
  for (const article of blogArticles) {
    lines.push('  <url>');
    lines.push(`    <loc>${BASE_URL}/blog/${article.slug}</loc>`);
    lines.push(`    <lastmod>${formatDateIso(article.modifiedDate || article.publishedDate)}</lastmod>`);
    lines.push('    <changefreq>monthly</changefreq>');
    lines.push('    <priority>0.8</priority>');
    if (article.featuredImage) {
      lines.push('    <image:image>');
      lines.push(`      <image:loc>${BASE_URL}${article.featuredImage.url}</image:loc>`);
      lines.push(`      <image:title>${escapeXml(article.title)}</image:title>`);
      lines.push(`      <image:caption>${escapeXml(article.featuredImage.caption || article.featuredImage.alt)}</image:caption>`);
      lines.push('    </image:image>');
    }
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  return lines.join('\n') + '\n';
}

// 4. Generate RSS XML
function buildRssXml() {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>Evostackr — Engineering Blog &amp; Product Blueprints</title>',
    `    <link>${BASE_URL}/blog</link>`,
    '    <description>Authoritative engineering guides, multi-agent AI architecture blueprints, Google Play Closed Testing playbooks, and SaaS system designs from Evostackr.</description>',
    '    <language>en-us</language>',
    '    <lastBuildDate>Thu, 05 Nov 2026 03:00:00 GMT</lastBuildDate>',
    `    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    '    <managingEditor>support@evostackr.in (Evostackr)</managingEditor>',
    '    <webMaster>support@evostackr.in (Evostackr)</webMaster>',
    '    <docs>https://www.rssboard.org/rss-specification</docs>',
  ];

  for (const article of blogArticles) {
    lines.push('    <item>');
    lines.push(`      <title>${escapeXml(article.title)}</title>`);
    lines.push(`      <link>${BASE_URL}/blog/${article.slug}</link>`);
    lines.push(`      <guid isPermaLink="true">${BASE_URL}/blog/${article.slug}</guid>`);
    lines.push(`      <pubDate>${article.rfcPubDate}</pubDate>`);
    lines.push(`      <description><![CDATA[${article.excerpt}]]></description>`);
    lines.push(`      <category>${escapeXml(article.categoryName)}</category>`);
    lines.push('    </item>');
  }

  lines.push('  </channel>');
  lines.push('</rss>');
  return lines.join('\n') + '\n';
}

// 5. Generate llms.txt for AI Search Engines
function buildLlmsTxt() {
  const lines = [
    '# Evostackr',
    '> Independent Software Products & Custom Digital Engineering',
    '',
    'Evostackr is an independent software studio building proprietary developer utilities, mobile systems, privacy tools, and delivering custom SaaS, cloud architecture, and Google Play Closed Testing services.',
    '',
    '## Core Services & Products',
    `- [Evostackr Homepage](${BASE_URL}/): Software engineering studio, products, and commercial services.`,
    `- [Google Play Closed Testing Service](${BASE_URL}/services/google-play-closed-testing): 20 verified opt-in testers for 14 continuous days meeting Google Play Console personal account requirements.`,
    `- [EvoEdu Pro](${BASE_URL}/store/evoedu-pro): Institutional school, college, and university management ERP.`,
    `- [Products Portfolio](${BASE_URL}/products): SMS Campaign Manager, Fabricate, WhatsApp Past Member Extractor, 24IDChat, TempEmailFree, Pink PDF, CodeVault.`,
    '',
    '## Engineering Blog & Architectural Blueprints',
    `- [Blog Index](${BASE_URL}/blog): Authoritative technical guides and system design specifications.`,
    '',
  ];

  for (const article of blogArticles) {
    lines.push(`### [${article.title}](${BASE_URL}/blog/${article.slug})`);
    lines.push(`- **Category**: ${article.categoryName}`);
    lines.push(`- **Published**: ${article.publishedDate.split('T')[0]}`);
    lines.push(`- **Summary**: ${article.excerpt}`);
    lines.push('');
  }

  return lines.join('\n') + '\n';
}

// Main execution
const sitemapPath = path.join(PROJECT_ROOT, 'public/sitemap.xml');
const rssPath = path.join(PROJECT_ROOT, 'public/rss.xml');
const llmsPath = path.join(PROJECT_ROOT, 'public/llms.txt');

const newSitemap = buildSitemapXml();
const newRss = buildRssXml();
const newLlms = buildLlmsTxt();

if (isCheckOnly) {
  let hasDiff = false;
  const currentSitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf-8') : '';
  const currentRss = fs.existsSync(rssPath) ? fs.readFileSync(rssPath, 'utf-8') : '';
  const currentLlms = fs.existsSync(llmsPath) ? fs.readFileSync(llmsPath, 'utf-8') : '';

  if (currentSitemap.trim() !== newSitemap.trim()) {
    console.warn('[WARN] sitemap.xml is out of sync with content data.');
    hasDiff = true;
  }
  if (currentRss.trim() !== newRss.trim()) {
    console.warn('[WARN] rss.xml is out of sync with content data.');
    hasDiff = true;
  }
  if (currentLlms.trim() !== newLlms.trim()) {
    console.warn('[WARN] llms.txt is out of sync with content data.');
    hasDiff = true;
  }

  if (hasDiff) {
    console.error('Feeds require synchronization. Run "node scripts/sync-content-feeds.mjs" to update.');
    process.exit(1);
  } else {
    console.log('✓ All content feeds (sitemap.xml, rss.xml, llms.txt) are synchronized with source data.');
    process.exit(0);
  }
} else {
  fs.writeFileSync(sitemapPath, newSitemap, 'utf-8');
  fs.writeFileSync(rssPath, newRss, 'utf-8');
  fs.writeFileSync(llmsPath, newLlms, 'utf-8');
  console.log(`✓ Synchronized ${blogArticles.length} blog articles, ${blogCategories.length} categories, and core pages to:`);
  console.log(`  - ${sitemapPath}`);
  console.log(`  - ${rssPath}`);
  console.log(`  - ${llmsPath}`);
}
