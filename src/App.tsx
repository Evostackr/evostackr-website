import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppContactWidget } from './components/WhatsAppContactWidget';
import { GooglePlayClosedTesting } from './pages/GooglePlayClosedTesting';
import { OptimizationSuite } from './pages/OptimizationSuite';
import { Store } from './pages/Store';

function getInitialPath(): string {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  return path;
}

function App() {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  const navigate = useCallback((path: string, hash?: string) => {
    const normalizedPath = path.replace(/\/$/, '') || '/';
    window.history.pushState({}, '', normalizedPath + (hash || ''));
    setCurrentPath(normalizedPath);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      setCurrentPath(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isSeoSuite =
    currentPath === '/admin/seo' ||
    currentPath === '/system/seo' ||
    currentPath === '/optimization';

  useEffect(() => {
    if (currentPath === '/services/google-play-closed-testing') {
      document.title = 'Google Play Closed Testing Services | Evostackr';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          "Explore Evostackr's Google Play closed testing support for Android developers. Starting from ₹1,245 INR, with an indicative USD price based on the available exchange rate."
        );
      }
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', 'https://evostackr.in/services/google-play-closed-testing');
      }
    } else if (currentPath === '/store') {
      document.title = 'Software Store | Evostackr';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Discover software built to make digital work simpler. Explore premium tools and digital products from Evostackr.'
        );
      }
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', 'https://evostackr.in/store');
      }
    } else if (isSeoSuite) {
      document.title = 'Optimization Suite & Search Intelligence | Evostackr';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Evostackr Unified Optimization Suite: Complete Technical SEO, AEO, GEO, SXO, and AI Search Intelligence Architecture.'
        );
      }
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', 'https://evostackr.in/admin/seo');
      }
    } else {
      document.title = 'Evostackr — Independent Software Products & Custom Engineering';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Evostackr is an independent software company building proprietary products (SMS Campaign Manager, Fabricate, 24IDChat, TempEmailFree) and delivering custom web, SaaS, and automation engineering.'
        );
      }
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', 'https://evostackr.in/');
      }
    }
  }, [currentPath, isSeoSuite]);

  const isClosedTestingPage = currentPath === '/services/google-play-closed-testing';
  const isStorePage = currentPath === '/store';

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigation currentPath={currentPath} onNavigate={navigate} />
      <main id="main-content">
        {isClosedTestingPage ? (
          <GooglePlayClosedTesting onNavigateHome={() => navigate('/')} />
        ) : isStorePage ? (
          <Store onNavigateHome={() => navigate('/')} onNavigate={navigate} />
        ) : isSeoSuite ? (
          <OptimizationSuite onNavigateHome={() => navigate('/')} />
        ) : (
          <>
            <Hero />
            <Products />
            <Services onNavigate={navigate} />
            <Work />
            <About />
            <FAQ />
            <Contact />
          </>
        )}
      </main>
      <Footer onNavigate={navigate} />
      <WhatsAppContactWidget />
    </>
  );
}

export default App;
