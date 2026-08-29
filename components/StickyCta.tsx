'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, X, MessageSquare } from 'lucide-react';

interface StickyCtaProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export function StickyCta({ onOpenInquiry }: StickyCtaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past roughly 450px (after hero section)
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Desktop Floating Pill (Bottom-Right) */}
      <aside
        aria-label="Quick Project Inquiry"
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-3 p-2 pl-4 rounded-2xl bg-[#0a1122]/95 border border-blue-500/40 shadow-2xl shadow-blue-950/60 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-slate-200">
            Have a project in mind?
          </span>
        </div>

        <button
          onClick={() => onOpenInquiry('General Inquiry')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsDismissed(true)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          title="Dismiss quick action"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </aside>

      {/* Mobile Floating Bottom Bar */}
      <aside
        aria-label="Quick Project Inquiry Mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#080d19]/95 border-t border-blue-900/50 shadow-2xl backdrop-blur-lg flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300"
      >
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-mono text-emerald-400 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for Q3/Q4
          </span>
          <span className="text-xs font-bold text-white">
            BRC STAR Tech Partner
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenInquiry('Mobile Sticky CTA')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 active:scale-95 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
}
