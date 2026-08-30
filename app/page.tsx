'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
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

export default function HomePage() {
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
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Content Flow */}
      <main className="flex-grow">
        {/* 1. Hero Section with Live Product Mockup */}
        <Hero
          onOpenInquiry={() => handleOpenInquiry()}
          onOpenClaimProof={handleOpenClaimProof}
        />

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
