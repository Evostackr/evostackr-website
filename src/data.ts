export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  status?: string;
  url?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  name: string;
  category: string;
  problem: string;
  solution: string;
  technologies: string[];
  url?: string;
}

export const products: Product[] = [
  {
    id: 'sms-campaign-manager',
    name: 'SMS Campaign Manager',
    description: 'Turn any Android phone into an automated, private bulk SMS dispatch engine with Dual-SIM support and zero API markups.',
    category: 'Mobile System',
    status: 'Live',
    url: 'https://dir.evostackr.in/#/project/sms-campaign-manager',
    featured: true,
  },
  {
    id: 'fabricate',
    name: 'Fabricate',
    description: 'A product studio that selects promising startup ideas and builds them into functional apps and websites at no development cost.',
    category: 'Venture Studio',
    status: 'Live',
    url: 'https://dir.evostackr.in/#/project/fabricate',
  },
  {
    id: 'whatsapp-past-member-extractor',
    name: 'WhatsApp Past Member Extractor',
    description: 'Extract and export past members who left or were removed from WhatsApp Web groups to CSV, Excel, and VCF.',
    category: 'Browser Utility',
    status: 'Live',
    url: 'https://dir.evostackr.in/#/project/whatsapp-past-member-extractor',
  },
  {
    id: '24idchat',
    name: '24IDChat',
    description: 'Real-time anonymous chat room platform powered by unique 24-hour disposable identities and self-purging streams.',
    category: 'Communication Platform',
    status: 'Live',
    url: 'https://dir.evostackr.in/#/project/24idchat',
  },
  {
    id: 'tempemailfree',
    name: 'TempEmailFree',
    description: 'Instant, secure, and disposable temporary email generator with real-time inbox auto-refresh and automated OTP detection.',
    category: 'Privacy Utility',
    status: 'Live',
    url: 'https://dir.evostackr.in/#/project/tempemailfree',
  },
];

export const services: Service[] = [
  {
    id: 'websites',
    title: 'Custom Website Development',
    description: 'Purpose-built websites engineered for performance, accessibility, and business outcomes. No templates. No compromise.',
  },
  {
    id: 'web-apps',
    title: 'Web Application Development',
    description: 'Interactive web applications with complex state, real-time data, and robust architecture. From internal tools to customer-facing platforms.',
  },
  {
    id: 'saas',
    title: 'SaaS Platform Development',
    description: 'Multi-tenant software platforms with subscription management, user provisioning, and scalable infrastructure from day one.',
  },
  {
    id: 'business-software',
    title: 'Business Software & Automation',
    description: "Operational software that eliminates manual processes. Workflow automation, data pipelines, and systems that work while you don't.",
  },
  {
    id: 'integrations',
    title: 'API Integrations & Custom Engineering',
    description: 'Third-party integrations, custom APIs, data synchronization, and the technical glue that connects your systems into a coherent whole.',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'sms-campaign-manager-case',
    name: 'SMS Campaign Manager',
    category: 'Android Engineering',
    problem: 'Businesses face prohibitive third-party SMS gateway fees and carrier rate-limiting when conducting bulk mobile outreach.',
    solution: 'Built a native Android Dual-SIM bulk dispatch engine leveraging persistent Foreground Services, intelligent throttling, and local SQLite deduplication.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room SQLite', 'Android SDK 35', 'Foreground Services'],
    url: 'https://dir.evostackr.in/#/project/sms-campaign-manager',
  },
  {
    id: '24idchat-case',
    name: '24IDChat',
    category: 'Communication Platform',
    problem: 'Existing messaging platforms require permanent phone numbers or accounts, exposing user identities and retaining persistent logs.',
    solution: 'Designed and built an ephemeral messaging platform with unique 24-hour rotating identities, sub-15ms WebSocket delivery, and automated 24h disposal.',
    technologies: ['React 19', 'TypeScript', 'WebSocket', 'Node.js', 'Vite'],
    url: 'https://dir.evostackr.in/#/project/24idchat',
  },
  {
    id: 'tempemailfree-case',
    name: 'TempEmailFree',
    category: 'Privacy Utility',
    problem: 'Users need disposable email addresses for sign-ups without exposing personal inboxes to spam, marketing lists, or credential leaks.',
    solution: 'Built a serverless temporary email service with real-time auto-refreshing inboxes and algorithmic OTP verification code detection.',
    technologies: ['Next.js', 'React 19', 'TypeScript', 'Edge API', 'Tailwind CSS'],
    url: 'https://dir.evostackr.in/#/project/tempemailfree',
  },
];

