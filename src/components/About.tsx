import './About.css';

export function About() {
  return (
    <section id="about" className="about section" aria-labelledby="about-heading">
      <div className="container">
        <div className="about__layout">
          <div className="about__label-col">
            <div className="section-label">
              <span className="section-label__line" />
              <span className="section-label__text">About</span>
            </div>
          </div>

          <div className="about__content">
            <h2 id="about-heading" className="about__title">
              We build software<br />
              that <span className="text-editorial">works.</span>
            </h2>

            <div className="about__text">
              <p className="about__paragraph">
                We're an independent software company. We design, build, and operate our own 
                digital products — and we bring that same engineering discipline to custom 
                software we develop for others.
              </p>
              <p className="about__paragraph">
                Our work is rooted in practical problem-solving. Every product we ship and 
                every system we build starts with a real requirement, not a trend. We care 
                about useful software: reliable, maintainable, and built to serve its purpose 
                without unnecessary complexity.
              </p>
              <p className="about__paragraph">
                Whether we're developing our own product ideas or engineering solutions for 
                clients, the approach stays the same: understand the problem deeply, design 
                with intention, and build with precision.
              </p>
            </div>
          </div>

          <div className="about__visual" aria-hidden="true">
            <svg viewBox="0 0 200 400" fill="none" className="about__graphic">
              {/* Vertical composition */}
              <rect x="20" y="20" width="160" height="1" fill="#D9DCDA" />
              <rect x="20" y="60" width="160" height="1" fill="#D9DCDA" />
              <rect x="20" y="100" width="160" height="1" fill="#D9DCDA" />
              <rect x="20" y="140" width="160" height="1" fill="#D9DCDA" />

              {/* Modules */}
              <rect x="20" y="20" width="70" height="36" fill="#111827" />
              <rect x="100" y="60" width="80" height="36" fill="#E8EBE9" stroke="#D9DCDA" strokeWidth="1" />
              <rect x="20" y="100" width="50" height="36" fill="#DDE1DF" />
              <rect x="80" y="100" width="100" height="36" fill="#E8EBE9" stroke="#D9DCDA" strokeWidth="1" />

              {/* Connection structure */}
              <line x1="55" y1="56" x2="55" y2="60" stroke="#111827" strokeWidth="1" />
              <line x1="140" y1="96" x2="140" y2="100" stroke="#111827" strokeWidth="1" />
              <line x1="45" y1="136" x2="45" y2="180" stroke="#111827" strokeWidth="0.5" strokeDasharray="3 3" />

              {/* Circle detail */}
              <circle cx="100" cy="220" r="50" stroke="#D9DCDA" strokeWidth="1" fill="none" />
              <circle cx="100" cy="220" r="30" stroke="#111827" strokeWidth="1" fill="none" />
              <circle cx="100" cy="220" r="3" fill="#111827" />

              {/* Bottom grid */}
              <rect x="20" y="300" width="40" height="40" fill="#E8EBE9" />
              <rect x="68" y="300" width="40" height="40" fill="#111827" />
              <rect x="116" y="300" width="40" height="40" fill="#DDE1DF" />
              <rect x="20" y="348" width="40" height="40" fill="#DDE1DF" />
              <rect x="68" y="348" width="40" height="40" fill="#E8EBE9" />
              <rect x="116" y="348" width="40" height="40" fill="#111827" />

              {/* Labels */}
              <text x="170" y="42" fill="#BFC4C2" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="500">A</text>
              <text x="170" y="82" fill="#BFC4C2" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="500">B</text>
              <text x="170" y="122" fill="#BFC4C2" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="500">C</text>
            </svg>
          </div>
        </div>

        <div className="about__principles">
          <div className="about__principle">
            <span className="about__principle-num text-meta">01</span>
            <h3 className="about__principle-title">Product-oriented</h3>
            <p className="about__principle-text">We think like product builders, not contractors. Every decision is shaped by what makes the software better for its users.</p>
          </div>
          <div className="about__principle">
            <span className="about__principle-num text-meta">02</span>
            <h3 className="about__principle-title">Engineering depth</h3>
            <p className="about__principle-text">Solid architecture, clean code, and reliable systems. We build software that lasts and scales without constant patching.</p>
          </div>
          <div className="about__principle">
            <span className="about__principle-num text-meta">03</span>
            <h3 className="about__principle-title">Practical focus</h3>
            <p className="about__principle-text">Real solutions for real problems. No feature bloat, no over-engineering. Software that does what it needs to do, well.</p>
          </div>
        </div>

        {/* Credibility, Commercial Proof & Engineering Methodology */}
        <div className="about__proof-section trust-signals" id="credibility-and-proof" aria-label="Commercial proof, engineering methodology, and data provenance">
          <div className="about__proof-header">
            <div className="section-label">
              <span className="section-label__line" />
              <span className="section-label__text">Proof &amp; Methodology</span>
            </div>
            <h3 className="about__proof-title">
              Verifiable deliverables, open methodology, and complete provenance.
            </h3>
            <p className="about__proof-subtitle">
              We operate with full technical transparency. Every metric, deliverable, and security guarantee is backed by live production code and verifiable public citations.
            </p>
          </div>

          <div className="about__proof-grid">
            {/* Card 1: Commercial Proof & Deliverables */}
            <article className="about__proof-card" data-trust-signal="commercial-proof">
              <div className="about__proof-card-header">
                <span className="about__proof-badge text-meta">01 • Commercial Proof</span>
                <h4 className="about__proof-card-title">Production Software &amp; Deliverables</h4>
              </div>
              <ul className="about__proof-list">
                <li className="about__proof-item">
                  <strong>8+ Independent Products Shipped:</strong> Production utilities including SMS Campaign Manager, Pink PDF, CodeVault, and Fabricate with public architectural specifications.
                </li>
                <li className="about__proof-item">
                  <strong>11+ Google Play Applications:</strong> Deployed Android applications verified on the official Play Store with public package identifiers.
                </li>
                <li className="about__proof-item">
                  <strong>Instant Source Delivery:</strong> Evostackr Store packages include direct unencrypted source code downloads on checkout with zero recurring platform markups.
                </li>
              </ul>
              <cite className="about__proof-cite text-meta">
                Source: <a href="https://dir.evostackr.in/" target="_blank" rel="noopener noreferrer" className="link-underline">Evostackr Project Directory ↗</a>
              </cite>
            </article>

            {/* Card 2: Security & Privacy Methodology */}
            <article className="about__proof-card" data-trust-signal="methodology">
              <div className="about__proof-card-header">
                <span className="about__proof-badge text-meta">02 • Methodology</span>
                <h4 className="about__proof-card-title">Privacy &amp; Engineering Standards</h4>
              </div>
              <ul className="about__proof-list">
                <li className="about__proof-item">
                  <strong>Zero-Telemetry Standard:</strong> In-browser WebAssembly cryptography (Pink PDF) and local background engines (SMS Campaign Manager) execute with 100% client-side privacy.
                </li>
                <li className="about__proof-item">
                  <strong>Google Play Compliance Protocol:</strong> 20 verified opt-in human testers actively tracked over 14 continuous days satisfying Google Play Console publishing criteria.
                </li>
                <li className="about__proof-item">
                  <strong>Edge-First Security Architecture:</strong> Deployed on Cloudflare Edge with strict Content Security Policy, HSTS preload, and sub-200ms TTFB globally.
                </li>
              </ul>
              <cite className="about__proof-cite text-meta">
                Methodology: <a href="/services/google-play-closed-testing" className="link-underline">14-Day Testing Protocol Documentation →</a>
              </cite>
            </article>

            {/* Card 3: Authorship & Data Provenance */}
            <article className="about__proof-card" data-trust-signal="provenance">
              <div className="about__proof-card-header">
                <span className="about__proof-badge text-meta">03 • Provenance</span>
                <h4 className="about__proof-card-title">Authorship &amp; Public Code</h4>
              </div>
              <ul className="about__proof-list">
                <li className="about__proof-item">
                  <strong>Engineering Authorship:</strong> Engineered, maintained, and operated directly by the core Evostackr engineering team (Jharkhand, India).
                </li>
                <li className="about__proof-item">
                  <strong>Public Code Repositories:</strong> Open developer resources, UI component templates, and platform schemas hosted on our verified GitHub organization.
                </li>
                <li className="about__proof-item">
                  <strong>Audited Review Dates:</strong> System architecture, security headers, and compliance verified regularly. Current audit cycle: <strong><time dateTime="2026-10">October 2026</time></strong>.
                </li>
              </ul>
              <cite className="about__proof-cite text-meta">
                Provenance: <a href="https://github.com/Evostackr" target="_blank" rel="noopener noreferrer" className="link-underline">github.com/Evostackr ↗</a>
              </cite>
            </article>

            {/* Card 4: Support SLA & Commercial Terms */}
            <article className="about__proof-card" data-trust-signal="commercial-guarantee">
              <div className="about__proof-card-header">
                <span className="about__proof-badge text-meta">04 • Guarantees</span>
                <h4 className="about__proof-card-title">Direct Engineering SLA &amp; Pricing</h4>
              </div>
              <ul className="about__proof-list">
                <li className="about__proof-item">
                  <strong>Direct Engineer Access:</strong> Communication directly with software engineers via official WhatsApp and email—no automated bots or sales gatekeepers.
                </li>
                <li className="about__proof-item">
                  <strong>24-Hour Response SLA:</strong> Guaranteed technical response within 24 business hours for all project and closed-testing inquiries.
                </li>
                <li className="about__proof-item">
                  <strong>Transparent Fixed Pricing:</strong> Clear, upfront starting rates (from ₹1,245 INR / $49 USD) with confirmed terms prior to engagement.
                </li>
              </ul>
              <cite className="about__proof-cite text-meta">
                Guarantees: <a href="mailto:support@evostackr.in" className="link-underline">support@evostackr.in</a>
              </cite>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
