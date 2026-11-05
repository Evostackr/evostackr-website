#!/usr/bin/env node
/**
 * Official IndexNow API Submitter for Evostackr
 * 
 * Validates deployment status, verifies domain key ownership,
 * and submits canonical URLs to IndexNow search engine endpoints.
 * 
 * Usage:
 *   node scripts/submit-indexnow.mjs
 *   node scripts/submit-indexnow.mjs --verify-only
 *   node scripts/submit-indexnow.mjs --urls=https://evostackr.in/blog/test
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const HOST = 'evostackr.in';
const BASE_URL = `https://${HOST}`;
const HISTORY_FILE = path.join(PROJECT_ROOT, '.indexnow-history.json');
const PRIMARY_INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const BING_INDEXNOW_ENDPOINT = 'https://www.bing.com/indexnow';

// 1. Resolve IndexNow Key
function resolveIndexNowKey() {
  if (process.env.INDEXNOW_KEY && process.env.INDEXNOW_KEY.trim()) {
    return process.env.INDEXNOW_KEY.trim();
  }

  // Fallback: discover key file in public directory
  const publicDir = path.join(PROJECT_ROOT, 'public');
  if (fs.existsSync(publicDir)) {
    const txtFiles = fs.readdirSync(publicDir).filter((f) => f.endsWith('.txt') && !['robots.txt', 'llms.txt', 'llms-full.txt'].includes(f));
    for (const f of txtFiles) {
      const keyCandidate = f.replace('.txt', '').trim();
      if (/^[a-f0-9]{8,128}$/i.test(keyCandidate)) {
        return keyCandidate;
      }
    }
  }

  throw new Error('INDEXNOW_KEY environment variable or public/{key}.txt file not found.');
}

// 2. HTTP Helper with Retries & Timeout
async function fetchWithRetry(url, options = {}, maxRetries = 3, delayMs = 1500) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);
      return res;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise((r) => setTimeout(r, delayMs * attempt));
    }
  }
}

// 3. Deployment Verification: Poll until live site responds HTTP 200
async function verifyLiveUrl(url, maxAttempts = 6, intervalMs = 5000) {
  process.stdout.write(`  Checking ${url} ... `);
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetchWithRetry(url, { method: 'HEAD', headers: { 'User-Agent': 'Evostackr-IndexNow-Verifier' } }, 1);
      if (res.status === 200) {
        console.log(`✓ 200 OK (Attempt ${attempt})`);
        return { ok: true, status: 200 };
      } else {
        if (attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, intervalMs));
        }
      }
    } catch {
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, intervalMs));
      }
    }
  }
  console.log(`✗ FAILED`);
  return { ok: false, status: 404 };
}

// 4. Verify Key File Hosted on Live Domain
async function verifyKeyFile(key) {
  const keyUrl = `${BASE_URL}/${key}.txt`;
  console.log(`[VERIFY] Validating IndexNow key verification file: ${keyUrl}`);
  try {
    const res = await fetchWithRetry(keyUrl, { headers: { 'User-Agent': 'Evostackr-IndexNow-Verifier' } });
    if (res.status !== 200) {
      throw new Error(`Key verification file returned HTTP ${res.status}. Expected HTTP 200.`);
    }
    const body = (await res.text()).trim();
    if (body !== key) {
      throw new Error(`Key file content mismatch. Expected "${key}", but received "${body}".`);
    }
    console.log(`✓ IndexNow key file verified successfully on ${HOST}.`);
    return true;
  } catch (err) {
    console.warn(`[WARN] Live key check failed (${err.message}). Local public/${key}.txt verification will be checked.`);
    const localFile = path.join(PROJECT_ROOT, 'public', `${key}.txt`);
    if (fs.existsSync(localFile) && fs.readFileSync(localFile, 'utf-8').trim() === key) {
      console.log(`✓ Local verification file exists at public/${key}.txt.`);
      return true;
    }
    throw err;
  }
}

// 5. Submit to IndexNow
async function submitToIndexNow(key, urlList) {
  if (urlList.length === 0) {
    console.log('[INFO] No changed URLs to submit. Skipping IndexNow API call.');
    return { submitted: 0, status: 200, response: 'No URLs to submit' };
  }

  const payload = {
    host: HOST,
    key: key,
    keyLocation: `${BASE_URL}/${key}.txt`,
    urlList: urlList,
  };

  console.log(`[SUBMIT] Submitting ${urlList.length} URLs to IndexNow (${PRIMARY_INDEXNOW_ENDPOINT})...`);

  let response;
  let usedEndpoint = PRIMARY_INDEXNOW_ENDPOINT;

  try {
    response = await fetchWithRetry(PRIMARY_INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Evostackr-IndexNow-Client/1.0',
      },
      body: JSON.stringify(payload),
    });
  } catch (primaryErr) {
    console.warn(`[WARN] Primary endpoint failed (${primaryErr.message}). Retrying via Bing endpoint: ${BING_INDEXNOW_ENDPOINT}`);
    usedEndpoint = BING_INDEXNOW_ENDPOINT;
    response = await fetchWithRetry(BING_INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Evostackr-IndexNow-Client/1.0',
      },
      body: JSON.stringify(payload),
    });
  }

  const status = response.status;
  const responseText = await response.text();

  // IndexNow API semantics:
  // 200 OK: URL submitted successfully
  // 202 Accepted: URL received, key pending verification
  if (status === 200 || status === 202) {
    console.log(`✓ IndexNow API accepted ${urlList.length} URLs (HTTP ${status} via ${usedEndpoint}).`);
    return {
      success: true,
      status,
      endpoint: usedEndpoint,
      submitted: urlList.length,
      response: responseText || 'Success',
    };
  } else {
    throw new Error(`IndexNow API error (HTTP ${status}): ${responseText || response.statusText}`);
  }
}

// 6. Update Submission History Cache
function updateHistory(submittedUrls) {
  let history = {};
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    } catch {
      history = {};
    }
  }

  // Retrieve current canonical hashes to persist state
  let hashesByUrl = {};
  try {
    const detectProc = spawnSync(
      process.execPath,
      ['scripts/detect-changed-urls.mjs', '--json', '--all'],
      { cwd: PROJECT_ROOT, encoding: 'utf-8' }
    );
    if (detectProc.status === 0 && detectProc.stdout) {
      const match = detectProc.stdout.trim().match(/\[.*\]/s);
      if (match) {
        const list = JSON.parse(match[0]);
        for (const item of list) {
          if (typeof item === 'object' && item.url) {
            hashesByUrl[item.url] = item.contentHash || null;
          }
        }
      }
    }
  } catch {}

  const now = new Date().toISOString();
  for (const url of submittedUrls) {
    history[url] = {
      lastSubmitted: now,
      contentHash: hashesByUrl[url] || history[url]?.contentHash || null,
      status: 'submitted',
    };
  }

  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
  console.log(`[HISTORY] Recorded ${submittedUrls.length} URLs in ${HISTORY_FILE}`);
}

// 7. Write GitHub Step Summary Markdown
function writeGitHubSummary(key, submittedUrls, result) {
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryFile) return;

  const lines = [
    '# 🚀 Evostackr IndexNow Automated Submission',
    '',
    `**Target Host:** \`${HOST}\`  `,
    `**Key Location:** \`${BASE_URL}/${key}.txt\`  `,
    `**API Endpoint:** \`${result.endpoint || PRIMARY_INDEXNOW_ENDPOINT}\`  `,
    `**API Response Status:** \`HTTP ${result.status}\` (${result.status === 200 ? '200 OK — Published' : '202 Accepted — Verification Pending'})  `,
    `**Submitted URLs Count:** \`${submittedUrls.length}\`  `,
    `**Search Engines Notified:** Microsoft Bing, Yandex, Seznam.cz, Naver, Yep  `,
    '',
    '### Submitted Canonical URLs',
    '| # | Canonical URL | Verification Status | Submission State |',
    '|---|---|---|---|',
  ];

  submittedUrls.forEach((u, idx) => {
    lines.push(`| ${idx + 1} | [\`${u}\`](${u}) | ✅ HTTP 200 OK | 🚀 Submitted |`);
  });

  lines.push('');
  lines.push('> [!NOTE]');
  lines.push('> IndexNow notifies participating search engines immediately for accelerated crawling. Google does not participate in IndexNow and crawls via regular XML Sitemap discovery.');

  fs.appendFileSync(summaryFile, lines.join('\n') + '\n', 'utf-8');
}

// Main Controller
async function main() {
  const isVerifyOnly = process.argv.includes('--verify-only');
  const customUrlsArg = process.argv.find((a) => a.startsWith('--urls='));
  const key = resolveIndexNowKey();

  console.log('========================================================');
  console.log('       EVOSTACKR INDEXNOW SUBMISSION CONTROLLER         ');
  console.log('========================================================');
  console.log(`Host        : ${HOST}`);
  console.log(`Key ID      : ${key.slice(0, 6)}...${key.slice(-4)}`);
  console.log(`Timestamp   : ${new Date().toISOString()}`);
  console.log('--------------------------------------------------------\n');

  // Verify key file
  await verifyKeyFile(key);

  if (isVerifyOnly) {
    console.log('Verification only requested. Exiting cleanly.');
    process.exit(0);
  }

  // Resolve target URLs
  let urlsToSubmit = [];
  if (customUrlsArg) {
    urlsToSubmit = customUrlsArg
      .slice('--urls='.length)
      .split(/[,\n]/)
      .map((u) => u.trim())
      .filter(Boolean);
  } else {
    // Run changed URL detector
    const detectArgs = ['scripts/detect-changed-urls.mjs', '--json', ...process.argv.slice(2)];
    const detectProc = spawnSync(
      process.execPath,
      detectArgs,
      { cwd: PROJECT_ROOT, encoding: 'utf-8' }
    );
    if (detectProc.status === 0 && detectProc.stdout) {
      try {
        const raw = detectProc.stdout.trim();
        const match = raw.match(/\[.*\]/s);
        if (match) {
          const parsed = JSON.parse(match[0]);
          urlsToSubmit = parsed.map((item) => (typeof item === 'string' ? item : item.url));
        }
      } catch (err) {
        console.error('[ERROR] Failed to parse detect-changed-urls output:', err.message);
        urlsToSubmit = [];
      }
    }
  }

  console.log(`\n[PRE-FLIGHT] Verifying public accessibility for ${urlsToSubmit.length} URLs...`);
  const liveVerifiedUrls = [];

  for (const url of urlsToSubmit) {
    // Skip checking home/static root delay, verify live response
    const check = await verifyLiveUrl(url, 5, 3000);
    if (check.ok) {
      liveVerifiedUrls.push(url);
    } else {
      console.warn(`[SKIP] URL not yet live or returned non-200: ${url}`);
    }
  }

  if (liveVerifiedUrls.length === 0) {
    console.log('[INFO] No verified live URLs to submit at this time.');
    process.exit(0);
  }

  // Submit in batches of up to 500 (IndexNow allows up to 10,000)
  const batchSize = 500;
  for (let i = 0; i < liveVerifiedUrls.length; i += batchSize) {
    const batch = liveVerifiedUrls.slice(i, i + batchSize);
    const result = await submitToIndexNow(key, batch);
    updateHistory(batch);
    writeGitHubSummary(key, batch, result);
  }

  console.log('\n========================================================');
  console.log('✓ INDEXNOW AUTOMATION RUN COMPLETED SUCCESSFULLY');
  console.log('========================================================\n');
}

main().catch((err) => {
  console.error('\n[FATAL ERROR]', err.message);
  process.exit(1);
});

