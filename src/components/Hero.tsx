import './Hero.css';

interface HeroProps {
  onExploreProducts?: () => void;
}

export function Hero({ onExploreProducts: _onExploreProducts }: HeroProps = {}) {
  return (
    <section className="hero section" aria-label="Introduction">
      <div className="hero__inner container">
        {/* Left Column: Content */}
        <div className="hero__content">
          <div className="hero__pill-tag">
            <span className="hero__pill-sparkle">✦</span>
            <span>Independent Software Studio &amp; Engineering</span>
          </div>

          <h1 className="hero__headline">
            Order a custom <br />
            <span className="hero__headline-highlight">Website &amp; Software</span> like you
            would a pizza
          </h1>

          <p className="hero__description">
            We conceptualize, engineer, maintain, and publish high-performance web applications,
            proprietary mobile systems, and Google Play closed testing tracks with zero template bloat
            and 100% source code ownership.
          </p>

          <div className="hero__actions">
            <a href="#instant-quote" className="btn btn--neo-hero">
              Get Instant Quote <span className="arrow" aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="https://blog.evostackr.in/product-launches"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline hero__btn-secondary"
            >
              Explore Products
            </a>
          </div>

          {/* Checklist Badges matching reference */}
          <div className="hero__badges">
            <div className="hero__badge">
              <span className="hero__badge-check">✓</span>
              <span>Unbeatable Quality</span>
            </div>
            <div className="hero__badge">
              <span className="hero__badge-check">✓</span>
              <span>Reasonable Price Range</span>
            </div>
            <div className="hero__badge">
              <span className="hero__badge-check">✓</span>
              <span>100% Code Ownership</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Isometric Code & Windows Illustration */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__isometric-stage">
            <svg
              className="hero__isometric-svg"
              viewBox="0 0 520 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Drop Shadow Base */}
              <ellipse cx="280" cy="380" rx="200" ry="24" fill="rgba(18, 19, 22, 0.08)" />

              {/* Window 1 (Background White Window) */}
              <g transform="translate(140, 60) skewY(-8) scale(0.95, 0.95)">
                <rect
                  x="0"
                  y="0"
                  width="300"
                  height="220"
                  rx="14"
                  fill="#FFFFFF"
                  stroke="#121316"
                  strokeWidth="2.5"
                />
                {/* Header bar */}
                <line x1="0" y1="36" x2="300" y2="36" stroke="#121316" strokeWidth="2" />
                <circle cx="20" cy="18" r="4.5" fill="#121316" />
                <circle cx="36" cy="18" r="4.5" fill="#121316" />
                <circle cx="52" cy="18" r="4.5" fill="#121316" />
                {/* Internal Wireframe Lines */}
                <rect x="24" y="56" width="120" height="12" rx="3" fill="#EAEAEA" />
                <rect x="24" y="80" width="220" height="8" rx="2" fill="#F0F0F0" />
                <rect x="24" y="96" width="180" height="8" rx="2" fill="#F0F0F0" />
                <rect x="24" y="112" width="140" height="8" rx="2" fill="#F0F0F0" />

                {/* Sub grid cards */}
                <rect x="24" y="140" width="115" height="56" rx="6" fill="#FFF3EB" stroke="#121316" strokeWidth="1.5" />
                <rect x="155" y="140" width="115" height="56" rx="6" fill="#FAF8F5" stroke="#121316" strokeWidth="1.5" />
              </g>

              {/* Window 2 (Central Dark Terminal Window with Code Symbol) */}
              <g transform="translate(190, 80) skewY(-8)">
                <rect
                  x="0"
                  y="0"
                  width="250"
                  height="180"
                  rx="12"
                  fill="#1E2024"
                  stroke="#121316"
                  strokeWidth="3"
                />
                {/* Terminal Header */}
                <line x1="0" y1="32" x2="250" y2="32" stroke="#333842" strokeWidth="1.5" />
                <circle cx="18" cy="16" r="4" fill="#FF5F56" />
                <circle cx="32" cy="16" r="4" fill="#FFBD2E" />
                <circle cx="46" cy="16" r="4" fill="#27C93F" />

                {/* Large Code Symbol: < / > */}
                <g transform="translate(65, 60)">
                  {/* Left Bracket < */}
                  <path
                    d="M32 20 L8 45 L32 70"
                    stroke="#FF6B35"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Slash / */}
                  <path
                    d="M48 76 L72 14"
                    stroke="#FFFFFF"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Right Bracket > */}
                  <path
                    d="M88 20 L112 45 L88 70"
                    stroke="#FF6B35"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Terminal mini-status pill */}
                <rect x="20" y="146" width="60" height="18" rx="9" fill="#FF6B35" />
                <text x="32" y="159" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  LIVE
                </text>
              </g>

              {/* Window 3 (Foreground Vibrant Orange Layered Card) */}
              <g transform="translate(60, 150) skewY(-8)">
                <rect
                  x="0"
                  y="0"
                  width="250"
                  height="160"
                  rx="12"
                  fill="#FF8A50"
                  stroke="#121316"
                  strokeWidth="3"
                />
                {/* Header */}
                <line x1="0" y1="32" x2="250" y2="32" stroke="#121316" strokeWidth="2" />
                <circle cx="18" cy="16" r="4.5" fill="#121316" />
                <circle cx="32" cy="16" r="4.5" fill="#121316" />

                {/* Card Content Mockup */}
                <rect x="20" y="48" width="200" height="24" rx="6" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
                <line x1="36" y1="60" x2="160" y2="60" stroke="#121316" strokeWidth="3" strokeLinecap="round" />

                {/* Secondary Rows */}
                <rect x="20" y="86" width="130" height="12" rx="4" fill="#FFE2D1" stroke="#121316" strokeWidth="1.5" />
                <rect x="20" y="106" width="180" height="12" rx="4" fill="#FFE2D1" stroke="#121316" strokeWidth="1.5" />

                {/* Floating pill button inside */}
                <rect x="20" y="128" width="75" height="18" rx="9" fill="#121316" />
                <text x="30" y="141" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                  SHIP ✦
                </text>
              </g>

              {/* Floating Sparkles & Accent Badges */}
              <g transform="translate(380, 260)">
                <circle cx="20" cy="20" r="22" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
                <path
                  d="M20 8 L22 17 L31 20 L22 23 L20 32 L18 23 L9 20 L18 17 Z"
                  fill="#FF6B35"
                />
              </g>

              <g transform="translate(30, 90)">
                <path
                  d="M20 4 L23 16 L35 20 L23 24 L20 36 L17 24 L5 20 L17 16 Z"
                  fill="#FF6B35"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
