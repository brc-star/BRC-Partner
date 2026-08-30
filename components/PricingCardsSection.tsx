'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  Tag,
  HelpCircle,
  Smartphone,
  Globe,
  Bot,
  ShoppingCart,
  Server,
  Wrench,
} from 'lucide-react';
import { PricingPlan } from '@/types/payment';
import { CORE_PRICING_PLANS, RECURRING_AMC_PLANS, PROMO_COUPONS } from '@/lib/pricing-data';

interface PricingCardsSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onRequestQuote: (serviceName?: string) => void;
}

export function PricingCardsSection({ onSelectPlan, onRequestQuote }: PricingCardsSectionProps) {
  const [activeTab, setActiveTab] = useState<'core' | 'amc'>('core');
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

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
        return <Layers className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="pricing-plans-section" className="py-20 bg-[#060911] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Promo Coupons Banner */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-[#0c1427] border border-blue-800/40 shadow-xl">
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
                  Apply during checkout to claim milestone discounts.
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
        <div className="flex justify-center mb-14">
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
              <span>Core Project Engagements</span>
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

        {/* Dynamic Plans Display */}
        {activeTab === 'core' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                id={`plan-card-${plan.id}`}
                className={`rounded-2xl bg-[#0c1324] border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'border-blue-500 shadow-2xl shadow-blue-950/60 lg:scale-[1.02]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                    Most Popular Engagement
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Category & Title */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getPlanIcon(plan.category)}
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          {plan.category}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {plan.typicalDuration}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-white tracking-tight">{plan.name}</h3>
                    <p className="text-xs text-blue-400 font-medium mt-1">{plan.tagline}</p>
                  </div>

                  {/* Starting Price Display */}
                  <div className="p-4 rounded-xl bg-[#070c17] border border-slate-800/80 space-y-1.5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-slate-400 font-medium">Starting from</span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                        ₹{plan.startingPriceInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Milestone pricing with <strong className="text-slate-200">{plan.depositPercentage}% deposit</strong> upon SOW signing.
                    </p>
                  </div>

                  {/* Scope Summary */}
                  <div className="text-xs text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800/60 leading-relaxed">
                    <span className="text-slate-400 font-semibold block mb-0.5">Estimated Scope:</span>
                    {plan.estimatedScope}
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                      Core Deliverables:
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

                  {/* Architecture Tech Badges */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block font-mono">
                      Included Architecture:
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

                {/* Dual Action CTAs */}
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
                    <span>Get Started (Reserve Sprint)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestQuote(plan.name)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-900/80 border border-slate-800 transition-colors cursor-pointer"
                  >
                    Request Custom Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {RECURRING_AMC_PLANS.map((plan) => (
              <div
                key={plan.id}
                id={`amc-card-${plan.id}`}
                className={`rounded-2xl bg-[#0c1324] border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'border-blue-500 shadow-2xl shadow-blue-950/60'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                    Recommended DevOps Tier
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getPlanIcon(plan.category)}
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          Recurring Agreement
                        </span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                        Monthly / Annual
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-white tracking-tight">{plan.name}</h3>
                    <p className="text-xs text-blue-400 font-medium mt-1">{plan.tagline}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#070c17] border border-slate-800/80 space-y-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                        ₹{plan.startingPriceInr.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ month</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Cancel anytime with 30-day notice • 5-day grace period on renewals.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                      Included SLA &amp; Deliverables:
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
                    <span>Activate Maintenance Retainer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestQuote(plan.name)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-900/80 border border-slate-800 transition-colors cursor-pointer"
                  >
                    Discuss SLA Requirements
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pricing Transparency Philosophy */}
        <div className="mt-16 rounded-2xl bg-[#090e1b] border border-slate-800 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">100% IP Ownership</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You own all source code, database schemas, and assets upon final milestone payment. No hostage licenses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Milestone-Based Escrow</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  50% kickoff deposit, balance payable only upon reviewed staging deployment and acceptance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Post-Launch Warranty</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every project includes 30 to 90 days of guaranteed bug fixes and performance SLA support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
