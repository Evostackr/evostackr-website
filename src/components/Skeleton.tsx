import './Skeleton.css';

export function SkeletonLine({
  width = '100%',
  height = '12px',
  className = '',
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={`sk-line sk-shimmer ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function SkeletonBox({
  width = '100%',
  height = '100px',
  className = '',
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={`sk-box sk-shimmer ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

/**
 * Full page branded skeleton matching the exact Midnight Navy Evostackr layout:
 * - Fixed Header (logo, brand, nav links, CTA)
 * - 2-Column Hero (eyebrow, headlines, description, 2 CTAs, wireframe visual)
 * - 4-Column Statistics Section
 * - Products Section (header + featured card + supporting cards)
 */
export function PageSkeleton() {
  return (
    <div className="skeleton-shell" aria-busy="true" aria-label="Loading Evostackr...">
      {/* 1. Header Skeleton */}
      <header className="sk-nav" role="banner" aria-hidden="true">
        <div className="skeleton-container sk-nav__inner">
          <div className="sk-nav__brand">
            <div className="sk-nav__logo sk-shimmer" />
            <div className="sk-nav__name sk-shimmer" />
          </div>

          <div className="sk-nav__links">
            <div className="sk-nav__link sk-shimmer" style={{ width: '56px' }} />
            <div className="sk-nav__link sk-shimmer" style={{ width: '42px' }} />
            <div className="sk-nav__link sk-shimmer" style={{ width: '60px' }} />
            <div className="sk-nav__link sk-shimmer" style={{ width: '44px' }} />
            <div className="sk-nav__link sk-shimmer" style={{ width: '32px' }} />
            <div className="sk-nav__link sk-shimmer" style={{ width: '50px' }} />
          </div>

          <div className="sk-nav__cta" />

          <div className="sk-nav__burger" aria-hidden="true">
            <span className="sk-nav__burger-bar" />
            <span className="sk-nav__burger-bar" />
            <span className="sk-nav__burger-bar" />
          </div>
        </div>
      </header>

      {/* 2. Hero Section Skeleton */}
      <section className="sk-hero" aria-hidden="true">
        <div className="skeleton-container sk-hero__grid">
          <div className="sk-hero__content">
            <div className="sk-eyebrow">
              <span className="sk-eyebrow__line" />
              <div className="sk-eyebrow__text sk-shimmer" />
            </div>

            <div className="sk-headline">
              <div className="sk-headline__l1 sk-shimmer" />
              <div className="sk-headline__l2 sk-shimmer" />
            </div>

            <div className="sk-subheadline sk-shimmer" />

            <div className="sk-description">
              <div className="sk-description__l1 sk-shimmer" />
              <div className="sk-description__l2 sk-shimmer" />
            </div>

            <div className="sk-actions">
              <div className="sk-btn--primary" />
              <div className="sk-btn--secondary sk-shimmer" />
            </div>
          </div>

          {/* Hero Visual Skeleton (Coded isometric preview wireframe) */}
          <div className="sk-hero__visual">
            <div className="sk-visual-frame">
              <div className="sk-visual-terminal-bar">
                <div className="sk-visual-tag sk-shimmer" />
                <div className="sk-visual-dot" />
              </div>

              <div className="sk-visual-body">
                <div className="sk-visual-code-row">
                  <div className="sk-shimmer" style={{ width: '40px', height: '10px', borderRadius: '2px' }} />
                  <div className="sk-shimmer" style={{ width: '120px', height: '10px', borderRadius: '2px' }} />
                </div>
                <div className="sk-visual-code-row">
                  <div className="sk-shimmer" style={{ width: '60px', height: '10px', borderRadius: '2px' }} />
                  <div className="sk-shimmer" style={{ width: '180px', height: '10px', borderRadius: '2px' }} />
                </div>

                <div className="sk-visual-chart">
                  <div className="sk-visual-bar sk-shimmer" style={{ height: '55%' }} />
                  <div className="sk-visual-bar" style={{ height: '85%', background: '#111827' }} />
                  <div className="sk-visual-bar sk-shimmer" style={{ height: '45%' }} />
                  <div className="sk-visual-bar sk-shimmer" style={{ height: '65%' }} />
                  <div className="sk-visual-bar" style={{ height: '95%', background: '#111827' }} />
                  <div className="sk-visual-bar sk-shimmer" style={{ height: '50%' }} />
                  <div className="sk-visual-bar sk-shimmer" style={{ height: '35%' }} />
                </div>
              </div>

              <div className="sk-visual-footer">
                <div className="sk-shimmer" style={{ width: '80px', height: '10px', borderRadius: '2px' }} />
                <div className="sk-shimmer" style={{ width: '60px', height: '10px', borderRadius: '2px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Statistics Section Skeleton */}
        <div className="skeleton-container sk-hero__bottom">
          <div className="sk-stats">
            <div className="sk-stat">
              <div className="sk-stat__label sk-shimmer" />
              <div className="sk-stat__val sk-shimmer" />
            </div>
            <div className="sk-stat">
              <div className="sk-stat__label sk-shimmer" />
              <div className="sk-stat__val sk-shimmer" />
            </div>
            <div className="sk-stat">
              <div className="sk-stat__label sk-shimmer" />
              <div className="sk-stat__val sk-shimmer" />
            </div>
            <div className="sk-stat">
              <div className="sk-stat__label sk-shimmer" />
              <div className="sk-stat__val sk-shimmer" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Section Skeleton */}
      <section className="sk-products" aria-hidden="true">
        <div className="skeleton-container">
          <div className="sk-products__header">
            <div className="sk-eyebrow">
              <span className="sk-eyebrow__line" />
              <div className="sk-eyebrow__text sk-shimmer" style={{ width: '90px' }} />
            </div>
            <div className="sk-products__title sk-shimmer" />
            <div className="sk-products__subtitle sk-shimmer" />
          </div>

          <div className="sk-products__grid">
            {/* Primary featured card skeleton */}
            <div className="sk-card sk-card--featured">
              <div className="sk-card__visual sk-shimmer" />
              <div className="sk-card__content">
                <div className="sk-shimmer" style={{ width: '120px', height: '12px', borderRadius: '2px' }} />
                <div className="sk-shimmer" style={{ width: '240px', height: '24px', borderRadius: '2px' }} />
                <div className="sk-shimmer" style={{ width: '100%', height: '14px', borderRadius: '2px' }} />
                <div className="sk-shimmer" style={{ width: '75%', height: '14px', borderRadius: '2px' }} />
                <div style={{ marginTop: '1rem', width: '140px', height: '36px', background: '#111827', borderRadius: '2px' }} />
              </div>
            </div>

            {/* 2 Supporting cards skeleton */}
            <div className="sk-products__supporting">
              <div className="sk-card sk-card--compact">
                <div className="sk-card__visual sk-shimmer" />
                <div className="sk-card__content">
                  <div className="sk-shimmer" style={{ width: '90px', height: '12px', borderRadius: '2px' }} />
                  <div className="sk-shimmer" style={{ width: '160px', height: '20px', borderRadius: '2px' }} />
                  <div className="sk-shimmer" style={{ width: '100%', height: '14px', borderRadius: '2px' }} />
                </div>
              </div>

              <div className="sk-card sk-card--compact">
                <div className="sk-card__visual sk-shimmer" />
                <div className="sk-card__content">
                  <div className="sk-shimmer" style={{ width: '90px', height: '12px', borderRadius: '2px' }} />
                  <div className="sk-shimmer" style={{ width: '160px', height: '20px', borderRadius: '2px' }} />
                  <div className="sk-shimmer" style={{ width: '100%', height: '14px', borderRadius: '2px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PageSkeleton;

