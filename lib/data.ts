import {
  SolutionItem,
  ProjectShowcaseItem,
  ProcessStage,
  TechStackCategory,
  PricingCategory,
  FaqItem,
} from '@/types';

export const BRC_STAR_INFO = {
  name: 'BRC STAR',
  role: 'Full-Stack Digital Technology Partner',
  eyebrow: 'BRC STAR • FULL-STACK DIGITAL TECHNOLOGY PARTNER',
  tagline: 'Build Digital Products That Move Your Business Forward.',
  subheadline:
    'From high-performance websites and web applications to mobile apps, enterprise platforms, AI solutions and custom business systems — BRC STAR designs and develops technology around your real business needs.',
  contactEmail: 'contact@brcstar.com',
  location: 'Engineering Hub • Global Client Delivery',
  availability: 'Accepting select new projects for Q3/Q4',
};

export const TRUST_PILLARS = [
  {
    title: 'Full-Stack Engineering',
    desc: 'Unified architecture across frontend, backend, database and APIs.',
    icon: 'Layers',
  },
  {
    title: 'Modern Architecture',
    desc: 'Modular, decoupled, and cloud-native systems designed for scale.',
    icon: 'Cpu',
  },
  {
    title: 'Performance Focused',
    desc: 'Optimized rendering, minimal bundle footprints, sub-second LCP.',
    icon: 'Gauge',
  },
  {
    title: 'Security Conscious',
    desc: 'Role-based access, data encryption, and zero-trust safeguards.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Responsive & Accessible',
    desc: 'WCAG compliant, fluid mobile-first layouts across every device.',
    icon: 'Smartphone',
  },
  {
    title: 'Long-Term Partnership',
    desc: 'Continuous post-launch evolution, monitoring, and technical maintenance.',
    icon: 'LifeBuoy',
  },
];

