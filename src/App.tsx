import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { SEOHead } from './components/SEOHead';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { Process } from './components/Process';
import { Services } from './components/Services';
import { BudgetCallout } from './components/BudgetCallout';
import { BrandProof } from './components/BrandProof';
import { UniqueApproach } from './components/UniqueApproach';
import { InstantQuote } from './components/InstantQuote';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppContactWidget } from './components/WhatsAppContactWidget';
import { GooglePlayClosedTesting } from './pages/GooglePlayClosedTesting';
import { OptimizationSuite } from './pages/OptimizationSuite';
import { ServicesPage } from './pages/ServicesPage';
import { Store } from './pages/Store';
import { StoreProductDetail } from './pages/StoreProductDetail';
import { ReturnPolicy } from './pages/ReturnPolicy';
import { storeProducts } from './data/storeProducts';

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath === '/products') {
      window.location.href = 'https://blog.evostackr.in/product-launches';
    } else if (currentPath === '/blog' || currentPath.startsWith('/blog/')) {
      navigate('/');
    }
  }, [currentPath, navigate]);

  const isSeoSuite =
    currentPath === '/admin/seo' ||
    currentPath === '/system/seo' ||
    currentPath === '/optimization';

  const isClosedTestingPage = currentPath === '/services/google-play-closed-testing';
  const isReturnPolicyPage =
    currentPath === '/return-policy' || currentPath === '/refund-policy';
  const isServicesPage = currentPath === '/services';
  const isStorePage = currentPath === '/store';
  const matchedProduct = currentPath.startsWith('/store/')
    ? storeProducts.find((p) => `/store/${p.slug}` === currentPath)
    : null;

  return (
    <div className="app-container app-loaded">
      <SEOHead currentPath={currentPath} />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigation currentPath={currentPath} onNavigate={navigate} />
      <main id="main-content">
        {isClosedTestingPage ? (
          <GooglePlayClosedTesting
            onNavigateHome={() => navigate('/')}
            onNavigate={navigate}
            onRequestQuote={() => window.dispatchEvent(new CustomEvent('open-contact-widget'))}
          />
        ) : isServicesPage ? (
          <ServicesPage
            onNavigateHome={() => navigate('/')}
            onNavigate={navigate}
          />
        ) : matchedProduct ? (
          <StoreProductDetail
            product={matchedProduct}
            onNavigateHome={() => navigate('/')}
            onNavigate={navigate}
          />
        ) : isStorePage ? (
          <Store onNavigateHome={() => navigate('/')} onNavigate={navigate} />
        ) : isReturnPolicyPage ? (
          <ReturnPolicy onNavigateHome={() => navigate('/')} onNavigate={navigate} />
        ) : isSeoSuite ? (
          <OptimizationSuite onNavigateHome={() => navigate('/')} />
        ) : (
          <>
            <Hero />
            <MarqueeBanner />
            <Process />
            <Services onNavigate={navigate} />
            <BudgetCallout />
            <BrandProof />
            <UniqueApproach />
            <InstantQuote />
            <Testimonials />
            <FAQ />
            <Contact />
          </>
        )}
      </main>
      <Footer onNavigate={navigate} />
      <WhatsAppContactWidget />
    </div>
  );
}

export default App;
