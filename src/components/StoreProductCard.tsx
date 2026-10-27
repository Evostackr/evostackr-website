import { useState } from 'react';
import './StoreProductCard.css';
import type { StoreProduct } from '../data/storeProducts';

interface StoreProductCardProps {
  product: StoreProduct;
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
      alt={`${name} icon`}
      className="store-card__logo"
      width="48"
      height="48"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

function ScreenshotPreview({ screenshots, name }: { screenshots?: string[]; name: string }) {
  const [failedIndices, setFailedIndices] = useState<Record<number, boolean>>({});

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const validScreenshots = screenshots.filter((_, idx) => !failedIndices[idx]);

  if (validScreenshots.length === 0) {
    return null;
  }

  return (
    <div className="store-card__preview-gallery" aria-label={`${name} screenshots`}>
      {screenshots.map((url, index) => {
        if (failedIndices[index]) return null;
        return (
          <div key={index} className="store-card__preview-frame">
            <img
              src={url}
              alt={`${name} preview ${index + 1}`}
              className="store-card__preview-img"
              loading="lazy"
              onError={() =>
                setFailedIndices((prev) => ({ ...prev, [index]: true }))
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export function StoreProductCard({ product }: StoreProductCardProps) {
  const hasBuyUrl = Boolean(product.buyUrl && product.buyUrl.trim().length > 0);

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
              <span className="store-card__type text-meta">{product.productType}</span>
              {product.version && (
                <span className="store-card__version text-meta">v{product.version}</span>
              )}
              {product.status && (
                <span className="store-card__status text-meta">{product.status}</span>
              )}
            </div>
            <h3 id={`product-title-${product.id}`} className="store-card__name">
              {product.name}
            </h3>
          </div>
        </div>

        {product.price && (
          <div className="store-card__price-badge">
            <span className="store-card__price-value">{product.price.displayPrice}</span>
            {product.price.billingType && (
              <span className="store-card__price-billing text-meta">
                {product.price.billingType}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="store-card__body">
        <p className="store-card__short-desc">{product.shortDescription}</p>

        {product.description && (
          <p className="store-card__full-desc">{product.description}</p>
        )}

        {product.features && product.features.length > 0 && (
          <ul className="store-card__features" aria-label="Key features">
            {product.features.map((feat, idx) => (
              <li key={idx} className="store-card__feature-item">
                <span className="store-card__feature-marker" aria-hidden="true">■</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {product.platforms && product.platforms.length > 0 && (
          <div className="store-card__platforms">
            <span className="store-card__platforms-label text-meta">Platforms:</span>
            <div className="store-card__platform-tags">
              {product.platforms.map((platform) => (
                <span key={platform} className="store-card__platform-tag">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        )}

        <ScreenshotPreview screenshots={product.screenshotUrls} name={product.name} />
      </div>

      <div className="store-card__footer">
        {hasBuyUrl ? (
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary store-card__cta"
            aria-label={`Get ${product.name} on Buy Me a Coffee`}
          >
            Get on Buy Me a Coffee <span className="arrow" aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="store-card__unavailable text-meta text-secondary">
            Listing pending publication
          </span>
        )}
      </div>
    </article>
  );
}

