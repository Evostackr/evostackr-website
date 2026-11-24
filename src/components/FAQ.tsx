import { useState } from 'react';
import './FAQ.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is Evostackr and what does the studio do?',
    answer:
      'Evostackr is an independent software studio and digital engineering company. We conceptualize, build, and operate proprietary digital products while delivering bespoke software engineering—including custom web applications, Android mobile systems, multi-tenant SaaS platforms, and operational automation—for businesses worldwide.',
  },
  {
    id: 'faq-2',
    question: 'What software products has Evostackr engineered and launched?',
    answer:
      'Evostackr has engineered and operates five core independent products: (1) SMS Campaign Manager, a native Android Dual-SIM bulk dispatch engine; (2) Fabricate, a venture product studio turning startup ideas into production software; (3) WhatsApp Past Member Extractor, a browser utility for exporting historical WhatsApp Web group members; (4) 24IDChat, a real-time anonymous messaging platform with 24-hour disposable identities; and (5) TempEmailFree, an instant disposable email generator with automated OTP verification.',
  },
  {
    id: 'faq-3',
    question: 'How does the Google Play Closed Testing service work?',
    answer:
      'We provide guaranteed compliance with Google Play Console\'s mandatory 20 active opt-in testers for 14+ continuous days requirement. We manage real device engagement, provide daily telemetry feedback, coordinate tester communications via WhatsApp and email, and help prepare your app for production access release approval at a transparent flat rate of ₹1,245 INR.',
  },
  {
    id: 'faq-4',
    question: 'What custom software engineering capabilities do you offer?',
    answer:
      'We build purpose-engineered custom websites and web applications with React 19, TypeScript, and Vite, native Android systems leveraging persistent Foreground Services and Room SQLite, cloud backends, real-time WebSocket communication platforms, and business automation pipelines to eliminate manual operational overhead.',
  },
  {
    id: 'faq-5',
    question: 'Do I own 100% of the source code and commercial rights?',
    answer:
      'Yes, absolutely. Every bespoke client project is delivered with 100% commercial ownership and full source code handover via private Git repositories. There are zero vendor lock-ins, zero proprietary runtime restrictions, and zero ongoing platform licensing fees.',
  },
  {
    id: 'faq-6',
    question: 'How does Evostackr build differently from conventional agencies?',
    answer:
      'We operate as software product builders rather than template assemblers. We write clean, typed code with solid architectural boundaries, Core Web Vitals optimization, zero bloated WordPress plugins or template runtimes, and sub-second load times. We focus on business conversion, user retention, and long-term maintainability.',
  },
  {
    id: 'faq-7',
    question: 'How does your project pricing and milestone model work?',
    answer:
      'We operate with 100% transparent pricing and clearly defined project milestones. You can use our interactive 4-step quote configurator on this site for an instant ballpark estimate, and all contracts feature fixed deliverables with zero surprise fees or hidden charges.',
  },
  {
    id: 'faq-8',
    question: 'How can we hire Evostackr or collaborate on an engineering project?',
    answer:
      'You can configure an instant estimate using our 4-step quote tool above, chat directly with our engineering team on WhatsApp (+91 62028 50596), or email support@evostackr.in with your project specifications and timeline. We review all inquiries promptly and outline actionable technical steps.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="faq section" aria-labelledby="faq-heading">
      <div className="container">
        <div className="faq__layout">
          {/* Left Column matching reference */}
          <div className="faq__sidebar">
            <h2 id="faq-heading" className="faq__title">
              Frequently asked <br />
              questions
            </h2>
            <div className="faq__star-badge" aria-hidden="true">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#FFF3EB" />
                <path
                  d="M12 4 L13.8 9.5 L19.5 11.2 L13.8 13 L12 18.5 L10.2 13 L4.5 11.2 L10.2 9.5 Z"
                  fill="#FF6B35"
                />
              </svg>
            </div>
          </div>

          {/* Right Column: Clean Accordion */}
          <div className="faq__list" role="region" aria-label="Frequently Asked Questions">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id}
                  className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq__question"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-btn-${item.id}`}
                  >
                    <span className="faq__question-text">{item.question}</span>
                    <span className="faq__indicator" aria-hidden="true">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${item.id}`}
                    className="faq__answer-wrapper"
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    style={{ maxHeight: isOpen ? '360px' : '0px' }}
                  >
                    <div className="faq__answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
