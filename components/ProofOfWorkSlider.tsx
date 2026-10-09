'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export interface ProofOfWorkSlide {
  id: string;
  slotNumber: number;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  altText?: string;
  badge?: string;
}

export const DEFAULT_PROOF_OF_WORK_SLIDES: ProofOfWorkSlide[] = [
  {
    id: 'proof-slot-01',
    slotNumber: 1,
    title: 'Work Sample #01 — System Architecture',
    category: 'High-Scale Architecture',
    description: 'Production architecture telemetry & build verification screenshot.',
    imageUrl: '',
    altText: 'BRC STAR Proof of Work Screenshot 01',
    badge: 'Slot 01 / 10',
  },
  {
    id: 'proof-slot-02',
    slotNumber: 2,
    title: 'Work Sample #02 — Distributed Backend',
    category: 'Distributed Backend System',
    description: 'Database query telemetry & transaction verification snapshot.',
    imageUrl: '',
    altText: 'BRC STAR Proof of Work Screenshot 02',
    badge: 'Slot 02 / 10',
  },
  {
    id: 'proof-slot-03',
    slotNumber: 3,
    title: 'Work Sample #03 — Real-Time WebSocket Telemetry',
    category: 'Live WebSocket Stream',
    description: 'Sub-50ms live asset streaming & reactive dashboard state.',
    imageUrl: '',
    altText: 'BRC STAR Proof of Work Screenshot 03',
    badge: 'Slot 03 / 10',
  },
  {
    id: 'proof-slot-04',
    slotNumber: 4,
    title: 'Work Sample #04 — Double-Entry Ledger Engine',
    category: 'Double-Entry Ledger Audit',
    description: 'Cryptographic SHA-256 ledger checksum and isolated tenant schemas.',
    imageUrl: '',
    altText: 'BRC STAR Proof of Work Screenshot 04',
    badge: 'Slot 04 / 10',
  },
  {
    id: 'proof-slot-05',
    slotNumber: 5,
    title: 'Work Sample #05 — Document Workspace RAG',
    category: 'Vector RAG Pipeline',
    description: 'pgvector embedding pipeline & document citation verification.',
    imageUrl: '',
    altText: 'BRC STAR Proof of Work Screenshot 05',
    badge: 'Slot 05 / 10',
  },
  {
    id: 'proof-slot-06',
    slotNumber: 6,
    title: 'Work Sample #06 — Offline Mobile Reconciler',
    category: 'Offline Mobile Reconciler',
    description: 'Local SQLite persistence with deterministic asynchronous sync logic.',
    imageUrl: '',
    altText: 'BRC STAR Proof of Work Screenshot 06',
    badge: 'Slot 06 / 10',
  },
  {
    id: 'proof-slot-07',
    slotNumber: 7,
    title: 'Work Sample #07 — Zero-Trust Security & RBAC',
    category: 'Security & Compliance',
    description: 'Row-level security policies and JWT claims validation architecture.',
    imageUrl: '',
    altText: 'BRC STAR Proof of Work Screenshot 07',
    badge: 'Slot 07 / 10',
  },
  {
    id: 'proof-slot-08',
    slotNumber: 8,
    title: 'Work Sample #08 — Automated CI/CD & Build Verification',
    category: 'DevOps & Quality Assurance',
    description: 'Deterministic bundle analyzer & test suite execution report.',
    imageUrl: '',
    altText: 'BRC STAR Proof of Work Screenshot 08',
    badge: 'Slot 08 / 10',
  },
  {
    id: 'proof-slot-09',
    slotNumber: 9,
    title: 'Work Sample #09 — Multi-Region Edge Caching',
    category: 'Cloud & Infrastructure',
    description: 'Global CDN latency distribution & edge cache invalidation telemetry.',
    imageUrl: '',
    altText: 'BRC STAR Proof of Work Screenshot 09',
    badge: 'Slot 09 / 10',
  },
  {
    id: 'proof-slot-10',
    slotNumber: 10,
    title: 'Work Sample #10 — Live Production Audit & Telemetry',
    category: 'Live Engineering Benchmark',
    description: 'End-to-end verified delivery benchmark & sub-100ms response metrics.',
    imageUrl: '',
    altText: 'BRC STAR Proof of Work Screenshot 10',
    badge: 'Slot 10 / 10',
  },
];

