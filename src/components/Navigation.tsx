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

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="nav-topbar">
        <div className="nav-topbar__inner container">
          <span className="nav-topbar__text">
            ✦ 10% off on any custom software &amp; website order.{' '}
            <a
              href="#instant-quote"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/', '#instant-quote');
              }}
              className="nav-topbar__link"
            >
              Get Instant Quote &rarr;
            </a>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="nav" role="banner">
        <div className="nav__inner container">
          {/* Brand Wordmark with neo-badge styling */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className="nav__wordmark"
            aria-label="Evostackr Home"
          >
            <div className="nav__logo-badge">
              <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <polygon points="33.44,13.27 10.0,50.2 32.91,86.73 80.05,86.73 72.85,74.94 39.85,74.94 25.06,50.2 41.03,25.19 82.67,25.19 90.0,13.27" fill="#121316" />
                <polygon points="45.35,37.5 75.07,37.5 68.0,49.15 38.28,49.15" fill="#EF4444" />
                <polygon points="39.46,55.17 64.6,55.17 58.97,64.47 45.09,64.47" fill="#EF4444" />
              </svg>
            </div>
            <span className="nav__name">Evostackr</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav__links" role="navigation" aria-label="Main navigation">
            <a
              href="/#services"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/', '#services');
              }}
              className={`nav__link ${currentPath === '/services' ? 'nav__link--active' : ''}`}
            >
              Services
            </a>
            <a
              href="/#process"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/', '#process');
              }}
              className="nav__link"
            >
              Process
            </a>
            <a
              href="/#instant-quote"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/', '#instant-quote');
              }}
              className="nav__link"
            >
              Instant Quote
            </a>
            <a
              href="https://blog.evostackr.in/product-launches"
              target="_blank"
              rel="noopener noreferrer"
              className="nav__link"
            >
              Products
            </a>
            <a
              href="/store"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/store');
              }}
              className={`nav__link ${currentPath === '/store' || currentPath.startsWith('/store/') ? 'nav__link--active' : ''}`}
            >
              Store
            </a>
            <a
              href="/#faq"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/', '#faq');
              }}
              className="nav__link"
            >
              FAQ
            </a>
          </nav>

          {/* Action Button: Pill Outline "Let's talk" */}
          <div className="nav__actions">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/', '#contact');
              }}
              className="btn btn--neo-talk"
            >
              Let's talk
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="nav__menu-btn"
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              <span className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`nav__drawer ${menuOpen ? 'nav__drawer--open' : ''}`}>
          <div className="nav__drawer-content">
            <nav className="nav__drawer-links">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/');
                }}
                className="nav__drawer-link"
              >
                Home
              </a>
              <a
                href="/#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/', '#services');
                }}
                className="nav__drawer-link"
              >
                Services
              </a>
              <a
                href="/#process"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/', '#process');
                }}
                className="nav__drawer-link"
              >
                Process
              </a>
              <a
                href="/#instant-quote"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/', '#instant-quote');
                }}
                className="nav__drawer-link"
              >
                Instant Quote
              </a>
              <a
                href="https://blog.evostackr.in/product-launches"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="nav__drawer-link"
              >
                Products
              </a>
              <a
                href="/store"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/store');
                }}
                className="nav__drawer-link"
              >
                Store
              </a>
              <a
                href="/#faq"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/', '#faq');
                }}
                className="nav__drawer-link"
              >
                FAQ
              </a>
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/', '#contact');
                }}
                className="btn btn--dark nav__drawer-cta"
              >
                Let's talk &rarr;
              </a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
