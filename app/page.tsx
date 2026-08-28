'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { BusinessProblemSection } from '@/components/BusinessProblemSection';
import { SolutionsSection } from '@/components/SolutionsSection';
import { ProjectShowcaseSection } from '@/components/ProjectShowcaseSection';
import { WhyBrcStarSection } from '@/components/WhyBrcStarSection';
import { DevelopmentProcessSection } from '@/components/DevelopmentProcessSection';
import { TechStackSection } from '@/components/TechStackSection';
import { ProjectEstimatorSection } from '@/components/ProjectEstimatorSection';
import { FaqSection } from '@/components/FaqSection';
import { FinalCtaSection } from '@/components/FinalCtaSection';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';

export default function HomePage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [initialService, setInitialService] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (serviceName?: string) => {
    setInitialService(serviceName);
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
    setInitialService(undefined);
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Content Flow */}
      <main className="flex-grow">
        {/* 1. Hero Section with Live Product Mockup */}
        <Hero onOpenInquiry={() => handleOpenInquiry()} />

        {/* 2. Trust & Capabilities Strip */}
        <TrustStrip />

        {/* 3. Business Problem vs. Engineered Solution */}
        <BusinessProblemSection onOpenInquiry={() => handleOpenInquiry('Architecture Audit')} />

        {/* 4. Core Solutions & Services Grid */}
        <SolutionsSection onOpenInquiry={handleOpenInquiry} />

        {/* 5. Visual Project Showcase & Deep-Dive Case Studies */}
        <ProjectShowcaseSection onOpenInquiry={handleOpenInquiry} />

        {/* 6. Why BRC STAR & Comparison Matrix */}
        <WhyBrcStarSection onOpenInquiry={() => handleOpenInquiry()} />

        {/* 7. 6-Stage Engineering Development Lifecycle */}
        <DevelopmentProcessSection onOpenInquiry={() => handleOpenInquiry('Stage 01 Discovery')} />

        {/* 8. Modern Technology Stack */}
        <TechStackSection onOpenInquiry={() => handleOpenInquiry('Technology Advisory')} />

        {/* 9. Investment Packages & Interactive Scope Estimator */}
        <ProjectEstimatorSection onOpenInquiry={handleOpenInquiry} />

        {/* 10. FAQ Section */}
        <FaqSection onOpenInquiry={() => handleOpenInquiry()} />

        {/* 11. Final High-Conversion Action Section */}
        <FinalCtaSection onOpenInquiry={() => handleOpenInquiry()} />
      </main>

      {/* Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry()} />

      {/* Global Interactive Project Intake / Consultation Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={handleCloseInquiry}
        initialService={initialService}
      />
    </div>
  );
}
