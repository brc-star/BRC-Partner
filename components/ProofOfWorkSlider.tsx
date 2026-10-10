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
    title: 'BRCTEX — Responsive Textile Website Showcase',
    category: 'Textile & Apparel E-Commerce',
    description: 'Full-scale B2B & D2C manufacturing platform featuring multi-device responsive fluidity and live yarn catalog.',
    imageUrl: '/images/slider/proof-of-work-01.webp',
    altText: 'BRCTEX Responsive Textile Website Showcase',
    badge: 'Slot 01 / 10',
  },
  {
    id: 'proof-slot-02',
    slotNumber: 2,
    title: 'DAXY — Diamond Luxury Showcase',
    category: 'Ultra-Luxury E-Commerce',
    description: 'Bespoke diamond atelier with 4K gemstone inspection, 360° ring customizer & GIA verification.',
    imageUrl: '/images/slider/proof-of-work-02.webp',
    altText: 'DAXY Diamond Luxury Showcase',
    badge: 'Slot 02 / 10',
  },
  {
    id: 'proof-slot-03',
    slotNumber: 3,
    title: 'DXMO — Fashion Responsive Showcase',
    category: 'Streetwear & Luxury Fashion',
    description: 'High-frequency streetwear storefront with dynamic lookbook, instant cart & omnichannel drops.',
    imageUrl: '/images/slider/proof-of-work-03.webp',
    altText: 'DXMO Fashion Responsive Showcase',
    badge: 'Slot 03 / 10',
  },
  {
    id: 'proof-slot-04',
    slotNumber: 4,
    title: 'DXMO — Industrial Machinery Website Showcase',
    category: 'Industrial B2B Portal',
    description: 'Precision engineering portal with interactive 5-axis CNC CAD specs & automated RFQ quotes.',
    imageUrl: '/images/slider/proof-of-work-04.webp',
    altText: 'DXMO Industrial Machinery Website Showcase',
    badge: 'Slot 04 / 10',
  },
  {
    id: 'proof-slot-05',
    slotNumber: 5,
    title: 'DXMO — Jewellery Website Luxury Mockup',
    category: 'Heritage Luxury Jewelry',
    description: 'Royal bridal jewelry showroom featuring high-definition loupe zoom and certified hallmark badges.',
    imageUrl: '/images/slider/proof-of-work-05.webp',
    altText: 'DXMO Jewellery Website Luxury Mockup',
    badge: 'Slot 05 / 10',
  },
  {
    id: 'proof-slot-06',
    slotNumber: 6,
    title: 'DXMO — Real Estate Device Showcase',
    category: 'Luxury Real Estate Portal',
    description: 'Architectural property portal with 3D virtual villa tours, interactive map pinning & mortgage tools.',
    imageUrl: '/images/slider/proof-of-work-06.webp',
    altText: 'DXMO Real Estate Device Showcase',
    badge: 'Slot 06 / 10',
  },
  {
    id: 'proof-slot-07',
    slotNumber: 7,
    title: 'Embroidery — Website Device Showcase',
    category: 'Custom Craftsmanship Studio',
    description: 'Computerized embroidery platform with automated vector-to-stitch preview and thread palette tools.',
    imageUrl: '/images/slider/proof-of-work-07.webp',
    altText: 'Embroidery Website Device Showcase',
    badge: 'Slot 07 / 10',
  },
  {
    id: 'proof-slot-08',
    slotNumber: 8,
    title: 'Pastel — Beauty & Wellness Website Mockup',
    category: 'Clean Beauty & Wellness',
    description: 'Clean skincare commerce with interactive routine builder, ingredient breakdown & eco packaging.',
    imageUrl: '/images/slider/proof-of-work-08.webp',
    altText: 'Pastel Beauty and Wellness Website Mockup',
    badge: 'Slot 08 / 10',
  },
  {
    id: 'proof-slot-09',
    slotNumber: 9,
    title: 'Responsive Dental Clinic — Website Showcase',
    category: 'Healthcare & Clinical Booking',
    description: 'Modern dental healthcare portal with before & after smile transformations and instant appointment scheduling.',
    imageUrl: '/images/slider/proof-of-work-09.webp',
    altText: 'Responsive Dental Clinic Website Showcase',
    badge: 'Slot 09 / 10',
  },
  {
    id: 'proof-slot-10',
    slotNumber: 10,
    title: 'TEXMO — Fashion Across Every Screen',
    category: 'Multi-Screen Responsive Matrix',
    description: 'Harmonized fashion ecosystem operating across Smart TV, Desktop Workstation, iPad & iPhone screens.',
    imageUrl: '/images/slider/proof-of-work-10.webp',
    altText: 'TEXMO Fashion Across Every Screen',
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
      className={`w-full text-left focus:outline-none ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Proof of Work Showcase Carousel"
    >
      {/* Outer Card with Clean Pure White Background (#FFFFFF) & Refined Shadow */}
      <div className="relative w-full rounded-2xl bg-[#FFFFFF] border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_40px_rgba(59,130,246,0.12)] p-2.5 sm:p-4 md:p-5 transition-all duration-300 hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 outline-none">
        {/* Subtle Tech Header Bar inside White Slider Box */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-slate-200/90 mb-3 sm:mb-4 text-xs bg-[#FFFFFF]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
            <span className="font-mono text-blue-700 font-bold tracking-wider text-[11px] sm:text-xs uppercase">
              Slot {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-700 font-semibold hidden sm:inline truncate max-w-xs sm:max-w-md lg:max-w-2xl">
              {currentSlide.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] sm:text-xs font-mono text-slate-700 font-medium shadow-xs">
              {hasImage ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Image Loaded</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-slate-700">Empty Slot</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* 16:9 and 2:1 Responsive White Display Area */}
        <div
          className="relative w-full aspect-[16/9] sm:aspect-[1774/887] rounded-xl overflow-hidden bg-[#FFFFFF] border border-slate-200/90 shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] group select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Technical Grid Blueprint Pattern on Pure White */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Soft White Ambient Tint */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/70 via-transparent to-blue-50/40 pointer-events-none" />

          {/* Slide Content */}
          {hasImage && currentSlide.imageUrl ? (
            <div className="relative w-full h-full bg-[#FFFFFF] flex items-center justify-center">
              <Image
                src={currentSlide.imageUrl}
                alt={currentSlide.altText || currentSlide.title}
                fill
                className="object-contain p-1 sm:p-2"
                sizes="100vw"
                priority={currentIndex === 0}
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            /* Clean, Elegant Placeholder for Empty Slot with Crisp Dark Navy Typography */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 text-center z-10 bg-[#FFFFFF]">
              {/* Subtle Icon Badge on White */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-blue-50/80 border border-blue-100 shadow-[0_4px_20px_rgba(37,99,235,0.12)] flex items-center justify-center text-blue-600 mb-4 transition-transform duration-300 group-hover:scale-105">
                <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" strokeWidth={1.5} />
              </div>

              {/* Required Exact Placeholder Text */}
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                Project Screenshot Coming Soon.
              </h3>

              {/* Slot Details & Meta */}
              <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-lg mt-2 leading-relaxed">
                {currentSlide.description || 'Verified production system screenshot and architectural verification.'}
              </p>

              {/* Helper Tag for Easy Customization */}
              <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] sm:text-xs text-slate-700 font-mono font-medium shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Slot {String(currentSlide.slotNumber).padStart(2, '0')}: {currentSlide.title}</span>
              </div>
            </div>
          )}

          {/* Previous Arrow Button - High-Contrast on White Background */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white border border-slate-200 hover:border-blue-500 text-slate-900 hover:text-blue-600 flex items-center justify-center backdrop-blur-md transition-all shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.22)] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Arrow Button - High-Contrast on White Background */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white border border-slate-200 hover:border-blue-500 text-slate-900 hover:text-blue-600 flex items-center justify-center backdrop-blur-md transition-all shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.22)] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Carousel Bottom Controls & Pagination Indicators */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-4 bg-[#FFFFFF]">
          {/* Slide Indicator Label */}
          <div className="text-xs sm:text-sm text-slate-600 font-mono flex items-center gap-2 order-2 sm:order-1">
            <span className="text-blue-700 font-bold">Slot {String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 font-semibold">{String(totalSlides).padStart(2, '0')}</span>
            <span className="text-slate-300 mx-1 hidden md:inline">•</span>
            <span className="text-slate-700 font-medium hidden md:inline truncate max-w-sm lg:max-w-md">{currentSlide.title}</span>
          </div>

          {/* 10 Pagination Indicators (All 10 slots clickable) */}
          <div
            className="flex items-center gap-1.5 sm:gap-2.5 order-1 sm:order-2"
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
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                    isActive
                      ? 'w-7 sm:w-10 h-2 sm:h-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_2px_8px_rgba(37,99,235,0.35)]'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-slate-200 hover:bg-slate-300 hover:scale-110'
                  }`}
                />
              );
            })}
          </div>

          {/* Quick Prev / Next Text Navigation for Mobile & Accessibility */}
          <div className="flex items-center gap-1.5 order-3">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] sm:text-xs font-mono text-slate-700 font-medium hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] sm:text-xs font-mono text-slate-700 font-medium hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
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
