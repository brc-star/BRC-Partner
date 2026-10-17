'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  Lock,
  Globe,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function HomepagePricingPreview() {
  const basicPlanInclusions = [
    'Up to 5 custom responsive pages',
    'Mobile-first responsive design',
    'Modern high-converting UI/UX',
    'Contact & enquiry forms',
    'Direct WhatsApp lead capture integration',
    'Technical SEO setup & XML sitemaps',
    'Google Maps & business profile linking',
    'SSL & HTTPS security configuration',
    'Speed & Core Web Vitals optimization',
    '30 days post-launch support included',
  ];

  const gstStatement = 'Pricing is subject to applicable taxes (18% GST). Transparent milestone invoicing with zero hidden charges.';

  const pricingWhatsAppUrl = getWhatsAppUrl({
    industry: 'Basic Website Package (₹29,999)',
    requirement: 'Check My Website Requirements for Basic Website Package (₹29,999)',
  });

  return (
    <section
      id="pricing-preview"
      className="py-20 sm:py-24 bg-[#060911] relative overflow-hidden border-t border-slate-800/80"
      aria-labelledby="pricing-preview-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Clear Starting Prices</span>
          </div>

          <h2
            id="pricing-preview-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Clear Starting Prices
          </h2>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            Transparent milestone pricing with no recurring template lock-in and complete source code ownership.
          </p>
        </div>

        {/* Featured Price Card: Basic Website Package (₹29,999) */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-blue-500/40 p-6 sm:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Package Info & Price */}
            <div className="lg:col-span-5 space-y-5 text-left border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-8">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Featured Starting Package
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Basic Website Package
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                A professional website foundation for businesses ready to establish their online presence.
              </p>

              <div className="pt-2">
                <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block">
                  Starting Investment
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                    ₹29,999
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    one-time
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={pricingWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Check My Website Requirements →</span>
                </a>

                <Link
                  href="/pricing"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View All Packages &amp; Add-ons</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Typical Delivery: 1 to 2 Weeks</span>
              </div>
            </div>

            {/* Right: Inclusions & Terms */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono block">
                What&apos;s Included in This Package:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {basicPlanInclusions.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              {/* GST and Transparency Notice */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#070d18] border border-slate-200 dark:border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>GST &amp; Milestone Terms</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {gstStatement} Work commences with 50% deposit and 50% upon completed staging approval before deployment.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Full Code Ownership</span>
                </span>
                <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Zero Monthly Host Lock-In</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
