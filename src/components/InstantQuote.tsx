import './InstantQuote.css';
import { useState } from 'react';
import { getWhatsAppMessageUrl } from '../config/contact';

const popularChoices = [
  'Portfolio site',
  'Educational site',
  'Non-profit site',
  'Online store',
  'Real Estate',
  'Event Management',
  'Consultant',
  'News/Magazine Site',
  'Technology Company',
  'Mobile App / Android',
  'Google Play Closed Testing',
  'SaaS Platform',
];

const featureOptions = [
  { id: 'auth', label: 'User Authentication & Roles', cost: 5000 },
  { id: 'realtime', label: 'Real-Time WebSockets & Chat', cost: 8000 },
  { id: 'admin', label: 'Custom Admin Dashboard', cost: 7000 },
  { id: 'payment', label: 'Payment Gateway Integration', cost: 6000 },
  { id: 'sms', label: 'Background Automation / SMS Engine', cost: 9000 },
  { id: 'testing', label: 'Google Play 20-Tester Track', cost: 1245 },
  { id: 'seo', label: 'Technical SEO & Sub-Second Optimization', cost: 4000 },
];

export function InstantQuote() {
  const [step, setStep] = useState<number>(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Technology Company');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['auth', 'admin']);
  const [timeline, setTimeline] = useState<string>('standard');
  const [clientName, setClientName] = useState<string>('');

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredChoices = popularChoices.filter((choice) =>
    choice.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate ballpark cost
  const baseCost = selectedIndustry === 'Google Play Closed Testing' ? 1245 : 12000;
  const featuresCost = selectedFeatures.reduce((acc, featId) => {
    const feat = featureOptions.find((f) => f.id === featId);
    return acc + (feat ? feat.cost : 0);
  }, 0);
  const totalBallpark = baseCost + featuresCost;

  const handleWhatsAppInquiry = () => {
    const featureLabels = selectedFeatures
      .map((fid) => featureOptions.find((f) => f.id === fid)?.label)
      .filter(Boolean)
      .join(', ');

    const message = `Hello Evostackr! I configured a quote on your website:
• Project/Industry: ${selectedIndustry}
• Features: ${featureLabels || 'Standard'}
• Timeline: ${timeline}
• Estimated Ballpark: ₹${totalBallpark.toLocaleString('en-IN')} INR
${clientName ? `• Name: ${clientName}` : ''}
Let's discuss my requirements!`;

    window.open(getWhatsAppMessageUrl(true, message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="instant-quote" className="quote section" aria-labelledby="quote-heading">
      <div className="container">
        <div className="quote__card">
          {/* Header */}
          <div className="quote__header">
            <h2 id="quote-heading" className="quote__title">
              Get an instant quote
            </h2>
            <div className="quote__steps-indicator">
              by <span className="quote__step-highlight">0{step}</span> of 04 simple steps
            </div>
          </div>

          {/* Progress bar */}
          <div className="quote__progress">
            <div
              className="quote__progress-fill"
              style={{ width: `${(step / 4) * 100}%` }}
              aria-hidden="true"
            />
          </div>

          {/* Step 1: Industry / Site Type */}
          {step === 1 && (
            <div className="quote__step">
              <h3 className="quote__step-title">Pick your Industry or Project Type</h3>
              <p className="quote__step-subtitle">
                Knowing your industry will help us understand your technical and architectural preferences.
              </p>

              <div className="quote__search-row">
                <div className="quote__search-input-wrap">
                  <svg
                    className="quote__search-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your business or site type..."
                    className="quote__search-input"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn btn--neo-continue"
                >
                  Continue &rarr;
                </button>
              </div>

              <div className="quote__popular-label">Popular choices</div>
              <div className="quote__choices-wrap">
                {filteredChoices.map((choice) => {
                  const isSelected = selectedIndustry === choice;
                  return (
                    <button
                      type="button"
                      key={choice}
                      onClick={() => {
                        setSelectedIndustry(choice);
                        if (choice === 'Google Play Closed Testing') {
                          setSelectedFeatures(['testing']);
                        }
                      }}
                      className={`quote__choice-pill ${isSelected ? 'quote__choice-pill--active' : ''}`}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Key Features */}
          {step === 2 && (
            <div className="quote__step">
              <h3 className="quote__step-title">Choose Key Features &amp; Scope</h3>
              <p className="quote__step-subtitle">
                Select the technical capabilities required for your project.
              </p>

              <div className="quote__features-grid">
                {featureOptions.map((feat) => {
                  const isSelected = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      type="button"
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`quote__feature-card ${isSelected ? 'quote__feature-card--active' : ''}`}
                    >
                      <span className="quote__feature-check">
                        {isSelected ? '✓' : '+'}
                      </span>
                      <span className="quote__feature-label">{feat.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="quote__nav-buttons">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn--outline"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn btn--neo-continue"
                >
                  Continue &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Timeline Target */}
          {step === 3 && (
            <div className="quote__step">
              <h3 className="quote__step-title">Estimated Timeline &amp; Delivery</h3>
              <p className="quote__step-subtitle">
                How quickly do you need this deployed to production?
              </p>

              <div className="quote__timelines">
                {[
                  { id: 'fast', title: 'Fast-Track Delivery', time: '< 2 Weeks', note: 'Priority execution' },
                  { id: 'standard', title: 'Standard Production', time: '3-4 Weeks', note: 'Balanced milestones' },
                  { id: 'enterprise', title: 'Comprehensive Architecture', time: '2+ Months', note: 'Multi-stage rollout' },
                ].map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setTimeline(t.id)}
                    className={`quote__timeline-card ${timeline === t.id ? 'quote__timeline-card--active' : ''}`}
                  >
                    <div className="quote__timeline-time">{t.time}</div>
                    <div className="quote__timeline-title">{t.title}</div>
                    <div className="quote__timeline-note">{t.note}</div>
                  </button>
                ))}
              </div>

              <div className="quote__nav-buttons">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn btn--outline"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="btn btn--neo-continue"
                >
                  Generate Estimate &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Summary & Instant WhatsApp Connect */}
          {step === 4 && (
            <div className="quote__step quote__step--summary">
              <h3 className="quote__step-title">Your Project Estimate Summary</h3>
              <p className="quote__step-subtitle">
                Here is your instant ballpark configuration. Click below to start a direct WhatsApp conversation with our engineering team with your pre-filled specifications!
              </p>

              <div className="quote__summary-box">
                <div className="quote__summary-row">
                  <span className="quote__summary-label">Selected Project Type:</span>
                  <span className="quote__summary-value">{selectedIndustry}</span>
                </div>
                <div className="quote__summary-row">
                  <span className="quote__summary-label">Active Features:</span>
                  <span className="quote__summary-value">{selectedFeatures.length} capabilities selected</span>
                </div>
                <div className="quote__summary-row">
                  <span className="quote__summary-label">Timeline Preference:</span>
                  <span className="quote__summary-value">{timeline.toUpperCase()}</span>
                </div>
                <div className="quote__summary-divider" />
                <div className="quote__summary-total-row">
                  <span>Estimated Ballpark:</span>
                  <span className="quote__summary-price">
                    ₹{totalBallpark.toLocaleString('en-IN')} INR
                  </span>
                </div>
              </div>

              <div className="quote__contact-input-wrap">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="quote__name-input"
                />
              </div>

              <div className="quote__action-buttons">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn btn--outline"
                >
                  &larr; Modify Scope
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="btn btn--neo-whatsapp"
                >
                  Chat with Us on WhatsApp &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
