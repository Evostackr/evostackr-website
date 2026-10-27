import './Store.css';
import { storeProducts } from '../data/storeProducts';
import { StoreProductCard } from '../components/StoreProductCard';

interface StoreProps {
  onNavigateHome: () => void;
  onNavigate?: (path: string, hash?: string) => void;
}

export function Store({ onNavigateHome, onNavigate }: StoreProps) {
  const hasProducts = storeProducts.length > 0;

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
      <header
        className={`store-hero ${hasProducts ? 'store-hero--has-products' : ''}`}
        aria-labelledby="store-hero-heading"
      >
        <div className="container">
          <div className="store-hero__layout">
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
        </div>
      </header>

      {/* Product Catalogue Section (rendered when products are present) */}
      {hasProducts && (
        <section className="store-catalogue section" aria-label="Software Products">
          <div className="container">
            <div className="store-catalogue__grid">
              {storeProducts.map((product) => (
                <StoreProductCard key={product.id} product={product} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
