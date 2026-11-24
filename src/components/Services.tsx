import './Services.css';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  linkUrl: string;
  iconType: 'design' | 'code' | 'testing' | 'saas';
}

const serviceItems: ServiceItem[] = [
  {
    id: 'web-engineering',
    number: '01',
    title: 'Custom Web & Application Engineering',
    description:
      'Purpose-built websites and interactive web apps engineered for performance, accessibility, and business outcomes. Sub-second load times, Core Web Vitals optimization, and zero bloated template runtimes.',
    tags: ['React 19', 'TypeScript', 'Next.js', 'Vite', 'Tailwind', 'Real-Time State'],
    linkUrl: '/#contact',
    iconType: 'code',
  },
  {
    id: 'independent-products',
    number: '02',
    title: 'Independent Software Products & Automation',
    description:
      'Proprietary software tools built and operated by Evostackr: SMS Campaign Manager (Dual-SIM bulk Android dispatch), 24IDChat (ephemeral messaging), and TempEmailFree (disposable mail with OTP detection).',
    tags: ['Android Foreground Services', 'Dual-SIM', 'WebSockets', 'SQLite', 'APIs'],
    linkUrl: 'https://blog.evostackr.in/product-launches',
    iconType: 'saas',
  },
  {
    id: 'google-play-testing',
    number: '03',
    title: 'Google Play Closed Testing & Publishing',
    description:
      'Guaranteed compliance with Google Play Console 20 active opt-in testers for 14+ continuous days requirement. Daily device engagement feedback, tester coordination via WhatsApp, and production access preparation.',
    tags: ['20 Active Testers', '14 Continuous Days', 'Console Compliance', '₹1,245 INR'],
    linkUrl: '/services/google-play-closed-testing',
    iconType: 'testing',
  },
  {
    id: 'ux-architecture',
    number: '04',
    title: 'User Experience Design & Cloud Architecture',
    description:
      'Design systems, API integrations, and cloud architectures built for long-term scalability. We focus on business conversion, user retention, and security standards rather than superficial visual trends.',
    tags: ['Design Systems', 'Cloud Backend', 'API Integrations', 'Security Audits'],
    linkUrl: '/#contact',
    iconType: 'design',
  },
];

interface ServicesProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function Services({ onNavigate }: ServicesProps) {
  const handleClick = (e: React.MouseEvent, url: string) => {
    if (onNavigate && url.startsWith('/')) {
      e.preventDefault();
      if (url.includes('#')) {
        const [path, hash] = url.split('#');
        onNavigate(path || '/', `#${hash}`);
      } else {
        onNavigate(url);
      }
    }
  };

  return (
    <section id="services" className="services section" aria-labelledby="services-heading">
      <div className="container">
        {/* Centered Section Header matching reference */}
        <div className="services__header">
          <h2 id="services-heading" className="services__title">
            What we do
          </h2>
          <p className="services__subtitle">
            We conceptualize, engineer, maintain, and publish advanced digital solutions.
            A transparent, end-to-end engineering service from A to Z.
          </p>
        </div>

        {/* Numbered Row Accordion-Style Rows */}
        <div className="services__list">
          {serviceItems.map((item) => (
            <a
              key={item.id}
              href={item.linkUrl}
              onClick={(e) => handleClick(e, item.linkUrl)}
              className="services__row"
            >
              <div className="services__row-left">
                <span className="services__row-number">{item.number}</span>
                <div className="services__row-info">
                  <h3 className="services__row-title">{item.title}</h3>
                  <p className="services__row-desc">{item.description}</p>
                  <div className="services__row-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="services__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Graphic Illustration Column */}
              <div className="services__row-visual" aria-hidden="true">
                {item.iconType === 'code' && (
                  <div className="services__visual-badge">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="3" width="20" height="14" rx="2" stroke="#121316" strokeWidth="1.75" fill="#FEE2E2" />
                      <line x1="8" y1="21" x2="16" y2="21" stroke="#121316" strokeWidth="1.75" strokeLinecap="round" />
                      <line x1="12" y1="17" x2="12" y2="21" stroke="#121316" strokeWidth="1.75" />
                      <path d="M7 9 L10 12 L7 15" stroke="#EF4444" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="12" y1="15" x2="16" y2="15" stroke="#121316" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {item.iconType === 'saas' && (
                  <div className="services__visual-badge">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <rect x="5" y="2" width="14" height="20" rx="2" stroke="#121316" strokeWidth="1.75" fill="#FEE2E2" />
                      <circle cx="12" cy="18" r="1" fill="#121316" />
                      <line x1="9" y1="6" x2="15" y2="6" stroke="#121316" strokeWidth="1.75" strokeLinecap="round" />
                      <path d="M12 9 L14 11 L10 13 L12 15" stroke="#EF4444" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {item.iconType === 'testing' && (
                  <div className="services__visual-badge">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path d="M5 3 L19 12 L5 21 Z" stroke="#121316" strokeWidth="1.75" fill="#FEE2E2" />
                      <circle cx="12" cy="12" r="3" fill="#EF4444" />
                    </svg>
                  </div>
                )}
                {item.iconType === 'design' && (
                  <div className="services__visual-badge">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#121316" strokeWidth="1.75" fill="#FEE2E2" />
                      <path d="M12 3 A9 9 0 0 1 21 12 L12 12 Z" fill="#EF4444" stroke="#121316" strokeWidth="1.75" />
                    </svg>
                  </div>
                )}
                <span className="services__arrow">&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
