import './BudgetCallout.css';

export function BudgetCallout() {
  return (
    <section className="budget-callout section" aria-label="Flexible Budget Solutions">
      <div className="container">
        <div className="budget-callout__card">
          {/* Left Column: Copy & Action */}
          <div className="budget-callout__content">
            <h2 className="budget-callout__title">On a budget?</h2>
            <p className="budget-callout__desc">
              We understand what it's like to build within a tight budget. Let us know what you're able
              to invest, and we'll do our best to trim things down, prioritize core high-impact features,
              and engineer a solution within what you can afford.
            </p>
            <div className="budget-callout__prompt">
              <span className="budget-callout__prompt-text">Sounds Good?</span>
              <a href="#contact" className="btn btn--neo-budget">
                Contact us <span className="arrow" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Isometric 3D Wireframe Polyhedron Star */}
          <div className="budget-callout__visual" aria-hidden="true">
            <svg
              className="budget-callout__polyhedron"
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="orangeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#F87171" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FEE2E2" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Glowing Core Star */}
              <path
                d="M160 80 L180 135 L235 155 L180 175 L160 230 L140 175 L85 155 L140 135 Z"
                fill="url(#orangeGlow)"
              />

              {/* Outer Wireframe Hexagonal / Octahedral Crystal Lattice */}
              {/* Outer boundary lines */}
              <polygon
                points="160,35 245,85 285,160 245,235 160,285 75,235 35,160 75,85"
                stroke="#121316"
                strokeWidth="2"
                fill="none"
              />

              {/* Inner Cube / Polyhedron Facets */}
              <polygon
                points="160,80 225,120 225,200 160,240 95,200 95,120"
                stroke="#121316"
                strokeWidth="1.5"
                fill="rgba(254, 226, 226, 0.4)"
              />

              {/* Connecting Perspective Struts */}
              <line x1="160" y1="35" x2="160" y2="80" stroke="#121316" strokeWidth="1.5" />
              <line x1="245" y1="85" x2="225" y2="120" stroke="#121316" strokeWidth="1.5" />
              <line x1="285" y1="160" x2="225" y2="160" stroke="#121316" strokeWidth="1.5" />
              <line x1="245" y1="235" x2="225" y2="200" stroke="#121316" strokeWidth="1.5" />
              <line x1="160" y1="285" x2="160" y2="240" stroke="#121316" strokeWidth="1.5" />
              <line x1="75" y1="235" x2="95" y2="200" stroke="#121316" strokeWidth="1.5" />
              <line x1="35" y1="160" x2="95" y2="160" stroke="#121316" strokeWidth="1.5" />
              <line x1="75" y1="85" x2="95" y2="120" stroke="#121316" strokeWidth="1.5" />

              {/* Center Wireframe Node Cross */}
              <line x1="95" y1="120" x2="225" y2="200" stroke="#121316" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="225" y1="120" x2="95" y2="200" stroke="#121316" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="160" y1="80" x2="160" y2="240" stroke="#EF4444" strokeWidth="1.5" />

              {/* Central Glowing Sparkle Node */}
              <circle cx="160" cy="160" r="4.5" fill="#EF4444" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
