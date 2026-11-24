import './UniqueApproach.css';

interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: 'hourglass' | 'target' | 'sparkle';
}

const pillars: Pillar[] = [
  {
    id: 'value-proposition',
    title: 'Value Proposition',
    description:
      'We work closely with our clients to thoroughly understand technical requirements and deliver production-grade software within committed deadlines.',
    icon: 'hourglass',
  },
  {
    id: 'business-first',
    title: 'Business First',
    description:
      'We focus on what really matters for business growth and operational performance, rather than just moving pixels left & right.',
    icon: 'target',
  },
  {
    id: 'follow-goal',
    title: 'Follow the Goal',
    description:
      'Our task is to help you achieve measurable engineering and business goals, not just create a pretty picture with slow load times.',
    icon: 'sparkle',
  },
];

export function UniqueApproach() {
  return (
    <section className="approach section" aria-labelledby="approach-heading">
      <div className="container">
        {/* Section Header matching reference */}
        <div className="approach__header">
          <h2 id="approach-heading" className="approach__title">
            Unique Approach
          </h2>
          <p className="approach__subtitle">
            We translate requirements into robust code. Ideas into software that generates value.
            Our mission is to give you the engineering rigor and craftsmanship of a tier-one studio.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="approach__grid">
          {pillars.map((p) => (
            <div key={p.id} className="approach__card">
              <div className="approach__icon-wrap">
                {p.icon === 'hourglass' && (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"
                      stroke="#EF4444"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="17" r="1" fill="#EF4444" />
                  </svg>
                )}
                {p.icon === 'target' && (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#EF4444" strokeWidth="1.75" />
                    <circle cx="12" cy="12" r="5" stroke="#121316" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="2" fill="#EF4444" />
                  </svg>
                )}
                {p.icon === 'sparkle' && (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2 L14 9 L21 12 L14 15 L12 22 L10 15 L3 12 L10 9 Z"
                      fill="#EF4444"
                      stroke="#121316"
                      strokeWidth="1.25"
                    />
                  </svg>
                )}
              </div>
              <h3 className="approach__card-title">{p.title}</h3>
              <p className="approach__card-desc">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