export const BUSINESS_PROBLEMS = [
  {
    problem: 'Outdated Digital Presence & Slow Web Experiences',
    painPoint:
      'Legacy websites and slow load times erode brand trust, increase bounce rates, and handicap conversion potential.',
    solution:
      'High-performance Next.js architectures with sub-second rendering, dynamic SEO, and conversion-engineered UX.',
    icon: 'ZapOff',
  },
  {
    problem: 'Disconnected Tools & Manual Workflow Bottlenecks',
    painPoint:
      'Departments wasting hours manually syncing data between spreadsheets, emails, and isolated SaaS silos.',
    solution:
      'Custom web portals, unified API integrations, and automated pipelines that synchronize your business in real time.',
    icon: 'FileSpreadsheet',
  },
  {
    problem: 'Rigid Off-the-Shelf Software Limiting Growth',
    painPoint:
      'Generic software packages force businesses into restrictive workflows and charge punishing per-seat licensing fees.',
    solution:
      'Tailor-made enterprise software and dashboards built strictly around your proprietary operational logic.',
    icon: 'Lock',
  },
  {
    problem: 'Unclear Technology Direction & Costly Rework',
    painPoint:
      'Hiring disconnected freelancers or template builders leads to brittle codebases that must be rewritten from scratch.',
    solution:
      'End-to-end technical partnership: rigorous discovery, clean architecture, automated QA, and sustainable codebases.',
    icon: 'AlertTriangle',
  },
];

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    tagline: 'High-performance, SEO-ready business websites built for credibility, visibility and lead generation.',
    category: 'web',
    description:
      'We engineer fast, scalable, and responsive digital flagships that establish market authority and turn qualified visitors into long-term commercial relationships.',
    whatWeBuild: [
      'Corporate & enterprise brand websites',
      'High-converting B2B marketing platforms',
      'Custom interactive landing experiences',
      'Headless CMS integrations (Sanity, Strapi, Contentful)',
      'Dynamic programmatic SEO architectures',
    ],
    whoItIsFor:
      'Established businesses, scaling B2B companies, and technology leaders requiring a fast, authoritative, and scalable digital headquarters.',
    problemSolved:
      'Replaces slow, vulnerable, template-based websites with high-speed modern web applications engineered for discovery and conversions.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel / Cloud Run'],
    iconName: 'Globe',
  },
  {
    id: 'web-applications',
    title: 'Web Application Development',
    tagline: 'Custom dashboards, client portals, SaaS products and specialized business applications.',
    category: 'web',
    description:
      'From complex data visualization consoles to customer-facing SaaS platforms, we architect resilient web applications with full type safety and modular backends.',
    whatWeBuild: [
      'Multi-tenant SaaS products and subscriber portals',
      'Real-time operational dashboards & reporting consoles',
      'B2B customer and vendor management portals',
      'Interactive collaboration & workflow tools',
      'Role-based permission systems (RBAC)',
    ],
    whoItIsFor:
      'Founders launching digital products, and organizations needing bespoke web tools to service their customers or partners.',
    problemSolved:
      'Eliminates reliance on fragmented third-party tools by delivering a proprietary, high-performing web application owned entirely by you.',
    technologies: ['React / Next.js', 'TypeScript', 'Node.js', 'PostgreSQL / Prisma', 'Redis'],
    iconName: 'LayoutDashboard',
  },
  {
    id: 'mobile-applications',
    title: 'Mobile Application Development',
    tagline: 'Modern Android/iOS applications and unified cross-platform mobile experiences.',
    category: 'mobile',
    description:
      'Native-feel mobile solutions that deliver smooth offline-capable workflows, push notifications, device sensor integrations, and fluid user interactions.',
    whatWeBuild: [
      'Cross-platform iOS and Android applications',
      'Field service & operational workforce companion apps',
      'Customer loyalty & direct engagement apps',
      'Real-time messaging & status notification tools',
      'Biometric authentication and secure local storage',
    ],
    whoItIsFor:
      'Businesses requiring a dedicated mobile channel for customers, on-field team members, or specialized service operations.',
    problemSolved:
      'Bridges the gap between desktop workstations and on-the-go users with reliable, high-performance mobile interfaces.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'REST / WebSockets', 'App Store Deployments'],
    iconName: 'Smartphone',
  },
  {
    id: 'enterprise-solutions',
    title: 'Enterprise Solutions',
    tagline: 'Custom business systems, internal platforms, workflows and integrated digital infrastructure.',
    category: 'enterprise',
    description:
      'Secure, robust enterprise platforms that unify your corporate data, automate complex business rules, and integrate smoothly with existing ERP and CRM systems.',
    whatWeBuild: [
      'Internal resource management & ERP extensions',
      'Custom CRM & lead distribution engines',
      'Automated approval and document routing pipelines',
      'Legacy system migration & API middleware',
      'Enterprise SSO (SAML, OAuth, Okta, Azure AD)',
    ],
    whoItIsFor:
      'Mid-market and enterprise organizations operating complex workflows that standard SaaS software cannot adequately support.',
    problemSolved:
      'Removes manual departmental bottlenecks, eliminates duplicate data entry, and enforces strict corporate security policies.',
    technologies: ['Node.js', 'PostgreSQL', 'Docker', 'AWS / Cloud Infrastructure', 'GraphQL / REST'],
    iconName: 'Server',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    tagline: 'AI-powered applications, intelligent workflows, automation and business productivity solutions.',
    category: 'ai',
    description:
      'We design practical, production-ready AI capabilities into your software—ranging from automated document extraction to context-aware generative copilots.',
    whatWeBuild: [
      'Custom LLM copilots & domain-specific assistants',
      'Automated document processing & structured extraction',
      'Semantic search and vector knowledge retrieval (RAG)',
      'Intelligent routing & classification algorithms',
      'Automated background workflow triggers',
    ],
    whoItIsFor:
      'Forward-looking businesses seeking tangible productivity gains, automated customer triage, or intelligent data parsing without the AI hype.',
    problemSolved:
      'Converts unstructured documents and repetitive manual reasoning into fast, automated, and auditable software operations.',
    technologies: ['Google GenAI', 'Python / Node.js', 'Vector DBs (Pinecone / pgvector)', 'FastAPI', 'LangChain'],
    iconName: 'Sparkles',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX & Product Design',
    tagline: 'User-centered interfaces and product experiences designed around real user behavior.',
    category: 'design',
    description:
      'We combine cognitive psychology, typographic discipline, and systematic component design to build digital interfaces that are effortless to navigate and convert.',
    whatWeBuild: [
      'Interactive design systems & UI component kits',
      'Wireframing, user journey mapping & rapid prototypes',
      'Complex dashboard and data visualizer ergonomics',
      'Accessibility auditing (WCAG AA compliance)',
      'High-fidelity interactive Figma specifications',
    ],
    whoItIsFor:
      'Product teams and businesses seeking to elevate user satisfaction, streamline complex task flows, and maintain design consistency at scale.',
    problemSolved:
      'Prevents confusing interfaces and high user churn by designing with clarity, mathematical spacing, and verified usability principles.',
    technologies: ['Figma', 'Design Tokens', 'Tailwind CSS', 'Radix Primitives', 'Motion Design'],
    iconName: 'Palette',
  },
  {
    id: 'ecommerce-solutions',
    title: 'E-Commerce Solutions',
    tagline: 'Scalable online stores, product systems, checkout experiences and integrations.',
    category: 'web',
    description:
      'Custom and headless commerce architectures engineered for rapid catalog browsing, secure frictionless payments, and high-volume order processing.',
    whatWeBuild: [
      'Headless commerce storefronts (Shopify Storefront API, Custom)',
      'B2B wholesale pricing tiers & bulk order portals',
      'Custom checkout funnels with Stripe / PayPal integration',
      'Inventory & ERP warehouse synchronization',
      'Omnichannel order tracking & notifications',
    ],
    whoItIsFor:
      'Brands and B2B distributors demanding sub-second product pages, custom payment logic, and zero template restrictions.',
    problemSolved:
      'Overcomes slow monolithic e-commerce platforms with fast, flexible modern architectures that boost conversion rates.',
    technologies: ['Next.js', 'Shopify Storefront API', 'Stripe Payments', 'PostgreSQL', 'Tailwind CSS'],
    iconName: 'ShoppingBag',
  },
  {
    id: 'digital-consulting',
    title: 'Digital Consulting & Architecture',
    tagline: 'Technology strategy, architecture planning and modernization guidance.',
    category: 'enterprise',
    description:
      'Senior technical advisory that helps leadership teams assess feasibility, choose right-sized technology stacks, audit security, and map scalable digital roadmaps.',
    whatWeBuild: [
      'System architecture blueprints & technical feasibility audits',
      'Legacy software modernization roadmaps',
      'Database schema & scalability assessments',
      'Security, DevOps, and CI/CD pipeline auditing',
      'CTO-level advisory for high-stakes technology decisions',
    ],
    whoItIsFor:
      'Executives and founders who need definitive technical clarity before committing significant capital to software initiatives.',
    problemSolved:
      'Prevents disastrous technical debt, wrong vendor selections, and expensive mid-development architectural rewrites.',
    technologies: ['System Design', 'Cloud Strategy (AWS/GCP)', 'Security Auditing', 'DevOps Planning'],
    iconName: 'Compass',
  },
];

