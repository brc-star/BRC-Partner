export interface SolutionItem {
  id: string;
  title: string;
  tagline: string;
  category: 'web' | 'enterprise' | 'mobile' | 'ai' | 'design';
  description: string;
  whatWeBuild: string[];
  whoItIsFor: string;
  problemSolved: string;
  technologies: string[];
  iconName: string;
}

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  category: string;
  type: string;
  tagline: string;
  challenge: string;
  solution: string;
  technologies: string[];
  keyCapabilities: string[];
  architectureOverview: string;
  mockupType: 'dashboard' | 'fintech' | 'ai-workspace' | 'ecommerce' | 'mobile-app' | 'saas-web';
  badgeColor: string;
  metrics?: { label: string; value: string }[];
}

export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeline: string;
  clientTouchpoint: string;
  iconName: string;
}

export interface TechStackCategory {
  category: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    description: string;
    level: string;
    highlight?: boolean;
  }[];
}

export interface PricingCategory {
  id: string;
  title: string;
  tagline: string;
  idealFor: string;
  scopeSummary: string;
  typicalDuration: string;
  deliverables: string[];
  includedArchitecture: string[];
  popular?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface ProjectInquiryData {
  fullName: string;
  email: string;
  companyName?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  projectDescription: string;
  servicesNeeded: string[];
}
