'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Search,
} from 'lucide-react';
import { FAQ_DATA } from '@/lib/data';

interface FaqSectionProps {
  onOpenInquiry: () => void;
}

export function FaqSection({ onOpenInquiry }: FaqSectionProps) {
  // Allow multiple FAQ items to stay open independently so users can compare answers
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({
    0: true, // first item open by default
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(FAQ_DATA.map((f) => f.category)))];

  const toggleFaq = (idx: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<number, boolean> = {};
    FAQ_DATA.forEach((_, idx) => {
      allOpen[idx] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="faq"
      className="py-24 bg-[#080d18] border-t border-slate-800/80 relative"
      aria-labelledby="faq-headline"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Direct Answers &amp; Transparency</span>
          </div>

          <h2
            id="faq-headline"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Frequently Asked Questions
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Clear, candid answers regarding our engagement structure, architecture standards, codebase ownership, and post-launch partnership.
          </p>
        </div>

        {/* Filter & Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Expand / Collapse All Controls */}
          <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 self-end sm:self-auto">
            <button
              onClick={expandAll}
              className="hover:text-blue-400 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={collapseAll}
              className="hover:text-blue-400 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-sm">
              No matching questions found. Try searching for another topic or{' '}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-blue-400 underline hover:text-blue-300"
              >
                reset filters
              </button>
              .
            </div>
          ) : (
            filteredFaqs.map((faq, originalIdx) => {
              // Find index in main FAQ_DATA to maintain stable open state
              const itemIdx = FAQ_DATA.findIndex((f) => f.question === faq.question);
              const isOpen = Boolean(openItems[itemIdx]);

              return (
                <div
                  key={faq.question}
                  id={`faq-item-${itemIdx}`}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#0c1324] border-blue-500/50 shadow-lg shadow-blue-950/30'
                      : 'bg-[#0a0f1d] border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(itemIdx)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500/50 rounded-2xl"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${itemIdx}`}
                    id={`faq-btn-${itemIdx}`}
                  >
                    <div className="space-y-1.5 pr-2">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/70 border border-blue-800/60 px-2 py-0.5 rounded inline-block">
                        {faq.category}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 mt-1 ${
                        isOpen
                          ? 'rotate-180 bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'bg-slate-800/90 text-slate-400 hover:text-white'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${itemIdx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${itemIdx}`}
                      className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 animate-in fade-in duration-200"
                    >
                      <div className="pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                        <p>{faq.answer}</p>
                        
                        {/* Quick Trust Highlights per question category */}
                        {faq.category === 'Ownership & Code' && (
                          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/50 flex items-center gap-2.5 text-xs text-emerald-300 font-mono">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>100% IP &amp; Git Repository Handover on Completion — Zero Lock-In</span>
                          </div>
                        )}

                        {faq.category === 'Process & Timeline' && (
                          <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/50 flex items-center gap-2.5 text-xs text-blue-300 font-mono">
                            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                            <span>Bi-Weekly Live Staging Demos &amp; Sprint Releases Included</span>
                          </div>
                        )}

                        {faq.category === 'Support & Maintenance' && (
                          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/50 flex items-center gap-2.5 text-xs text-purple-300 font-mono">
                            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                            <span>Initial Post-Launch Warranty Included on All Tier Deliveries</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#0a101e] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <span className="font-bold text-sm text-white block">Have a specialized technical or architectural question?</span>
            <p className="text-xs text-slate-400">Speak directly with our senior full-stack engineering team.</p>
          </div>
          <button
            onClick={onOpenInquiry}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <span>Ask BRC STAR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
