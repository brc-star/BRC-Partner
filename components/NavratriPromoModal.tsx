'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  X,
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { NAVRATRI_CAMPAIGN, isValidRazorpayUrl } from '@/lib/campaign-config';

export function NavratriPromoModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  // Check route exclusion
  const isExcludedRoute = useCallback((path: string) => {
    return NAVRATRI_CAMPAIGN.excludedRoutes.some((route) => path.startsWith(route));
  }, []);

  // Initialize or resume countdown timer
  const initializeTimer = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const now = Date.now();
      const storedExpiry = localStorage.getItem(NAVRATRI_CAMPAIGN.storageKeyTimer);

      let expiryTimestamp: number;

      if (storedExpiry) {
        expiryTimestamp = parseInt(storedExpiry, 10);
      } else {
        expiryTimestamp = now + NAVRATRI_CAMPAIGN.countdownMinutes * 60 * 1000;
        localStorage.setItem(NAVRATRI_CAMPAIGN.storageKeyTimer, expiryTimestamp.toString());
      }

      const diffSeconds = Math.max(0, Math.floor((expiryTimestamp - now) / 1000));

      if (diffSeconds <= 0) {
        setSecondsRemaining(0);
        setIsExpired(true);
      } else {
        setSecondsRemaining(diffSeconds);
        setIsExpired(false);
      }
    } catch {
      // Fallback if localStorage is disabled
      setSecondsRemaining(NAVRATRI_CAMPAIGN.countdownMinutes * 60);
      setIsExpired(false);
    }
  }, []);

  // Handle dismiss
  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(NAVRATRI_CAMPAIGN.storageKeyDismissed, Date.now().toString());
      } catch {
        // Safe ignore
      }
    }
  }, []);

  // Check frequency cap & eligibility on mount or route change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isExcludedRoute(pathname)) {
      setIsOpen(false);
      return;
    }

    try {
      const dismissedTimestamp = localStorage.getItem(NAVRATRI_CAMPAIGN.storageKeyDismissed);
      if (dismissedTimestamp) {
        const lastDismissed = parseInt(dismissedTimestamp, 10);
        const daysPassed = (Date.now() - lastDismissed) / (1000 * 60 * 60 * 24);
        if (daysPassed < NAVRATRI_CAMPAIGN.frequencyDays) {
          // Still within frequency cap window
          return;
        }
      }
    } catch {
      // Safe ignore
    }

    // Trigger popup after configured delay
    const timer = setTimeout(() => {
      initializeTimer();
      setIsOpen(true);
    }, NAVRATRI_CAMPAIGN.popupDelayMs);

    return () => clearTimeout(timer);
  }, [pathname, isExcludedRoute, initializeTimer]);

  // Tick the countdown every second while open
  useEffect(() => {
    if (!isOpen || secondsRemaining === null) return;
    if (secondsRemaining <= 0) {
      setIsExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev === null || prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, secondsRemaining]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleDismiss]);

  if (!isOpen) return null;

  // Format MM:SS
  const mins = secondsRemaining !== null ? Math.floor(secondsRemaining / 60) : 5;
  const secs = secondsRemaining !== null ? secondsRemaining % 60 : 0;
  const formattedMinutes = mins.toString().padStart(2, '0');
  const formattedSeconds = secs.toString().padStart(2, '0');

  const isRazorpayConfigured = isValidRazorpayUrl(NAVRATRI_CAMPAIGN.razorpayPaymentUrl);

  return (
    <div
      id="navratri-promo-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 select-none print:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="navratri-promo-headline"
    >
      <div
        id="navratri-promo-content"
        className="relative w-full max-w-lg rounded-3xl bg-[#0a101f] border border-amber-500/40 shadow-2xl shadow-amber-500/10 p-6 sm:p-8 text-white space-y-6 overflow-hidden text-center animate-in zoom-in-95 duration-200"
      >
        {/* Decorative Festive Ambient Gradient Orbs */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 z-20"
          aria-label="Close promotional offer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{NAVRATRI_CAMPAIGN.badge}</span>
        </div>

        {/* Headline & Subhead */}
        <div className="space-y-2">
          <h2
            id="navratri-promo-headline"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight"
          >
            {NAVRATRI_CAMPAIGN.headline}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            {NAVRATRI_CAMPAIGN.subheadline}
          </p>
        </div>

        {/* Genuine 5-Minute Countdown Timer Widget */}
        <div className="p-4 rounded-2xl bg-[#060a14] border border-slate-800 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-mono uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Session Offer Closes In:</span>
          </div>

          <div className="flex items-center justify-center gap-2 font-mono">
            {/* Minutes Box */}
            <div className="flex flex-col items-center">
              <span className="w-14 sm:w-16 py-2 rounded-xl bg-slate-900 border border-amber-500/30 text-2xl sm:text-3xl font-extrabold text-amber-300 shadow-inner">
                {formattedMinutes}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 uppercase">Minutes</span>
            </div>

            <span className="text-2xl font-bold text-amber-400 mb-4">:</span>

            {/* Seconds Box */}
            <div className="flex flex-col items-center">
              <span className="w-14 sm:w-16 py-2 rounded-xl bg-slate-900 border border-amber-500/30 text-2xl sm:text-3xl font-extrabold text-amber-300 shadow-inner">
                {formattedSeconds}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 uppercase">Seconds</span>
            </div>
          </div>

          {isExpired && (
            <div className="pt-1 flex items-center justify-center gap-1 text-xs text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Special session offer window has expired.</span>
            </div>
          )}
        </div>

        {/* Package & Pricing Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0e1628] to-[#0a101f] border border-blue-500/30 text-left space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                Eligible Festive Package
              </span>
              <h3 className="text-base font-bold text-white">
                {NAVRATRI_CAMPAIGN.packageName}
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold shrink-0">
              50% OFF
            </span>
          </div>

          {/* Pricing Calculation */}
          <div className="flex items-baseline gap-3 pt-1 border-t border-slate-800">
            <span className="text-sm text-slate-400 line-through font-mono">
              {NAVRATRI_CAMPAIGN.formattedOriginalPrice}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              {NAVRATRI_CAMPAIGN.formattedDiscountedPrice}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">one-time</span>
          </div>

          <p className="text-[11px] text-slate-400 leading-snug">
            {NAVRATRI_CAMPAIGN.gstNote}
          </p>
        </div>

        {/* CTAs */}
        <div className="space-y-2.5 pt-1">
          {/* Primary CTA (Disabled if expired or invalid URL) */}
          {!isExpired && isRazorpayConfigured ? (
            <a
              href={NAVRATRI_CAMPAIGN.razorpayPaymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDismiss}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <span>CLAIM YOUR 50% OFF</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="w-full py-3.5 px-6 rounded-xl bg-slate-800 text-slate-500 font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>{isExpired ? '50% OFF Offer Expired' : 'Payment Link Unavailable'}</span>
            </button>
          )}

          {/* Secondary CTA */}
          <Link
            href="/#solutions"
            onClick={handleDismiss}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Explore Services</span>
          </Link>
        </div>

        {/* Trust & Guarantee Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-mono pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Official Razorpay Hosted Payment Page • 100% Secure</span>
        </div>
      </div>
    </div>
  );
}
