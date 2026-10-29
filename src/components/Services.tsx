import './Services.css';
import { services } from '../data';

interface ServicesProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function Services({ onNavigate }: ServicesProps) {
  // Homepage displays only 2-3 featured services (maximum of 3)
  const featuredServices = services.filter((s) => s.published && s.featured).slice(0, 3);

  return (
    <section id="services" className="services section" aria-labelledby="services-heading">
      <div className="container">
        <div className="services__layout">
          <div className="services__header">
            <div className="section-label section-label--dark">
              <span className="section-label__line" />
              <span className="section-label__text">Development Services</span>
            </div>
            <h2 id="services-heading" className="services__title">
              Have a problem <br />
              worth <span className="text-editorial">solving?</span>
            </h2>
            <p className="services__subtitle">
              We design and engineer custom digital solutions around your requirements, workflows, and business goals.
            </p>
            <a href="#contact" className="btn btn--dark services__cta">
              Start a project <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="services__list">
            {featuredServices.map((service, index) => (
              <article className="service-item" key={service.id}>
                <div className="service-item__number text-meta">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="service-item__content">
                  {service.startingPrice && (
                    <span className="service-item__badge text-meta">
                      Starting from {service.startingPrice}
                    </span>
                  )}
                  <h3 className="service-item__title">{service.title}</h3>
                  <p className="service-item__description">{service.shortDescription || service.description}</p>
                  {service.detailUrl && (
                    <a
                      href={service.detailUrl}
                      onClick={(e) => {
                        if (onNavigate) {
                          e.preventDefault();
                          onNavigate(service.detailUrl!);
                        }
                      }}
                      className="service-item__link link-underline"
                    >
                      View service details &amp; pricing <span className="arrow" aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </article>
            ))}

            {/* View All Services action navigating to /services */}
            <div className="services__footer">
              <a
                href="/services"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/services');
                  }
                }}
                className="btn btn--dark services__view-all-btn"
                aria-label="View all development and publishing services"
              >
                View All Services <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