export const SHOWCASE_PROJECTS: ProjectShowcaseItem[] = [
  {
    id: 'logistics-cloud-dashboard',
    title: 'Enterprise Fleet & Logistics Orchestration Console',
    category: 'Enterprise Systems',
    type: 'Custom Web Application',
    tagline: 'Real-time telemetry, routing optimization, and automated warehouse dispatch platform.',
    challenge:
      'Multi-hub distribution networks struggle when dispatchers rely on disconnected tracking portals and legacy spreadsheets, causing blind spots and communication lag during peak transit windows.',
    solution:
      'Engineered an event-driven architecture using Next.js, WebSockets, and geospatial mapping algorithms to demonstrate sub-second coordinate streaming, automated dispatch queueing, and role-based dispatcher views.',
    technologies: ['Next.js App Router', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    proofStatus: 'DEMONSTRATED',
    demonstrationType: 'Engineering Demonstration',
    claimId: 'demonstration-projects',
    keyCapabilities: [
      'Sub-50ms live vehicle coordinate streaming pipeline',
      'Dynamic multi-stop route optimization algorithm',
      'Automated dispatch workflow trigger architecture',
      'Role-based access security model with audit logging',
    ],
    architectureOverview:
      'Distributed event pipeline using Redis pub/sub to stream geolocation updates into an optimized Next.js Server Component frontend with client-side canvas rendering for fast asset mapping.',
    mockupType: 'dashboard',
    badgeColor: 'blue',
    metrics: [
      { label: 'Map Coordinate Stream', value: '< 50ms Target', note: 'Demonstrated via WebSocket pipeline' },
      { label: 'Architecture Type', value: 'Decoupled Event Queue', note: 'Redis + Node.js worker pool' },
      { label: 'Data Model', value: 'PostgreSQL Geospatial', note: 'ACID transactional consistency' },
    ],
    proofEvidence: 'Demonstration telemetry visualizer showing active coordinate feeds, latency gauges, and event queue state.',
    verificationMethod: 'Inspect the live interactive mock console and inspect WebSocket/Server Component data architecture.',
  },
  {
    id: 'fintech-settlement-portal',
    title: 'Corporate Partner Settlement & Treasury Platform',
    category: 'Financial Technology',
    type: 'Partner Portal & API Gateway',
    tagline: 'B2B escrow handling, multi-currency ledger reconciliation, and verified partner payouts.',
    challenge:
      'B2B financing networks require mathematical ledger precision and audit immutability to prevent balance discrepancies across multi-party settlements and cross-border currencies.',
    solution:
      'Constructed a zero-trust financial architecture blueprint featuring double-entry ledger verification with SHA-256 cryptographic checksums, automated webhook reconciliation, and tenant-isolated data models.',
    technologies: ['Next.js 15/16', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Stripe Connect', 'AWS KMS'],
    proofStatus: 'REFERENCE',
    demonstrationType: 'Reference Architecture',
    claimId: 'system-architecture',
    keyCapabilities: [
      'Immutable double-entry ledger schema with cryptographic validation',
      'Automated daily bank reconciliation and batch payout logic',
      'Multi-tenant partner sub-accounts with custom permission matrices',
      'SOC2-aligned data encryption in transit and at rest patterns',
    ],
    architectureOverview:
      'Strict server-side validation pipeline with ACID-compliant transactions, isolated database schemas per corporate partner, and AWS KMS hardware security modules.',
    mockupType: 'fintech',
    badgeColor: 'purple',
    metrics: [
      { label: 'Ledger Model', value: 'Double-Entry ACID', note: 'Zero floating-point rounding errors' },
      { label: 'Security Standard', value: 'SOC2 / OWASP Aligned', note: 'Reference architectural posture' },
      { label: 'Data Integrity', value: 'SHA-256 Checksums', note: 'Verifiable batch reconciliation' },
    ],
    proofEvidence: 'Interactive settlement dashboard displaying ledger balance validation, hash checksums, and tenant isolation architecture.',
    verificationMethod: 'Review the double-entry schema specification and server-side validation handler contracts.',
  },
  {
    id: 'ai-customer-intelligence',
    title: 'Cognitive Support & Document Intelligence Workspace',
    category: 'AI & Automation',
    type: 'AI Business Application',
    tagline: 'Domain-specific retrieval augmented generation (RAG) assistant for complex compliance queries.',
    challenge:
      'Operations teams frequently lose hundreds of hours each month manually searching complex compliance PDFs, technical manuals, and policy documentation to answer customer questions.',
    solution:
      'Built a functional semantic knowledge retrieval engine using pgvector embeddings, hybrid lexical-vector search, and Gemini reasoning with explicit document page citations.',
    technologies: ['Google GenAI SDK', 'Next.js App Router', 'pgvector / PostgreSQL', 'FastAPI', 'Tailwind CSS'],
    proofStatus: 'DEMONSTRATED',
    demonstrationType: 'Engineering Demonstration',
    claimId: 'demonstration-projects',
    keyCapabilities: [
      'Contextual document parsing across PDF and markdown datasets',
      'Strict anti-hallucination guardrails requiring verified document citations',
      'Streaming token generation with sub-500ms initial response time',
      'Enterprise privacy architecture with zero third-party model training',
    ],
    architectureOverview:
      'Chunked document ingestion pipeline with vector embeddings indexed in pgvector, orchestrated via serverless API routes with real-time token streaming to client components.',
    mockupType: 'ai-workspace',
    badgeColor: 'blue',
    metrics: [
      { label: 'Vector Index', value: 'pgvector Cosine (768d)', note: 'Fast similarity retrieval' },
      { label: 'Grounding Mode', value: 'Citations Required', note: 'Prevents untethered hallucinations' },
      { label: 'API Integration', value: 'Google GenAI SDK', note: 'Server-side key security' },
    ],
    proofEvidence: 'Interactive semantic search console demonstrating live vector-grounded query answering and citations.',
    verificationMethod: 'Test the query console interface and inspect the server-side GenAI proxy architecture.',
  },
  {
    id: 'global-b2b-commerce',
    title: 'Omnichannel B2B Wholesale & Supply Portal',
    category: 'E-Commerce Solutions',
    type: 'High-Volume Commerce Platform',
    tagline: 'Custom tiered contract pricing, dynamic volume quotes, and automated ERP inventory sync.',
    challenge:
      'B2B distributors struggle when generic off-the-shelf stores cannot handle negotiated buyer pricing tiers, wholesale volume brackets, Net-30 credit terms, or complex freight rules.',
    solution:
      'Designed a headless commerce architecture utilizing Next.js Incremental Static Regeneration (ISR), custom tiered pricing microservices, and asynchronous ERP inventory synchronization.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe B2B', 'Tailwind CSS', 'Redis Cache'],
    proofStatus: 'REFERENCE',
    demonstrationType: 'Reference Architecture',
    claimId: 'system-architecture',
    keyCapabilities: [
      'Dynamic client-specific tiered contract catalogs and custom price lists',
      'Instant digital quote generation with multi-level manager approval logic',
      'Real-time warehouse inventory availability indicators',
      'Flexible Net-30 / Net-60 corporate credit checkout pipelines',
    ],
    architectureOverview:
      'Edge-cached catalog rendering with incremental static regeneration (ISR) paired with dynamic client pricing injected through high-speed micro-APIs.',
    mockupType: 'ecommerce',
    badgeColor: 'purple',
    metrics: [
      { label: 'Catalog Rendering', value: 'Next.js ISR + Edge Cache', note: 'Sub-second product views' },
      { label: 'Pricing Engine', value: 'Dynamic Micro-API', note: 'Client contract tier evaluation' },
      { label: 'Payment Gateway', value: 'Stripe Corporate B2B', note: 'Net-term and invoice billing' },
    ],
    proofEvidence: 'Interactive wholesale price matrix demo showing multi-tier pricing, instant quote calculation, and ERP sync indicator.',
    verificationMethod: 'Review the headless catalog architecture and static generation edge-caching design.',
  },
  {
    id: 'field-operations-mobile',
    title: 'Field Service & Asset Inspection Mobile Suite',
    category: 'Mobile Application',
    type: 'Cross-Platform iOS & Android',
    tagline: 'Offline-first field diagnostics, barcode scanning, and instant cloud sync for mobile technicians.',
    challenge:
      'Technicians working in industrial plants, remote facilities, or basements with zero cellular reception suffer lost records, manual paper duplication, and delayed reporting.',
    solution:
      'Engineered an offline-first mobile architecture with local SQLite persistence, camera barcode diagnostics, digital signature capture, and conflict-free reconciliation when reconnecting.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Node.js API', 'AWS S3'],
    proofStatus: 'REFERENCE',
    demonstrationType: 'Reference Architecture',
    claimId: 'system-architecture',
    keyCapabilities: [
      '100% functional offline mode with deterministic conflict-resolution sync',
      'High-speed hardware camera barcode & QR inspection capture',
      'Legally compliant client digital signature and geotagged timestamping',
      'Instant PDF job completion report generation on device',
    ],
    architectureOverview:
      'Local SQLite database holding full job manifests with asynchronous conflict-free replicated data types (CRDT) for seamless reconciliation upon regaining 4G/5G connection.',
    mockupType: 'mobile-app',
    badgeColor: 'blue',
    metrics: [
      { label: 'Data Store', value: 'Local SQLite Database', note: '100% offline data integrity' },
      { label: 'Sync Protocol', value: 'CRDT Conflict Resolution', note: 'Deterministic cloud merge' },
      { label: 'Framework', value: 'React Native / Expo', note: 'Shared cross-platform core' },
    ],
    proofEvidence: 'Interactive mobile inspection interface demonstrating offline state capture and instant sync confirmation.',
    verificationMethod: 'Inspect the offline data reconciliation flow and local storage schema design.',
  },
  {
    id: 'b2b-saas-flagship',
    title: 'Cybersecurity Infrastructure Marketing Platform',
    category: 'Website Development',
    type: 'High-Performance Flagship Website',
    tagline: 'Conversion-engineered digital presence with interactive product tours and dynamic lead scoring.',
    challenge:
      'Complex technical products lose qualified enterprise leads when their websites are slow, bloated with heavy page-builders, and unable to clearly communicate architectural credibility.',
    solution:
      'Architected a high-performance Next.js marketing experience with static route generation, Core Web Vitals optimization, interactive architectural visualizers, and direct CRM pipeline integration.',
    technologies: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Motion', 'Sanity CMS', 'HubSpot API'],
    proofStatus: 'VERIFIED',
    demonstrationType: 'Verified Capability',
    claimId: 'nextjs-architecture',
    keyCapabilities: [
      'Sub-second Core Web Vitals across mobile and desktop devices',
      'Interactive architecture explorer and compliance framework navigator',
      'Defensively validated lead capture forms with domain verification',
      'Accessible WCAG AA compliant layout with zero layout shifts',
    ],
    architectureOverview:
      'Fully static-rendered core pages with edge personalization and dynamic micro-widgets delivering maximum SEO indexation and flawless Core Web Vitals.',
    mockupType: 'saas-web',
    badgeColor: 'purple',
    metrics: [
      { label: 'Web Vitals Target', value: 'Sub-Second LCP', note: 'Verified in Next.js App Router' },
      { label: 'Layout Shift', value: 'CLS 0.00', note: 'No jarring viewport shifts' },
      { label: 'Accessibility', value: 'WCAG AA Compliant', note: 'High-contrast typography' },
    ],
    proofEvidence: 'Interactive web flagship mockup showcasing sub-second rendering, clean typography, and interactive telemetry widgets.',
    verificationMethod: 'Inspect the live website source code, package dependencies, and browser performance benchmarks.',
  },
];

