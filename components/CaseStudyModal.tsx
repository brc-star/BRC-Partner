'use client';

import React from 'react';
import {
  X,
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Terminal,
  FileCheck2,
} from 'lucide-react';
import { ProjectShowcaseItem } from '@/types';
import { ClaimBadge } from './ClaimBadge';

interface CaseStudyModalProps {
  project: ProjectShowcaseItem | null;
  onClose: () => void;
  onOpenInquiry: (serviceName?: string) => void;
  onOpenClaimProof?: (claimId: string) => void;
}

export function CaseStudyModal({
  project,
  onClose,
  onOpenInquiry,
  onOpenClaimProof,
}: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <div
      id="case-study-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="case-study-modal-content"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090f1d] border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 text-left animate-in zoom-in-95 duration-200"
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

        {/* Header with Classification Badge */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-800/60 font-mono">
              {project.category}
            </span>
            <ClaimBadge status={project.proofStatus} size="sm" showPulse />
            <span className="text-xs font-mono text-slate-400">
              [{project.demonstrationType}]
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>

          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Transparency Banner */}
        <div className="p-3.5 rounded-xl bg-[#060a14] border border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Integrity Standard:</strong> This case study is categorized as an{' '}
              <strong className="text-white">{project.demonstrationType}</strong>. All architecture descriptions reflect actual code patterns.
            </span>
          </div>
          {project.claimId && onOpenClaimProof && (
            <button
              onClick={() => onOpenClaimProof(project.claimId!)}
              className="text-blue-400 hover:text-blue-300 font-mono text-[11px] underline shrink-0 cursor-pointer"
            >
              Inspect Proof Record
            </button>
          )}
        </div>

        {/* Verified Capability Metrics Grid */}
        {project.metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#070d18] border border-slate-800">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-left sm:text-center space-y-0.5">
                <span className="text-[11px] text-slate-400 font-mono block">{metric.label}</span>
                <span className="text-lg font-bold text-blue-400 font-mono block">{metric.value}</span>
                {metric.note && (
                  <span className="text-[10px] text-slate-500 block leading-tight">{metric.note}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Business &amp; Technical Challenge:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              The Engineered Solution:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Capabilities */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
            Delivered Technical Capabilities:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.keyCapabilities.map((cap, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-900/40 border border-slate-800/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture & Data Flow */}
        <div className="p-4 rounded-xl bg-[#060a14] border border-blue-900/40 space-y-2">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase font-mono">
            <Layers className="w-4 h-4" />
            <span>Architecture &amp; Data Flow Overview</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {project.architectureOverview}
          </p>
        </div>

        {/* Proof Evidence & Verification Method if present */}
        {project.proofEvidence && (
          <div className="p-4 rounded-xl bg-[#060a14] border border-emerald-900/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase font-mono">
              <FileCheck2 className="w-4 h-4" />
              <span>Evidence &amp; Verification Method</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Evidence:</strong> {project.proofEvidence}
            </p>
            {project.verificationMethod && (
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>How to Verify:</strong> {project.verificationMethod}
              </p>
            )}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Technology Stack Employed:
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
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Overview
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenInquiry(project.title);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/30 cursor-pointer"
          >
            <span>Discuss Solution Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

