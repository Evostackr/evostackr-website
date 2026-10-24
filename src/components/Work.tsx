import './Work.css';
import { caseStudies } from '../data';

export function Work() {
  return (
    <section id="work" className="work section" aria-labelledby="work-heading">
      <div className="container">
        <div className="work__header">
          <div className="section-label">
            <span className="section-label__line" />
            <span className="section-label__text">Selected Work</span>
          </div>
          <h2 id="work-heading" className="work__title">
            Engineering in <span className="text-editorial">practice.</span>
          </h2>
          <p className="work__subtitle">
            Products and systems we've designed, built, and shipped.
          </p>
        </div>

        <div className="work__cases">
          {caseStudies.map((study, index) => (
            <article
              className={`case-study ${index % 2 !== 0 ? 'case-study--reversed' : ''}`}
              key={study.id}
            >
              <div className="case-study__visual">
                <svg viewBox="0 0 560 380" fill="none" className="case-study__svg">
                  <rect width="560" height="380" fill="#E8EBE9" rx="2" />
                  {/* Abstract technical composition */}
                  <rect x="40" y="40" width="200" height="120" stroke="#D9DCDA" strokeWidth="1" fill="none" />
                  <rect x="60" y="60" width="160" height="80" stroke="#25282A" strokeWidth="1" fill="#F5F6F5" />
                  <rect x="76" y="76" width="100" height="8" rx="1" fill="#DDE1DF" />
                  <rect x="76" y="92" width="70" height="8" rx="1" fill="#DDE1DF" />
                  <rect x="76" y="108" width="120" height="8" rx="1" fill="#DDE1DF" />
                  {/* Grid dots */}
                  {[...Array(8)].map((_, i) => (
                    <circle key={`dot-r1-${i}`} cx={300 + i * 30} cy={60} r="2" fill="#D9DCDA" />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <circle key={`dot-r2-${i}`} cx={300 + i * 30} cy={90} r="2" fill="#D9DCDA" />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <circle key={`dot-r3-${i}`} cx={300 + i * 30} cy={120} r="2" fill="#D9DCDA" />
                  ))}
                  {/* Architecture line */}
                  <line x1="40" y1="200" x2="520" y2="200" stroke="#D9DCDA" strokeWidth="0.5" />
                  <rect x="40" y="220" width="140" height="120" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
                  <rect x="200" y="220" width="140" height="120" rx="2" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
                  <rect x="360" y="220" width="160" height="120" rx="2" fill="#25282A" />
                  {/* Connection lines */}
                  <line x1="110" y1="200" x2="110" y2="220" stroke="#25282A" strokeWidth="1" />
                  <line x1="270" y1="200" x2="270" y2="220" stroke="#25282A" strokeWidth="1" />
                  <line x1="440" y1="200" x2="440" y2="220" stroke="#BFC4C2" strokeWidth="1" />
                  {/* Labels */}
                  <text x="56" y="250" fill="#6F7475" fontSize="9" fontFamily="Inter, sans-serif">Module {index + 1}A</text>
                  <text x="216" y="250" fill="#6F7475" fontSize="9" fontFamily="Inter, sans-serif">Module {index + 1}B</text>
                  <text x="376" y="250" fill="#BFC4C2" fontSize="9" fontFamily="Inter, sans-serif">Core Engine</text>
                </svg>
              </div>

              <div className="case-study__content">
                <div className="case-study__meta">
                  <span className="text-meta">{study.category}</span>
                </div>
                <h3 className="case-study__name">{study.name}</h3>

                <div className="case-study__detail">
                  <h4 className="case-study__detail-label text-meta">Problem</h4>
                  <p className="case-study__detail-text">{study.problem}</p>
                </div>

                <div className="case-study__detail">
                  <h4 className="case-study__detail-label text-meta">Solution</h4>
                  <p className="case-study__detail-text">{study.solution}</p>
                </div>

                <div className="case-study__tech">
                  <h4 className="case-study__detail-label text-meta">Technologies</h4>
                  <div className="case-study__tags">
                    {study.technologies.map((tech) => (
                      <span className="case-study__tag" key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>

                {study.url && (
                  <a
                    href={study.url}
                    className="btn btn--secondary case-study__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${study.name} engineering case study`}
                  >
                    View project <span className="arrow" aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
