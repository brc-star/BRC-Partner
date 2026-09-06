'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { AlertTriangle, ChevronLeft, ArrowRight } from 'lucide-react';

export default function DisclaimerPage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Navbar onOpenInquiry={() => setInquiryModalOpen(true)} />

      <main className="flex-grow pt-28 sm:pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-blue-400">Disclaimer</span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-slate-800/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <AlertTriangle className="w-3.5 h-3.5 text-blue-400" />
              <span>Legal Documentation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Disclaimer
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span><strong>Effective Date:</strong> 5 September 2026</span>
              <span>•</span>
              <span><strong>Last Updated:</strong> 5 September 2026</span>
            </div>
            <div className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2 space-y-3">
              <p>
                The information and services provided by BRC STAR OPC PRIVATE LIMITED (”BRC STAR”, ”we”, ”us”, or ”our”) through our website:
              </p>
              <p className="font-mono text-blue-400 text-sm">
                https://brcpartner.brcstar.in/
              </p>
              <p>
                are provided subject to the terms of this Disclaimer.
              </p>
              <p>
                By accessing or using our website, you acknowledge and agree to the terms described below.
              </p>
            </div>
          </div>

          {/* Disclaimer Content Sections */}
          <div className="space-y-8 text-sm sm:text-[15px] leading-relaxed text-slate-300">
            {/* 1. General Information Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                1. General Information Disclaimer
              </h2>
              <p>
                The information published on the BRC STAR website is provided for general informational and business purposes.
              </p>
              <p>
                While we make reasonable efforts to keep website information accurate and useful, we do not guarantee that all information is:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Complete;</li>
                <li>Accurate;</li>
                <li>Current;</li>
                <li>Error-free;</li>
                <li>Suitable for every user; or</li>
                <li>Available continuously.</li>
              </ul>
              <p className="pt-2">
                Website content may be changed, updated, corrected, or removed without prior notice.
              </p>
              <p>
                You should independently verify information before relying on it for important business, technical, financial, legal, or operational decisions.
              </p>
            </section>

            {/* 2. Technology Services Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                2. Technology Services Disclaimer
              </h2>
              <p>
                BRC STAR provides technology and digital services that may include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Website development;</li>
                <li>Web application development;</li>
                <li>Mobile application development;</li>
                <li>E-commerce solutions;</li>
                <li>Enterprise software;</li>
                <li>AI and automation;</li>
                <li>UI/UX design;</li>
                <li>Software consulting;</li>
                <li>Technology consulting;</li>
                <li>API integrations;</li>
                <li>Custom software development;</li>
                <li>Maintenance and support; and</li>
                <li>Other technology-related services.</li>
              </ul>
              <p className="pt-2">
                Descriptions of services, features, capabilities, estimated timelines, pricing, technologies, or deliverables appearing on our website are intended as general information unless specifically included in a formal quotation, proposal, statement of work, or agreement.
              </p>
              <p>
                Actual project scope and deliverables may vary based on the specific requirements of the client and the applicable written agreement.
              </p>
            </section>

            {/* 3. No Guarantee of Business Results */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                3. No Guarantee of Business Results
              </h2>
              <p>
                BRC STAR does not guarantee specific business or commercial results from the use of our services.
              </p>
              <p>We do not guarantee particular:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Revenue;</li>
                <li>Profit;</li>
                <li>Sales;</li>
                <li>Leads;</li>
                <li>Customers;</li>
                <li>Website traffic;</li>
                <li>Search-engine rankings;</li>
                <li>Conversion rates;</li>
                <li>Return on investment;</li>
                <li>Market share;</li>
                <li>User growth;</li>
                <li>App downloads; or</li>
                <li>Other business performance outcomes.</li>
              </ul>
              <p className="pt-2">
                Business results may depend on numerous factors outside our control, including market conditions, competition, pricing, customer behavior, advertising, content, business operations, third-party platforms, and the client&apos;s implementation of the technology.
              </p>
            </section>

            {/* 4. Project Estimates and Timelines */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                4. Project Estimates and Timelines
              </h2>
              <p>
                Any pricing, timelines, completion dates, development estimates, or technical estimates displayed or communicated by BRC STAR before a formal project agreement are estimates only.
              </p>
              <p>Actual requirements may change due to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Scope changes;</li>
                <li>Client feedback;</li>
                <li>Delayed approvals;</li>
                <li>Third-party integrations;</li>
                <li>Infrastructure dependencies;</li>
                <li>Technical complexity;</li>
                <li>Data requirements;</li>
                <li>Security requirements;</li>
                <li>Changes in specifications; or</li>
                <li>Other circumstances outside our reasonable control.</li>
              </ul>
              <p className="pt-2">
                A formal proposal, quotation, statement of work, or agreement will govern project-specific commitments where applicable.
              </p>
            </section>

            {/* 5. AI and Automated Technology Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                5. AI and Automated Technology Disclaimer
              </h2>
              <p>
                Certain BRC STAR services may use artificial intelligence, machine learning, automation, generative AI, or third-party AI technologies.
              </p>
              <p>AI-generated or automated outputs may be:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Inaccurate;</li>
                <li>Incomplete;</li>
                <li>Outdated;</li>
                <li>Unexpected;</li>
                <li>Misleading; or</li>
                <li>Unsuitable for a particular purpose.</li>
              </ul>
              <p className="pt-2">
                AI systems may also produce results that require human review, verification, editing, or approval.
              </p>
              <p>
                BRC STAR does not represent or warrant that AI-generated results will always be accurate, reliable, complete, unique, unbiased, or appropriate for every use case.
              </p>
              <p>
                Users and clients are responsible for reviewing and validating AI-generated outputs before relying upon or publishing them, particularly where the information may affect legal, financial, medical, regulatory, employment, safety, or other important decisions.
              </p>
            </section>

            {/* 6. Third-Party Services Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                6. Third-Party Services Disclaimer
              </h2>
              <p>
                Our services and digital products may depend on third-party technologies, platforms, APIs, hosting providers, payment processors, cloud services, software libraries, plugins, AI providers, analytics systems, communication providers, or other external services.
              </p>
              <p>
                The availability and functionality of such services may change without notice.
              </p>
              <p>BRC STAR does not guarantee the:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Availability;</li>
                <li>Performance;</li>
                <li>Accuracy;</li>
                <li>Security;</li>
                <li>Compatibility;</li>
                <li>Pricing;</li>
                <li>Reliability; or</li>
                <li>Continued operation</li>
              </ul>
              <p className="pt-2">
                of third-party services that are outside our direct control.
              </p>
              <p>
                Third-party services are subject to their own terms, conditions, licenses, and privacy policies.
              </p>
            </section>

            {/* 7. Website Availability Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                7. Website Availability Disclaimer
              </h2>
              <p>
                We aim to maintain a reliable website and digital infrastructure, but we do not guarantee that the website will always be:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Available;</li>
                <li>Uninterrupted;</li>
                <li>Secure;</li>
                <li>Error-free;</li>
                <li>Free from technical issues; or</li>
                <li>Free from harmful components.</li>
              </ul>
              <p className="pt-2">
                Temporary unavailability may occur due to maintenance, upgrades, hosting issues, network problems, security incidents, technical failures, or circumstances outside our reasonable control.
              </p>
            </section>

            {/* 8. Cybersecurity and Security Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                8. Cybersecurity and Security Disclaimer
              </h2>
              <p>
                We implement reasonable technical and organizational measures appropriate to the nature of our systems and services.
              </p>
              <p>
                However, no website, application, server, cloud environment, network, or internet transmission can be guaranteed to be completely secure.
              </p>
              <p>BRC STAR does not guarantee that systems will be completely immune from:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Hacking;</li>
                <li>Unauthorized access;</li>
                <li>Malware;</li>
                <li>Viruses;</li>
                <li>Cyberattacks;</li>
                <li>Data loss;</li>
                <li>Security vulnerabilities; or</li>
                <li>Other security incidents.</li>
              </ul>
              <p className="pt-2">
                Clients are responsible for maintaining appropriate security practices for their own accounts, devices, credentials, systems, and third-party services.
              </p>
            </section>

            {/* 9. Software and Defect Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                9. Software and Defect Disclaimer
              </h2>
              <p>Software development is a complex technical process.</p>
              <p>
                Although BRC STAR makes reasonable efforts to identify and address defects within the agreed scope, we do not guarantee that software, websites, applications, integrations, or digital products will be completely free from:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Bugs;</li>
                <li>Errors;</li>
                <li>Vulnerabilities;</li>
                <li>Compatibility issues;</li>
                <li>Performance limitations; or</li>
                <li>Unexpected behavior.</li>
              </ul>
              <p className="pt-2">
                Where a specific warranty, support period, or defect-resolution commitment is included in a project agreement, that agreement will govern the applicable service.
              </p>
            </section>

            {/* 10. Content and Information Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                10. Content and Information Disclaimer
              </h2>
              <p>Content published on our website may include:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Technical information;</li>
                <li>Service descriptions;</li>
                <li>Industry information;</li>
                <li>Educational material;</li>
                <li>Articles;</li>
                <li>Examples;</li>
                <li>Case studies;</li>
                <li>Project descriptions;</li>
                <li>Illustrations;</li>
                <li>Statistics; or</li>
                <li>Other informational material.</li>
              </ul>
              <p className="pt-2">
                Such content is provided for general informational purposes and should not automatically be interpreted as professional advice.
              </p>
              <p>
                You should obtain appropriate professional advice before making decisions requiring legal, financial, tax, regulatory, technical, or other specialized expertise.
              </p>
            </section>

            {/* 11. No Professional Advice */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                11. No Professional Advice
              </h2>
              <p>Unless expressly stated otherwise, information available through the BRC STAR website does not constitute:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Legal advice;</li>
                <li>Financial advice;</li>
                <li>Investment advice;</li>
                <li>Tax advice;</li>
                <li>Medical advice;</li>
                <li>Accounting advice;</li>
                <li>Regulatory advice; or</li>
                <li>Other regulated professional advice.</li>
              </ul>
              <p className="pt-2">
                BRC STAR is a technology and digital solutions company, and website content should not be treated as a substitute for advice from an appropriately qualified professional.
              </p>
            </section>

            {/* 12. Third-Party Links Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                12. Third-Party Links Disclaimer
              </h2>
              <p>
                Our website may contain links to websites, applications, platforms, or resources operated by third parties.
              </p>
              <p>
                These links may be provided for convenience or informational purposes only.
              </p>
              <p>BRC STAR does not control and is not responsible for third-party:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Content;</li>
                <li>Accuracy;</li>
                <li>Security;</li>
                <li>Availability;</li>
                <li>Privacy practices;</li>
                <li>Terms;</li>
                <li>Products;</li>
                <li>Services; or</li>
                <li>Policies.</li>
              </ul>
              <p className="pt-2">
                Accessing third-party websites or services is at your own discretion and risk.
              </p>
            </section>

            {/* 13. Client Materials and Information */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                13. Client Materials and Information
              </h2>
              <p>
                Where BRC STAR uses information, content, data, images, documents, branding materials, or other resources supplied by a client, the client is responsible for ensuring that it has the necessary rights and permissions to provide and use those materials.
              </p>
              <p>
                BRC STAR does not independently guarantee the legality, ownership, accuracy, or completeness of client-supplied materials unless expressly agreed as part of a specific service.
              </p>
            </section>

            {/* 14. Intellectual Property Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                14. Intellectual Property Disclaimer
              </h2>
              <p>
                Unless expressly stated otherwise in a written agreement, website content, branding, graphics, text, designs, software components, documentation, code, trademarks, logos, and other materials appearing on the BRC STAR website may be owned by or licensed to BRC STAR or their respective rights holders.
              </p>
              <p>
                Nothing on this website should be interpreted as granting a license or transferring ownership of intellectual property without explicit written authorization.
              </p>
            </section>

            {/* 15. Testimonials, Case Studies, and Examples */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                15. Testimonials, Case Studies, and Examples
              </h2>
              <p>
                Where the website contains testimonials, examples, case studies, portfolio items, demonstrations, or project outcomes, they are provided for illustrative or informational purposes.
              </p>
              <p>
                Past performance or previous project outcomes do not guarantee that another client will achieve similar results.
              </p>
              <p>
                Project results may vary based on the client&apos;s objectives, market conditions, technical requirements, implementation, budget, resources, and other circumstances.
              </p>
            </section>

            {/* 16. Pricing and Availability Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                16. Pricing and Availability Disclaimer
              </h2>
              <p>
                Prices, packages, features, technology choices, service availability, and other commercial information displayed on the website may change without prior notice.
              </p>
              <p>
                Website pricing should not be considered a final binding quotation unless expressly confirmed through a formal quotation, proposal, invoice, agreement, or other written communication from BRC STAR.
              </p>
              <p>
                Applicable taxes, third-party charges, infrastructure costs, licenses, subscriptions, and other project-specific expenses may apply depending on the service.
              </p>
            </section>

            {/* 17. External Technology and Open-Source Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                17. External Technology and Open-Source Disclaimer
              </h2>
              <p>Software projects may include third-party or open-source technologies.</p>
              <p>
                Such technologies are subject to their respective licenses, documentation, limitations, and update cycles.
              </p>
              <p>
                BRC STAR does not guarantee that third-party or open-source components will remain available, compatible, secure, or unchanged throughout the life of a project.
              </p>
              <p>
                Where required, clients may need to obtain separate licenses, subscriptions, or permissions for third-party products.
              </p>
            </section>

            {/* 18. Client Responsibility */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                18. Client Responsibility
              </h2>
              <p>Clients remain responsible for:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Reviewing deliverables;</li>
                <li>Verifying business and technical requirements;</li>
                <li>Protecting account credentials;</li>
                <li>Maintaining access to their domains and infrastructure;</li>
                <li>Reviewing content before publication;</li>
                <li>Verifying legal and regulatory compliance applicable to their business;</li>
                <li>Maintaining appropriate backups where applicable; and</li>
                <li>Making final business decisions based on their own judgment and professional advice.</li>
              </ul>
              <p className="pt-2">
                Technology solutions provided by BRC STAR do not eliminate the client&apos;s responsibility to operate its business lawfully and securely.
              </p>
            </section>

            {/* 19. Data and Information Accuracy */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                19. Data and Information Accuracy
              </h2>
              <p>
                Where BRC STAR services involve data supplied by a client, external systems, APIs, databases, third-party platforms, or automated processes, we cannot guarantee the accuracy or completeness of information originating outside our direct control.
              </p>
              <p>
                Clients should validate critical data before using it for important operational, financial, legal, or business decisions.
              </p>
            </section>

            {/* 20. Limitation of Responsibility */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                20. Limitation of Responsibility
              </h2>
              <p>
                To the maximum extent permitted by applicable law, BRC STAR shall not be responsible for losses or damages arising solely from:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Reliance on general website information;</li>
                <li>Use of third-party platforms;</li>
                <li>Third-party service interruptions;</li>
                <li>Client-provided information;</li>
                <li>Client configuration or misuse;</li>
                <li>Changes to external APIs or platforms;</li>
                <li>Unavailability of external services;</li>
                <li>Business decisions made by a client; or</li>
                <li>Circumstances beyond BRC STAR&apos;s reasonable control.</li>
              </ul>
              <p className="pt-2">
                Any project-specific liability provisions agreed in writing with a client shall govern that particular engagement.
              </p>
              <p>
                Nothing in this Disclaimer is intended to exclude or limit liability that cannot legally be excluded or limited under applicable law.
              </p>
            </section>

            {/* 21. No Guarantee of Continuous Support */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                21. No Guarantee of Continuous Support
              </h2>
              <p>
                Unless expressly included in a written service agreement, the publication of information on this website does not create an obligation for BRC STAR to provide ongoing support, maintenance, updates, monitoring, hosting, technical assistance, or future development.
              </p>
              <p>
                Support services, where available, may be subject to separate commercial terms.
              </p>
            </section>

            {/* 22. Changes to This Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                22. Changes to This Disclaimer
              </h2>
              <p>BRC STAR may update this Disclaimer from time to time to reflect:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Changes in our services;</li>
                <li>Changes in website functionality;</li>
                <li>Changes in technology;</li>
                <li>Changes in business practices; or</li>
                <li>Changes in applicable laws or regulations.</li>
              </ul>
              <p className="pt-2">
                The “Last Updated” date at the top of this page will indicate when the Disclaimer was most recently revised.
              </p>
              <p>
                We encourage visitors to review this page periodically.
              </p>
            </section>

            {/* 23. Related Policies */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                23. Related Policies
              </h2>
              <p>This Disclaimer should be read together with our other applicable website policies, including:</p>
              <div className="space-y-3 pt-2">
                <div>
                  <Link href="/privacy-policy" className="font-semibold text-blue-400 hover:underline">Privacy Policy</Link>
                  <p className="text-xs sm:text-sm text-slate-400">Information concerning the collection and processing of personal information.</p>
                </div>
                <div>
                  <Link href="/terms-and-conditions" className="font-semibold text-blue-400 hover:underline">Terms &amp; Conditions</Link>
                  <p className="text-xs sm:text-sm text-slate-400">Terms governing the use of our website and applicable services.</p>
                </div>
                <div>
                  <Link href="/cookies-policy" className="font-semibold text-blue-400 hover:underline">Cookies Policy</Link>
                  <p className="text-xs sm:text-sm text-slate-400">Information concerning cookies and similar technologies used on our website.</p>
                </div>
              </div>
            </section>

            {/* 24. Governing Law */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                24. Governing Law
              </h2>
              <p>
                This Disclaimer shall be governed by and interpreted in accordance with the applicable laws of India, subject to applicable legal requirements.
              </p>
              <p>
                Any dispute relating to this Disclaimer shall be subject to the jurisdiction of the appropriate courts in India, unless a separate written agreement provides otherwise.
              </p>
            </section>

            {/* 25. Contact Information */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                25. Contact Information
              </h2>
              <p>
                For questions regarding this Disclaimer, our website, or our services, please contact:
              </p>
              <div className="pt-2 text-sm font-mono text-slate-300 space-y-1.5 bg-[#060a14] p-4 rounded-xl border border-slate-800/80">
                <p><strong className="text-white">BRC STAR OPC PRIVATE LIMITED</strong></p>
                <p><strong>Email:</strong> <a href="mailto:contact@brcstar.in" className="text-blue-400 hover:underline">contact@brcstar.in</a></p>
                <p><strong>Website:</strong> <a href="https://brcpartner.brcstar.in/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://brcpartner.brcstar.in/</a></p>
              </div>
            </section>

            {/* 26. Acceptance */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                26. Acceptance
              </h2>
              <p>
                By accessing or using the BRC STAR website, you acknowledge that you have read and understood this Disclaimer and agree to use the information and services provided through the website at your own discretion and subject to applicable law.
              </p>
              <div className="pt-4 border-t border-slate-800/60 font-mono text-xs text-slate-400 space-y-1">
                <p className="font-bold text-white">BRC STAR OPC PRIVATE LIMITED</p>
                <p>Disclaimer</p>
                <p>Last Updated: 5 September 2026</p>
              </div>
            </section>
          </div>

          {/* Bottom Legal Navigation Bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3 text-slate-400">
              <span className="text-slate-500 font-mono uppercase text-[11px]">Related Legal:</span>
              <Link href="/privacy-policy" className="hover:text-blue-400 text-slate-300 underline underline-offset-4">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms-and-conditions" className="hover:text-blue-400 text-slate-300 underline underline-offset-4">
                Terms &amp; Conditions
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
