import './Services.css';
import { services } from '../data';

export function Services() {
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
              Have a problem<br />
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
            {services.map((service, index) => (
              <article className="service-item" key={service.id}>
                <div className="service-item__number text-meta">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="service-item__content">
                  <h3 className="service-item__title">{service.title}</h3>
                  <p className="service-item__description">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
