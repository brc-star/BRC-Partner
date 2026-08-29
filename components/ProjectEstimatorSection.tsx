'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Calculator,
  Sliders,
  Sparkles,
  Shield,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { PRICING_PACKAGES } from '@/lib/data';

interface ProjectEstimatorSectionProps {
  onOpenInquiry: (initialService?: string) => void;
}

export function ProjectEstimatorSection({ onOpenInquiry }: ProjectEstimatorSectionProps) {
  // Interactive Scope Planner State
  const [selectedCategory, setSelectedCategory] = useState<'website' | 'webapp' | 'enterprise'>('webapp');
  const [hasAuth, setHasAuth] = useState(true);
  const [hasDatabase, setHasDatabase] = useState(true);
  const [hasPayments, setHasPayments] = useState(false);
  const [hasAi, setHasAi] = useState(false);
  const [hasMobile, setHasMobile] = useState(false);
  const [timelineUrgency, setTimelineUrgency] = useState<'standard' | 'accelerated'>('standard');

  const getEstimatedWeeks = () => {
    let weeks = selectedCategory === 'website' ? 4 : selectedCategory === 'webapp' ? 8 : 14;
    if (hasPayments) weeks += 1;
    if (hasAi) weeks += 2;
    if (hasMobile) weeks += 3;
    if (timelineUrgency === 'accelerated') weeks = Math.max(3, Math.round(weeks * 0.75));
    return `${weeks} – ${weeks + 2} Weeks`;
  };

  const getSprints = () => {
    if (selectedCategory === 'website') return '2 to 3 Agile Sprints';
    if (selectedCategory === 'webapp') return '4 to 6 Agile Sprints';
    return '7 to 10+ Agile Sprints';
  };

  return (
    <section
      id="investment"
      className="py-24 bg-[#060911] relative overflow-hidden"
      aria-labelledby="pricing-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <span>Transparent Project Investment</span>
          </div>

          <h2
            id="pricing-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Engineered Investment Frameworks
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            We partner with businesses through milestone-based proposals and dedicated engineering sprints. No hidden retainers, no per-seat hostage fees, and 100% IP ownership.
          </p>
        </div>

        {/* Pricing Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              id={`pricing-card-${pkg.id}`}
              className={`rounded-2xl bg-[#0c1324] border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'border-blue-500 shadow-2xl shadow-blue-950/50 scale-[1.02]'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  Most Requested Engagement
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-blue-400 font-medium mt-1">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#070c17] border border-slate-800/80 space-y-1 text-xs">
                  <span className="text-slate-400 font-medium">Typical Timeline:</span>
                  <div className="text-sm font-bold text-white">{pkg.typicalDuration}</div>
                  <p className="text-slate-400 mt-1">{pkg.idealFor}</p>
                </div>

                {/* Deliverables */}
                <div className="space-y-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Core Deliverables:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {pkg.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture Highlights */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Included Architecture:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.includedArchitecture.map((arch, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {arch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-800/80 mt-8">
                <button
                  onClick={() => onOpenInquiry(pkg.title)}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white'
                  }`}
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Variables Notice */}
        <div className="rounded-2xl bg-[#0a101e] border border-slate-800 p-6 sm:p-8 mb-16">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>How We Determine Final Scopes</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Every business has unique architecture, compliance, and integration demands.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Final project proposals are calculated transparently during Discovery based on: total screen count, database schemas, custom backend API complexity, third-party services (Stripe, Twilio, ERP sync), security compliance levels, and continuous maintenance SLAs.
            </p>
          </div>
        </div>

        {/* Interactive Project Scope & Investment Planner Tool */}
        <div id="estimator" className="rounded-2xl bg-gradient-to-br from-[#0c1426] via-[#0e172c] to-[#0a101e] border border-blue-500/30 p-5 sm:p-8 lg:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Interactive Scoping Utility</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Project Scope &amp; Timeline Estimator
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Configure your project parameters to calculate estimated sprint velocity and milestone requirements.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1 & 2: Parameters */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Category Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>1. Select Platform Architecture</span>
                  <span className="text-[11px] font-mono text-blue-400 font-normal">Step 1 of 3</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('website')}
                    className={`p-3.5 min-h-[48px] rounded-xl border text-xs font-semibold transition-all text-center flex items-center justify-center cursor-pointer ${
                      selectedCategory === 'website'
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    Business Website
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('webapp')}
                    className={`p-3.5 min-h-[48px] rounded-xl border text-xs font-semibold transition-all text-center flex items-center justify-center cursor-pointer ${
                      selectedCategory === 'webapp'
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    Web Application / SaaS
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('enterprise')}
                    className={`p-3.5 min-h-[48px] rounded-xl border text-xs font-semibold transition-all text-center flex items-center justify-center cursor-pointer ${
                      selectedCategory === 'enterprise'
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    Enterprise System
                  </button>
                </div>
              </div>

              {/* Step 2: Module Checkboxes */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>2. Select Required Feature Modules</span>
                  <span className="text-[11px] font-mono text-blue-400 font-normal">Step 2 of 3</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label className="flex items-center gap-3 p-3.5 min-h-[48px] rounded-xl bg-slate-900/90 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={hasAuth}
                      onChange={(e) => setHasAuth(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 shrink-0"
                    />
                    <span className="text-xs text-slate-200 font-medium leading-snug">User Authentication &amp; RBAC</span>
                  </label>
                  <label className="flex items-center gap-3 p-3.5 min-h-[48px] rounded-xl bg-slate-900/90 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={hasDatabase}
                      onChange={(e) => setHasDatabase(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 shrink-0"
                    />
                    <span className="text-xs text-slate-200 font-medium leading-snug">Relational DB &amp; ORM Models</span>
                  </label>
                  <label className="flex items-center gap-3 p-3.5 min-h-[48px] rounded-xl bg-slate-900/90 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={hasPayments}
                      onChange={(e) => setHasPayments(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 shrink-0"
                    />
                    <span className="text-xs text-slate-200 font-medium leading-snug">Stripe Payments / Invoicing</span>
                  </label>
                  <label className="flex items-center gap-3 p-3.5 min-h-[48px] rounded-xl bg-slate-900/90 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={hasAi}
                      onChange={(e) => setHasAi(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 shrink-0"
                    />
                    <span className="text-xs text-slate-200 font-medium leading-snug">AI Copilot / Vector Search (RAG)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3.5 min-h-[48px] rounded-xl bg-slate-900/90 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={hasMobile}
                      onChange={(e) => setHasMobile(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 shrink-0"
                    />
                    <span className="text-xs text-slate-200 font-medium leading-snug">Companion Mobile App (React Native iOS/Android)</span>
                  </label>
                </div>
              </div>

              {/* Step 3: Urgency */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>3. Delivery Velocity</span>
                  <span className="text-[11px] font-mono text-blue-400 font-normal">Step 3 of 3</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTimelineUrgency('standard')}
                    className={`p-3.5 min-h-[48px] rounded-xl border text-xs font-medium transition-all text-center flex items-center justify-center cursor-pointer ${
                      timelineUrgency === 'standard'
                        ? 'bg-blue-950 border-blue-500 text-blue-300 font-semibold shadow-inner'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Standard Agile Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimelineUrgency('accelerated')}
                    className={`p-3.5 min-h-[48px] rounded-xl border text-xs font-medium transition-all text-center flex items-center justify-center cursor-pointer ${
                      timelineUrgency === 'accelerated'
                        ? 'bg-blue-950 border-blue-500 text-blue-300 font-semibold shadow-inner'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Accelerated Sprint Cadence
                  </button>
                </div>
              </div>
            </div>

            {/* Column 3: Estimation Summary Output */}
            <div className="p-6 rounded-2xl bg-[#080d1a] border border-blue-900/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Engineered Estimate Summary
                </span>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-xs py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Estimated Duration</span>
                    <span className="font-bold text-white">{getEstimatedWeeks()}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Sprint Allocation</span>
                    <span className="font-semibold text-blue-300">{getSprints()}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Deployment Standard</span>
                    <span className="font-semibold text-emerald-400">Production CI/CD</span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5">
                    <span className="text-slate-400">Source IP Rights</span>
                    <span className="font-semibold text-white">100% Client Owned</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/40 text-[11px] text-blue-300">
                  Ready to formalize this scope into an itemized proposal and timeline?
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenInquiry(`Custom Scoped ${selectedCategory.toUpperCase()}`)}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                <span>Request Formal Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
