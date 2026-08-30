'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PricingCardsSection } from '@/components/PricingCardsSection';
import { WhyBrcStarSection } from '@/components/WhyBrcStarSection';
import { PricingFaqSection } from '@/components/PricingFaqSection';
import { ProjectInquiryForm } from '@/components/ProjectInquiryForm';
import { RazorpayCheckoutModal } from '@/components/RazorpayCheckoutModal';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { PricingPlan, PricingMarket } from '@/types/payment';
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import Script from 'next/script';

export default function PricingPage() {
  const [market, setMarket] = useState<PricingMarket>('india');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryInitialService, setInquiryInitialService] = useState('Website Development');

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlanForCheckout(plan);
  };

  const handleOpenInquiry = (serviceName?: string, inquiryMarket?: PricingMarket) => {
    setInquiryInitialService(serviceName || 'Website Development');
    if (inquiryMarket) {
      setMarket(inquiryMarket);
    }
    setInquiryModalOpen(true);
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Software Development & Engineering',
    provider: {
      '@type': 'Organization',
      name: 'BRC STAR',
      url: 'https://brcpartner.brcstar.in',
      logo: 'https://brcpartner.brcstar.in/icon.png',
    },
    areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'CA', 'AU'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'BRC STAR Software Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Custom Next.js & React Web Platforms (Inclusive of 18% GST)',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '29999',
            priceCurrency: 'INR',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-Commerce Development',
            description: 'Full-Stack E-Commerce & Storefront Architecture (Inclusive of 18% GST)',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '69999',
            priceCurrency: 'INR',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development',
            description: 'Cross-Platform React Native iOS & Android Development (Inclusive of 18% GST)',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '119999',
            priceCurrency: 'INR',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI & Automation',
            description: 'Enterprise AI Agents, RAG Pipelines & Workflow Automation (Inclusive of 18% GST)',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '149999',
            priceCurrency: 'INR',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SaaS / Web Application',
            description: 'Multi-Tenant SaaS, B2B Portals & High-Scale Systems (Inclusive of 18% GST)',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '249999',
            priceCurrency: 'INR',
          },
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Script
        id="pricing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar onOpenInquiry={handleOpenInquiry} />

      <main className="flex-grow pt-28 sm:pt-36">
        {/* Page Hero */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6 pb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>5 Core Engineering Categories</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Transparent Product Engineering with <span className="text-blue-400">Zero Hidden Surcharges</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Transparent starting rates across Web Development, E-Commerce, Mobile Apps, AI &amp; Automation, and SaaS Web Applications. All customer-facing prices are inclusive of 18% GST with 100% intellectual property ownership and dedicated post-launch support.
          </p>

          {/* Quick Metrics Strip */}
          <div className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono">Payment Standard</span>
              <p className="text-xs font-bold text-white">Milestone Sprints</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono">Source Code</span>
              <p className="text-xs font-bold text-emerald-400">100% Client Owned</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono">Delivery Velocity</span>
              <p className="text-xs font-bold text-blue-400">2 to 8-Week Sprints</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a101f] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono">Architect Review</span>
              <p className="text-xs font-bold text-purple-400">24h Response SLA</p>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section with Market Switcher & 5 Cards */}
        <PricingCardsSection
          market={market}
          onMarketChange={(newMarket) => setMarket(newMarket)}
          onSelectPlan={handleSelectPlan}
          onRequestQuote={handleOpenInquiry}
        />

        {/* Comparison Matrix / Deliverables Table with Dynamic Prices */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
              <span>{market === 'india' ? '🇮🇳 India Market Benchmarks' : '🇺🇸 USA & Global Benchmarks'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Plan Deliverables &amp; Technical Capabilities Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              Compare included engineering specifications and technical architecture across all 5 core service tiers.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090e1c] shadow-2xl">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 text-slate-300 font-semibold uppercase tracking-wider bg-[#060a14]">
                  <th className="py-4 px-4 sm:px-6">Engineering Standard</th>
                  <th className="py-4 px-3 text-center">Web Development</th>
                  <th className="py-4 px-3 text-center text-blue-400">E-Commerce</th>
                  <th className="py-4 px-3 text-center">Mobile App</th>
                  <th className="py-4 px-3 text-center">AI &amp; Automation</th>
                  <th className="py-4 px-3 text-center">SaaS / Web App</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Starting Price (Incl. 18% GST)</td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-white">
                    ₹29,999
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-400">
                    ₹69,999
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-white">
                    ₹1,19,999
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-white">
                    ₹1,49,999
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-white">
                    ₹2,49,999
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Typical Timeline</td>
                  <td className="py-3.5 px-3 text-center font-mono">2-4 Wks</td>
                  <td className="py-3.5 px-3 text-center font-mono text-blue-300">4-6 Wks</td>
                  <td className="py-3.5 px-3 text-center font-mono">6-8 Wks</td>
                  <td className="py-3.5 px-3 text-center font-mono">4-7 Wks</td>
                  <td className="py-3.5 px-3 text-center font-mono">8-14 Wks</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Database &amp; Schemas</td>
                  <td className="py-3.5 px-3 text-center">MDX / Headless CMS</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓ PostgreSQL / Prisma</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓ PostgreSQL / SQLite</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓ pgvector / Supabase</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓ Cloud SQL / Sharded</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Payment &amp; Billing</td>
                  <td className="py-3.5 px-3 text-center text-slate-500">—</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓ {market === 'india' ? 'Razorpay (UPI/Cards)' : 'Stripe & Apple Pay'}</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓ StoreKit / Gateway</td>
                  <td className="py-3.5 px-3 text-center text-slate-500">—</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓ Multi-Gateway &amp; ERP</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white">100% IP &amp; Git Handover</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">✓ Full IaC Handover</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Post-Launch Warranty</td>
                  <td className="py-3.5 px-3 text-center">30 Days</td>
                  <td className="py-3.5 px-3 text-center">45 Days</td>
                  <td className="py-3.5 px-3 text-center">60 Days</td>
                  <td className="py-3.5 px-3 text-center">45 Days</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400">90 Days Priority SLA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Why BRC STAR Section (6 Pillars) */}
        <WhyBrcStarSection market={market} />

        {/* FAQ Section */}
        <PricingFaqSection
          market={market}
          onRequestQuote={handleOpenInquiry}
        />

        {/* Embedded Project Inquiry Section */}
        <section id="custom-inquiry-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <span>Have a Custom Specification?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Request an Itemized Engineering Proposal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              If your requirements span multi-platform ecosystems or custom enterprise integrations, submit your scope below for a milestone estimate.
            </p>
          </div>

          <ProjectInquiryForm initialService="Website Development" />
        </section>
      </main>

      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Checkout Modal */}
      <RazorpayCheckoutModal
        isOpen={Boolean(selectedPlanForCheckout)}
        onClose={() => setSelectedPlanForCheckout(null)}
        selectedPlan={selectedPlanForCheckout}
      />

      {/* Global Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService={inquiryInitialService}
        market={market}
      />
    </div>
  );
}
