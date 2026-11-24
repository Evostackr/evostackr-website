import './Testimonials.css';
import { useState } from 'react';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarText: string;
}

const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Evostackr has been an outstanding engineering partner for us. We have enjoyed working with the team on multiple Android and web projects. From day one, we have been impressed by their technical professionalism, code craftsmanship, and speed. Looking forward to our next build!',
    name: 'Nicola Silvia',
    role: 'CEO',
    company: 'Eder Technologies',
    avatarText: 'NS',
  },
  {
    id: 't2',
    quote:
      'The Google Play closed testing track was seamless. They delivered 20 active testers for 14 continuous days without a single dropout. Our app got production approval on the first attempt without any back-and-forth.',
    name: 'Andreas Leo Ovi',
    role: 'Product Lead',
    company: 'Holding Yan Limited',
    avatarText: 'AO',
  },
  {
    id: 't3',
    quote:
      'SMS Campaign Manager transformed our internal dispatch operations. The Dual-SIM automated throttling and local SQLite deduplication eliminated third-party API costs entirely.',
    name: 'Devansh Verma',
    role: 'Engineering Director',
    company: 'Mobility Systems India',
    avatarText: 'DV',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials section" aria-labelledby="testimonials-heading">
      <div className="container">
        {/* Section Header with Navigation Arrows matching reference */}
        <div className="testimonials__header">
          <h2 id="testimonials-heading" className="testimonials__title">
            Kind words from our partners
          </h2>
          <div className="testimonials__nav">
            <button
              type="button"
              onClick={prevTestimonial}
              className="testimonials__arrow-btn"
              aria-label="Previous testimonial"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={nextTestimonial}
              className="testimonials__arrow-btn"
              aria-label="Next testimonial"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="testimonials__grid">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className={`testimonials__card ${idx === currentIndex ? 'testimonials__card--active' : ''}`}
            >
              <div className="testimonials__quote-mark">&ldquo;</div>
              <p className="testimonials__quote-text">{t.quote}</p>
              <div className="testimonials__author">
                <div className="testimonials__avatar">{t.avatarText}</div>
                <div className="testimonials__author-info">
                  <div className="testimonials__name">{t.name}</div>
                  <div className="testimonials__role">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
