import './Navigation.css';
import { useState, useCallback, useEffect } from 'react';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string, hash?: string) => void;
}

export function Navigation({ currentPath, onNavigate }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeMenu]);

  const handleLinkClick = (targetPath: string, hash?: string) => {
    closeMenu();
    onNavigate(targetPath, hash);
  };

  const isHome = currentPath === '/';

  return (
    <header className="nav" role="banner">
      <div className="nav__inner container">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="nav__wordmark"
          aria-label="Evostackr Home"
        >
          <img
            src="/evostackr-logo.png"
            alt="Evostackr logo"
            className="nav__logo"
            width="28"
            height="28"
            fetchPriority="high"
          />
          <span className="nav__name">Evostackr</span>
        </a>

        <nav className="nav__links" role="navigation" aria-label="Main navigation">
          <a
            href="/products"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/products');
            }}
            className={`nav__link link-underline ${currentPath === '/products' ? 'nav__link--active' : ''}`}
          >
            Products
          </a>
          <a
            href="/store"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/store');
            }}
            className={`nav__link link-underline ${currentPath === '/store' || currentPath.startsWith('/store/') ? 'nav__link--active' : ''}`}
          >
            Store
          </a>
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/services');
            }}
            className={`nav__link link-underline ${currentPath === '/services' || currentPath.startsWith('/services/') ? 'nav__link--active' : ''}`}
          >
            Services
          </a>
          <a
            href={isHome ? '#about' : '/#about'}
            onClick={(e) => {
              if (!isHome) {
                e.preventDefault();
                handleLinkClick('/', '#about');
              }
            }}
            className="nav__link link-underline"
          >
            About
          </a>
          <a
            href={isHome ? '#faq' : '/#faq'}
            onClick={(e) => {
              if (!isHome) {
                e.preventDefault();
                handleLinkClick('/', '#faq');
              }
            }}
            className="nav__link link-underline"
          >
            FAQ
          </a>
          <a
            href={isHome ? '#contact' : '/#contact'}
            onClick={(e) => {
              if (!isHome) {
                e.preventDefault();
                handleLinkClick('/', '#contact');
              }
            }}
            className="nav__link link-underline"
          >
            Contact
          </a>
        </nav>

        <a
          href={isHome ? '#contact' : '/#contact'}
          onClick={(e) => {
            if (!isHome) {
              e.preventDefault();
              handleLinkClick('/', '#contact');
            }
          }}
          className="nav__cta btn btn--primary"
        >
          Get in touch <span className="arrow" aria-hidden="true">→</span>
        </a>

        <button
          className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="nav__hamburger-line" />
          <span className="nav__hamburger-line" />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`nav__mobile ${menuOpen ? 'nav__mobile--open' : ''}`}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Mobile navigation"
      >
        <nav className="nav__mobile-links" aria-label="Mobile navigation">
          <a
            href="/products"
            className={`nav__mobile-link ${currentPath === '/products' ? 'nav__mobile-link--active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/products');
            }}
          >
            Products
          </a>
          <a
            href="/store"
            className={`nav__mobile-link ${currentPath === '/store' || currentPath.startsWith('/store/') ? 'nav__mobile-link--active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/store');
            }}
          >
            Store
          </a>
          <a
            href="/services"
            className={`nav__mobile-link ${currentPath === '/services' || currentPath.startsWith('/services/') ? 'nav__mobile-link--active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/services');
            }}
          >
            Services
          </a>
          <a
            href={isHome ? '#about' : '/#about'}
            className="nav__mobile-link"
            onClick={(e) => {
              if (!isHome) {
                e.preventDefault();
                handleLinkClick('/', '#about');
              } else {
                closeMenu();
              }
            }}
          >
            About
          </a>
          <a
            href={isHome ? '#faq' : '/#faq'}
            className="nav__mobile-link"
            onClick={(e) => {
              if (!isHome) {
                e.preventDefault();
                handleLinkClick('/', '#faq');
              } else {
                closeMenu();
              }
            }}
          >
            FAQ
          </a>
          <a
            href={isHome ? '#contact' : '/#contact'}
            className="nav__mobile-link"
            onClick={(e) => {
              if (!isHome) {
                e.preventDefault();
                handleLinkClick('/', '#contact');
              } else {
                closeMenu();
              }
            }}
          >
            Contact
          </a>
        </nav>
        <a
          href={isHome ? '#contact' : '/#contact'}
          className="btn btn--primary nav__mobile-cta"
          onClick={(e) => {
            if (!isHome) {
              e.preventDefault();
              handleLinkClick('/', '#contact');
            } else {
              closeMenu();
            }
          }}
        >
          Get in touch <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}
