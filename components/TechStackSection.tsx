'use client';

import React, { useState } from 'react';
import {
  Layout,
  Server,
  Database,
  Smartphone,
  Cloud,
  Sparkles,
  Palette,
  CheckCircle2,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { TECH_STACK } from '@/lib/data';

const iconMap = {
  Layout: Layout,
  Server: Server,
  Database: Database,
  Smartphone: Smartphone,
  Cloud: Cloud,
  Sparkles: Sparkles,
  Palette: Palette,
};

interface TechStackSectionProps {
  onOpenInquiry: () => void;
}

export function TechStackSection({ onOpenInquiry }: TechStackSectionProps) {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section
      id="tech-stack"
      className="py-24 bg-[#080d18] border-t border-slate-800/80 relative"
      aria-labelledby="tech-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <span>Modern Engineering Foundation</span>
          </div>

          <h2
            id="tech-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Production-Tested Technology Stack
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            We don&apos;t gamble on unproven fads. We build on industry-leading, type-safe, and highly scalable technologies designed for multi-year stability and peak runtime performance.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {TECH_STACK.map((cat, idx) => {
            const Icon = iconMap[cat.iconName as keyof typeof iconMap] || Layout;
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                    : 'bg-[#0e172a] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tech Category Detailed Breakdown */}
        <div className="rounded-2xl bg-[#0c1324] border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {TECH_STACK[activeCategory].category}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {TECH_STACK[activeCategory].description}
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/60 w-fit">
              100% Production Supported
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {TECH_STACK[activeCategory].skills.map((skill, i) => (
              <div
                key={skill.name}
                className={`p-4 rounded-xl border transition-all ${
                  skill.highlight
                    ? 'bg-gradient-to-br from-[#0f1d38] to-[#0d162b] border-blue-500/50 shadow-md shadow-blue-950/40'
                    : 'bg-[#080d1a] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-sm text-white">{skill.name}</span>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                      skill.highlight
                        ? 'bg-blue-600/40 text-blue-300 border border-blue-500/40 font-semibold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span>Need a custom technology evaluation or legacy migration?</span>
            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
            >
              <span>Consult with a Senior Architect</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