interface ProofOfWorkSliderProps {
  slides?: ProofOfWorkSlide[];
  className?: string;
  enableAutoplay?: boolean;
}

export function ProofOfWorkSlider({
  slides = DEFAULT_PROOF_OF_WORK_SLIDES,
  className = '',
  enableAutoplay = false,
}: ProofOfWorkSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const deltaX = touchStartXRef.current - touchEndXRef.current;
      if (deltaX > 40) {
        nextSlide();
      } else if (deltaX < -40) {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const currentSlide = slides[currentIndex] || slides[0];
  const hasImage = Boolean(currentSlide.imageUrl && currentSlide.imageUrl.trim().length > 0);

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-5xl mx-auto my-6 sm:my-8 text-left ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Proof of Work Showcase Carousel"
    >
      {/* Outer Card with Refined Border and Ambient Dark-Mode Glow */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#0a1020] to-[#050811] border border-slate-800/90 shadow-[0_12px_40px_rgba(2,6,23,0.7)] p-2 sm:p-3 md:p-4 transition-all duration-300 hover:border-slate-700/80 focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/30 outline-none">
        {/* Subtle Tech Header Bar inside Slider Box */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/70 mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-cyan-300 font-semibold tracking-wider text-[11px] uppercase">
              Slot {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 font-medium hidden sm:inline truncate max-w-[240px] md:max-w-md">
              {currentSlide.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-slate-400">
              {hasImage ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Image Loaded</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3 h-3 text-cyan-400" />
                  <span>Empty Slot</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* 16:9 and 2:1 Responsive Display Area */}
        <div
          className="relative w-full aspect-[16/9] sm:aspect-[1774/887] rounded-xl overflow-hidden bg-[#070b16] border border-slate-800/80 shadow-inner group select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Cyber Grid Background Pattern for Empty State */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Ambient Lighting Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/30 via-slate-900/10 to-cyan-950/20 pointer-events-none" />

          {/* Slide Content */}
          {hasImage && currentSlide.imageUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={currentSlide.imageUrl}
                alt={currentSlide.altText || currentSlide.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                priority={currentIndex === 0}
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            /* Clean, Elegant Placeholder for Empty Slot */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              {/* Subtle Icon Badge */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-[#0b1329] border border-cyan-900/50 shadow-[0_0_25px_rgba(6,182,212,0.12)] flex items-center justify-center text-cyan-400 mb-4 transition-transform duration-300 group-hover:scale-105">
                <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-cyan-400/90" strokeWidth={1.5} />
              </div>

              {/* Required Exact Placeholder Text */}
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
                Project Screenshot Coming Soon.
              </h3>

              {/* Slot Details & Meta */}
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-1.5 leading-relaxed">
                {currentSlide.description || 'Verified production system screenshot and architectural verification.'}
              </p>

              {/* Helper Tag for Easy Customization */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Slot {String(currentSlide.slotNumber).padStart(2, '0')}: {currentSlide.title}</span>
              </div>
            </div>
          )}

          {/* Previous Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/80 hover:bg-cyan-950/90 border border-slate-800 hover:border-cyan-500/60 text-slate-300 hover:text-cyan-300 flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/80 hover:bg-cyan-950/90 border border-slate-800 hover:border-cyan-500/60 text-slate-300 hover:text-cyan-300 flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Carousel Bottom Controls & Pagination Indicators */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
          {/* Slide Indicator Label */}
          <div className="text-xs text-slate-400 font-mono flex items-center gap-2 order-2 sm:order-1">
            <span className="text-cyan-400 font-semibold">Slot {String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{String(totalSlides).padStart(2, '0')}</span>
            <span className="text-slate-600 mx-1 hidden md:inline">•</span>
            <span className="text-slate-400 hidden md:inline truncate max-w-xs">{currentSlide.title}</span>
          </div>

          {/* 10 Pagination Indicators (All 10 slots clickable) */}
          <div
            className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2"
            role="tablist"
            aria-label="Slide indicators"
          >
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer ${
                    isActive
                      ? 'w-6 sm:w-8 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                      : 'w-2 h-2 bg-slate-700 hover:bg-slate-500 hover:scale-110'
                  }`}
                />
              );
            })}
          </div>

          {/* Quick Prev / Next Text Navigation for Mobile & Accessibility */}
          <div className="flex items-center gap-1 order-3">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
