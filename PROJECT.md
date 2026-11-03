# Project: Evostackr Blog Launch

## Architecture
- **Routing**: Bespoke zero-dependency client-side routing in `src/App.tsx` (`currentPath`, `useState`, `pushState`, `popstate`). Added routes: `/blog` (Index), `/blog/:slug` (Article view), and `/blog/category/:slug` (Category view).
- **Design Tokens & Visual Identity**: Strict Midnight Navy palette defined in `src/index.css` (`--color-brand-primary: #111827`, `--color-brand-secondary: #172554`, `--color-brand-accent: #1E3A5F`, `--color-bg: #F5F6F5`, `--color-surface: #E8EBE9`, `--color-border: #D9DCDA`). Strict 0px border-radius, Inter sans-serif interface font, and Playfair Display italic editorial accents.
- **Blog Architecture & Data Layer**: Type-safe static articles in `src/data/blogArticles.ts` ensuring instantaneous build times, zero hydration mismatches, and zero external runtime dependencies.
- **Components & Layout**:
  - `src/views/BlogIndex.tsx`: Filterable article catalog, featured article hero, category pills, search bar, reading time badges.
  - `src/views/BlogArticle.tsx`: Publication-ready layout, author byline, TL;DR direct answer callout, table of contents, contextual diagrams, semantic tables, product CTA cards, related articles.
  - `src/views/BlogCategory.tsx`: Filtered view of articles by category slug with canonical link to `/blog`.
  - `src/components/Navigation.tsx`: Seamlessly integrates "Blog" link into desktop and mobile navigation.
  - `src/components/Footer.tsx`: Links to top categories and recent guides in footer link columns.
- **Technical SEO, AEO & GEO**:
  - `src/components/SEOHead.tsx`: Dynamic head management generating `<title>`, `<meta name="description">`, canonical links, OpenGraph, Twitter Cards, and Schema.org `BlogPosting` and `BreadcrumbList` JSON-LD schemas.
  - `public/sitemap.xml`: Complete URL list with `<image:image>` extensions.
  - `public/rss.xml`: RSS 2.0 feed with RFC 822 timestamps and direct article links.
  - `public/robots.txt`: Directives allowing all search/AI bots and referencing `sitemap.xml`.
  - `public/llms.txt`: Machine-readable directory of articles and services for AI search engines.
