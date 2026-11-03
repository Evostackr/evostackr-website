#!/usr/bin/env node
/**
 * Master E2E Test Suite Runner for Evostackr Blog System
 * 
 * Executes Tier 1 (Feature Coverage), Tier 2 (Boundary & Corner Cases),
 * Tier 3 (Cross-Feature Combinations), and Tier 4 (Real-World Scenarios).
 * 
 * Usage:
 *   node scratch/test-suite/run-tests.mjs
 *   node scratch/test-suite/run-tests.mjs --tier 1
 *   node scratch/test-suite/run-tests.mjs --tier 2
 *   node scratch/test-suite/run-tests.mjs --tier 3
 *   node scratch/test-suite/run-tests.mjs --tier 4
 *   node scratch/test-suite/run-tests.mjs --verbose
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../..');

// 1. Transparent self-spawn with --experimental-strip-types if needed
if (!process.execArgv.includes('--experimental-strip-types')) {
  const result = spawnSync(
    process.execPath,
    ['--experimental-strip-types', __filename, ...process.argv.slice(2)],
    {
      stdio: 'inherit',
      cwd: PROJECT_ROOT,
      env: process.env
    }
  );
  process.exit(result.status ?? 0);
}

// 2. Now running under --experimental-strip-types: Load test suites
import { runTier1Tests } from './tier1-feature-coverage.test.mjs';
import { runTier2Tests } from './tier2-boundary-corner.test.mjs';
import { runTier3Tests } from './tier3-cross-feature.test.mjs';
import { runTier4Tests } from './tier4-real-world.test.mjs';

async function main() {
  const args = process.argv.slice(2);
  const tierArgIdx = args.indexOf('--tier');
  const targetTier = tierArgIdx !== -1 ? parseInt(args[tierArgIdx + 1], 10) : null;
  const isVerbose = args.includes('--verbose');

  const startTime = Date.now();
  console.log('================================================================');
  console.log('       EVOSTACKR BLOG SYSTEM — 4-TIER E2E TEST SUITE            ');
  console.log('================================================================');
  console.log(`Execution Mode : ${targetTier ? `Single Tier (Tier ${targetTier})` : 'Full 4-Tier Verification'}`);
  console.log(`Working Root   : ${PROJECT_ROOT}`);
  console.log(`Node Version   : ${process.version}`);
  console.log(`Timestamp      : ${new Date().toISOString()}`);
  console.log('----------------------------------------------------------------\n');

  const allResults = [];
  const tiers = [
    { number: 1, name: 'Tier 1: Feature Coverage (Category-Partition)', runner: runTier1Tests },
    { number: 2, name: 'Tier 2: Boundary Value & Corner Cases', runner: runTier2Tests },
    { number: 3, name: 'Tier 3: Cross-Feature & Combinatorial Integration', runner: runTier3Tests },
    { number: 4, name: 'Tier 4: Real-World Workloads & Production Invariants', runner: runTier4Tests }
  ];

  for (const tier of tiers) {
    if (targetTier && tier.number !== targetTier) {
      continue;
    }

    console.log(`>>> Executing ${tier.name}...`);
    const tierStart = Date.now();
    try {
      const results = await tier.runner();
      const tierElapsed = Date.now() - tierStart;
      allResults.push(...results);

      for (const res of results) {
        const symbol = res.passed ? '✓ PASS' : '✗ FAIL';
        const color = res.passed ? '\x1b[32m' : '\x1b[31m';
        const reset = '\x1b[0m';
        console.log(`  ${color}${symbol}${reset} [Tier ${res.tier}] ${res.name} (${res.duration}ms)`);
        if (!res.passed) {
          console.log(`    \x1b[33mError:\x1b[0m ${res.error}`);
          if (isVerbose && res.stack) {
            console.log(`    ${res.stack.split('\n').slice(1, 4).join('\n    ')}`);
          }
        }
      }
      console.log(`--- Finished ${tier.name} in ${tierElapsed}ms ---\n`);
    } catch (suiteError) {
      console.error(`\x1b[31m[CRITICAL SUITE ERROR in ${tier.name}]:\x1b[0m ${suiteError.message}`);
      allResults.push({
        name: `Suite Failure: ${tier.name}`,
        tier: tier.number,
        passed: false,
        duration: Date.now() - tierStart,
        error: suiteError.message,
        stack: suiteError.stack
      });
    }
  }

  const totalElapsed = Date.now() - startTime;
  const passedCount = allResults.filter(r => r.passed).length;
  const failedCount = allResults.filter(r => !r.passed).length;
  const totalCount = allResults.length;

  console.log('================================================================');
  console.log('                     TEST EXECUTION SUMMARY                     ');
  console.log('================================================================');
  console.log(`Total Tests Executed : ${totalCount}`);
  console.log(`Passed               : \x1b[32m${passedCount}\x1b[0m`);
  console.log(`Failed               : \x1b[${failedCount > 0 ? '31' : '32'}m${failedCount}\x1b[0m`);
  console.log(`Total Elapsed Time   : ${totalElapsed}ms`);
  console.log('----------------------------------------------------------------');

  // Breakdown by Tier
  for (let t = 1; t <= 4; t++) {
    const tierTests = allResults.filter(r => r.tier === t);
    if (tierTests.length > 0) {
      const p = tierTests.filter(r => r.passed).length;
      const f = tierTests.filter(r => !r.passed).length;
      console.log(`Tier ${t} Summary : ${p} passed, ${f} failed (out of ${tierTests.length})`);
    }
  }
  console.log('================================================================\n');

  // Write structured JSON results
  const reportPath = path.resolve(__dirname, 'test-results.json');
  const reportData = {
    timestamp: new Date().toISOString(),
    totalElapsedMs: totalElapsed,
    summary: {
      total: totalCount,
      passed: passedCount,
      failed: failedCount,
      successRatio: totalCount > 0 ? (passedCount / totalCount) : 0
    },
    results: allResults
  };
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2), 'utf-8');
  console.log(`Structured results saved to: ${reportPath}`);

  if (failedCount > 0) {
    console.log(`\n\x1b[31mStatus: FAILED (${failedCount} assertions failed).\x1b[0m`);
    process.exit(1);
  } else {
    console.log(`\n\x1b[32mStatus: ALL TESTS PASSED SUCCESSFULLY.\x1b[0m`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal Runner Error:', err);
  process.exit(1);
});