export const DIFFERENTIATION_POINTS = [
  {
    title: 'Business-First Discovery',
    tagline: 'We build around your economics, not arbitrary code trends.',
    description:
      'Before writing a single line of code, we analyze your revenue drivers, user workflows, operational bottlenecks, and long-term milestones. Every architectural choice directly supports your commercial objectives.',
    brcApproach: 'Deep requirements mapping, commercial ROI focus, executive-level technical discovery.',
    othersApproach: 'Jump straight into styling generic templates without understanding the business model.',
    icon: 'Target',
  },
  {
    title: 'Custom Clean Architecture',
    tagline: 'Modular, maintainable codebases you truly own.',
    description:
      'We reject bloated page-builder themes and brittle freelance shortcuts. We write clean, strongly typed TypeScript with structured domain boundaries that your team or future hires can easily scale.',
    brcApproach: 'Type-safe TypeScript, decoupled micro-modules, automated CI/CD, complete documentation.',
    othersApproach: 'Spaghetti code, copy-pasted snippets, undocumented monolithic spaghetti.',
    icon: 'Layers',
  },
  {
    title: 'Performance & Security Engineering',
    tagline: 'Sub-second speed and hardened enterprise postures.',
    description:
      'Performance and security are not afterthoughts; they are baked into our foundation. We implement rigorous bundle optimizations, CSP headers, encrypted storage, and optimized database queries.',
    brcApproach: 'Target 95+ Core Web Vitals, zero-trust API auth, OWASP Top 10 hardening.',
    othersApproach: 'Heavy plugins that drag load times to 4+ seconds, unvalidated input vectors.',
    icon: 'Shield',
  },
  {
    title: 'Dedicated Technology Partnership',
    tagline: 'Continuous support from discovery to post-launch scaling.',
    description:
      'Unlike one-off freelancers who disappear after invoice payment, BRC STAR operates as your long-term technology department—monitoring uptime, delivering new features, and keeping infrastructure modernized.',
    brcApproach: 'Dedicated technical leads, proactive SLA monitoring, iterative feature roadmaps.',
    othersApproach: 'Ghosting after delivery, leaving client stranded with unmaintained servers.',
    icon: 'Handshake',
  },
];

