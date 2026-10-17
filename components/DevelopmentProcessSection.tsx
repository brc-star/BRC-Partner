'use client';

import React from 'react';
import {
  MessageSquare,
  FileCheck2,
  Rocket,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface DevelopmentProcessSectionProps {
  onOpenInquiry: () => void;
}

export function DevelopmentProcessSection({ onOpenInquiry }: DevelopmentProcessSectionProps) {
  const steps = [
    {
      step: '01',
      title: 'Discuss',
      description: 'Tell us about your business, goals, budget, and website requirements.',
      icon: MessageSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800/40',
      tag: 'Step 1: Consultation',
    },
    {
      step: '02',
      title: 'Approve Scope',
      description: 'We clarify deliverables, pricing, timelines, and project milestones before development begins.',
      icon: FileCheck2,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800/40',
      tag: 'Step 2: Transparent SOW',
    },
    {
      step: '03',
      title: 'Build & Launch',
      description: 'We design, develop, test, and prepare your approved project for launch according to the agreed scope.',
      icon: Rocket,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/40',
      tag: 'Step 3: Staging & Handover',
    },
  ];

  return (
    <section
      id="process"
      className="py-20 sm:py-24 bg-white dark:bg-[#070c18] relative overflow-hidden transition-colors border-b border-slate-200 dark:border-slate-800/80"
      aria-labelledby="process-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Simple, Predictable Process</span>
          </div>

          <h2
            id="process-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            How It Works
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            From initial business discussion to production launch with verified milestones and zero surprises.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="rounded-3xl bg-slate-50 dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800/90 hover:border-blue-400 dark:hover:border-blue-500/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-950/20 group relative overflow-hidden"
              >
                {/* Number watermark in background */}
                <span className="absolute -bottom-4 -right-2 text-7xl font-extrabold text-slate-200/50 dark:text-slate-800/40 select-none pointer-events-none font-mono">
                  {item.step}
                </span>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {item.tag}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${item.bgColor} border flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/80 relative z-10 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Phase {item.step} of 03</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Milestone Verified</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to start Step 1 */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>Start Step 1: Discuss Your Project With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
