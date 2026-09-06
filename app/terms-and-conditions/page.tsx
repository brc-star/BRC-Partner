'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { FileText, ShieldCheck, Scale, CheckCircle2, ChevronLeft, ArrowRight, Code2 } from 'lucide-react';
import { BRC_STAR_INFO } from '@/lib/data';

export default function TermsAndConditionsPage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Navbar onOpenInquiry={() => setInquiryModalOpen(true)} />

      <main className="flex-grow pt-28 sm:pt-36 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-blue-400">Terms &amp; Conditions</span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-slate-800/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>Commercial &amp; Engineering Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              These Terms and Conditions govern all software engineering engagements, custom development sprints, milestone agreements, and advisory services provided by BRC STAR (”BRC STAR”, ”we”, ”us”, or ”our”). By engaging our services, requesting a proposal, or placing an order via our platform, you agree to be bound by these terms.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <span>Effective Date: September 1, 2026</span>
              <span>•</span>
              <span>Version: 2026.2</span>
              <span>•</span>
              <span className="text-emerald-400">100% IP Handover Standard</span>
            </div>
          </div>

          {/* Terms Content Sections */}
          <div className="space-y-10 text-sm leading-relaxed text-slate-300">
            {/* Section 1 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">01.</span> Scope of Services &amp; Milestone Deliverables
              </h2>
              <p>
                BRC STAR delivers end-to-end full-stack technology solutions, including custom web application development, mobile application engineering (iOS &amp; Android), SaaS systems architecture, AI agents &amp; RAG automation, enterprise software integrations, and technical maintenance.
              </p>
              <p>
                Each project is governed by an agreed Statement of Work (SOW) or Milestone Architecture Schedule specifying deliverables, sprint velocity, technical prerequisites, and acceptance criteria.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">02.</span> Intellectual Property &amp; Source Code Ownership
              </h2>
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-900/60 text-xs space-y-2">
                <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>100% Client Ownership Guarantee</span>
                </div>
                <p className="text-slate-300">
                  Upon settlement of final project milestone payments, 100% of all custom-written source code, visual designs, database schemas, API integrations, and technical documentation developed specifically for your project belong exclusively to the client. BRC STAR retains no royalty claims or proprietary vendor lock-in.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">03.</span> Milestone Payments, GST &amp; Invoicing
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li><strong className="text-slate-200">Pricing Transparency:</strong> Customer-facing plan fees are itemized clearly. For domestic transactions within India, prices are inclusive of mandatory 18% GST with formal GST tax invoices issued.</li>
                <li><strong className="text-slate-200">Payment Schedules:</strong> Standard engagements operate on a structured deposit (e.g. 50% Kickoff Deposit) with the remainder due upon staging sign-off and production release, or fast-track 100% full upfront payment.</li>
                <li><strong className="text-slate-200">Gateways:</strong> Digital transactions are processed securely via RBI and PCI-DSS compliant providers (Razorpay for UPI, NetBanking, Cards; Stripe for international wires).</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">04.</span> Quality Assurance &amp; Post-Launch Warranty
              </h2>
              <p>
                Every deployment undergoes rigorous quality assurance, automated unit/E2E test suites, security vulnerability scans, and performance audits. We include a standard 30 to 90-day post-launch warranty period to remediate any functional defects or regressions that deviate from the agreed technical specifications at zero extra cost.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">05.</span> Limitation of Liability &amp; Governing Law
              </h2>
              <p>
                To the maximum extent permitted by law, BRC STAR will not be liable for indirect, incidental, punitive, or consequential damages resulting from third-party hosting outages, DNS propagation delays, or external API modifications (e.g. third-party gateway changes).
              </p>
              <p>
                These terms are governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in India.
              </p>
            </section>
          </div>

          {/* Bottom Legal Navigation Bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3 text-slate-400">
              <span className="text-slate-500 font-mono uppercase text-[11px]">Related Legal:</span>
              <Link href="/privacy-policy" className="hover:text-blue-400 text-slate-300 underline underline-offset-4">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/disclaimer" className="hover:text-blue-400 text-slate-300 underline underline-offset-4">
                Disclaimer
              </Link>
              <span>•</span>
              <Link href="/cookies-policy" className="hover:text-blue-400 text-slate-300 underline underline-offset-4">
                Cookies Policy
              </Link>
            </div>

            <button
              onClick={() => setInquiryModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors cursor-pointer text-xs"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>

      <Footer onOpenInquiry={() => setInquiryModalOpen(true)} />

      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService="Website Development"
      />
    </div>
  );
}
