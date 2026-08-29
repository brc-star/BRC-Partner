'use client';

import React from 'react';
import {
  FileCheck2,
  Code2,
  CheckCircle2,
  Gauge,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Workflow,
  Sparkles,
} from 'lucide-react';
import { VERIFICATION_METHODOLOGY } from '@/lib/claim-proof-data';

interface VerificationMethodologySectionProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export function VerificationMethodologySection({
  onOpenInquiry,
}: VerificationMethodologySectionProps) {
  const stepIcons = [FileCheck2, Code2, CheckCircle2, Gauge, BookOpen];

  return (
    <section
      id="verification-methodology"
      className="py-24 bg-[#080d1a] border-t border-slate-800/80 relative"
      aria-labelledby="methodology-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Workflow className="w-3.5 h-3.5 text-blue-400" />
            <span>Engineering Discipline &amp; Rigor</span>
          </div>

          <h2
            id="methodology-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            How We Verify Our Work
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From technical requirement to production deployment, we apply a 5-stage verification methodology so you receive proven, auditable software—never guesswork.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {VERIFICATION_METHODOLOGY.map((step, idx) => {
            const IconComp = stepIcons[idx] || ShieldCheck;
            return (
              <div
                key={step.step}
                id={`methodology-step-${step.step}`}
                className="rounded-2xl bg-[#0c1324] border border-slate-800 hover:border-blue-500/40 p-5 flex flex-col justify-between space-y-4 transition-all group shadow-xl hover:shadow-2xl hover:shadow-blue-950/20"
              >
                <div className="space-y-3">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-blue-500/80 group-hover:text-blue-400 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-blue-400 font-medium mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Methodology Points */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300 block font-mono text-[10px] uppercase">
                      Core Disciplines:
                    </span>
                    <ul className="space-y-1">
                      {step.methodology.map((m, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tangible Output Deliverable */}
                <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-emerald-300 bg-[#070c18] p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase">Tangible Output:</span>
                  <span className="font-semibold">{step.output}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0a101f] to-indigo-950/40 border border-blue-800/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Transparent Engineering. Zero Marketing Guesswork.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              We don&apos;t ask you to believe everything we say. We show you how we work and provide tangible proof for every deliverable.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry('Engineering Process & Verification Review')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/30 whitespace-nowrap shrink-0"
          >
            <span>Review Scope With An Engineer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
