import './Products.css';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductsProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function Products({ onNavigate }: ProductsProps) {
  // Homepage displays only 2-3 selected featured published products
  const featuredProducts = products.filter((p) => p.published && p.featured).slice(0, 3);
  const primaryFeatured = featuredProducts[0];
  const supportingFeatured = featuredProducts.slice(1);

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
          {/* Primary featured product — large card */}
          {primaryFeatured && (
            <ProductCard product={primaryFeatured} variant="featured" />
          )}

          {/* Supporting featured product cards (up to 2) */}
          {supportingFeatured.length > 0 && (
            <div className="products__supporting">
              {supportingFeatured.map((product) => (
                <ProductCard product={product} variant="compact" key={product.id} />
              ))}
            </div>
          )}
        </div>

        {/* View More Products action navigating to /products */}
        <div className="products__footer">
          <a
            href="/products"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/products');
              }
            }}
            className="btn btn--primary products__view-more-btn"
            aria-label="View all independent software products"
          >
            View More Products <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
