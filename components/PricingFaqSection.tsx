'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

interface PricingFaqSectionProps {
  market?: 'india' | 'international';
  onRequestQuote?: (serviceName?: string) => void;
}

export function PricingFaqSection({ market = 'india', onRequestQuote }: PricingFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: 'Is the displayed price final?',
      a:
        market === 'international'
          ? 'No, all prices shown are "Starting from" baseline benchmarks for typical foundational or MVP scopes. Final pricing depends on project scope, custom features, third-party integrations, design complexity, timeline requirements, and deployment specifications. Following our initial technical discovery consultation, we provide an itemized, fixed-price Statement of Work (SOW) with zero unexpected retainers.'
          : 'No, all displayed prices are "Starting from" baseline rates for standard project scopes. Final pricing depends on your exact feature set, custom integrations, design complexity, timeline, and deployment requirements. After an initial technical consultation, you receive a detailed, fixed-milestone proposal with zero hidden charges.',
    },
    {
      q: 'What is included in the deliverables?',
      a:
        market === 'international'
          ? 'Every engagement includes 100% intellectual property (IP) transfer, full source code Git repository handover, production CI/CD setup, database architecture scripts, technical documentation, API specifications, and an included 30 to 90-day post-launch warranty with dedicated bug-fix support.'
          : 'Every project includes 100% client IP ownership, complete source code repository handover, automated deployment, database schemas, and a 30 to 90-day post-launch warranty covering any technical bugs or performance adjustments.',
    },
    {
      q: 'How does project estimation work?',
      a:
        market === 'international'
          ? 'Our estimation framework follows a structured agile model: 1) Initial Technical Discovery & Architecture Review; 2) Milestone Breakdown & Effort Estimation (Sprint-based); 3) SOW Execution with a 50% Kickoff Deposit; 4) Iterative Sprint Previews; and 5) Final Acceptance & Production Handover.'
          : 'We break your requirements into clear sprint milestones. Projects begin with an initial kickoff deposit (typically 50%), and the remaining balance is linked directly to reviewed staging deliverables and final acceptance testing. You only pay for verified progress.',
    },
    {
      q: 'Can I request a custom package or phased rollout?',
      a:
        market === 'international'
          ? 'Yes, absolutely. Many of our clients start with a Phase 1 MVP to test user validation, then expand into Phase 2 scaling sprints or transition into our Dedicated Engineering Retainer. We can tailor an agile proposal to fit your specific product roadmap.'
          : 'Yes. If your requirements span multi-platform ecosystems or custom integrations, we create custom phased proposals. You can launch an MVP first and roll out advanced modules in subsequent sprints.',
    },
    {
      q: 'What payment methods are available?',
      a:
        market === 'international'
          ? 'For US & International clients, we accept USD ($) payments via International Credit/Debit Cards, Stripe Invoicing, Apple Pay, and Direct Wire Transfers (ACH / SWIFT wire). We provide formal international commercial invoices with full tax documentation.'
          : 'For Indian clients, we accept INR (₹) payments via Razorpay (UPI, NetBanking, Corporate Credit/Debit Cards, NEFT/RTGS). All transactions receive official GST-compliant tax invoices with itemized SAC classification (SAC: 998314).',
    },
    {
      q: 'Do you provide maintenance/AMC after launch?',
      a:
        market === 'international'
          ? 'Yes. We offer continuous Monthly SLA & DevOps Retainers covering 24/7 uptime monitoring, security vulnerability patching, daily automated backups, framework upgrades, and dedicated engineering hours for ongoing feature enhancements.'
          : 'Yes. We provide flexible Monthly Maintenance & AMC plans covering 24/7 uptime monitoring, daily backups, framework security updates, and dedicated hours each month for feature additions and content updates.',
    },
  ];

  return (
    <section id="pricing-faq-section" className="py-20 bg-[#050811] relative border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Clear Answers to Pricing &amp; Engagements
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need to know about our milestone frameworks, deliverables, and payment models.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0d1428] border-blue-500/50 shadow-lg shadow-blue-950/40'
                    : 'bg-[#0a0f1d] border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4.5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-600/20 text-blue-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-150">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 to-indigo-950/30 border border-blue-800/40 text-center space-y-3">
          <p className="text-xs sm:text-sm text-slate-300">
            Have a custom architecture question or need an NDA signed before sharing your SOW?
          </p>
          <div>
            <button
              type="button"
              onClick={() => onRequestQuote && onRequestQuote('Custom Technical Consultation')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Speak with a Senior Tech Architect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
