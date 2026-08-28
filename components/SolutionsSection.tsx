'use client';

import React, { useState } from 'react';
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Server,
  Sparkles,
  Palette,
  ShoppingBag,
  Compass,
  ArrowRight,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { SOLUTIONS_DATA } from '@/lib/data';
import { SolutionItem } from '@/types';

const iconMap = {
  Globe: Globe,
  LayoutDashboard: LayoutDashboard,
  Smartphone: Smartphone,
  Server: Server,
  Sparkles: Sparkles,
  Palette: Palette,
  ShoppingBag: ShoppingBag,
  Compass: Compass,
};

interface SolutionsSectionProps {
  onOpenInquiry: (initialService?: string) => void;
}

export function SolutionsSection({ onOpenInquiry }: SolutionsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'enterprise' | 'mobile' | 'ai' | 'design'>('all');
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

  const filteredSolutions = activeFilter === 'all'
    ? SOLUTIONS_DATA
    : SOLUTIONS_DATA.filter((s) => s.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: 'All Solutions' },
    { id: 'web', label: 'Web Applications & Sites' },
    { id: 'enterprise', label: 'Enterprise Systems' },
    { id: 'mobile', label: 'Mobile Platforms' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'design', label: 'UI/UX & Product' },
  ];

  return (
    <section
      id="solutions"
      className="py-24 bg-[#080d18] border-t border-slate-800/80 relative"
      aria-labelledby="solutions-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <span>Capabilities & Engineering Disciplines</span>
          </div>

          <h2
            id="solutions-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Engineered Digital Solutions for Real Business Demands
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            We design, build, deploy, and support end-to-end software systems. Every solution is architected with modern, scalable, and type-safe foundations.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/40'
                    : 'bg-[#0f172a] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Core Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredSolutions.map((solution, idx) => {
            const IconComponent = iconMap[solution.iconName as keyof typeof iconMap] || Globe;
            return (
              <div
                key={solution.id}
                id={`solution-card-${solution.id}`}
                className="rounded-2xl bg-[#0c1324] border border-slate-800/90 hover:border-blue-500/40 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-blue-950/20"
              >
                <div className="space-y-6">
                  {/* Top bar with icon and title */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-950 to-indigo-950 border border-blue-700/40 flex items-center justify-center text-blue-400 group-hover:text-blue-300 group-hover:scale-105 transition-all shadow-inner">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                          {solution.title}
                        </h3>
                        <p className="text-xs text-blue-400 font-medium mt-0.5">
                          {solution.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Structured Details: What we build */}
                  <div className="space-y-2.5 pt-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      What We Build:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {solution.whatWeBuild.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Who it is for & Problem Solved */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-[#090e1a] border border-slate-800/80">
                      <span className="font-semibold text-slate-300 block mb-1">Target Audience:</span>
                      <span className="text-slate-400 leading-snug">{solution.whoItIsFor}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#090e1a] border border-slate-800/80">
                      <span className="font-semibold text-slate-300 block mb-1">Business Impact:</span>
                      <span className="text-slate-400 leading-snug">{solution.problemSolved}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="pt-1 flex flex-wrap items-center gap-1.5">
                    {solution.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Bespoke Architecture</span>
                  <button
                    onClick={() => onOpenInquiry(solution.title)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 hover:gap-3 transition-all cursor-pointer"
                  >
                    <span>Discuss This Solution</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
