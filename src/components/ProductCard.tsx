import type { ReactNode } from 'react';
import type { Product } from '../data/products';

export function ProductVisual({ product }: { product: Product }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={`${product.name} preview`}
        className="product-card__img"
        loading="lazy"
      />
    );
  }

  const visuals: Record<string, ReactNode> = {
    'sms-campaign-manager': (
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg" aria-label="SMS Campaign Manager interface mockup">
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
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg" aria-label="Fabricate venture incubation pipeline mockup">
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
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg" aria-label="WhatsApp Past Member Extractor table mockup">
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
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg" aria-label="24IDChat messaging interface mockup">
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
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg" aria-label="TempEmailFree inbox mockup">
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
    'pink-pdf': (
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg" aria-label="Pink PDF browser utility mockup">
        <rect x="0" y="0" width="400" height="240" fill="#E8EBE9" rx="2" />
        {/* Document toolbar */}
        <rect x="24" y="20" width="140" height="10" rx="2" fill="#111827" />
        <rect x="24" y="38" width="180" height="6" rx="1" fill="#D9DCDA" />
        {/* PDF Page Container */}
        <rect x="24" y="60" width="160" height="156" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="40" y="76" width="90" height="8" rx="1" fill="#111827" />
        <rect x="40" y="92" width="128" height="5" rx="1" fill="#DDE1DF" />
        <rect x="40" y="104" width="116" height="5" rx="1" fill="#DDE1DF" />
        <rect x="40" y="116" width="120" height="5" rx="1" fill="#DDE1DF" />
        <rect x="40" y="128" width="80" height="5" rx="1" fill="#DDE1DF" />
        {/* Security / Wasm Badge */}
        <rect x="40" y="152" width="100" height="20" rx="2" fill="#111827" />
        <circle cx="52" cy="162" r="4" fill="#F5F6F5" />
        {/* Tool modules grid */}
        <rect x="200" y="60" width="176" height="44" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="216" y="74" width="80" height="7" rx="1" fill="#111827" />
        <rect x="216" y="86" width="110" height="5" rx="1" fill="#6F7475" />
        <rect x="200" y="116" width="176" height="44" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="216" y="130" width="90" height="7" rx="1" fill="#111827" />
        <rect x="216" y="142" width="120" height="5" rx="1" fill="#6F7475" />
        <rect x="200" y="172" width="176" height="44" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="216" y="186" width="70" height="7" rx="1" fill="#111827" />
        <rect x="216" y="198" width="100" height="5" rx="1" fill="#6F7475" />
      </svg>
    ),
    'my-piano': (
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg" aria-label="My Piano virtual keyboard mockup">
        <rect x="0" y="0" width="400" height="240" fill="#E8EBE9" rx="2" />
        {/* Synth header */}
        <rect x="24" y="20" width="130" height="10" rx="2" fill="#111827" />
        <rect x="24" y="38" width="160" height="6" rx="1" fill="#D9DCDA" />
        {/* Octave visualizer */}
        <rect x="260" y="20" width="116" height="24" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <rect x="272" y="30" width="60" height="6" rx="1" fill="#111827" />
        {/* Waveform / audio telemetry bar */}
        <rect x="24" y="60" width="352" height="34" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        <line x1="40" y1="77" x2="360" y2="77" stroke="#D9DCDA" strokeWidth="1" />
        <polyline points="40,77 70,68 100,84 130,70 160,82 190,72 220,80 250,71 280,83 310,74 340,77" stroke="#111827" strokeWidth="1.5" fill="none" />
        {/* Piano Keyboard Base (88-key preview) */}
        <rect x="24" y="106" width="352" height="110" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        {/* White keys */}
        {[0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325].map((x, i) => (
          <rect key={`wk-${i}`} x={25 + x} y="107" width="24" height="108" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        ))}
        {/* Black keys */}
        {[42, 67, 117, 142, 167, 217, 242, 292, 317, 342].map((x, i) => (
          <rect key={`bk-${i}`} x={x} y="107" width="14" height="66" rx="1" fill="#111827" />
        ))}
      </svg>
    ),
    'codevault': (
      <svg viewBox="0 0 400 240" fill="none" className="product-card__svg" aria-label="CodeVault developer resources platform mockup">
        <rect x="0" y="0" width="400" height="240" fill="#E8EBE9" rx="2" />
        {/* Platform header */}
        <rect x="24" y="20" width="120" height="10" rx="2" fill="#111827" />
        <rect x="24" y="38" width="190" height="6" rx="1" fill="#D9DCDA" />
        {/* Code editor / repository container */}
        <rect x="24" y="60" width="352" height="156" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
        {/* Tab bar */}
        <rect x="24" y="60" width="352" height="28" fill="#DDE1DF" />
        <rect x="36" y="70" width="60" height="10" rx="1" fill="#111827" />
        <rect x="108" y="70" width="50" height="10" rx="1" fill="#6F7475" />
        <rect x="170" y="70" width="56" height="10" rx="1" fill="#6F7475" />
        {/* Code lines */}
        <rect x="40" y="104" width="70" height="6" rx="1" fill="#111827" />
        <rect x="120" y="104" width="140" height="6" rx="1" fill="#D9DCDA" />
        <rect x="56" y="120" width="90" height="6" rx="1" fill="#6F7475" />
        <rect x="156" y="120" width="100" height="6" rx="1" fill="#D9DCDA" />
        <rect x="72" y="136" width="120" height="6" rx="1" fill="#111827" />
        <rect x="56" y="152" width="60" height="6" rx="1" fill="#6F7475" />
        <rect x="40" y="168" width="80" height="6" rx="1" fill="#111827" />
        {/* Tags / Badge highlights */}
        <rect x="40" y="190" width="56" height="16" rx="1" fill="#DDE1DF" />
        <rect x="104" y="190" width="64" height="16" rx="1" fill="#DDE1DF" />
        <rect x="176" y="190" width="48" height="16" rx="1" fill="#111827" />
      </svg>
    ),
  };

  if (visuals[product.id]) {
    return visuals[product.id];
  }

  // Future product vector fallback
  return (
    <svg viewBox="0 0 400 240" fill="none" className="product-card__svg" aria-label={`${product.name} interface mockup`}>
      <rect x="0" y="0" width="400" height="240" fill="#E8EBE9" rx="2" />
      <rect x="24" y="24" width="120" height="12" rx="2" fill="#111827" />
      <rect x="24" y="48" width="200" height="8" rx="2" fill="#D9DCDA" />
      <rect x="24" y="76" width="352" height="136" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
      <circle cx="56" cy="108" r="16" fill="#DDE1DF" />
      <rect x="88" y="100" width="140" height="10" rx="1" fill="#111827" />
      <rect x="88" y="116" width="180" height="6" rx="1" fill="#D9DCDA" />
      <line x1="24" y1="144" x2="376" y2="144" stroke="#D9DCDA" strokeWidth="1" />
      <rect x="40" y="164" width="90" height="28" rx="2" fill="#111827" />
      <rect x="144" y="164" width="90" height="28" rx="2" fill="#DDE1DF" />
    </svg>
  );
}

export interface ProductCardProps {
  product: Product;
  variant?: 'featured' | 'compact';
}

export function ProductCard({ product, variant = 'compact' }: ProductCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <article
      className={`product-card ${isFeatured ? 'product-card--featured' : 'product-card--compact'}`}
      key={product.id}
    >
      <div className="product-card__visual">
        <ProductVisual product={product} />
      </div>
      <div className="product-card__content">
        <div className="product-card__meta">
          {product.category && <span className="text-meta">{product.category}</span>}
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
  );
}

