'use client';

import React from 'react';
import {
  ArrowRight,
  Store,
  Factory,
  Layers,
  Sparkles,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface BusinessPathwaysSectionProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export function BusinessPathwaysSection({ onOpenInquiry }: BusinessPathwaysSectionProps) {
  const solutions = [
    {
      id: 'business-website',
      title: 'Business Website',
      badge: 'Clinics, Salons & Retailers',
      target: 'Clinics, dental practices, salons, service providers, retailers, and local businesses.',
      description:
        'Build a professional online presence that helps customers discover your services, understand your business, and contact you easily.',
      imageSrc: '/images/Responsive Dental Clinic Website Showcase.png',
      imageAlt: 'Professional Dental Clinic and Business Website Showcase by BRC STAR Partner',
      ctaText: 'Explore Business Websites →',
      serviceQuery: 'Business Website',
      whatsappParam: {
        industry: 'Clinics / Healthcare / Retail / Local Business',
        requirement: 'Professional Business Website (Discovery, Services, Direct WhatsApp)',
      },
    },
    {
      id: 'industrial-textile',
      title: 'Industrial & Textile Website',
      badge: 'Mills, Factories & Exporters',
      target: 'Manufacturers, exporters, textile mills, dyeing and printing units, and industrial suppliers.',
      description:
        'Present your manufacturing capabilities, products, infrastructure, and company profile through a professional industrial website.',
      imageSrc: '/images/Brctex Responsive Textile Website Showcase.png',
      imageAlt: 'BRCtex Textile Manufacturing and Industrial Website Showcase by BRC STAR Partner',
      ctaText: 'Explore Industrial Websites →',
      serviceQuery: 'Industrial & Textile Website',
      whatsappParam: {
        industry: 'Textile / Manufacturing / Dyeing Mills / Exporters',
        requirement: 'Industrial & Textile Website (Capabilities, B2B Catalog, Infrastructure)',
      },
    },
    {
      id: 'ecommerce-custom-software',
      title: 'E-commerce & Custom Software',
      badge: 'Online Stores, SaaS & Portals',
      target: 'Online retailers, startups, SaaS businesses, and organizations requiring portals, applications, and automation.',
      description:
        'Build online stores, custom web applications, customer portals, and business automation around your requirements.',
      imageSrc: '/images/DAXY Diamond Luxury Showcase.png',
      imageAlt: 'E-commerce and Custom Software Showcase by BRC STAR Partner',
      ctaText: 'Explore Digital Solutions →',
      serviceQuery: 'E-commerce & Custom Software',
      whatsappParam: {
        industry: 'E-commerce / Startups / SaaS / Enterprise Portals',
        requirement: 'E-commerce Store / Custom Web Application / Automation Portal',
      },
    },
  ];

  return (
    <section
      id="choose-solution"
      className="py-20 sm:py-24 bg-white dark:bg-[#060911] relative overflow-hidden transition-colors border-b border-slate-200 dark:border-slate-800/80"
      aria-labelledby="choose-solution-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Tailored Digital Solutions</span>
          </div>

          <h2
            id="choose-solution-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            What does your business need?
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Select the digital solution tailored to your operational scale, target audience, and business goals.
          </p>
        </div>

        {/* 3 Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item) => {
            const waUrl = getWhatsAppUrl(item.whatsappParam);

            return (
              <div
                key={item.id}
                id={`solution-card-${item.id}`}
                className="rounded-3xl bg-slate-50 dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/90 hover:border-blue-400 dark:hover:border-blue-500/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl dark:hover:shadow-blue-950/20 group"
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-blue-300 border border-white/10">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-7 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.title}
                    </h3>

                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      <strong>Target:</strong> {item.target}
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => onOpenInquiry(item.serviceQuery)}
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 transition-all cursor-pointer"
                    >
                      <span>{item.ctaText}</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Ask on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
