/**
 * Evostackr — Static Services Data Architecture
 * 
 * Strict Scope Constraints:
 * - Local static data module (no database, no backend CMS, no API).
 * - Single canonical source of truth for both homepage preview and dedicated /services page.
 * - Real service data for Evostackr's engineering and publishing support services.
 * - Verified destination links (e.g. /services/google-play-closed-testing).
 */

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  category?: string;
  features?: string[];
  imageUrl?: string;
  startingPrice?: string;
  currency?: string;
  detailUrl?: string;
  featured: boolean;
  published: boolean;
}

/**
 * Static service catalogue.
 * Houses official services offered by Evostackr.
 * 
 * Rules for adding future services:
 * - Set published: true when ready for public display in /services.
 * - Set featured: true only if it should appear in the 2-3 service preview on the homepage.
 * - Set featured: false for services that should appear only on /services.
 * - Keep ID and slug unique, descriptive, and lowercase kebab-case.
 */
export const services: Service[] = [
  {
    id: 'google-play-closed-testing',
    slug: 'google-play-closed-testing',
    title: 'Google Play Closed Testing',
    category: 'Android App Publishing Support',
    shortDescription:
      'Get support with Google Play closed testing for your Android app, with a clear service scope and straightforward pricing.',
    description:
      'Get support with Google Play closed testing for your Android app, with a clear service scope and straightforward pricing.',
    startingPrice: '₹1,245 INR',
    currency: 'INR',
    detailUrl: '/services/google-play-closed-testing',
    features: [
      '20 active opt-in testers for 14+ continuous days',
      'Continuous daily device engagement feedback',
      'Google Play production-access release preparation',
      'Direct support and tester coordination via WhatsApp & email',
    ],
    featured: true,
    published: true,
  },
  {
    id: 'websites',
    slug: 'custom-website-development',
    title: 'Custom Website Development',
    category: 'Web Engineering',
    shortDescription:
      'Purpose-built websites engineered for performance, accessibility, and business outcomes. No templates. No compromise.',
    description:
      'Purpose-built websites engineered for performance, accessibility, and business outcomes. No templates. No compromise.',
    features: [
      'Bespoke responsive frontend architecture',
      'Performance engineering with sub-second load times',
      'Core Web Vitals & technical SEO optimization',
      'Zero bloated dependencies or template runtimes',
    ],
    featured: true,
    published: true,
  },
  {
    id: 'web-apps',
    slug: 'web-application-development',
    title: 'Web Application Development',
    category: 'Application Engineering',
    shortDescription:
      'Interactive web applications with complex state, real-time data, and robust architecture. From internal tools to customer-facing platforms.',
    description:
      'Interactive web applications with complex state, real-time data, and robust architecture. From internal tools to customer-facing platforms.',
    features: [
      'Interactive state management & real-time synchronization',
      'Modular TypeScript & component design systems',
      'Cloud backend architecture and API integrations',
      'Enterprise-grade reliability and security standards',
    ],
    featured: true,
    published: true,
  },
  {
    id: 'saas',
    slug: 'saas-platform-development',
    title: 'SaaS Platform Development',
    category: 'Platform Engineering',
    shortDescription:
      'Multi-tenant software platforms with subscription management, user provisioning, and scalable infrastructure from day one.',
    description:
      'Multi-tenant software platforms with subscription management, user provisioning, and scalable infrastructure from day one.',
    features: [
      'Multi-tenant database and data isolation architecture',
      'Automated subscription billing & license provisioning',
      'Granular role-based access control (RBAC)',
      'Cloud auto-scaling and telemetry monitoring',
    ],
    featured: false,
    published: true,
  },
  {
    id: 'business-software',
    slug: 'business-software-automation',
    title: 'Business Software & Automation',
    category: 'Automation Engineering',
    shortDescription:
      "Operational software that eliminates manual processes. Workflow automation, data pipelines, and systems that work while you don't.",
    description:
      "Operational software that eliminates manual processes. Workflow automation, data pipelines, and systems that work while you don't.",
    features: [
      'End-to-end workflow automation and scheduler routines',
      'High-throughput ETL and automated data pipelines',
      'Custom operational tooling for team productivity',
      'Resilient failure recovery and audit logging',
    ],
    featured: false,
    published: true,
  },
  {
    id: 'integrations',
    slug: 'api-integrations-custom-engineering',
    title: 'API Integrations & Custom Engineering',
    category: 'Systems Integration',
    shortDescription:
      'Third-party integrations, custom APIs, data synchronization, and the technical glue that connects your systems into a coherent whole.',
    description:
      'Third-party integrations, custom APIs, data synchronization, and the technical glue that connects your systems into a coherent whole.',
    features: [
      'High-performance REST and WebSocket API design',
      'Secure third-party payment and service gateway links',
      'Bidirectional data synchronization layers',
      'Comprehensive telemetry, security, and payload contracts',
    ],
    featured: false,
    published: true,
  },
];
