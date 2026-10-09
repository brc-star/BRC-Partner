'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  ShoppingCart,
  Smartphone,
  Bot,
  Layers,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Lock,
} from 'lucide-react';
import { HOMEPAGE_PRICING_PREVIEW, findPlanById } from '@/lib/pricing-data';
import { PricingPlan } from '@/types/payment';
import { RazorpayCheckoutModal } from '@/components/RazorpayCheckoutModal';

// Map preview cards to actual canonical pricing plans in India market
const PREVIEW_TO_PLAN_ID_MAP: Record<string, string> = {
  'hp-web-development': 'plan-webdev-basic-in',
  'hp-ecommerce': 'plan-ecom-starter-in',
  'hp-mobile-app': 'plan-mobile-basic-in',
  'hp-ai-automation': 'plan-ai-starter-in',
  'hp-saas-web-app': 'plan-saas-starter-in',
};

export function HomepagePricingPreview() {
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Web Development':
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 'E-Commerce':
        return <ShoppingCart className="w-5 h-5 text-indigo-400" />;
      case 'Mobile App':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'AI & Automation':
        return <Bot className="w-5 h-5 text-purple-400" />;
      case 'SaaS / Web Application':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  const handlePayNow = (previewItemId: string) => {
    const planId = PREVIEW_TO_PLAN_ID_MAP[previewItemId] || 'plan-webdev-basic-in';
    const plan = findPlanById(planId, 'india');
    if (plan) {
      setSelectedPlanForCheckout(plan);
    }
  };

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
            <span>Pricing / Investment</span>
          </div>

          <h2
            id="pricing-preview-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Transparent Starting Prices
          </h2>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            Transparent starting prices for every stage of your digital journey.
          </p>
        </div>

        {/* 5 Compact Pricing Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-10">
          {HOMEPAGE_PRICING_PREVIEW.map((item) => (
            <div
              key={item.id}
              id={`hp-pricing-${item.id}`}
              className="group rounded-2xl bg-[#0c1324] border border-slate-800/90 hover:border-blue-500/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:bg-[#0e172d] hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-4">
                {/* Category Icon & Name */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500/40 transition-colors">
                    {getCategoryIcon(item.name)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                    {item.name}
                  </h3>
                </div>

                {/* Tagline */}
                <p className="text-xs text-slate-400 leading-relaxed min-h-[32px]">
                  {item.tagline}
                </p>

                {/* Price Display */}
                <div className="pt-3 border-t border-slate-800/60 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                    From
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                    {item.formattedStartingPrice}
                  </div>
                </div>
              </div>

              {/* Pay Now & Detail Actions */}
              <div className="pt-5 mt-4 border-t border-slate-800/80 space-y-2.5">
                <button
                  type="button"
                  id={`pay-now-btn-${item.id}`}
                  onClick={() => handlePayNow(item.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all cursor-pointer group/btn"
                >
                  <CreditCard className="w-3.5 h-3.5 text-blue-200" />
                  <span>Pay Now</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Incl. 18% GST</span>
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Lock className="w-2.5 h-2.5 text-slate-400" />
                    <span>Razorpay</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GST Notice & CTA Action Area */}
        <div className="flex flex-col items-center justify-center space-y-5 text-center">
          {/* GST Supporting Message */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a101e] border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>All prices are inclusive of 18% GST.</span>
          </div>

          {/* Primary CTA button linking to /pricing */}
          <div>
            <Link
              href="/pricing"
              id="hp-view-detailed-pricing-cta"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base font-bold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>View Detailed Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Razorpay Checkout Modal */}
      <RazorpayCheckoutModal
        isOpen={Boolean(selectedPlanForCheckout)}
        onClose={() => setSelectedPlanForCheckout(null)}
        selectedPlan={selectedPlanForCheckout}
      />
    </section>
  );
}