- **Media Asset Pipeline**: Exactly 4 AI-generated images per article (1 16:9 featured banner + 3 contextual diagrams/infographics) stored under `public/images/blog/<slug>/`. Explicit width/height attributes and CSS `aspect-ratio: 16 / 9` to guarantee zero Cumulative Layout Shift (CLS = 0.00).

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | OpenSEO Intelligence Report | Conduct audit, keyword research, competitor analysis, and AI visibility exploration via OpenSEO | M0 (Done) | R1 |
| F2 | Client-Side Blog Routing | Implement routes `/blog`, `/blog/:slug`, and `/blog/category/:slug` in `src/App.tsx` | M1 | R3 |
| F3 | Blog Index View | Create `src/views/BlogIndex.tsx` with category filters, search, and article cards | M1 | R3 |
| F4 | Blog Article View | Create `src/views/BlogArticle.tsx` with reading progress, TL;DR callout, TOC, and rich content | M1 | R3 |
| F5 | Blog Category View | Create `src/views/BlogCategory.tsx` with category filtering and breadcrumbs | M1 | R3 |
| F6 | Navigation & Footer Integration | Add Blog links to `Navigation.tsx` and `Footer.tsx` preserving Midnight Navy styling | M1 | R3 |
| F7 | AI Image Generation Pipeline | Generate exactly 4 original AI images per article (1 banner + 3 contextual, 32 total) | M2 | R2 |
| F8 | Editorial Content Creation | Author 8 comprehensive, publication-ready, SEO/AEO-optimized articles in `src/data/blogArticles.ts` | M2 | R2 |
| F9 | Internal Product Linking | Embed natural contextual links and CTA cards pointing to 8 Evostackr products and 6 services | M2 | R4 |
| F10 | Dynamic HTML Meta Tags | Inject page titles, meta descriptions, canonical URLs, OG tags, and Twitter cards in `SEOHead.tsx` | M3 | R4 |
| F11 | Schema.org JSON-LD | Generate valid `BlogPosting` and `BreadcrumbList` JSON-LD scripts dynamically | M3 | R4 |
| F12 | XML Feeds & AI Discovery | Update `sitemap.xml`, `rss.xml`, `robots.txt`, and `llms.txt` with all blog URLs and media | M3 | R4 |
| F13 | Responsive & Zero CLS QA | Guarantee responsive mobile/desktop rendering and explicit image dimensions (CLS = 0.00) | M4 | R5 |
| F14 | Build & Integrity Verification | Pass `npm run build` with zero errors, oxlint verification, and independent forensic audit | M4 | R5 |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M0 | Survey & OpenSEO Research | OpenSEO audit, keyword research, competitor analysis, topic cluster strategy | none | DONE |
| M1 | Blog Architecture & Routing | Routing in `App.tsx`, `BlogIndex`, `BlogArticle`, `BlogCategory`, `Navigation`, `Footer` | M0 | DONE |
| M2 | Editorial Content & AI Images | Author 8 articles in `src/data/blogArticles.ts`, generate 32 AI images in `public/images/blog/` | M1 | IN_PROGRESS |
| M3 | Technical SEO, Schema & Feeds | Dynamic `SEOHead.tsx` JSON-LD (BlogPosting, Breadcrumbs), `sitemap.xml`, `rss.xml`, `robots.txt` | M1, M2 | PLANNED |
| M4 | E2E Testing & Forensic Audit | Full build (`npm run build`), Schema validation, CLS verification, Forensic Integrity Audit | M1, M2, M3 | PLANNED |

---

## Code Layout
- `src/App.tsx`: Route handling and page rendering switch
- `src/components/Navigation.tsx`: Top bar navigation
- `src/components/Footer.tsx`: Site footer links
- `src/components/SEOHead.tsx`: Meta tags and Schema.org JSON-LD management
- `src/data/blogArticles.ts`: Type definitions and static content repository for all 8 blog articles
- `src/views/BlogIndex.tsx`: Blog catalog and search page
- `src/views/BlogArticle.tsx`: Single blog article reading experience
- `src/views/BlogCategory.tsx`: Category filtered article view
- `src/views/BlogIndex.css`, `BlogArticle.css`, `BlogCategory.css`: Scoped CSS styles using `:root` design tokens
- `public/images/blog/<slug>/`: Image assets (1 featured banner + 3 contextual images per article)
- `public/sitemap.xml`: XML sitemap with Google Image extension
- `public/rss.xml`: RSS 2.0 feed
- `public/robots.txt`: Search crawler directives
- `public/llms.txt`: Machine-readable AI index

---

## Interface Contracts
### `src/data/blogArticles.ts`
```typescript
export interface BlogImage {
  url: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  headline: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  categoryName: string;
  tags: string[];
  publishedDate: string; // ISO 8601: "2026-11-03T10:00:00Z"
  modifiedDate: string;  // ISO 8601: "2026-11-03T10:00:00Z"
  rfcPubDate: string;    // RFC 822: "Tue, 03 Nov 2026 10:00:00 GMT"
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTimeMinutes: number;
  wordCount: number;
  featuredImage: BlogImage;
  contextualImages: BlogImage[];
  directAnswerSnippet: string; // 45-65 word AEO/GEO quick answer
  tableOfContents: { id: string; title: string; level: number }[];
  contentHtml?: string;
  contentMarkdown?: string;
  relatedProductSlug?: string;
  relatedServiceSlug?: string;
  faqs?: BlogFaq[];
}
```
