'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Tag,
  Globe,
  ShoppingCart,
  Smartphone,
  Bot,
  Server,
  Wrench,
  Info,
} from 'lucide-react';
import { PricingPlan, PricingMarket } from '@/types/payment';
import {
  getCorePricingPlans,
  getAmcPlans,
  PROMO_COUPONS,
} from '@/lib/pricing-data';

interface PricingCardsSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onRequestQuote: (serviceName?: string, market?: PricingMarket) => void;
  market?: PricingMarket;
  onMarketChange?: (market: PricingMarket) => void;
}

export function PricingCardsSection({
  onSelectPlan,
  onRequestQuote,
  market: controlledMarket,
  onMarketChange,
}: PricingCardsSectionProps) {
  const [internalMarket, setInternalMarket] = useState<PricingMarket>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('brc_pricing_market') as PricingMarket;
      if (saved === 'india' || saved === 'international') {
        return saved;
      }
    }
    return 'india';
  });
  const [activeTab, setActiveTab] = useState<'core' | 'amc'>('core');
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  // Sync market with session storage and parent if controlled
  const currentMarket: PricingMarket = controlledMarket || internalMarket;

  const handleMarketSelect = (m: PricingMarket) => {
    setInternalMarket(m);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('brc_pricing_market', m);
    }
    if (onMarketChange) {
      onMarketChange(m);
    }
  };

  const handleCopyCoupon = (code: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedCoupon(code);
      setTimeout(() => setCopiedCoupon(null), 2500);
    }
  };

  const currentCorePlans = getCorePricingPlans(currentMarket);
  const currentAmcPlans = getAmcPlans(currentMarket);

  const getPlanIcon = (category: string) => {
    switch (category) {
      case 'Website':
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 'E-Commerce':
        return <ShoppingCart className="w-5 h-5 text-emerald-400" />;
      case 'Mobile App':
        return <Smartphone className="w-5 h-5 text-purple-400" />;
      case 'AI & Automation':
        return <Bot className="w-5 h-5 text-amber-400" />;
      case 'Custom Enterprise':
        return <Server className="w-5 h-5 text-indigo-400" />;
      case 'Maintenance & AMC':
        return <Wrench className="w-5 h-5 text-cyan-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  const formatPrice = (price: number, currency: 'INR' | 'USD') => {
    if (currency === 'INR') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return `$${price.toLocaleString('en-US')}`;
  };

  return (
    <section id="pricing-plans-section" className="py-16 sm:py-20 bg-[#060911] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Market Switcher Banner */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
            <span>Select Your Target Region &amp; Currency</span>
          </div>

          {/* Market Selector Tabs */}
          <div
            id="pricing-market-switcher"
            className="p-1.5 rounded-2xl bg-[#0b1122] border border-slate-700/80 shadow-2xl inline-flex items-center gap-2 max-w-full overflow-x-auto"
          >
            <button
              type="button"
              id="market-switch-india"
              onClick={() => handleMarketSelect('india')}
              className={`px-5 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center gap-2.5 cursor-pointer shrink-0 ${
                currentMarket === 'india'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/40 border border-blue-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="text-base sm:text-lg">🇮🇳</span>
              <span>India Market (INR ₹)</span>
              {currentMarket === 'india' && (
                <span className="text-[10px] bg-blue-950/80 text-blue-200 px-2 py-0.5 rounded-md font-mono hidden sm:inline-block">
                  Active
                </span>
              )}
            </button>

            <button
              type="button"
              id="market-switch-international"
              onClick={() => handleMarketSelect('international')}
              className={`px-5 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center gap-2.5 cursor-pointer shrink-0 ${
                currentMarket === 'international'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/40 border border-blue-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="text-base sm:text-lg">🇺🇸</span>
              <span>USA &amp; International (USD $)</span>
              {currentMarket === 'international' && (
                <span className="text-[10px] bg-blue-950/80 text-blue-200 px-2 py-0.5 rounded-md font-mono hidden sm:inline-block">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Market Positioning Context Tagline */}
          <div className="max-w-2xl text-xs sm:text-sm text-slate-400 pt-1">
            {currentMarket === 'india' ? (
              <p>
                Targeted engineering packages for <strong className="text-slate-200">Startups, Small Businesses, Growing Brands &amp; Indian Enterprises</strong> with transparent milestone billing &amp; GST invoices.
              </p>
            ) : (
              <p>
                Professional product engineering, custom cloud architecture &amp; dedicated sprint teams for <strong className="text-slate-200">US &amp; Global Enterprises, Tech Ventures &amp; Scale-ups</strong>.
              </p>
            )}
          </div>
        </div>

        {/* Promo Coupons Banner */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-[#0c1427] border border-blue-800/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Verified Partner Promo Codes
                </span>
                <p className="text-xs text-slate-300">
                  Click to copy promotional vouchers for milestone discounts.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {PROMO_COUPONS.map((cpn) => (
                <button
                  key={cpn.code}
                  type="button"
                  onClick={() => handleCopyCoupon(cpn.code)}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-blue-500 text-xs font-mono text-slate-200 hover:text-white transition-all cursor-pointer"
                  title={cpn.description}
                >
                  <span className="font-bold text-blue-400 group-hover:text-blue-300">{cpn.code}</span>
                  <span className="text-[10px] text-slate-400">
                    ({cpn.discountType === 'PERCENTAGE' ? `${cpn.discountValue}% OFF` : `₹${cpn.discountValue} OFF`})
                  </span>
                  {copiedCoupon === cpn.code && (
                    <span className="text-[10px] text-emerald-400 font-semibold animate-in fade-in">✓ Copied</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Switcher: Core Solutions vs. Recurring AMC */}
        <div className="flex justify-center mb-10">
          <div className="p-1.5 rounded-2xl bg-[#0b1122] border border-slate-800 inline-flex items-center gap-2 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('core')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'core'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Core Project Engagements (5 Plans)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('amc')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'amc'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Recurring Maintenance &amp; AMC</span>
            </button>
          </div>
        </div>

        {/* Core Solutions Grid (5 Cards) */}
        {activeTab === 'core' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentCorePlans.map((plan) => (
              <div
                key={plan.id}
                id={`plan-card-${plan.id}`}
                className={`rounded-2xl bg-[#0c1324] border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'border-blue-500 shadow-2xl shadow-blue-950/70 lg:scale-[1.02] ring-1 ring-blue-500/50'
                    : 'border-slate-800 hover:border-slate-700 hover:bg-[#0e162a]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                    Recommended / Most Popular
                  </div>
                )}

                <div className="space-y-5">
                  {/* Category & Duration */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getPlanIcon(plan.category)}
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          {plan.category}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {plan.typicalDuration}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-white tracking-tight">{plan.name}</h3>
                    <p className="text-xs text-blue-400 font-medium mt-1 leading-snug">{plan.tagline}</p>
                  </div>

                  {/* Starting Price Box */}
                  <div className="p-4 rounded-xl bg-[#070c17] border border-slate-800/90 space-y-1.5">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Starting from
                      </span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                        {formatPrice(plan.startingPrice, plan.currency)}
                      </span>
                      <span className="text-xs font-bold text-blue-400 font-mono">+</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Milestone-based sprints • <strong className="text-slate-200">{plan.depositPercentage}% kickoff deposit</strong> on SOW signing.
                    </p>
                  </div>

                  {/* Target Audience & Positioning */}
                  <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/40 text-[11px] text-slate-300 leading-relaxed">
                    <span className="text-blue-300 font-semibold block mb-0.5">Target Scope:</span>
                    {plan.targetAudience}
                  </div>

                  {/* Estimated Scope */}
                  <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800/70 leading-relaxed">
                    <span className="text-slate-400 font-semibold block mb-0.5">Delivery Scope:</span>
                    {plan.estimatedScope}
                  </div>

                  {/* Core Deliverables */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block font-mono">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {plan.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Included Architecture */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block font-mono">
                      Included Tech Architecture:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.includedArchitecture.map((arch, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                        >
                          {arch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-6 border-t border-slate-800/80 mt-6 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>Get Started ({formatPrice(plan.startingPrice, plan.currency)}+)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestQuote(plan.name, plan.market)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-900/80 border border-slate-800 transition-colors cursor-pointer"
                  >
                    Request Custom Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Recurring AMC Grid (3 Cards) */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentAmcPlans.map((plan) => (
              <div
                key={plan.id}
                id={`amc-card-${plan.id}`}
                className={`rounded-2xl bg-[#0c1324] border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'border-blue-500 shadow-2xl shadow-blue-950/70 ring-1 ring-blue-500/50'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                    Recommended SLA Retainer
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getPlanIcon(plan.category)}
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          Monthly Retainer
                        </span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                        {plan.typicalDuration}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-white tracking-tight">{plan.name}</h3>
                    <p className="text-xs text-blue-400 font-medium mt-1">{plan.tagline}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#070c17] border border-slate-800/90 space-y-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                        {formatPrice(plan.startingPrice, plan.currency)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ month</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Cancel anytime with 30-day notice • 5-day grace period on renewals.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-[11px] text-slate-300 leading-relaxed">
                    <span className="text-emerald-300 font-semibold block mb-0.5">Designed For:</span>
                    {plan.targetAudience}
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block font-mono">
                      Included SLA &amp; Support:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {plan.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block font-mono">
                      Tooling Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.includedArchitecture.map((arch, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                        >
                          {arch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 mt-6 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan)}
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <span>Activate Retainer ({formatPrice(plan.startingPrice, plan.currency)}/mo)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestQuote(plan.name, plan.market)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-900/80 border border-slate-800 transition-colors cursor-pointer"
                  >
                    Discuss SLA Requirements
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mandatory Explicit Pricing Scope Footnote */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-[#090e1b] border border-blue-900/50 flex items-start gap-3.5 text-xs text-slate-300 shadow-md">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">
              Important Estimation Notice &amp; Scope Policy
            </span>
            <p className="leading-relaxed text-slate-300">
              All prices listed above are baseline <strong className="text-white">“Starting from”</strong> benchmarks for foundational deliverables and standard MVP velocity. Final pricing depends on project scope, custom features, third-party integrations, design complexity, technology requirements, timeline velocity, and deployment requirements. Following initial technical discovery, you will receive an itemized, fixed-price SOW.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