export const DEVELOPMENT_PROCESS: ProcessStage[] = [
  {
    step: '01',
    title: 'Discovery & Feasibility',
    subtitle: 'Aligning business strategy, user journeys & technical parameters',
    description:
      'We conduct structured stakeholder sessions to define product scope, identify edge cases, assess existing systems, and establish clear technical requirements and ROI criteria.',
    deliverables: [
      'Comprehensive Technical Scope Document (PRD)',
      'User Personas & Primary Journey Maps',
      'System Architecture Blueprint & Integration Map',
      'Milestone Timeline & Risk Mitigation Plan',
    ],
    timeline: 'Week 1 – 2',
    clientTouchpoint: 'Interactive kickoff workshop + Scope sign-off',
    iconName: 'Search',
  },
  {
    step: '02',
    title: 'Architecture & System Design',
    subtitle: 'Laying the scalable foundation before construction begins',
    description:
      'Our architects define database schemas, API contracts, third-party integration pipelines, cloud hosting configurations, and security protocols to ensure bulletproof stability.',
    deliverables: [
      'Relational / Document Database Schema Specification',
      'OpenAPI 3.0 / REST & GraphQL Endpoint Contracts',
      'Cloud Infrastructure Topology (AWS / GCP / Docker)',
      'Security, Auth & Compliance Framework Specification',
    ],
    timeline: 'Week 2 – 3',
    clientTouchpoint: 'Architecture review & data model walkthrough',
    iconName: 'Network',
  },
  {
    step: '03',
    title: 'UX/UI & Interactive Prototyping',
    subtitle: 'Crafting intuitive, high-conversion visual interfaces',
    description:
      'We translate user workflows into cohesive, modern UI components. Every layout is crafted with mathematical spacing, typographic hierarchy, responsive adaptability, and design systems.',
    deliverables: [
      'High-Fidelity Figma Component Design System',
      'Interactive Clickable Prototypes for Core Workflows',
      'Responsive Mobile & Tablet Viewport Specifications',
      'WCAG AA Accessibility Audit Validation',
    ],
    timeline: 'Week 3 – 5',
    clientTouchpoint: 'Design presentation & prototype sign-off',
    iconName: 'Palette',
  },
  {
    step: '04',
    title: 'Full-Stack Development',
    subtitle: 'Agile sprints with production-grade engineering standards',
    description:
      'We build your product in transparent, bi-weekly sprints using modern full-stack technologies. Client staging environments are continuously updated with live working features.',
    deliverables: [
      'Clean, Type-Safe Frontend & Backend Source Code',
      'Live Staging Environment for Continuous Testing',
      'Automated CI/CD Deployment Pipelines',
      'Bi-Weekly Sprint Demo Releases & Progress Reports',
    ],
    timeline: 'Week 5 – 10 (Scope dependent)',
    clientTouchpoint: 'Bi-weekly live sprint demos & staging access',
    iconName: 'Code2',
  },
  {
    step: '05',
    title: 'QA, Security & Performance Audits',
    subtitle: 'Exhaustive verification across browsers, loads & devices',
    description:
      'Our engineers execute automated end-to-end tests, manual user path stress testing, cross-browser compatibility verification, penetration testing, and Core Web Vitals optimization.',
    deliverables: [
      'Automated E2E Test Suites & Unit Coverage Reports',
      'Cross-Device & Cross-Browser Verification Log',
      'Lighthouse Performance & Core Web Vitals Audit Report',
      'OWASP Security Hardening & Vulnerability Scan',
    ],
    timeline: 'Week 10 – 11',
    clientTouchpoint: 'User Acceptance Testing (UAT) & final approval',
    iconName: 'CheckCircle2',
  },
  {
    step: '06',
    title: 'Deployment & Long-Term Support',
    subtitle: 'Seamless production launch and ongoing technology evolution',
    description:
      'We orchestrate zero-downtime production deployment, configure real-time error logging and monitoring alerts, and transition your team into our continuous maintenance and growth cycle.',
    deliverables: [
      'Zero-Downtime Production Deployment & DNS Setup',
      'Real-Time APM Performance & Error Logging Monitoring',
      'Complete Technical Handover & Developer Documentation',
      'Dedicated SLA Maintenance & Continuous Feature Iteration',
    ],
    timeline: 'Launch Day & Continuous Partnership',
    clientTouchpoint: 'Go-live celebration & regular roadmap syncs',
    iconName: 'Rocket',
  },
];

