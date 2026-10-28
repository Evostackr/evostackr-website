/**
 * Evostackr — Static Software Products Data Architecture
 * 
 * Strict Scope Constraints:
 * - Local static data module (no database, no backend CMS, no API).
 * - Single canonical source of truth for both homepage preview and dedicated /products page.
 * - Real product data for Evostackr's independent software products.
 * - Real destination links pointing to verified project specifications.
 */

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category?: string;
  status?: string;
  image?: string;
  url?: string;
  featured: boolean;
  published: boolean;
}

/**
 * Static product catalogue.
 * Houses official software products published by Evostackr.
 * 
 * Rules for adding future products:
 * - Set published: true when ready for public display in /products.
 * - Set featured: true only if it should appear in the 2-3 product preview on the homepage.
 * - Set featured: false for products that should appear only on /products.
 * - Keep ID and slug unique, descriptive, and lowercase kebab-case.
 */
export const products: Product[] = [
  {
    id: 'sms-campaign-manager',
    slug: 'sms-campaign-manager',
    name: 'SMS Campaign Manager',
    description:
      'Turn any Android phone into an automated, private bulk SMS dispatch engine with Dual-SIM support and zero API markups.',
    category: 'Mobile System',
    status: 'Live',
    url: 'https://dir.evostackr.in/#/project/sms-campaign-manager',
    featured: true,
    published: true,
  },
  {
    id: 'fabricate',
    slug: 'fabricate',
    name: 'Fabricate',
    description:
      'A product studio that selects promising startup ideas and builds them into functional apps and websites at no development cost.',
    category: 'Venture Studio',
    status: 'Live',
    url: 'https://dir.evostackr.in/#/project/fabricate',
    featured: true,
    published: true,
  },
  {
    id: 'whatsapp-past-member-extractor',
    slug: 'whatsapp-past-member-extractor',
    name: 'WhatsApp Past Member Extractor',
    description:
      'Extract and export past members who left or were removed from WhatsApp Web groups to CSV, Excel, and VCF.',
    category: 'Browser Utility',
    status: 'Live',
    url: 'https://dir.evostackr.in/#/project/whatsapp-past-member-extractor',
    featured: true,
    published: true,
  },
  {
    id: '24idchat',
    slug: '24idchat',
    name: '24IDChat',
    description:
      'Real-time anonymous chat room platform powered by unique 24-hour disposable identities and self-purging streams.',
    category: 'Communication Platform',
    status: 'Live',
    url: 'https://dir.evostackr.in/#/project/24idchat',
    featured: false,
    published: true,
  },
  {
    id: 'tempemailfree',
    slug: 'tempemailfree',
    name: 'TempEmailFree',
    description:
      'Instant, secure, and disposable temporary email generator with real-time inbox auto-refresh and automated OTP detection.',
    category: 'Privacy Utility',
    status: 'Live',
    url: 'https://dir.evostackr.in/#/project/tempemailfree',
    featured: false,
    published: true,
  },
];
