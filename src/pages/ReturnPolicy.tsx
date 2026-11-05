import './ReturnPolicy.css';

interface ReturnPolicyProps {
  onNavigateHome: () => void;
  onNavigate: (path: string, hash?: string) => void;
}

export function ReturnPolicy({ onNavigateHome, onNavigate }: ReturnPolicyProps) {
  return (
    <div className="return-policy-page">
      {/* Breadcrumbs Navigation */}
      <nav className="return-policy-page__breadcrumbs container" aria-label="Breadcrumb">
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
            Return Policy
          </li>
        </ol>
      </nav>

      {/* Page Hero Header */}
      <header className="return-policy-page__hero container" aria-labelledby="policy-title">
        <div className="return-policy-page__layout">
          <div className="section-label">
            <span className="section-label__line" />
            <span className="text-meta">OFFICIAL STORE &amp; SERVICE DIRECTIVE</span>
          </div>
          <h1 id="policy-title" className="return-policy-page__title">
            Merchant Return &amp; <span className="text-editorial">Refund Policy</span>
          </h1>
          <p className="return-policy-page__description">
            Authoritative terms governing digital software licenses, downloadable source code packages, and custom software engineering services provided by Evostackr.
          </p>
          <div className="return-policy-page__meta-badge">
            <span>Last Updated: November 2026</span>
            <span>•</span>
            <span>Jurisdiction: India / Global Electronic Fulfillment</span>
          </div>
        </div>
      </header>

      {/* Policy Content Sections */}
      <section className="return-policy-page__content container" aria-label="Policy Provisions">
        {/* Provision 1: Digital Downloads */}
        <article className="return-policy-card">
          <div className="return-policy-card__header">
            <span className="return-policy-card__num">01</span>
            <h2 className="return-policy-card__title">
              Digital Software Downloads &amp; Source Code Packages
            </h2>
          </div>
          <div className="return-policy-card__body">
            <p>
              Evostackr distributes digital software products (including <strong>EvoEdu Pro</strong> and related engineering suites) as instant downloadable archives containing full, unencrypted source code, database migrations, and administrative interfaces.
            </p>
            <p>
              Because unencrypted software source code confers immediate, irreversible possession of proprietary intellectual property upon completion of checkout, <strong>all sales of digital software downloads are final, non-refundable, and non-returnable once the download link or source archive has been transmitted</strong>.
            </p>
            <div className="return-policy-card__highlight">
              <strong>Schema.org Standard Classification</strong>
              Return Policy Category: <code>https://schema.org/MerchantReturnNotPermitted</code> (Returns Not Permitted for Digital Goods).
            </div>
            <p>
              We strongly encourage prospective purchasers to review the comprehensive live showcases, architectural specifications, server requirements (PHP 8.2+, Laravel 12, MySQL), and feature modules published on the product detail page prior to completing their order.
            </p>
          </div>
        </article>

        {/* Provision 2: Defect Guarantee & File Replacement */}
        <article className="return-policy-card">
          <div className="return-policy-card__header">
            <span className="return-policy-card__num">02</span>
            <h2 className="return-policy-card__title">
              Technical Defect &amp; Archive Integrity Guarantee
            </h2>
          </div>
          <div className="return-policy-card__body">
            <p>
              While voluntary returns or change-of-mind refunds are not permitted for digital assets, Evostackr guarantees the technical integrity of all delivered packages.
            </p>
            <p>
              If you experience any of the following within <strong>14 days of purchase</strong>:
            </p>
            <ul>
              <li>A corrupt or unreadable ZIP/TAR download archive;</li>
              <li>A critical checksum mismatch or missing package file identified in the official manifest;</li>
              <li>A reproducible core system defect preventing initial setup on verified compatible host infrastructure;</li>
            </ul>
            <p>
              Our engineering team will promptly provide replacement download links, updated package archives, or direct technical troubleshooting to ensure successful deployment. Requests should be submitted with order verification to <a href="mailto:support@evostackr.in" className="link-underline">support@evostackr.in</a>.
            </p>
          </div>
        </article>

        {/* Provision 3: Custom Engineering Services */}
        <article className="return-policy-card">
          <div className="return-policy-card__header">
            <span className="return-policy-card__num">03</span>
            <h2 className="return-policy-card__title">
              Bespoke Software Engineering &amp; Platform Development
            </h2>
          </div>
          <div className="return-policy-card__body">
            <p>
              Custom software development services—including bespoke web application engineering, SaaS multi-tenant development, operational automation, and third-party API integration—are executed pursuant to individual project agreements with clearly defined sprint milestones.
            </p>
            <p>
              Deposits or project retainers are refundable pro-rata strictly prior to the commencement of active architectural design or code implementation. Once milestone deliverables are reviewed, deployed, or accepted, and corresponding source repositories are transferred, that milestone fee becomes fully non-refundable.
            </p>
          </div>
        </article>

        {/* Provision 4: Google Play Closed Testing Services */}
        <article className="return-policy-card">
          <div className="return-policy-card__header">
            <span className="return-policy-card__num">04</span>
            <h2 className="return-policy-card__title">
              Google Play Closed Testing Track Support
            </h2>
          </div>
          <div className="return-policy-card__body">
            <p>
              Evostackr coordinates closed testing tracks utilizing dedicated, opt-in human testers across 14 consecutive days to support Google Play Console compliance requirements.
            </p>
            <p>
              Closed testing service orders may be canceled for a 100% full refund at any time <em>before</em> your application release track has been distributed to the tester cohort. Once tester onboarding commences and testing telemetry is recorded, the service fee is non-refundable.
            </p>
          </div>
        </article>

        {/* Provision 5: Fulfillment & Delivery Notice */}
        <article className="return-policy-card">
          <div className="return-policy-card__header">
            <span className="return-policy-card__num">05</span>
            <h2 className="return-policy-card__title">
              Electronic Fulfillment &amp; Zero Physical Shipping
            </h2>
          </div>
          <div className="return-policy-card__body">
            <p>
              Evostackr operates exclusively in software engineering, digital products, and technical consulting. <strong>No physical commodities, boxed software, optical discs, or tangible goods are manufactured, dispatched, or shipped</strong>.
            </p>
            <p>
              All software purchases are fulfilled immediately via electronic network transmission over secure HTTPS connections. No shipping fees, customs charges, or transit intervals apply to any Evostackr transactions.
            </p>
          </div>
        </article>

        {/* Contact & Support Inquiries Panel */}
        <div className="return-policy-page__contact-panel">
          <div className="section-label">
            <span className="section-label__line" />
            <span className="text-meta">DIRECT ASSISTANCE</span>
          </div>
          <h2>Questions Regarding Returns or Technical Support?</h2>
          <p>
            If you have an inquiry about a recent order, require an archive re-download, or need developer assistance with an Evostackr software product, our engineering team is available to assist you directly.
          </p>
          <div className="return-policy-page__actions">
            <a href="mailto:support@evostackr.in" className="btn btn--dark">
              Email Support: support@evostackr.in
            </a>
            <button
              type="button"
              onClick={() => onNavigate('/store')}
              className="btn btn--secondary"
            >
              Browse Software Store <span className="arrow" aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              className="btn btn--secondary"
            >
              Return to Homepage <span className="arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