export const TECH_STACK: TechStackCategory[] = [
  {
    category: 'Frontend Engineering',
    description: 'Modern, performant client architectures with sub-second rendering.',
    iconName: 'Layout',
    skills: [
      { name: 'Next.js 16.3 / 15', description: 'Server Components, App Router & streaming SSR', level: 'Core Specialty', highlight: true },
      { name: 'React 19', description: 'Concurrent mode, hooks, transitions, custom primitives', level: 'Expert' },
      { name: 'TypeScript', description: 'Strict end-to-end type safety across the entire stack', level: 'Standard', highlight: true },
      { name: 'Tailwind CSS', description: 'Utility-first styling with mathematical token systems', level: 'Expert' },
      { name: 'Motion / CSS', description: 'Fluid, performance-conscious interactive animations', level: 'Advanced' },
    ],
  },
  {
    category: 'Backend & Server Architecture',
    description: 'Resilient APIs, microservices, and asynchronous event pipelines.',
    iconName: 'Server',
    skills: [
      { name: 'Node.js', description: 'High-concurrency asynchronous runtime environments', level: 'Core Specialty', highlight: true },
      { name: 'REST & GraphQL APIs', description: 'Strictly versioned, documented, schema-driven endpoints', level: 'Expert' },
      { name: 'FastAPI / Python', description: 'High-performance AI backend pipelines & microservices', level: 'Advanced' },
      { name: 'Serverless Functions', description: 'Edge-rendered micro-handlers with instant autoscaling', level: 'Expert' },
      { name: 'WebSockets & SSE', description: 'Low-latency bidirectional data streaming protocols', level: 'Advanced' },
    ],
  },
  {
    category: 'Databases & State Layers',
    description: 'Structured schemas, real-time caching, and transactional safety.',
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL', description: 'Enterprise relational database with ACID compliance', level: 'Core Specialty', highlight: true },
      { name: 'Prisma / Drizzle ORM', description: 'Type-safe database abstraction & automated migrations', level: 'Expert' },
      { name: 'Redis', description: 'High-speed in-memory caching and message pub/sub queues', level: 'Expert' },
      { name: 'MongoDB', description: 'Scalable document store for flexible unstructured schemas', level: 'Advanced' },
      { name: 'pgvector', description: 'Vector similarity search for AI knowledge retrieval', level: 'Advanced' },
    ],
  },
  {
    category: 'Mobile Applications',
    description: 'Native-feel iOS and Android applications with offline resilience.',
    iconName: 'Smartphone',
    skills: [
      { name: 'React Native', description: 'Shared cross-platform codebase with native performance', level: 'Core Specialty', highlight: true },
      { name: 'Expo Framework', description: 'Streamlined build, test, OTA updates, and deployment', level: 'Expert' },
      { name: 'Offline Storage / SQLite', description: 'Reliable local data persistence and sync reconciliation', level: 'Advanced' },
      { name: 'Native Device APIs', description: 'Biometrics, camera scanning, GPS, push notifications', level: 'Advanced' },
    ],
  },
  {
    category: 'Cloud, DevOps & Infrastructure',
    description: 'Containerized deployment, zero-downtime CI/CD, and hardened security.',
    iconName: 'Cloud',
    skills: [
      { name: 'AWS (Amazon Web Services)', description: 'EC2, S3, RDS, CloudFront, Lambda, KMS architecture', level: 'Expert', highlight: true },
      { name: 'Docker & Containers', description: 'Reproducible build environments and isolated microservices', level: 'Expert' },
      { name: 'Vercel / Cloud Run', description: 'Edge networks with global CDN distribution', level: 'Expert' },
      { name: 'CI/CD Pipelines', description: 'Automated GitHub Actions testing, linting and releases', level: 'Standard' },
    ],
  },
  {
    category: 'AI & Data Engineering',
    description: 'Applied machine intelligence, semantic search, and automation.',
    iconName: 'Sparkles',
    skills: [
      { name: 'Google GenAI SDK', description: 'Gemini models, multimodal reasoning & embeddings', level: 'Specialist', highlight: true },
      { name: 'RAG Architecture', description: 'Context-aware retrieval with document grounding', level: 'Advanced' },
      { name: 'Vector Databases', description: 'Pinecone, pgvector indexing for semantic search', level: 'Advanced' },
      { name: 'Workflow Automation', description: 'Event-driven logic triggers and parsing pipelines', level: 'Expert' },
    ],
  },
];

