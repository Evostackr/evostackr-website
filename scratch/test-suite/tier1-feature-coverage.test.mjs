/**
 * Tier 1 — Feature Coverage (Category-Partition)
 * 
 * Tests happy-path functional requirements, data layer integrity,
 * route handlers, component architecture, XML feeds, and SEO integration.
 */

import {
  assert,
  assertEqual,
  assertMatch,
  assertIncludes,
  readProjectFile,
  projectFileExists,
  importProjectModule,
  isValidIso8601Date,
  isValidRfc822Date,
  parseAndValidateXml
} from './utils/test-helpers.mjs';

export async function runTier1Tests() {
  const results = [];

  async function test(name, fn) {
    const start = Date.now();
    try {
      await fn();
      results.push({ name, tier: 1, passed: true, duration: Date.now() - start });
    } catch (err) {
      results.push({
        name,
        tier: 1,
        passed: false,
        duration: Date.now() - start,
        error: err.message,
        stack: err.stack
      });
    }
  }

  // --- Test 1: OpenSEO Research Report (R1 / F1) ---
  await test('TC-R1-01: OpenSEO Intelligence Report completeness', () => {
    assert(
      projectFileExists('scratch/openseo-research-report.md'),
      'scratch/openseo-research-report.md must exist'
    );
    const content = readProjectFile('scratch/openseo-research-report.md');
    assertIncludes(content, 'OpenSEO Research & Strategy Report', 'Must have report title');
    assertIncludes(content, '18 high-priority keywords', 'Must document saved keywords');
    assertIncludes(content, 'Topic Cluster Strategy (8 High-Value Topics)', 'Must define 8 topic clusters');
    assertIncludes(content, 'AI Search Visibility (AEO/GEO)', 'Must include AI visibility prompt exploration');
    assertIncludes(content, 'agentic-ai-architecture-enterprise-guide', 'Must include Article 1 slug');
    assertIncludes(content, 'google-play-closed-testing-complete-guide', 'Must include Article 4 slug');
  });

  // --- Test 2: Blog Articles Data Layer & Helper Functions (R2 / F8) ---
  await test('TC-F8-01: Blog Articles Module existence and helper functions', async () => {
    assert(
      projectFileExists('src/data/blogArticles.ts'),
      'src/data/blogArticles.ts must exist (Milestone M1/M2 artifact)'
    );

    const blogModule = await importProjectModule('src/data/blogArticles.ts');

    assert(Array.isArray(blogModule.blogArticles), 'blogArticles export must be an array');
    assert(
      blogModule.blogArticles.length >= 5 && blogModule.blogArticles.length <= 10,
      `Expected between 5 and 10 articles, found ${blogModule.blogArticles.length}`
    );

    assert(typeof blogModule.getAllArticles === 'function', 'getAllArticles helper function must be exported');
    assert(typeof blogModule.getArticleBySlug === 'function', 'getArticleBySlug helper function must be exported');
    assert(typeof blogModule.getArticlesByCategory === 'function', 'getArticlesByCategory helper function must be exported');
    assert(typeof blogModule.getAllCategories === 'function', 'getAllCategories helper function must be exported');
    assert(typeof blogModule.getRelatedArticles === 'function', 'getRelatedArticles helper function must be exported');

    // Test helper functions return expected data
    const all = blogModule.getAllArticles();
    assertEqual(all.length, blogModule.blogArticles.length, 'getAllArticles() must return all articles');
    
    const categories = blogModule.getAllCategories();
    assert(Array.isArray(categories) && categories.length > 0, 'getAllCategories() must return at least one category');

    const firstArticle = all[0];
    const retrieved = blogModule.getArticleBySlug(firstArticle.slug);
    assertEqual(retrieved?.slug, firstArticle.slug, 'getArticleBySlug() must match first article slug');

    const catArticles = blogModule.getArticlesByCategory(firstArticle.categorySlug);
    assert(catArticles.length > 0, 'getArticlesByCategory() must return articles for existing category');
    assert(catArticles.every(a => a.categorySlug === firstArticle.categorySlug), 'Filtered articles must match category');
  });

  // --- Test 3: Article Data Contract Completeness (R2 / F8) ---
  await test('TC-F8-02: Individual article data contract completeness and image specs', async () => {
    assert(
      projectFileExists('src/data/blogArticles.ts'),
      'src/data/blogArticles.ts must exist'
    );
    const blogModule = await importProjectModule('src/data/blogArticles.ts');
    const articles = blogModule.blogArticles;

    articles.forEach((article, idx) => {
      const prefix = `Article [${idx}: ${article.slug || 'unknown'}]`;

      // Kebab-case slug
      assertMatch(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${prefix}: slug must be lowercase kebab-case`);
      assert(typeof article.title === 'string' && article.title.length > 10, `${prefix}: title must be non-empty`);
      assert(typeof article.headline === 'string' && article.headline.length > 10, `${prefix}: headline must be non-empty`);
      assert(typeof article.excerpt === 'string' && article.excerpt.length > 20, `${prefix}: excerpt must be non-empty`);
      assert(typeof article.category === 'string' && article.category.length > 0, `${prefix}: category must be non-empty`);
      assert(typeof article.categorySlug === 'string' && article.categorySlug.length > 0, `${prefix}: categorySlug must be non-empty`);
      assert(typeof article.categoryName === 'string' && article.categoryName.length > 0, `${prefix}: categoryName must be non-empty`);

      // Tags
      assert(Array.isArray(article.tags) && article.tags.length >= 2, `${prefix}: tags must have >= 2 items`);

      // Dates
      assert(isValidIso8601Date(article.publishedDate), `${prefix}: publishedDate must be ISO 8601`);
      assert(isValidIso8601Date(article.modifiedDate), `${prefix}: modifiedDate must be ISO 8601`);
      assert(isValidRfc822Date(article.rfcPubDate), `${prefix}: rfcPubDate must be valid RFC 822`);

      // Author
      assert(article.author && typeof article.author === 'object', `${prefix}: author must be an object`);
      assert(typeof article.author.name === 'string' && article.author.name.length > 0, `${prefix}: author.name required`);
      assert(typeof article.author.role === 'string', `${prefix}: author.role required`);

      // Metrics
      assert(article.readTimeMinutes > 0, `${prefix}: readTimeMinutes must be > 0`);
      assert(article.wordCount >= 500, `${prefix}: wordCount must be >= 500 for in-depth editorial content`);

      // Featured Image (16:9 banner)
      assert(article.featuredImage && typeof article.featuredImage === 'object', `${prefix}: featuredImage required`);
      assert(typeof article.featuredImage.url === 'string' && article.featuredImage.url.length > 0, `${prefix}: featuredImage.url required`);
      assert(typeof article.featuredImage.alt === 'string' && article.featuredImage.alt.length > 0, `${prefix}: featuredImage.alt required`);
      assert(article.featuredImage.width > 0, `${prefix}: featuredImage.width must be positive`);
      assert(article.featuredImage.height > 0, `${prefix}: featuredImage.height must be positive`);

      // Contextual Images (exactly 3 inline visuals)
      assert(
        Array.isArray(article.contextualImages) && article.contextualImages.length === 3,
        `${prefix}: contextualImages must contain exactly 3 inline images (Requirement R2: 1 banner + 3 contextual)`
      );
      article.contextualImages.forEach((img, imgIdx) => {
        assert(typeof img.url === 'string' && img.url.length > 0, `${prefix}: contextualImages[${imgIdx}].url required`);
        assert(typeof img.alt === 'string' && img.alt.length > 0, `${prefix}: contextualImages[${imgIdx}].alt required`);
        assert(img.width > 0 && img.height > 0, `${prefix}: contextualImages[${imgIdx}] dimensions required`);
      });

      // Direct Answer Snippet (45-65 words AEO/GEO quick answer)
      assert(
        typeof article.directAnswerSnippet === 'string' && article.directAnswerSnippet.length > 30,
        `${prefix}: directAnswerSnippet must be provided for AEO/GEO quick answer visibility`
      );
      const wordCountSnippet = article.directAnswerSnippet.trim().split(/\s+/).length;
      assert(
        wordCountSnippet >= 25 && wordCountSnippet <= 90,
        `${prefix}: directAnswerSnippet should be approx 45-65 words (found ${wordCountSnippet} words)`
      );

      // Table of Contents
      assert(
        Array.isArray(article.tableOfContents) && article.tableOfContents.length >= 3,
        `${prefix}: tableOfContents must contain at least 3 sections`
      );
    });
  });

  // --- Test 4: Client-Side Blog Routing (R3 / F2) ---
  await test('TC-F2-01: Client-Side Blog Routing in src/App.tsx', () => {
    const appContent = readProjectFile('src/App.tsx');
    assertIncludes(appContent, '/blog', 'src/App.tsx must register /blog route');
    assert(
      appContent.includes('/blog/') || appContent.includes('isBlog'),
      'src/App.tsx must handle blog detail or category sub-paths'
    );
    assert(
      appContent.includes('BlogIndex') || appContent.includes('blogArticles'),
      'src/App.tsx must wire blog views'
    );
  });

  // --- Test 5: View Components & Midnight Navy Stylesheets (R3 / F3, F4, F5) ---
  await test('TC-F3-01: Blog Views and Stylesheet Tokens', () => {
    assert(projectFileExists('src/views/BlogIndex.tsx'), 'src/views/BlogIndex.tsx must exist');
    assert(projectFileExists('src/views/BlogArticle.tsx'), 'src/views/BlogArticle.tsx must exist');
    assert(projectFileExists('src/views/BlogCategory.tsx'), 'src/views/BlogCategory.tsx must exist');
    
    // Check CSS existence and design tokens
    assert(projectFileExists('src/views/BlogIndex.css'), 'src/views/BlogIndex.css must exist');
    assert(projectFileExists('src/views/BlogArticle.css'), 'src/views/BlogArticle.css must exist');
    assert(projectFileExists('src/views/BlogCategory.css'), 'src/views/BlogCategory.css must exist');

    const indexCss = readProjectFile('src/views/BlogIndex.css');
    const articleCss = readProjectFile('src/views/BlogArticle.css');
    
    assert(
      indexCss.includes('--color-brand') || indexCss.includes('#111827') || indexCss.includes('var(--'),
      'BlogIndex.css must use design system color tokens'
    );
    assert(
      articleCss.includes('--color-brand') || articleCss.includes('#111827') || articleCss.includes('var(--'),
      'BlogArticle.css must use design system color tokens'
    );
  });

  // --- Test 6: Navigation & Footer Integration (R3 / F6) ---
  await test('TC-F6-01: Navigation and Footer Blog Links', () => {
    const navContent = readProjectFile('src/components/Navigation.tsx');
    const footerContent = readProjectFile('src/components/Footer.tsx');

    assert(
      navContent.includes('/blog') || navContent.includes('Blog'),
      'src/components/Navigation.tsx must include Blog navigation link'
    );
    assert(
      footerContent.includes('/blog') || footerContent.includes('Blog'),
      'src/components/Footer.tsx must include Blog footer link'
    );
  });

  // --- Test 7: Dynamic SEO & Schema.org Integration (R4 / F10, F11) ---
  await test('TC-F10-01: Dynamic SEOHead blog route handling and Schema.org generation', () => {
    const seoContent = readProjectFile('src/components/SEOHead.tsx');
    assert(
      seoContent.includes('/blog'),
      'src/components/SEOHead.tsx must handle /blog currentPath'
    );
    assert(
      seoContent.includes('BlogPosting') || seoContent.includes('blogArticles'),
      'src/components/SEOHead.tsx must generate BlogPosting schema for blog articles'
    );
    assert(
      seoContent.includes('BreadcrumbList'),
      'src/components/SEOHead.tsx must include BreadcrumbList schema'
    );
  });

  // --- Test 8: XML Feeds & AI Discovery Files (R4 / F12) ---
  await test('TC-F12-01: sitemap.xml, rss.xml, robots.txt, and llms.txt discovery', () => {
    // Sitemap
    const sitemapContent = readProjectFile('public/sitemap.xml');
    const parsedSitemap = parseAndValidateXml(sitemapContent, 'sitemap.xml');
    const sitemapUrls = parsedSitemap.extractTagValues('loc');
    assertIncludes(sitemapUrls, 'https://evostackr.in/blog', 'sitemap.xml must list /blog index');

    // RSS
    const rssContent = readProjectFile('public/rss.xml');
    const parsedRss = parseAndValidateXml(rssContent, 'rss.xml');
    const rssTitles = parsedRss.extractTagValues('title');
    assert(rssTitles.length >= 6, 'rss.xml must contain feed items');

    // Robots.txt
    const robotsContent = readProjectFile('public/robots.txt');
    assertIncludes(robotsContent, 'Sitemap: https://evostackr.in/sitemap.xml', 'robots.txt must point to sitemap');
    assertIncludes(robotsContent, 'Allow: /', 'robots.txt must allow root crawling');

    // LLMS.txt
    assert(projectFileExists('public/llms.txt'), 'public/llms.txt must exist for AI search engines');
  });

  return results;
}
