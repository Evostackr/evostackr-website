import './Footer.css';

const CURRENT_YEAR = 2026;

interface FooterProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent, path: string, hash?: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path, hash);
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__main">
          {/* Brand Info */}
          <div className="footer__brand">
            <div className="footer__logo-wrap">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <polygon points="33.44,13.27 10.0,50.2 32.91,86.73 80.05,86.73 72.85,74.94 39.85,74.94 25.06,50.2 41.03,25.19 82.67,25.19 90.0,13.27" fill="#121316" />
                <polygon points="45.35,37.5 75.07,37.5 68.0,49.15 38.28,49.15" fill="#EF4444" />
                <polygon points="39.46,55.17 64.6,55.17 58.97,64.47 45.09,64.47" fill="#EF4444" />
              </svg>
              <span className="footer__brand-name">Evostackr</span>
            </div>
            <p className="footer__brand-desc">
              Independent digital software engineering studio collaborating with founders and businesses worldwide.
            </p>
          </div>

          {/* Services Column */}
          <div className="footer__col">
            <h3 className="footer__col-title">Services</h3>
            <ul className="footer__links">
              <li>
                <a
                  href="/services/google-play-closed-testing"
                  onClick={(e) => handleLinkClick(e, '/services/google-play-closed-testing')}
                  className="footer__link"
                >
                  Google Play Closed Testing
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => handleLinkClick(e, '/', '#services')}
                  className="footer__link"
                >
                  Custom Web &amp; App Development
                </a>
              </li>
              <li>
                <a
                  href="https://blog.evostackr.in/product-launches"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link"
                >
                  Independent Software Products
                </a>
              </li>
              <li>
                <a
                  href="/store"
                  onClick={(e) => handleLinkClick(e, '/store')}
                  className="footer__link"
                >
                  Digital Product Store
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="footer__col">
            <h3 className="footer__col-title">Quick Links</h3>
            <ul className="footer__links">
              <li>
                <a
                  href="/#services"
                  onClick={(e) => handleLinkClick(e, '/', '#services')}
                  className="footer__link"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/#process"
                  onClick={(e) => handleLinkClick(e, '/', '#process')}
                  className="footer__link"
                >
                  Process
                </a>
              </li>
              <li>
                <a
                  href="/#instant-quote"
                  onClick={(e) => handleLinkClick(e, '/', '#instant-quote')}
                  className="footer__link"
                >
                  Instant Quote
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  onClick={(e) => handleLinkClick(e, '/', '#faq')}
                  className="footer__link"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  onClick={(e) => handleLinkClick(e, '/', '#contact')}
                  className="footer__link"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="footer__bottom">
          <p className="footer__copy">&copy; {CURRENT_YEAR} Evostackr. All rights reserved.</p>
          <div className="footer__legal">
            <a
              href="/return-policy"
              onClick={(e) => handleLinkClick(e, '/return-policy')}
              className="footer__legal-link"
            >
              Return &amp; Refund Policy
            </a>
            <span className="footer__legal-dot">&bull;</span>
            <a
              href="https://dir.evostackr.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__legal-link"
            >
              Project Directory
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
