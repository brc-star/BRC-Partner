'use client';

import React from 'react';
import { Smartphone, Search, MessageSquare, ClipboardCheck } from 'lucide-react';

export function TrustStrip() {
  const trustItems = [
    {
      title: 'Mobile-Friendly',
      desc: 'Responsive, fluid layouts thoroughly tested for fast loading on all screen sizes and mobile browsers.',
      icon: Smartphone,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800/40',
    },
    {
      title: 'SEO-Ready',
      desc: 'Technical SEO foundations: semantic HTML, clean metadata, Open Graph tags, fast LCP, and XML sitemaps.',
      icon: Search,
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/40',
    },
    {
      title: 'WhatsApp Enquiry',
      desc: 'Integrated click-to-chat triggers so your prospective clients can contact you directly with zero friction.',
      icon: MessageSquare,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/60 border-green-200 dark:border-green-800/40',
    },
    {
      title: 'Clear Project Scope',
      desc: 'Project scope, deliverables, transparent pricing, and milestones are fully clarified before work begins.',
      icon: ClipboardCheck,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800/40',
    },
  ];

  return (
    <section
      id="trust-section"
      className="border-y border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#070b14] py-12 sm:py-14 relative z-20"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2
            id="trust-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Why businesses choose BRC STAR Partner
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
            Practical engineering foundations that ensure dependable performance, high conversion, and complete delivery peace of mind.
          </p>
        </div>

        {/* 4 Concise Trust Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-start gap-3"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${item.bgColor} border flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
