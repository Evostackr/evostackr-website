/**
 * Evostackr — Static Software Store Products Data Architecture
 * 
 * Strict Scope Constraints:
 * - Local static data module (no database, no backend CMS, no API).
 * - Future-ready typed contract for manual product entry.
 * - Real local product data for EvoEdu Pro with assets in /images/store/evoedu-pro/
 * - Purchase links direct to verified Buy Me a Coffee digital product URLs.
 */

export interface StoreProductPrice {
  amount?: number;
  currency?: string;
  displayPrice: string;
  billingType?: 'one-time' | 'subscription' | 'free';
  note?: string;
}

export interface StoreScreenshot {
  url: string;
  caption: string;
  alt: string;
  label?: string;
}

export interface StoreFeatureModule {
  id: string;
  title: string;
  highlights: string[];
}

export interface KeyValueSpec {
  label: string;
  value: string;
}

export interface LicenseTier {
  name: string;
  scope: string;
  price: string;
}

export interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  developer: string;
  category: string;
  productType: string;
  tagline?: string;
  shortDescription: string;
  description?: string;
  price?: StoreProductPrice;
  logoUrl?: string;
  screenshotUrls?: string[];
  screenshots?: StoreScreenshot[];
  buyUrl?: string;
  platforms?: string[];
  version?: string;
  featured?: boolean;
  status?: string;
  technologies?: string[];
  features?: string[];
  featureModules?: StoreFeatureModule[];
  techStack?: KeyValueSpec[];
  systemRequirements?: KeyValueSpec[];
  packageContents?: string[];
  licenseTiers?: LicenseTier[];
  support?: {
    email: string;
    whatsapp: string;
    website: string;
  };
}

/**
 * Static software store catalogue.
 * Houses official static software products published by Evostackr.
 */
