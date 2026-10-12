'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ZapOff,
  FileSpreadsheet,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { BUSINESS_PROBLEMS } from '@/lib/data';

interface BusinessProblemSectionProps {
  onOpenInquiry: () => void;
}

export function BusinessProblemSection({ onOpenInquiry }: BusinessProblemSectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      id="business-problems"
      className="py-24 bg-[#060911] relative overflow-hidden"
      aria-labelledby="problem-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>The Reality of Modern Software</span>
          </div>

          <h2
            id="problem-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Technology Should Solve Business Problems —{' '}
            <span className="text-slate-400">Not Create More.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Most growing businesses don&apos;t suffer from a lack of ideas—they suffer from disconnected tools, fragile code, slow websites, and off-the-shelf software that fails to adapt to their real workflows.
          </p>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BUSINESS_PROBLEMS.map((item, idx) => (
            <div
              key={item.problem}
              id={`problem-card-${idx}`}
              onMouseEnter={() => setActiveCard(idx)}
              onMouseLeave={() => setActiveCard(null)}
              className="rounded-2xl bg-white dark:bg-[#0a101d] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 hover:border-blue-400 dark:hover:border-blue-500/40 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 shrink-0">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                      The Common Frustration
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {item.problem}
                    </h3>
                  </div>
                </div>

                {/* Problem Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-13">
                  {item.painPoint}
                </p>

                {/* The BRC STAR Engineered Fix */}
                <div className="mt-4 pt-5 border-t border-slate-200 dark:border-slate-800/80 bg-blue-50/60 dark:bg-gradient-to-r dark:from-blue-950/30 dark:to-purple-950/20 p-4 rounded-xl border border-blue-200/60 dark:border-blue-900/30">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-blue-600/10 dark:bg-blue-600/30 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                        The BRC STAR Solution
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Positioning */}
        <div className="mt-12 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-[#0d1424] dark:via-[#101b33] dark:to-[#0d1424] border border-slate-200 dark:border-blue-500/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-none">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Ready to replace disconnected workarounds with engineered digital systems?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              BRC STAR starts with a technical and workflow discovery session to map your exact requirements.
            </p>
          </div>
          <button
            onClick={onOpenInquiry}
            className="shrink-0 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/25 cursor-pointer"
          >
            <span>Request Architecture Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
