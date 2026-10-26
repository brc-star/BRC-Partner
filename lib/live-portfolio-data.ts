export interface ProjectFeatureCard {
  icon:
    | 'ShoppingCart'
    | 'Laptop'
    | 'Layers'
    | 'Gauge'
    | 'Calendar'
    | 'Cloud'
    | 'Shield'
    | 'Cpu'
    | 'Sparkles'
    | 'Globe';
  title: string;
}

export interface LiveProject {
  id: string;
  name: string;
  domain: string;
  url: string;
  category:
    | 'Healthcare'
    | 'Technology & IT'
    | 'Enterprise'
    | 'SaaS & Web Apps'
    | 'Textile & Manufacturing'
    | 'Business Advisory'
    | 'AI & FinTech';
  badgeLabel: string;
  headlineMain: string;
  headlineSub: string;
  tagline: string;
  description: string;
  featureCards: ProjectFeatureCard[];
  technologies: string[];
  screenshotSrc: string;
  imageSrc: string;
  altText: string;
  badge: string;
  highlights: string[];
}

export const LIVE_PROJECTS: LiveProject[] = [
  {
    id: 'dental-clinic',
    name: 'Apex Dental Clinic Healthcare Portal',
    domain: 'dentalclinic.brcstar.in',
    url: 'https://dentalclinic.brcstar.in/',
    category: 'Healthcare',
    badgeLabel: 'CLINICAL HEALTHCARE & DENTISTRY',
    headlineMain: 'Apex Dental Clinic',
    headlineSub: 'Healthcare Portal',
    tagline: 'Modern Clinical Dentistry, Treatment Catalogs & Direct Patient Scheduling Flow',
    description:
      'A fully responsive digital healthcare portal for Apex Dental Clinic showcasing treatments, doctor profiles, patient discovery and smile gallery with seamless WhatsApp booking and real-time appointment scheduling.',
    featureCards: [
      { icon: 'Calendar', title: 'Online Appointments' },
      { icon: 'Laptop', title: 'Responsive Design' },
      { icon: 'Layers', title: 'Treatment Catalog' },
      { icon: 'Gauge', title: 'Fast Loading Speed' },
    ],
    technologies: ['Next.js 15', 'Tailwind CSS', 'WhatsApp Booking', 'Local SEO', 'Interactive UI'],
    screenshotSrc: '/images/live-showcase/dentalclinic.png',
    imageSrc: '/images/live-showcase/dentalclinic.png',
    altText: 'Apex Dental Clinic & Healthcare Website live showcase by BRC STAR Partner',
    badge: 'Clinical Healthcare',
    highlights: [
      'Sub-second first contentful paint',
      'One-tap WhatsApp & appointment inquiry',
      'Mobile-first responsive treatment catalog',
    ],
  },
  {
    id: 'tech-portal',
    name: 'BRC Tech Cloud & IT Solutions',
    domain: 'tech.brcstar.in',
    url: 'https://tech.brcstar.in/',
    category: 'Technology & IT',
    badgeLabel: 'ENTERPRISE CLOUD ARCHITECTURE',
    headlineMain: 'BRC Tech',
    headlineSub: 'Cloud Solutions Portal',
    tagline: 'Enterprise Cloud Architecture, IT Consulting & Custom Systems Engineering',
    description:
      'The specialized technology engineering portal of BRC STAR, delivering modern cloud migrations, microservices architectures, DevOps CI/CD automation, and high-security enterprise API systems.',
    featureCards: [
      { icon: 'Cloud', title: 'Cloud Architecture' },
      { icon: 'Laptop', title: 'Responsive Design' },
      { icon: 'Cpu', title: 'DevOps & CI/CD' },
      { icon: 'Gauge', title: 'Fast Loading Speed' },
    ],
    technologies: ['Next.js', 'TypeScript', 'Cloud Architecture', 'DevOps CI/CD', 'API Gateway'],
    screenshotSrc: '/images/live-showcase/tech.png',
    imageSrc: '/images/live-showcase/tech.png',
    altText: 'BRC STAR Technology Solutions and Cloud Infrastructure live portal',
    badge: 'Enterprise Tech',
    highlights: [
      'Type-safe Next.js & TypeScript architecture',
      'High-throughput cloud deployment infrastructure',
      'Comprehensive enterprise service breakdown',
    ],
  },
  {
    id: 'corporate-flagship',
    name: 'BRC STAR Self Volt EV Flagship Portal',
    domain: 'brcstar.in',
    url: 'https://brcstar.in',
    category: 'Enterprise',
    badgeLabel: 'CLEANTECH & ELECTRIC MOBILITY',
    headlineMain: 'BRC STAR',
    headlineSub: 'Self Volt EV Flagship',
    tagline: 'Self-Charging Electric Vehicle, Clean Mobility & CleanTech Innovation',
    description:
      'A high-impact digital flagship for BRC STAR Self Volt EV, showcasing patented self-charging electric vehicle technology, dynamic vehicle telemetry, clean automotive aesthetics, and commercial fleet roadmaps.',
    featureCards: [
      { icon: 'Cpu', title: 'Self-Charging EV' },
      { icon: 'Laptop', title: 'Interactive 3D UI' },
      { icon: 'Shield', title: 'CleanTech Systems' },
      { icon: 'Gauge', title: 'High Performance' },
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'Responsive Multi-Device', 'CleanTech 3D', 'Performance Optimized'],
    screenshotSrc: '/images/live-showcase/brcstar.png',
    imageSrc: '/images/live-showcase/brcstar.png',
    altText: 'BRC STAR Self Volt EV live website showcase featuring dark hero section and electric vehicle',
    badge: 'CleanTech Flagship',
    highlights: [
      'Interactive 3D self-charging EV showcase',
      'Dynamic automotive telemetry and fleet metrics',
      'Ultra-responsive dark hero visual architecture',
    ],
  },
  {
    id: 'cloud-app',
    name: 'BRC STAR Cloud SaaS Console',
    domain: 'app.brcstar.in',
    url: 'https://app.brcstar.in/',
    category: 'SaaS & Web Apps',
    badgeLabel: 'ENTERPRISE SAAS CONSOLE',
    headlineMain: 'BRC STAR App',
    headlineSub: 'Cloud SaaS Platform',
    tagline: 'Centralized Workflow Automation, Telemetry Dashboards & Multi-Tenant SaaS',
    description:
      'An enterprise cloud application console engineered for high-throughput workflows, providing real-time telemetry metrics, role-based authorization, modular dashboards, and automated pipeline triggers.',
    featureCards: [
      { icon: 'Layers', title: 'Multi-Tenant SaaS' },
      { icon: 'Laptop', title: 'Interactive Console' },
      { icon: 'Shield', title: 'Role-Based Access' },
      { icon: 'Gauge', title: 'Real-Time Telemetry' },
    ],
    technologies: ['React 19', 'Next.js App Router', 'REST & GraphQL', 'State Management', 'RBAC Security'],
    screenshotSrc: '/images/live-showcase/app.png',
    imageSrc: '/images/live-showcase/app.png',
    altText: 'BRC STAR Cloud SaaS Console and Enterprise Web Application',
    badge: 'SaaS Application',
    highlights: [
      'Dynamic real-time monitoring and telemetry',
      'Role-based granular access control (RBAC)',
      'High-performance React 19 component trees',
    ],
  },
  {
    id: 'texon-textile',
    name: 'TEXON Textile E-Commerce Platform',
    domain: 'texon.brcstar.in',
    url: 'https://texon.brcstar.in',
    category: 'Textile & Manufacturing',
    badgeLabel: 'TEXTILE & INDUSTRIAL E-COMMERCE',
    headlineMain: 'TEXON',
    headlineSub: 'E-Commerce Website',
    tagline: 'Modern, Elegant & User-Friendly Textile E-Commerce Platform',
    description:
      'A fully responsive e-commerce website for TEXON showcasing sarees, dress materials, suits, kurtis and home textiles with a modern design, easy navigation and seamless shopping experience.',
    featureCards: [
      { icon: 'ShoppingCart', title: 'E-Commerce Store' },
      { icon: 'Laptop', title: 'Responsive Design' },
      { icon: 'Layers', title: 'Modern UI/UX' },
      { icon: 'Gauge', title: 'Fast Loading Performance' },
    ],
    technologies: ['Next.js', 'B2B Catalog', 'Bulk Inquiry Engine', 'Export Logistics', 'Cloud CDN'],
    screenshotSrc: '/images/live-showcase/texon.png',
    imageSrc: '/images/live-showcase/texon.png',
    altText: 'Texon B2B Textile and Industrial Manufacturing platform live showcase',
    badge: 'Industrial B2B',
    highlights: [
      'Comprehensive digital fabric & machinery catalog',
      'Direct Request for Quotation (RFQ) workflows',
      'Optimized for global procurement agents & distributors',
    ],
  },
  {
    id: 'bizguru-advisory',
    name: 'BizGuru Strategic Business Advisory',
    domain: 'bizguru.brcstar.in',
    url: 'https://bizguru.brcstar.in',
    category: 'Business Advisory',
    badgeLabel: 'STRATEGIC ADVISORY & EDTECH',
    headlineMain: 'BizGuru AI',
    headlineSub: 'Executive Advisory Hub',
    tagline: 'Executive Coaching, Growth Mentorship, Market Strategy & EdTech Hub',
    description:
      'An interactive business advisory portal for founders and executives, delivering structured venture validation roadmaps, 1-on-1 mentorship bookings, business health scorecards, and strategy frameworks.',
    featureCards: [
      { icon: 'Calendar', title: 'Executive Coaching' },
      { icon: 'Laptop', title: 'Responsive Design' },
      { icon: 'Layers', title: 'EdTech Modules' },
      { icon: 'Gauge', title: 'Fast Loading Speed' },
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'Booking Engine', 'EdTech Modules', 'Analytics Tracker'],
    screenshotSrc: '/images/live-showcase/bizguru.png',
    imageSrc: '/images/live-showcase/bizguru.png',
    altText: 'BizGuru Strategic Business Advisory and Executive Mentorship platform',
    badge: 'Business Advisory',
    highlights: [
      'Interactive executive coaching booking engine',
      'Actionable startup growth & validation frameworks',
      'Clean pedagogical layout optimized for engagement',
    ],
  },
  {
    id: 'funding-ai',
    name: 'FundingAI Investor Intelligence Platform',
    domain: 'funding-ai.brcstar.in',
    url: 'https://funding-ai.brcstar.in',
    category: 'AI & FinTech',
    badgeLabel: 'AI & FINTECH INTELLIGENCE',
    headlineMain: 'Funding AI',
    headlineSub: 'Investor Intelligence Portal',
    tagline: 'AI-Powered Pitch Evaluation, VC Matchmaking & Capital Readiness Analytics',
    description:
      'An intelligent AI-driven venture intelligence platform analyzing founder pitch decks, assessing capital readiness, benchmarking financial unit metrics, and connecting ventures with prospective investors.',
    featureCards: [
      { icon: 'Cpu', title: 'AI Pitch Scoring' },
      { icon: 'Laptop', title: 'Responsive Design' },
      { icon: 'Layers', title: 'VC Matchmaking' },
      { icon: 'Gauge', title: 'Instant Analytics' },
    ],
    technologies: ['Next.js 15', 'AI Models', 'FinTech Analytics', 'Interactive Scorecards', 'Tailwind CSS'],
    screenshotSrc: '/images/live-showcase/funding-ai.png',
    imageSrc: '/images/live-showcase/funding-ai.png',
    altText: 'FundingAI Investor Intelligence and Capital Readiness platform',
    badge: 'AI & FinTech',
    highlights: [
      'Automated pitch deck assessment scoring',
      'Venture capital benchmarking criteria',
      'Intuitive investor intelligence dashboard UI',
    ],
  },
];

export const PORTFOLIO_CATEGORIES = [
  'All Projects',
  'SaaS & Web Apps',
  'Textile & Manufacturing',
  'Business Advisory',
  'Healthcare',
  'Technology & IT',
  'Enterprise',
  'AI & FinTech',
] as const;
