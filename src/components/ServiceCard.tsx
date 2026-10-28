import type { Service } from '../data/services';
import './ServiceCard.css';

interface ServiceCardProps {
  service: Service;
  onNavigate?: (path: string, hash?: string) => void;
}

export function ServiceCard({ service, onNavigate }: ServiceCardProps) {
  const hasDetailUrl = Boolean(service.detailUrl && service.detailUrl.trim().length > 0);

  return (
    <article className="service-card" aria-labelledby={`service-title-${service.id}`}>
      {/* Optional Preview Image (preserved if genuine asset supplied) */}
      {service.imageUrl && (
        <div className="service-card__image-wrap">
          <img
            src={service.imageUrl}
            alt={`${service.title} preview`}
            className="service-card__image"
            loading="lazy"
          />
        </div>
      )}

      <div className="service-card__content">
        {/* Category & Starting Price Header */}
        <div className="service-card__meta">
          {service.category && (
            <span className="service-card__category text-meta">{service.category}</span>
          )}
          {service.startingPrice && (
            <span className="service-card__price-badge text-meta">
              Starting from {service.startingPrice}
            </span>
          )}
        </div>

        <h3 id={`service-title-${service.id}`} className="service-card__title">
          {service.title}
        </h3>

        <p className="service-card__description">
          {service.shortDescription || service.description}
        </p>

        {/* Service Highlights / Features */}
        {service.features && service.features.length > 0 && (
          <ul className="service-card__features" aria-label={`Key features of ${service.title}`}>
            {service.features.map((feature, i) => (
              <li key={i} className="service-card__feature-item">
                <span className="service-card__feature-bullet" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Card Action */}
        <div className="service-card__actions">
          {hasDetailUrl ? (
            <a
              href={service.detailUrl}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(service.detailUrl!);
                }
              }}
              className="btn btn--primary service-card__btn"
              aria-label={`View details for ${service.title}`}
            >
              View More <span className="arrow" aria-hidden="true">→</span>
            </a>
          ) : (
            <a
              href="/#contact"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/', '#contact');
                }
              }}
              className="btn btn--secondary service-card__btn"
              aria-label={`Inquire about ${service.title}`}
            >
              Start a project <span className="arrow" aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
