import './Hero.css';
import { HeroSoftwareIllustration } from './HeroSoftwareIllustration';

export function Hero() {
  return (
    <section className="hero section" aria-label="Introduction">
      <div className="hero__inner container">
        <div className="hero__content">
          <h1 className="hero__headline">
            <span className="hero__eyebrow">
              <span className="section-label__line" aria-hidden="true" />
              <span className="section-label__text">Evostackr • Independent Software Products</span>
            </span>
            <span className="hero__headline-text">
              Software should <br />
              do <span className="text-editorial">more.</span>
            </span>
          </h1>

          <p className="hero__subheadline">
            Less noise. More purpose.
          </p>

          <p className="hero__description">
            Evostackr builds independent digital products and custom software for real-world problems.
          </p>

          <div className="hero__actions">
            <a href="#products" className="btn btn--primary">
              Explore our products <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="btn btn--secondary">
              Get in touch <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <HeroSoftwareIllustration />
        </div>
      </div>

      <div className="hero__bottom container">
        <div className="hero__stats" data-trust-signal="commercial-proof" data-trust-signals="commercial-proof" aria-label="Verified commercial metrics and compliance standards">
          <div className="hero__stat">
            <span className="hero__stat-label text-meta">Independent Products</span>
            <span className="hero__stat-value">8+ live</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-label text-meta">Google Play Apps</span>
            <span className="hero__stat-value">11+ deployed</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-label text-meta">Testing Guarantee</span>
            <span className="hero__stat-value">14-day compliance</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-label text-meta">Privacy Standard</span>
            <span className="hero__stat-value">100% client-side</span>
          </div>
        </div>
      </div>
    </section>
  );
}
