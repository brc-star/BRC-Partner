'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Lock,
  Star,
  ShoppingCart,
  Laptop,
  Layers,
  Gauge,
  Calendar,
  Cloud,
  Shield,
  Cpu,
  Sparkles,
  Globe,
} from 'lucide-react';
import { LIVE_PROJECTS, LiveProject, ProjectFeatureCard } from '@/lib/live-portfolio-data';

interface LiveProjectsHeroCarouselProps {
  onOpenInquiry: (projectName?: string) => void;
}

export function LiveProjectsHeroCarousel({ onOpenInquiry }: LiveProjectsHeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalProjects = LIVE_PROJECTS.length;
  const currentProject: LiveProject = LIVE_PROJECTS[currentIndex];

  // Touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Preload all 7 project screenshots on mount for instantaneous, flicker-free transitions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      LIVE_PROJECTS.forEach((proj) => {
        const img = new window.Image();
        img.src = proj.screenshotSrc;
      });
    }
  }, []);

  // Transition handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // 1-second auto-transition with pause-on-hover & reduced motion check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsPaused(true);
        return;
      }
    }

    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 1000); // 1-second auto-transition per user specification

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
    } else if (e.key === ' ') {
      e.preventDefault();
      togglePause();
    }
  };

  // Icon renderer for the 4 feature cards
  const renderFeatureIcon = (iconName: ProjectFeatureCard['icon']) => {
    const iconClass = 'w-5 h-5 text-[#b47e28] dark:text-[#e0a94e]';
    switch (iconName) {
      case 'ShoppingCart':
        return <ShoppingCart className={iconClass} />;
      case 'Laptop':
        return <Laptop className={iconClass} />;
      case 'Layers':
        return <Layers className={iconClass} />;
      case 'Gauge':
        return <Gauge className={iconClass} />;
      case 'Calendar':
        return <Calendar className={iconClass} />;
      case 'Cloud':
        return <Cloud className={iconClass} />;
      case 'Shield':
        return <Shield className={iconClass} />;
      case 'Cpu':
        return <Cpu className={iconClass} />;
      case 'Globe':
        return <Globe className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="BRC STAR Partner Live Projects Dynamic Showcase"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full rounded-2xl sm:rounded-3xl border border-[#e6d5bc] dark:border-[#b47e28]/35 bg-gradient-to-br from-[#faf7f2] via-[#ffffff] to-[#f4ede2] dark:from-[#060c1c] dark:via-[#09132b] dark:to-[#040813] shadow-2xl shadow-black/10 dark:shadow-black/70 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#b47e28] transition-colors duration-300"
    >
      {/* Decorative Luxury Lighting & Ambient Glows */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-br from-[#b47e28]/12 via-[#d99e38]/6 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Control Strip */}
      <div className="relative z-20 px-4 sm:px-8 pt-5 sm:pt-6 flex items-center justify-between border-b border-[#e6d5bc]/70 dark:border-slate-800/80 pb-3">
        {/* Left: Project Sequence & Live Domain Pill */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="font-mono text-xs font-bold text-[#b47e28] dark:text-[#d99e38] tracking-widest uppercase">
            Project {String(currentIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
          </span>
          <span className="h-3 w-px bg-slate-300 dark:bg-slate-700" />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[180px] sm:max-w-none">
            {currentProject.name}
          </span>
        </div>

        {/* Right: Autoplay Status & Navigation Arrows */}
        <div className="flex items-center gap-2">
          {/* Pause / Resume Button */}
          <button
            type="button"
            onClick={togglePause}
            aria-label={isPaused ? 'Resume 1s autoplay' : 'Pause autoplay'}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-[#b47e28] shadow-sm transition-all cursor-pointer"
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-[#b47e28]" fill="currentColor" />
                <span className="font-mono text-[11px] font-semibold">Paused (Play)</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-emerald-500" fill="currentColor" />
                <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  1s Live Auto
                </span>
              </>
            )}
          </button>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous live project"
              className="p-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 hover:bg-[#b47e28] hover:text-white text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next live project"
              className="p-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 hover:bg-[#b47e28] hover:text-white text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Carousel Body: Left Content Panel & Right Laptop Mockup */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-5 sm:p-8 lg:p-10 items-center">
        
        {/* Left-Side Content Panel (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Featured Project Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07132e] text-white border border-[#b47e28]/60 shadow-md">
            <Star className="w-3.5 h-3.5 text-[#e0a94e] fill-[#e0a94e]" />
            <span className="text-xs font-semibold tracking-wider uppercase font-mono text-slate-100">
              Featured Project • {currentProject.badgeLabel}
            </span>
          </div>

          {/* Editorial Display Headline (Inspired directly by the reference image) */}
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#07132e] dark:text-white leading-[1.08]">
              <span className="block font-serif tracking-tight">{currentProject.headlineMain}</span>
              <span className="block font-serif text-[#0c2356] dark:text-slate-200 font-bold text-2xl sm:text-3xl md:text-4xl mt-0.5">
                {currentProject.headlineSub}
              </span>
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#b47e28] dark:text-[#d99e38] pt-1">
              {currentProject.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentProject.description}
          </p>

          {/* 4 Feature & Technology Icon Cards (Exact 4-Box Row Layout) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {currentProject.featureCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#f4efe6]/90 dark:bg-[#0c1630]/90 border border-[#e2d5c0] dark:border-[#b47e28]/25 rounded-xl p-2.5 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm hover:border-[#b47e28] transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 shadow-xs">
                  {renderFeatureIcon(card.icon)}
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {card.title}
                </span>
              </div>
            ))}
          </div>

          {/* Dual CTAs (Matching Gold Button & Outline Button from Reference) */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            {/* Primary Gold Button: View Live Project */}
            <a
              href={currentProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#b47e28] via-[#c68c2d] to-[#b47e28] hover:from-[#9c691c] hover:to-[#9c691c] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#b47e28]/30 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#b47e28]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Live Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Secondary Button: Project Details (Opens Inquiry Modal) */}
            <button
              type="button"
              onClick={() => onOpenInquiry(currentProject.name)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-[#faf7f2] dark:hover:bg-slate-800 text-[#07132e] dark:text-white border-2 border-[#b47e28]/70 font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer shadow-sm"
            >
              <span>Project Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#b47e28]" />
            </button>
          </div>
        </div>

        {/* Right-Side Content Panel: Large Front-Facing Laptop Mockup (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          
          {/* Laptop Mockup Wrapper with Correct Scaling & Proper Screen Alignment */}
          <div className="relative w-full max-w-2xl mx-auto select-none">
            
            {/* Laptop Screen Bezel */}
            <div className="relative bg-[#0a0d14] rounded-t-[20px] sm:rounded-t-[28px] p-2 sm:p-3 pb-0 shadow-2xl border-t border-x border-slate-700/80">
              
              {/* Webcam Dot */}
              <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 border border-slate-700" />
                <span className="w-0.5 h-0.5 rounded-full bg-emerald-400 opacity-80" />
              </div>

              {/* Browser Chrome Header Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#141824] rounded-t-lg sm:rounded-t-xl border-b border-slate-800 text-xs font-mono text-slate-400 mb-0.5">
                {/* Window Control Dots */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>

                {/* HTTPS Live Domain Address Bar */}
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#0a0d14] text-slate-200 text-[10px] sm:text-[11px] border border-slate-700/60 max-w-xs truncate shadow-inner">
                  <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{currentProject.url}</span>
                </div>

                {/* Live Online Badge */}
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold hidden sm:inline">
                    LIVE
                  </span>
                </div>
              </div>

              {/* Laptop Screen Content Display (Exact 16:10 Ratio, Zero Blank Flash) */}
              <div className="relative w-full aspect-[16/10] bg-[#050810] overflow-hidden rounded-b-md sm:rounded-b-lg border border-slate-800/90 group">
                {/* Preloaded Multi-Layered Slide Stack */}
                {LIVE_PROJECTS.map((proj, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <div
                      key={proj.id}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={proj.screenshotSrc}
                        alt={proj.altText}
                        loading={idx === 0 || idx === 1 ? 'eager' : 'lazy'}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  );
                })}

                {/* Screen Glare Highlight */}
                <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />

                {/* Clickable Overlay Link to Live Website */}
                <a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-30 bg-slate-950/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-semibold text-xs sm:text-sm backdrop-blur-[2px]"
                >
                  <span className="px-4 py-2 rounded-xl bg-[#b47e28] text-white shadow-xl inline-flex items-center gap-2 font-bold">
                    <span>Visit {currentProject.domain}</span>
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>

            {/* Laptop Bottom Chassis / Keyboard Base with Front Edge Perspective */}
            <div className="relative h-3 sm:h-4 bg-gradient-to-b from-[#3a3d45] via-[#2a2d34] to-[#1c1e24] rounded-b-xl sm:rounded-b-2xl shadow-xl flex items-center justify-center border-t border-slate-600/50">
              {/* Thumb Notch Indent */}
              <div className="w-14 sm:w-20 h-1 sm:h-1.5 rounded-b-md bg-[#16181d] border-b border-slate-500/30" />
            </div>

            {/* Laptop Base Surface Shadow / Ambient Reflection */}
            <div className="w-11/12 mx-auto h-2.5 sm:h-3.5 bg-black/40 blur-md rounded-full mt-0.5" />
          </div>
        </div>
      </div>

      {/* Bottom Interactive Quick-Jump Strip (7 Live Projects) */}
      <div className="relative z-20 px-4 sm:px-8 py-3.5 bg-[#ede4d5]/75 dark:bg-[#070e22]/95 border-t border-[#e6d5bc]/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        {/* Clickable Project Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {LIVE_PROJECTS.map((proj, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Jump to ${proj.name}`}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#b47e28] text-white shadow-md shadow-[#b47e28]/25 ring-2 ring-[#b47e28] ring-offset-1 ring-offset-white dark:ring-offset-[#070e22]'
                    : 'bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700'
                }`}
              >
                <span>{String(idx + 1).padStart(2, '0')}. </span>
                <span className="hidden md:inline">{proj.headlineMain}</span>
                <span className="md:hidden">{proj.category}</span>
              </button>
            );
          })}
        </div>

        {/* 7 Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {LIVE_PROJECTS.map((proj, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-5 h-2 bg-[#b47e28]'
                    : 'w-2 h-2 bg-slate-400 dark:bg-slate-600 hover:bg-[#b47e28]/70'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
