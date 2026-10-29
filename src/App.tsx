import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { SEOHead } from './components/SEOHead';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppContactWidget } from './components/WhatsAppContactWidget';
import { GooglePlayClosedTesting } from './pages/GooglePlayClosedTesting';
import { OptimizationSuite } from './pages/OptimizationSuite';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { Store } from './pages/Store';
import { StoreProductDetail } from './pages/StoreProductDetail';
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

  const isClosedTestingPage = currentPath === '/services/google-play-closed-testing';
  const isServicesPage = currentPath === '/services';
  const isProductsPage = currentPath === '/products';
  const isStorePage = currentPath === '/store';
  const matchedProduct = currentPath.startsWith('/store/')
    ? storeProducts.find((p) => `/store/${p.slug}` === currentPath)
    : null;

  return (
    <>
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
          />
        ) : isServicesPage ? (
          <ServicesPage
            onNavigateHome={() => navigate('/')}
            onNavigate={navigate}
          />
        ) : isProductsPage ? (
          <ProductsPage onNavigateHome={() => navigate('/')} onNavigate={navigate} />
        ) : matchedProduct ? (
          <StoreProductDetail
            product={matchedProduct}
            onNavigateHome={() => navigate('/')}
            onNavigate={navigate}
          />
        ) : isStorePage ? (
          <Store onNavigateHome={() => navigate('/')} onNavigate={navigate} />
        ) : isSeoSuite ? (
          <OptimizationSuite onNavigateHome={() => navigate('/')} />
        ) : (
          <>
            <Hero />
            <Products onNavigate={navigate} />
            <Services onNavigate={navigate} />
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
