import './Hero.css';
import { HeroSoftwareIllustration } from './HeroSoftwareIllustration';

export function Hero() {
  return (
    <section className="hero section" aria-label="Introduction">
      <div className="hero__inner container">
        <div className="hero__content">
          <div className="section-label">
            <span className="section-label__line" />
            <span className="section-label__text">Independent Software Company</span>
          </div>

          <h1 className="hero__headline">
            Software should<br />
            do <span className="text-editorial">more.</span>
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
            <a href="#services" className="btn btn--secondary">
              Build with us <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <HeroSoftwareIllustration />
        </div>
      </div>

      <div className="hero__bottom container">
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-label text-meta">Products</span>
            <span className="hero__stat-value">5 shipped</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-label text-meta">Focus</span>
            <span className="hero__stat-value">Products & Engineering</span>
          </div>
        </div>
      </div>
    </section>
  );
}