export interface ClosedTestingApp {
  id: string;
  name: string;
  packageId: string;
  playUrl: string;
  category: string;
  iconPath: string;
  description?: string;
  featured?: boolean;
}

export const closedTestingApps: ClosedTestingApp[] = [
  {
    id: 'jalwa-live',
    name: 'Jalwa Live',
    packageId: 'com.jalwalive.app',
    playUrl: 'https://play.google.com/store/apps/details?id=com.jalwalive.app',
    category: 'Entertainment',
    iconPath: '/portfolio-icons/com_jalwalive_app.webp',
    description: 'Live interactive broadcasting and social entertainment streaming platform on Android.',
    featured: true,
  },
  {
    id: 'quezzy',
    name: 'Quezzy',
    packageId: 'com.quezzy.quiz_app',
    playUrl: 'https://play.google.com/store/apps/details?id=com.quezzy.quiz_app',
    category: 'Quiz & Education',
    iconPath: '/portfolio-icons/com_quezzy_quiz_app.webp',
    description: 'Multi-category trivia challenge and interactive knowledge assessment application.',
  },
  {
    id: 'notely',
    name: 'Notely',
    packageId: 'com.notely.notes_app',
    playUrl: 'https://play.google.com/store/apps/details?id=com.notely.notes_app',
    category: 'Productivity',
    iconPath: '/portfolio-icons/com_notely_notes_app.webp',
    description: 'Minimalist note-taking, checklists, and daily personal organizer utility.',
  },
  {
    id: 'online-ludo',
    name: 'Online Ludo',
    packageId: 'com.online.ludo_game',
    playUrl: 'https://play.google.com/store/apps/details?id=com.online.ludo_game',
    category: 'Games',
    iconPath: '/portfolio-icons/com_online_ludo_game.webp',
    description: 'Real-time multiplayer digital board game with room lobbies and live dice matches.',
  },
  {
    id: 'sarkari-result',
    name: 'Sarkari Result',
    packageId: 'com.sarkariresult.sarkariresult_app',
    playUrl: 'https://play.google.com/store/apps/details?id=com.sarkariresult.sarkariresult_app',
    category: 'Information',
    iconPath: '/portfolio-icons/com_sarkariresult_sarkariresult_app.webp',
    description: 'Public job notifications, examination results, and government recruitment updates.',
  },
  {
    id: 'cricmatch',
    name: 'CricMatch',
    packageId: 'com.cricmatch.app',
    playUrl: 'https://play.google.com/store/apps/details?id=com.cricmatch.app',
    category: 'Sports',
    iconPath: '/portfolio-icons/com_cricmatch_app.webp',
    description: 'Real-time cricket score updates, match schedules, and ball-by-ball commentary.',
  },
  {
    id: 'tutorconnect',
    name: 'TutorConnect',
    packageId: 'com.TutorConnect',
    playUrl: 'https://play.google.com/store/apps/details?id=com.TutorConnect',
    category: 'Education',
    iconPath: '/portfolio-icons/com_TutorConnect.webp',
    description: 'Tutor-student discovery platform connecting learners with specialized subject mentors.',
  },
  {
    id: 'pdf-me',
    name: 'PDF Me',
    packageId: 'com.pdfme.pdfeditor',
    playUrl: 'https://play.google.com/store/apps/details?id=com.pdfme.pdfeditor',
    category: 'Productivity',
    iconPath: '/portfolio-icons/com_pdfme_pdfeditor.webp',
    description: 'Mobile document scanner, PDF editor, conversion, and digital signature tool.',
  },
  {
    id: 'online-dating',
    name: 'Online Dating',
    packageId: 'com.online.datingapp',
    playUrl: 'https://play.google.com/store/apps/details?id=com.online.datingapp',
    category: 'Dating',
    iconPath: '/portfolio-icons/com_online_datingapp.webp',
    description: 'Location-based social discovery, verified profiles, and private messaging.',
  },
  {
    id: 'myastro-ai',
    name: 'MyAstro AI',
    packageId: 'com.myastro.ai',
    playUrl: 'https://play.google.com/store/apps/details?id=com.myastro.ai',
    category: 'Astrology',
    iconPath: '/portfolio-icons/com_myastro_ai.webp',
    description: 'AI-assisted astrological readings, birth chart calculations, and daily horoscopes.',
  },
  {
    id: 'home-workout',
    name: 'Home Workout',
    packageId: 'com.homeworkout.fitness_app',
    playUrl: 'https://play.google.com/store/apps/details?id=com.homeworkout.fitness_app',
    category: 'Fitness',
    iconPath: '/portfolio-icons/com_homeworkout_fitness_app.webp',
    description: 'Daily exercise routines, no-equipment fitness challenges, and calorie trackers.',
  },
];
