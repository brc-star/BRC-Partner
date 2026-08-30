import {
  Customer,
  Order,
  PaymentRecord,
  Invoice,
  Subscription,
  ProjectMilestone,
  ProjectDocument,
  EmailNotification,
  ProjectInquiryData,
  Coupon,
  PaymentStatus,
  OrderStatus,
} from '@/types/payment';
import { CORE_PRICING_PLANS, RECURRING_AMC_PLANS, PROMO_COUPONS, DEMO_SAMPLE_SUBSCRIPTIONS } from './pricing-data';

// Persistent in-memory state store with singleton pattern
interface DatabaseStore {
  customers: Map<string, Customer>;
  orders: Map<string, Order>;
  payments: Map<string, PaymentRecord>;
  invoices: Map<string, Invoice>;
  subscriptions: Map<string, Subscription>;
  milestones: Map<string, ProjectMilestone[]>;
  documents: Map<string, ProjectDocument[]>;
  emails: EmailNotification[];
  inquiries: ProjectInquiryData[];
  coupons: Map<string, Coupon>;
  processedPaymentIds: Set<string>; // Duplicate-payment protection cache
}

// Global reference to survive hot module reloads in Next.js development
declare global {
  var __brcStarDbStore: DatabaseStore | undefined;
}

function initializeDatabase(): DatabaseStore {
  const store: DatabaseStore = {
    customers: new Map(),
    orders: new Map(),
    payments: new Map(),
    invoices: new Map(),
    subscriptions: new Map(),
    milestones: new Map(),
    documents: new Map(),
    emails: [],
    inquiries: [],
    coupons: new Map(),
    processedPaymentIds: new Set(),
  };

  // Seed coupons
  PROMO_COUPONS.forEach((c) => store.coupons.set(c.code.toUpperCase(), { ...c }));

  // Seed subscriptions
  DEMO_SAMPLE_SUBSCRIPTIONS.forEach((s) => store.subscriptions.set(s.id, { ...s }));

  // Seed Demo Customer 1 (Apex Logistics Enterprise)
  const cust1: Customer = {
    id: 'cust-apex-01',
    name: 'Vikram Malhotra',
    email: 'vikram@apexlogistics.in',
    phone: '+91 98765 43210',
    company: 'Apex Supply Chain India Pvt Ltd',
    gstin: '07AAAAA0000A1Z5',
    address: 'DLF Cyber City, Tower 10, Gurugram, Haryana, 122002',
    createdAt: '2026-07-10T10:00:00Z',
    updatedAt: '2026-08-20T12:00:00Z',
  };
  store.customers.set(cust1.id, cust1);

  // Seed Demo Order 1 (Enterprise Platform)
  const order1: Order = {
    id: 'ord-brc-2026-1001',
    orderNumber: 'BRC-ORD-2026-1001',
    customerId: cust1.id,
    customerName: cust1.name,
    customerEmail: cust1.email,
    customerPhone: cust1.phone,
    customerCompany: cust1.company,
    planId: 'plan-enterprise',
    planName: 'Custom Enterprise Solutions',
    serviceCategory: 'Custom Enterprise',
    billingType: 'ONE_TIME',
    amountBaseInr: 149999,
    discountInr: 15000,
    couponCode: 'WELCOME10',
    taxGstInr: 24299.82,
    amountTotalInr: 159298.82,
    depositPercentage: 50,
    depositAmountInr: 79649.41,
    balanceDueInr: 79649.41,
    status: 'IN_DEVELOPMENT',
    paymentStatus: 'PAID',
    paymentMethod: 'Razorpay Netbanking / UPI',
    razorpayOrderId: 'order_BRC_SEED_1001',
    razorpayPaymentId: 'pay_BRC_SEED_9901',
    projectRequirements: 'End-to-End Enterprise Freight Dispatch & Fleet Telemetry Portal with real-time GPS tracking and automated GST electronic-waybill reconciliation.',
    timeline: '8 to 12 Weeks',
    clientNotes: 'Initial sprint kickoff completed. Staging URL deployed on Cloud Run.',
    createdAt: '2026-07-12T14:30:00Z',
    updatedAt: '2026-08-20T10:00:00Z',
  };
  store.orders.set(order1.id, order1);
  store.processedPaymentIds.add('pay_BRC_SEED_9901');

  // Seed Payment Record 1
  const payment1: PaymentRecord = {
    id: 'pmt-1001',
    orderId: order1.id,
    customerId: cust1.id,
    amountInr: order1.depositAmountInr,
    currency: 'INR',
    razorpayOrderId: 'order_BRC_SEED_1001',
    razorpayPaymentId: 'pay_BRC_SEED_9901',
    razorpaySignature: 'sig_verified_seed_1001',
    status: 'PAID',
    method: 'upi',
    vpa: 'vikram@okaxis',
    verifiedAt: '2026-07-12T14:35:00Z',
    createdAt: '2026-07-12T14:35:00Z',
  };
  store.payments.set(payment1.id, payment1);

  // Seed Invoice 1
  const invoice1: Invoice = {
    id: 'inv-brc-2026-0101',
    invoiceNumber: 'BRC-INV-2026-0101',
    orderId: order1.id,
    customerId: cust1.id,
    customerName: cust1.name,
    customerEmail: cust1.email,
    customerPhone: cust1.phone,
    customerCompany: cust1.company,
    customerGstin: cust1.gstin,
    items: [
      {
        id: 'item-1',
        description: 'Custom Enterprise Solutions (50% Project Kickoff Deposit)',
        quantity: 1,
        unitPriceInr: 134999,
        amountInr: 134999,
      },
    ],
    subtotalInr: 134999,
    discountInr: 15000,
    taxRatePercent: 18,
    taxAmountInr: 24299.82,
    totalAmountInr: 159298.82,
    amountPaidInr: 79649.41,
    amountDueInr: 79649.41,
    status: 'PAID',
    issueDate: '2026-07-12',
    dueDate: '2026-07-12',
    paidDate: '2026-07-12T14:35:00Z',
    paymentMethod: 'Razorpay UPI (pay_BRC_SEED_9901)',
    razorpayPaymentId: 'pay_BRC_SEED_9901',
    notes: 'Thank you for partnering with BRC STAR. 50% milestone balance payable prior to final production DNS handover.',
    createdAt: '2026-07-12T14:35:00Z',
  };
  store.invoices.set(invoice1.id, invoice1);

  // Seed Milestones for Order 1
  store.milestones.set(order1.id, [
    {
      id: 'ms-1',
      orderId: order1.id,
      title: 'Phase 1: Discovery & System Architecture Blueprint',
      description: 'Prisma DB entity-relationship modeling, PostgreSQL schema design, and technical SOW formalization.',
      orderIndex: 1,
      status: 'COMPLETED',
      targetDate: '2026-07-18',
      completedDate: '2026-07-17',
      deliverables: ['System Architecture Specification', 'Prisma Schema v1.0', 'Figma Wireframes'],
      artifactUrl: '#',
    },
    {
      id: 'ms-2',
      orderId: order1.id,
      title: 'Phase 2: Core Frontend UI/UX & Dispatch Dashboard',
      description: 'Next.js 15 App Router dispatch console, responsive fleet tables, and telemetry charts.',
      orderIndex: 2,
      status: 'COMPLETED',
      targetDate: '2026-08-05',
      completedDate: '2026-08-04',
      deliverables: ['Live Staging URL', 'RBAC Driver/Admin Views', 'Component Unit Tests'],
      artifactUrl: '#',
    },
    {
      id: 'ms-3',
      orderId: order1.id,
      title: 'Phase 3: Backend API Integration & E-Waybill Webhooks',
      description: 'Automated GST API sync, GPS webhook ingress pipeline, and background workers.',
      orderIndex: 3,
      status: 'IN_PROGRESS',
      targetDate: '2026-09-02',
      deliverables: ['REST/GraphQL Endpoints', 'GST E-Waybill Connector', 'Telemetry Ingest Worker'],
    },
    {
      id: 'ms-4',
      orderId: order1.id,
      title: 'Phase 4: Security Hardening & OWASP Compliance Audit',
      description: 'Penetration testing, rate-limiting rules, SOC2 data encryption checks, and QA regression tests.',
      orderIndex: 4,
      status: 'PENDING',
      targetDate: '2026-09-18',
      deliverables: ['Security Audit Report', 'End-to-End Test Suite', 'Performance Lighthouse 95+ Audit'],
    },
    {
      id: 'ms-5',
      orderId: order1.id,
      title: 'Phase 5: Production Release & 100% IP Repository Handover',
      description: 'DNS cutover, Cloud Run production deployment, Git repo transfer, and 90-day SLA kickoff.',
      orderIndex: 5,
      status: 'PENDING',
      targetDate: '2026-09-30',
      deliverables: ['Production DNS Handover', 'Complete Git Repo Transfer', 'Admin Documentation'],
    },
  ]);

  // Seed Documents for Order 1
  store.documents.set(order1.id, [
    {
      id: 'doc-1',
      orderId: order1.id,
      title: 'Signed Statement of Work (SOW) - Apex Logistics',
      docType: 'SOW',
      fileSize: '1.4 MB',
      fileUrl: '#',
      uploadedAt: '2026-07-12T15:00:00Z',
    },
    {
      id: 'doc-2',
      orderId: order1.id,
      title: 'Tax Invoice BRC-INV-2026-0101 (Deposit Receipt)',
      docType: 'INVOICE',
      fileSize: '245 KB',
      fileUrl: '#',
      uploadedAt: '2026-07-12T14:36:00Z',
    },
    {
      id: 'doc-3',
      orderId: order1.id,
      title: 'Architecture Blueprint & Database Topology Spec',
      docType: 'ARCHITECTURE',
      fileSize: '3.8 MB',
      fileUrl: '#',
      uploadedAt: '2026-07-18T11:00:00Z',
    },
  ]);

  // Seed Email Notifications
  store.emails.push({
    id: 'eml-1001',
    recipientEmail: cust1.email,
    recipientName: cust1.name,
    subject: 'Order Confirmed: BRC-ORD-2026-1001 • BRC STAR Technology Partner',
    templateType: 'ORDER_CONFIRMATION',
    contentPreview: 'Your order for Custom Enterprise Solutions deposit (₹79,649.41) has been confirmed.',
    contentHtml: '<p>Thank you for choosing BRC STAR. Your project kickoff has been scheduled.</p>',
    sentAt: '2026-07-12T14:35:10Z',
    status: 'SENT',
  });

  store.emails.push({
    id: 'eml-1002',
    recipientEmail: cust1.email,
    recipientName: cust1.name,
    subject: 'Official Tax Invoice: BRC-INV-2026-0101 • Payment Received',
    templateType: 'INVOICE_ISSUED',
    contentPreview: 'Invoice BRC-INV-2026-0101 for ₹79,649.41 has been marked PAID.',
    contentHtml: '<p>Tax Invoice attached. Thank you for your payment.</p>',
    sentAt: '2026-07-12T14:35:25Z',
    status: 'SENT',
  });

  // Seed Demo Inquiry
  store.inquiries.push({
    id: 'inq-seed-01',
    name: 'Rohan Deshmukh',
    email: 'rohan@finflow.ai',
    phone: '+91 99887 76655',
    company: 'FinFlow AI Labs',
    service: 'AI & Automation Solutions',
    budgetRange: '₹75,000 – ₹1,50,000',
    timeline: '4 to 6 Weeks',
    requirements: 'Need a custom document analysis copilot that ingests balance sheets and generates financial health summaries.',
    status: 'PROPOSAL_SENT',
    createdAt: '2026-08-25T11:20:00Z',
  });

  return store;
}

