export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'CANCELLED';
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'IN_DEVELOPMENT' | 'COMPLETED' | 'CANCELLED';
export type BillingCycle = 'ONE_TIME' | 'MONTHLY' | 'YEARLY';
export type SubscriptionStatus = 'ACTIVE' | 'PAST_DUE' | 'CANCELLED' | 'GRACE_PERIOD';
export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
export type PricingMarket = 'india' | 'international';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;
  gstin?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PricingPlan {
  id: string;
  slug: string;
  name: string;
  category: 'Web Development' | 'E-Commerce' | 'Mobile App' | 'AI & Automation' | 'SaaS / Web Application' | 'Website' | 'Custom Enterprise' | 'Maintenance & AMC';
  market: PricingMarket;
  startingPrice: number; // e.g. 29999 (INR) or 2999 (USD)
  startingPriceInr: number; // for backwards compatibility with existing order logic
  startingPriceUsd?: number;
  currency: 'INR' | 'USD';
  currencySymbol: string; // '₹' | '$'
  billingType: BillingCycle;
  popular?: boolean;
  badgeText?: string; // e.g. 'MOST POPULAR'
  tagline: string;
  targetAudience: string;
  bestFor?: string;
  estimatedScope: string;
  typicalDuration: string;
  supportDuration?: string;
  depositPercentage: number; // e.g. 50% deposit for kickoff
  deliverables: string[];
  features: string[];
  includedArchitecture: string[];
  recommendedFor: string;
  scopeHighlights?: string[];
  ctaLabel?: string; // e.g. 'Get Started', 'Get a Quote', 'Talk to an Expert'
  isStartingFromPlus?: boolean; // For enterprise '+' pricing
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number; // percentage (e.g. 10 for 10%) or fixed amount in INR
  minOrderValue: number;
  maxDiscount?: number;
  expiresAt: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. BRC-ORD-2026-8941
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  planId: string;
  planName: string;
  serviceCategory: string;
  billingType: BillingCycle;
  amountBaseInr: number;
  couponCode?: string;
  discountInr: number;
  taxGstInr: number; // 18% GST standard
  amountTotalInr: number;
  depositPercentage: number;
  depositAmountInr: number;
  balanceDueInr: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  projectRequirements: string;
  timeline: string;
  budgetRange?: string;
  clientNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  customerId: string;
  amountInr: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: PaymentStatus;
  method?: string;
  bank?: string;
  wallet?: string;
  vpa?: string;
  cardLast4?: string;
  verifiedAt?: string;
  failureReason?: string;
  rawPayload?: Record<string, unknown>;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPriceInr: number;
  amountInr: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. BRC-INV-2026-0412
  orderId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  customerGstin?: string;
  items: InvoiceItem[];
  subtotalInr: number;
  discountInr: number;
  taxRatePercent: number; // 18%
  taxAmountInr: number;
  totalAmountInr: number;
  amountPaidInr: number;
  amountDueInr: number;
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'VOID';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  razorpayPaymentId?: string;
  notes?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  planId: string;
  serviceName: string;
  billingCycle: 'MONTHLY' | 'YEARLY';
  amountInr: number;
  currency: string;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextRenewalDate: string;
  autoRenew: boolean;
  gracePeriodDays: number;
  lastPaymentDate?: string;
  lastRazorpayPaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMilestone {
  id: string;
  orderId: string;
  title: string;
  description: string;
  orderIndex: number;
  status: MilestoneStatus;
  targetDate: string;
  completedDate?: string;
  deliverables?: string[];
  artifactUrl?: string;
}

export interface ProjectDocument {
  id: string;
  orderId: string;
  title: string;
  docType: 'SOW' | 'INVOICE' | 'ARCHITECTURE' | 'NDA' | 'CODE_REPOSITORY' | 'HANDOVER';
  fileSize: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface EmailNotification {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  templateType:
    | 'ORDER_CONFIRMATION'
    | 'PAYMENT_RECEIPT'
    | 'INVOICE_ISSUED'
    | 'PAYMENT_FAILED'
    | 'STATUS_UPDATE'
    | 'RENEWAL_REMINDER'
    | 'INQUIRY_RECEIVED';
  contentPreview: string;
  contentHtml: string;
  sentAt: string;
  status: 'SENT' | 'SIMULATED_SUCCESS';
  metadata?: Record<string, unknown>;
}

export interface ProjectInquiryData {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budgetRange: string;
  timeline: string;
  requirements: string;
  status: 'NEW' | 'CONTACTED' | 'PROPOSAL_SENT' | 'WON' | 'ARCHIVED';
  createdAt: string;
}
