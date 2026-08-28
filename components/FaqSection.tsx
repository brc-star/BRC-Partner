'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { FAQ_DATA } from '@/lib/data';

interface FaqSectionProps {
  onOpenInquiry: () => void;
}

export function FaqSection({ onOpenInquiry }: FaqSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-24 bg-[#080d18] border-t border-slate-800/80 relative"
      aria-labelledby="faq-headline"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <span>Direct Answers</span>
          </div>

          <h2
            id="faq-headline"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Frequently Asked Questions
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Clear, candid answers regarding our engagement structure, architecture standards, codebase ownership, and post-launch partnership.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                id={`faq-item-${idx}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0c1324] border-blue-500/50 shadow-lg shadow-blue-950/30'
                    : 'bg-[#0a0f1d] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-600 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 animate-in fade-in duration-200">
                    <div className="pt-3 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#0a101e] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <span className="font-bold text-sm text-white">Have a specialized technical question?</span>
            <p className="text-xs text-slate-400">Speak directly with our senior full-stack engineering team.</p>
          </div>
          <button
            onClick={onOpenInquiry}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors flex items-center gap-2"
          >
            <span>Ask BRC STAR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