export function getDb(): DatabaseStore {
  if (!global.__brcStarDbStore) {
    global.__brcStarDbStore = initializeDatabase();
  }
  return global.__brcStarDbStore;
}

// Helper query & mutation methods
export const db = {
  // Customers
  getCustomerByEmail(email: string): Customer | undefined {
    const store = getDb();
    const cleanEmail = email.toLowerCase().trim();
    for (const cust of store.customers.values()) {
      if (cust.email.toLowerCase().trim() === cleanEmail) {
        return cust;
      }
    }
    return undefined;
  },

  createOrUpdateCustomer(data: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    address?: string;
    gstin?: string;
  }): Customer {
    const store = getDb();
    let cust = this.getCustomerByEmail(data.email);
    const now = new Date().toISOString();
    if (cust) {
      cust.name = data.name || cust.name;
      cust.phone = data.phone || cust.phone;
      if (data.company) cust.company = data.company;
      if (data.address) cust.address = data.address;
      if (data.gstin) cust.gstin = data.gstin;
      cust.updatedAt = now;
      store.customers.set(cust.id, cust);
      return cust;
    }

    const id = `cust-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    cust = {
      id,
      name: data.name,
      email: data.email.toLowerCase().trim(),
      phone: data.phone,
      company: data.company,
      address: data.address,
      gstin: data.gstin,
      createdAt: now,
      updatedAt: now,
    };
    store.customers.set(id, cust);
    return cust;
  },

  // Orders
  getOrderById(id: string): Order | undefined {
    const store = getDb();
    return store.orders.get(id);
  },

  getOrderByNumber(orderNumber: string): Order | undefined {
    const store = getDb();
    for (const ord of store.orders.values()) {
      if (ord.orderNumber.toUpperCase() === orderNumber.toUpperCase()) {
        return ord;
      }
    }
    return undefined;
  },

  getOrderByRazorpayOrderId(razorpayOrderId: string): Order | undefined {
    const store = getDb();
    for (const ord of store.orders.values()) {
      if (ord.razorpayOrderId === razorpayOrderId) {
        return ord;
      }
    }
    return undefined;
  },

  getAllOrders(customerEmail?: string): Order[] {
    const store = getDb();
    const list = Array.from(store.orders.values());
    if (!customerEmail) {
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    const clean = customerEmail.toLowerCase().trim();
    return list
      .filter((o) => o.customerEmail.toLowerCase().trim() === clean)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
    const store = getDb();
    const orderIndex = store.orders.size + 1001;
    const year = new Date().getFullYear();
    const id = `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const orderNumber = `BRC-ORD-${year}-${orderIndex}`;
    const now = new Date().toISOString();

    const order: Order = {
      ...orderData,
      id,
      orderNumber,
      createdAt: now,
      updatedAt: now,
    };

    store.orders.set(id, order);
    return order;
  },

  updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    paymentStatus: PaymentStatus,
    razorpayPaymentId?: string
  ): Order | undefined {
    const store = getDb();
    const order = store.orders.get(orderId);
    if (!order) return undefined;

    order.status = status;
    order.paymentStatus = paymentStatus;
    if (razorpayPaymentId) {
      order.razorpayPaymentId = razorpayPaymentId;
    }
    order.updatedAt = new Date().toISOString();
    store.orders.set(orderId, order);
    return order;
  },

  // Payments & Duplicate-Payment Protection
  isPaymentAlreadyProcessed(razorpayPaymentId: string): boolean {
    const store = getDb();
    return store.processedPaymentIds.has(razorpayPaymentId);
  },

  recordPayment(data: Omit<PaymentRecord, 'id' | 'createdAt'>): PaymentRecord {
    const store = getDb();
    const id = `pmt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = new Date().toISOString();

    const payment: PaymentRecord = {
      ...data,
      id,
      createdAt: now,
    };

    store.payments.set(id, payment);
    if (data.razorpayPaymentId) {
      store.processedPaymentIds.add(data.razorpayPaymentId);
    }
    return payment;
  },

  getPaymentsByOrderId(orderId: string): PaymentRecord[] {
    const store = getDb();
    return Array.from(store.payments.values())
      .filter((p) => p.orderId === orderId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  // Invoices
  getInvoiceById(id: string): Invoice | undefined {
    const store = getDb();
    return store.invoices.get(id);
  },

  getInvoiceByOrderId(orderId: string): Invoice | undefined {
    const store = getDb();
    for (const inv of store.invoices.values()) {
      if (inv.orderId === orderId) {
        return inv;
      }
    }
    return undefined;
  },

  getAllInvoices(customerEmail?: string): Invoice[] {
    const store = getDb();
    const list = Array.from(store.invoices.values());
    if (!customerEmail) {
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    const clean = customerEmail.toLowerCase().trim();
    return list
      .filter((i) => i.customerEmail.toLowerCase().trim() === clean)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  generateInvoiceForOrder(order: Order, razorpayPaymentId?: string): Invoice {
    const store = getDb();
    const existing = this.getInvoiceByOrderId(order.id);
    if (existing) {
      if (razorpayPaymentId) {
        existing.status = 'PAID';
        existing.paidDate = new Date().toISOString();
        existing.razorpayPaymentId = razorpayPaymentId;
        existing.amountPaidInr = order.depositAmountInr;
        existing.amountDueInr = order.balanceDueInr;
      }
      return existing;
    }

    const year = new Date().getFullYear();
    const invCount = store.invoices.size + 101;
    const invoiceNumber = `BRC-INV-${year}-${invCount}`;
    const now = new Date().toISOString();
    const dateStr = now.split('T')[0];

    const isPaid = order.paymentStatus === 'PAID';

    const invoice: Invoice = {
      id: `inv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      invoiceNumber,
      orderId: order.id,
      customerId: order.customerId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      customerCompany: order.customerCompany,
      items: [
        {
          id: 'item-1',
          description: `${order.planName} (${order.depositPercentage}% Project Deposit)`,
          quantity: 1,
          unitPriceInr: order.amountBaseInr,
          amountInr: order.amountBaseInr,
        },
      ],
      subtotalInr: order.amountBaseInr,
      discountInr: order.discountInr,
      taxRatePercent: 18,
      taxAmountInr: order.taxGstInr,
      totalAmountInr: order.amountTotalInr,
      amountPaidInr: isPaid ? order.depositAmountInr : 0,
      amountDueInr: isPaid ? order.balanceDueInr : order.amountTotalInr,
      status: isPaid ? 'PAID' : 'ISSUED',
      issueDate: dateStr,
      dueDate: dateStr,
      paidDate: isPaid ? now : undefined,
      paymentMethod: order.paymentMethod,
      razorpayPaymentId: razorpayPaymentId || order.razorpayPaymentId,
      notes: 'Thank you for choosing BRC STAR. All source code and deliverables remain under warranty.',
      createdAt: now,
    };

    store.invoices.set(invoice.id, invoice);
    return invoice;
  },

  // Milestones
  getMilestonesForOrder(orderId: string): ProjectMilestone[] {
    const store = getDb();
    const existing = store.milestones.get(orderId);
    if (existing) return existing;

    // Create default 5-stage milestone roadmap for newly placed order
    const now = new Date();
    const addDays = (d: number) => {
      const target = new Date(now.getTime() + d * 24 * 60 * 60 * 1000);
      return target.toISOString().split('T')[0];
    };

    const newMilestones: ProjectMilestone[] = [
      {
        id: `ms-${orderId}-1`,
        orderId,
        title: 'Stage 01: Discovery & Architecture Blueprint',
        description: 'Comprehensive requirements gathering, Prisma/PostgreSQL schema modeling, and SOW finalization.',
        orderIndex: 1,
        status: 'IN_PROGRESS',
        targetDate: addDays(5),
        deliverables: ['Architecture Specification Doc', 'Database Entity Schema', 'Project Kickoff Call'],
      },
      {
        id: `ms-${orderId}-2`,
        orderId,
        title: 'Stage 02: High-Fidelity UI/UX & Responsive Views',
        description: 'Bespoke design system, Figma interactive mockups, and client walkthrough.',
        orderIndex: 2,
        status: 'PENDING',
        targetDate: addDays(14),
        deliverables: ['Design System Guide', 'All Screen Templates', 'Interactive Figma Prototype'],
      },
      {
        id: `ms-${orderId}-3`,
        orderId,
        title: 'Stage 03: Core Full-Stack Development & Staging Demo',
        description: 'Next.js App Router engineering, API endpoints, backend logic, and live staging URL.',
        orderIndex: 3,
        status: 'PENDING',
        targetDate: addDays(28),
        deliverables: ['Live Staging URL', 'Bi-Weekly Demo Walkthrough', 'Admin Management Console'],
      },
      {
        id: `ms-${orderId}-4`,
        orderId,
        title: 'Stage 04: Rigorous QA, Security & Lighthouse 95+ Audit',
        description: 'OWASP vulnerability checks, WCAG AA testing, cross-browser validation, and load tests.',
        orderIndex: 4,
        status: 'PENDING',
        targetDate: addDays(38),
        deliverables: ['Security Audit Certificate', 'Lighthouse 95+ Verification', 'UAT Sign-off'],
      },
      {
        id: `ms-${orderId}-5`,
        orderId,
        title: 'Stage 05: Production Deployment & 100% IP Handover',
        description: 'Production DNS cutover, SSL provisioning, full Git repository transfer, and post-launch SLA.',
        orderIndex: 5,
        status: 'PENDING',
        targetDate: addDays(45),
        deliverables: ['Production Live Deployment', 'Complete Git Repo Handover', 'Post-Launch Warranty'],
      },
    ];

    store.milestones.set(orderId, newMilestones);
    return newMilestones;
  },

  // Documents
  getDocumentsForOrder(orderId: string): ProjectDocument[] {
    const store = getDb();
    const existing = store.documents.get(orderId);
    if (existing) return existing;

    const newDocs: ProjectDocument[] = [
      {
        id: `doc-${orderId}-1`,
        orderId,
        title: 'Statement of Work & Master Services Agreement',
        docType: 'SOW',
        fileSize: '1.2 MB',
        fileUrl: '#',
        uploadedAt: new Date().toISOString(),
      },
      {
        id: `doc-${orderId}-2`,
        orderId,
        title: 'Non-Disclosure & Intellectual Property Assignment Agreement',
        docType: 'NDA',
        fileSize: '840 KB',
        fileUrl: '#',
        uploadedAt: new Date().toISOString(),
      },
    ];
    store.documents.set(orderId, newDocs);
    return newDocs;
  },

  // Subscriptions & AMC
  getAllSubscriptions(customerEmail?: string): Subscription[] {
    const store = getDb();
    const list = Array.from(store.subscriptions.values());
    if (!customerEmail) {
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    const clean = customerEmail.toLowerCase().trim();
    return list
      .filter((s) => s.customerEmail.toLowerCase().trim() === clean)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  createSubscription(data: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>): Subscription {
    const store = getDb();
    const id = `sub-brc-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();

    const sub: Subscription = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };
    store.subscriptions.set(id, sub);
    return sub;
  },

  updateSubscriptionStatus(id: string, status: Subscription['status']): Subscription | undefined {
    const store = getDb();
    const sub = store.subscriptions.get(id);
    if (!sub) return undefined;
    sub.status = status;
    sub.updatedAt = new Date().toISOString();
    store.subscriptions.set(id, sub);
    return sub;
  },

  // Coupons
  getCoupon(code: string): Coupon | undefined {
    const store = getDb();
    return store.coupons.get(code.toUpperCase().trim());
  },

  validateCoupon(
    code: string,
    orderAmountInr: number
  ): { valid: boolean; discountInr: number; message: string; coupon?: Coupon } {
    if (!code || !code.trim()) {
      return { valid: false, discountInr: 0, message: 'No promo code entered.' };
    }

    const coupon = this.getCoupon(code);
    if (!coupon) {
      return { valid: false, discountInr: 0, message: 'Invalid or unrecognized coupon code.' };
    }

    if (!coupon.isActive) {
      return { valid: false, discountInr: 0, message: 'This coupon is no longer active.' };
    }

    const now = new Date();
    if (new Date(coupon.expiresAt) < now) {
      return { valid: false, discountInr: 0, message: 'This coupon has expired.' };
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return { valid: false, discountInr: 0, message: 'Coupon usage limit has been reached.' };
    }

    if (orderAmountInr < coupon.minOrderValue) {
      return {
        valid: false,
        discountInr: 0,
        message: `Minimum order value for this coupon is ₹${coupon.minOrderValue.toLocaleString('en-IN')}.`,
      };
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discount = (orderAmountInr * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    return {
      valid: true,
      discountInr: Math.round(discount),
      message: `Coupon ${coupon.code} applied! Saved ₹${Math.round(discount).toLocaleString('en-IN')}.`,
      coupon,
    };
  },

  incrementCouponUsage(code: string) {
    const store = getDb();
    const coupon = store.coupons.get(code.toUpperCase().trim());
    if (coupon) {
      coupon.usedCount += 1;
      store.coupons.set(coupon.code, coupon);
    }
  },

  // Project Inquiries
  createInquiry(data: Omit<ProjectInquiryData, 'id' | 'status' | 'createdAt'>): ProjectInquiryData {
    const store = getDb();
    const id = `inq-${Date.now()}`;
    const inquiry: ProjectInquiryData = {
      ...data,
      id,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    store.inquiries.unshift(inquiry);
    return inquiry;
  },

  getAllInquiries(): ProjectInquiryData[] {
    const store = getDb();
    return store.inquiries;
  },

  // Email Notifications Log
  recordEmailNotification(data: Omit<EmailNotification, 'id' | 'sentAt'>): EmailNotification {
    const store = getDb();
    const email: EmailNotification = {
      ...data,
      id: `eml-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sentAt: new Date().toISOString(),
    };
    store.emails.unshift(email);
    return email;
  },

  getAllEmails(recipientEmail?: string): EmailNotification[] {
    const store = getDb();
    if (!recipientEmail) return store.emails;
    const clean = recipientEmail.toLowerCase().trim();
    return store.emails.filter((e) => e.recipientEmail.toLowerCase().trim() === clean);
  },
};
