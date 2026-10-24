# Evostackr — Official Website

Official website for **Evostackr**, an independent software company developing proprietary software products and delivering high-assurance custom software engineering services.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8
- **Styling**: Vanilla CSS (modular design tokens & responsive architecture)
- **Deployment**: Cloudflare Pages

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Cloudflare Pages Deployment Configuration

When connecting this repository to **Cloudflare Pages**:

| Setting | Value |
| :--- | :--- |
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave empty or default) |
| **Node.js Version** | `20` (automatically picked up from `.nvmrc` / `.node-version`) |

### Included Cloudflare Pages Configurations
- **`public/_redirects`**: Automatically handles Single Page Application (SPA) routing fallback (`/* /index.html 200`).
- **`public/_headers`**: Enforces security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) and long-term immutable caching for static assets in `/assets/*`.
