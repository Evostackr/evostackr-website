import './ProductsPage.css';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  onNavigateHome: () => void;
  onNavigate?: (path: string, hash?: string) => void;
}

export function ProductsPage({ onNavigateHome }: ProductsPageProps) {
  // Complete portfolio of published products and projects
  const publishedProducts = products.filter((p) => p.published);

  // Preserve the asymmetric composition: 1 primary featured card + supporting 2-col grid
  const featuredProduct = publishedProducts.find((p) => p.featured) || publishedProducts[0];
  const supportingProducts = featuredProduct
    ? publishedProducts.filter((p) => p.id !== featuredProduct.id)
    : publishedProducts;

  return (
    <div className="products-page">
      {/* Breadcrumbs Navigation */}
      <nav className="products-page__breadcrumbs container" aria-label="Breadcrumb">
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
            Products
          </li>
        </ol>
      </nav>

      {/* Page Introduction */}
      <header className="products-page__hero container" aria-labelledby="products-page-title">
        <div className="products-page__layout">
          <div className="section-label">
            <span className="section-label__line" />
            <span className="text-meta">INDEPENDENT SOFTWARE PORTFOLIO</span>
          </div>
          <h1 id="products-page-title" className="products-page__title">
            Products built with <span className="text-editorial">purpose.</span>
          </h1>
          <p className="products-page__description">
            Explore independent software products designed to solve specific problems.
          </p>
        </div>
      </header>

      {/* Product Listing Section */}
      <section className="products-page__catalogue section" aria-label="Software Portfolio">
        <div className="container">
          <div className="products-page__grid">
            {/* Primary featured product */}
            {featuredProduct && (
              <ProductCard product={featuredProduct} variant="featured" />
            )}

            {/* Supporting product records */}
            {supportingProducts.length > 0 && (
              <div className="products-page__supporting">
                {supportingProducts.map((product) => (
                  <ProductCard product={product} variant="compact" key={product.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
