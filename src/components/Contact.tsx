import './Contact.css';
import { CONTACT_CONFIG, getWhatsAppMessageUrl } from '../config/contact';

export function Contact() {
  const waUrl = getWhatsAppMessageUrl(true);

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact__layout">
          <div className="contact__content">
            <div className="section-label section-label--dark">
              <span className="section-label__line" />
              <span className="section-label__text">Get in Touch</span>
            </div>

            <h2 id="contact-heading" className="contact__title">
              Let's build something <br />
              that <span className="text-editorial">matters.</span>
            </h2>

            <p className="contact__description">
              Have a software idea, a development requirement, or a product collaboration 
              in mind? Tell us what you're working on.
            </p>

            <div className="contact__channels">
              <div className="contact__channel">
                <span className="contact__channel-label text-meta">For Custom Development</span>
                <p className="contact__channel-text">
                  Share your project requirements and we'll discuss how we can help engineer your solution.
                </p>
              </div>
              <div className="contact__channel">
                <span className="contact__channel-label text-meta">For Product Inquiries</span>
                <p className="contact__channel-text">
                  Questions about our products, partnership opportunities, or technical integrations.
                </p>
              </div>
            </div>

            <div className="contact__actions">
              <a href={`mailto:${CONTACT_CONFIG.supportEmail}`} className="btn btn--dark">
                {CONTACT_CONFIG.supportEmail} <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--dark contact__wa-link"
                aria-label="Message Evostackr on WhatsApp"
              >
                WhatsApp: {CONTACT_CONFIG.whatsAppDisplay} <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>

            <p className="contact__note">
              Official support: {CONTACT_CONFIG.supportEmail} · WhatsApp: {CONTACT_CONFIG.whatsAppDisplay}
            </p>
          </div>

          <div className="contact__visual" aria-hidden="true">
            <svg viewBox="0 0 320 400" fill="none" className="contact__graphic">
              {/* Geometric construction */}
              <line x1="0" y1="200" x2="320" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <line x1="160" y1="0" x2="160" y2="400" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

              {/* Main geometric form */}
              <rect x="60" y="80" width="200" height="200" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
              <rect x="80" y="100" width="160" height="160" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
              <rect x="100" y="120" width="120" height="120" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {/* Corner accents */}
              <circle cx="60" cy="80" r="3" fill="rgba(255,255,255,0.3)" />
              <circle cx="260" cy="280" r="3" fill="rgba(255,255,255,0.3)" />

              {/* Diagonal */}
              <line x1="60" y1="80" x2="260" y2="280" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="4 4" />

              {/* Arrow pointing to center */}
              <line x1="160" y1="320" x2="160" y2="350" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <polygon points="155,350 160,360 165,350" fill="rgba(255,255,255,0.2)" />

              {/* Label */}
              <text x="170" y="358" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="500">START</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
