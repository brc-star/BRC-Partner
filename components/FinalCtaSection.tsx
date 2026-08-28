'use client';

import React from 'react';
import { ArrowRight, Sparkles, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenInquiry: () => void;
}

export function FinalCtaSection({ onOpenInquiry }: FinalCtaSectionProps) {
  return (
    <section
      id="final-conversion"
      className="py-24 bg-[#060911] relative overflow-hidden"
      aria-labelledby="cta-headline"
    >
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-gradient-to-b from-[#0e162a] to-[#090f1d] border border-blue-500/30 p-8 sm:p-14 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle top geometric line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-700/50 text-blue-300 text-xs font-semibold uppercase tracking-wider shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ready for the Next Step?</span>
          </div>

          {/* Headline & Subhead */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2
              id="cta-headline"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Have a Business Challenge or Digital Product in Mind?
            </h2>
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              Let&apos;s turn your requirement into a scalable digital solution. Partner with an engineering team that builds with precision, speed, and business clarity.
            </p>
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenInquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-size-200 hover:bg-right text-white font-bold text-base shadow-xl shadow-blue-600/30 border border-blue-400/40 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="mailto:contact@brcstar.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>Talk to BRC STAR</span>
            </a>
          </div>

          {/* Reassurance points */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Direct Senior Architect Discovery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Strict Mutual NDA Safeguards</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>24h Response Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
