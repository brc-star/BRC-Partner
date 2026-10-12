'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';

const NeonParticleBackground = dynamic(
  () => import('@/components/three/NeonParticleBackground'),
  { ssr: false }
);
import { HomepageSlider } from '@/components/HomepageSlider';
import { TldrSummaryBlock } from '@/components/TldrSummaryBlock';
import { TrustStrip } from '@/components/TrustStrip';
import { ProofOfWorkSection } from '@/components/ProofOfWorkSection';
import { VerificationMethodologySection } from '@/components/VerificationMethodologySection';
import { BusinessProblemSection } from '@/components/BusinessProblemSection';
import { SolutionsSection } from '@/components/SolutionsSection';
import { ProjectShowcaseSection } from '@/components/ProjectShowcaseSection';
import { WhyBrcStarSection } from '@/components/WhyBrcStarSection';
import { DevelopmentProcessSection } from '@/components/DevelopmentProcessSection';
import { TechStackSection } from '@/components/TechStackSection';
import { HomepagePricingPreview } from '@/components/HomepagePricingPreview';
import { ProjectEstimatorSection } from '@/components/ProjectEstimatorSection';
import { FaqSection } from '@/components/FaqSection';
import { FinalCtaSection } from '@/components/FinalCtaSection';
import { Footer } from '@/components/Footer';
import { StickyCta } from '@/components/StickyCta';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { ClaimProofDrawer } from '@/components/ClaimProofDrawer';
import { AUDITED_CLAIMS } from '@/lib/claim-proof-data';

export function HomePageClient() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [initialService, setInitialService] = useState<string | undefined>(undefined);

  // Claim → Proof Drawer State
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [isProofDrawerOpen, setIsProofDrawerOpen] = useState(false);

  const handleOpenInquiry = (serviceName?: string) => {
    setInitialService(serviceName);
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
    setInitialService(undefined);
  };

  const handleOpenClaimProof = (claimOrId: string | { id: string }) => {
    const id = typeof claimOrId === 'string' ? claimOrId : claimOrId.id;
    setSelectedClaimId(id);
    setIsProofDrawerOpen(true);
  };

  const handleCloseClaimProof = () => {
    setIsProofDrawerOpen(false);
    setSelectedClaimId(null);
  };

  const activeClaim = AUDITED_CLAIMS.find((c) => c.id === selectedClaimId) || null;

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#060911] dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* 3D Animated Neon Particle & Vertical Light Stream Background */}
      <NeonParticleBackground />

      {/* Top Header */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Content Flow */}
      <main className="relative z-10 flex-grow">
        {/* 1. Hero Section with Live Product Mockup */}
        <Hero
          onOpenInquiry={() => handleOpenInquiry()}
          onOpenClaimProof={handleOpenClaimProof}
        />

        {/* Portfolio Showcase Slider Container Section Below Hero */}
        <section
          id="portfolio-slider-section"
          aria-label="Portfolio Showcase"
          className="w-full flex justify-center items-center bg-transparent py-4 sm:py-6"
        >
          <div className="w-full max-w-[1774px] aspect-[1774/887] relative overflow-hidden">
            <HomepageSlider />
          </div>
        </section>

        {/* White Container Section with DAXY Diamond Luxury Showcase Above Executive Summary */}
        <section
          aria-label="DAXY Diamond Luxury Showcase"
          className="w-full flex justify-center items-center bg-transparent py-4 sm:py-6"
        >
          <div className="w-full max-w-[1774px] aspect-[1774/887] max-h-[887px] bg-[#FFFFFF] flex items-center justify-center overflow-hidden">
            <img
              src="/images/DAXY Diamond Luxury Showcase-optimized.jpg"
              alt="DAXY Diamond Luxury Showcase portfolio project by BRC STAR Partner"
              loading="lazy"
              decoding="async"
              className="block w-full h-full object-contain object-center"
            />
          </div>
        </section>

        {/* 2. Executive TL;DR Summary Block */}
        <TldrSummaryBlock onOpenInquiry={handleOpenInquiry} />

        {/* 3. Trust & Capabilities Strip */}
        <TrustStrip />

        {/* 3. Transparent Proof of Work & Live Telemetry Engine */}
        <ProofOfWorkSection
          onOpenClaimProof={handleOpenClaimProof}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 4. 5-Stage Claim Verification Methodology */}
        <VerificationMethodologySection onOpenInquiry={() => handleOpenInquiry('Verification Protocol')} />

        {/* 5. Business Problem vs. Engineered Solution */}
        <BusinessProblemSection onOpenInquiry={() => handleOpenInquiry('Architecture Audit')} />

        {/* Dedicated India SME / Regional Business Section */}
        <section
          id="sme-business-showcase"
          className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-[#0c1324] border border-blue-700/40 p-6 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-700/60 text-blue-300 text-xs font-mono">
                <span>🇮🇳 For Indian Business Owners &amp; SMEs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Apna Business Online Laana Hai? ₹29,999 se Website, WhatsApp aur Google Maps ke Saath
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Local business, retail store, factory ya service provider—hum banate hain ultra-fast, mobile-friendly websites with direct WhatsApp lead capture, Google Business Profile integration, and 100% complete source code ownership. Zero monthly template lock-in.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleOpenInquiry('Basic Website (₹29,999)')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                Start ₹29,999 Website SOW
              </button>
              <a
                href="https://wa.me/919913159932?text=Hello%20BRC%20STAR,%20I%20want%20to%20build%20a%20website%20for%20my%20business"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>WhatsApp par Baat Karein</span>
              </a>
            </div>
          </div>
        </section>

        {/* 6. Core Solutions & Services Grid */}
        <SolutionsSection onOpenInquiry={handleOpenInquiry} />

        {/* 7. Visual Project Showcase & Deep-Dive Case Studies */}
        <ProjectShowcaseSection
          onOpenInquiry={handleOpenInquiry}
          onOpenClaimProof={handleOpenClaimProof}
        />

        {/* 8. Why BRC STAR & Comparison Matrix */}
        <WhyBrcStarSection onOpenInquiry={() => handleOpenInquiry()} />

        {/* 9. 6-Stage Engineering Development Lifecycle */}
        <DevelopmentProcessSection onOpenInquiry={() => handleOpenInquiry('Stage 01 Discovery')} />

        {/* 10. Modern Technology Stack */}
        <TechStackSection onOpenInquiry={() => handleOpenInquiry('Technology Advisory')} />

        {/* 11. Clean Starting Pricing Preview */}
        <HomepagePricingPreview />

        {/* 12. Investment Packages & Interactive Scope Estimator */}
        <ProjectEstimatorSection onOpenInquiry={handleOpenInquiry} />

        {/* 12. FAQ Section */}
        <FaqSection onOpenInquiry={() => handleOpenInquiry()} />

        {/* 13. Final High-Conversion Action Section */}
        <FinalCtaSection onOpenInquiry={() => handleOpenInquiry()} />
      </main>

      {/* Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry()} />

      {/* Persistent Sticky CTA */}
      <StickyCta onOpenInquiry={handleOpenInquiry} />

      {/* Global Interactive Project Intake / Consultation Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={handleCloseInquiry}
        initialService={initialService}
      />

      {/* Interactive Claim → Proof Drawer / Modal */}
      <ClaimProofDrawer
        claim={activeClaim}
        isOpen={isProofDrawerOpen}
        onClose={handleCloseClaimProof}
        onOpenInquiry={handleOpenInquiry}
        onSelectAnotherClaim={handleOpenClaimProof}
      />
    </div>
  );
}
