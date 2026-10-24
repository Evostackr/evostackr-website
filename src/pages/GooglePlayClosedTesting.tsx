import { useState, useEffect } from 'react';
import './GooglePlayClosedTesting.css';
import {
  fetchInrToUsdRate,
  formatInr,
  formatUsd,
  BASE_INR_PRICE,
  getCachedExchangeRate,
  type CurrencyConversionState,
} from '../utils/currency';
import { useAnimatedPrice } from '../hooks/useAnimatedPrice';
import { closedTestingApps, type ClosedTestingApp } from '../data';

interface GooglePlayClosedTestingProps {
  onNavigateHome: () => void;
}

function AppIcon({ iconPath, name }: { iconPath: string; name: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="portfolio-card__icon-fallback" aria-hidden="true">
        <span>{name.charAt(0)}</span>
      </div>
    );
  }

  return (
    <img
      src={iconPath}
      alt={`${name} app icon`}
      className="portfolio-card__icon"
      width="56"
      height="56"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

function PortfolioCard({ app }: { app: ClosedTestingApp }) {
  return (
    <article className={`portfolio-card ${app.featured ? 'portfolio-card--featured' : ''}`}>
      <div className="portfolio-card__top">
        <AppIcon iconPath={app.iconPath} name={app.name} />
        <div className="portfolio-card__meta-col">
          <div className="portfolio-card__tags">
            <span className="portfolio-card__category text-meta">{app.category}</span>
            <span className="portfolio-card__track-badge text-meta">Closed Testing Track</span>
          </div>
          <h3 className="portfolio-card__name">{app.name}</h3>
        </div>
      </div>

      <div className="portfolio-card__body">
        {app.description && (
          <p className="portfolio-card__desc">{app.description}</p>
        )}
        <div className="portfolio-card__package">
          <span className="portfolio-card__pkg-label text-meta">Package ID:</span>
          <code className="portfolio-card__pkg-code">{app.packageId}</code>
        </div>
      </div>

      <div className="portfolio-card__actions">
        <a
          href={app.playUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-card__link link-underline"
          aria-label={`View ${app.name} on Google Play Store`}
        >
          View on Google Play <span className="arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

export function GooglePlayClosedTesting({ onNavigateHome }: GooglePlayClosedTestingProps) {
  const [conversionState, setConversionState] = useState<CurrencyConversionState>(() => {
    const cached = getCachedExchangeRate();
    if (cached) {
      return {
        basePriceInr: BASE_INR_PRICE,
        usdPrice: Number((BASE_INR_PRICE * cached.rate).toFixed(2)),
        rate: cached.rate,
        rateDate: cached.dateString,
        isLive: false,
        isCached: true,
        isLoading: true,
        errorMessage: null,
      };
    }
    return {
      basePriceInr: BASE_INR_PRICE,
      usdPrice: null,
      rate: null,
      rateDate: null,
      isLive: false,
      isCached: false,
      isLoading: true,
      errorMessage: null,
    };
  });

  useEffect(() => {
    let isMounted = true;
    fetchInrToUsdRate().then((state) => {
      if (isMounted) {
        setConversionState(state);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Animated USD price
  const animatedUsd = useAnimatedPrice(conversionState.usdPrice, 550);

  const formattedInr = formatInr(BASE_INR_PRICE);
  const formattedUsd = animatedUsd !== null ? formatUsd(animatedUsd) : null;

  return (
    <div className="service-page">
      {/* Breadcrumbs Navigation */}
      <nav className="service-page__breadcrumbs container" aria-label="Breadcrumb">
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
              onClick={() => {
                onNavigateHome();
                setTimeout(() => {
                  const el = document.getElementById('services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="breadcrumbs-link"
            >
              Services
            </button>
          </li>
          <li className="breadcrumbs-separator" aria-hidden="true">/</li>
          <li className="breadcrumbs-item breadcrumbs-item--active" aria-current="page">
            Google Play Closed Testing
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="service-hero section" aria-labelledby="service-hero-heading">
        <div className="container">
          <div className="service-hero__layout">
            <div className="service-hero__content">
              <div className="section-label">
                <span className="section-label__line" />
                <span className="section-label__text">GOOGLE PLAY PUBLISHING SUPPORT</span>
              </div>

              <h1 id="service-hero-heading" className="service-hero__title">
                Prepare your app for <span className="text-editorial">Google Play release.</span>
              </h1>

              <p className="service-hero__lead">
                Get support with Google Play closed testing for your Android application, with a clear service scope and straightforward pricing.
              </p>

              <div className="service-hero__actions">
                <a
                  href="mailto:support@evostackr.in?subject=Google%20Play%20Closed%20Testing%20Inquiry"
                  className="btn btn--primary"
                  aria-label="Discuss your app with Evostackr via email"
                >
                  Discuss your app <span className="arrow" aria-hidden="true">→</span>
                </a>
                <a href="#how-it-works" className="btn btn--secondary">
                  How it works <span className="arrow" aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            {/* Prominent Pricing Card */}
            <div className="service-hero__pricing">
              <aside className="price-card" aria-label="Starting price card">
                <div className="price-card__header">
                  <span className="price-card__eyebrow text-meta">Transparent Pricing</span>
                  <span className="price-card__label">Starting from</span>
                </div>

                <div className="price-card__figures">
                  <div className="price-card__primary">
                    {formattedUsd ? (
                      <div className="price-card__usd-wrapper">
                        <span className="price-card__usd-value">{formattedUsd}</span>
                        <span className="price-card__currency-tag">USD</span>
                      </div>
                    ) : conversionState.isLoading ? (
                      <div className="price-card__loading text-meta">Calculating rate...</div>
                    ) : (
                      <div className="price-card__fallback text-meta">USD conversion unavailable</div>
                    )}
                  </div>

                  <div className="price-card__secondary">
                    <span className="price-card__inr-ref">{formattedInr} INR</span>
                    <span className="price-card__ref-label text-meta">Base reference price</span>
                  </div>
                </div>

                <div className="price-card__meta">
                  <p className="price-card__disclaimer text-meta">
                    USD equivalent based on the latest available exchange rate.
                  </p>

                  <div className="price-card__status">
                    {conversionState.isLive && conversionState.rateDate && (
                      <span className="status-indicator status-indicator--live text-meta">
                        <span className="status-dot" aria-hidden="true" />
                        Live exchange rate ({new Date(conversionState.rateDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})
                      </span>
                    )}
                    {conversionState.isCached && conversionState.rateDate && (
                      <span className="status-indicator status-indicator--cached text-meta">
                        <span className="status-dot status-dot--cached" aria-hidden="true" />
                        Cached rate ({new Date(conversionState.rateDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})
                      </span>
                    )}
                    {conversionState.errorMessage && (
                      <span className="status-indicator status-indicator--error text-meta">
                        {conversionState.errorMessage}
                      </span>
                    )}
                  </div>
                </div>

                <div className="price-card__cta">
                  <a
                    href="mailto:support@evostackr.in?subject=Google%20Play%20Closed%20Testing%20Quote"
                    className="btn btn--secondary btn--full"
                  >
                    Request quote for your app <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Scope / What the Service Covers */}
      <section className="service-scope section" aria-labelledby="scope-heading">
        <div className="container">
          <div className="service-scope__header">
            <div className="section-label">
              <span className="section-label__line" />
              <span className="section-label__text">Service Scope</span>
            </div>
            <h2 id="scope-heading" className="service-scope__title">
              What the service <span className="text-editorial">covers.</span>
            </h2>
            <p className="service-scope__subtitle">
              Structured assistance focused on meeting Google Play closed testing track workflows and release preparation.
            </p>
          </div>

          <div className="service-scope__grid">
            <article className="scope-card">
              <span className="scope-card__num text-meta">01</span>
              <h3 className="scope-card__title">Closed testing coordination</h3>
              <p className="scope-card__text">
                Assistance with configuring the closed testing track inside the Google Play Console, distributing app releases via closed tracks, and managing test channel setups.
              </p>
            </article>

            <article className="scope-card">
              <span className="scope-card__num text-meta">02</span>
              <h3 className="scope-card__title">Tester participation and support</h3>
              <p className="scope-card__text">
                Coordination of active test participants to install, run, and provide genuine feedback on your Android application throughout the required testing duration.
              </p>
            </article>

            <article className="scope-card">
              <span className="scope-card__num text-meta">03</span>
              <h3 className="scope-card__title">Understanding Google Play requirements</h3>
              <p className="scope-card__text">
                Guidance on interpreting Google Play testing rules, analyzing crash reports and device compatibility matrices, and addressing issues before production application.
              </p>
            </article>

            <article className="scope-card">
              <span className="scope-card__num text-meta">04</span>
              <h3 className="scope-card__title">Workflow and release preparation</h3>
              <p className="scope-card__text">
                Systematic walkthrough of pre-launch reports, store listing preparedness, and answering the required 14-day closed testing questionnaire accurately.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="service-process section" aria-labelledby="process-heading">
        <div className="container">
          <div className="service-process__header">
            <div className="section-label section-label--dark">
              <span className="section-label__line" />
              <span className="section-label__text">Testing Workflow</span>
            </div>
            <h2 id="process-heading" className="service-process__title">
              How it <span className="text-editorial">works.</span>
            </h2>
            <p className="service-process__subtitle">
              A transparent, three-step process from initial review to completion of your closed testing track.
            </p>
          </div>

          <div className="service-process__steps">
            <div className="process-step">
              <div className="process-step__number text-meta">01</div>
              <div className="process-step__content">
                <h3 className="process-step__title">Share your app details</h3>
                <p className="process-step__text">
                  The developer shares the app category, package details, current publishing status, and specific assistance required for their Google Play Console account.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step__number text-meta">02</div>
              <div className="process-step__content">
                <h3 className="process-step__title">Confirm the service scope</h3>
                <p className="process-step__text">
                  Evostackr confirms eligibility, account requirements, testing deliverables, timeline, starting price, and the expected process before any work begins.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step__number text-meta">03</div>
              <div className="process-step__content">
                <h3 className="process-step__title">Proceed with testing support</h3>
                <p className="process-step__text">
                  Testing support begins systematically after the scope, track access requirements, and commercial terms have been mutually reviewed and agreed upon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Transparency Notice */}
      <section className="service-policy section" aria-labelledby="policy-heading">
        <div className="container">
          <div className="policy-box">
            <div className="policy-box__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div className="policy-box__body">
              <h2 id="policy-heading" className="policy-box__title">
                Important Google Play Policy Transparency
              </h2>
              <p className="policy-box__text">
                Google Play determines its own testing, eligibility, review, and production-access requirements. Service availability and deliverables depend on the app, account eligibility, and the agreed scope.
              </p>
              <p className="policy-box__note text-meta">
                Evostackr supports the closed testing workflow through legitimate coordination and genuine tester participation. We do not offer or facilitate fabricated feedback, bot engagement, or policy evasion, and we do not guarantee automated approval or production access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Transparency & Terms */}
      <section className="service-pricing-info section" aria-labelledby="pricing-details-heading">
        <div className="container">
          <div className="pricing-info__layout">
            <div className="pricing-info__left">
              <div className="section-label">
                <span className="section-label__line" />
                <span className="section-label__text">Pricing Breakdown</span>
              </div>
              <h2 id="pricing-details-heading" className="pricing-info__title">
                Straightforward commercial <span className="text-editorial">terms.</span>
              </h2>
              <p className="pricing-info__text">
                Every Android application is unique. Our starting price covers fundamental closed testing coordination and tester support, while final quotes reflect the confirmed scope.
              </p>
            </div>

            <div className="pricing-info__details">
              <div className="pricing-detail-item">
                <h3 className="pricing-detail-title">Starting Price: ₹1,245 INR</h3>
                <p className="pricing-detail-desc">
                  The verified starting reference fee is ₹1,245 INR. The displayed USD conversion is purely informational and derived from real-time foreign exchange market rates.
                </p>
              </div>

              <div className="pricing-detail-item">
                <h3 className="pricing-detail-title">Scope-Based Custom Quotation</h3>
                <p className="pricing-detail-desc">
                  Depending on your app size, specialized device requirements, testing duration, or additional manual telemetry needs, an itemized quote will be agreed upon before initiating work.
                </p>
              </div>

              <div className="pricing-detail-item">
                <h3 className="pricing-detail-title">Direct Invoicing &amp; Communication</h3>
                <p className="pricing-detail-desc">
                  We don't use arbitrary automated checkouts. You communicate directly with our engineering team to review your app details and establish clear deliverables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closed Testing Portfolio Section */}
      <section id="portfolio" className="service-portfolio section" aria-labelledby="portfolio-heading">
        <div className="container">
          <div className="service-portfolio__header">
            <div className="section-label">
              <span className="section-label__line" />
              <span className="section-label__text">CLOSED TESTING PORTFOLIO</span>
            </div>
            <h2 id="portfolio-heading" className="service-portfolio__title">
              Apps we've supported through <span className="text-editorial">closed testing.</span>
            </h2>
            <p className="service-portfolio__subtitle">
              We have supported closed testing for Android applications across multiple categories. Explore the applications listed below on Google Play.
            </p>
            <p className="service-portfolio__notice text-meta">
              Notice: The applications below are independent client and community projects supported through Evostackr's closed testing services, not products owned or developed by Evostackr.
            </p>
          </div>

          <div className="service-portfolio__grid">
            {closedTestingApps.map((app) => (
              <PortfolioCard app={app} key={app.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry / Contact CTA Section */}
      <section id="inquiry" className="service-contact section" aria-labelledby="inquiry-heading">
        <div className="container">
          <div className="service-contact__box">
            <div className="section-label section-label--dark">
              <span className="section-label__line" />
              <span className="section-label__text">Start Closed Testing</span>
            </div>

            <h2 id="inquiry-heading" className="service-contact__title">
              Ready to prepare your app for <span className="text-editorial">production?</span>
            </h2>

            <p className="service-contact__lead">
              Send us your application overview, current Google Play Console track status, and target timeline. We will review your submission and reply with scope details.
            </p>

            <div className="service-contact__actions">
              <a
                href="mailto:support@evostackr.in?subject=Google%20Play%20Closed%20Testing%20Inquiry"
                className="btn btn--dark"
              >
                support@evostackr.in <span className="arrow" aria-hidden="true">→</span>
              </a>
              <button
                type="button"
                onClick={onNavigateHome}
                className="btn btn--secondary service-contact__back-btn"
              >
                Explore other services <span className="arrow" aria-hidden="true">→</span>
              </button>
            </div>

            <p className="service-contact__subnote text-meta">
              Official inquiry channel: support@evostackr.in • Response typically within 24 business hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
