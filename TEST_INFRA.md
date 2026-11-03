# Test Infrastructure & Specification Document (TEST_INFRA)
## Evostackr Blog System — 4-Tier Opaque-Box E2E Testing Framework

**Project**: Evostackr Blog System  
**Working Directory**: `C:\Users\ujwal\.gemini\antigravity-ide\scratch\software-company-site`  
**Test Suite Directory**: `scratch/test-suite/`  
**Author**: E2E Test Suite Designer & Implementer  
**Status**: Authoritative Test Specification & Runner Documentation  

---

## 1. Test Philosophy & Methodology

The Evostackr Blog System test suite is designed as a strict, **opaque-box, requirement-driven verification system**. It treats the application as an integrated system, evaluating publicly observable contracts, client-side routing switches, data models, DOM metadata injections, Schema.org specifications, XML feed syntaxes, and production build artifacts without coupling to private internal implementation mechanics.

### 1.1 Four-Tier Testing Methodology

To guarantee complete coverage across both standard workflows and adversarial failure modes, tests are organized into four rigorous tiers:

1. **Tier 1 — Feature Coverage (Category-Partition)**
   - Decomposes the functional requirements (R1–R5, F1–F14) into discrete parameter categories.
   - Exercises the primary "happy path" behavior of every public route, article data model, navigation item, footer link, dynamic SEO metadata injection, and discovery feed.
   - Verifies structural completeness of all 8 blog articles, author metadata, reading time badges, direct answer callouts, and AI image specifications.

2. **Tier 2 — Boundary Value Analysis & Corner Cases**
   - Stresses the system boundaries and edge conditions.
   - Tests invalid/unknown route slugs (`/blog/non-existent-slug`) to ensure graceful 404 or fallback handling without runtime exceptions or blank screens.
   - Tests category filtering with non-existent or empty categories.
   - Tests search query handling: empty strings, pure whitespace, special symbols (`<script>`, `&`, `?`), case insensitivity, and unicode characters.
   - Validates character encoding integrity across editorial texts (em-dashes `—`, curly quotes `“…”`, ampersands `&amp;`, code blocks).
   - Validates handling of optional schema fields (`faqs`, `relatedProductSlug`, `relatedServiceSlug`, `contentMarkdown`, `contentHtml`).

3. **Tier 3 — Cross-Feature & Combinatorial Integration**
   - Validates pairwise relationships and interactions between disparate subsystems.
   - **Category-to-Article Traversal**: Clicking a category pill navigates to `/blog/category/:slug`, accurately filtering only articles that declare that `categorySlug`.
   - **Internal Product & Service Resolution**: Cross-checks every `relatedProductSlug` and `relatedServiceSlug` declared in blog articles against `src/data/products.ts`, `src/data/storeProducts.ts`, and `src/data/services.ts` to ensure zero dead internal links.
   - **Breadcrumb & Routing Coherence**: Verifies that breadcrumb hierarchies (`Home > Blog > Category > Article`) strictly align with route parameters and Schema.org `BreadcrumbList` item sequences.
   - **Canonical Link Consistency**: Verifies that every route dynamically generates an exact, self-referential canonical URL matching `https://evostackr.in/blog/...`.

4. **Tier 4 — Real-World Application Workloads & Production Invariants**
   - Executes full production build pipelines (`npm run build` executing `tsc -b && vite build`) ensuring zero TypeScript compilation errors and clean asset generation.
   - Runs static lint verification (`npx oxlint src`) with zero warnings and zero errors.
   - Performs formal Schema.org validation against `BlogPosting` and `BreadcrumbList` specifications (requiring `@context`, `@type`, `headline`, `image`, `datePublished`, `dateModified`, `author`, `publisher`, `description`, `mainEntityOfPage`).
   - Validates RFC 822 date syntax in `public/rss.xml` (e.g. `Tue, 03 Nov 2026 10:00:00 GMT`) rejecting invalid ISO 8601 formatting.
   - Validates XML well-formedness and schema compliance for `public/sitemap.xml` with Google Image extension namespaces (`xmlns:image`).
   - Verifies Cumulative Layout Shift (CLS = 0.00) invariants: explicit `width`, `height`, and `aspect-ratio: 16 / 9` CSS rules on all responsive blog imagery.

---

## 2. Feature Inventory Test Matrix

The following matrix maps every project requirement and feature to its automated verification tier and test cases:

