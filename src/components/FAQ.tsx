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
    question: 'What is Evostackr and what does the company do?',
    answer:
      'Evostackr is an independent software company and engineering studio. We design, develop, and operate proprietary digital products while providing bespoke software engineering services—including custom websites, web applications, SaaS platforms, and operational automation—for businesses worldwide.',
  },
  {
    id: 'faq-2',
    question: 'What software products has Evostackr built and shipped?',
    answer:
      'Evostackr has engineered and launched five core projects: (1) SMS Campaign Manager, a native Android dual-SIM automated bulk SMS engine; (2) Fabricate, a venture product studio turning startup ideas into production software; (3) WhatsApp Past Member Extractor, a browser utility for exporting historical WhatsApp Web group members; (4) 24IDChat, a real-time anonymous messaging platform with 24-hour disposable identities; and (5) TempEmailFree, an instant temporary disposable email generator with automated OTP verification.',
  },
  {
    id: 'faq-3',
    question: 'What custom software development services do you offer?',
    answer:
      'We engineer custom websites, interactive web applications with complex state and real-time capabilities, multi-tenant SaaS platforms with scalable cloud infrastructure, business automation pipelines to eliminate manual operational overhead, and custom API integrations connecting disparate services.',
  },
  {
    id: 'faq-4',
    question: 'How does Evostackr build software differently from conventional agencies?',
    answer:
      'We operate as software product builders rather than template assemblers. We write clean, typed code with solid architectural boundaries, prioritize real-world reliability and security, avoid unnecessary dependencies and bloat, and design systems meant to scale smoothly over years.',
  },
  {
    id: 'faq-5',
    question: 'Where can I explore the live products or source details?',
    answer:
      'All our public software projects, live links, architecture overviews, and technical specifications are synchronized in our official Project Directory at https://dir.evostackr.in/.',
  },
  {
    id: 'faq-6',
    question: 'How can we hire Evostackr or collaborate on a project?',
    answer:
      'You can contact our engineering team directly by emailing support@evostackr.in with your project specifications, timeline, and architectural requirements. We review all inquiries promptly and outline actionable technical steps.',
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
        <div className="faq__header">
          <div className="section-label">
            <span className="section-label__line" />
            <span className="section-label__text">Frequently Asked Questions</span>
          </div>
          <h2 id="faq-heading" className="faq__title">
            Answers &amp; <span className="text-editorial">insights.</span>
          </h2>
          <p className="faq__subtitle">
            Everything you need to know about Evostackr products, development capabilities, and engineering practices.
          </p>
        </div>

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
                  style={{ maxHeight: isOpen ? '300px' : '0px' }}
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
    </section>
  );
}
