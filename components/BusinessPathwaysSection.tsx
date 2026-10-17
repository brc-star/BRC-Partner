'use client';

import React from 'react';
import {
  Store,
  Factory,
  Rocket,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface BusinessPathwaysSectionProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export function BusinessPathwaysSection({ onOpenInquiry }: BusinessPathwaysSectionProps) {
  const pathways = [
    {
      id: 'local-business',
      badge: 'Local Businesses & Clinics',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
      icon: Store,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      title: 'Local Businesses, Clinics & Retailers',
      audience: 'Dental clinics, salons, healthcare centers, gyms, showrooms & professional service providers.',
      description:
        'Transform your offline local presence into a high-converting digital storefront that attracts nearby customers and drives appointments.',
      benefits: [
        'Mobile-first high-speed responsive website',
        'Direct 1-click WhatsApp appointment booking',
        'Google Business Profile & local map optimization',
        'Transparent pricing starting at ₹29,999 (No lock-in)',
      ],
      primaryActionLabel: 'Explore Local Business Package',
      serviceQuery: 'Local Business & Clinic Website',
      whatsAppParams: {
        industry: 'Local Business / Clinic / Retail',
        requirement: 'High-Converting Website with WhatsApp & Google Maps Integration',
      },
    },
    {
      id: 'textile-manufacturing',
      badge: 'Textile & Manufacturing Units',
      badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      icon: Factory,
      iconColor: 'text-blue-600 dark:text-blue-400',
      title: 'Textile Mills, Factories & Exporters',
      audience: 'Dyeing & printing mills, fabric weavers, garment manufacturers, wholesalers & export houses.',
      description:
        'Replace manual PDF catalogs and disorganized sample requests with a dedicated B2B wholesale portal and digital showroom.',
      benefits: [
        'Interactive digital design & fabric catalog showcase',
        'Automated buyer sample request & quotation pipeline',
        'Wholesale buyer portals with secure order intake',
        'Direct WhatsApp inquiry capture for bulk buyers',
      ],
      primaryActionLabel: 'Explore Manufacturing Solutions',
      serviceQuery: 'Textile & Manufacturing B2B Portal',
      whatsAppParams: {
        industry: 'Textile / Manufacturing / Export',
        requirement: 'B2B Digital Showroom & Wholesale Order System',
      },
    },
    {
      id: 'startups-enterprise',
      badge: 'Startups & Enterprise',
      badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-400 border-purple-200 dark:border-purple-800',
      icon: Rocket,
      iconColor: 'text-purple-600 dark:text-purple-400',
      title: 'Startups, SaaS & Custom Enterprise',
      audience: 'Funded tech startups, SaaS founders, corporate business units & scale-ups building digital products.',
      description:
        'Architect and ship production-grade web applications, client portals, mobile apps, and automated AI copilots with clean code.',
      benefits: [
        'Full-stack Next.js, Node.js & PostgreSQL architecture',
        'Mobile apps with React Native (iOS & Android)',
        'Custom AI copilots & document intelligence (RAG)',
        '100% full source code ownership & Git handover',
      ],
      primaryActionLabel: 'Schedule Technical Discovery',
      serviceQuery: 'Startup SaaS & Custom Software Architecture',
      whatsAppParams: {
        industry: 'Startup / Enterprise / SaaS',
        requirement: 'Custom Web Application / Mobile App / AI Copilot',
      },
    },
  ];

  return (
    <section
      id="business-pathways"
      className="py-20 sm:py-24 bg-white dark:bg-[#070c18] relative overflow-hidden transition-colors border-b border-slate-200 dark:border-slate-800/80"
      aria-labelledby="pathways-headline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Tailored Solutions by Industry</span>
          </div>

          <h2
            id="pathways-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Choose Your Business Path
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Every business model has distinct operational goals. Select your category to view engineered capabilities designed specifically for your growth.
          </p>
        </div>

        {/* 3 Pathway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pathways.map((path) => {
            const IconComponent = path.icon;
            const waUrl = getWhatsAppUrl(path.whatsAppParams);

            return (
              <div
                key={path.id}
                id={`pathway-card-${path.id}`}
                className="rounded-3xl bg-slate-50 dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/90 hover:border-blue-400 dark:hover:border-blue-500/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl dark:hover:shadow-blue-950/20 group"
              >
                <div className="space-y-5">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${path.badgeColor}`}
                    >
                      {path.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <IconComponent className={`w-5 h-5 ${path.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {path.title}
                  </h3>

                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {path.audience}
                  </p>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {path.description}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                      Key Inclusions:
                    </span>
                    {path.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
                  <button
                    type="button"
                    onClick={() => onOpenInquiry(path.serviceQuery)}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 transition-all cursor-pointer"
                  >
                    <span>{path.primaryActionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
