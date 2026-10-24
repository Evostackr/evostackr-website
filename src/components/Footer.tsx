import './Footer.css';
import { products } from '../data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <a href="#" className="footer__wordmark" aria-label="Evostackr Home">
              <img
                src="/evostackr-logo.png"
                alt="EvoStackr logo"
                className="footer__logo"
                width="28"
                height="28"
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
                <li><a href="#services" className="footer__nav-link link-underline">Web Development</a></li>
                <li><a href="#services" className="footer__nav-link link-underline">Web Applications</a></li>
                <li><a href="#services" className="footer__nav-link link-underline">SaaS Platforms</a></li>
                <li><a href="#services" className="footer__nav-link link-underline">Business Software</a></li>
                <li><a href="#services" className="footer__nav-link link-underline">API & Integrations</a></li>
              </ul>
            </div>

            <div className="footer__nav-group">
              <h3 className="footer__nav-title text-meta">Company</h3>
              <ul className="footer__nav-list">
                <li><a href="#about" className="footer__nav-link link-underline">About</a></li>
                <li><a href="#work" className="footer__nav-link link-underline">Work</a></li>
                <li><a href="#contact" className="footer__nav-link link-underline">Contact</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Evostackr. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link link-underline">Privacy Policy</a>
            <a href="#" className="footer__legal-link link-underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
