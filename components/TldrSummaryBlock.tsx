'use client';

import React from 'react';
import {
  Sparkles,
  Target,
  Clock,
  ShieldCheck,
  ArrowRight,
  Zap,
  CheckCircle2,
} from 'lucide-react';

interface TldrSummaryBlockProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export function TldrSummaryBlock({ onOpenInquiry }: TldrSummaryBlockProps) {
  const points = [
    {
      label: 'What We Do',
      icon: Zap,
      iconColor: 'text-amber-400',
      badgeBg: 'bg-amber-950/50 border-amber-800/40 text-amber-300',
      heading: 'Bespoke Full-Stack Systems & AI Solutions',
      description:
        'We engineer custom web applications, enterprise software, mobile apps, and AI copilots with zero generic template bloat.',
    },
    {
      label: "Who It's For",
      icon: Target,
      iconColor: 'text-blue-400',
      badgeBg: 'bg-blue-950/50 border-blue-800/40 text-blue-300',
      heading: 'Growth Startups & Established Enterprises',
      description:
        'Businesses needing a dedicated, senior-level technology partner with direct architectural ownership rather than fragmented freelancers.',
    },
    {
      label: 'How Fast',
      icon: Clock,
      iconColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/50 border-emerald-800/40 text-emerald-300',
      heading: '3 to 12 Weeks in Transparent Sprints',
      description:
        '3–6 weeks for high-performance business flagships; 6–12 weeks for complex web applications with bi-weekly live staging demos.',
    },
    {
      label: 'Why Us',
      icon: ShieldCheck,
      iconColor: 'text-purple-400',
      badgeBg: 'bg-purple-950/50 border-purple-800/40 text-purple-300',
      heading: '100% IP Ownership & Audited Proof',
      description:
        'Complete Git repository handover, zero proprietary lock-in, senior engineers only, and rigorous Claim → Proof verification.',
    },
  ];

  return (
    <section
      id="tldr-summary"
      className="py-8 sm:py-10 bg-[#070c18] border-y border-slate-800/80 relative"
      aria-label="BRC STAR Executive Summary TL;DR"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#091020] via-[#0c1428] to-[#091020] border border-blue-500/20 p-5 sm:p-7 shadow-xl">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md bg-blue-950 text-blue-400 border border-blue-800 font-mono text-xs font-bold uppercase tracking-wider">
                TL;DR Executive Summary
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                At-a-Glance Partnership Overview
              </span>
            </div>

            <button
              onClick={() => onOpenInquiry('Executive Consultation')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            >
              <span>Schedule Senior Architect Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-5">
            {points.map((pt, idx) => {
              const IconComp = pt.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${pt.badgeBg}`}
                    >
                      {pt.label}
                    </span>
                    <IconComp className={`w-4 h-4 ${pt.iconColor}`} />
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    {pt.heading}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
