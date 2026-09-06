'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { Shield, Lock, Eye, FileText, CheckCircle2, ChevronLeft, ArrowRight, Mail } from 'lucide-react';
import { BRC_STAR_INFO } from '@/lib/data';

export default function PrivacyPolicyPage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Navbar onOpenInquiry={() => setInquiryModalOpen(true)} />

      <main className="flex-grow pt-28 sm:pt-36 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-blue-400">Privacy Policy</span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-slate-800/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Data Protection & Privacy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              At BRC STAR (”we”, ”us”, or ”our”), we take your privacy and commercial confidentiality seriously. This Privacy Policy outlines our transparent data collection, processing, and protection practices when you use our website (<span className="text-blue-400 font-mono">https://brcpartner.brcstar.in</span>) and engage our engineering services.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <span>Effective Date: September 1, 2026</span>
              <span>•</span>
              <span>Last Updated: September 2026</span>
              <span>•</span>
              <span className="text-emerald-400">GDPR & DPDP Compliant</span>
            </div>
          </div>

          {/* Policy Content Sections */}
          <div className="space-y-10 text-sm leading-relaxed text-slate-300">
            {/* Section 1 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">01.</span> Information We Collect
              </h2>
              <p>
                We only collect information necessary to deliver high-performance software engineering services, communicate milestone deliverables, execute payment contracts, and maintain secure client portals:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-400 pt-2">
                <li><strong className="text-slate-200">Contact & Identity Data:</strong> Full name, professional email address, phone number, company name, and job title provided via inquiry forms or checkout.</li>
                <li><strong className="text-slate-200">Project & Technical Specifications:</strong> Architectural requirements, feature scope briefs, tech stack preferences, repository links, and milestone deliverables.</li>
                <li><strong className="text-slate-200">Transaction & Billing Data:</strong> Order references, GSTIN identifiers, currency preferences, and milestone transaction statuses processed via PCI-DSS compliant payment gateways (Razorpay / Stripe). We never store raw debit/credit card numbers on our servers.</li>
                <li><strong className="text-slate-200">Technical & Analytical Data:</strong> IP address, browser type, device telemetry, session duration, and navigation flow to diagnose latency and ensure 99.9% uptime.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">02.</span> How We Use Your Information
              </h2>
              <p>Your data is processed strictly for legitimate commercial and engineering purposes:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#060a14] border border-slate-800/80">
                  <h3 className="font-semibold text-white text-xs mb-1">Contractual Delivery</h3>
                  <p className="text-xs text-slate-400">Scoping, designing, deploying custom codebases, and assigning 100% IP ownership.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#060a14] border border-slate-800/80">
                  <h3 className="font-semibold text-white text-xs mb-1">Commercial Billing</h3>
                  <p className="text-xs text-slate-400">Generating compliant GST tax invoices, Statement of Work (SOW) documents, and payment receipts.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#060a14] border border-slate-800/80">
                  <h3 className="font-semibold text-white text-xs mb-1">Engineering Support</h3>
                  <p className="text-xs text-slate-400">Providing dedicated 30 to 90-day post-launch warranty, security patches, and SLA monitoring.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#060a14] border border-slate-800/80">
                  <h3 className="font-semibold text-white text-xs mb-1">Legal & Compliance</h3>
                  <p className="text-xs text-slate-400">Adhering to statutory tax reporting, SOC2 / GDPR compliance benchmarks, and audit logs.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">03.</span> Confidentiality & Non-Disclosure (NDA)
              </h2>
              <p>
                BRC STAR operates under strict commercial non-disclosure guidelines. All proprietary algorithms, business logic, customer databases, trade secrets, and source code repositories entrusted to or developed by us for you are treated as strictly confidential and will never be shared, sold, or exposed to third parties.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">04.</span> Data Security & Infrastructure Protection
              </h2>
              <p>
                We implement industry-standard zero-trust architectures, end-to-end SSL/TLS 1.3 encryption for in-transit data, AES-256 encryption at rest, role-based access control (RBAC), and automated vulnerability auditing to protect your data against unauthorized access, alteration, or disclosure.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">05.</span> Your Rights & Data Subject Requests
              </h2>
              <p>
                Under applicable data protection laws (including GDPR and the Digital Personal Data Protection Act), you hold the right to access, rectify, port, or request permanent erasure of your personal data stored within our client records. To exercise these rights, please email our Privacy Officer directly.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3 bg-[#0a1020]/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">06.</span> Contact Us
              </h2>
              <p>
                For questions regarding this Privacy Policy or data processing practices, please contact:
              </p>
              <div className="pt-2 text-xs font-mono text-slate-300 space-y-1">
                <p><strong className="text-white">Entity:</strong> BRC STAR Engineering Team</p>
                <p><strong className="text-white">Email:</strong> <a href={`mailto:${BRC_STAR_INFO.contactEmail}`} className="text-blue-400 hover:underline">{BRC_STAR_INFO.contactEmail}</a></p>
                <p><strong className="text-white">Website:</strong> https://brcpartner.brcstar.in</p>
                <p><strong className="text-white">Location:</strong> {BRC_STAR_INFO.location}</p>
              </div>
            </section>
          </div>

          {/* Bottom Legal Navigation Bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3 text-slate-400">
              <span className="text-slate-500 font-mono uppercase text-[11px]">Related Legal:</span>
              <Link href="/terms-and-conditions" className="hover:text-blue-400 text-slate-300 underline underline-offset-4">
                Terms &amp; Conditions
              </Link>
              <span>•</span>
              <Link href="/disclaimer" className="hover:text-blue-400 text-slate-300 underline underline-offset-4">
                Disclaimer
              </Link>
              <span>•</span>
              <Link href="/cookies-policy" className="hover:text-blue-400 text-slate-300 underline underline-offset-4">
                Cookies Policy
              </Link>
            </div>

            <button
              onClick={() => setInquiryModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors cursor-pointer text-xs"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>

      <Footer onOpenInquiry={() => setInquiryModalOpen(true)} />

      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService="Website Development"
      />
    </div>
  );
}