export const storeProducts: StoreProduct[] = [
  {
    id: 'evoedu-pro',
    slug: 'evoedu-pro',
    name: 'EvoEdu Pro',
    developer: 'Evostackr',
    category: 'School & College Management ERP',
    productType: 'Downloadable software / PHP source-code package',
    tagline: 'The Ultimate All-in-One Cloud School ERP – Built with Laravel 12 & FilamentPHP v3',
    shortDescription:
      'An all-in-one school and college management ERP for academic operations, student and staff management, attendance, examinations, fees, HR, payroll, reporting, and administration.',
    description:
      'EvoEdu Pro is an ultra-modern, modular, and developer-friendly Educational ERP system engineered for Schools, Colleges, and Coaching Institutes. Powered by Laravel 12 and FilamentPHP v3, it delivers blazing-fast SPA navigation, granular role-based access control, Stripe online fee payments, automated report generation, and complete operational automation.',
    price: {
      displayPrice: 'Starting at ₹3,999 / $49',
      amount: 3999,
      currency: 'INR',
      billingType: 'one-time',
      note: 'Tiered licensing (Regular & Extended) available on checkout',
    },
    buyUrl: 'https://buymeacoffee.com/evostackr/e/591724',
    logoUrl: '/images/store/evoedu-pro/logo.png',
    screenshotUrls: [
      '/images/store/evoedu-pro/dark-dashboard.png',
      '/images/store/evoedu-pro/attendance-dashboard.png',
      '/images/store/evoedu-pro/monthly-attendance.png',
      '/images/store/evoedu-pro/analytics-dashboard.png',
      '/images/store/evoedu-pro/dashboard-showcase.png',
    ],
    screenshots: [
      {
        url: '/images/store/evoedu-pro/dark-dashboard.png',
        caption: 'Primary Dashboard Overview',
        alt: 'EvoEdu Pro modern dark mode admin dashboard interface',
        label: 'Main Dashboard',
      },
      {
        url: '/images/store/evoedu-pro/attendance-dashboard.png',
        caption: 'Attendance Management Screen',
        alt: 'EvoEdu Pro daily attendance tracking and status management',
        label: 'Attendance',
      },
      {
        url: '/images/store/evoedu-pro/monthly-attendance.png',
        caption: 'Monthly Attendance Analytics',
        alt: 'EvoEdu Pro monthly attendance reports and breakdown',
        label: 'Monthly View',
      },
      {
        url: '/images/store/evoedu-pro/analytics-dashboard.png',
        caption: 'Analytics & Academic Metrics',
        alt: 'EvoEdu Pro comprehensive institutional analytics and telemetry',
        label: 'Analytics',
      },
      {
        url: '/images/store/evoedu-pro/dashboard-showcase.png',
        caption: 'Dashboard Multi-Device Showcase',
        alt: 'EvoEdu Pro responsive admin dashboard showcase',
        label: 'Showcase',
      },
    ],
    platforms: ['Web / Self-Hosted', 'PHP 8.2+', 'MySQL 8.0+ / MariaDB', 'Apache / Nginx / LiteSpeed'],
    version: '1.0.0',
    status: 'Available',
    featured: true,
    technologies: [
      'Laravel 12',
      'FilamentPHP v3',
      'Livewire 3',
      'Alpine.js',
      'Tailwind CSS',
      'PHP 8.2+',
      'MySQL 8.0+ / MariaDB 10.4+',
    ],
    features: [
      'Academic sessions, terms, classes, departments, sections, shifts, classrooms, and timetables',
      'Student admissions, profiles, document management, attendance, reports, and printable ID cards',
      'Teacher and staff profiles, assignments, attendance, leave tracking, and printable ID cards',
      'Exam creation, scheduling, grading rules, marks entry, admit cards, and report cards',
      'Fee groups, discounts, late fees, online Stripe fee payments, PDF invoices, and receipts',
      'Library inventory catalog, book issues, renewals, returns, and fine calculations',
      'HR and payroll, customizable salary components, salary structures, and payroll summaries',
      'Announcements, events calendar, email notifications, and SMS/WhatsApp integration readiness',
      'Role-based permissions (Filament Shield), activity audit logs, and 2FA authentication',
      'Environment configuration, system health monitoring, backups, restore tools, and error logs',
    ],
    featureModules: [
      {
        id: 'academics',
        title: 'Academic Architecture',
        highlights: [
          'Academic sessions and term configuration',
          'Classes, departments, sections, and shift scheduling',
          'Subject mapping and teacher designations',
          'Classroom allocation and dynamic timetables',
        ],
      },
      {
        id: 'students',
        title: 'Student Admissions & Records',
        highlights: [
          'Comprehensive admission lifecycle management',
          'Daily attendance tracking with automated reports',
          'One-click printable student ID cards with barcodes',
          'Document archive and complete academic profile history',
        ],
      },
      {
        id: 'faculty',
        title: 'Faculty & Staff Administration',
        highlights: [
          'Teacher profiles, qualifications, and department allocation',
          'Class teacher and subject-level assignments',
          'Daily staff attendance and leave entitlement tracking',
          'Official printable staff identification cards',
        ],
      },
      {
        id: 'examinations',
        title: 'Examinations & Grading',
        highlights: [
          'Multi-term exam creation, scheduling, and custom grade scales',
          'Subject-wise marks entry with automated ranking',
          'Printable student admit cards with barcodes',
          'Instant automated report card and transcript generation',
        ],
      },
      {
        id: 'finance',
        title: 'Finance & Fee Management',
        highlights: [
          'Custom fee groups (Tuition, Transport, Laboratory, Exams)',
          'Dynamic concession rules and automated late fines',
          'Online payment gateway integration via Stripe Checkout',
          'Printable PDF fee invoices and receipts with signature verification',
        ],
      },
      {
        id: 'library',
        title: 'Library Management',
        highlights: [
          'Complete catalog inventory by ISBN, author, and category',
          'Automated book issue, renewal, and return tracking',
          'Overdue fine calculation and borrower accountability',
        ],
      },
      {
        id: 'hr-payroll',
        title: 'HR & Payroll Operations',
        highlights: [
          'Customizable earnings and deductions components',
          'Designation-specific salary structure configuration',
          'One-click monthly payroll processing and disbursement summaries',
        ],
      },
      {
        id: 'communication',
        title: 'Communication & Notices',
        highlights: [
          'Internal institutional bulletin and announcements',
          'Interactive school events and holiday calendar',
          'Automated transactional emails and WhatsApp/SMS readiness',
        ],
      },
      {
        id: 'security',
        title: 'Enterprise Security & Roles',
        highlights: [
          'Role-Based Access Control powered by Filament Shield',
          'Immutable activity audit logs for all CRUD operations',
          'Two-Factor Authentication (2FA) and session timeout protection',
        ],
      },
      {
        id: 'tools',
        title: 'System Diagnostics & Backups',
        highlights: [
          'In-dashboard .env configuration manager',
          'Real-time server telemetry (CPU, RAM, Storage)',
          'Automated database backups with 1-click restore/download',
          'Integrated error log analyzer',
        ],
      },
    ],
    techStack: [
      { label: 'Backend Framework', value: 'Laravel 12 (PHP 8.2+)' },
      { label: 'Admin Architecture', value: 'FilamentPHP v3' },
      { label: 'Frontend / UI', value: 'Tailwind CSS, Alpine.js, Livewire 3' },
      { label: 'Database Support', value: 'MySQL 8.0+ / MariaDB 10.4+' },
      { label: 'Payment Gateway', value: 'Stripe Checkout Integration' },
      { label: 'Document Engine', value: 'HTML2Media / Browsershot PDF' },
    ],
    systemRequirements: [
      { label: 'PHP Version', value: '^8.2 or higher' },
      { label: 'Required Extensions', value: 'OpenSSL, PDO, Mbstring, Tokenizer, JSON, cURL, Fileinfo' },
      { label: 'Database Engine', value: 'MySQL 8.0+ or MariaDB 10.4+' },
      { label: 'Web Server', value: 'Apache, Nginx, or LiteSpeed' },
      { label: 'Dependency Manager', value: 'Composer 2.x' },
    ],
    packageContents: [
      'Full unencrypted source code (PHP, Blade, JS, CSS)',
      'Pre-configured database migrations and seeders',
      'Browser-based web setup installer (/install)',
      'User and developer documentation (documentation.html)',
      'Lifetime free updates and bug fixes (as stated in product documentation)',
    ],
    licenseTiers: [
      {
        name: 'Regular License',
        scope: 'Single School / Domain installation, lifetime updates, 6 months standard support',
        price: '₹3,999 / $49',
      },
      {
        name: 'Extended / Agency License',
        scope: 'Unlimited installations, white-labeling rights, priority developer support',
        price: '₹12,999 / $159',
      },
    ],
    support: {
      email: 'support@evostackr.in',
      whatsapp: 'https://wa.me/916202850596',
      website: 'https://evostackr.in/',
    },
  },
];
