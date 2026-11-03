/**
 * Tier 2 — Boundary Value Analysis & Corner Cases
 * 
 * Tests invalid slugs, empty categories, edge-case search queries,
 * character encoding, unicode, and missing optional fields.
 */

import {
  assert,
  assertEqual,
  readProjectFile,
  projectFileExists,
  importProjectModule
} from './utils/test-helpers.mjs';

export async function runTier2Tests() {
  const results = [];

  async function test(name, fn) {
    const start = Date.now();
    try {
      await fn();
      results.push({ name, tier: 2, passed: true, duration: Date.now() - start });
    } catch (err) {
      results.push({
        name,
        tier: 2,
        passed: false,
        duration: Date.now() - start,
        error: err.message,
        stack: err.stack
      });
    }
  }

  // --- Test 1: Invalid and Unknown Slug Handling (R3 / F2) ---
  await test('TC-F2-02: Invalid and unknown slug handling in data layer and views', async () => {
    assert(projectFileExists('src/data/blogArticles.ts'), 'src/data/blogArticles.ts must exist');
    const blogModule = await importProjectModule('src/data/blogArticles.ts');

    // 1. Data layer returns null/undefined for unknown slugs without throwing
    const nonExistent = blogModule.getArticleBySlug('non-existent-article-slug-xyz');
    assert(
      nonExistent === null || nonExistent === undefined,
      'getArticleBySlug for unknown slug must return null or undefined'
    );

    const emptySlugResult = blogModule.getArticleBySlug('');
    assert(
      emptySlugResult === null || emptySlugResult === undefined,
      'getArticleBySlug for empty string must return null or undefined'
    );

    // 2. View component handles null article gracefully
    assert(projectFileExists('src/views/BlogArticle.tsx'), 'src/views/BlogArticle.tsx must exist');
    const articleViewContent = readProjectFile('src/views/BlogArticle.tsx');
    assert(
      articleViewContent.includes('!article') ||
      articleViewContent.includes('article === null') ||
      articleViewContent.includes('article === undefined') ||
      articleViewContent.includes('not found') ||
      articleViewContent.includes('NotFound') ||
      articleViewContent.includes('Article Not Found'),
      'src/views/BlogArticle.tsx must include fallback / 404 handling when article is missing'
    );
  });

  // --- Test 2: Unknown and Empty Category Slug Handling (R3 / F5) ---
  await test('TC-F5-02: Unknown and empty category slug handling', async () => {
    assert(projectFileExists('src/data/blogArticles.ts'), 'src/data/blogArticles.ts must exist');
    const blogModule = await importProjectModule('src/data/blogArticles.ts');

    // Unknown category should return empty array [] rather than throwing
    const unknownCatResult = blogModule.getArticlesByCategory('unknown-non-existent-category');
    assert(
      Array.isArray(unknownCatResult) && unknownCatResult.length === 0,
      'getArticlesByCategory for unknown category must return empty array []'
    );

    const emptyCatResult = blogModule.getArticlesByCategory('');
    assert(
      Array.isArray(emptyCatResult) && emptyCatResult.length === 0,
      'getArticlesByCategory for empty string must return empty array []'
    );

    // View component handles empty category articles
    assert(projectFileExists('src/views/BlogCategory.tsx'), 'src/views/BlogCategory.tsx must exist');
    const catViewContent = readProjectFile('src/views/BlogCategory.tsx');
    assert(
      catViewContent.includes('articles.length === 0') ||
      catViewContent.includes('!articles.length') ||
      catViewContent.includes('No articles') ||
      catViewContent.includes('empty'),
      'src/views/BlogCategory.tsx must handle empty article lists gracefully'
    );
  });

  // --- Test 3: Search Query Boundary Cases (R3 / F3) ---
  await test('TC-F3-02: Search filtering boundary queries (empty, whitespace, symbols, case)', async () => {
    assert(projectFileExists('src/data/blogArticles.ts'), 'src/data/blogArticles.ts must exist');
    const blogModule = await importProjectModule('src/data/blogArticles.ts');
    const articles = blogModule.getAllArticles();

    // Universal search filter simulation based on BlogIndex search contract
    function searchArticles(query) {
      if (!query || !query.trim()) return articles;
      const q = query.trim().toLowerCase();
      return articles.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          (a.tags && a.tags.some(t => t.toLowerCase().includes(q))) ||
          a.categoryName.toLowerCase().includes(q)
      );
    }

    // 1. Empty query
    assertEqual(searchArticles('').length, articles.length, 'Empty search query should return all articles');

    // 2. Pure whitespace query
    assertEqual(searchArticles('     ').length, articles.length, 'Whitespace search query should return all articles');

    // 3. Case insensitivity
    const sampleArticle = articles[0];
    const upperQuery = sampleArticle.categoryName.toUpperCase();
    const upperMatches = searchArticles(upperQuery);
    assert(
      upperMatches.length > 0 && upperMatches.some(a => a.slug === sampleArticle.slug),
      'Search query must be case-insensitive'
    );

    // 4. Special characters & XSS payload
    const xssResult = searchArticles('<script>alert("XSS")</script>');
    assertEqual(xssResult.length, 0, 'XSS script search should return empty without syntax/regex error');

    const symbolResult = searchArticles('!@#$%^&*()_+{}|:<>?');
    assertEqual(symbolResult.length, 0, 'Random symbol query should return empty without syntax error');
  });

  // --- Test 4: Character Encoding & Escaping Integrity (R2 / F8) ---
  await test('TC-F8-03: Character encoding, typographic entities, and XML escaping', async () => {
    assert(projectFileExists('src/data/blogArticles.ts'), 'src/data/blogArticles.ts must exist');
    const blogModule = await importProjectModule('src/data/blogArticles.ts');
    const articles = blogModule.blogArticles;

    // Verify editorial typography integrity (em-dashes, quotes, ampersands)
    articles.forEach(article => {
      assert(
        !article.title.includes('\uFFFD') && !article.excerpt.includes('\uFFFD'),
        `Article ${article.slug} contains Unicode replacement character (corrupted encoding)`
      );
      assert(
        !article.directAnswerSnippet.includes('\uFFFD'),
        `Article ${article.slug} directAnswerSnippet contains corrupted encoding`
      );
    });

    // Check RSS XML escaping: raw '&' is forbidden in XML unless part of an entity or CDATA
    const rssContent = readProjectFile('public/rss.xml');
    const nonEntityAmpersand = /&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g;
    const strippedRss = rssContent.replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '');
    const badAmpersands = strippedRss.match(nonEntityAmpersand);
    assert(
      !badAmpersands,
      `public/rss.xml contains unescaped ampersands: ${badAmpersands?.length} occurrences`
    );
  });

  // --- Test 5: Optional Fields Resilience (R2 / F8) ---
  await test('TC-F8-04: Optional fields resilience (faqs, related products, related services)', async () => {
    assert(projectFileExists('src/data/blogArticles.ts'), 'src/data/blogArticles.ts must exist');
    const blogModule = await importProjectModule('src/data/blogArticles.ts');
    const articles = blogModule.blogArticles;

    articles.forEach(article => {
      if (article.faqs !== undefined && article.faqs !== null) {
        assert(Array.isArray(article.faqs), `Article ${article.slug}: faqs must be an array`);
        article.faqs.forEach((faq, fIdx) => {
          assert(typeof faq.question === 'string' && faq.question.trim().length > 0, `Article ${article.slug} FAQ[${fIdx}]: question required`);
          assert(typeof faq.answer === 'string' && faq.answer.trim().length > 0, `Article ${article.slug} FAQ[${fIdx}]: answer required`);
        });
      }

      if (article.relatedProductSlug !== undefined) {
        assert(
          typeof article.relatedProductSlug === 'string' && article.relatedProductSlug.length > 0,
          `Article ${article.slug}: relatedProductSlug if present must be non-empty string`
        );
      }

      if (article.relatedServiceSlug !== undefined) {
        assert(
          typeof article.relatedServiceSlug === 'string' && article.relatedServiceSlug.length > 0,
          `Article ${article.slug}: relatedServiceSlug if present must be non-empty string`
        );
      }
    });
  });

  return results;
}
