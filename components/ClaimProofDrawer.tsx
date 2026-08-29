'use client';

import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Layers,
  ArrowRight,
  ExternalLink,
  Cpu,
  Terminal,
  Activity,
  Lock,
} from 'lucide-react';
import { ClaimItem } from '@/types/claim-proof';
import { CLAIM_STATUS_CONFIG, AUDITED_CLAIMS } from '@/lib/claim-proof-data';
import { ClaimBadge } from './ClaimBadge';

interface ClaimProofDrawerProps {
  claim: ClaimItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAnotherClaim?: (claim: ClaimItem) => void;
  onOpenInquiry?: (serviceName?: string) => void;
}

export function ClaimProofDrawer({
  claim,
  isOpen,
  onClose,
  onSelectAnotherClaim,
  onOpenInquiry,
}: ClaimProofDrawerProps) {
  if (!isOpen || !claim) return null;

  const config = CLAIM_STATUS_CONFIG[claim.status] || CLAIM_STATUS_CONFIG.VERIFIED;

  return (
    <div
      id="claim-proof-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="claim-proof-modal-content"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#080d18] border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
          aria-label="Close Claim Proof Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Classification Badge */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              BRC STAR Evidence Framework //
            </span>
            <ClaimBadge status={claim.status} size="md" showPulse />
            <span className="text-xs text-slate-500 font-mono">
              ID: #{claim.id}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {claim.claim}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            {claim.businessSummary}
          </p>
        </div>

        {/* Claim Status Explanation Callout */}
        <div className={`p-4 rounded-xl bg-[#0c1324] border ${config.borderClass} space-y-1.5`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${config.dotClass}`} />
            <span className="text-xs font-bold font-mono uppercase text-white">
              Status Definition: {config.label}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {config.description}
          </p>
        </div>

        {/* Evidence & Proof Card */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Evidence & Substantiation:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {claim.proof}
            </p>
          </div>

          {/* Verification & Context Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#070c17] border border-slate-800/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5 font-mono">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                How to Verify:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {claim.verification}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#070c17] border border-slate-800/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Engineering Context:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {claim.context}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details / Code Evidence if present */}
        {claim.technicalDetails && (
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Verified Technical Deliverables:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {claim.technicalDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Snippet Evidence if present */}
        {claim.evidenceCode && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-blue-400" />
                Source Code Artifact Evidence
              </span>
              <span>{claim.sourceReference}</span>
            </div>
            <pre className="p-4 rounded-xl bg-[#050810] border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              <code>{claim.evidenceCode}</code>
            </pre>
          </div>
        )}

        {/* Related Claims Navigation */}
        <div className="pt-2 border-t border-slate-800/80 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block font-mono">
            Browse Other Audited Claims:
          </span>
          <div className="flex flex-wrap gap-2">
            {AUDITED_CLAIMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectAnotherClaim && onSelectAnotherClaim(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all text-left flex items-center gap-2 ${
                  item.id === claim.id
                    ? 'bg-blue-600 text-white font-semibold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{item.claim.split(' ')[0]} {item.claim.split(' ')[1]}</span>
                <span className="text-[10px] opacity-75">({item.status.slice(0, 3)})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Close Proof Inspector
          </button>
          {onOpenInquiry && (
            <button
              onClick={() => {
                onClose();
                onOpenInquiry(`Technical Verification: ${claim.claim}`);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/30"
            >
              <span>Discuss Engineering Standards</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
