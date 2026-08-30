'use client';

import React, { useState } from 'react';
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
  Layers,
  Wrench,
  Info,
  Clock,
  Check,
  ChevronRight,
  Headphones,
} from 'lucide-react';
import { PricingPlan, PricingMarket } from '@/types/payment';
import {
  PRICING_CATEGORIES,
  PricingCategory,
  DUAL_MARKET_CORE_PLANS,
  DUAL_MARKET_AMC_PLANS,
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

  const [selectedCategory, setSelectedCategory] = useState<PricingCategory>('Web Development');
  const [viewType, setViewType] = useState<'categories' | 'amc'>('categories');
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

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

  const formatPrice = (price: number, isPlus?: boolean) => {
    const formatted = `₹${price.toLocaleString('en-IN')}`;
    return isPlus ? `${formatted}+` : formatted;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development':
        return <Globe className="w-4 h-4" />;
      case 'E-Commerce':
        return <ShoppingCart className="w-4 h-4" />;
      case 'Mobile App':
        return <Smartphone className="w-4 h-4" />;
      case 'AI & Automation':
        return <Bot className="w-4 h-4" />;
      case 'SaaS / Web Application':
        return <Layers className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  // Filter plans based on selected category (India market)
  const categoryPlans = DUAL_MARKET_CORE_PLANS.india.filter(
    (p) => p.category === selectedCategory
  );

  const amcPlans = DUAL_MARKET_AMC_PLANS.india;

  const handleCtaClick = (plan: PricingPlan) => {
    const cta = plan.ctaLabel || 'Get Started';
    if (cta === 'Get Started') {
      onSelectPlan(plan);
    } else {
      onRequestQuote(`${selectedCategory} - ${plan.name} Plan`, currentMarket);
    }
  };

  return (
    <section id="pricing-plans-section" className="py-16 sm:py-20 bg-[#060911] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Market Switcher & Top Header */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>5 Core Engineering Categories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Transparent Pricing Models
          </h2>

          {/* GST Inclusivity Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">All prices are inclusive of 18% GST</span>
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
                  Click to copy promotional discount vouchers for milestone deductions.
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

        {/* View Mode Switcher: 5 Service Categories vs Recurring AMC */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-2xl bg-[#0b1122] border border-slate-800 inline-flex items-center gap-1 shadow-inner">
            <button
              type="button"
              onClick={() => setViewType('categories')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewType === 'categories'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>5 Core Service Categories</span>
            </button>

            <button
              type="button"
              onClick={() => setViewType('amc')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewType === 'amc'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Maintenance &amp; AMC Retainers</span>
            </button>
          </div>
        </div>

        {viewType === 'categories' ? (
          <div>
            {/* 5 Category Navigation Tabs */}
            <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
              <div
                id="service-category-tabs"
                className="p-1.5 rounded-2xl bg-[#0a101e] border border-slate-800 shadow-xl inline-flex items-center gap-1.5 max-w-full"
              >
                {PRICING_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <span className={isSelected ? 'text-white' : 'text-slate-400'}>
                        {getCategoryIcon(cat)}
                      </span>
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Header Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  {getCategoryIcon(selectedCategory)}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">{selectedCategory} Plans</h3>
                  <p className="text-xs text-slate-400">
                    4 structured development tiers from foundational MVPs to high-scale enterprise architecture
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>18% GST Included in all tiers</span>
              </div>
            </div>

            {/* 4 Pricing Cards Grid for Selected Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryPlans.map((plan) => {
                const isPopular = plan.popular;
                const ctaLabel = plan.ctaLabel || 'Get Started';

                return (
                  <div
                    key={plan.id}
                    id={`plan-card-${plan.id}`}
                    className={`rounded-2xl bg-[#0c1324] border flex flex-col justify-between transition-all duration-300 relative ${
                      isPopular
                        ? 'border-blue-500 shadow-2xl shadow-blue-950/70 lg:-translate-y-1.5 ring-1 ring-blue-500/50 bg-gradient-to-b from-[#0f1a33] to-[#0c1324]'
                        : 'border-slate-800 hover:border-slate-700 hover:bg-[#0e162a]'
                    }`}
                  >
                    {/* MOST POPULAR Badge */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white text-[10px] font-black uppercase tracking-wider shadow-lg shadow-blue-600/40 border border-blue-300/40 whitespace-nowrap">
                        {plan.badgeText || 'MOST POPULAR'}
                      </div>
                    )}

                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Plan Name & Tagline */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xl font-extrabold text-white tracking-tight">{plan.name}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300">
                            {plan.typicalDuration}
                          </span>
                        </div>
                        <p className="text-xs text-blue-400 font-medium leading-snug">{plan.tagline}</p>
                      </div>

                      {/* Starting Price Box */}
                      <div className="p-3.5 rounded-xl bg-[#070c17] border border-slate-800/90 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                          Starting from
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                            {formatPrice(plan.startingPrice, plan.isStartingFromPlus)}
                          </span>
                        </div>
                        <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 pt-0.5">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>Includes 18% GST</span>
                        </p>
                      </div>

                      {/* Best For Section */}
                      <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-900/40 text-[11px] text-slate-300 leading-relaxed">
                        <span className="text-blue-300 font-semibold block text-[10px] uppercase font-mono mb-0.5">
                          Best for:
                        </span>
                        <span>{plan.bestFor || plan.targetAudience}</span>
                      </div>

                      {/* Features List */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                          Included Features ({plan.features.length}):
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                              <span className="leading-snug text-[11px] sm:text-xs text-slate-200">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Support Duration & Primary CTA */}
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/80 mt-4 space-y-3">
                      {/* Support Duration Footer Note */}
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/70">
                        <Headphones className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Support: <strong>{plan.supportDuration || '30 days support'}</strong></span>
                      </div>

                      {/* Primary CTA Button */}
                      <button
                        type="button"
                        onClick={() => handleCtaClick(plan)}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isPopular
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50'
                            : ctaLabel === 'Talk to an Expert'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md'
                            : ctaLabel === 'Get a Quote'
                            ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                      >
                        <span>{ctaLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Recurring AMC Grid (3 Cards) */
          <div>
            <div className="text-center mb-8 space-y-2">
              <h3 className="text-2xl font-extrabold text-white">Maintenance, Cloud &amp; Dedicated Retainers</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
                Guaranteed SLAs, 24/7 uptime monitoring, security patching, and fractional senior engineering teams on demand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {amcPlans.map((plan) => {
                const isPopular = plan.popular;
                return (
                  <div
                    key={plan.id}
                    id={`amc-card-${plan.id}`}
                    className={`rounded-2xl bg-[#0c1324] border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                      isPopular
                        ? 'border-blue-500 shadow-2xl shadow-blue-950/70 ring-1 ring-blue-500/50 bg-gradient-to-b from-[#0f1a33] to-[#0c1324]'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                        Recommended Retainer
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                            Monthly Retainer
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                            {plan.typicalDuration}
                          </span>
                        </div>
                        <h4 className="text-xl font-extrabold text-white tracking-tight">{plan.name}</h4>
                        <p className="text-xs text-blue-400 font-medium mt-0.5">{plan.tagline}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#070c17] border border-slate-800/90 space-y-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                            ₹{plan.startingPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">/ month</span>
                        </div>
                        <p className="text-[10px] text-emerald-400 font-mono">
                          Inclusive of 18% GST • Cancel anytime with 30-day notice
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-[11px] text-slate-300 leading-relaxed">
                        <span className="text-emerald-300 font-semibold block mb-0.5 text-[10px] uppercase font-mono">
                          Best For:
                        </span>
                        {plan.bestFor || plan.targetAudience}
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                          Included SLA &amp; Support:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {plan.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug text-[11px] text-slate-200">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800/80 mt-6 space-y-2.5">
                      <button
                        type="button"
                        onClick={() => onSelectPlan(plan)}
                        className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                      >
                        <span>Activate Retainer (₹{plan.startingPrice.toLocaleString('en-IN')}/mo)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onRequestQuote(plan.name, currentMarket)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-900/80 border border-slate-800 transition-colors cursor-pointer"
                      >
                        Discuss SLA Scope
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mandatory Explicit Pricing Scope Footnote & Disclaimers */}
        <div className="mt-12 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1b] border border-blue-900/50 flex items-start gap-3.5 text-xs text-slate-300 shadow-md">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span className="font-bold text-white uppercase tracking-wider font-mono text-[11px] block">
                All prices are inclusive of 18% GST
              </span>
              <p className="leading-relaxed text-slate-300">
                Final pricing depends on project scope, complexity, integrations, technology requirements, content, third-party services and deployment requirements.
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-800/60">
                All customer-facing figures represent starting investment benchmarks for standard sprint deliverables. Following technical discovery and requirements alignment, you will receive an itemized commercial Statement of Work (SOW).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
