'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import {
  LIVE_PROJECTS,
  PORTFOLIO_CATEGORIES,
  LiveProject,
} from '@/lib/live-portfolio-data';
import { SITE } from '@/lib/site-config';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import {
  ExternalLink,
  ChevronLeft,
  Sparkles,
  Globe,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  Cpu,
  Zap,
  MessageCircle,
  Code2,
  Laptop,
} from 'lucide-react';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [initialInquiryService, setInitialInquiryService] = useState<string>('Website Development');

  const filteredProjects =
    selectedCategory === 'All'
      ? LIVE_PROJECTS
      : LIVE_PROJECTS.filter((p) => p.category === selectedCategory);

  const handleOpenInquiry = (serviceName?: string) => {
    if (serviceName) {
      setInitialInquiryService(serviceName);
    }
    setInquiryModalOpen(true);
  };

  // JSON-LD structured data for SEO rich snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'BRC STAR Partner Live Production Projects',
    description:
      'Seven live production web platforms, SaaS consoles, and enterprise portals engineered by BRC STAR Partner.',
    url: `${SITE.url}/portfolio`,
    numberOfItems: LIVE_PROJECTS.length,
    itemListElement: LIVE_PROJECTS.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: project.name,
        url: project.url,
        applicationCategory: project.category,
        description: project.description,
        operatingSystem: 'All Modern Web Browsers',
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#060911] dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col transition-colors duration-200">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation */}
      <Navbar onOpenInquiry={() => handleOpenInquiry('General Web Development')} />

      <main className="flex-grow pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Live Projects Portfolio</span>
          </nav>

          {/* Hero Section */}
          <header className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>VERIFIED PRODUCTION DEPLOYMENTS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Engineering in Action:{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Live Projects Portfolio
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explore real-world web applications, enterprise portals, SaaS systems, and digital flagships engineered and maintained by BRC STAR Partner. Test their sub-second performance, responsive layouts, and modern architecture live.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 max-w-3xl mx-auto">
              <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">7</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Live Deployments</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Verified Online</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">&lt; 2.5s</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">LCP Target Speed</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Multi-Device Ready</div>
              </div>
            </div>
          </header>

          {/* Interactive Category Filter Bar */}
          <section aria-label="Portfolio Category Filters" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono">
                  Filter By Industry Verticals
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Showing {filteredProjects.length} of {LIVE_PROJECTS.length} Live Sites
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {PORTFOLIO_CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                const count =
                  category === 'All'
                    ? LIVE_PROJECTS.length
                    : LIVE_PROJECTS.filter((p) => p.category === category).length;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-[#060911]'
                        : 'bg-white dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected
                          ? 'bg-blue-700 text-blue-100'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Project Grid Showcase */}
          <section aria-label="Live Projects Grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: LiveProject) => (
              <article
                key={project.id}
                className="group flex flex-col bg-white dark:bg-[#0b101d] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300"
              >
                {/* Thumbnail Preview Area */}
                <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-950 overflow-hidden border-b border-slate-200 dark:border-slate-800/80">
                  <Image
                    src={project.imageSrc}
                    alt={project.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority={project.id === 'dental-clinic' || project.id === 'tech-portal'}
                  />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live Site</span>
                    </span>

                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900/80 text-slate-200 border border-slate-700/60 backdrop-blur-md">
                      {project.badge}
                    </span>
                  </div>

                  {/* Live Domain Bar at Bottom of Image */}
                  <div className="absolute bottom-2 left-3 right-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/85 text-blue-300 border border-blue-500/30 text-[11px] font-mono backdrop-blur-md truncate max-w-full">
                      <Globe className="w-3 h-3 text-blue-400 shrink-0" />
                      <span className="truncate">{project.domain}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    {/* Category Label */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                        {project.name}
                      </h2>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="pt-2 space-y-1.5 border-t border-slate-100 dark:border-slate-800/60">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology Stack Pills */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch gap-2.5">
                    {/* Primary Button: View Live Project */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    >
                      <span>View Live Project</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Secondary Button: Discuss Similar Project */}
                    <button
                      type="button"
                      onClick={() => handleOpenInquiry(project.name)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Bottom Call to Action Section */}
          <section aria-label="Start Your Project" className="pt-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 border border-blue-900/40 shadow-2xl">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold font-mono">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>CUSTOM SOFTWARE &amp; WEB ENGINEERING</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Inspired by These Deployments? Let&apos;s Build Yours.
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Whether you need a high-converting healthcare portal, an industrial B2B catalog, or a full-scale multi-tenant SaaS application, BRC STAR Partner delivers production-ready engineering within 2 to 8 weeks.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => handleOpenInquiry('Custom Web Engineering')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                  >
                    <span>Start Your Project Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={getWhatsAppUrl({
                      customMessage:
                        'Hello BRC STAR Partner! I viewed your Live Projects Portfolio (https://brcpartner.brcstar.in/portfolio) and would like to discuss engineering a similar project for my business.',
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Discussion</span>
                  </a>

                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl text-slate-300 hover:text-white text-sm font-medium hover:underline transition-colors"
                  >
                    <span>View Pricing &amp; Milestone Plans →</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry('General Inquiry')} />

      {/* Interactive Project Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService={initialInquiryService}
      />
    </div>
  );
}
