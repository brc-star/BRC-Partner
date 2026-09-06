'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { AlertTriangle, ShieldCheck, CheckCircle2, ChevronLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { BRC_STAR_INFO } from '@/lib/data';

export default function DisclaimerPage() {
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
            <span className="text-blue-400">Disclaimer</span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-slate-800/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <AlertTriangle className="w-3.5 h-3.5 text-blue-400" />
              <span>Legal Notice &amp; Clarifications</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Website &amp; Engineering Disclaimer
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              The information and technical capabilities presented on <span className="text-blue-400 font-mono">https://brcpartner.brcstar.in</span> are published in good faith for general informational, proposal estimation, and technological assessment purposes.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <span>Effective Date: September 1, 2026</span>
              <span>•</span>
              <span>Version: 2026.1</span>
            </div>
          </div>

          {/* Disclaimer Content Sections */}
          <div className="space-y-10 text-sm leading-relaxed text-slate-300">
            {/* Section 1 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">01.</span> Technical Accuracy &amp; Project Estimates
              </h2>
              <p>
                While BRC STAR endeavors to keep all pricing matrices, tech stack benchmarks, and delivery estimates accurate and up-to-date, software development scopes depend heavily on specific client architecture, third-party API dependencies, database volumes, and custom feature sets.
              </p>
              <p>
                Online calculators and starter pricing tiers represent baseline minimum starting scope benchmarks. Formal binding timelines and milestone commitments are confirmed in a formal Statement of Work (SOW) signed by both parties.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">02.</span> Third-Party Services &amp; Infrastructure
              </h2>
              <p>
                Our solutions frequently integrate third-party infrastructure providers including AWS, Google Cloud, Vercel, Supabase, Cloudflare, Razorpay, and Stripe. BRC STAR is not responsible for outages, rate limit modifications, pricing revisions, or terms updates enforced by these independent third-party platforms.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">03.</span> External Links
              </h2>
              <p>
                Our platform may contain links to external websites and repositories for informational or reference purposes. We do not control or endorse the privacy practices or operational content of external websites.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">04.</span> Professional Engineering Advice
              </h2>
              <p>
                Content on this website does not constitute formal legal, regulatory, or certified financial advice. Clients are encouraged to perform their own due diligence regarding specific domain regulations (such as medical data standards, fintech licensing, or regional tax obligations).
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
              <Link href="/terms-and-conditions" className="hover:text-blue-400 text-slate-300 underline underline-offset-4">
                Terms &amp; Conditions
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
