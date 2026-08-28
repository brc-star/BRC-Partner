'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

interface HeroProps {
  onOpenInquiry: () => void;
}

export function Hero({ onOpenInquiry }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'telemetry' | 'ai' | 'mobile'>('architecture');
  const [isSimulatingTraffic, setIsSimulatingTraffic] = useState(false);

  const handleSimulate = () => {
    setIsSimulatingTraffic(true);
    setTimeout(() => setIsSimulatingTraffic(false), 2000);
  };

  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#060911] tech-grid-pattern"
      aria-labelledby="hero-headline"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider shadow-inner shadow-blue-500/10">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span>BRC STAR • FULL-STACK DIGITAL TECHNOLOGY PARTNER</span>
          </div>

          {/* Bold Headline */}
          <h1
            id="hero-headline"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
          >
            Build Digital Products That{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Move Your Business Forward.
            </span>
          </h1>

          {/* Supporting Message */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            From high-performance websites and web applications to mobile apps, enterprise platforms, AI solutions and custom business systems — <strong className="font-semibold text-white">BRC STAR</strong> designs and develops technology around your real business needs.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-primary-cta"
              onClick={onOpenInquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-size-200 hover:bg-right hover:shadow-xl hover:shadow-blue-600/30 text-white font-semibold text-base border border-blue-400/40 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              id="hero-secondary-cta"
              href="#solutions"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <span>Explore Our Solutions</span>
            </a>
          </div>

          {/* Quick value props pill */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Full-Stack Engineering</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Enterprise-Grade Security</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Dedicated Technical Support</span>
            </div>
          </div>
        </div>

        {/* Realistic Interactive Digital Product UI Mockup */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-[#0b1120] border border-slate-800 shadow-2xl shadow-blue-950/40 overflow-hidden">
            {/* Top Chrome / Window Header */}
            <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#080d18] border-b border-slate-800/80 gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-slate-400 font-mono pl-2 border-l border-slate-800">
                  brc-star-core-production // v4.8.2
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 bg-[#0e1629] p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'architecture'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Architecture
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'telemetry'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Live Metrics
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'ai'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  AI Intelligence
                </button>
                <button
                  onClick={() => setActiveTab('mobile')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'mobile'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Mobile Platform
                </button>
              </div>

              {/* Live Status indicator */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulate}
                  title="Simulate load test"
                  className="flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${isSimulatingTraffic ? 'animate-spin text-blue-400' : ''}`} />
                  <span>{isSimulatingTraffic ? 'Simulating...' : 'Test Cluster'}</span>
                </button>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Cluster Healthy
                </span>
              </div>
            </div>

            {/* Main Interactive Screen Content */}
            <div className="p-5 sm:p-7 bg-gradient-to-b from-[#0b1120] to-[#070b14]">
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
            <div className="px-5 py-3 bg-[#080d18] border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>BRC STAR Production Protocol: Zero Templates • 100% Bespoke Engineering</span>
              </div>
              <div className="font-mono text-slate-500">
                End-to-End Type Safety (TypeScript + Prisma)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
