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
      </div>
    </section>
  );
}
