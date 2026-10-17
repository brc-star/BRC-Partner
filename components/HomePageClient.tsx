'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';

const NeonParticleBackground = dynamic(
  () => import('@/components/three/NeonParticleBackground'),
  { ssr: false }
);
import { TrustStrip } from '@/components/TrustStrip';
import { BusinessPathwaysSection } from '@/components/BusinessPathwaysSection';
import { ProjectShowcaseSection } from '@/components/ProjectShowcaseSection';
import { SolutionsSection } from '@/components/SolutionsSection';
import { HomepagePricingPreview } from '@/components/HomepagePricingPreview';
import { DevelopmentProcessSection } from '@/components/DevelopmentProcessSection';
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
      {/* 3D Animated Neon Particle Background (Deferred execution to prevent main thread blocking) */}
      <NeonParticleBackground />

      {/* 1. Header & Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Content Flow in Strict Conversion-Focused Order (Sections 1-11) */}
      <main className="relative z-10 flex-grow">
        {/* 2. Hero Section with Approved Copy, Dual CTAs & Direct WhatsApp Prompt */}
        <Hero
          onOpenInquiry={handleOpenInquiry}
          onOpenClaimProof={handleOpenClaimProof}
        />

        {/* 3. Factual Trust Strip */}
        <TrustStrip />

        {/* 4. Choose Your Business Path (Local Businesses | Textile & Manufacturing | Startups & Enterprise) */}
        <BusinessPathwaysSection onOpenInquiry={handleOpenInquiry} />

        {/* 5. Featured Portfolio (Real engineering demonstrations and reference systems) */}
        <ProjectShowcaseSection
          onOpenInquiry={handleOpenInquiry}
          onOpenClaimProof={handleOpenClaimProof}
        />

        {/* 6. Core Services Grid (Streamlined 6 core categories) */}
        <SolutionsSection onOpenInquiry={handleOpenInquiry} />

        {/* 7. Transparent Starting Pricing (Starting at ₹29,999) */}
        <HomepagePricingPreview />

        {/* 8. How It Works (Predictable engineering lifecycle) */}
        <DevelopmentProcessSection onOpenInquiry={() => handleOpenInquiry('Discovery & Scoping')} />

        {/* 9. Trust, FAQs & Risk Reduction */}
        <FaqSection onOpenInquiry={() => handleOpenInquiry()} />

        {/* 10. Final High-Conversion Action Section */}
        <FinalCtaSection onOpenInquiry={() => handleOpenInquiry()} />
      </main>

      {/* 11. Footer */}
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
