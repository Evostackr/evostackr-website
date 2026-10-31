import { useState } from 'react';
import './StoreProductDetail.css';
import type { StoreProduct } from '../data/storeProducts';

interface StoreProductDetailProps {
  product: StoreProduct;
  onNavigateHome: () => void;
  onNavigate: (path: string, hash?: string) => void;
}

export function StoreProductDetail({ product, onNavigateHome, onNavigate }: StoreProductDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const screenshots = product.screenshots || (product.screenshotUrls || []).map((url, i) => ({
    url,
    caption: `Screenshot ${i + 1}`,
    alt: `${product.name} interface preview ${i + 1}`,
    label: `Image ${i + 1}`,
  }));

  const activeScreenshot = screenshots[activeImageIndex] || screenshots[0];
  const secondaryScreenshots = screenshots.slice(1);

  return (
    <div className="product-detail">
      {/* Breadcrumbs Navigation */}
      <nav className="product-detail__breadcrumbs container" aria-label="Breadcrumb">
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
          <li className="breadcrumbs-item">
            <button
              type="button"
              onClick={() => onNavigate('/store')}
              className="breadcrumbs-link"
              aria-label="Return to Store"
            >
              Store
            </button>
          </li>
          <li className="breadcrumbs-separator" aria-hidden="true">/</li>
          <li className="breadcrumbs-item breadcrumbs-item--active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* 1. Product Identity & Hero */}
      <section className="product-detail__hero section--compact" aria-labelledby="product-name">
        <div className="container">
          <div className="product-detail__hero-grid">
            {/* Left Column: Identity & Actions */}
            <div className="product-detail__intro">
              <div className="section-label">
                <span className="section-label__line" />
                <span className="text-meta">{product.category}</span>
              </div>

              <div className="product-detail__title-row">
                {product.logoUrl && (
                  <img
                    src={product.logoUrl}
                    alt={`${product.name} icon`}
                    className="product-detail__logo"
                    width="64"
                    height="64"
                    fetchPriority="high"
                  />
                )}
                <div>
                  <h1 id="product-name" className="product-detail__name">
                    {product.name}
                  </h1>
                  {product.version && (
                    <span className="product-detail__version-badge text-meta">
                      Version {product.version} • Source Code
                    </span>
                  )}
                </div>
              </div>

              {product.tagline && (
                <p className="product-detail__tagline text-editorial">
                  {product.tagline}
                </p>
              )}

              <p className="product-detail__description">
                {product.description || product.shortDescription}
              </p>

              {/* Technologies Highlights */}
              {product.technologies && (
                <div className="product-detail__tech-badges">
                  {product.technologies.map((tech) => (
                    <span key={tech} className="product-detail__tech-badge text-meta">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* 2. Purchase CTA Panel */}
              <div className="product-detail__purchase-card">
                <div className="product-detail__price-row">
                  <div>
                    <span className="text-meta text-secondary">OFFICIAL LISTING PRICE</span>
                    <p className="product-detail__price-val">
                      {product.price?.displayPrice || 'Confirmed on Checkout'}
                    </p>
                  </div>
                  <span className="product-detail__license-hint text-meta">
                    One-Time Purchase • No Recurring Platform Fees
                  </span>
                </div>

                <div className="product-detail__cta-row">
                  {product.buyUrl && (
                    <a
                      href={product.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary product-detail__buy-btn"
                      aria-label={`Buy ${product.name} on Payhip`}
                    >
                      Buy Now <span className="arrow" aria-hidden="true">↗</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('/', '#contact');
                    }}
                    className="btn btn--secondary"
                  >
                    Custom Enterprise Setup <span className="arrow" aria-hidden="true">→</span>
                  </button>
                </div>

                <p className="product-detail__fulfillment-note text-meta text-secondary">
                  ✓ Instant unencrypted source download provided directly upon checkout via Payhip.
                </p>
              </div>
            </div>

            {/* Right Column: Hero Screenshot Display & Gallery */}
            {activeScreenshot && (
              <div className="product-detail__media-column">
                <div className="product-detail__stage-frame">
                  <img
                    src={activeScreenshot.url}
                    alt={activeScreenshot.alt}
                    className="product-detail__stage-img"
                    loading="eager"
                  />
                  <div className="product-detail__stage-caption">
                    <span className="text-meta">{activeScreenshot.caption}</span>
                    {activeImageIndex !== 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveImageIndex(0)}
                        className="product-detail__stage-reset-btn text-meta"
                        aria-label="Return to primary dashboard preview"
                      >
                        ✕ Main Dashboard
                      </button>
                    )}
                  </div>
                </div>

                {/* Horizontal Thumbnail Strip for Secondary Screenshots */}
                {secondaryScreenshots.length > 0 && (
                  <div
                    className="product-detail__thumb-gallery"
                    role="tablist"
                    aria-label="Secondary product screenshots"
                  >
                    {secondaryScreenshots.map((s, idx) => {
                      const actualIndex = idx + 1;
                      const isSelected = activeImageIndex === actualIndex;

                      return (
                        <button
                          key={actualIndex}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          aria-label={`View ${s.caption}`}
                          onClick={() => {
                            if (isSelected) {
                              setActiveImageIndex(0);
                            } else {
                              setActiveImageIndex(actualIndex);
                            }
                          }}
                          className={`product-detail__thumb-btn ${
                            isSelected ? 'product-detail__thumb-btn--active' : ''
                          }`}
                        >
                          <div className="product-detail__thumb-frame">
                            <img
                              src={s.url}
                              alt={s.alt}
                              className="product-detail__thumb-img"
                              loading="lazy"
                            />
                          </div>
                          <span className="product-detail__thumb-label text-meta">
                            {s.label || s.caption}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Comprehensive Feature Modules */}
      {product.featureModules && (
        <section className="product-detail__modules section" aria-labelledby="modules-heading">
          <div className="container">
            <div className="section-header">
              <div className="section-label">
                <span className="section-label__line" />
                <span className="text-meta">CORE ARCHITECTURE</span>
              </div>
              <h2 id="modules-heading" className="section-title">
                Comprehensive <span className="text-editorial">Modules &amp; Capabilities</span>
              </h2>
              <p className="section-description">
                Engineered from the ground up with modular architecture to cover every facet of institutional management.
              </p>
            </div>

            <div className="product-detail__modules-grid">
              {product.featureModules.map((module) => (
                <article key={module.id} className="product-module-card">
                  <div className="product-module-card__header">
                    <span className="product-module-card__dot" aria-hidden="true" />
                    <h3 className="product-module-card__title">{module.title}</h3>
                  </div>
                  <ul className="product-module-card__list">
                    {module.highlights.map((item, idx) => (
                      <li key={idx} className="product-module-card__item">
                        <span className="product-module-card__marker" aria-hidden="true">■</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Technology Stack & 6. System Requirements */}
      <section className="product-detail__specs section" aria-labelledby="specs-heading">
        <div className="container">
          <div className="product-detail__specs-grid">
            {/* Tech Stack */}
            <div className="product-detail__spec-block">
              <div className="section-label">
                <span className="section-label__line" />
                <span className="text-meta">FRAMEWORK &amp; LIBRARIES</span>
              </div>
              <h2 id="specs-heading" className="product-detail__subheading">
                Technology <span className="text-editorial">Stack</span>
              </h2>
              <p className="product-detail__spec-text">
                EvoEdu Pro utilizes modern PHP frameworks and zero-bloat reactive UI components.
              </p>

              {product.techStack && (
                <div className="product-detail__spec-table">
                  {product.techStack.map((item) => (
                    <div key={item.label} className="product-detail__spec-row">
                      <span className="product-detail__spec-label text-meta">{item.label}</span>
                      <span className="product-detail__spec-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* System Requirements */}
            <div className="product-detail__spec-block">
              <div className="section-label">
                <span className="section-label__line" />
                <span className="text-meta">SERVER PREREQUISITES</span>
              </div>
              <h2 className="product-detail__subheading">
                System <span className="text-editorial">Requirements</span>
              </h2>
              <p className="product-detail__spec-text">
                Compatible with modern cPanel, VPS, and Dedicated hosting environments.
              </p>

              {product.systemRequirements && (
                <div className="product-detail__spec-table">
                  {product.systemRequirements.map((item) => (
                    <div key={item.label} className="product-detail__spec-row">
                      <span className="product-detail__spec-label text-meta">{item.label}</span>
                      <span className="product-detail__spec-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Package Contents & 8. Licensing Tiers */}
      <section className="product-detail__package section" aria-labelledby="package-heading">
        <div className="container">
          <div className="product-detail__package-grid">
            {/* Package Contents */}
            <div className="product-detail__package-box">
              <div className="section-label">
                <span className="section-label__line" />
                <span className="text-meta">DELIVERABLES</span>
              </div>
              <h2 id="package-heading" className="product-detail__subheading">
                What’s Included in the <span className="text-editorial">Package</span>
              </h2>

              {product.packageContents && (
                <ul className="product-detail__package-list">
                  {product.packageContents.map((item, idx) => (
                    <li key={idx} className="product-detail__package-item">
                      <span className="product-detail__check-badge" aria-hidden="true">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Licensing Model */}
            <div className="product-detail__license-box">
              <div className="section-label">
                <span className="section-label__line" />
                <span className="text-meta">PURCHASE SPECIFICATIONS</span>
              </div>
              <h2 className="product-detail__subheading">
                Licensing <span className="text-editorial">Model</span>
              </h2>

              {product.licenseTiers && (
                <div className="product-detail__tier-table">
                  {product.licenseTiers.map((tier) => (
                    <div key={tier.name} className="product-detail__tier-card">
                      <div className="product-detail__tier-header">
                        <h3 className="product-detail__tier-name">{tier.name}</h3>
                        <span className="product-detail__tier-price">{tier.price}</span>
                      </div>
                      <p className="product-detail__tier-scope">{tier.scope}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="product-detail__checkout-action">
                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                  aria-label={`Buy ${product.name} license on Payhip`}
                >
                  Buy License on Payhip <span className="arrow" aria-hidden="true">↗</span>
                </a>
                <span className="product-detail__checkout-disclaimer text-meta text-secondary">
                  * Final tier selection and secure fulfillment take place on the official Payhip checkout page.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Support & Verification Security Notice */}
      <section className="product-detail__support section--compact" aria-labelledby="support-heading">
        <div className="container">
          <div className="product-detail__support-card">
            <div className="product-detail__support-text">
              <div className="section-label">
                <span className="section-label__line" />
                <span className="text-meta">OFFICIAL SUPPORT &amp; INQUIRIES</span>
              </div>
              <h2 id="support-heading" className="product-detail__support-title">
                Technical Assistance &amp; Custom Integration
              </h2>
              <p className="product-detail__support-desc">
                Need developer support, white-label assistance, or customized module engineering for your institution? Contact Evostackr engineering directly.
              </p>
              <div className="product-detail__contact-links">
                <a
                  href="mailto:support@evostackr.in"
                  className="btn btn--secondary"
                >
                  Email: support@evostackr.in
                </a>
                <a
                  href="https://wa.me/916202850596"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary"
                >
                  WhatsApp: +91 62028 50596 <span className="arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="product-detail__security-notice">
              <span className="text-meta text-secondary">SECURITY &amp; DEPLOYMENT DIRECTIVE</span>
              <p className="product-detail__security-text">
                For security reasons, zero default production credentials are published online. Administrators configure authentication upon completing the web setup wizard (<code className="product-detail__code">/install</code>).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

