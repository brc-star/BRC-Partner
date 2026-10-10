'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PortfolioSlide {
  id: string;
  number: string;
  title: string;
  badge: string;
  category: string;
  imageSrc: string;
  altText: string;
}

export const PORTFOLIO_SLIDES: PortfolioSlide[] = [
  {
    id: 'daxy-diamond',
    number: '01',
    title: 'DAXY Diamond Luxury Showcase',
    badge: 'LUXURY JEWELLERY & DIAMONDS',
    category: 'Ultra-Luxury E-Commerce & Virtual Concierge',
    imageSrc: '/Images/DAXY Diamond Luxury Showcase.png',
    altText: 'DAXY Diamond Luxury Showcase portfolio project by BRC STAR Partner',
  },
  {
    id: 'dxmo-jewellery',
    number: '02',
    title: 'DXMO Jewellery Website Luxury Showcase',
    badge: 'FINE JEWELLERY BOUTIQUE',
    category: 'High-Converting Digital Flagship & Custom Catalog',
    imageSrc: '/Images/DXMO Jewellery Website Luxury Mockup.png',
    altText: 'DXMO Jewellery Website Luxury Showcase portfolio project by BRC STAR Partner',
  },
  {
    id: 'dxmo-industrial',
    number: '03',
    title: 'DXMO Industrial Machinery Website Showcase',
    badge: 'INDUSTRIAL ENGINEERING & B2B',
    category: 'Heavy Equipment Portal & Interactive Spec Matrix',
    imageSrc: '/Images/DXMO Industrial Machinery Website Showcase.png',
    altText: 'DXMO Industrial Machinery Website Showcase portfolio project by BRC STAR Partner',
  },
  {
    id: 'dxmo-real-estate',
    number: '04',
    title: 'DXMO Real Estate Device Showcase',
    badge: 'PROPTECH & LUXURY REAL ESTATE',
    category: 'Interactive Floorplans & Dynamic Property Engine',
    imageSrc: '/Images/DXMO Real Estate Device Showcase.png',
    altText: 'DXMO Real Estate Device Showcase portfolio project by BRC STAR Partner',
  },
  {
    id: 'dxmo-fashion',
    number: '05',
    title: 'DXMO Fashion Responsive Showcase',
    badge: 'DTC HIGH-FASHION APPAREL',
    category: 'Omnichannel Apparel Storefront & Lookbook Engine',
    imageSrc: '/Images/DXMO Fashion Responsive Showcase.png',
    altText: 'DXMO Fashion Responsive Showcase portfolio project by BRC STAR Partner',
  },
  {
    id: 'brctex-textile',
    number: '06',
    title: 'BRCtex Responsive Textile Website Showcase',
    badge: 'GLOBAL TEXTILE MANUFACTURING',
    category: 'B2B Yarn & Fabric Sourcing Enterprise Platform',
    imageSrc: '/Images/Brctex Responsive Textile Website Showcase.png',
    altText: 'BRCtex Responsive Textile Website Showcase portfolio project by BRC STAR Partner',
  },
  {
    id: 'embroidery-showcase',
    number: '07',
    title: 'Embroidery Website Device Showcase',
    badge: 'BESPOKE ARTISAN CRAFTSMANSHIP',
    category: 'Custom Needlework & High-Precision Pattern Studio',
    imageSrc: '/Images/Embroidery Website Device Showcase.png',
    altText: 'Embroidery Website Device Showcase portfolio project by BRC STAR Partner',
  },
  {
    id: 'pastel-beauty',
    number: '08',
    title: 'Pastel Beauty and Wellness Website Mockup',
    badge: 'WELLNESS & ORGANIC COSMETICS',
    category: 'Clean Aesthetic Lifestyle Brand & Booking Suite',
    imageSrc: '/Images/Pastel Beauty and Wellness Website Mockup.png',
    altText: 'Pastel Beauty and Wellness Website Mockup portfolio project by BRC STAR Partner',
  },
  {
    id: 'dental-clinic',
    number: '09',
    title: 'Responsive Dental Clinic Website Showcase',
    badge: 'HEALTHCARE & CLINICAL DENTISTRY',
    category: 'Patient Onboarding & Real-Time Tele-Appointment Hub',
    imageSrc: '/Images/Responsive Dental Clinic Website Showcase.png',
    altText: 'Responsive Dental Clinic Website Showcase portfolio project by BRC STAR Partner',
  },
  {
    id: 'texmo-fashion',
    number: '10',
    title: 'TEXMO Fashion Across Every Screen',
    badge: 'MULTI-DEVICE APPAREL COMMERCE',
    category: 'Adaptive Viewport Grid & Next-Gen Style Navigator',
    imageSrc: '/Images/TEXMO Fashion Across Every Screen.png',
    altText: 'TEXMO Fashion Across Every Screen portfolio project by BRC STAR Partner',
  },
];

const AUTOPLAY_INTERVAL = 5500;

export function HomepageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = PORTFOLIO_SLIDES.length;

  // Touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="BRC STAR Partner Client Portfolio Showcase"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-slate-800/80 bg-slate-950/60 backdrop-blur-sm shadow-2xl shadow-black/60 select-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 flex flex-col justify-between"
    >
      {/* Slides Container */}
      <div
        className="w-full h-full flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {PORTFOLIO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slide.number} of ${totalSlides}: ${slide.title}`}
            aria-hidden={idx !== currentIndex}
            className="relative min-w-full w-full h-full flex-shrink-0 flex items-center justify-center overflow-hidden bg-black/40"
          >
            {/* Standard img tag with uncompressed original source preserving 1774x887 resolution */}
            <img
              src={slide.imageSrc}
              alt={slide.altText}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="block w-full h-full object-contain object-center select-none pointer-events-none"
              draggable={false}
            />

            {/* Slide Title Tag in Bottom Left */}
            <div className="absolute bottom-3 left-4 sm:bottom-5 sm:left-6 z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-md text-xs sm:text-sm font-semibold bg-slate-950/80 text-white border border-slate-700/60 backdrop-blur-md shadow-lg">
                {slide.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        aria-label="Previous portfolio slide"
        className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-slate-950/75 hover:bg-slate-900 text-white/90 hover:text-white border border-slate-700/60 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={goToNext}
        aria-label="Next portfolio slide"
        className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-slate-950/75 hover:bg-slate-900 text-white/90 hover:text-white border border-slate-700/60 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Pagination Indicators (10 Dots) */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 border border-slate-800/60 backdrop-blur-md">
        {PORTFOLIO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              className={`transition-all duration-300 rounded-full focus:outline-none cursor-pointer ${
                isActive
                  ? 'w-5 sm:w-6 h-2 bg-gradient-to-r from-blue-500 to-cyan-400'
                  : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
