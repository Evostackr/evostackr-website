import './ServicesPage.css';
import { services } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';

interface ServicesPageProps {
  onNavigateHome: () => void;
  onNavigate?: (path: string, hash?: string) => void;
}

export function ServicesPage({ onNavigateHome, onNavigate }: ServicesPageProps) {
  // Complete portfolio of published services
  const publishedServices = services.filter((s) => s.published);

  return (
    <div className="services-page">
      {/* Breadcrumbs Navigation */}
      <nav className="services-page__breadcrumbs container" aria-label="Breadcrumb">
        <ol className="breadcrumbs-list">
          <li className="breadcrumbs-item">
            <button
              type="button"
              onClick={onNavigateHome}
              className="breadcrumbs-link"
              aria-label="Return to Evostackr homepage"
            >
              Home
            </button>
          </li>
          <li className="breadcrumbs-separator" aria-hidden="true">/</li>
          <li className="breadcrumbs-item breadcrumbs-item--active" aria-current="page">
            Services
          </li>
        </ol>
      </nav>

      {/* Page Introduction */}
      <header className="services-page__hero container" aria-labelledby="services-page-title">
        <div className="services-page__layout">
          <div className="section-label">
            <span className="section-label__line" />
            <span className="text-meta">DEVELOPMENT &amp; PUBLISHING SERVICES</span>
          </div>
          <h1 id="services-page-title" className="services-page__title">
            Services built around your <span className="text-editorial">needs.</span>
          </h1>
          <p className="services-page__description">
            Explore Evostackr's software development, digital engineering, and Google Play publishing support services.
          </p>
        </div>
      </header>

      {/* Services Catalogue Section */}
      <section className="services-page__catalogue section" aria-label="Services Portfolio">
        <div className="container">
          <div className="services-page__grid">
            {publishedServices.map((service) => (
              <ServiceCard key={service.id} service={service} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

