'use client';

import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface HeroProps {
  onOpenInquiry: (serviceName?: string) => void;
  onOpenClaimProof?: (claimId: string) => void;
}

export function Hero({ onOpenInquiry }: HeroProps) {
  const heroSectionRef = useRef<HTMLElement>(null);

  // Hero Carousel State & Data
  const heroSlides = [
    {
      id: 'tech-partner-banner',
      title: 'BRC STAR Technology Partner Hero Banner',
      src: '/images/brc-star-technology-partner-hero-banner.jpg',
      alt: 'BRC STAR Technology Partner Hero Banner - Multi-device responsive software engineering showcase across laptop, tablet, and mobile',
    },
    {
      id: 'multi-device-tech-showcase',
      title: 'BRC STAR Multi-Device Tech Showcase',
      src: '/images/brc-star-multi-device-tech-showcase.jpg',
      alt: 'BRC STAR Multi-Device Tech Showcase - Comprehensive multi-platform web, mobile, and enterprise digital solutions showcase',
    },
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  React.useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHeroHovered, heroSlides.length]);

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextHeroSlide();
      } else {
        prevHeroSlide();
      }
    }
    touchStartXRef.current = null;
  };

  const defaultWhatsAppUrl = getWhatsAppUrl({
    industry: 'Business Consultation',
    requirement: 'High-Converting Website / Custom Software / AI Automation',
  });

  return (
    <section
      ref={heroSectionRef}
      id="hero-section"
      className="relative pt-[76px] pb-12 sm:pb-16 overflow-hidden bg-transparent"
      aria-labelledby="hero-headline"
    >
      {/* 1. Value Proposition, Approved Headline & Primary Conversion Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-700/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider shadow-inner font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span>BRC STAR PARTNER • FULL-STACK DIGITAL TECHNOLOGY PARTNER</span>
          </div>

          {/* Primary High-Converting Headline */}
          <h1
            id="hero-headline"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]"
          >
            High-Performance Websites, Custom Software &amp; AI Solutions{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
              for Growing Businesses
            </span>
          </h1>

          {/* Subheadline addressing Local Businesses, Textile/Manufacturing, and Startups */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From dental clinics and retail stores to textile mills and high-growth startups — we engineer fast websites, custom software, and AI automation that turn visitors into paying customers.
          </p>

          {/* Dual CTAs (Mobile-First) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto sm:max-w-none">
            {/* Primary Action Button */}
            <button
              id="hero-primary-cta"
              type="button"
              onClick={() => onOpenInquiry()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <span>Get a Free Project Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Action Button */}
            <a
              id="hero-secondary-cta"
              href="#showcase"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold text-sm sm:text-base border border-slate-300 dark:border-slate-700/80 transition-all duration-200"
            >
              <span>Explore Our Work</span>
            </a>
          </div>

          {/* Direct WhatsApp Quick-Chat Reassurance */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Or chat directly on WhatsApp:</span>
            </span>
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>+91 99131 59932</span>
              <span className="text-slate-400 dark:text-slate-500 font-normal text-xs">(Typically replies in under 15 minutes)</span>
            </a>
          </div>

          {/* Quick factual commitments */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>100% Source Code Ownership</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Starting at ₹29,999</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Zero Monthly Template Lock-In</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Full-Width Multi-Device Showcase Visual */}
      <div
        className="w-full relative select-none mt-4 sm:mt-6 border-y border-slate-200 dark:border-slate-800/80 shadow-md"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        <div
          className="relative w-full aspect-[1774/887] bg-[#FFFFFF] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Track */}
          <div
            className="w-full h-full flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentHeroSlide * 100}%)` }}
          >
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className="w-full h-full flex-shrink-0 flex items-center justify-center bg-[#FFFFFF]"
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="block w-full h-full object-contain object-center pointer-events-none"
                />
              </div>
            ))}
          </div>

          {/* Prev Slide Navigation Button */}
          <button
            type="button"
            onClick={prevHeroSlide}
            aria-label="Previous showcase slide"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-900/65 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 shadow-lg shadow-black/25 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Next Slide Navigation Button */}
          <button
            type="button"
            onClick={nextHeroSlide}
            aria-label="Next showcase slide"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-900/65 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 shadow-lg shadow-black/25 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-2.5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/15">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentHeroSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentHeroSlide === idx
                    ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-gradient-to-r from-blue-400 to-purple-400 shadow-sm'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
