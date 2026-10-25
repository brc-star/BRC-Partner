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
  tagline: string;
  description: string;
  technologies: string[];
  imageSrc: string;
  altText: string;
  badge: string;
  highlights: string[];
}

export const LIVE_PROJECTS: LiveProject[] = [
  {
    id: 'dental-clinic',
    name: 'Apex Dental Clinic & Healthcare Portal',
    domain: 'dentalclinic.brcstar.in',
    url: 'https://dentalclinic.brcstar.in/',
    category: 'Healthcare',
    tagline: 'Modern Clinical Dentistry, Treatment Catalogs & Direct Patient Scheduling Flow',
    description:
      'A high-conversion digital clinic website built for modern dental practices. Features interactive treatment catalogs, doctor profiles, procedure guides, smile gallery showcases, and friction-free direct WhatsApp and online appointment triage.',
    technologies: ['Next.js 15', 'Tailwind CSS', 'WhatsApp Booking', 'Local SEO', 'Interactive UI'],
    imageSrc: '/images/Responsive Dental Clinic Website Showcase.png',
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
    name: 'BRC STAR Technology Solutions & Cloud Services',
    domain: 'tech.brcstar.in',
    url: 'https://tech.brcstar.in/',
    category: 'Technology & IT',
    tagline: 'Enterprise Cloud Architecture, IT Consulting & Custom Systems Engineering',
    description:
      'The specialized technology engineering wing of BRC STAR, presenting end-to-end cloud migration, microservices architecture, API integrations, DevOps CI/CD pipelines, and enterprise software infrastructure solutions.',
    technologies: ['Next.js', 'TypeScript', 'Cloud Architecture', 'DevOps CI/CD', 'API Gateway'],
    imageSrc: '/images/brc-star-technology-partner-hero-banner.jpg',
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
    name: 'BRC STAR Corporate & Flagship Enterprise Portal',
    domain: 'brcstar.in',
    url: 'https://brcstar.in',
    category: 'Enterprise',
    tagline: 'Multi-Industry Corporate Ecosystem & Strategic Business Solutions',
    description:
      'The corporate flagship digital portal representing the BRC STAR parent ecosystem. Showcases strategic business verticals, corporate leadership, cross-domain capabilities, multi-device digital products, and investor relations.',
    technologies: ['Next.js', 'Tailwind CSS', 'Responsive Multi-Device', 'Enterprise Security', 'Performance Optimized'],
    imageSrc: '/images/BRC STAR Multi-Device Tech Showcase.png',
    altText: 'BRC STAR Corporate Flagship Enterprise Portal live preview',
    badge: 'Corporate Flagship',
    highlights: [
      'Full multi-device cross-screen responsiveness',
      'Unified brand architecture across business verticals',
      'Ultra-clean modern aesthetics and rapid load speeds',
    ],
  },
  {
    id: 'cloud-app',
    name: 'BRC STAR Cloud SaaS & Enterprise App Platform',
    domain: 'app.brcstar.in',
    url: 'https://app.brcstar.in/',
    category: 'SaaS & Web Apps',
    tagline: 'Centralized Workflow Automation, Telemetry Dashboards & Multi-Tenant SaaS',
    description:
      'A scalable, multi-tenant cloud application console engineered for high-throughput operations. Features real-time analytical telemetry, role-based access management, modular dashboards, and automated workflow triggers.',
    technologies: ['React 19', 'Next.js App Router', 'REST & GraphQL', 'State Management', 'RBAC Security'],
    imageSrc: '/images/brc-star-multi-device-tech-showcase.jpg',
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
    name: 'Texon B2B Textile & Industrial Manufacturing Portal',
    domain: 'texon.brcstar.in',
    url: 'https://texon.brcstar.in',
    category: 'Textile & Manufacturing',
    tagline: 'Industrial Weaving Machinery, Fabric Catalogs & B2B Global Export Network',
    description:
      'An industrial-grade B2B web platform connecting textile mills, fabric distributors, and global buyers. Includes digital swatch lookbooks, loom machinery specifications, bulk quotation engines, and international export tracking.',
    technologies: ['Next.js', 'B2B Catalog', 'Bulk Inquiry Engine', 'Export Logistics', 'Cloud CDN'],
    imageSrc: '/images/Brctex Responsive Textile Website Showcase.png',
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
    name: 'BizGuru Strategic Business Advisory & Mentorship',
    domain: 'bizguru.brcstar.in',
    url: 'https://bizguru.brcstar.in',
    category: 'Business Advisory',
    tagline: 'Executive Coaching, Growth Mentorship, Market Strategy & EdTech Hub',
    description:
      'An interactive business advisory platform tailored for founders, startups, and SMEs. Provides strategic growth playbooks, curated executive mentorship sessions, actionable roadmaps, and automated diagnostic scorecards.',
    technologies: ['Next.js', 'Tailwind CSS', 'Booking Engine', 'EdTech Modules', 'Analytics Tracker'],
    imageSrc: '/images/slider/brcstar-slider-07.webp',
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
    name: 'FundingAI Investor Intelligence & Capital Readiness',
    domain: 'funding-ai.brcstar.in',
    url: 'https://funding-ai.brcstar.in',
    category: 'AI & FinTech',
    tagline: 'AI-Powered Pitch Evaluation, VC Matchmaking & Capital Readiness Analytics',
    description:
      'An intelligent FinTech platform utilizing AI algorithms to analyze startup pitch decks, model financial projections, benchmark key traction metrics, and connect investment-ready ventures with targeted venture capital partners.',
    technologies: ['Next.js 15', 'AI Models', 'FinTech Analytics', 'Interactive Scorecards', 'Tailwind CSS'],
    imageSrc: '/images/slider/brcstar-slider-09.webp',
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
  'All',
  'Healthcare',
  'Technology & IT',
  'Enterprise',
  'SaaS & Web Apps',
  'Textile & Manufacturing',
  'Business Advisory',
  'AI & FinTech',
] as const;
