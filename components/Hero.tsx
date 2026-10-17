'use client';

import React from 'react';
import {
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface HeroProps {
  onOpenInquiry: (serviceName?: string) => void;
  onOpenClaimProof?: (claimId: string) => void;
}

export function Hero({ onOpenInquiry }: HeroProps) {
  const defaultWhatsAppUrl = getWhatsAppUrl({
    industry: 'Business Consultation',
    requirement: 'Website / E-commerce / Custom Software / AI Automation',
  });

  return (
    <section
      id="hero-section"
      className="relative pt-[76px] pb-12 sm:pb-16 overflow-hidden bg-transparent"
      aria-labelledby="hero-headline"
    >
      {/* 1. Value Proposition, Approved Headline & Primary Conversion Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-700/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider shadow-inner font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span>BRC STAR PARTNER • FULL-STACK DIGITAL TECHNOLOGY</span>
          </div>

          {/* Primary Main H1 Headline (1st Headline - Clean 2-Line Format) */}
          <h1
            id="hero-headline"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18] max-w-5xl mx-auto"
          >
            <span className="block">
              Build Your Digital Presence.
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent mt-1">
              Accelerate Your Business.
            </span>
          </h1>

          {/* Supporting 2nd Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 tracking-tight max-w-3xl mx-auto">
            Turn Your Business Into a Stronger Digital Brand.
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From professional business websites to e-commerce platforms, custom software and AI automation, we help businesses build the digital tools they need to grow.
          </p>

          {/* Dual CTAs (Mobile-First) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto sm:max-w-none">
            {/* Primary Action Button */}
            <button
              id="hero-primary-cta"
              type="button"
              onClick={() => onOpenInquiry('Website & Digital Growth Consultation')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <span>Get a Free Project Consultation →</span>
            </button>

            {/* Secondary Action Button */}
            <a
              id="hero-secondary-cta"
              href="#portfolio-section"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold text-sm sm:text-base border border-slate-300 dark:border-slate-700/80 transition-all duration-200"
            >
              <span>Explore Our Work</span>
            </a>
          </div>

          {/* Direct WhatsApp Supporting Contact Text */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <span>Have a project in mind?</span>
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Chat with us on WhatsApp</span>
              <span className="text-slate-500 font-normal text-xs">(+91 99131 59932)</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Hero Visual: Representative Lightweight Showcase of Real Designs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800/90 p-2 sm:p-4 shadow-xl dark:shadow-2xl overflow-hidden">
          <div className="relative w-full aspect-[1774/887] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900">
            <img
              src="/images/brc-star-technology-partner-hero-banner.jpg"
              alt="BRC STAR Partner - Multi-device responsive website, e-commerce, and software engineering showcase"
              fetchPriority="high"
              decoding="async"
              className="block w-full h-full object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
