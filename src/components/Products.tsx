import './Products.css';
import type { ReactNode } from 'react';
import { products } from '../data';
import type { Product } from '../data';

function ProductVisual({ product }: { product: Product }) {
  const visuals: Record<string, ReactNode> = {
    'sms-campaign-manager': (
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg">
        <rect x="0" y="0" width="400" height="240" fill="#E8EBE9" rx="2" />
        {/* Dashboard header */}
        <rect x="24" y="20" width="120" height="10" rx="2" fill="#111827" />
        <rect x="24" y="40" width="200" height="6" rx="1" fill="#D9DCDA" />
        {/* Metric cards */}
        <rect x="24" y="64" width="108" height="60" rx="3" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="36" y="76" width="40" height="6" rx="1" fill="#D9DCDA" />
        <rect x="36" y="90" width="60" height="14" rx="1" fill="#111827" />
        <rect x="146" y="64" width="108" height="60" rx="3" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="158" y="76" width="50" height="6" rx="1" fill="#D9DCDA" />
        <rect x="158" y="90" width="40" height="14" rx="1" fill="#111827" />
        <rect x="268" y="64" width="108" height="60" rx="3" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="280" y="76" width="44" height="6" rx="1" fill="#D9DCDA" />
        <rect x="280" y="90" width="52" height="14" rx="1" fill="#111827" />
        {/* Chart bars */}
        <rect x="24" y="148" width="24" height="68" rx="2" fill="#DDE1DF" />
        <rect x="58" y="128" width="24" height="88" rx="2" fill="#111827" />
        <rect x="92" y="158" width="24" height="58" rx="2" fill="#DDE1DF" />
        <rect x="126" y="138" width="24" height="78" rx="2" fill="#DDE1DF" />
        <rect x="160" y="108" width="24" height="108" rx="2" fill="#111827" />
        <rect x="194" y="148" width="24" height="68" rx="2" fill="#DDE1DF" />
        <rect x="228" y="168" width="24" height="48" rx="2" fill="#DDE1DF" />
        <rect x="262" y="128" width="24" height="88" rx="2" fill="#111827" />
        <rect x="296" y="158" width="24" height="58" rx="2" fill="#DDE1DF" />
        <rect x="330" y="138" width="24" height="78" rx="2" fill="#DDE1DF" />
      </svg>
    ),
    'fabricate': (
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg">
        <rect x="0" y="0" width="400" height="240" fill="#E8EBE9" rx="2" />
        {/* Venture incubation pipeline */}
        <rect x="24" y="24" width="140" height="10" rx="2" fill="#111827" />
        <rect x="24" y="44" width="220" height="6" rx="1" fill="#D9DCDA" />
        {/* Pipeline stage cards */}
        <rect x="24" y="70" width="108" height="130" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="36" y="82" width="60" height="8" rx="1" fill="#111827" />
        <rect x="36" y="98" width="84" height="6" rx="1" fill="#DDE1DF" />
        <rect x="36" y="112" width="70" height="6" rx="1" fill="#E8EBE9" />
        <rect x="36" y="160" width="84" height="24" rx="2" fill="#DDE1DF" />

        <rect x="146" y="70" width="108" height="130" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="158" y="82" width="50" height="8" rx="1" fill="#111827" />
        <rect x="158" y="98" width="84" height="6" rx="1" fill="#DDE1DF" />
        <rect x="158" y="112" width="60" height="6" rx="1" fill="#E8EBE9" />
        <rect x="158" y="160" width="84" height="24" rx="2" fill="#111827" />

        <rect x="268" y="70" width="108" height="130" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="280" y="82" width="70" height="8" rx="1" fill="#111827" />
        <rect x="280" y="98" width="84" height="6" rx="1" fill="#DDE1DF" />
        <rect x="280" y="112" width="50" height="6" rx="1" fill="#E8EBE9" />
        <rect x="280" y="160" width="84" height="24" rx="2" fill="#DDE1DF" />
      </svg>
    ),
    'whatsapp-past-member-extractor': (
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg">
        <rect x="0" y="0" width="400" height="240" fill="#E8EBE9" rx="2" />
        {/* Table extraction view */}
        <rect x="24" y="20" width="160" height="10" rx="2" fill="#111827" />
        <rect x="24" y="38" width="100" height="6" rx="1" fill="#D9DCDA" />
        <rect x="300" y="20" width="76" height="24" rx="2" fill="#111827" />
        {/* Spreadsheet headers */}
        <rect x="24" y="60" width="352" height="24" fill="#DDE1DF" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="36" y="68" width="50" height="8" rx="1" fill="#111827" />
        <rect x="140" y="68" width="60" height="8" rx="1" fill="#6F7475" />
        <rect x="250" y="68" width="50" height="8" rx="1" fill="#6F7475" />
        {/* Rows */}
        <rect x="24" y="84" width="352" height="34" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="36" y="96" width="70" height="8" rx="1" fill="#111827" />
        <rect x="140" y="96" width="80" height="8" rx="1" fill="#6F7475" />
        <rect x="250" y="96" width="60" height="8" rx="1" fill="#DDE1DF" />

        <rect x="24" y="118" width="352" height="34" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="36" y="130" width="80" height="8" rx="1" fill="#111827" />
        <rect x="140" y="130" width="70" height="8" rx="1" fill="#6F7475" />
        <rect x="250" y="130" width="60" height="8" rx="1" fill="#DDE1DF" />

        <rect x="24" y="152" width="352" height="34" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="36" y="164" width="65" height="8" rx="1" fill="#111827" />
        <rect x="140" y="164" width="85" height="8" rx="1" fill="#6F7475" />
        <rect x="250" y="164" width="60" height="8" rx="1" fill="#DDE1DF" />

        <rect x="24" y="186" width="352" height="34" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="36" y="198" width="75" height="8" rx="1" fill="#111827" />
        <rect x="140" y="198" width="70" height="8" rx="1" fill="#6F7475" />
        <rect x="250" y="198" width="60" height="8" rx="1" fill="#DDE1DF" />
      </svg>
    ),
    '24idchat': (
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg">
        {/* Chat interface suggestion */}
        <rect x="0" y="0" width="400" height="240" fill="#E8EBE9" rx="2" />
        <rect x="24" y="20" width="160" height="12" rx="2" fill="#D9DCDA" />
        <rect x="24" y="40" width="220" height="8" rx="2" fill="#DDE1DF" />
        {/* Message bubbles */}
        <rect x="24" y="64" width="200" height="36" rx="4" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="32" y="74" width="120" height="6" rx="1" fill="#DDE1DF" />
        <rect x="32" y="84" width="80" height="6" rx="1" fill="#E8EBE9" />
        <rect x="176" y="110" width="200" height="36" rx="4" fill="#111827" />
        <rect x="184" y="120" width="140" height="6" rx="1" fill="#6F7475" />
        <rect x="184" y="130" width="90" height="6" rx="1" fill="#6F7475" />
        <rect x="24" y="156" width="180" height="36" rx="4" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="32" y="166" width="100" height="6" rx="1" fill="#DDE1DF" />
        <rect x="32" y="176" width="60" height="6" rx="1" fill="#E8EBE9" />
        {/* Input field */}
        <rect x="24" y="206" width="352" height="16" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
      </svg>
    ),
    'tempemailfree': (
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg">
        <rect x="0" y="0" width="400" height="240" fill="#E8EBE9" rx="2" />
        {/* Email header */}
        <rect x="24" y="20" width="352" height="36" rx="3" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="36" y="32" width="180" height="8" rx="1" fill="#DDE1DF" />
        <rect x="310" y="32" width="52" height="12" rx="2" fill="#111827" />
        {/* Email list */}
        <rect x="24" y="72" width="352" height="44" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <circle cx="48" cy="94" r="12" fill="#DDE1DF" />
        <rect x="72" y="84" width="140" height="8" rx="1" fill="#111827" />
        <rect x="72" y="98" width="200" height="6" rx="1" fill="#D9DCDA" />
        <rect x="24" y="124" width="352" height="44" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <circle cx="48" cy="146" r="12" fill="#DDE1DF" />
        <rect x="72" y="136" width="120" height="8" rx="1" fill="#111827" />
        <rect x="72" y="150" width="180" height="6" rx="1" fill="#D9DCDA" />
        <rect x="24" y="176" width="352" height="44" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <circle cx="48" cy="198" r="12" fill="#DDE1DF" />
        <rect x="72" y="188" width="160" height="8" rx="1" fill="#111827" />
        <rect x="72" y="202" width="220" height="6" rx="1" fill="#D9DCDA" />
      </svg>
    ),
  };

  return visuals[product.id] || null;
}

