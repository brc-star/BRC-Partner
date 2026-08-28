'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  ArrowRight,
  Shield,
  Activity,
  Layers,
  Cpu,
  Smartphone,
  Eye,
  CheckCircle2,
  Lock,
  Search,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { SHOWCASE_PROJECTS } from '@/lib/data';
import { ProjectShowcaseItem } from '@/types';
import { CaseStudyModal } from './CaseStudyModal';

interface ProjectShowcaseSectionProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export function ProjectShowcaseSection({ onOpenInquiry }: ProjectShowcaseSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectShowcaseItem | null>(null);

  const categories = ['All', 'Enterprise Systems', 'Financial Technology', 'AI & Automation', 'E-Commerce Solutions', 'Mobile Application', 'Website Development'];

  const filteredProjects = selectedCategory === 'All'
    ? SHOWCASE_PROJECTS
    : SHOWCASE_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="showcase"
      className="py-24 bg-[#060911] relative overflow-hidden"
      aria-labelledby="showcase-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <span>Engineering Portfolio & Systems</span>
          </div>

          <h2
            id="showcase-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Visual Project Showcase
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            A selection of custom enterprise platforms, cloud web applications, AI copilots, and digital flagships engineered by BRC STAR.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-[#0e1628] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Visual Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="rounded-2xl bg-[#0a101d] border border-slate-800 hover:border-blue-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl group"
            >
              {/* Realistic Visual Interface Mockup Header */}
              <div className="p-4 sm:p-5 bg-[#070c17] border-b border-slate-800/80">
                {/* Mockup Container */}
                <div className="rounded-xl bg-[#0e172a] border border-slate-800 overflow-hidden shadow-inner font-sans">
                  {/* Mockup Window Chrome */}
                  <div className="flex items-center justify-between px-3 py-2 bg-[#090f1d] border-b border-slate-800 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <span className="font-mono text-[10px] text-slate-400 ml-2">
                        {project.id}.production.brcstar.internal
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">
                      LIVE INSTANCE
                    </span>
                  </div>

                  {/* Mockup Specific Interactive Body */}
                  <div className="p-4 bg-gradient-to-b from-[#0e172a] to-[#0a101e] min-h-[170px] flex flex-col justify-between">
                    {/* Mockup 1: Logistics Fleet Dashboard */}
                    {project.mockupType === 'dashboard' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Activity className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-semibold text-slate-200">Active Fleet Telemetry (1,420 Units)</span>
                          </div>
                          <span className="text-[10px] font-mono text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                            Latency 38ms
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-[10px]">
                          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                            <span className="text-slate-500">In Transit</span>
                            <div className="font-bold text-slate-200 text-xs">894 Trucks</div>
                          </div>
                          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                            <span className="text-slate-500">Avg ETA Precision</span>
                            <div className="font-bold text-emerald-400 text-xs">99.2%</div>
                          </div>
                          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                            <span className="text-slate-500">Route Efficiency</span>
                            <div className="font-bold text-indigo-400 text-xs">+28.4%</div>
                          </div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-3/4" />
                        </div>
                      </div>
                    )}

                    {/* Mockup 2: FinTech Settlement Portal */}
                    {project.mockupType === 'fintech' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5 text-purple-400" />
                            <span className="text-xs font-semibold text-slate-200">Multi-Currency Settlement Gateway</span>
                          </div>
                          <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                            SOC2 Encrypted
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                            <span className="text-slate-500">Verified Treasury Balance</span>
                            <div className="font-bold text-emerald-400 text-sm">$4,850,290.00</div>
                          </div>
                          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                            <span className="text-slate-500">Daily Batch Clearance</span>
                            <div className="font-bold text-slate-200 text-sm">Real-Time</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>Ledger Checksum: #SHA-256-VALID</span>
                          <span className="text-emerald-400">0 Reconcile Errors</span>
                        </div>
                      </div>
                    )}

                    {/* Mockup 3: AI Document Workspace */}
                    {project.mockupType === 'ai-workspace' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-semibold text-slate-200">Semantic RAG Regulatory Query Console</span>
                          </div>
                          <span className="text-[10px] font-mono text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                            pgvector Index
                          </span>
                        </div>
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono">
                            <Search className="w-3 h-3 text-blue-400" />
                            <span>&quot;What are the compliance mandates for cross-border data transfer?&quot;</span>
                          </div>
                          <div className="text-[10px] text-emerald-300 bg-emerald-950/30 p-1.5 rounded border border-emerald-900/40">
                            Answer grounded in 4 verified manual bylaws (Citations #8, #14).
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mockup 4: E-Commerce Wholesale Platform */}
                    {project.mockupType === 'ecommerce' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                            <span className="text-xs font-semibold text-slate-200">Tier-3 Wholesale Contract Price Matrix</span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                            ERP Synced
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-[10px]">
                          <div className="p-2 rounded bg-slate-900 border border-slate-800">
                            <span className="text-slate-500">Catalog SKUs</span>
                            <div className="font-bold text-slate-200 text-xs">45,000+</div>
                          </div>
                          <div className="p-2 rounded bg-slate-900 border border-slate-800">
                            <span className="text-slate-500">Lighthouse Score</span>
                            <div className="font-bold text-emerald-400 text-xs">98/100</div>
                          </div>
                          <div className="p-2 rounded bg-slate-900 border border-slate-800">
                            <span className="text-slate-500">Net Terms</span>
                            <div className="font-bold text-indigo-400 text-xs">Net-30 / 60</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mockup 5: Mobile App Field Inspection */}
                    {project.mockupType === 'mobile-app' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-semibold text-slate-200">Field Diagnostics (Offline-First)</span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                            Local SQLite Sync
                          </span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-[10px]">
                          <div>
                            <span className="font-bold text-slate-200 block">Unit #748B Inspection Completed</span>
                            <span className="text-slate-500">Signature captured & timestamped</span>
                          </div>
                          <span className="text-emerald-400 font-mono">100% Synced</span>
                        </div>
                      </div>
                    )}

                    {/* Mockup 6: SaaS Web Flagship */}
                    {project.mockupType === 'saas-web' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                            <span className="text-xs font-semibold text-slate-200">Cybersecurity Infrastructure Flagship</span>
                          </div>
                          <span className="text-[10px] font-mono text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                            Edge Edge-ISR
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="p-2 rounded bg-slate-900 border border-slate-800">
                            <span className="text-slate-500">Core Web Vitals</span>
                            <div className="font-bold text-emerald-400 text-xs">0.7s Mobile LCP</div>
                          </div>
                          <div className="p-2 rounded bg-slate-900 border border-slate-800">
                            <span className="text-slate-500">Lead Conversion Lift</span>
                            <div className="font-bold text-blue-400 text-xs">+44% Demo Pipeline</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 sm:p-7 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 font-mono">
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {project.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Challenge & Solution Summary */}
                <div className="p-3.5 rounded-xl bg-[#070d18] border border-slate-800/80 space-y-2 text-xs">
                  <div>
                    <strong className="text-amber-400 font-semibold block mb-0.5">Challenge:</strong>
                    <p className="text-slate-400 line-clamp-2">{project.challenge}</p>
                  </div>
                  <div>
                    <strong className="text-emerald-400 font-semibold block mb-0.5">Solution:</strong>
                    <p className="text-slate-300 line-clamp-2">{project.solution}</p>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setActiveCaseStudy(project)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Case Study</span>
                  </button>

                  <button
                    onClick={() => onOpenInquiry(project.title)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <span>Request Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Modal Component */}
        <CaseStudyModal
          project={activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
          onOpenInquiry={onOpenInquiry}
        />
      </div>
    </section>
  );
}
