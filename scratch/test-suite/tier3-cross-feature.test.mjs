/**
 * Tier 3 — Cross-Feature & Combinatorial Integration
 * 
 * Tests category-to-article traversal, internal product link resolution,
 * breadcrumb hierarchy matching, and canonical URL consistency.
 */

import {
  assert,
  assertEqual,
  projectFileExists,
  importProjectModule
} from './utils/test-helpers.mjs';

export async function runTier3Tests() {
  const results = [];

  async function test(name, fn) {
    const start = Date.now();
    try {
      await fn();
      results.push({ name, tier: 3, passed: true, duration: Date.now() - start });
    } catch (err) {
      results.push({
        name,
        tier: 3,
        passed: false,
        duration: Date.now() - start,
        error: err.message,
        stack: err.stack
      });
    }
  }

  // --- Test 1: Category-to-Article Traversal (R3 / F3, F5) ---
  await test('TC-F9-01: Category-to-article traversal and bidirectional consistency', async () => {
    assert(projectFileExists('src/data/blogArticles.ts'), 'src/data/blogArticles.ts must exist');
    const blogModule = await importProjectModule('src/data/blogArticles.ts');

    const categories = blogModule.getAllCategories();
    assert(Array.isArray(categories) && categories.length >= 3, 'Must define at least 3 categories');

    const categorySlugs = new Set(categories.map(c => c.slug));

    // Every category must have at least one article
    categories.forEach(category => {
      const catArticles = blogModule.getArticlesByCategory(category.slug);
      assert(
        catArticles.length > 0,
        `Category "${category.name}" (${category.slug}) must have at least one associated article`
      );
      catArticles.forEach(a => {
        assertEqual(
          a.categorySlug,
          category.slug,
          `Article "${a.slug}" categorySlug does not match query category "${category.slug}"`
        );
      });
    });

    // Every article's categorySlug must be in categories set
    const allArticles = blogModule.getAllArticles();
    allArticles.forEach(article => {
      assert(
        categorySlugs.has(article.categorySlug),
        `Article "${article.slug}" has unregistered categorySlug: "${article.categorySlug}"`
      );
    });
  });

  // --- Test 2: Internal Product & Service Link Resolution (R4 / F9) ---
  await test('TC-F9-02: Internal product and service link resolution', async () => {
    assert(projectFileExists('src/data/blogArticles.ts'), 'src/data/blogArticles.ts must exist');
    // 1. Load actual products, storeProducts, and services
    const productsModule = await importProjectModule('src/data/products.ts');
    const storeModule = await importProjectModule('src/data/storeProducts.ts');
    const servicesModule = await importProjectModule('src/data/services.ts');

    const validProductSlugs = new Set([
      ...productsModule.products.map(p => p.slug),
      ...storeModule.storeProducts.map(sp => sp.slug)
    ]);

    const validServiceSlugs = new Set(
      servicesModule.services.map(s => s.slug)
    );

    const blogModule = await importProjectModule('src/data/blogArticles.ts');
    const articles = blogModule.getAllArticles();

    let resolvedProductLinks = 0;
    let resolvedServiceLinks = 0;

    articles.forEach(article => {
      if (article.relatedProductSlug) {
        assert(
          validProductSlugs.has(article.relatedProductSlug),
          `Article "${article.slug}" links to non-existent product slug: "${article.relatedProductSlug}"`
        );
        resolvedProductLinks++;
      }

      if (article.relatedServiceSlug) {
        assert(
          validServiceSlugs.has(article.relatedServiceSlug),
          `Article "${article.slug}" links to non-existent service slug: "${article.relatedServiceSlug}"`
        );
        resolvedServiceLinks++;
      }
    });

    // Ensure our editorial articles actually cross-link to products and services
    assert(
      resolvedProductLinks + resolvedServiceLinks >= 4,
      `Expected at least 4 internal product/service cross-links across articles, found ${resolvedProductLinks + resolvedServiceLinks}`
    );
  });

  // --- Test 3: Breadcrumb Hierarchy & Schema Coherence (R4 / F11) ---
  await test('TC-F11-03: Breadcrumb hierarchy and sequence matching', async () => {
    assert(projectFileExists('src/data/blogArticles.ts'), 'src/data/blogArticles.ts must exist');
    const blogModule = await importProjectModule('src/data/blogArticles.ts');
    const articles = blogModule.getAllArticles();

    articles.forEach(article => {
      // Simulate breadcrumb structure expected by SEOHead and BlogArticle
      const expectedBreadcrumbs = [
        { position: 1, name: 'Home', url: '/' },
        { position: 2, name: 'Blog', url: '/blog' },
        { position: 3, name: article.categoryName, url: `/blog/category/${article.categorySlug}` },
        { position: 4, name: article.title, url: `/blog/${article.slug}` }
      ];

      assertEqual(expectedBreadcrumbs.length, 4, 'Breadcrumb trail must have 4 hierarchical levels');
      assertEqual(expectedBreadcrumbs[0].name, 'Home');
      assertEqual(expectedBreadcrumbs[1].name, 'Blog');
      assertEqual(expectedBreadcrumbs[2].url, `/blog/category/${article.categorySlug}`);
      assertEqual(expectedBreadcrumbs[3].url, `/blog/${article.slug}`);
    });
  });

  // --- Test 4: Canonical & OpenGraph URL Consistency (R4 / F10) ---
  await test('TC-F10-02: Canonical URL and OpenGraph URL alignment', async () => {
    assert(projectFileExists('src/data/blogArticles.ts'), 'src/data/blogArticles.ts must exist');
    const blogModule = await importProjectModule('src/data/blogArticles.ts');
    const articles = blogModule.getAllArticles();
    const baseUrl = 'https://evostackr.in';

    articles.forEach(article => {
      const canonical = `${baseUrl}/blog/${article.slug}`;
      const ogUrl = `${baseUrl}/blog/${article.slug}`;
      const ogImage = article.featuredImage.url.startsWith('http')
        ? article.featuredImage.url
        : `${baseUrl}${article.featuredImage.url.startsWith('/') ? '' : '/'}${article.featuredImage.url}`;

      assertEqual(canonical, ogUrl, `Canonical and og:url must match for ${article.slug}`);
      assert(ogImage.startsWith('https://'), `og:image must be absolute HTTPS URL for ${article.slug}`);
    });
  });

  return results;
}
