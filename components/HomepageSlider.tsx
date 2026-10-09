'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ExternalLink,
  Sparkles,
  Layers,
  ShieldCheck,
  Maximize2,
} from 'lucide-react';

export interface SliderItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  imageWebp: string;
  originalName: string;
  badge: string;
  tags: string[];
}

export const SLIDER_ITEMS: SliderItem[] = [
  {
    id: 'brcstar-slider-01',
    number: '01',
    title: 'BRCTEX — Responsive Textile Website Showcase',
    category: 'Textile & Apparel E-Commerce',
    description: 'Full-scale B2B & D2C manufacturing platform featuring multi-device responsive fluidity and live yarn catalog.',
    imageWebp: '/images/slider/brcstar-slider-01.webp',
    originalName: 'Brctex Responsive Textile Website Showcase.png',
    badge: 'Enterprise Textile Portal',
    tags: ['E-Commerce', 'B2B Supply Chain', 'Multi-Device Responsive'],
  },
  {
    id: 'brcstar-slider-02',
    number: '02',
    title: 'DAXY — Diamond Luxury Showcase',
    category: 'Ultra-Luxury E-Commerce',
    description: 'Bespoke diamond atelier with 4K gemstone inspection, 360° ring customizer & GIA verification.',
    imageWebp: '/images/slider/brcstar-slider-02.webp',
    originalName: 'DAXY Diamond Luxury Showcase.png',
    badge: 'Haute Joaillerie & Solitaire',
    tags: ['3D Customizer', 'GIA Verified', 'Luxury UI/UX'],
  },
  {
    id: 'brcstar-slider-03',
    number: '03',
    title: 'DXMO — Fashion Responsive Showcase',
    category: 'Streetwear & Luxury Fashion',
    description: 'High-frequency streetwear storefront with dynamic lookbook, instant cart & omnichannel drops.',
    imageWebp: '/images/slider/brcstar-slider-03.webp',
    originalName: 'DXMO Fashion Responsive Showcase.png',
    badge: 'Contemporary Apparel Commerce',
    tags: ['Flash Drops', 'Sub-second Cart', 'Mobile First'],
  },
  {
    id: 'brcstar-slider-04',
    number: '04',
    title: 'DXMO — Industrial Machinery Website Showcase',
    category: 'Industrial B2B Portal',
    description: 'Precision engineering portal with interactive 5-axis CNC CAD specs & automated RFQ quotes.',
    imageWebp: '/images/slider/brcstar-slider-04.webp',
    originalName: 'DXMO Industrial Machinery Website Showcase.png',
    badge: 'Heavy Engineering & CNC Specs',
    tags: ['3D CAD Specs', 'RFQ Engine', 'Industrial B2B'],
  },
  {
    id: 'brcstar-slider-05',
    number: '05',
    title: 'DXMO — Jewellery Website Luxury Mockup',
    category: 'Heritage Luxury Jewelry',
    description: 'Royal bridal jewelry showroom featuring high-definition loupe zoom and certified hallmark badges.',
    imageWebp: '/images/slider/brcstar-slider-05.webp',
    originalName: 'DXMO Jewellery Website Luxury Mockup.png',
    badge: 'Fine Gold & Emerald Craft',
    tags: ['High-Res Loupe', 'Hallmark Purity', 'Bridal Collection'],
  },
  {
    id: 'brcstar-slider-06',
    number: '06',
    title: 'DXMO — Real Estate Device Showcase',
    category: 'Luxury Real Estate Portal',
    description: 'Architectural property portal with 3D virtual villa tours, interactive map pinning & mortgage tools.',
    imageWebp: '/images/slider/brcstar-slider-06.webp',
    originalName: 'DXMO Real Estate Device Showcase.png',
    badge: 'Prime Architecture & Villas',
    tags: ['3D Virtual Tour', 'Dynamic Map Pins', 'Mortgage Tools'],
  },
  {
    id: 'brcstar-slider-07',
    number: '07',
    title: 'Embroidery — Website Device Showcase',
    category: 'Custom Craftsmanship Studio',
    description: 'Computerized embroidery platform with automated vector-to-stitch preview and thread palette tools.',
    imageWebp: '/images/slider/brcstar-slider-07.webp',
    originalName: 'Embroidery Website Device Showcase.png',
    badge: 'Artisanal Threadcraft & Monograms',
    tags: ['Vector to Stitch', 'Pantone Palette', 'iPad Monogram Studio'],
  },
  {
    id: 'brcstar-slider-08',
    number: '08',
    title: 'Pastel — Beauty & Wellness Website Mockup',
    category: 'Clean Beauty & Wellness',
    description: 'Clean skincare commerce with interactive routine builder, ingredient breakdown & eco packaging.',
    imageWebp: '/images/slider/brcstar-slider-08.webp',
    originalName: 'Pastel Beauty and Wellness Website Mockup.png',
    badge: 'Organic Botanical Skincare',
    tags: ['Skin Diagnostic', 'Clean Botanical', 'Auto-Refill Engine'],
  },
  {
    id: 'brcstar-slider-09',
    number: '09',
    title: 'Responsive Dental Clinic — Website Showcase',
    category: 'Healthcare & Clinical Booking',
    description: 'Modern dental healthcare portal with before & after smile transformations and instant appointment scheduling.',
    imageWebp: '/images/slider/brcstar-slider-09.webp',
    originalName: 'Responsive Dental Clinic Website Showcase.png',
    badge: 'Orthodontics & Smile Clinic',
    tags: ['Smile Slider', 'Live Booking', 'Telehealth Portal'],
  },
  {
    id: 'brcstar-slider-10',
    number: '10',
    title: 'TEXMO — Fashion Across Every Screen',
    category: 'Multi-Screen Responsive Matrix',
    description: 'Harmonized fashion ecosystem operating across Smart TV, Desktop Workstation, iPad & iPhone screens.',
    imageWebp: '/images/slider/brcstar-slider-10.webp',
    originalName: 'TEXMO Fashion Across Every Screen.png',
    badge: 'Omnichannel Screen Fluidity',
    tags: ['4 Synchronized Screens', 'Dynamic Breakpoints', 'Headless Engine'],
  },
];