| Feature ID | Requirement | Feature Description | Test Case ID | Test Tier | Verification Method & Target Artifact | Pass Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **F1** | R1 | OpenSEO Intelligence Report | `TC-R1-01` | Tier 1 | Inspect `scratch/openseo-research-report.md` | Contains 18 saved keywords, competitor audits, and 8 mapped topic clusters |
| **F2** | R3 | Client-Side Blog Routing | `TC-F2-01` | Tier 1 | Parse `src/App.tsx` routes | `/blog`, `/blog/:slug`, `/blog/category/:slug` route handlers registered |
| **F2** | R3 | Route 404 / Graceful Fallback | `TC-F2-02` | Tier 2 | Evaluate invalid slug navigation | Unknown slug renders not-found state without uncaught error |
| **F3** | R3 | Blog Index View | `TC-F3-01` | Tier 1 | Inspect `src/views/BlogIndex.tsx` | Category filter pills, search input, article card grid rendered |
| **F3** | R3 | Blog Search & Filter Boundaries | `TC-F3-02` | Tier 2 | Boundary search queries | Empty, whitespace, special chars, and case variants handled safely |
| **F4** | R3 | Blog Article View | `TC-F4-01` | Tier 1 | Inspect `src/views/BlogArticle.tsx` | Reading progress, TL;DR callout, TOC, author, and date badges present |
| **F5** | R3 | Blog Category View | `TC-F5-01` | Tier 1 | Inspect `src/views/BlogCategory.tsx` | Category header, description, and filtered card grid present |
| **F5** | R3 | Empty Category Slug Handling | `TC-F5-02` | Tier 2 | Evaluate non-existent category slug | Displays empty state or redirects to `/blog` without crash |
| **F6** | R3 | Navigation & Footer Integration | `TC-F6-01` | Tier 1 | Inspect `Navigation.tsx` & `Footer.tsx` | "Blog" link in desktop/mobile nav; blog links in footer |
| **F7** | R2 | AI Image Generation Pipeline | `TC-F7-01` | Tier 1 | Inspect image data & `public/images/blog/` | Exactly 4 images per article (1 banner + 3 contextual, 16:9 ratio) |
| **F7** | R5 | Zero Cumulative Layout Shift (CLS) | `TC-F7-02` | Tier 4 | Inspect image attributes & CSS | Explicit `width`, `height`, and `aspect-ratio: 16 / 9` rules present |
| **F8** | R2 | Editorial Content Data Layer | `TC-F8-01` | Tier 1 | Import/Validate `src/data/blogArticles.ts` | 8 typed articles conforming to `PROJECT.md` interface contract |
| **F8** | R2 | Special Character & Unicode Encoding | `TC-F8-02` | Tier 2 | Parse article typography & HTML/markdown | Em-dashes, curly quotes, ampersands, and code blocks valid UTF-8 |
| **F9** | R4 | Internal Product/Service Linking | `TC-F9-01` | Tier 3 | Cross-reference `relatedProductSlug` | Every slug matches an active product or service in data modules |
| **F10** | R4 | Dynamic HTML Meta Tags | `TC-F10-01` | Tier 1 | Evaluate `SEOHead.tsx` blog handlers | `<title>`, meta `description`, `og:*`, and `twitter:*` tags injected |
| **F11** | R4 | Schema.org JSON-LD Generation | `TC-F11-01` | Tier 1 | Inspect `SEOHead.tsx` JSON-LD output | `BlogPosting` and `BreadcrumbList` schemas generated dynamically |
| **F11** | R4 | Formal Schema.org Compliance | `TC-F11-02` | Tier 4 | Validate JSON-LD against Schema.org specs | Required properties present: `@context`, `@type`, `headline`, `image`, `datePublished`, `author`, `publisher` |
| **F12** | R4 | Discovery Feeds & Directives | `TC-F12-01` | Tier 1 | Parse `sitemap.xml`, `rss.xml`, `robots.txt` | All 8 article URLs and Google image entries registered |
| **F12** | R4 | RSS RFC 822 PubDate Compliance | `TC-F12-02` | Tier 4 | Validate `<pubDate>` in `rss.xml` | Strict RFC 822 format (e.g. `Tue, 03 Nov 2026 10:00:00 GMT`) |
| **F12** | R4 | Sitemap XML Well-Formedness | `TC-F12-03` | Tier 4 | Parse `sitemap.xml` XML syntax | Zero XML syntax errors, valid `image:image` tags |
| **F13** | R5 | Responsive Mobile/Desktop CSS | `TC-F13-01` | Tier 4 | Inspect `src/views/*.css` | Midnight Navy variables used, `@media` queries for `<768px` |
| **F14** | R5 | Production TypeScript Build | `TC-F14-01` | Tier 4 | Execute `npm run build` | Zero TypeScript errors, Vite bundle emitted in `dist/` |
| **F14** | R5 | Static Oxlint Verification | `TC-F14-02` | Tier 4 | Execute `npx oxlint src` | Zero lint warnings, zero errors |

---

## 3. Test Architecture & Runner Coordination

### 3.1 Directory Layout
```
scratch/test-suite/
├── run-tests.mjs                    # Master test runner & CLI coordinator
├── tier1-feature-coverage.test.mjs  # Tier 1: Functional coverage & contracts
├── tier2-boundary-corner.test.mjs   # Tier 2: Boundary values & error handling
├── tier3-cross-feature.test.mjs     # Tier 3: Combinatorial & internal linkages
├── tier4-real-world.test.mjs        # Tier 4: Real-world build, schemas & feeds
├── utils/
│   └── test-helpers.mjs             # Assertion library, XML parser, Schema validator
└── test-results.json                # Structured test execution output
```

### 3.2 Execution Commands

The test suite can be executed with a single command from the project root:

```powershell
# Run the complete 4-tier E2E test suite
node scratch/test-suite/run-tests.mjs

# Alternatively, run via npm script
npm run test:e2e

# Run specific tiers individually during progressive milestone verification
node scratch/test-suite/run-tests.mjs --tier 1
node scratch/test-suite/run-tests.mjs --tier 2
node scratch/test-suite/run-tests.mjs --tier 3
node scratch/test-suite/run-tests.mjs --tier 4

# Run with verbose diagnostic output
node scratch/test-suite/run-tests.mjs --verbose
```

### 3.3 Pass/Fail Semantics & Exit Codes
- **Exit Code 0 (Success)**: All executed test cases passed with zero assertion errors.
- **Exit Code 1 (Failure)**: One or more test assertions failed, or an uncaught exception occurred.
- **Progressive Testability Principle**: If a feature belongs to an upcoming, uncompleted milestone (e.g. M2 editorial content during M1 routing verification), the test runner clearly indicates the missing artifact and milestone assignment in the failure output, without masking real defects or fabricating dummy passes.

### 3.4 Structured Results Artifact (`scratch/test-suite/test-results.json`)
Upon completion of any test run, the runner emits a structured JSON report containing:
- Execution timestamp and duration (ms).
- Total tests executed, passed, failed, and skipped.
- Tier-by-tier breakdowns with individual test statuses and error stack traces.
