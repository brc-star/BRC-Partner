'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  ArrowRight,
  Eye,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface PortfolioProject {
  id: string;
  title: string;
  industry: string;
  badge: 'Healthcare Clinic' | 'Textile & Industrial' | 'E-commerce & Fashion' | 'SaaS & Custom Software';
  description: string;
  imageSrc: string;
  altText: string;
  isDemo: boolean;
  demoUrl?: string;
  technologies: string[];
}

interface ProjectShowcaseSectionProps {
  onOpenInquiry: (serviceName?: string) => void;
  onOpenClaimProof?: (claimId: string) => void;
}

export function ProjectShowcaseSection({
  onOpenInquiry,
}: ProjectShowcaseSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePreviewImage, setActivePreviewImage] = useState<PortfolioProject | null>(null);

  const portfolioProjects: PortfolioProject[] = [
    {
      id: 'dental-clinic',
      title: 'Apex Dental Clinic & Healthcare Portal',
      industry: 'Healthcare & Clinical Dentistry',
      badge: 'Healthcare Clinic',
      description:
        'Patient discovery, treatment showcase, doctor profiles, and direct WhatsApp / online appointment booking flow.',
      imageSrc: '/images/Responsive Dental Clinic Website Showcase.png',
      altText: 'Apex Dental Clinic & Healthcare Website showcase demo by BRC STAR Partner',
      isDemo: true,
      demoUrl: 'https://dentalclinic.brcstar.in/',
      technologies: ['Next.js 15', 'Tailwind CSS', 'WhatsApp Booking', 'Local SEO'],
    },
    {
      id: 'textile-manufacturing',
      title: 'TEXON & BRCtex Global Fabric Mill Portal',
      industry: 'Textile & Industrial Manufacturing',
      badge: 'Textile & Industrial',
      description:
        'B2B yarn and fabric catalog, weaving machinery showcase, sample request pipeline, and export certifications display.',
      imageSrc: '/images/Brctex Responsive Textile Website Showcase.png',
      altText: 'TEXON & BRCtex Responsive Textile Website Showcase demo by BRC STAR Partner',
      isDemo: true,
      demoUrl: 'https://texon.brcstar.in',
      technologies: ['Next.js', 'B2B Catalog', 'Sample Requests', 'Cloud CDN'],
    },
    {
      id: 'fashion-ecommerce',
      title: 'TEXMO Fashion & Apparel Storefront',
      industry: 'Fashion, Garments & E-commerce',
      badge: 'E-commerce & Fashion',
      description:
        'High-converting lookbook catalog, fluid responsive filters, multi-device sizing guide, and streamlined checkout.',
      imageSrc: '/images/TEXMO Fashion Across Every Screen.png',
      altText: 'TEXMO Fashion Across Every Screen demo by BRC STAR Partner',
      isDemo: true,
      demoUrl: 'https://texon.brcstar.in',
      technologies: ['Headless E-commerce', 'Razorpay', 'Next.js', 'TypeScript'],
    },
    {
      id: 'luxury-jewellery',
      title: 'DAXY Diamond & Fine Jewellery Digital Flagship',
      industry: 'Luxury Retail & E-commerce',
      badge: 'E-commerce & Fashion',
      description:
        'Ultra-luxury catalog browsing, 360 diamond preview ergonomics, private concierge booking, and secure transactions.',
      imageSrc: '/images/DAXY Diamond Luxury Showcase.png',
      altText: 'DAXY Diamond Luxury Showcase demonstration by BRC STAR Partner',
      isDemo: true,
      technologies: ['Interactive Catalog', 'Next.js App Router', 'Stripe/Razorpay', 'Tailwind'],
    },
    {
      id: 'saas-logistics',
      title: 'Enterprise Fleet & Cloud SaaS Console',
      industry: 'SaaS & Custom Software',
      badge: 'SaaS & Custom Software',
      description:
        'Real-time fleet telemetry, multi-stop routing optimization algorithms, and automated warehouse dispatch queues.',
      imageSrc: '/images/brc-star-multi-device-tech-showcase.jpg',
      altText: 'Enterprise Fleet Logistics SaaS Console demonstration by BRC STAR Partner',
      isDemo: true,
      demoUrl: 'https://app.brcstar.in/',
      technologies: ['React 19 / Next.js', 'WebSockets', 'PostgreSQL', 'Redis'],
    },
    {
      id: 'tech-solutions',
      title: 'BRC Tech Cloud & Infrastructure Portal',
      industry: 'Enterprise Cloud & Systems Engineering',
      badge: 'SaaS & Custom Software',
      description:
        'Enterprise cloud architecture, microservices, API integrations, and automated DevOps deployment pipelines.',
      imageSrc: '/images/brc-star-technology-partner-hero-banner.jpg',
      altText: 'BRC STAR Technology Solutions and Cloud Infrastructure live portal',
      isDemo: true,
      demoUrl: 'https://tech.brcstar.in/',
      technologies: ['Cloud Architecture', 'DevOps CI/CD', 'API Gateway', 'TypeScript'],
    },
  ];

  const categories = [
    'All',
    'Healthcare Clinic',
    'Textile & Industrial',
    'E-commerce & Fashion',
    'SaaS & Custom Software',
  ] as const;

  const filteredProjects =
    selectedCategory === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.badge === selectedCategory);

  return (
    <section
      id="portfolio-section"
      className="py-20 sm:py-24 bg-[#f8fafc] dark:bg-[#060911] relative overflow-hidden transition-colors border-b border-slate-200 dark:border-slate-800/80"
      aria-labelledby="portfolio-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-14">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Demonstrated Engineering Capabilities</span>
          </div>

          {/* Heading */}
          <h2
            id="portfolio-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Explore Our Website Portfolio
          </h2>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Explore selected website demonstrations created for different industries and business needs.
          </p>

          {/* Transparent Demonstration Notice Pill */}
          <div className="mx-auto max-w-2xl p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              <strong>Note:</strong> Demonstration websites engineered by BRC STAR Partner to prove design and technical capability.
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === 'All'
                  ? portfolioProjects.length
                  : portfolioProjects.filter((p) => p.badge === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-500 ring-offset-2 ring-offset-[#f8fafc] dark:ring-offset-[#060911]'
                      : 'bg-white dark:bg-[#0e1628] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-xs'
                  }`}
                >
                  <span>{cat}</span>
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
        </div>

        {/* 6 Visual Projects Grid (Desktop 3-col, Tablet 2-col, Mobile 1-col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              id={`portfolio-card-${project.id}`}
              className="rounded-3xl bg-white dark:bg-[#0a101d] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Responsive Device Mockup Container */}
              <div
                className="relative aspect-[16/10] w-full overflow-hidden bg-[#090e1a] cursor-pointer flex items-center justify-center p-2 border-b border-slate-200 dark:border-slate-800/80"
                onClick={() => setActivePreviewImage(project)}
                title={`Click to preview full-resolution mockup for ${project.title}`}
              >
                <img
                  src={project.imageSrc}
                  alt={project.altText}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out select-none"
                />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600 text-white shadow-xs">
                    DEMO
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-md text-slate-200 border border-white/10 shadow-xs">
                    {project.badge}
                  </span>
                </div>

                {/* Quick Expand Icon Overlay */}
                <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card Content & Details */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2.5">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 font-mono tracking-wide block">
                    {project.industry}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons: View Live Demo & Discuss Similar Project */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2.5">
                  {/* View Live Demo / Preview */}
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Live Demo →</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActivePreviewImage(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Showcase →</span>
                    </button>
                  )}

                  {/* Discuss Similar Project (Opens Inquiry Modal) */}
                  <button
                    type="button"
                    onClick={() => onOpenInquiry(project.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Discuss Similar</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => onOpenInquiry('Custom Website Portfolio Inquiry')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/90 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
          >
            <span>Discuss Your Custom Website Requirements With Us</span>
            <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
        </div>

      </div>

      {/* Lightbox Modal for High-Resolution Device Previews */}
      {activePreviewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePreviewImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Preview of ${activePreviewImage.title}`}
        >
          <div
            className="relative max-w-4xl w-full bg-white dark:bg-[#0c1324] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {activePreviewImage.title}
                </h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                  {activePreviewImage.industry} • Multi-Device Showcase
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePreviewImage(null)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                aria-label="Close preview modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-[#090e1a] rounded-xl overflow-hidden p-2 flex items-center justify-center">
              <img
                src={activePreviewImage.imageSrc}
                alt={activePreviewImage.altText}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {activePreviewImage.description}
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {activePreviewImage.demoUrl && (
                  <a
                    href={activePreviewImage.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Live Demo</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const proj = activePreviewImage;
                    setActivePreviewImage(null);
                    onOpenInquiry(proj.title);
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 cursor-pointer shadow-md shadow-blue-600/20"
                >
                  Discuss Similar Project →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