interface HomepageSliderProps {
  onOpenInquiry?: (serviceName?: string) => void;
}

export function HomepageSlider({ onOpenInquiry }: HomepageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [touchDiff, setTouchDiff] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const totalSlides = SLIDER_ITEMS.length;
  const AUTOPLAY_INTERVAL = 5000;
  const PROGRESS_TICK = 50;

  // Next / Prev slide handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgressPercent(0);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgressPercent(0);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgressPercent(0);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (document.activeElement === sliderContainerRef.current) {
          e.preventDefault();
          setIsPlaying((prev) => !prev);
        }
      }
    },
    [goToNext, goToPrev]
  );

  // Autoplay timer with progress bar
  useEffect(() => {
    const isPaused = !isPlaying || isHovered || isDragging;

    if (isPaused) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const startTime = Date.now();
    const intervalTicks = AUTOPLAY_INTERVAL / PROGRESS_TICK;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / AUTOPLAY_INTERVAL) * 100);
      setProgressPercent(pct);
    }, PROGRESS_TICK);

    autoplayTimerRef.current = setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPlaying, isHovered, isDragging, goToNext]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchDiff(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentX = e.targetTouches[0].clientX;
    setTouchEnd(currentX);
    setTouchDiff(currentX - touchStart);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setTouchStart(null);
      setTouchEnd(null);
      setTouchDiff(0);
      return;
    }
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setTouchDiff(0);
  };

  // Mouse Drag Handlers for Desktop swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    setTouchDiff(diff);
  };

  const handleMouseUp = () => {
    if (isDragging && dragStartX !== null) {
      if (touchDiff < -50) {
        goToNext();
      } else if (touchDiff > 50) {
        goToPrev();
      }
    }
    setIsDragging(false);
    setDragStartX(null);
    setTouchDiff(0);
  };

  const handleMouseLeaveContainer = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragStartX(null);
      setTouchDiff(0);
    }
    setIsHovered(false);
  };

  const activeSlide = SLIDER_ITEMS[currentIndex];

  return (
    <section
      aria-label="High-Performance Website Showcase Slider"
      className="relative w-full pt-28 sm:pt-32 pb-8 sm:pb-12 bg-[#060911] border-b border-slate-850"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 blur-[100px] rounded-full -z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Pre-Header Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/25 text-blue-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              10 Production Showcase Deployments
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              1774 × 887 WebP High-Performance 2:1 Viewport
            </span>
          </div>

          {/* Autoplay & Slide Counter Pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
              aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
              title={isPlaying ? 'Pause 5-second autoplay' : 'Resume 5-second autoplay'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-cyan-400" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-emerald-400" />
                  <span className="hidden sm:inline">Play</span>
                </>
              )}
            </button>

            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-900/90 border border-slate-800 text-slate-300">
              <span className="text-cyan-400">{activeSlide.number}</span>
              <span className="text-slate-600 mx-1">/</span>
              <span className="text-slate-400">{String(totalSlides).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Main Slider Frame with 2:1 Aspect Ratio (1774 x 887) */}
        <div
          ref={sliderContainerRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="BRC STAR Partner Showcase Slider"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeaveContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="relative w-full aspect-[2/1] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-800/90 bg-slate-950 shadow-2xl shadow-black/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-grab active:cursor-grabbing select-none"
        >
          {/* Slides Track */}
          <div
            className="relative w-full h-full flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${touchDiff}px))`,
              transition: isDragging || touchDiff !== 0 ? 'none' : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {SLIDER_ITEMS.map((item, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={item.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${item.number} of ${totalSlides}: ${item.title}`}
                  className="relative min-w-full w-full h-full flex-shrink-0"
                >
                  <Image
                    src={item.imageWebp}
                    alt={`${item.title} - BRC STAR Partner High-Performance Showcase`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1280px"
                    priority={idx === 0}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    referrerPolicy="no-referrer"
                    className="object-cover object-center w-full h-full select-none pointer-events-none"
                    draggable={false}
                  />

                  {/* Gradient Overlay for subtle bottom depth and text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Slide Content Caption Overlay on Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
                    <div className="max-w-xl">
                      <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-600/30 text-cyan-300 border border-blue-500/40 backdrop-blur-md">
                          {item.badge}
                        </span>
                        <span className="hidden sm:inline-block text-xs text-slate-400 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                        {item.title}
                      </h3>
                      <p className="hidden md:block text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 max-w-lg">
                        {item.description}
                      </p>
                    </div>

                    {/* Quick Inquiry CTA on Active Slide */}
                    {onOpenInquiry && (
                      <div className="pointer-events-auto shrink-0">
                        <button
                          onClick={() => onOpenInquiry(item.title)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-semibold bg-blue-600/90 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                        >
                          <span>Build Similar Architecture</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Autoplay Linear Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900/60 z-20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all ease-linear"
              style={{
                width: isPlaying && !isHovered && !isDragging ? `${progressPercent}%` : `${((currentIndex + 1) / totalSlides) * 100}%`,
                transitionDuration: isPlaying && !isHovered && !isDragging ? `${PROGRESS_TICK}ms` : '300ms',
              }}
            />
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={goToPrev}
            aria-label="Previous Project Slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white/90 hover:text-white border border-slate-700/60 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={goToNext}
            aria-label="Next Project Slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white/90 hover:text-white border border-slate-700/60 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Bottom Pagination Indicators (Interactive Dots & Title Pills) */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {SLIDER_ITEMS.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                className={`group relative py-1 px-1.5 sm:px-2 rounded-full transition-all focus:outline-none ${
                  isActive
                    ? 'bg-blue-600/20 border border-blue-500/50 text-cyan-300'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-4 sm:w-6 h-2 bg-gradient-to-r from-blue-500 to-cyan-400'
                        : 'w-2 h-2 bg-slate-600 group-hover:bg-slate-400'
                    }`}
                  />
                  <span className={`text-[10px] sm:text-xs font-mono font-medium ${isActive ? 'inline' : 'hidden md:inline'}`}>
                    {item.number}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Slide Metadata Bar below slider */}
        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 border-t border-slate-850 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300 font-medium">Currently Viewing:</span>
            <span className="text-white font-semibold truncate max-w-[280px] sm:max-w-md">{activeSlide.title}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Aspect Ratio: 2:1 (1774 × 887)</span>
            <span>•</span>
            <span>Optimized WebP</span>
            <span>•</span>
            <span className="hidden sm:inline">Swipe or Arrow Keys Supported</span>
          </div>
        </div>
      </div>
    </section>
  );
}
