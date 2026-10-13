'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import {
  Building2,
  ChevronLeft,
  ShieldCheck,
  Code2,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  Award,
  Users,
} from 'lucide-react';
import { SITE } from '@/lib/site-config';

export default function AboutPage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#060911] dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col transition-colors duration-200">
      <Navbar onOpenInquiry={() => setInquiryModalOpen(true)} />

      <main className="flex-grow pt-28 sm:pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-blue-600 dark:text-blue-400">About Us</span>
          </div>

          {/* Hero Section */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Engineering Leadership &amp; Company Ethos</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              We Engineer Digital Products That Move Businesses <span className="text-blue-600 dark:text-blue-400">Forward</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              BRC STAR is an independent digital software engineering practice founded with one conviction: technical capability should be demonstrated through type-safe, auditable code—never ungrounded marketing promises.
            </p>
          </div>

          {/* Technology Showcase Banner */}
          <div className="relative mx-auto max-w-[1774px] rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 shadow-xl shadow-slate-200/80 dark:shadow-2xl dark:shadow-blue-950/40">
            <div className="relative w-full aspect-[1774/887] max-h-[887px] bg-[#FFFFFF] rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] overflow-hidden flex items-center justify-center">
              <img
                src="/images/brc-star-technology-partner-hero-banner.jpg"
                alt="BRC STAR Technology Partner Multi-Device Showcase"
                loading="lazy"
                decoding="async"
                className="block w-full h-full object-contain object-center"
              />
            </div>
          </div>

          {/* Company Story & Founder Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Origin &amp; Mission</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Bridging the Gap Between Fragmented Agencies and Rigid Software
              </h2>
              <p>
                Too many Indian enterprises and growth-stage founders are caught between two extremes: generic freelancers who leave behind brittle code, and bloated agencies charging enterprise retainers for template websites.
              </p>
              <p>
                <strong>{SITE.legalName}</strong> was incorporated to offer a senior-only engineering alternative. We deliver end-to-end web applications, mobile platforms, enterprise SaaS portals, and AI copilots engineered with modern Next.js 15, TypeScript, and microservice architectures.
              </p>
              <p>
                Every engagement operates on transparent milestone sprints with bi-weekly staging reviews, zero proprietary lock-in, and 100% intellectual property ownership transferred on delivery.
              </p>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white keep-white font-black text-2xl shadow-lg shadow-blue-600/30">
                  BS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Engineering Leadership</h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">Senior Full-Stack Architecture Leads</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400">Registered Entity:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{SITE.legalName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400">Corporate Identity (CIN):</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{SITE.cin}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400">GST Registration:</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{SITE.gstin}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">Headquarters:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    Ahmedabad, Gujarat, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Core Pillars */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Our Engineering Core Values
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Four unyielding technical standards that protect your software investment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">100% IP Ownership</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every line of source code, Figma design file, and environment configuration is transferred completely to your repositories.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">OWASP-Aligned Security</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Strict input sanitation, server-side secrets isolation, role-based access control, and encrypted TLS in transit.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Claim → Proof Auditing</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  We don&apos;t ask you to trust claims. We audit performance against real PageSpeed telemetry, type compilation, and production builds.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Transparent Milestones</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Bi-weekly staging demos with structured milestone disbursements through Razorpay escrow and scheduled reviews.
                </p>
              </div>
            </div>
          </div>

          {/* Conversion CTA Block */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 border border-slate-200 dark:border-transparent text-slate-900 dark:text-white shadow-xl dark:shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Ready to Build With a Dedicated Partner?
              </h2>
              <p className="text-slate-600 dark:text-blue-100 text-sm">
                Discuss your product architecture with our engineering leads. Receive a structured technical scope and milestone SOW.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setInquiryModalOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 dark:bg-white dark:text-blue-600 dark:hover:bg-slate-100 font-bold text-sm shadow-lg shadow-blue-600/25 dark:shadow-lg transition-colors shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Schedule Technical Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
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
