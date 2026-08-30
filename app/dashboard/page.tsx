'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InvoiceViewerModal } from '@/components/InvoiceViewerModal';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { Order, Invoice, Subscription, ProjectMilestone, ProjectDocument, EmailNotification } from '@/types/payment';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  FileText,
  Printer,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building,
  User,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Inbox,
  Lock,
  Download,
  Send,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

function DashboardContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || 'vikram@apexlogistics.in';

  const [clientEmail, setClientEmail] = useState(emailParam);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'orders' | 'milestones' | 'invoices' | 'subscriptions' | 'documents' | 'emails'>('orders');

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [milestones, setMilestones] = useState<ProjectMilestone[]>([]);
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [emails, setEmails] = useState<EmailNotification[]>([]);
  const [loading, setLoading] = useState(true);

  // Invoice viewer modal state
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // Inquiry modal state
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const orderRes = await fetch(`/api/orders?email=${encodeURIComponent(clientEmail)}`);
        const orderData = await orderRes.json();
        const userOrders: Order[] = orderData.orders || [];

        if (!isMounted) return;
        setOrders(userOrders);

        if (userOrders.length > 0) {
          const primary = userOrders[0];
          setSelectedOrder(primary);

          const detailRes = await fetch(`/api/orders/${primary.id}`);
          const detailData = await detailRes.json();
          if (detailRes.ok && isMounted) {
            setMilestones(detailData.milestones || []);
            setDocuments(detailData.documents || []);
            if (detailData.invoice) {
              setInvoices([detailData.invoice]);
            }
          }
        } else {
          setSelectedOrder(null);
          setMilestones([]);
          setDocuments([]);
          setInvoices([]);
        }

        const subRes = await fetch(`/api/subscriptions?email=${encodeURIComponent(clientEmail)}`);
        const subData = await subRes.json();
        if (isMounted) {
          setSubscriptions(subData.subscriptions || []);
        }

        const emailRes = await fetch(`/api/notifications?email=${encodeURIComponent(clientEmail)}`);
        const emailData = await emailRes.json();
        if (isMounted) {
          setEmails(emailData.notifications || []);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [clientEmail, refreshKey]);

  const handleSelectOrder = async (ord: Order) => {
    setSelectedOrder(ord);
    try {
      const detailRes = await fetch(`/api/orders/${ord.id}`);
      const detailData = await detailRes.json();
      if (detailRes.ok) {
        setMilestones(detailData.milestones || []);
        setDocuments(detailData.documents || []);
        if (detailData.invoice) {
          setInvoices([detailData.invoice]);
        }
      }
    } catch (err) {
      console.error('Error loading order details:', err);
    }
  };

  const handleSubscriptionAction = async (subId: string, action: 'CANCEL' | 'RESUME' | 'TRIGGER_RENEWAL_SIMULATION') => {
    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: subId, action }),
      });
      if (res.ok) {
        setRefreshKey((k) => k + 1);
      }
    } catch (err) {
      console.error('Subscription action failed:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400">
              Client Portal &amp; Engineering Operations
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-[10px] font-mono">
              Live SOW Active
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Client Project Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time milestone progress, authenticated GST invoices, code handover records, and AMC subscriptions.
          </p>
        </div>

        {/* Client Account Switcher for Testing / Multi-Client Verification */}
        <div className="p-3 rounded-2xl bg-[#0c1324] border border-slate-800 flex items-center gap-3">
          <User className="w-4 h-4 text-blue-400 shrink-0" />
          <div className="space-y-0.5">
            <label className="block text-[10px] uppercase font-bold text-slate-400 font-mono">
              Logged in Account
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="client@company.in"
              className="bg-transparent border-0 text-xs font-mono text-white focus:outline-none focus:ring-0 w-52"
            />
          </div>
          <button
            type="button"
            onClick={() => setRefreshKey((k) => k + 1)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Refresh Account Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 py-6 border-b border-slate-800/80 no-scrollbar">
        {[
          { id: 'orders', label: 'Active Projects', count: orders.length },
          { id: 'milestones', label: 'Milestone Roadmap', count: milestones.length },
          { id: 'invoices', label: 'GST Tax Invoices', count: invoices.length },
          { id: 'subscriptions', label: 'Recurring AMC', count: subscriptions.length },
          { id: 'documents', label: 'Legal & SOW Vault', count: documents.length },
          { id: 'emails', label: 'Email Notifications Log', count: emails.length },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-[#0c1324]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === tab.id ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="py-8">
        {loading ? (
          <div className="p-16 rounded-3xl bg-[#0c1324] border border-slate-800 text-center text-slate-400 text-sm animate-pulse">
            Fetching verified project data from secure datastore...
          </div>
        ) : (
          <>
            {/* TAB 1: ACTIVE PROJECTS & ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="p-12 rounded-3xl bg-[#0c1324] border border-slate-800 text-center space-y-4">
                    <Inbox className="w-12 h-12 text-slate-600 mx-auto" />
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">No Active Engagements for {clientEmail}</h3>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Ready to launch a new project? Select an engineering plan from our catalog.
                      </p>
                    </div>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-lg shadow-blue-600/30"
                    >
                      <span>Explore Engineering Plans</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Orders List (4 cols) */}
                    <div className="lg:col-span-4 space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                        Your Project Engagements
                      </span>
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          onClick={() => handleSelectOrder(ord)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            selectedOrder?.id === ord.id
                              ? 'bg-blue-950/60 border-blue-500 text-white shadow-md'
                              : 'bg-[#0c1324] border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-mono text-white">{ord.orderNumber}</span>
                            <span
                              className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                                ord.paymentStatus === 'PAID'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                                  : 'bg-amber-950 text-amber-400 border border-amber-800/60'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-2">{ord.planName}</h4>
                          <div className="flex justify-between items-center text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800/60">
                            <span>SOW Total:</span>
                            <span className="font-mono text-white font-semibold">
                              ₹{ord.amountTotalInr.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Selected Order Comprehensive Detail (8 cols) */}
                    {selectedOrder && (
                      <div className="lg:col-span-8 space-y-6">
                        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1324] border border-slate-800 space-y-6 shadow-2xl">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-extrabold text-white font-mono">
                                  {selectedOrder.orderNumber}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                                  {selectedOrder.status}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-blue-400 mt-0.5">{selectedOrder.planName}</h3>
                              <p className="text-xs text-slate-400">
                                Client: <strong className="text-slate-200">{selectedOrder.customerName}</strong> ({selectedOrder.customerEmail})
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              {invoices.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedInvoice(invoices[0]);
                                    setInvoiceModalOpen(true);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                  <span>View Tax Invoice</span>
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => setInquiryModalOpen(true)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors cursor-pointer"
                              >
                                <span>Architect Support</span>
                              </button>
                            </div>
                          </div>

                          {/* Financial Metric Cards */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#070c17] border border-slate-800/80">
                            <div>
                              <span className="text-[10px] text-slate-400 font-mono uppercase block">Total SOW Investment</span>
                              <span className="text-base font-bold text-white font-mono">
                                ₹{selectedOrder.amountTotalInr.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 font-mono uppercase block">Deposit Authenticated</span>
                              <span className="text-base font-bold text-emerald-400 font-mono">
                                ₹{selectedOrder.depositAmountInr.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 font-mono uppercase block">Milestone Balance</span>
                              <span className="text-base font-bold text-slate-300 font-mono">
                                ₹{selectedOrder.balanceDueInr.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 font-mono uppercase block">Razorpay ID</span>
                              <span className="text-xs font-mono text-blue-400 truncate block">
                                {selectedOrder.razorpayPaymentId || 'pay_verified'}
                              </span>
                            </div>
                          </div>

                          {/* Requirements & Target Scope */}
                          <div className="p-4 rounded-2xl bg-[#070c17] border border-slate-800/80 space-y-1.5 text-xs">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                              Configured Scope &amp; Target Specifications:
                            </span>
                            <p className="text-slate-300 leading-relaxed">
                              {selectedOrder.projectRequirements}
                            </p>
                          </div>

                          {/* Quick Milestone Progress Preview */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                                Milestone Sprint Progress
                              </span>
                              <button
                                type="button"
                                onClick={() => setActiveTab('milestones')}
                                className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
                              >
                                <span>View Detailed Roadmap</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="space-y-2">
                              {milestones.slice(0, 3).map((m) => (
                                <div
                                  key={m.id}
                                  className="p-3 rounded-xl bg-[#080e1d] border border-slate-800/80 flex items-center justify-between text-xs"
                                >
                                  <div className="flex items-center gap-3">
                                    {m.status === 'COMPLETED' ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    ) : m.status === 'IN_PROGRESS' ? (
                                      <Clock className="w-4 h-4 text-blue-400 shrink-0 animate-pulse" />
                                    ) : (
                                      <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                                    )}
                                    <div>
                                      <span className="font-bold text-white">{m.title}</span>
                                      <span className="text-slate-400 text-[11px] block">{m.deliverables?.[0] || 'Milestone Deliverables'}</span>
                                    </div>
                                  </div>
                                  <span
                                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                      m.status === 'COMPLETED'
                                        ? 'bg-emerald-950 text-emerald-300'
                                        : m.status === 'IN_PROGRESS'
                                        ? 'bg-blue-950 text-blue-300'
                                        : 'bg-slate-900 text-slate-400'
                                    }`}
                                  >
                                    {m.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: MILESTONE ROADMAP */}
            {activeTab === 'milestones' && (
              <div className="space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1324] border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                        Agile Sprint Engineering Roadmap
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1">Project Milestone Execution</h3>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      Order: {selectedOrder?.orderNumber || 'Active Project'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {milestones.map((m, index) => (
                      <div
                        key={m.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          m.status === 'COMPLETED'
                            ? 'bg-[#08131d] border-emerald-900/50'
                            : m.status === 'IN_PROGRESS'
                            ? 'bg-[#0a1428] border-blue-500/60 shadow-lg shadow-blue-950/40'
                            : 'bg-[#070c17] border-slate-800/80 opacity-75'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-white font-mono font-bold text-xs flex items-center justify-center">
                              {index + 1}
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-white">{m.title}</h4>
                              <p className="text-xs text-slate-400">{m.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                                m.status === 'COMPLETED'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                  : m.status === 'IN_PROGRESS'
                                  ? 'bg-blue-950 text-blue-300 border border-blue-700'
                                  : 'bg-slate-900 text-slate-400 border border-slate-800'
                              }`}
                            >
                              {m.status}
                            </span>
                            {m.completedDate && (
                              <span className="text-[11px] text-slate-400 font-mono">
                                Completed: {m.completedDate.split('T')[0]}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Deliverables Checklist */}
                        <div className="pl-9 space-y-1.5 pt-2 border-t border-slate-800/60 text-xs">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase font-mono">
                            Deliverables:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(m.deliverables || []).map((del, dIdx) => (
                              <div key={dIdx} className="flex items-center gap-2 text-slate-300">
                                <CheckCircle2
                                  className={`w-3.5 h-3.5 ${
                                    m.status === 'COMPLETED' ? 'text-emerald-400' : 'text-slate-600'
                                  }`}
                                />
                                <span>{del}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: GST TAX INVOICES */}
            {activeTab === 'invoices' && (
              <div className="space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1324] border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                        Billing &amp; Tax Compliance
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1">Official GST Tax Invoices</h3>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      GSTIN: 07AAACB1234F1Z9
                    </span>
                  </div>

                  {invoices.length === 0 ? (
                    <p className="text-xs text-slate-400 py-8 text-center">
                      No invoices available for this account. Invoices are generated automatically upon milestone payment verification.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {invoices.map((inv) => (
                        <div
                          key={inv.id}
                          className="p-5 rounded-2xl bg-[#070c17] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white font-mono">{inv.invoiceNumber}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                                {inv.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">
                              Issued: {inv.issueDate} • Client: {inv.customerName} ({inv.customerCompany || 'Direct'})
                            </p>
                            <p className="text-xs text-slate-400">
                              Razorpay ID: <span className="font-mono text-blue-400">{inv.razorpayPaymentId || 'N/A'}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 font-mono block">Amount Paid</span>
                              <span className="text-base font-bold text-emerald-400 font-mono">
                                ₹{inv.amountPaidInr.toLocaleString('en-IN')}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedInvoice(inv);
                                setInvoiceModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>View &amp; Print</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: RECURRING AMC & SUBSCRIPTIONS */}
            {activeTab === 'subscriptions' && (
              <div className="space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1324] border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                        Maintenance &amp; DevOps SLA Agreements
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1">Recurring AMC Subscriptions</h3>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono">
                      5-Day Grace Period Protection Active
                    </span>
                  </div>

                  {subscriptions.length === 0 ? (
                    <div className="py-8 text-center space-y-3">
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        No recurring AMC agreements active under this email. Activate maintenance for 99.9% uptime and monthly security patching.
                      </p>
                      <Link
                        href="/pricing"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-xs font-bold text-white"
                      >
                        <span>View AMC Plans</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {subscriptions.map((sub) => (
                        <div
                          key={sub.id}
                          className="p-5 rounded-2xl bg-[#070c17] border border-slate-800 space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-base font-bold text-white">{sub.serviceName}</h4>
                                <span
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                                    sub.status === 'ACTIVE'
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                                  }`}
                                >
                                  {sub.status}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-0.5">
                                Plan ID: <span className="font-mono text-slate-300">{sub.planId}</span> • Cycle: {sub.billingCycle}
                              </p>
                            </div>

                            <div className="text-right">
                              <span className="text-lg font-bold text-white font-mono">
                                ₹{sub.amountInr.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs text-slate-400"> / month</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-[#0a101f] border border-slate-800/80 text-xs">
                            <div>
                              <span className="text-[10px] text-slate-400 font-mono block">Current Period</span>
                              <span className="text-slate-200">
                                {sub.currentPeriodStart.split('T')[0]} to {sub.currentPeriodEnd.split('T')[0]}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 font-mono block">Next Scheduled Renewal</span>
                              <span className="text-blue-400 font-semibold font-mono">
                                {sub.nextRenewalDate.split('T')[0]}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 font-mono block">Renewal Policy</span>
                              <span className="text-slate-200">30-day notice • 5-day grace</span>
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <button
                              type="button"
                              onClick={() => handleSubscriptionAction(sub.id, 'TRIGGER_RENEWAL_SIMULATION')}
                              className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline cursor-pointer"
                            >
                              Simulate Renewal Email Notification
                            </button>

                            <div className="flex items-center gap-2">
                              {sub.status === 'ACTIVE' ? (
                                <button
                                  type="button"
                                  onClick={() => handleSubscriptionAction(sub.id, 'CANCEL')}
                                  className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-xs font-semibold text-rose-300 transition-colors cursor-pointer"
                                >
                                  Pause / Cancel AMC
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleSubscriptionAction(sub.id, 'RESUME')}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-xs font-semibold text-emerald-300 transition-colors cursor-pointer"
                                >
                                  Reactivate AMC
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: LEGAL & SOW DOCUMENTS */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1324] border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                        Intellectual Property &amp; Legal
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1">Project Documents Vault</h3>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono">
                      100% IP Assignment Guarantee
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-5 rounded-2xl bg-[#070c17] border border-slate-800 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                              {doc.docType}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                            {doc.fileSize}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                        <p className="text-xs text-slate-400">Vault Secure Storage • Encrypted SHA-256</p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                          <span>Uploaded: {doc.uploadedAt ? doc.uploadedAt.split('T')[0] : 'Executed on Kickoff'}</span>
                          <button
                            type="button"
                            onClick={() => alert(`Document "${doc.title}" opened.`)}
                            className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Signed Copy</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: EMAIL NOTIFICATIONS LOG */}
            {activeTab === 'emails' && (
              <div className="space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1324] border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                        Automated Transactional Dispatch
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1">Dispatched Email Audit Logs</h3>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      Real-Time Logging
                    </span>
                  </div>

                  {emails.length === 0 ? (
                    <p className="text-xs text-slate-400 py-8 text-center">
                      No email records logged for this address. Emails are triggered automatically on orders, inquiries, invoices, and subscriptions.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {emails.map((em) => (
                        <div
                          key={em.id}
                          className="p-5 rounded-2xl bg-[#070c17] border border-slate-800 space-y-2 text-xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-blue-400" />
                              <span className="font-bold text-white">{em.subject}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                                {em.templateType}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                {em.sentAt.replace('T', ' ').slice(0, 19)}
                              </span>
                            </div>
                          </div>

                          <p className="text-slate-300 text-[11px] bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                            {em.contentPreview}
                          </p>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                            <span>To: <strong className="text-slate-200">{em.recipientEmail}</strong></span>
                            <span className="text-emerald-400 font-mono font-bold">Status: {em.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Global Invoice Viewer Modal */}
      <InvoiceViewerModal
        isOpen={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        invoice={selectedInvoice}
        order={selectedOrder}
      />

      {/* Global Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Navbar onOpenInquiry={() => {}} />
      <main className="flex-grow pt-24 sm:pt-32">
        <Suspense
          fallback={
            <div className="py-24 text-center text-slate-400 text-sm">
              Loading Client Management Dashboard...
            </div>
          }
        >
          <DashboardContent />
        </Suspense>
      </main>
      <Footer onOpenInquiry={() => {}} />
    </div>
  );
}
