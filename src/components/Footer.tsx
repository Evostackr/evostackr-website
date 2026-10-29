import './Footer.css';
import { products } from '../data';

const CURRENT_YEAR = new Date().getFullYear();

interface FooterProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (path: string, hash?: string) => {
    if (onNavigate) {
      onNavigate(path, hash);
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <a
              href="/"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  handleNav('/');
                }
              }}
              className="footer__wordmark"
              aria-label="Evostackr Home"
            >
              <img
                src="/evostackr-logo.png"
                alt="Evostackr logo"
                className="footer__logo"
                width="28"
                height="28"
                loading="lazy"
              />
              <span className="footer__name">Evostackr</span>
            </a>
            <p className="footer__tagline">
              Independent software products and custom development for real-world problems.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <div className="footer__nav-group">
              <h3 className="footer__nav-title text-meta">Products</h3>
              <ul className="footer__nav-list">
                <li>
                  <a
                    href="/products"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        handleNav('/products');
                      }
                    }}
                    className="footer__nav-link link-underline"
                  >
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    href="/store"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        handleNav('/store');
                      }
                    }}
                    className="footer__nav-link link-underline"
                  >
                    Software Store
                  </a>
                </li>
                {products.map((product) => (
                  <li key={product.id}>
                    {product.url ? (
                      <a href={product.url} className="footer__nav-link link-underline" target="_blank" rel="noopener noreferrer">
                        {product.name}
                      </a>
                    ) : (
                      <span className="footer__nav-link footer__nav-link--disabled">{product.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__nav-group">
              <h3 className="footer__nav-title text-meta">Services</h3>
              <ul className="footer__nav-list">
                <li>
                  <a
                    href="/services"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        handleNav('/services');
                      }
                    }}
                    className="footer__nav-link link-underline"
                  >
                    All Services
                  </a>
                </li>
                <li><a href="#services" onClick={(e) => { if (onNavigate) { e.preventDefault(); handleNav('/', '#services'); } }} className="footer__nav-link link-underline">Web Development</a></li>
                <li><a href="#services" onClick={(e) => { if (onNavigate) { e.preventDefault(); handleNav('/', '#services'); } }} className="footer__nav-link link-underline">Web Applications</a></li>
                <li><a href="#services" onClick={(e) => { if (onNavigate) { e.preventDefault(); handleNav('/', '#services'); } }} className="footer__nav-link link-underline">SaaS Platforms</a></li>
                <li><a href="#services" onClick={(e) => { if (onNavigate) { e.preventDefault(); handleNav('/', '#services'); } }} className="footer__nav-link link-underline">Business Software</a></li>
                <li><a href="#services" onClick={(e) => { if (onNavigate) { e.preventDefault(); handleNav('/', '#services'); } }} className="footer__nav-link link-underline">API &amp; Integrations</a></li>
                <li>
                  <a
                    href="/services/google-play-closed-testing"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        handleNav('/services/google-play-closed-testing');
                      }
                    }}
                    className="footer__nav-link link-underline"
                  >
                    Google Play Closed Testing
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__nav-group">
              <h3 className="footer__nav-title text-meta">Company</h3>
              <ul className="footer__nav-list">
                <li><a href="#about" onClick={(e) => { if (onNavigate) { e.preventDefault(); handleNav('/', '#about'); } }} className="footer__nav-link link-underline">About</a></li>
                <li><a href="#faq" onClick={(e) => { if (onNavigate) { e.preventDefault(); handleNav('/', '#faq'); } }} className="footer__nav-link link-underline">FAQ</a></li>
                <li><a href="https://dir.evostackr.in/" className="footer__nav-link link-underline" target="_blank" rel="noopener noreferrer">Project Directory</a></li>
                <li><a href="/rss.xml" className="footer__nav-link link-underline" target="_blank" rel="noopener noreferrer">RSS Feed</a></li>
                <li>
                  <a
                    href="/admin/seo"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        handleNav('/admin/seo');
                      }
                    }}
                    className="footer__nav-link link-underline"
                  >
                    SEO &amp; AI Intelligence
                  </a>
                </li>
                <li><a href="#contact" onClick={(e) => { if (onNavigate) { e.preventDefault(); handleNav('/', '#contact'); } }} className="footer__nav-link link-underline">Contact</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {CURRENT_YEAR} Evostackr. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="#contact" onClick={(e) => { if (onNavigate) { e.preventDefault(); handleNav('/', '#contact'); } }} className="footer__legal-link link-underline">Privacy &amp; Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
