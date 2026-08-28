'use client';

import React from 'react';
import { X, CheckCircle2, Cpu, Layers, Shield, ArrowRight, ExternalLink } from 'lucide-react';
import { ProjectShowcaseItem } from '@/types';

interface CaseStudyModalProps {
  project: ProjectShowcaseItem | null;
  onClose: () => void;
  onOpenInquiry: (serviceName?: string) => void;
}

export function CaseStudyModal({ project, onClose, onOpenInquiry }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <div
      id="case-study-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="case-study-modal-content"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b1120] border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
          aria-label="Close Case Study Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-800/60 font-mono">
              {project.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {project.type}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
          <p className="text-sm text-slate-300 font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Metrics Grid */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#070d18] border border-slate-800">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <span className="text-[11px] text-slate-400 block">{metric.label}</span>
                <span className="text-lg font-bold text-blue-400">{metric.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              The Challenge
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              The Engineered Solution
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Capabilities */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Engineered Capabilities:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.keyCapabilities.map((cap, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="p-4 rounded-xl bg-[#080e1a] border border-blue-900/40 space-y-2">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase">
            <Layers className="w-4 h-4" />
            <span>Architecture & Data Flow</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {project.architectureOverview}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Technology Stack:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1 rounded bg-slate-900 border border-slate-800 text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Close Overview
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenInquiry(project.title);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/30"
          >
            <span>Start Similar Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
