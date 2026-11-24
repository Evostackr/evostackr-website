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
              We build software <br />
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
                <div className="about__proof-badge-wrap">
                  <div className="about__proof-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m7.5 4.27 9 5.15" />
                      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                      <path d="m3.3 7 8.7 5 8.7-5" />
                      <path d="M12 22V12" />
                    </svg>
                  </div>
                  <span className="about__proof-badge text-meta">01 • Commercial Proof</span>
                </div>
                <h4 className="about__proof-card-title">Production Software &amp; Deliverables</h4>
              </div>

              <div className="about__proof-tiles">
                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>8+ Independent Products Shipped</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    Production utilities including SMS Campaign Manager, Pink PDF, CodeVault, and Fabricate with public architectural specifications.
                  </p>
                </div>

                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>11+ Apps Closed Tested</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    Android applications for which Evostackr provided Google Play Closed Testing track compliance.
                  </p>
                </div>

                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>Instant Source Delivery</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    Evostackr Store packages include direct unencrypted source code downloads on checkout with zero recurring platform markups.
                  </p>
                </div>
              </div>

              <div className="about__proof-footer">
                <a href="https://dir.evostackr.in/" target="_blank" rel="noopener noreferrer" className="about__proof-link">
                  <span>Source: Evostackr Project Directory</span>
                  <span className="arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </article>

            {/* Card 2: Security & Privacy Methodology */}
            <article className="about__proof-card" data-trust-signal="methodology">
              <div className="about__proof-card-header">
                <div className="about__proof-badge-wrap">
                  <div className="about__proof-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <span className="about__proof-badge text-meta">02 • Methodology</span>
                </div>
                <h4 className="about__proof-card-title">Privacy &amp; Engineering Standards</h4>
              </div>

              <div className="about__proof-tiles">
                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>Zero-Telemetry Standard</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    In-browser WebAssembly cryptography (Pink PDF) and local background engines (SMS Campaign Manager) execute with 100% client-side privacy.
                  </p>
                </div>

                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>Google Play Compliance Protocol</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    20 verified opt-in human testers actively tracked over 14 continuous days satisfying Google Play Console publishing criteria.
                  </p>
                </div>

                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>Edge-First Security Architecture</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    Deployed on Cloudflare Edge with strict Content Security Policy, HSTS preload, and sub-200ms TTFB globally.
                  </p>
                </div>
              </div>

              <div className="about__proof-footer">
                <a href="/services/google-play-closed-testing" className="about__proof-link">
                  <span>Methodology: 14-Day Testing Protocol</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </article>

            {/* Card 3: Authorship & Data Provenance */}
            <article className="about__proof-card" data-trust-signal="provenance">
              <div className="about__proof-card-header">
                <div className="about__proof-badge-wrap">
                  <div className="about__proof-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m18 16 4-4-4-4" />
                      <path d="m6 8-4 4 4 4" />
                      <path d="m14.5 4-5 16" />
                    </svg>
                  </div>
                  <span className="about__proof-badge text-meta">03 • Provenance</span>
                </div>
                <h4 className="about__proof-card-title">Authorship &amp; Public Code</h4>
              </div>

              <div className="about__proof-tiles">
                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>Engineering Authorship</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    Engineered, maintained, and operated directly by the core Evostackr engineering team (Jharkhand, India).
                  </p>
                </div>

                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>Public Code Repositories</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    Open developer resources, UI component templates, and platform schemas hosted on our verified GitHub organization.
                  </p>
                </div>

                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>Audited Review Dates</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    System architecture, security headers, and compliance verified regularly. Current audit cycle: <strong><time dateTime="2026-10">October 2026</time></strong>.
                  </p>
                </div>
              </div>

              <div className="about__proof-footer">
                <a href="https://github.com/Evostackr" target="_blank" rel="noopener noreferrer" className="about__proof-link">
                  <span>Provenance: github.com/Evostackr</span>
                  <span className="arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </article>

            {/* Card 4: Support SLA & Commercial Terms */}
            <article className="about__proof-card" data-trust-signal="commercial-guarantee">
              <div className="about__proof-card-header">
                <div className="about__proof-badge-wrap">
                  <div className="about__proof-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span className="about__proof-badge text-meta">04 • Guarantees</span>
                </div>
                <h4 className="about__proof-card-title">Direct Engineering SLA &amp; Pricing</h4>
              </div>

              <div className="about__proof-tiles">
                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>Direct Engineer Access</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    Communication directly with software engineers via official WhatsApp and email—no automated bots or sales gatekeepers.
                  </p>
                </div>

                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>24-Hour Response SLA</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    Guaranteed technical response within 24 business hours for all project and closed-testing inquiries.
                  </p>
                </div>

                <div className="about__proof-tile">
                  <div className="about__proof-tile-lead">
                    <span className="about__proof-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <strong>Transparent Fixed Pricing</strong>
                  </div>
                  <p className="about__proof-tile-text">
                    Clear, upfront starting rates (from ₹1,245 INR / $49 USD) with confirmed terms prior to engagement.
                  </p>
                </div>
              </div>

              <div className="about__proof-footer">
                <a href="mailto:support@evostackr.in" className="about__proof-link">
                  <span>Guarantees: support@evostackr.in</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
