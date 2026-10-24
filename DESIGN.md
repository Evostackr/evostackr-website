# Evostackr — Design System & Visual Specification

> **Status**: LOCKED & AUTHORITATIVE  
> **Brand Name**: Evostackr  
> **Official Domain**: [evostackr.in](https://evostackr.in)  
> **Official Support Email**: [support@evostackr.in](mailto:support@evostackr.in)  
> **Project Root**: `C:\Users\ujwal\.gemini\antigravity-ide\scratch\software-company-site`  
> **Core Framework**: React 19 + TypeScript + Vite (Vanilla Modular CSS)

---

## Mandatory Design Preservation Protocol for Future Changes

This protocol is mandatory for all developers, maintainers, and AI coding assistants working on this repository:

1. **Read DESIGN.md First**: Review this document in full before proposing or executing any UI, style, component, or frontend modification.
2. **Authoritative Design Contract**: Treat the existing website implementation and this `DESIGN.md` as the frozen visual source of truth.
3. **Smallest Viable Change**: Implement only the minimal set of changes strictly requested by the user. Do not reformat unrelated files or alter working component styling.
4. **Mandatory Reuse**: Reuse existing CSS custom properties (`--color-*`, `--space-*`, `--fs-*`, `--fw-*`, `--lh-*`), layout utilities (`.container`, `.section`, `.grid`), typography classes (`.text-meta`, `.text-editorial`), and component classes (`.btn`, `.btn--primary`, `.btn--secondary`, `.link-underline`).
5. **No Unilateral Redesigns**: **A feature update is not permission to redesign the website. Design changes require explicit authorization from the user.**
6. **Conflict Resolution**: If a requested user feature cannot be integrated without modifying the established design language, clearly state the conflict and request clarification before altering any styles.
7. **Visual & Regression Verification**: Following any implementation, run `npm run build` and verify that the affected components preserve alignment, typography, spacing, and responsive breakpoints without visual regression.
8. **Controlled Documentation Updates**: Update `DESIGN.md` only when an explicitly authorized change modifies the actual design system. Never silently reinterpret or expand the approved visual direction.

---

## A. Project and Brand Identity

### Brand Information
- **Official Brand Name**: `Evostackr`
- **Domain**: `evostackr.in`
- **Support Contact**: `support@evostackr.in` (Mailto URI: `mailto:support@evostackr.in`)
- **Brand Mark / Logo**: Authoritative isometric graphite 'E' mark (`evostackr-logo.png`) featuring high-contrast faceted charcoal geometry with transparent background, matching the website's cool-white and graphite identity. Implemented via `<img>` in [Navigation.tsx](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/src/components/Navigation.tsx), [Footer.tsx](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/src/components/Footer.tsx), and standalone in [public/evostackr-logo.png](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/public/evostackr-logo.png) & [public/favicon.svg](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/public/favicon.svg).

### Website Purpose & Market Positioning
Evostackr is an independent software company that develops, owns, and operates proprietary software products while providing custom software engineering, platform development, and technical consulting services to select clients.

The website communicates engineering credibility and product ownership rather than agency marketing:
1. **Division A — Software Products**:
   - **SMS Campaign Manager**: High-precision campaign management tool for designing, scheduling, and analyzing bulk SMS outreach without bloated tooling. (Slug: `sms-campaign-manager`)
   - **Fabricate**: Developer utility for rapid UI prototyping, automated component generation, and modern frontend scaffolding. (Slug: `fabricate`)
   - **WhatsApp Past Member Extractor**: Community manager utility for extracting, organizing, and auditing past WhatsApp group participants. (Slug: `whatsapp-past-member-extractor`)
   - **24IDChat**: Secure, identity-verified messaging infrastructure for platforms requiring authenticated communication at scale. (Slug: `24idchat`)
   - **TempEmailFree**: Lightweight, disposable email utility providing instant inboxes with zero tracking and automated expiration for privacy-conscious users. (Slug: `tempemailfree`)
2. **Division B — Custom Software Development**:
   - Custom website development (performance-engineered, accessible, bespoke).
   - Web application development (interactive platforms, complex state, real-time data).
   - SaaS platform development (multi-tenant architecture, billing, provisioning).
   - Business software & automation (workflow automation, operational tooling, ETL pipelines).
   - API integrations & custom engineering (third-party systems, custom APIs, synchronization layers).

### Visual Personality & Impression
- **Tone**: Understated, precise, intellectual, and engineering-driven.
- **Aesthetic**: Experimental asymmetric editorial layout, high-contrast cool off-white and dark graphite palette, architectural lines, and generous deliberate whitespace.
- **Motion**: Restrained, micro-functional transitions only; zero gratuitous bouncy animations or decorative particle effects.

---

## B. Design Philosophy

1. **Experimental Asymmetric Composition**: Avoids generic, predictable template grids. Sections use deliberate column imbalances (e.g., 5fr:7fr, 7fr:5fr, 1.2fr:1fr, 1fr:5fr:2fr) to create visual rhythm and guide reading flow.
2. **Cool White & Graphite Palette**: Dominated by high-contrast neutral tones (`#F5F6F5` canvas and `#25282A` graphite). High-impact dark inverted panels are reserved specifically for the Development Services and Get in Touch sections.
3. **Editorial Typography**: Pairing modern, ultra-clean grotesque sans-serif (`Inter`) for structure, telemetry, and technical labels with an elegant high-contrast serif (`Playfair Display`) in italic weight for key emphasis words in section headings.
4. **Restrained Technical Graphics**: Abstract, lightweight inline vector diagrams (coordinate axes, wireframe blocks, construction diagonals, telemetry markers) replacing stock photography or generic marketing illustrations.
5. **Deliberate Whitespace**: Generous section padding (`8rem`–`10rem` desktop clamping) establishing breathing room, authority, and readability.
6. **Performance-Conscious Zero-Dependency CSS**: Vanilla modular CSS with custom properties; no heavy external UI libraries or utility runtimes.
7. **Strict Hierarchy**:
   - *Mandatory*: Exact color tokens, typography scales, layout proportions, sharp corner geometry, and button hierarchy.
   - *Flexible*: Text copy inside specific data models ([data.ts](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/src/data.ts)) as new products or services are cataloged.

---

## C. Color Tokens

All color tokens are declared in [:root](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/src/index.css#L1-L12). The system strictly forbids unauthorized hex values.

| Token Name | Source Value | Usage / Description | Background / Foreground Pairing |
| :--- | :--- | :--- | :--- |
| `--color-bg` | `#F5F6F5` | Primary canvas & light section background. Cool off-white. | Primary text `#25282A`, borders `#D9DCDA` |
| `--color-text` | `#25282A` | Primary text, headings, dark icons, and high-contrast wordmarks. Deep slate graphite. | Canvas `#F5F6F5`, surface `#E8EBE9` |
| `--color-text-secondary` | `#6F7475` | Supporting descriptions, metadata labels, status dots, and subtle borders. | Canvas `#F5F6F5` |
| `--color-surface` | `#E8EBE9` | Product visual containers, secondary surfaces, and About section canvas. | Content borders `#D9DCDA`, text `#25282A` |
| `--color-surface-alt` | `#DDE1DF` | Secondary card details, SVG metric bars, and subtle fill elements. | Surface `#E8EBE9`, text `#25282A` |
| `--color-border` | `#D9DCDA` | Structural borders, card outlines, horizontal dividers, and stat separators. | Canvas `#F5F6F5`, surface `#E8EBE9` |
| `--color-dark` | `#25282A` | Dark section background for `Services` and `Contact` sections; primary button fill. | Dark text `#F5F6F5`, secondary `#BFC4C2` |
| `--color-dark-text` | `#F5F6F5` | Primary text and headings rendered inside dark sections. | Dark background `#25282A` |
| `--color-dark-text-secondary` | `#BFC4C2` | Supporting paragraphs and metadata labels inside dark sections. | Dark background `#25282A` |

### Special Context & State Colors
- **Primary Button Hover Fill**: `#3a3d3f` (lightened graphite).
- **Dark Section Primary Button Fill (`.btn--dark`)**: Background `#F5F6F5`, text `#25282A`, hover fill `#e0e3e1`.
- **Navigation Glass Backdrop**: `rgba(245, 246, 245, 0.92)` with `backdrop-filter: blur(12px)`.
- **Dark Section Divider Lines**: `rgba(255, 255, 255, 0.1)` default; `rgba(255, 255, 255, 0.25)` on service item hover.
- **Dark Section SVG Graphics**: Geometric strokes use `rgba(255, 255, 255, 0.08)` to `0.25)`; fills use `rgba(255, 255, 255, 0.05)`.
- **Status Indicator Dot**: `#6F7475` (6px circular dot).

---

## D. Typography System

### Font Families
- **Primary Interface Font**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`  
  *Usage*: All interface text, headings, navigation, metadata, buttons, body copy, and data values.
- **Editorial Accent Font**: `'Playfair Display', Georgia, 'Times New Roman', serif`  
  *Usage*: Specifically applied via `.text-editorial` in italic weight to singular emphasis words in major headings.

### Font Loading Strategy
Configured in [index.html](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/index.html#L12-L14) via Google Fonts with `preconnect` tags:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
```

### Font Weights
- `--fw-regular`: `400` (Standard body text, descriptions)
- `--fw-medium`: `500` (Buttons, metadata labels, links, subheadings)
- `--fw-semibold`: `600` (Product titles, principle titles, navigation branding)
- `--fw-bold`: `700` (Section headings h1/h2)
- `--fw-extrabold`: `800` (Hero display headline)

### Fluid Typography Scale (CSS Clamps)
- `--fs-hero`: `clamp(3rem, 6vw + 1rem, 5.5rem)` (Line height: `1.05`, Letter spacing: `-0.03em`)
- `--fs-h1`: `clamp(2.25rem, 3.5vw + 0.5rem, 3.25rem)` (Line height: `1.1`, Letter spacing: `-0.02em`)
- `--fs-h2`: `clamp(1.75rem, 2.5vw + 0.25rem, 2.5rem)` (Line height: `1.1`, Letter spacing: `-0.02em`)
- `--fs-h3`: `clamp(1.25rem, 1.5vw + 0.25rem, 1.75rem)` (Line height: `1.25`, Letter spacing: `-0.01em`)
- `--fs-body`: `clamp(1rem, 0.5vw + 0.875rem, 1.125rem)` (Line height: `1.55`–`1.7`, Letter spacing: `normal`)
- `--fs-small`: `clamp(0.8125rem, 0.25vw + 0.75rem, 0.875rem)` (Line height: `1.55`–`1.7`)
- `--fs-meta`: `clamp(0.6875rem, 0.2vw + 0.625rem, 0.8125rem)` (Letter spacing: `0.08em`–`0.1em`, uppercase)

### Line Heights
- `--lh-tight`: `1.1` (Headings h1, h2, hero)
- `--lh-snug`: `1.25` (h3 titles)
- `--lh-normal`: `1.55` (Standard text, metadata)
- `--lh-relaxed`: `1.7` (Paragraphs, descriptions, case study details)

---

## E. Layout and Grid System

### Container Dimensions
- **Max Container Width**: `--max-width: 1400px` (Centered with `margin: 0 auto`)
- **Fluid Horizontal Margin**: `--page-margin: clamp(1.25rem, 5vw, 6rem)`
- **Reading Content Constraint**: `--content-max: 720px` (Headers and intros constrained to `560px`–`600px`)
- **Scroll Offset for Fixed Header**: `[id] { scroll-margin-top: 4.5rem; }`

### Grid Structure
- **Desktop Columns**: `12` columns (`--grid-columns: 12`)
- **Tablet Columns (<=1024px)**: `8` columns
- **Mobile Columns (<=768px)**: `4` columns
- **Grid Gap**: `--grid-gap: clamp(1rem, 2vw, 2rem)`

### Section Vertical Spacing
- **Standard Desktop**: `--space-5xl` (`8rem` / `128px`) top and bottom padding
- **Compact Desktop / Intros**: `--space-4xl` (`6rem` / `96px`)
- **Tablet (<=768px)**: `--space-4xl` (`6rem` / `96px`)
- **Mobile (<=480px)**: `--space-3xl` (`4rem` / `64px`)

### Asymmetric Section Compositions
1. **Hero**: 2-column grid (`1fr 1fr`) on desktop. Text content left (`max-width: 600px`), technical SVG visual right. Stacks vertically at `<=1024px`; SVG visual hidden at `<=768px` to prioritize copy and CTAs.
2. **Products Grid**: 
   - 1 full-width featured card at the top with internal asymmetric ratio: `1.2fr` visual to `1fr` content.
   - 2-column supporting product grid (`1fr 1fr`) below with compact cards. Stacks into a single column on `<=768px`.
3. **Development Services**: Asymmetric split `5fr 7fr`. Sticky section header (`5fr`) on left (`position: sticky; top: calc(3.75rem + var(--space-3xl))`), numbered service list (`7fr`) on right. Unsticks and stacks at `<=1024px`.
4. **Selected Work (Case Studies)**: Alternating asymmetric compositions:
   - Odd Case Studies: `7fr 5fr` (Visual left, Content right).
   - Even Case Studies: `5fr 7fr` (Content left, Visual right with flex `order: 2` / `order: 1`).
   - Stacks to single column `1fr` at `<=1024px`.
5. **About Section**: 3-column asymmetric layout: `1fr` (label column) : `5fr` (body content, `max-width: 600px`) : `2fr` (technical graphic). Collapses to single column and hides graphic at `<=1024px`. Followed by a 3-column principles grid on desktop that collapses to 1 column at `<=768px`.
6. **Get in Touch (Contact)**: Inverted dark section. Asymmetric split `7fr 5fr` (contact content left, geometric graphic right). Stacks to single column and hides graphic at `<=1024px`.
7. **Footer**: Asymmetric split `3fr 9fr` (Brand description left, 3-column navigation matrix right). Matrix collapses to `1fr 1fr` at `<=768px` and `1fr` at `<=480px`.

---

## F. Component Specifications

### 1. Navigation (`Navigation.tsx` / `Navigation.css`)
- **Positioning**: Fixed top bar (`top: 0; left: 0; right: 0; z-index: 100`).
- **Dimensions**: Height `3.75rem` (`60px`), inner container with `justify-content: space-between`.
- **Surface**: `rgba(245, 246, 245, 0.92)` with `backdrop-filter: blur(12px)` and bottom border `1px solid var(--color-border)`.
- **Wordmark**: Inline 28×28 geometric SVG logo + `<span className="nav__name">Evostackr</span>` (`font-weight: 600`, letter-spacing `-0.01em`).
- **Links**: 5 anchor links (`#products`, `#services`, `#work`, `#about`, `#contact`) styled with `.text-meta`, gap `--space-xl` (`2rem`).
- **CTA**: `.nav__cta` (`.btn--primary`) with compact padding (`0.5rem 1rem`).
- **Mobile Menu**: Hidden on desktop. Triggered by a 2-line minimal hamburger (`width: 20px, height: 1.5px`) that morphs into an 'X' on toggle. Opens full-screen overlay dialog (`z-index: 105`) with large editorial typography (`clamp(1.75rem, 5vw, 2.5rem)`). Locks `body.style.overflow = 'hidden'` while active. Closes on link selection, escape key press, or toggle.

### 2. Hero Section (`Hero.tsx` / `Hero.css`)
- **Structure**: Pre-padded by `calc(3.75rem + clamp(var(--space-2xl), 3.5vw, var(--space-3xl)))` (approx 48–64px top spacing below the 3.75rem fixed navigation on desktop; 32px on tablet; 24px on mobile; 16px on small mobile). Full viewport height (`min-height: 100vh`) on desktop with bottom telemetry pin.
- **Section Label**: `.section-label` featuring a 2rem horizontal line and uppercase `.text-meta` ("Independent Software Company").
- **Headline**: High-impact fluid hero typography with italic editorial accent:
  ```html
  <h1 className="hero__headline">
    Software should<br />
    do <span className="text-editorial">more.</span>
  </h1>
  ```
- **Actions**: Dual CTA button grouping (`.btn--primary` "Explore our products" and `.btn--secondary` "Build with us").
- **Bottom Telemetry Bar**: Pinned to hero bottom with top border `1px solid var(--color-border)`. Displays structured metrics: "5 shipped" and "Products & Engineering".

### 3. Products Showcase (`Products.tsx` / `Products.css`)
- **Featured Card (`.product-card--featured`)**:
  - Border: `1px solid var(--color-border)`.
  - Visual: `1.2fr` width container with surface fill `#E8EBE9` containing product interface simulation SVG.
  - Content: `1fr` width container with `--space-2xl` padding, displaying category badge, status indicator dot, bold title, and action link.
- **Compact Cards (`.product-card--compact`)**:
  - Displayed in a 2-column grid (`1fr 1fr`).
  - Top visual container with minimum height `180px` containing product interface preview.
  - Bottom content block with category, name, description, and action link.
- **Hover Behavior**: Card border darkens to `--color-text-secondary`; SVG graphic scales up subtly (`transform: scale(1.02)`) over `240ms`.

### 4. Services Section (`Services.tsx` / `Services.css`)
- **Background**: Full-bleed inverted dark container (`var(--color-dark)` `#25282A`, text `var(--color-dark-text)`).
- **Header**: Sticky left column with section badge, headline ("Have a problem worth *solving?*"), subtitle, and dark CTA button (`.btn--dark`).
- **Service List**: Sequential vertical stack of service articles separated by `1px solid rgba(255, 255, 255, 0.1)`.
- **Service Item Structure**: 2-column grid (`3rem 1fr`). Left shows two-digit index (`01`, `02`, etc.) in `.text-meta`; right shows title and description. Top border brightens to `rgba(255, 255, 255, 0.25)` on hover.

### 5. Selected Work (`Work.tsx` / `Work.css`)
- **Layout**: Large alternating case-study presentation separated by `--space-5xl` (`8rem`).
- **Visuals**: Full vector architecture diagrams (`560×380` coordinate space) in `#E8EBE9` containers with `1px solid var(--color-border)`.
- **Content Blocks**: Problem statement, Solution description, and pill-shaped technology tags (`.case-study__tag`) with `1px solid var(--color-border)`.

### 6. About Section (`About.tsx` / `About.css`)
- **Surface**: Subtle background differentiation using `--color-surface` (`#E8EBE9`).
- **Narrative**: Clean 3-paragraph company manifesto emphasizing independent software development and engineering discipline.
- **Principles Grid**: 3-column grid (`repeat(3, 1fr)`) with top divider. Each principle features a numbered indicator (`01`, `02`, `03`), bold title, and concise explanation.

### 7. Contact Section (`Contact.tsx` / `Contact.css`)
- **Theme**: Inverted dark section (`var(--color-dark)`).
- **Channels**: 2-column outlined card matrix (`border: 1px solid rgba(255, 255, 255, 0.1)`) detailing "For Custom Development" and "For Product Inquiries".
- **Primary Support Action**: Direct button link to official support:
  ```html
  <a href="mailto:support@evostackr.in" className="btn btn--dark">
    support@evostackr.in <span className="arrow" aria-hidden="true">→</span>
  </a>
  ```
- **Support Note**: `.contact__note` displaying `Official support: support@evostackr.in`.

### 8. Footer (`Footer.tsx` / `Footer.css`)
- **Theme**: Light background (`var(--color-bg)`) with top border `1px solid var(--color-border)`.
- **Brand Column**: Logo mark, `Evostackr` wordmark, and two-line mission statement.
- **Navigation Matrix**: 3 columns (Products, Services, Company) with underlined links.
- **Bottom Bar**: Copyright `© {currentYear} Evostackr. All rights reserved.` on left; Privacy Policy and Terms of Service links on right.

### 9. Buttons & Interactive Links
- **`.btn` (Base)**: Inline-flex, aligned center, padding `0.75rem 1.5rem`, font-size `--fs-small`, font-weight `--fw-medium`, `border: 1px solid transparent`, zero border-radius.
- **`.btn--primary`**: Background `#25282A`, text `#F5F6F5`. Hover: background `#3a3d3f`.
- **`.btn--secondary`**: Background transparent, text `#25282A`, border `1px solid #D9DCDA`. Hover: border `#25282A`.
- **`.btn--dark`**: Background `#F5F6F5`, text `#25282A`. Hover: background `#e0e3e1`.
- **`.arrow`**: Child span inside buttons (`display: inline-block`). Translates `3px` to the right on parent button hover (`transition: transform 120ms ease`).
- **`.link-underline`**: Position relative inline-block with pseudo `::after` border expanding from `width: 0` to `width: 100%` on hover over `160ms`.

---

## G. Spacing, Borders, and Shape Language

### Spacing Scale
- `--space-xs`: `0.5rem` (`8px`)
- `--space-sm`: `0.75rem` (`12px`)
- `--space-md`: `1rem` (`16px`)
- `--space-lg`: `1.5rem` (`24px`)
- `--space-xl`: `2rem` (`32px`)
- `--space-2xl`: `3rem` (`48px`)
- `--space-3xl`: `4rem` (`64px`)
- `--space-4xl`: `6rem` (`96px`)
- `--space-5xl`: `8rem` (`128px`)
- `--space-6xl`: `10rem` (`160px`)

### Border & Corner Radii Rules
- **Corner Radii for UI Containers**: **Strictly 0px (Square/Sharp)**. All product cards, buttons, containers, navigation bars, and inputs use sharp rectangular geometry.
- **Subtle SVG Radius**: `2px` or `4px` is permitted exclusively inside vector mockups to simulate window chrome, message bubbles, or dashboard cards.
- **Circular Elements**: Restricted exclusively to 6px status dots (`border-radius: 50%`) and coordinate circle markers.
- **Borders**: Standard structural border is `1px solid #D9DCDA` (`--color-border`). Dark section border is `1px solid rgba(255, 255, 255, 0.1)`. No drop-shadows or glow filters are permitted anywhere on the site.

---

## H. Motion and Interaction

All animations and transitions follow deliberate, minimalist easing curves:
- **`--transition-fast`**: `120ms ease` (Text color hover, link colors, button arrow translations).
- **`--transition-base`**: `160ms ease` (Button background fills, border color changes, underline expansions).
- **`--transition-slow`**: `240ms ease` (Product card SVG scale on hover, mobile overlay menu fade).

### Accessibility & Reduced Motion
Defined globally in [index.css](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/src/index.css#L79-L91):
```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
**Strict Invariant**: No scroll-jacking, physics springs, canvas loops, parallax transforms, or floating particles are permitted.

---

## I. Responsive Design Rules

| Breakpoint | Target Devices | Layout Transformations |
| :--- | :--- | :--- |
| **`> 1024px`** | Desktop / Large Monitors | 12-column grid. Asymmetric layouts active. Sticky service header active. Hero and About graphics visible. |
| **`<= 1024px`** | Tablets / Small Laptops | Grid columns reduce to 8. Hero inner collapses to single column (graphic centered). Featured product card collapses to single column. Services header becomes static. About graphic and Contact graphic hidden. |
| **`<= 768px`** | Mobile Landscape / Portrait | Grid columns reduce to 4. Navigation links and desktop CTA hidden; hamburger button visible. Hero SVG hidden. Supporting product cards stack vertically (1 column). Hero actions and stats stack vertically. Service item index shrinks to 2rem column. Work case studies stack vertically. About principles stack to 1 column. Footer nav collapses to 2 columns. Section padding shrinks to `var(--space-4xl)`. |
| **`<= 480px`** | Small Mobile Devices | Section padding reduces to `var(--space-3xl)`. Footer navigation collapses to 1 column. Bottom footer legal links stack beneath copyright. |

---

## J. Assets and Iconography

- **Brand Mark (`evostackr-logo.png`)**: Authoritative graphite/charcoal isometric "E" mark with faceted geometric planes and full transparency. Displayed via `<img>` across header, footer, and brand placements. Standalone vector base64 version in `favicon.svg` and `apple-touch-icon.svg`.
- **Hero Software Illustration (`HeroSoftwareIllustration.tsx`)**: Bespoke, coded isometric software-engineering workspace illustration comprising a multi-pane terminal dashboard, floating interface panels, settings gear, connection lines with breathing pulse nodes, and security data card. Rendered via modular SVG components with restrained CSS animations and strict adherence to the cool-white and graphite palette.
- **Iconography**: Minimal inline vector SVG icons. No external icon fonts (FontAwesome, Material Icons, etc.) are used or permitted.
- **Interactive Arrows**: Standard Unicode right-arrow character (`→`) contained in `<span className="arrow" aria-hidden="true">→</span>`.
- **Illustrations**: Bespoke inline SVGs in each component file depicting coordinate grids, structural wireframes, and simulated software interfaces.

---

## K. Technical Design Implementation

### Project File Structure
```
software-company-site/
├── index.html                   # Entry HTML, SEO metadata, Google Fonts preconnect
├── package.json                 # React 19, TypeScript 5+, Vite 8
├── tsconfig.json                # TypeScript project configuration
├── DESIGN.md                    # THIS FILE: Authoritative design specification
├── public/
│   ├── evostackr-logo.png       # Official EvoStackr brand logo (isometric E)
│   └── favicon.svg              # Official EvoStackr geometric SVG icon
└── src/
    ├── main.tsx                 # React DOM root entry
    ├── App.tsx                  # Semantic landmark layout (Skip link, Nav, Main, Footer)
    ├── App.css                  # Skip-link accessibility & scroll margin rules
    ├── index.css                # Design tokens, reset, typography, buttons, grid
    ├── data.ts                  # Products, services, and case study data models
    └── components/
        ├── Navigation.tsx       # Header, wordmark, nav links, mobile drawer
        ├── Navigation.css
        ├── Hero.tsx             # Hero headline, copy, CTAs, SVG graphic, stats
        ├── Hero.css
        ├── HeroSoftwareIllustration.tsx # Coded isometric software workspace illustration
        ├── HeroSoftwareIllustration.css # Selective keyframes & reduced-motion rules
        ├── Products.tsx         # Featured & compact product cards with interface SVGs
        ├── Products.css
        ├── Services.tsx         # Inverted dark section, sticky header, service list
        ├── Services.css
        ├── Work.tsx             # Alternating case studies, technical tags
        ├── Work.css
        ├── About.tsx            # Manifesto copy, technical SVG, principles grid
        ├── About.css
        ├── Contact.tsx          # Inverted dark section, channel cards, support mailto
        ├── Contact.css
        ├── Footer.tsx           # Wordmark, nav matrix, copyright, legal links
        └── Footer.css
```

---

## L. Design Invariants and Prohibited Changes

The following rules are non-negotiable. Any change violating these invariants constitutes a visual regression:

1. **NO Redesign Without Written Permission**: A feature update is never an excuse to restyle, modernize, or simplify the layout.
2. **Color Invariant**: Do NOT introduce primary colors (blue, red, green, purple, yellow), vibrant gradients, or saturated accents. The palette is strictly cool white (`#F5F6F5`), graphite (`#25282A`), and neutral slate tones.
3. **Typography Invariant**: Do NOT swap `Inter` or `Playfair Display` for other fonts. Do NOT italicize body copy or non-editorial headings.
4. **Sharp Geometry Invariant**: Do NOT add rounded corners (`border-radius: 8px`, `12px`, etc.) to buttons, cards, or section containers. Corner radii must remain `0px`.
5. **No Drop Shadows**: Do NOT add box shadows, drop shadows, or glow effects. Depth is achieved exclusively through tonal contrast and 1px borders.
6. **No Heavy Motion**: Do NOT add continuous CSS animations, scroll bounce, parallax libraries, or interactive canvas backgrounds.
7. **Official Brand Information**:
   - Company name must remain `Evostackr`.
   - Support email must remain `support@evostackr.in` (and matching `mailto:support@evostackr.in`).
   - Do NOT invent addresses, phone numbers, or unverified social media profiles.

---

## M. Safe Extension Rules

When adding new products, features, or sections in the future:

1. **Adding a New Software Product**:
   - Add a new object to the `products` array in [src/data.ts](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/src/data.ts).
   - Provide `id`, `name`, `description`, `category`, and `status`.
   - Add a corresponding geometric interface preview SVG to the `visuals` dictionary in [src/components/Products.tsx](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/src/components/Products.tsx) adhering to the `#E8EBE9` background and `#D9DCDA` / `#25282A` palette.
2. **Adding a New Development Service**:
   - Add a new entry to the `services` array in [src/data.ts](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/src/data.ts).
   - Follow the established two-digit index convention (`01`, `02`, etc.).
3. **Adding a New Case Study**:
   - Add a new entry to the `caseStudies` array in [src/data.ts](file:///c:/Users/ujwal/.gemini/antigravity-ide/scratch/software-company-site/src/data.ts).
   - Include `problem`, `solution`, and an array of `technologies`.
   - The alternating visual layout (`case-study--reversed`) handles alternating layouts automatically.
4. **Creating a New Component**:
   - Store inside `src/components/` with a paired `.css` stylesheet.
   - Consume CSS variables from `index.css` (`var(--color-*)`, `var(--space-*)`, `var(--fs-*)`).
   - Match existing button (`.btn--primary`, `.btn--secondary`) and label (`.text-meta`, `.section-label`) conventions.

---

## N. Verification Checklist

Before submitting any future commit or deployment, verify the following items:

- [ ] **Brand Consistency**: The brand is displayed as `Evostackr` across header, footer, page title, and meta tags.
- [ ] **Support Email**: Displayed email is `support@evostackr.in` and link is `mailto:support@evostackr.in`.
- [ ] **Build Validation**: `npm run build` runs and passes with zero TypeScript or Vite errors.
- [ ] **No Visual Regressions**: Design tokens, typography scales, sharp corners, and asymmetric grids are preserved.
- [ ] **Responsive Integrity**: Tested across desktop (>1024px), tablet (<=1024px), mobile (<=768px), and small mobile (<=480px).
- [ ] **Accessibility**: Skip link functional, landmark elements (`header`, `main`, `footer`, `nav`) present, interactive elements keyboard accessible.
- [ ] **Performance**: Zero external UI runtime dependencies; all SVGs optimized and inlined.
