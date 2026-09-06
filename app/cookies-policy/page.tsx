'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { Cookie, ShieldCheck, CheckCircle2, ChevronLeft, ArrowRight, Settings } from 'lucide-react';
import { BRC_STAR_INFO } from '@/lib/data';

export default function CookiesPolicyPage() {
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
            <span className="text-blue-400">Cookies Policy</span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-slate-800/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <Cookie className="w-3.5 h-3.5 text-blue-400" />
              <span>Cookie Usage &amp; Preferences</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Cookies Policy
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              This Cookies Policy explains how BRC STAR uses cookies and similar tracking technologies when you visit <span className="text-blue-400 font-mono">https://brcpartner.brcstar.in</span>. We believe in minimal, privacy-respecting telemetry designed solely to improve site performance and checkout stability.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <span>Effective Date: September 1, 2026</span>
              <span>•</span>
              <span>Version: 2026.1</span>
              <span>•</span>
              <span className="text-emerald-400">Zero Invasive Ad-Trackers</span>
            </div>
          </div>

          {/* Cookie Content Sections */}
          <div className="space-y-10 text-sm leading-relaxed text-slate-300">
            {/* Section 1 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">01.</span> What Are Cookies?
              </h2>
              <p>
                Cookies are small text files placed on your device by your web browser when you visit a website. They allow the platform to remember your market preference (e.g. INR vs. USD pricing views), session state during secure checkouts, and ensure smooth navigation without repeated logins.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">02.</span> Categories of Cookies We Use
              </h2>
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-[#060a14] border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white text-xs">Strictly Essential Cookies</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">Always Active</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Required for core security, payment tokenization with Razorpay/Stripe, CSRF protection, and load balancing across our Cloud Run clusters.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#060a14] border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white text-xs">Functional &amp; Preference Cookies</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/50">User Controlled</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Remembers your pricing market selection (India / Global), active tab filters, and currency formatting preferences across visits.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#060a14] border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white text-xs">Performance &amp; Speed Telemetry</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/50">Anonymized</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Measures page render velocity, Core Web Vitals (LCP, CLS, FID), and API endpoint latency to help our DevOps engineers optimize server responsiveness.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">03.</span> How to Manage Cookies
              </h2>
              <p>
                Most modern browsers allow you to manage or disable cookie preferences via their settings menu. Please note that disabling essential cookies may impact checkout session security or form state persistence.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs pt-1 font-mono">
                <li>Google Chrome: Settings → Privacy and Security → Cookies and other site data</li>
                <li>Mozilla Firefox: Settings → Privacy &amp; Security → Cookies and Site Data</li>
                <li>Apple Safari: Preferences → Privacy → Block all cookies</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">04.</span> Policy Inquiries
              </h2>
              <p>
                If you have questions regarding our cookie management practices, contact us at <a href={`mailto:${BRC_STAR_INFO.contactEmail}`} className="text-blue-400 hover:underline">{BRC_STAR_INFO.contactEmail}</a>.
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
              <Link href="/disclaimer" className="hover:text-blue-400 text-slate-300 underline underline-offset-4">
                Disclaimer
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
