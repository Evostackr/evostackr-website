import './Process.css';

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    step: '01',
    title: 'Choose your site & project type',
    description:
      'Whether you need a custom web application, an independent Android system, Google Play closed testing, or proprietary SaaS—we define exact scope upfront.',
  },
  {
    step: '02',
    title: 'Architect & Engineer with Precision',
    description:
      'We write clean, typed TypeScript with solid architectural boundaries, Core Web Vitals optimization, zero bloated templates, and rock-solid reliability.',
  },
  {
    step: '03',
    title: 'Ship with 100% Code Ownership',
    description:
      'Fast, verified delivery to production with full commercial licensing, complete source code repositories, and zero vendor lock-in.',
  },
];

export function Process() {
  return (
    <section id="process" className="process section" aria-labelledby="process-heading">
      <div className="container">
        {/* Section Header with 4-point Sparkle Icon */}
        <div className="process__header">
          <div className="process__title-wrap">
            <h2 id="process-heading" className="process__title">
              This is how we do things
            </h2>
            <div className="process__sparkle" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2 L13.8 8.2 L20 10 L13.8 11.8 L12 18 L10.2 11.8 L4 10 L10.2 8.2 Z"
                  fill="#EF4444"
                />
              </svg>
            </div>
          </div>
          <p className="process__subtitle">
            A transparent, stress-free engineering process from day one. We keep you informed at every step with clear milestones and direct technical communication.
          </p>
        </div>

        {/* Process Cards Grid matching reference */}
        <div className="process__grid">
          {steps.map((item) => (
            <div key={item.step} className="process__card">
              <div className="process__card-header">
                <span className="process__card-number">{item.step}</span>
              </div>
              <h3 className="process__card-title">{item.title}</h3>
              <p className="process__card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