export const PRICING_PACKAGES: PricingCategory[] = [
  {
    id: 'business-websites',
    title: 'High-Performance Business Websites',
    tagline: 'Authoritative, fast, conversion-engineered digital flagship for market credibility.',
    idealFor: 'Mid-sized businesses, B2B services, and scaling startups needing an elite web presence.',
    scopeSummary:
      'Tailored for businesses needing exceptional speed, programmatic SEO, custom UI design, and seamless CMS/CRM integrations.',
    typicalDuration: '3 – 6 Weeks',
    deliverables: [
      'Custom UI/UX design in Figma (No generic templates)',
      'Next.js 16/15 with React Server Components',
      'Headless CMS integration (Sanity or Strapi)',
      'Sub-second Core Web Vitals optimization (95+ score target)',
      'Dynamic SEO metadata & schema markup',
      'Contact forms, CRM webhooks & analytics tracking',
      '30 days post-launch technical warranty',
    ],
    includedArchitecture: [
      'Static Site Generation (SSG) + Incremental Static Regeneration (ISR)',
      'Edge CDN caching & global distribution',
      'Accessibility WCAG AA compliant code',
      'Responsive design across mobile, tablet, and desktop',
    ],
  },
  {
    id: 'custom-web-applications',
    title: 'Custom Web Applications & Portals',
    tagline: 'Bespoke dashboards, SaaS platforms, customer portals, and internal workflows.',
    idealFor: 'Companies building digital products, client hubs, or complex operational platforms.',
    scopeSummary:
      'Architected for authenticated applications with complex state, relational databases, user permission tiers, and third-party API connectivity.',
    typicalDuration: '6 – 12 Weeks',
    popular: true,
    deliverables: [
      'Complete end-to-end full-stack architecture',
      'Role-based access control (Admin, Manager, Customer)',
      'Relational PostgreSQL database with automated migrations',
      'Secure authentication (OAuth, Email magic links, SSO)',
      'Interactive data tables, filters, and real-time dashboards',
      'Third-party payment & API integrations (Stripe, Webhooks)',
      'Automated CI/CD staging and production environments',
      '60 days post-launch warranty & SLA support',
    ],
    includedArchitecture: [
      'Decoupled Next.js frontend with REST/GraphQL backend',
      'Redis session & query caching layer',
      'Database connection pooling & backup snapshots',
      'End-to-end type safety via TypeScript & Prisma',
    ],
  },
  {
    id: 'enterprise-business-systems',
    title: 'Enterprise & Scalable Systems',
    tagline: 'Comprehensive digital infrastructure, multi-service architectures & AI integrations.',
    idealFor: 'Established organizations requiring mission-critical software, custom ERPs, or AI pipelines.',
    scopeSummary:
      'Built for enterprise scale: high concurrency, multi-tenant isolation, legacy system modernization, custom AI pipelines, and continuous support.',
    typicalDuration: '10 – 16+ Weeks / Agile Engagements',
    deliverables: [
      'Multi-tenant architecture & isolated data isolation',
      'Custom AI copilots, document extraction or RAG pipelines',
      'Legacy ERP, CRM & database synchronization middleware',
      'High-availability cloud topology (AWS / Docker)',
      'Exhaustive automated testing (Unit, Integration, E2E)',
      'Enterprise SSO & security compliance hardening',
      'Dedicated engineering lead & priority SLA maintenance agreement',
    ],
    includedArchitecture: [
      'Distributed microservices / modular monolith on AWS/Docker',
      'Real-time WebSocket & asynchronous event queues',
      'Automated disaster recovery & data replication',
      'Zero-trust network architecture & role audits',
    ],
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'Working with BRC STAR',
    question: 'How is BRC STAR different from a freelance developer or traditional web agency?',
    answer:
      'Freelancers typically focus on isolated tasks without full-stack architectural depth, while traditional marketing agencies often rely on bloated WordPress themes and outsource their actual coding. BRC STAR operates as a dedicated technical partner: we are senior software engineers and architects who design custom, type-safe, cloud-native systems built around your specific business model and long-term scalability.',
  },
  {
    category: 'Process & Timeline',
    question: 'How long does a typical full-stack project take from start to launch?',
    answer:
      'Project timelines vary based on functional complexity. A high-performance business website typically takes 3 to 6 weeks. A custom web application or client portal generally takes 6 to 12 weeks. Large-scale enterprise systems or AI-integrated platforms range from 10 to 16+ weeks. We break every project into transparent bi-weekly sprints with live staging demos.',
  },
  {
    category: 'Ownership & Code',
    question: 'Do we own 100% of the source code and intellectual property after completion?',
    answer:
      'Yes, absolutely. Upon final milestone settlement, 100% of the source code, design assets, database schemas, and intellectual property belong exclusively to your company. We transfer full Git repository access and assist with hosting account handoffs without any proprietary lock-in.',
  },
  {
    category: 'Technology & Architecture',
    question: 'Why does BRC STAR specialize in Next.js, React, TypeScript, and Node.js?',
    answer:
      'This modern JavaScript/TypeScript ecosystem provides the optimal balance of developer velocity, extreme runtime performance (with Server Components and static rendering), universal type safety, and massive community ecosystem support. It allows us to build products that load instantly, rank higher on search engines, and scale effortlessly from 100 to 100,000+ users.',
  },
  {
    category: 'Support & Maintenance',
    question: 'What happens after the product launches? Do you provide ongoing support?',
    answer:
      'Every project includes an initial post-launch warranty period covering immediate bug fixes and performance validation. Beyond launch, we offer dedicated technology partnership retainers covering continuous feature development, security patches, infrastructure monitoring, and architectural guidance as your business grows.',
  },
  {
    category: 'Pricing & Investment',
    question: 'How do you structure project investment and billing?',
    answer:
      'We provide transparent, milestone-based fixed proposals for well-defined scopes (typically split into Discovery, Design Approval, Beta Staging, and Production Launch). For evolving products and ongoing platform development, we offer agile dedicated engineering sprints with predictable monthly cycles. Every cost factor—such as third-party APIs or hosting—is outlined transparently upfront.',
  },
];
