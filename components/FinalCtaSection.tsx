'use client';

import React from 'react';
import { ArrowRight, MessageCircle, CheckCircle2, ShieldCheck, Mail, Phone } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface FinalCtaSectionProps {
  onOpenInquiry: () => void;
}

export function FinalCtaSection({ onOpenInquiry }: FinalCtaSectionProps) {
  const whatsAppUrl = getWhatsAppUrl({
    industry: 'Website & Digital Growth',
    requirement: 'Ready to build high-performance business website / custom software',
  });

  return (
    <section
      id="final-conversion"
      className="py-20 sm:py-24 bg-[#f8fafc] dark:bg-[#060911] relative overflow-hidden transition-colors border-t border-slate-200 dark:border-slate-800/80"
      aria-labelledby="cta-headline"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#0c1324] dark:to-[#070b14] border border-slate-200 dark:border-blue-500/30 p-8 sm:p-14 shadow-xl dark:shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle Top Gradient Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider shadow-inner font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>Ready for the Next Step?</span>
          </div>

          {/* Approved Conversion Headline & Subhead */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2
              id="cta-headline"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
            >
              Ready to Take Your Business Online?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Whether you need a high-converting website for your local clinic or store, a B2B showroom for your textile mill, or a custom SaaS platform — let&apos;s build technology that delivers real business growth.
            </p>
          </div>

          {/* Dual CTAs (Project Consultation + Direct WhatsApp) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <span>Get a Free Project Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Chat on WhatsApp (+91 99131 59932)</span>
            </a>
          </div>

          {/* Direct Email fallback */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Mail className="w-3.5 h-3.5 text-blue-500" />
            <span>Prefer email? Send your project RFP to</span>
            <a href="mailto:contact@brcstar.in" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              contact@brcstar.in
            </a>
          </div>

          {/* Reassurance points */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Direct Senior Architect Discovery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>100% Code &amp; IP Ownership</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Fast 24h Project Turnaround</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
