import { useState, useEffect, useRef, useCallback } from 'react';
import './WhatsAppContactWidget.css';
import {
  CONTACT_CONFIG,
  getWhatsAppMessageUrl,
  getWhatsAppCallUrl,
  getSupportEmailUrl,
} from '../config/contact';

export function WhatsAppContactWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deviceAware, setDeviceAware] = useState<boolean>(true);
  const widgetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePopup();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closePopup]);

  // Close on click outside widget container
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const messageUrl = getWhatsAppMessageUrl(deviceAware);
  const voiceCallUrl = getWhatsAppCallUrl(deviceAware);
  const emailUrl = getSupportEmailUrl();

  return (
    <div className="wa-widget" ref={widgetRef}>
      {/* Contact Popup */}
      {isOpen && (
        <div
          className="wa-popup"
          role="dialog"
          aria-modal="false"
          aria-labelledby="wa-popup-heading"
        >
          <div className="wa-popup__header">
            <div>
              <h2 id="wa-popup-heading" className="wa-popup__heading">
                Contact {CONTACT_CONFIG.businessName}
              </h2>
              <p className="wa-popup__subheading">
                Choose how you would like to get in touch.
              </p>
            </div>
            <button
              type="button"
              className="wa-popup__close"
              onClick={closePopup}
              aria-label="Close contact popup"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="wa-popup__actions">
            {/* 1. Message on WhatsApp */}
            <a
              href={messageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-action-btn"
              onClick={() => setIsOpen(false)}
            >
              <div className="wa-action-btn__icon-wrap" aria-hidden="true">
                <svg className="wa-action-btn__icon" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32" />
                </svg>
              </div>
              <div className="wa-action-btn__content">
                <div className="wa-action-btn__title">
                  <span>Message on WhatsApp</span>
                  <span className="wa-action-btn__arrow" aria-hidden="true">→</span>
                </div>
                <div className="wa-action-btn__desc">
                  {CONTACT_CONFIG.whatsAppDisplay} · Start chat
                </div>
              </div>
            </a>

            {/* 2. WhatsApp Voice Call */}
            <a
              href={voiceCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-action-btn"
              onClick={() => setIsOpen(false)}
            >
              <div className="wa-action-btn__icon-wrap" aria-hidden="true">
                <svg className="wa-action-btn__icon" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.57 3.9a1 1 0 0 0-1-1H4.07a1 1 0 0 0-1 1c0 9.38 7.63 17.01 17.01 17.01a1 1 0 0 0 1-1v-3.53a1 1 0 0 0-1.07-1z" />
                </svg>
              </div>
              <div className="wa-action-btn__content">
                <div className="wa-action-btn__title">
                  <span>WhatsApp Voice Call</span>
                  <span className="wa-action-btn__arrow" aria-hidden="true">→</span>
                </div>
                <div className="wa-action-btn__desc">
                  Open chat to initiate an audio call
                </div>
              </div>
            </a>

            {/* 3. Email Support */}
            <a
              href={emailUrl}
              className="wa-action-btn"
              onClick={() => setIsOpen(false)}
            >
              <div className="wa-action-btn__icon-wrap" aria-hidden="true">
                <svg className="wa-action-btn__icon" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="wa-action-btn__content">
                <div className="wa-action-btn__title">
                  <span>Email Support</span>
                  <span className="wa-action-btn__arrow" aria-hidden="true">→</span>
                </div>
                <div className="wa-action-btn__desc">
                  {CONTACT_CONFIG.supportEmail}
                </div>
              </div>
            </a>
          </div>

          {/* Device-Aware WhatsApp Redirect Toggle */}
          <div className="wa-popup__toggle-section">
            <label className="wa-toggle-label" htmlFor="wa-device-toggle">
              <input
                id="wa-device-toggle"
                type="checkbox"
                className="wa-toggle-checkbox"
                checked={deviceAware}
                onChange={(e) => setDeviceAware(e.target.checked)}
              />
              <span className="wa-toggle-switch" aria-hidden="true" />
              <span className="wa-toggle-text">
                <span className="wa-toggle-text__title">Use device-appropriate WhatsApp link</span>
                <span className="wa-toggle-text__hint">
                  {deviceAware
                    ? 'Adapts between mobile app & WhatsApp Web for desktop.'
                    : 'Using universal wa.me link for all devices.'}
                </span>
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        className={`wa-widget__trigger ${isOpen ? 'wa-widget__trigger--open' : ''}`}
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close contact menu' : 'Contact Evostackr via WhatsApp or Email'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <span className="wa-widget__tooltip" aria-hidden="true">
          Contact Evostackr
        </span>
        {isOpen ? (
          <svg className="wa-widget__trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg className="wa-widget__trigger-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32" />
          </svg>
        )}
      </button>
    </div>
  );
}
