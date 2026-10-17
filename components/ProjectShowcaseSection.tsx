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
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface PortfolioProject {
  id: string;
  title: string;
  industry: string;
  badge: string;
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
      title: 'Responsive Dental Clinic & Healthcare Website',
      industry: 'Healthcare & Clinical Dentistry',
      badge: 'Healthcare Clinic',
      description:
        'Patient discovery, treatment showcase, doctor profiles, and direct WhatsApp / online appointment booking flow.',
      imageSrc: '/images/Responsive Dental Clinic Website Showcase.png',
      altText: 'Responsive Dental Clinic Website Showcase demo by BRC STAR Partner',
      isDemo: true,
      technologies: ['Next.js', 'Tailwind CSS', 'WhatsApp Booking', 'Local SEO'],
    },
    {
      id: 'textile-manufacturing',
      title: 'BRCtex Global Textile & Fabric Mill Portal',
      industry: 'Textile & Industrial Manufacturing',
      badge: 'Textile & Industrial',
      description:
        'B2B yarn and fabric catalog, weaving machinery showcase, sample request pipeline, and export certifications display.',
      imageSrc: '/images/Brctex Responsive Textile Website Showcase.png',
      altText: 'BRCtex Responsive Textile Website Showcase demo by BRC STAR Partner',
      isDemo: true,
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
      technologies: ['Headless E-commerce', 'Razorpay', 'Next.js', 'TypeScript'],
    },
    {
      id: 'saas-logistics',
      title: 'Enterprise Fleet & Logistics Orchestration Console',
      industry: 'SaaS & Custom Software',
      badge: 'SaaS & Custom Software',
      description:
        'Real-time fleet telemetry, multi-stop routing optimization algorithms, and automated warehouse dispatch queues.',
      imageSrc: '/images/brc-star-multi-device-tech-showcase.jpg',
      altText: 'Enterprise Fleet Logistics SaaS Console demonstration by BRC STAR Partner',
      isDemo: true,
      technologies: ['React / Next.js', 'WebSockets', 'PostgreSQL', 'Redis'],
    },
    {
      id: 'luxury-jewellery',
      title: 'DAXY Diamond & Fine Jewellery Digital Flagship',
      industry: 'Luxury Retail & E-commerce',
      badge: 'Luxury E-Commerce',
      description:
        'Ultra-luxury catalog browsing, 360 diamond preview ergonomics, private concierge booking, and secure transactions.',
      imageSrc: '/images/DAXY Diamond Luxury Showcase.png',
      altText: 'DAXY Diamond Luxury Showcase demonstration by BRC STAR Partner',
      isDemo: true,
      technologies: ['Interactive Catalog', 'Next.js App Router', 'Stripe/Razorpay', 'Tailwind'],
    },
    {
      id: 'wellness-beauty',
      title: 'Pastel Beauty & Organic Wellness Flagship',
      industry: 'Wellness & Beauty Salon',
      badge: 'Beauty & Wellness',
      description:
        'Clean aesthetic appointment suite, treatment menu navigation, social proof integrations, and WhatsApp client triage.',
      imageSrc: '/images/Pastel Beauty and Wellness Website Mockup.png',
      altText: 'Pastel Beauty and Wellness Website Mockup demonstration by BRC STAR Partner',
      isDemo: true,
      technologies: ['Responsive Design', 'Direct WhatsApp', 'Local SEO', 'Fast CDN'],
    },
  ];

  const categories = ['All', 'Healthcare Clinic', 'Textile & Industrial', 'E-commerce & Fashion', 'SaaS & Custom Software'];

  const filteredProjects = selectedCategory === 'All'
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
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Demonstrated Engineering Capabilities</span>
          </div>

          <h2
            id="portfolio-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Explore Our Website Portfolio
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Explore selected website demonstrations created for different industries and business needs.
          </p>

          {/* Transparent Demonstration Notice */}
          <div className="mx-auto max-w-2xl p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              <strong>Note:</strong> Demonstration websites engineered by BRC STAR Partner to prove design and technical capability.
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white dark:bg-[#0e1628] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Visual Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const waUrl = getWhatsAppUrl({
              industry: project.industry,
              requirement: `I am interested in a project similar to ${project.title}`,
            });

            return (
              <div
                key={project.id}
                id={`portfolio-card-${project.id}`}
                className="rounded-3xl bg-white dark:bg-[#0a101d] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/40 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Visual Image Header */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setActivePreviewImage(project)}
                >
                  <img
                    src={project.imageSrc}
                    alt={project.altText}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600 text-white shadow-xs">
                      Demo
                    </span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-slate-300 border border-white/10">
                      {project.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 font-mono block">
                      {project.industry}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActivePreviewImage(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Demo →</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Discuss Similar</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects / Inquiry CTA banner */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onOpenInquiry('Custom Website Portfolio Inquiry')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <span>Discuss Your Custom Website Requirements With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Preview Modal */}
      {activePreviewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePreviewImage(null)}
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
                  {activePreviewImage.industry} • Demo Showcase
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePreviewImage(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-slate-900 rounded-xl overflow-hidden">
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
              <button
                type="button"
                onClick={() => {
                  const proj = activePreviewImage;
                  setActivePreviewImage(null);
                  onOpenInquiry(proj.title);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 cursor-pointer"
              >
                Discuss a Similar Project →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
