'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { RefreshCcw, ChevronLeft, ShieldCheck, Mail, Phone, AlertCircle, FileText } from 'lucide-react';
import { SITE } from '@/lib/site-config';

export default function RefundCancellationPolicyPage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#050811] dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col transition-colors duration-200">
      <Navbar onOpenInquiry={() => setInquiryModalOpen(true)} />

      <main className="flex-grow pt-28 sm:pt-36 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-blue-600 dark:text-blue-400">Refund &amp; Cancellation Policy</span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-slate-200 dark:border-slate-800/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <RefreshCcw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Commercial Terms &amp; Consumer Protection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Refund &amp; Cancellation Policy
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
              <span><strong>Effective Date:</strong> 12 October 2026</span>
              <span>•</span>
              <span><strong>Entity:</strong> {SITE.legalName}</span>
              <span>•</span>
              <span><strong>CIN:</strong> {SITE.cin}</span>
            </div>
          </div>

          {/* Policy Body */}
          <div className="space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 flex items-start gap-3.5">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-200">
                At <strong>{SITE.legalName}</strong>, we pride ourselves on transparent, milestone-driven technical execution. Every deliverable is scoped via a formal Statement of Work (SOW) with scheduled staging reviews before code handover.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-mono">01.</span>
                Scope of Payments Covered
              </h2>
              <p>
                This policy governs all commercial transactions conducted through our payment gateway partners (including Razorpay), wire transfers, NEFT/RTGS, and direct business accounts. Covered transaction categories include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
                <li><strong>Fixed-Scope Sprint Payments:</strong> Upfront payments for standard fixed-deliverable packages (e.g. ₹29,999 basic business website).</li>
                <li><strong>Advance Booking Deposits:</strong> Reservation fees paid prior to technical discovery for custom projects.</li>
                <li><strong>Milestone Payments:</strong> Scheduled stage disbursements (e.g., Wireframing, Backend Architecture, Final Staging).</li>
                <li><strong>Annual &amp; Monthly Maintenance Retainers (AMC):</strong> Recurring server upkeep and retainer agreements.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-mono">02.</span>
                Project Cancellation by Client
              </h2>
              <p>
                Clients may cancel an engagement by submitting written notice to <a href={`mailto:${SITE.email}`} className="text-blue-600 dark:text-blue-400 underline font-medium">{SITE.email}</a>:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
                <li><strong>Prior to Work Commencement:</strong> If cancellation occurs within 48 hours of advance booking and prior to the initial architecture discovery workshop, 100% of the advance fee will be refunded, less applicable payment gateway transaction processing fees (typically 2-3%).</li>
                <li><strong>During Active Sprints:</strong> If cancellation occurs during an active development sprint, the client is billed solely for actual verified hours and completed milestone deliverables. Any unspent advance balance will be refunded.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-mono">03.</span>
                Treatment of Delivered Work &amp; Intellectual Property
              </h2>
              <p>
                Completed and accepted milestones are non-refundable, as engineering hours and intellectual assets have been irrevocably produced. Upon settlement of accrued balances:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
                <li>All completed source code, Figma design files, and documentation produced up to the cancellation timestamp will be transferred directly to the client's repository.</li>
                <li>100% intellectual property rights for paid milestones remain with the client.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-mono">04.</span>
                Refund Processing Timelines
              </h2>
              <p>
                Once an authorized refund is approved by our finance committee:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
                <li>Refunds are credited back to the <strong>original source of payment</strong> (Credit Card, Debit Card, Net Banking, or UPI via Razorpay).</li>
                <li>Credits typically reflect within <strong>5 to 7 working days</strong>, depending on the issuing banking institution.</li>
                <li>A formal confirmation receipt with reference transaction ID will be emailed to the client immediately upon initiation.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-mono">05.</span>
                Taxes, GST &amp; Credit Notes
              </h2>
              <p>
                All customer invoices include 18% Goods and Services Tax (GST). In the event of an approved refund, a statutory GST Credit Note will be issued by {SITE.legalName} complying with Indian Goods and Services Tax regulations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-mono">06.</span>
                Disputes &amp; Grievance Redressal
              </h2>
              <p>
                We are dedicated to resolving client concerns transparently and amicably. For any billing inquiries, cancellation requests, or dispute escalations:
              </p>
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span><strong>Billing Support:</strong> <a href={`mailto:${SITE.email}`} className="text-blue-600 dark:text-blue-400">{SITE.email}</a></span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span><strong>Escalation Line:</strong> {SITE.phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span><strong>Registered Entity:</strong> {SITE.legalName}, {SITE.address.street}, {SITE.address.city}, {SITE.address.state} - {SITE.address.postalCode}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer onOpenInquiry={() => setInquiryModalOpen(true)} />

      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
