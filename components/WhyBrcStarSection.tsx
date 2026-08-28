'use client';

import React from 'react';
import {
  Target,
  Layers,
  Shield,
  Handshake,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Cpu,
  Lock,
  GitBranch,
} from 'lucide-react';
import { DIFFERENTIATION_POINTS } from '@/lib/data';

const iconMap = {
  Target: Target,
  Layers: Layers,
  Shield: Shield,
  Handshake: Handshake,
};

interface WhyBrcStarSectionProps {
  onOpenInquiry: () => void;
}

export function WhyBrcStarSection({ onOpenInquiry }: WhyBrcStarSectionProps) {
  const comparisonMatrix = [
    {
      factor: 'Discovery & Requirements',
      brcStar: 'Commercial economics, operational workflows, and executive system architecture blueprints.',
      agencies: 'Generic questionnaires; quick rush to billable design mocks.',
      freelancers: 'Often skip discovery; build whatever is immediately asked.',
    },
    {
      factor: 'Code Quality & Tech Stack',
      brcStar: 'Next.js 16/15, TypeScript, clean modular domain boundaries, 100% bespoke.',
      agencies: 'WordPress templates, heavy plugins, bloated page builders.',
      freelancers: 'Variable; fragmented copy-pasted code with little documentation.',
    },
    {
      factor: 'Security & Compliance',
      brcStar: 'OWASP Top 10 hardening, role-based access (RBAC), KMS encryption, SOC2 alignment.',
      agencies: 'Vulnerable plugin ecosystems; passive security approach.',
      freelancers: 'Basic validation; usually lack enterprise compliance expertise.',
    },
    {
      factor: 'Performance Standards',
      brcStar: 'Target 95+ Core Web Vitals, sub-second LCP, edge-cached assets.',
      agencies: '3–5 second load times bogged down by tracking scripts.',
      freelancers: 'Rarely optimized for Core Web Vitals or mobile networks.',
    },
    {
      factor: 'IP Ownership & Deployment',
      brcStar: '100% intellectual property transfer, automated CI/CD staging, clean repos.',
      agencies: 'Proprietary platform lock-in or recurring proprietary hosting fees.',
      freelancers: 'Manual FTP uploads; often leave client without documentation.',
    },
    {
      factor: 'Long-Term Partnership',
      brcStar: 'Dedicated technical leads, continuous feature roadmaps, proactive SLA monitoring.',
      agencies: 'Passed off to junior account managers post-launch.',
      freelancers: 'High risk of unavailability or abandoning project post-delivery.',
    },
  ];

  return (
    <section
      id="why-us"
      className="py-24 bg-[#080d18] border-t border-slate-800/80 relative"
      aria-labelledby="why-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <span>The Engineering Distinction</span>
          </div>

          <h2
            id="why-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            “We don&apos;t start with a template.{' '}
            <span className="text-blue-400">We start by understanding the business.”</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            BRC STAR was founded to bridge the gap between creative visual execution and rigorous full-stack software engineering.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {DIFFERENTIATION_POINTS.map((point, idx) => {
            const IconComponent = iconMap[point.icon as keyof typeof iconMap] || Target;
            return (
              <div
                key={point.title}
                id={`diff-point-${idx}`}
                className="rounded-2xl bg-[#0c1324] border border-slate-800 p-6 sm:p-8 space-y-5 hover:border-blue-500/40 transition-all shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 shadow-inner shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {point.title}
                    </h3>
                    <p className="text-xs text-blue-400 font-medium">
                      {point.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {point.description}
                </p>

                {/* Comparison Callout */}
                <div className="space-y-2 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#070c17] border border-blue-900/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-300 block mb-0.5">The BRC STAR Standard:</strong>
                      <span className="text-slate-300">{point.brcApproach}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#070c17] border border-slate-800 flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-400 block mb-0.5">Common Industry Alternative:</strong>
                      <span className="text-slate-500">{point.othersApproach}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Full-Stack Partner vs. Traditional Alternatives
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              How BRC STAR compares directly across critical software delivery dimensions.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0c1324] shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 bg-[#080e1a]">
                  <th className="py-4 px-5 font-semibold text-slate-300 w-1/4">Evaluation Dimension</th>
                  <th className="py-4 px-5 font-bold text-blue-400 w-1/3 bg-blue-950/20 border-x border-blue-900/40">
                    BRC STAR Technology Partner
                  </th>
                  <th className="py-4 px-5 font-medium text-slate-400 w-1/5">Generic Digital Agency</th>
                  <th className="py-4 px-5 font-medium text-slate-400 w-1/5">Freelance Developers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {comparisonMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-5 font-semibold text-slate-200">
                      {row.factor}
                    </td>
                    <td className="py-4 px-5 text-slate-200 bg-blue-950/10 border-x border-blue-900/30 font-medium">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{row.brcStar}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-400">
                      {row.agencies}
                    </td>
                    <td className="py-4 px-5 text-slate-500">
                      {row.freelancers}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenInquiry}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30"
          >
            <span>Partner with BRC STAR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
