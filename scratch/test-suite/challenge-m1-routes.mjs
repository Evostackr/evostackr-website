/**
 * Empirical Challenger Test Harness: Milestone 1
 * Technical Blog Architecture & Routing Integration Stress Suite
 * 
 * Target: Evostackr Blog Launch — Milestone 1
 * Author: Challenger 1 (critic, specialist)
 * Date: 2026-11-03
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const PROJECT_ROOT = path.resolve(import.meta.dirname, '../..');

class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new AssertionError(message, condition, true);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    const msg = message || `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`;
    throw new AssertionError(msg, actual, expected);
  }
}

function assertMatch(str, regex, message) {
  if (typeof str !== 'string' || !regex.test(str)) {
    const msg = message || `Expected "${str}" to match ${regex}`;
    throw new AssertionError(msg, str, regex.toString());
  }
}

async function importProjectModule(relPath) {
  const fullPath = path.resolve(PROJECT_ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File does not exist: ${relPath}`);
  }
  return await import(pathToFileURL(fullPath).href);
}

// Router simulation mirroring src/App.tsx
function simulateAppRouter(path, getArticleBySlug) {
  const normalizedPath = path.replace(/\/$/, '') || '/';
  const isBlogIndex = normalizedPath === '/blog';
  const isBlogCategory = normalizedPath.startsWith('/blog/category/');
  const categorySlug = isBlogCategory
    ? normalizedPath.slice('/blog/category/'.length).replace(/\/$/, '')
    : null;

  const isBlogArticleRoute =
    normalizedPath.startsWith('/blog/') && !normalizedPath.startsWith('/blog/category/');
  const articleSlug = isBlogArticleRoute
    ? normalizedPath.slice('/blog/'.length).replace(/\/$/, '')
    : null;
  const matchedArticle = articleSlug ? getArticleBySlug(articleSlug) : null;

  return {
    normalizedPath,
    isBlogIndex,
    isBlogCategory,
    categorySlug,
    isBlogArticleRoute,
    articleSlug,
    matchedArticle,
  };
}

async function runEmpiricalHarness() {
  console.log('================================================================');
  console.log('   CHALLENGER 1 — MILESTONE 1 EMPIRICAL ADVERSARIAL HARNESS    ');
  console.log('================================================================');
  console.log(`Execution Root : ${PROJECT_ROOT}`);
  console.log(`Node Version   : ${process.version}`);
  console.log(`Timestamp      : ${new Date().toISOString()}`);
  console.log('----------------------------------------------------------------\n');

  let passedTests = 0;
  let failedTests = 0;
  const failures = [];

  async function test(suite, name, fn) {
    const start = Date.now();
    try {
      await fn();
      const duration = Date.now() - start;
      console.log(`  ✓ PASS [${suite}] ${name} (${duration}ms)`);
      passedTests++;
    } catch (err) {
      const duration = Date.now() - start;
      console.error(`  ✗ FAIL [${suite}] ${name} (${duration}ms)`);
      console.error(`    ${err.message}`);
      passedTests;
      failedTests++;
      failures.push({ suite, name, error: err.message, stack: err.stack });
    }
  }

  // Load modules
  const blogModule = await importProjectModule('src/data/blogArticles.ts');
  const productsModule = await importProjectModule('src/data/products.ts');
  const servicesModule = await importProjectModule('src/data/services.ts');
  const storeModule = await importProjectModule('src/data/storeProducts.ts');

  const {
    blogArticles,
    getAllArticles,
    getArticleBySlug,
    getArticlesByCategory,
    getAllCategories,
    getRelatedArticles,
  } = blogModule;

  // ==========================================================================
  // SECTION 1: ARTICLE DATA CONTRACT INVARIANTS (STRESS & COMPLETENESS)
  // ==========================================================================
  console.log('>>> [Suite 1] Article Data Contract Invariants...');

  await test('DataContract', 'Invariant: Exactly 8 articles present in data layer', () => {
    assertEqual(blogArticles.length, 8, 'Must have exactly 8 articles');
  });

  await test('DataContract', 'Invariant: Slug uniqueness across all articles', () => {
    const slugs = blogArticles.map((a) => a.slug);
    const uniqueSlugs = new Set(slugs);
    assertEqual(uniqueSlugs.size, slugs.length, 'All article slugs must be strictly unique');
  });

  await test('DataContract', 'Invariant: Title uniqueness across all articles', () => {
    const titles = blogArticles.map((a) => a.title);
    const uniqueTitles = new Set(titles);
    assertEqual(uniqueTitles.size, titles.length, 'All article titles must be strictly unique');
  });

  await test('DataContract', 'Invariant: Strict schema verification across all 8 articles', () => {
    const validProductSlugs = [
      ...productsModule.products.map((p) => p.id),
      ...storeModule.storeProducts.map((p) => p.slug),
    ];
    const validServiceSlugs = servicesModule.services.map((s) => s.slug);

    blogArticles.forEach((article, index) => {
      const pfx = `Article #${index + 1} (${article.slug || 'unknown'})`;

      // Slugs
      assert(typeof article.slug === 'string' && article.slug.trim().length > 0, `${pfx}: slug must be non-empty`);
      assertMatch(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${pfx}: slug must be strict lowercase kebab-case`);

      // Titles & Excerpts
      assert(typeof article.title === 'string' && article.title.trim().length >= 10, `${pfx}: title >= 10 chars`);
      assert(typeof article.headline === 'string' && article.headline.trim().length >= 10, `${pfx}: headline >= 10 chars`);
      assert(typeof article.excerpt === 'string' && article.excerpt.trim().length >= 20, `${pfx}: excerpt >= 20 chars`);

      // Category
      assert(typeof article.category === 'string' && article.category.length > 0, `${pfx}: category required`);
      assert(typeof article.categorySlug === 'string' && article.categorySlug.length > 0, `${pfx}: categorySlug required`);
      assertMatch(article.categorySlug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${pfx}: categorySlug kebab-case`);
      assert(typeof article.categoryName === 'string' && article.categoryName.length > 0, `${pfx}: categoryName required`);

      // Tags
      assert(Array.isArray(article.tags) && article.tags.length >= 2, `${pfx}: tags array >= 2 items`);
      article.tags.forEach((tag, tIdx) => {
        assert(typeof tag === 'string' && tag.trim().length > 0, `${pfx}: tag[${tIdx}] must be non-empty`);
      });

      // Dates
      assert(typeof article.publishedDate === 'string' && !isNaN(Date.parse(article.publishedDate)), `${pfx}: valid publishedDate`);
      assert(typeof article.modifiedDate === 'string' && !isNaN(Date.parse(article.modifiedDate)), `${pfx}: valid modifiedDate`);
      assert(typeof article.rfcPubDate === 'string' && !isNaN(Date.parse(article.rfcPubDate)), `${pfx}: valid rfcPubDate`);

      // Author
      assert(article.author && typeof article.author === 'object', `${pfx}: author object required`);
      assert(typeof article.author.name === 'string' && article.author.name.trim().length > 0, `${pfx}: author.name required`);
      assert(typeof article.author.role === 'string' && article.author.role.trim().length > 0, `${pfx}: author.role required`);
      assert(typeof article.author.avatar === 'string' && article.author.avatar.startsWith('/'), `${pfx}: author.avatar path`);

      // Metrics
      assert(typeof article.readTimeMinutes === 'number' && article.readTimeMinutes > 0 && article.readTimeMinutes <= 60, `${pfx}: readTimeMinutes > 0 and <= 60`);
      assert(typeof article.wordCount === 'number' && article.wordCount >= 500 && article.wordCount <= 10000, `${pfx}: wordCount between 500 and 10000`);

      // Featured Image
      assert(article.featuredImage && typeof article.featuredImage === 'object', `${pfx}: featuredImage required`);
      assert(typeof article.featuredImage.url === 'string' && article.featuredImage.url.startsWith('/'), `${pfx}: featuredImage.url valid`);
      assert(typeof article.featuredImage.alt === 'string' && article.featuredImage.alt.trim().length >= 5, `${pfx}: featuredImage.alt length`);
      assert(typeof article.featuredImage.caption === 'string' && article.featuredImage.caption.trim().length > 0, `${pfx}: featuredImage.caption length`);
      assertEqual(article.featuredImage.width, 1200, `${pfx}: featuredImage width 1200`);
      assertEqual(article.featuredImage.height, 675, `${pfx}: featuredImage height 675`);

      // Contextual Images (exactly 3)
      assert(Array.isArray(article.contextualImages), `${pfx}: contextualImages must be array`);
      assertEqual(article.contextualImages.length, 3, `${pfx}: exactly 3 contextual images required`);
      article.contextualImages.forEach((img, iIdx) => {
        assert(typeof img.url === 'string' && img.url.startsWith('/'), `${pfx}: contextual[${iIdx}].url valid`);
        assert(typeof img.alt === 'string' && img.alt.trim().length >= 5, `${pfx}: contextual[${iIdx}].alt valid`);
        assertEqual(img.width, 1200, `${pfx}: contextual[${iIdx}] width 1200`);
        assertEqual(img.height, 675, `${pfx}: contextual[${iIdx}] height 675`);
      });

      // Direct Answer Snippet (AEO / GEO quick answer)
      assert(typeof article.directAnswerSnippet === 'string', `${pfx}: directAnswerSnippet must be string`);
      const words = article.directAnswerSnippet.trim().split(/\s+/).length;
      assert(words >= 25 && words <= 120, `${pfx}: directAnswerSnippet word count should be concise (found ${words})`);

      // Table of Contents
      assert(Array.isArray(article.tableOfContents) && article.tableOfContents.length >= 3, `${pfx}: TOC must have >= 3 items`);
      article.tableOfContents.forEach((item, itemIdx) => {
        assert(typeof item.id === 'string' && item.id.length > 0, `${pfx}: TOC[${itemIdx}].id non-empty`);
        assert(typeof item.title === 'string' && item.title.length > 0, `${pfx}: TOC[${itemIdx}].title non-empty`);
        assert(item.level === 2 || item.level === 3, `${pfx}: TOC[${itemIdx}].level must be 2 or 3`);
      });

      // Cross links validation
      if (article.relatedProductSlug) {
        assert(
          validProductSlugs.includes(article.relatedProductSlug),
          `${pfx}: relatedProductSlug "${article.relatedProductSlug}" must exist in product catalog`
        );
      }
      if (article.relatedServiceSlug) {
        assert(
          validServiceSlugs.includes(article.relatedServiceSlug),
          `${pfx}: relatedServiceSlug "${article.relatedServiceSlug}" must exist in service catalog`
        );
      }

      // FAQs
      if (article.faqs) {
        assert(Array.isArray(article.faqs) && article.faqs.length >= 1, `${pfx}: faqs array non-empty`);
        article.faqs.forEach((faq, fIdx) => {
          assert(typeof faq.question === 'string' && faq.question.trim().length > 0, `${pfx}: faq[${fIdx}].question`);
          assert(typeof faq.answer === 'string' && faq.answer.trim().length > 0, `${pfx}: faq[${fIdx}].answer`);
        });
      }
    });
  });

  // ==========================================================================
  // SECTION 2: ROUTE RESOLUTION UNDER HIGH PERMUTATION
  // ==========================================================================
  console.log('\n>>> [Suite 2] Route Resolution Permutations...');

  await test('Routing', 'Route resolution: /blog index route and trailing slash normalization', () => {
    const res1 = simulateAppRouter('/blog', getArticleBySlug);
    assert(res1.isBlogIndex, '/blog must trigger isBlogIndex');
    assert(!res1.isBlogArticleRoute, '/blog must not trigger isBlogArticleRoute');
    assert(!res1.isBlogCategory, '/blog must not trigger isBlogCategory');

    const res2 = simulateAppRouter('/blog/', getArticleBySlug);
    assert(res2.isBlogIndex, '/blog/ must normalize to /blog and trigger isBlogIndex');
    assert(!res2.isBlogArticleRoute, '/blog/ must not trigger isBlogArticleRoute');
  });

  await test('Routing', 'Route resolution: All 8 valid article slugs resolve deterministically', () => {
    blogArticles.forEach((article) => {
      const res = simulateAppRouter(`/blog/${article.slug}`, getArticleBySlug);
      assert(res.isBlogArticleRoute, `/blog/${article.slug} must trigger isBlogArticleRoute`);
      assert(!res.isBlogIndex, 'Must not trigger isBlogIndex');
      assert(!res.isBlogCategory, 'Must not trigger isBlogCategory');
      assertEqual(res.articleSlug, article.slug, 'Article slug must match parameter');
      assert(res.matchedArticle !== null && res.matchedArticle !== undefined, 'Matched article must exist');
      assertEqual(res.matchedArticle.slug, article.slug, 'Matched article slug must match exactly');
    });
  });

  await test('Routing', 'Route resolution: Trailing slashes on article routes normalize cleanly', () => {
    blogArticles.forEach((article) => {
      const res = simulateAppRouter(`/blog/${article.slug}/`, getArticleBySlug);
      assert(res.isBlogArticleRoute, `/blog/${article.slug}/ must trigger isBlogArticleRoute`);
      assertEqual(res.articleSlug, article.slug, 'Trailing slash must be stripped from articleSlug');
      assert(res.matchedArticle !== null, 'Matched article must exist despite trailing slash');
    });
  });

  await test('Routing', 'Route resolution: Slug case-insensitivity (UPPERCASE and Mixed-case)', () => {
    blogArticles.forEach((article) => {
      const upperSlug = article.slug.toUpperCase();
      const mixedSlug = article.slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join('-');

      const foundUpper = getArticleBySlug(upperSlug);
      assert(foundUpper !== undefined, `getArticleBySlug should resolve UPPERCASE slug "${upperSlug}"`);
      assertEqual(foundUpper?.slug, article.slug, 'Uppercase slug must resolve to canonical article');

      const foundMixed = getArticleBySlug(mixedSlug);
      assert(foundMixed !== undefined, `getArticleBySlug should resolve Mixed-case slug "${mixedSlug}"`);
      assertEqual(foundMixed?.slug, article.slug, 'Mixed-case slug must resolve to canonical article');
    });
  });

  await test('Routing', 'Route resolution: Whitespace padded slugs resolve safely via trim()', () => {
    blogArticles.forEach((article) => {
      const paddedSlug = `   ${article.slug}   \t`;
      const found = getArticleBySlug(paddedSlug);
      assert(found !== undefined, `getArticleBySlug should resolve whitespace-padded slug`);
      assertEqual(found?.slug, article.slug, 'Padded slug must resolve to canonical article');
    });
  });

  await test('Routing', 'Route resolution: Non-existent slugs safely return undefined (no throw)', () => {
    const bogusSlugs = [
      'non-existent-article-slug',
      'quantum-computing-in-space',
      'random-12345',
      'blog-post-99',
      'favicon.ico',
      'sitemap.xml',
    ];

    bogusSlugs.forEach((slug) => {
      const res = simulateAppRouter(`/blog/${slug}`, getArticleBySlug);
      assert(res.isBlogArticleRoute, 'Unknown path starting with /blog/ marks article route');
      assertEqual(res.matchedArticle, undefined, `Non-existent slug "${slug}" must yield undefined article`);
    });
  });

  await test('Routing', 'Route resolution: Falsy, empty, and null input resilience', () => {
    // getArticleBySlug should handle all edge cases gracefully without crashing
    assertEqual(getArticleBySlug(''), undefined, 'Empty string returns undefined');
    assertEqual(getArticleBySlug('    '), undefined, 'Whitespace only returns undefined');
    assertEqual(getArticleBySlug(null), undefined, 'null returns undefined');
    assertEqual(getArticleBySlug(undefined), undefined, 'undefined returns undefined');
  });

  await test('Routing', 'Route resolution: Adversarial path & injection resilience', () => {
    const attackPayloads = [
      '../etc/passwd',
      '../../secret.json',
      '<script>alert("xss")</script>',
      '"><img src=x onerror=alert(1)>',
      "' OR '1'='1",
      '__proto__',
      'constructor',
      'toString',
      'valueOf',
      'hasOwnProperty',
      '%2e%2e%2f%2e%2e%2f',
      '\\Windows\\System32',
      'undefined',
      'null',
      'true',
      'false',
      '[object Object]',
    ];

    attackPayloads.forEach((payload) => {
      const article = getArticleBySlug(payload);
      assertEqual(article, undefined, `Adversarial slug "${payload}" must safely return undefined`);
    });
  });

  // ==========================================================================
  // SECTION 3: CATEGORY FILTERING DETERMINISM & PARTITION INTEGRITY
  // ==========================================================================
  console.log('\n>>> [Suite 3] Category Filtering Determinism...');

  const categories = getAllCategories();

  await test('CategoryFilter', 'Categories catalog exists with valid metadata', () => {
    assert(Array.isArray(categories) && categories.length >= 4, 'Categories catalog must have >= 4 categories');
    categories.forEach((cat) => {
      assert(typeof cat.slug === 'string' && cat.slug.length > 0, 'Category slug required');
      assertMatch(cat.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Category slug must be kebab-case');
      assert(typeof cat.name === 'string' && cat.name.length > 0, 'Category name required');
      assert(typeof cat.description === 'string' && cat.description.length > 0, 'Category description required');
      assert(typeof cat.count === 'number' && cat.count >= 0, 'Category count must be non-negative integer');
    });
  });

  await test('CategoryFilter', 'Partition Invariant: Sum of category article counts equals total articles', () => {
    const totalCount = categories.reduce((sum, c) => sum + c.count, 0);
    assertEqual(totalCount, blogArticles.length, 'Sum of category counts must equal total blog articles count');
  });

  await test('CategoryFilter', 'Exact subset matching: getArticlesByCategory returns exact matches', () => {
    categories.forEach((cat) => {
      const articlesInCat = getArticlesByCategory(cat.slug);
      assertEqual(articlesInCat.length, cat.count, `Category "${cat.slug}" returned articles count must equal category.count`);
      articlesInCat.forEach((art) => {
        assertEqual(
          art.categorySlug.toLowerCase(),
          cat.slug.toLowerCase(),
          `Article "${art.slug}" categorySlug must match queried category "${cat.slug}"`
        );
      });
    });
  });

  await test('CategoryFilter', 'Case-insensitivity and whitespace resilience in category queries', () => {
    categories.forEach((cat) => {
      const upperRes = getArticlesByCategory(cat.slug.toUpperCase());
      assertEqual(upperRes.length, cat.count, `Uppercase category "${cat.slug.toUpperCase()}" must return same subset`);

      const paddedRes = getArticlesByCategory(`   ${cat.slug}   `);
      assertEqual(paddedRes.length, cat.count, `Padded category "${cat.slug}" must return same subset`);
    });
  });

  await test('CategoryFilter', 'Invalid category slugs return empty array without exceptions', () => {
    const invalidCategories = [
      'non-existent-category',
      'quantum-ai',
      'software_engineering', // underscore instead of kebab
      'devops-cloud-invalid',
      'ai', // prefix only
      '',
      '   ',
      null,
      undefined,
      '__proto__',
      '<script>',
    ];

    invalidCategories.forEach((cat) => {
      const res = getArticlesByCategory(cat);
      assert(Array.isArray(res), `getArticlesByCategory("${cat}") must return an array`);
      assertEqual(res.length, 0, `getArticlesByCategory("${cat}") must return empty array`);
    });
  });

  await test('CategoryFilter', 'Idempotency and immutability of data getters', () => {
    const run1 = getAllArticles();
    const run2 = getAllArticles();
    assertEqual(run1.length, run2.length, 'getAllArticles length must be stable');

    // Mutate returned array: verify internal blogArticles is NOT mutated
    run1.pop();
    const run3 = getAllArticles();
    assertEqual(run3.length, blogArticles.length, 'Mutating getAllArticles return value must not mutate internal state');
  });

  // ==========================================================================
  // SECTION 4: RELATED ARTICLES & RECOMMENDATION LOGIC STRESS
  // ==========================================================================
  console.log('\n>>> [Suite 4] Related Articles Algorithm Invariants...');

  await test('Recommendations', 'Self-exclusion invariant: related articles never include the current article', () => {
    blogArticles.forEach((article) => {
      const related = getRelatedArticles(article.slug, 3);
      assert(Array.isArray(related), `getRelatedArticles for "${article.slug}" must return array`);
      assert(related.length <= 3, 'Must respect limit of 3');
      related.forEach((rec) => {
        assert(rec.slug !== article.slug, `Related articles for "${article.slug}" must NEVER include itself`);
      });
    });
  });

  await test('Recommendations', 'Ranking heuristic: same-category articles prioritized', () => {
    // Check an article from a category with multiple articles (e.g. cloud-architecture has 2 articles)
    const cloudArticles = blogArticles.filter((a) => a.categorySlug === 'cloud-architecture');
    if (cloudArticles.length >= 2) {
      const target = cloudArticles[0];
      const otherCloud = cloudArticles[1];
      const related = getRelatedArticles(target.slug, 3);
      assert(
        related.some((r) => r.slug === otherCloud.slug),
        `Article from same category "${otherCloud.slug}" should be recommended for "${target.slug}"`
      );
    }
  });

  await test('Recommendations', 'Boundary inputs: unknown slug, limit 0, and large limits', () => {
    const unknownRes = getRelatedArticles('completely-unknown-article', 3);
    assert(Array.isArray(unknownRes) && unknownRes.length === 3, 'Unknown slug returns default slice');

    const zeroLimitRes = getRelatedArticles(blogArticles[0].slug, 0);
    assert(Array.isArray(zeroLimitRes) && zeroLimitRes.length === 0, 'Limit 0 returns empty array');

    const hugeLimitRes = getRelatedArticles(blogArticles[0].slug, 100);
    assertEqual(hugeLimitRes.length, blogArticles.length - 1, 'Huge limit returns all other 7 articles');
  });

  // ==========================================================================
  // SECTION 5: COMPONENT SAFETY & 404 FALLBACK INSPECTION
  // ==========================================================================
  console.log('\n>>> [Suite 5] Component Fallbacks & Navigation Integrations...');

  await test('ComponentFallback', 'src/App.tsx contains 404 fallback UI for missing article slugs', () => {
    const appContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'src/App.tsx'), 'utf-8');
    assert(appContent.includes('Article Not Found'), 'App.tsx must include "Article Not Found" fallback');
    assert(appContent.includes("navigate('/blog')"), 'App.tsx must include button to return to blog');
  });

  await test('ComponentFallback', 'src/views/BlogArticle.tsx contains article null check fallback', () => {
    const articleViewContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'src/views/BlogArticle.tsx'), 'utf-8');
    assert(articleViewContent.includes('if (!article)'), 'BlogArticle.tsx must have null guard check');
    assert(articleViewContent.includes('Article Not Found'), 'BlogArticle.tsx must render "Article Not Found"');
    assert(articleViewContent.includes("onNavigate('/blog')"), 'BlogArticle.tsx must allow return to blog');
  });

  await test('ComponentFallback', 'src/views/BlogCategory.tsx contains category not-found fallback', () => {
    const categoryViewContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'src/views/BlogCategory.tsx'), 'utf-8');
    assert(categoryViewContent.includes('if (!currentCategory)'), 'BlogCategory.tsx must check for unknown category');
    assert(categoryViewContent.includes('Topic Category Not Found'), 'BlogCategory.tsx must render not found state');
    assert(categoryViewContent.includes("onNavigate('/blog')"), 'BlogCategory.tsx must allow return to blog');
  });

  await test('NavIntegration', 'src/components/Navigation.tsx integrates Blog nav links', () => {
    const navContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'src/components/Navigation.tsx'), 'utf-8');
    assert(navContent.includes('href="/blog"'), 'Navigation.tsx must contain href="/blog"');
    assert(navContent.includes("handleLinkClick('/blog')"), 'Navigation.tsx must handle blog clicks');
    assert(navContent.includes("currentPath === '/blog' || currentPath.startsWith('/blog/')"), 'Active state check');
  });

  await test('FooterIntegration', 'src/components/Footer.tsx integrates Blog & category links', () => {
    const footerContent = fs.readFileSync(path.resolve(PROJECT_ROOT, 'src/components/Footer.tsx'), 'utf-8');
    assert(footerContent.includes('href="/blog"'), 'Footer.tsx must contain link to /blog');
    assert(footerContent.includes('/blog/category/ai-engineering'), 'Footer.tsx must link to AI category');
    assert(footerContent.includes('/blog/category/cloud-architecture'), 'Footer.tsx must link to Cloud category');
  });

  // ==========================================================================
  // SUMMARY
  // ==========================================================================
  console.log('\n================================================================');
  console.log('             CHALLENGE HARNESS EXECUTION SUMMARY                ');
  console.log('================================================================');
  console.log(`Total Assertions/Tests : ${passedTests + failedTests}`);
  console.log(`Passed                 : ${passedTests}`);
  console.log(`Failed                 : ${failedTests}`);
  console.log(`Status                 : ${failedTests === 0 ? 'ALL PASSED (100%)' : 'FAILURES DETECTED'}`);
  console.log('================================================================\n');

  if (failedTests > 0) {
    console.error('Failure Details:');
    failures.forEach((f, idx) => {
      console.error(`\n[#${idx + 1}] ${f.suite} -> ${f.name}`);
      console.error(`Error: ${f.error}`);
    });
    process.exit(1);
  }
}

runEmpiricalHarness().catch((err) => {
  console.error('Fatal Harness Error:', err);
  process.exit(1);
});
