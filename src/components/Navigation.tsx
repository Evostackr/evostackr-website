import './Navigation.css';
import { useState, useCallback, useEffect } from 'react';

export function Navigation() {
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

  return (
    <header className="nav" role="banner">
      <div className="nav__inner container">
        <a href="#" className="nav__wordmark" aria-label="Evostackr Home">
          <img
            src="/evostackr-logo.png"
            alt="EvoStackr logo"
            className="nav__logo"
            width="28"
            height="28"
          />
          <span className="nav__name">Evostackr</span>
        </a>

        <nav className="nav__links" role="navigation" aria-label="Main navigation">
          <a href="#products" className="nav__link link-underline">Products</a>
          <a href="#services" className="nav__link link-underline">Services</a>
          <a href="#work" className="nav__link link-underline">Work</a>
          <a href="#about" className="nav__link link-underline">About</a>
          <a href="#contact" className="nav__link link-underline">Contact</a>
        </nav>

        <a href="#contact" className="nav__cta btn btn--primary">
          Start a project <span className="arrow" aria-hidden="true">→</span>
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
          <a href="#products" className="nav__mobile-link" onClick={closeMenu}>Products</a>
          <a href="#services" className="nav__mobile-link" onClick={closeMenu}>Services</a>
          <a href="#work" className="nav__mobile-link" onClick={closeMenu}>Work</a>
          <a href="#about" className="nav__mobile-link" onClick={closeMenu}>About</a>
          <a href="#contact" className="nav__mobile-link" onClick={closeMenu}>Contact</a>
        </nav>
        <a href="#contact" className="btn btn--primary nav__mobile-cta" onClick={closeMenu}>
          Start a project <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}
