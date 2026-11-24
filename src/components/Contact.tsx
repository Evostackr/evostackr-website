import './Contact.css';
import { useState } from 'react';
import { CONTACT_CONFIG, getWhatsAppMessageUrl } from '../config/contact';

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    organization: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Evostackr! New message from ${formData.fullName} (${formData.organization || 'Individual'}):
• Email: ${formData.email}
• Phone: ${formData.contactNumber}
• Message: ${formData.message}`;

    window.open(getWhatsAppMessageUrl(true, text), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact__layout">
          {/* Left Column: Form */}
          <div className="contact__form-col">
            <h2 id="contact-heading" className="contact__title">
              Get in touch
            </h2>
            <p className="contact__subtitle">
              Have an engineering project, mobile app, or SaaS idea? Fill in the details below or message us directly.
            </p>

            {submitted ? (
              <div className="contact__success">
                <span className="contact__success-check">✓</span>
                <div>
                  <strong>Thank you, {formData.fullName}!</strong>
                  <p>Your message was prepared. We have also opened WhatsApp to initiate direct chat with our lead engineer.</p>
                </div>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-grid">
                  <div className="contact__input-group">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="contact__input"
                    />
                  </div>
                  <div className="contact__input-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact__input"
                    />
                  </div>
                  <div className="contact__input-group">
                    <input
                      type="tel"
                      name="contactNumber"
                      placeholder="Contact Number"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="contact__input"
                    />
                  </div>
                  <div className="contact__input-group">
                    <input
                      type="text"
                      name="organization"
                      placeholder="Organization name"
                      value={formData.organization}
                      onChange={handleChange}
                      className="contact__input"
                    />
                  </div>
                </div>

                <div className="contact__textarea-group">
                  <textarea
                    name="message"
                    placeholder="Tell us about your project requirements..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="contact__textarea"
                  />
                </div>

                <button type="submit" className="btn btn--neo-submit">
                  Send Message &rarr;
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info Card matching reference */}
          <div className="contact__info-col">
            <div className="contact__card">
              <div className="contact__card-item">
                <div className="contact__card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <span className="contact__card-label">Direct Phone &amp; WhatsApp</span>
                  <a
                    href={`https://wa.me/${CONTACT_CONFIG.whatsAppNormalized}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__card-value link-underline"
                  >
                    {CONTACT_CONFIG.whatsAppDisplay}
                  </a>
                </div>
              </div>

              <div className="contact__card-divider" />

              <div className="contact__card-item">
                <div className="contact__card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="contact__card-label">Official Inquiries</span>
                  <a
                    href={`mailto:${CONTACT_CONFIG.supportEmail}`}
                    className="contact__card-value link-underline"
                  >
                    {CONTACT_CONFIG.supportEmail}
                  </a>
                </div>
              </div>

              <div className="contact__card-divider" />

              <div className="contact__card-item">
                <div className="contact__card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="contact__card-label">Address</span>
                  <p className="contact__card-text">
                    Evostackr Studio &bull; Digital Engineering Studio &bull; India (Worldwide Remote)
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="contact__socials">
                <a
                  href={`https://wa.me/${CONTACT_CONFIG.whatsAppNormalized}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                  aria-label="WhatsApp"
                >
                  WA
                </a>
                <a
                  href="https://github.com/Evostackr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                  aria-label="GitHub"
                >
                  GH
                </a>
                <a
                  href="https://dir.evostackr.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                  aria-label="Project Directory"
                >
                  DIR
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