export function Products() {
  const featured = products.find((p) => p.featured);
  const rest = products.filter((p) => !p.featured);

  return (
    <section id="products" className="products section" aria-labelledby="products-heading">
      <div className="container">
        <div className="products__header">
          <div className="section-label">
            <span className="section-label__line" />
            <span className="section-label__text">Our Products</span>
          </div>
          <h2 id="products-heading" className="products__title">
            Products built with <span className="text-editorial">purpose.</span>
          </h2>
          <p className="products__subtitle">
            Independent software products designed to solve specific problems.
          </p>
        </div>

        <div className="products__grid">
          {/* Featured product — large card */}
          {featured && (
            <article className="product-card product-card--featured" key={featured.id}>
              <div className="product-card__visual">
                <ProductVisual product={featured} />
              </div>
              <div className="product-card__content">
                <div className="product-card__meta">
                  <span className="text-meta">{featured.category}</span>
                  {featured.status && (
                    <span className="product-card__status text-meta">{featured.status}</span>
                  )}
                </div>
                <h3 className="product-card__name">{featured.name}</h3>
                <p className="product-card__description">{featured.description}</p>
                <div className="product-card__actions">
                  {featured.url ? (
                    <a
                      href={featured.url}
                      className="btn btn--secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${featured.name} project specifications`}
                    >
                      Visit product <span className="arrow" aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <span className="product-card__coming text-meta text-secondary">URL coming soon</span>
                  )}
                </div>
              </div>
            </article>
          )}

          {/* Supporting product cards */}
          <div className="products__supporting">
            {rest.map((product) => (
              <article className="product-card product-card--compact" key={product.id}>
                <div className="product-card__visual">
                  <ProductVisual product={product} />
                </div>
                <div className="product-card__content">
                  <div className="product-card__meta">
                    <span className="text-meta">{product.category}</span>
                    {product.status && (
                      <span className="product-card__status text-meta">{product.status}</span>
                    )}
                  </div>
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__description">{product.description}</p>
                  <div className="product-card__actions">
                    {product.url ? (
                      <a
                        href={product.url}
                        className="btn btn--secondary"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${product.name} project specifications`}
                      >
                        Visit product <span className="arrow" aria-hidden="true">→</span>
                      </a>
                    ) : (
                      <span className="product-card__coming text-meta text-secondary">URL coming soon</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
