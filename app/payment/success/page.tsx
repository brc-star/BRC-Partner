'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InvoiceViewerModal } from '@/components/InvoiceViewerModal';
import { Order, Invoice, PaymentRecord } from '@/types/payment';
import Link from 'next/link';
import {
  CheckCircle2,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
  FileText,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId');

  const [order, setOrder] = useState<Order | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (res.ok && data.order) {
          setOrder(data.order);
          setInvoice(data.invoice || null);
          setPayments(data.payments || []);
        }
      } catch (err) {
        console.error('Error loading order:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center space-y-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/50 animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            Transaction Authenticated • 256-Bit Escrow Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Payment Confirmed &amp; SOW Active</h1>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Your project sprint has been locked in with BRC STAR. An official GST tax invoice and kickoff roadmap have been initialized.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 rounded-3xl bg-[#0c1324] border border-slate-800 text-center text-slate-400 text-sm">
          Loading authenticated order records...
        </div>
      ) : order ? (
        <div className="space-y-6">
          {/* Order Details Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1324] border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Order Reference
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5 font-mono">{order.orderNumber}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Plan: {order.planName}</p>
              </div>

              <div className="flex items-center gap-3">
                {invoice && (
                  <button
                    type="button"
                    onClick={() => setInvoiceModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>View &amp; Print Tax Invoice</span>
                  </button>
                )}

                <Link
                  href={`/dashboard?email=${encodeURIComponent(order.customerEmail)}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition-all"
                >
                  <span>Open Client Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Financial Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#070c17] border border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Deposit Paid Today</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  ₹{order.depositAmountInr.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Total Project SOW</span>
                <span className="text-lg font-bold text-white font-mono">
                  ₹{order.amountTotalInr.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Milestone Balance</span>
                <span className="text-lg font-bold text-slate-300 font-mono">
                  ₹{order.balanceDueInr.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Status</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>IN DEVELOPMENT</span>
                </span>
              </div>
            </div>

            {/* Next Steps Roadmap */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono block">
                Next Immediate Steps:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#090f20] border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span>Discovery &amp; Git Repository</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Lead Systems Architect will initiate the private GitHub repository and send initial design tokens.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#090f20] border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                      2
                    </span>
                    <span>Sprint Roadmap Tracking</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Track live milestone progress, staging previews, and document sign-offs via your Client Dashboard.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#090f20] border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                      3
                    </span>
                    <span>Architect Hotline</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Priority Slack / WhatsApp bridge configured for your engineering team.
                  </p>
                </div>
              </div>
            </div>

            {/* Email Notification Confirmation */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs text-blue-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong>Automated Transaction Email Dispatched:</strong> A copy of your payment receipt and Statement of Work have been sent to <span className="font-mono text-white">{order.customerEmail}</span>.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-10 rounded-3xl bg-[#0c1324] border border-slate-800 text-center space-y-4">
          <p className="text-sm text-slate-300">
            Payment verified successfully. Payment ID: <strong className="text-white font-mono">{paymentId || 'pay_confirmed'}</strong>
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
          >
            <span>Proceed to Client Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <InvoiceViewerModal
        isOpen={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        invoice={invoice}
        order={order}
      />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Navbar onOpenInquiry={() => {}} />
      <main className="flex-grow pt-24 sm:pt-32">
        <Suspense
          fallback={
            <div className="py-24 text-center text-slate-400 text-sm">
              Loading Transaction Confirmation...
            </div>
          }
        >
          <PaymentSuccessContent />
        </Suspense>
      </main>
      <Footer onOpenInquiry={() => {}} />
    </div>
  );
}
