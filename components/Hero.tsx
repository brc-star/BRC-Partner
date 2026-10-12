'use client';

import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Cpu,
  Layers,
  Server,
  Database,
  Smartphone,
  Globe,
  CheckCircle2,
  Lock,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface HeroProps {
  onOpenInquiry: () => void;
  onOpenClaimProof?: (claimId: string) => void;
}

export function Hero({ onOpenInquiry, onOpenClaimProof }: HeroProps) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'architecture' | 'telemetry' | 'ai' | 'mobile'>('architecture');
  const [isSimulatingTraffic, setIsSimulatingTraffic] = useState(false);

  const handleSimulate = () => {
    setIsSimulatingTraffic(true);
    setTimeout(() => setIsSimulatingTraffic(false), 2000);
  };

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
    }, 5000);
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

  return (
    <section
      ref={heroSectionRef}
      id="hero-section"
      className="relative pt-[72px] md:pt-[101px] pb-20 md:pb-28 overflow-hidden bg-transparent tech-grid-pattern"
      aria-labelledby="hero-headline"
    >
      {/* Full-Width Interactive Hero Showcase Slider (No Blank Space Top, Left, Right) */}
      <div
        className="w-full relative select-none"
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
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-900/65 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 shadow-lg shadow-black/25 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Next Slide Navigation Button */}
          <button
            type="button"
            onClick={nextHeroSlide}
            aria-label="Next showcase slide"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-900/65 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 shadow-lg shadow-black/25 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className={`transition-all duration-300 rounded-full ${
                  currentHeroSlide === idx
                    ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-gradient-to-r from-blue-400 to-purple-400 shadow-sm'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Realistic Interactive Digital Product UI Mockup */}
      <div className="mt-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-blue-950/40 overflow-hidden">
            {/* Top Chrome / Window Header */}
            <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-100 dark:bg-[#080d18] border-b border-slate-200 dark:border-slate-800/80 gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono pl-2 border-l border-slate-300 dark:border-slate-800">
                  brc-star-core-production // v4.8.2
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-[#0e1629] p-1 rounded-lg border border-slate-300 dark:border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'architecture'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  Architecture
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'telemetry'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  Live Metrics
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'ai'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  AI Intelligence
                </button>
                <button
                  onClick={() => setActiveTab('mobile')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'mobile'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  Mobile Platform
                </button>
              </div>

              {/* Live Status indicator */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                  Simulated demo data
                </span>
                <button
                  onClick={handleSimulate}
                  title="Simulate load test"
                  className="flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${isSimulatingTraffic ? 'animate-spin text-blue-500' : ''}`} />
                  <span>{isSimulatingTraffic ? 'Simulating...' : 'Test Cluster'}</span>
                </button>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  Cluster Healthy
                </span>
              </div>
            </div>

            {/* Main Interactive Screen Content */}
            <div className="p-5 sm:p-7 bg-slate-50 dark:bg-gradient-to-b dark:from-[#0b1120] dark:to-[#070b14]">
              {/* Tab 1: Architecture View */}
              {activeTab === 'architecture' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Component 1: Edge & Client */}
                    <div className="p-4 rounded-xl bg-[#0f172a]/90 border border-slate-800 hover:border-blue-500/40 transition-all space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-semibold uppercase text-slate-300">Client & Edge Layer</span>
                        </div>
                        <span className="text-[11px] text-blue-400 font-mono">Global CDN</span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-400">
                        <div className="flex justify-between py-1 border-b border-slate-800/60">
                          <span>Framework</span>
                          <span className="font-semibold text-slate-200">Next.js 16 (App Router)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/60">
                          <span>Rendering</span>
                          <span className="font-semibold text-slate-200">Hybrid SSR / Streaming</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Type Safety</span>
                          <span className="font-semibold text-emerald-400">Strict TypeScript</span>
                        </div>
                      </div>
                    </div>

                    {/* Component 2: API & Microservices */}
                    <div className="p-4 rounded-xl bg-[#0f172a]/90 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Server className="w-4 h-4 text-indigo-400" />
                          <span className="text-xs font-semibold uppercase text-slate-300">Micro-API Services</span>
                        </div>
                        <span className="text-[11px] text-indigo-400 font-mono">Auto-Scaled</span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-400">
                        <div className="flex justify-between py-1 border-b border-slate-800/60">
                          <span>Runtime</span>
                          <span className="font-semibold text-slate-200">Node.js / Docker</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/60">
                          <span>Protocol</span>
                          <span className="font-semibold text-slate-200">REST & WebSockets</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Security</span>
                          <span className="font-semibold text-emerald-400">JWT + RBAC Shield</span>
                        </div>
                      </div>
                    </div>

                    {/* Component 3: Data & State */}
                    <div className="p-4 rounded-xl bg-[#0f172a]/90 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-purple-400" />
                          <span className="text-xs font-semibold uppercase text-slate-300">Data & Persistence</span>
                        </div>
                        <span className="text-[11px] text-purple-400 font-mono">ACID Compliant</span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-400">
                        <div className="flex justify-between py-1 border-b border-slate-800/60">
                          <span>Primary DB</span>
                          <span className="font-semibold text-slate-200">PostgreSQL (Prisma)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/60">
                          <span>In-Memory</span>
                          <span className="font-semibold text-slate-200">Redis Cache Pool</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Replication</span>
                          <span className="font-semibold text-emerald-400">Multi-Region Sync</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flow connection bar */}
                  <div className="p-4 rounded-xl bg-[#0e1628]/60 border border-blue-900/30 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                      <span className="font-mono text-slate-200">
                        Active pipeline: <strong className="text-blue-400">Client Request</strong> → <strong className="text-indigo-400">Edge Middleware</strong> → <strong className="text-purple-400">Database Transaction</strong>
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                      Mean Transaction Time: <strong>14.2ms</strong>
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 2: Live Telemetry */}
              {activeTab === 'telemetry' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#0f172a] border border-slate-800">
                      <span className="text-[11px] text-slate-400 font-medium">Core Web Vitals</span>
                      <div className="text-2xl font-bold text-emerald-400 mt-1">99/100</div>
                      <span className="text-[10px] text-slate-500">LCP 0.6s • CLS 0.00</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0f172a] border border-slate-800">
                      <span className="text-[11px] text-slate-400 font-medium">API Response P99</span>
                      <div className="text-2xl font-bold text-blue-400 mt-1">18ms</div>
                      <span className="text-[10px] text-slate-500">Edge accelerated</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0f172a] border border-slate-800">
                      <span className="text-[11px] text-slate-400 font-medium">System Uptime</span>
                      <div className="text-2xl font-bold text-indigo-400 mt-1">99.99%</div>
                      <span className="text-[10px] text-slate-500">Zero unplanned downtime</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0f172a] border border-slate-800">
                      <span className="text-[11px] text-slate-400 font-medium">Security Audits</span>
                      <div className="text-2xl font-bold text-purple-400 mt-1">0 Vulnerabilities</div>
                      <span className="text-[10px] text-slate-500">OWASP compliance</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span>Server-Side Rendering Throughput</span>
                      <span className="text-emerald-400">4,200 req/sec</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full w-[88%]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: AI Intelligence */}
              {activeTab === 'ai' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-xl bg-[#0f172a] border border-purple-900/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>Domain Knowledge Retrieval & Semantic Pipeline</span>
                      </div>
                      <span className="text-xs text-purple-400 font-mono">Gemini 2.5 / pgvector</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">Vector Embeddings</span>
                        <div className="font-semibold text-slate-200 mt-0.5">768-dim HyDE Index</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">Grounding Accuracy</span>
                        <div className="font-semibold text-emerald-400 mt-0.5">99.4% Verified Citations</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">Latency Overhead</span>
                        <div className="font-semibold text-blue-400 mt-0.5">Streaming 380ms TBT</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Mobile Platform */}
              {activeTab === 'mobile' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-xl bg-[#0f172a] border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold text-slate-200 text-sm">Unified React Native & Offline Engine</span>
                      </div>
                      <p className="text-xs text-slate-400 max-w-md">
                        Shared type-safe business logic between web dashboards and native iOS/Android mobile apps with deterministic offline data reconciliation.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-blue-950/80 border border-blue-800/60 text-blue-300">
                        iOS & Android 60fps
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Proof Bar */}
            <div className="px-5 py-3 bg-slate-100 dark:bg-[#080d18] border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span className="text-slate-700 dark:text-slate-300">BRC STAR Integrity Standard: <strong>Claim → Proof Verified</strong></span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-slate-500 hidden sm:inline">TypeScript + Next.js App Router</span>
                {onOpenClaimProof && (
                  <button
                    onClick={() => onOpenClaimProof('system-architecture')}
                    className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
                  >
                    Inspect Architecture Proof →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
