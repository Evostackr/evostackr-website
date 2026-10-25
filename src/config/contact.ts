/**
 * Centralized Contact Configuration & URL Generators for Evostackr
 * 
 * Normalized WhatsApp Number: 916202850596
 * Official Display: +916202850596
 * Support Email: support@evostackr.in
 */

export interface ContactConfig {
  businessName: string;
  whatsAppDisplay: string;
  whatsAppNormalized: string;
  supportEmail: string;
  defaultMessage: string;
}

export const CONTACT_CONFIG: ContactConfig = {
  businessName: 'Evostackr',
  whatsAppDisplay: '+916202850596',
  whatsAppNormalized: '916202850596',
  supportEmail: 'support@evostackr.in',
  defaultMessage: 'Hello Evostackr, I would like to know more about your services.',
};

/**
 * Normalizes phone numbers by stripping leading '+', whitespace, dashes, and parentheses.
 * Ensures only digits are preserved for international WhatsApp URLs.
 */
export function normalizeWhatsAppNumber(rawNumber: string): string {
  return rawNumber.replace(/[^0-9]/g, '');
}

/**
 * Conservative client-side device detection helper.
 * Uses screen matchMedia and userAgent heuristics without relying on brittle assumptions.
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isTouch = navigator.maxTouchPoints > 1;
  const isSmallScreen = Boolean(window.matchMedia && window.matchMedia('(max-width: 768px)').matches);
  return mobileRegex.test(userAgent) || (isTouch && isSmallScreen);
}

/**
 * Generates official WhatsApp click-to-chat URL with properly URL-encoded text.
 * When deviceAware is true:
 * - On desktop browsers: directs to WhatsApp Web send endpoint for immediate desktop composer.
 * - On mobile browsers: uses universal wa.me HTTPS gateway so OS invokes native app.
 * When deviceAware is false:
 * - Uses standard universal wa.me HTTPS gateway for all devices.
 */
export function getWhatsAppMessageUrl(deviceAware: boolean = true, customMessage?: string): string {
  const number = CONTACT_CONFIG.whatsAppNormalized;
  const message = customMessage ?? CONTACT_CONFIG.defaultMessage;
  const encodedText = encodeURIComponent(message);

  if (deviceAware && !isMobileDevice()) {
    return `https://web.whatsapp.com/send?phone=${number}&text=${encodedText}`;
  }

  return `https://wa.me/${number}?text=${encodedText}`;
}

/**
 * Generates WhatsApp contact URL specifically for initiating a WhatsApp Voice Call.
 * Opens the WhatsApp conversation with Evostackr without auto-firing a call,
 * allowing the user to press the in-app Voice Call icon.
 * 
 * Note: Never uses tel: links and never claims to auto-dial voice calls directly from web.
 */
export function getWhatsAppCallUrl(deviceAware: boolean = true): string {
  const number = CONTACT_CONFIG.whatsAppNormalized;

  if (deviceAware && !isMobileDevice()) {
    return `https://web.whatsapp.com/send?phone=${number}`;
  }

  return `https://wa.me/${number}`;
}

/**
 * Generates the official mailto support URL.
 */
export function getSupportEmailUrl(subject?: string): string {
  if (subject) {
    return `mailto:${CONTACT_CONFIG.supportEmail}?subject=${encodeURIComponent(subject)}`;
  }
  return `mailto:${CONTACT_CONFIG.supportEmail}`;
}
