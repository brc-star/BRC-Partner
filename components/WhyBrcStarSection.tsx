'use client';

import React from 'react';
import {
  Code2,
  Cpu,
  Smartphone,
  Server,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface WhyBrcStarSectionProps {
  market?: 'india' | 'international';
  onOpenInquiry?: (initialService?: string) => void;
}

export function WhyBrcStarSection({ market = 'india', onOpenInquiry }: WhyBrcStarSectionProps) {
  const pillars = [
    {
      icon: Code2,
      title: 'Custom Development',
      badge: 'Zero Templates',
      description:
        market === 'international'
          ? '100% bespoke engineering. We write clean, modular, and maintainable TypeScript & React code tailored specifically to your product architecture and business logic.'
          : '100% bespoke development with zero generic themes. Clean, maintainable TypeScript and Next.js code tailored to your exact business requirements.',
      accent: 'blue',
    },
    {
      icon: Cpu,
      title: 'Modern Technology Stack',
      badge: 'Next.js 15 & AI',
      description:
        market === 'international'
          ? 'Engineered with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Cloud Run, and native AI integration via Gemini 2.5 and OpenAI SDKs.'
          : 'Powered by the latest Next.js 15 App Router, TypeScript, Tailwind CSS, PostgreSQL, and intelligent Gemini AI workflows for maximum performance.',
      accent: 'indigo',
    },
    {
      icon: Smartphone,
      title: 'Responsive Engineering',
      badge: 'Fluid Across Devices',
      description:
        market === 'international'
          ? 'Pixel-perfect fluid layouts designed for full viewport spectrums—from 4K displays and ultrawides to tablets and mobile touchscreens with 60fps animations.'
          : 'Mobile-first, ergonomic layouts tested across all screen resolutions to deliver flawless user experiences and high mobile conversion rates.',
      accent: 'cyan',
    },
    {
      icon: Server,
      title: 'Scalable Architecture',
      badge: 'Cloud-Native',
      description:
        market === 'international'
          ? 'Microservices, serverless compute, sharded relational databases, and multi-region edge caching built to seamlessly handle sudden traffic spikes.'
          : 'High-availability infrastructure with optimized database schemas, read replicas, and caching layers that grow effortlessly as your user base expands.',
      accent: 'emerald',
    },
    {
      icon: ShieldCheck,
      title: 'Security-Conscious Development',
      badge: 'OWASP Aligned',
      description:
        market === 'international'
          ? 'Strict adherence to OWASP Top 10 security standards, automated token rotation, encrypted secrets management, and role-based access control (RBAC).'
          : 'Enterprise-grade security best practices with automated vulnerability scanning, SSL encryption, rate limiting, and secure authentication flows.',
      accent: 'purple',
    },
    {
      icon: Headphones,
      title: 'Post-Launch Support',
      badge: 'Guaranteed SLA',
      description:
        market === 'international'
          ? 'Every project includes a 30 to 90-day post-launch warranty with dedicated bug-fix sprints, performance audits, and direct Slack Connect access.'
          : 'Comprehensive 30 to 90-day warranty coverage, milestone handovers, staff training, and proactive bug-fix support to ensure smooth launch operations.',
      accent: 'amber',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-[#060911] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================== */}
        {/* TRANSFERRED HERO SHOWCASE & TECHNOLOGY PARTNER HERO BANNER    */}
        {/* ============================================================== */}
        <div className="mb-20 space-y-12">
          {/* Transferred Hero Content Header */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Transferred Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider shadow-inner shadow-blue-500/10">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>BRC STAR • FULL-STACK DIGITAL TECHNOLOGY PARTNER</span>
            </div>

            {/* Transferred Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Build Digital Products That{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Move Your Business Forward.
              </span>
            </h2>

            {/* Transferred Descriptive Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              From high-performance websites and web applications to mobile apps, enterprise platforms, AI solutions and custom business systems — <strong className="font-semibold text-white">BRC STAR</strong> designs and develops technology around your real business needs.
            </p>

            {/* Transferred CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              {onOpenInquiry && (
                <button
                  onClick={() => onOpenInquiry('General Inquiry')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-size-200 hover:bg-right hover:shadow-xl hover:shadow-blue-600/30 text-white font-semibold text-base border border-blue-400/40 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              <a
                href="#solutions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <span>Explore Our Solutions</span>
              </a>
            </div>

            {/* Transferred Quick Value Props */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Full-Stack Engineering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Enterprise-Grade Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Dedicated Technical Support</span>
              </div>
            </div>
          </div>

          {/* Technology Partner Hero Banner Presentation Card (Clean White Background with Blue/Purple/Pink Accents) */}
          <div className="relative mx-auto max-w-[1774px] rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 shadow-2xl shadow-blue-950/40">
            <div className="relative w-full aspect-[1774/887] max-h-[887px] bg-[#FFFFFF] rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] overflow-hidden flex items-center justify-center">
              <img
                src="/images/brc-star-technology-partner-hero-banner.jpg"
                alt="BRC STAR Technology Partner Hero Banner - Multi-device responsive software engineering showcase across laptop, tablet, and mobile"
                loading="lazy"
                decoding="async"
                className="block w-full h-full object-contain object-center"
              />
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* EXISTING ABOUT / WHY BRC STAR SECTION HEADER & PILLARS GRID   */}
        {/* ============================================================== */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Why Partner with BRC STAR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Rigor Built into Every Sprint
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {market === 'international'
              ? 'We operate as your dedicated product engineering studio—combining senior architectural talent, transparent milestone delivery, and zero vendor lock-in.'
              : 'We build digital products designed for business growth. No cookie-cutter templates, no recurring per-seat platform taxes, and 100% intellectual property ownership.'}
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group p-6 sm:p-7 rounded-2xl bg-[#0b1122] border border-slate-800 hover:border-slate-700 hover:bg-[#0d1428] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-blue-950/70 border border-blue-800/50 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Standard on all engineering plans</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
