import './Products.css';

interface ProductsProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function Products({ onNavigate: _onNavigate }: ProductsProps) {
  return (
    <section id="products" className="products section" aria-labelledby="products-heading">
      <div className="container">
        {/* Header */}
        <div className="products__header">
          <span className="products__eyebrow">Our Portfolio</span>
          <h2 id="products-heading" className="products__title">
            Some of our recent projects
          </h2>
          <p className="products__subtitle">
            We design with care, engineer with trust, and deliver production-grade software to our clients.
            Every product includes full source code, modern architecture, and commercial ownership.
          </p>
        </div>

        {/* View All Products Action Button */}
        <div className="products__bottom-cta">
          <a
            href="https://blog.evostackr.in/product-launches"
            className="btn btn--indigo products__btn"
            rel="noopener noreferrer"
          >
            View all products <span className="arrow" aria-hidden="true">›</span>
          </a>
        </div>
      </div>
    </section>
  );
}
