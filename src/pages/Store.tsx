import './Store.css';
import { storeProducts } from '../data/storeProducts';
import { StoreProductCard } from '../components/StoreProductCard';

interface StoreProps {
  onNavigateHome: () => void;
  onNavigate?: (path: string, hash?: string) => void;
}

export function Store({ onNavigateHome, onNavigate }: StoreProps) {
  const hasProducts = storeProducts.length > 0;

  const handleContactClick = () => {
    if (onNavigate) {
      onNavigate('/', '#contact');
    } else {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById('contact');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <div className="store-page">
      {/* Breadcrumbs Navigation */}
      <nav className="store-page__breadcrumbs container" aria-label="Breadcrumb">
        <ol className="breadcrumbs-list">
          <li className="breadcrumbs-item">
            <button
              type="button"
              onClick={onNavigateHome}
              className="breadcrumbs-link"
              aria-label="Return to Evostackr homepage"
            >
              Home
            </button>
          </li>
          <li className="breadcrumbs-separator" aria-hidden="true">/</li>
          <li className="breadcrumbs-item breadcrumbs-item--active" aria-current="page">
            Store
          </li>
        </ol>
      </nav>

      {/* Header Section */}
      <header className="store-hero section--compact" aria-labelledby="store-hero-heading">
        <div className="container">
          <div className="store-hero__layout">
            <div className="store-hero__content">
              <div className="section-label">
                <span className="section-label__line" />
                <span className="text-meta">DIGITAL SOFTWARE CATALOGUE</span>
              </div>
              <h1 id="store-hero-heading" className="store-hero__title">
                Software <span className="text-editorial">Store</span>
              </h1>
              <p className="store-hero__description">
                Discover software built to make digital work simpler. Explore premium tools and digital products from Evostackr.
              </p>
            </div>

            <aside className="store-hero__telemetry" aria-label="Store Specifications">
              <div className="store-telemetry__card">
                <div className="store-telemetry__header">
                  <span className="store-telemetry__dot" aria-hidden="true" />
                  <span className="text-meta">DISTRIBUTION PLATFORM</span>
                </div>
                <div className="store-telemetry__body">
                  <p className="store-telemetry__val">Buy Me a Coffee</p>
                  <p className="store-telemetry__sub text-meta">SECURE DIGITAL CHECKOUT</p>
                </div>
                <div className="store-telemetry__footer">
                  <span className="text-meta text-secondary">Fulfillment: Instant Delivery</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* Product Catalogue Section */}
      <section className="store-catalogue section" aria-label="Software Products">
        <div className="container">
          {hasProducts ? (
            <div className="store-catalogue__grid">
              {storeProducts.map((product) => (
                <StoreProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="store-empty" role="region" aria-label="Catalogue Status">
              <div className="store-empty__graphic" aria-hidden="true">
                <svg
                  viewBox="0 0 160 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="store-empty__svg"
                >
                  <rect x="20" y="20" width="120" height="80" stroke="#111827" strokeWidth="1.5" />
                  <line x1="20" y1="44" x2="140" y2="44" stroke="#D9DCDA" strokeWidth="1" />
                  <line x1="60" y1="44" x2="60" y2="100" stroke="#D9DCDA" strokeWidth="1" />
                  <rect x="30" y="30" width="8" height="6" fill="#111827" />
                  <line x1="44" y1="33" x2="90" y2="33" stroke="#6F7475" strokeWidth="1" />
                  <rect x="30" y="56" width="20" height="3" fill="#D9DCDA" />
                  <rect x="30" y="66" width="16" height="3" fill="#E8EBE9" />
                  <rect x="72" y="56" width="56" height="6" fill="#111827" />
                  <rect x="72" y="68" width="40" height="4" fill="#D9DCDA" />
                  <rect x="72" y="78" width="48" height="4" fill="#E8EBE9" />
                </svg>
              </div>

              <div className="store-empty__status-badge">
                <span className="store-empty__status-dot" aria-hidden="true" />
                <span className="text-meta">CATALOGUE IN PREPARATION</span>
              </div>

              <h2 className="store-empty__headline">Products Arriving Soon</h2>

              <p className="store-empty__text">
                Our software catalogue is currently being prepared. Proprietary developer tools, desktop utilities, and productivity software will be listed here with direct access via Buy Me a Coffee.
              </p>

              <div className="store-empty__features">
                <div className="store-empty__feature-card">
                  <span className="text-meta text-secondary">01 / ARCHITECTURE</span>
                  <h3 className="store-empty__feature-title">Proprietary Engineering</h3>
                  <p className="store-empty__feature-desc">
                    Built by Evostackr with clean codebases, low resource footprints, and zero telemetry bloat.
                  </p>
                </div>

                <div className="store-empty__feature-card">
                  <span className="text-meta text-secondary">02 / ACQUISITION</span>
                  <h3 className="store-empty__feature-title">Verified Digital Fulfillment</h3>
                  <p className="store-empty__feature-desc">
                    Simple, transparent pricing via Buy Me a Coffee digital product links.
                  </p>
                </div>

                <div className="store-empty__feature-card">
                  <span className="text-meta text-secondary">03 / SUPPORT</span>
                  <h3 className="store-empty__feature-title">Direct Creator Support</h3>
                  <p className="store-empty__feature-desc">
                    Every release is maintained directly by the engineers who designed and wrote it.
                  </p>
                </div>
              </div>

              <div className="store-empty__action">
                <p className="store-empty__action-note text-secondary">
                  Looking for custom software engineering or specialized solutions today?
                </p>
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="btn btn--secondary"
                >
                  Contact Engineering <span className="arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

