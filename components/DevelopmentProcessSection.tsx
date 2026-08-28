'use client';

import React, { useState } from 'react';
import {
  Search,
  Network,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  Clock,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import { DEVELOPMENT_PROCESS } from '@/lib/data';

const iconMap = {
  Search: Search,
  Network: Network,
  Palette: Palette,
  Code2: Code2,
  CheckCircle2: CheckCircle2,
  Rocket: Rocket,
};

interface DevelopmentProcessSectionProps {
  onOpenInquiry: () => void;
}

export function DevelopmentProcessSection({ onOpenInquiry }: DevelopmentProcessSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const currentStage = DEVELOPMENT_PROCESS[activeStep];
  const CurrentIcon = iconMap[currentStage.iconName as keyof typeof iconMap] || Search;

  return (
    <section
      id="process"
      className="py-24 bg-[#060911] relative overflow-hidden"
      aria-labelledby="process-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <span>Methodology & Lifecycle</span>
          </div>

          <h2
            id="process-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            A Rigorous Six-Stage Engineering Lifecycle
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From initial business feasibility through production deployment and continuous scale, our agile engineering process guarantees predictability, transparent milestones, and zero surprises.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {DEVELOPMENT_PROCESS.map((stage, idx) => {
            const Icon = iconMap[stage.iconName as keyof typeof iconMap] || Search;
            const isActive = activeStep === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#0f1b36] border-blue-500 shadow-lg shadow-blue-600/20'
                    : 'bg-[#0a101e] border-slate-800 hover:border-slate-700 hover:bg-[#0d1424]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
                    {stage.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                </div>
                <div className="mt-3">
                  <span className={`text-xs font-bold block line-clamp-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {stage.title.split(' & ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {stage.timeline.split(' (')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Deep Dive Card */}
        <div className="rounded-2xl bg-[#0c1324] border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300">
          {/* Header of the active stage */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-950/80 border border-blue-700/60 flex items-center justify-center text-blue-400 shrink-0 shadow-lg">
                <CurrentIcon className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/60">
                    STAGE {currentStage.step}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    {currentStage.timeline}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {currentStage.title}
                </h3>
                <p className="text-sm text-blue-300 font-medium mt-0.5">
                  {currentStage.subtitle}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070c17] border border-slate-800 flex items-start gap-2.5 max-w-sm">
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-emerald-300 block mb-0.5">Client Touchpoint:</strong>
                <span className="text-slate-300">{currentStage.clientTouchpoint}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-base text-slate-300 leading-relaxed max-w-4xl">
            {currentStage.description}
          </p>

          {/* Concrete Deliverables Grid */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Verified Stage Deliverables:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentStage.deliverables.map((deliv, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#080e1a] border border-slate-800/80 flex items-start gap-3 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="font-medium leading-snug">{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stepper Navigation Actions */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold text-slate-300 disabled:cursor-not-allowed transition-colors"
              >
                Previous Stage
              </button>
              <button
                onClick={() => setActiveStep(Math.min(DEVELOPMENT_PROCESS.length - 1, activeStep + 1))}
                disabled={activeStep === DEVELOPMENT_PROCESS.length - 1}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-xs font-semibold text-white disabled:cursor-not-allowed transition-colors"
              >
                Next Stage
              </button>
            </div>

            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Schedule Stage 01 Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
