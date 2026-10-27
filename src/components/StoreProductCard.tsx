import { useState } from 'react';
import './StoreProductCard.css';
import type { StoreProduct } from '../data/storeProducts';

interface StoreProductCardProps {
  product: StoreProduct;
  onNavigate?: (path: string, hash?: string) => void;
}

function ProductLogo({ logoUrl, name }: { logoUrl?: string; name: string }) {
  const [hasError, setHasError] = useState(false);

  if (!logoUrl || hasError) {
    const initial = name ? name.charAt(0).toUpperCase() : 'P';
    return (
      <div className="store-card__logo-fallback" aria-hidden="true">
        <span>{initial}</span>
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={`${name} logo`}
      className="store-card__logo"
      width="56"
      height="56"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

export function StoreProductCard({ product, onNavigate }: StoreProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const detailUrl = `/store/${product.slug}`;
  const hasBuyUrl = Boolean(product.buyUrl && product.buyUrl.trim().length > 0);

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click was on the buy button or link, don't intercept
    if ((e.target as HTMLElement).closest('.store-card__buy-btn')) {
      return;
    }
    if (onNavigate) {
      e.preventDefault();
      onNavigate(detailUrl);
    }
  };

  const previewScreenshot = product.cardPreviewUrl || product.screenshots?.[0]?.url || product.screenshotUrls?.[0];
  const previewAlt = product.cardPreviewUrl
    ? `${product.name} dashboard showcase preview`
    : (product.screenshots?.[0]?.alt || `${product.name} dashboard preview`);

  return (
    <article
      className={`store-card ${product.featured ? 'store-card--featured' : ''}`}
      aria-labelledby={`product-title-${product.id}`}
    >
      <div className="store-card__header">
        <div className="store-card__identity">
          <ProductLogo logoUrl={product.logoUrl} name={product.name} />
          <div className="store-card__title-wrap">
            <div className="store-card__meta">
              <span className="store-card__type text-meta">{product.category || product.productType}</span>
              {product.version && (
                <span className="store-card__version text-meta">v{product.version}</span>
              )}
            </div>
            <h3 id={`product-title-${product.id}`} className="store-card__name">
              <a
                href={detailUrl}
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate(detailUrl);
                  }
                }}
                className="store-card__title-link"
              >
                {product.name}
              </a>
            </h3>
          </div>
        </div>

        {product.price && (
          <div className="store-card__price-badge">
            <span className="store-card__price-value">{product.price.displayPrice}</span>
            {product.price.note && (
              <span className="store-card__price-billing text-meta">
                Verified on checkout
              </span>
            )}
          </div>
        )}
      </div>

      <div className="store-card__body">
        <p className="store-card__short-desc">{product.shortDescription}</p>

        {/* Technology Highlights */}
        {product.technologies && product.technologies.length > 0 && (
          <div className="store-card__tech-row" aria-label="Core technologies">
            {product.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="store-card__tech-tag text-meta">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Preview Frame */}
        {previewScreenshot && !imageError && (
          <div
            className="store-card__preview-frame"
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={previewScreenshot}
              alt={previewAlt}
              className="store-card__preview-img"
              loading="lazy"
              onError={() => setImageError(true)}
            />
            <div className="store-card__preview-overlay">
              <span className="text-meta">View Product Specifications →</span>
            </div>
          </div>
        )}

        {/* Feature Highlights List */}
        {product.features && product.features.length > 0 && (
          <ul className="store-card__features" aria-label="Key highlights">
            {product.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="store-card__feature-item">
                <span className="store-card__feature-marker" aria-hidden="true">■</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="store-card__footer">
        <a
          href={detailUrl}
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate(detailUrl);
            }
          }}
          className="btn btn--secondary store-card__detail-btn"
          aria-label={`View details for ${product.name}`}
        >
          View Product <span className="arrow" aria-hidden="true">→</span>
        </a>

        {hasBuyUrl && (
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary store-card__buy-btn"
            aria-label={`Buy ${product.name} on Buy Me a Coffee`}
          >
            Buy Software <span className="arrow" aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
