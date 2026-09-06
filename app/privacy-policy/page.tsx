'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { Shield, ChevronLeft, ArrowRight, Mail, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <span className="text-blue-400">Privacy Policy</span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-slate-800/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Legal Documentation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span><strong>Effective Date:</strong> 5 September 2026</span>
              <span>•</span>
              <span><strong>Last Updated:</strong> 5 September 2026</span>
            </div>
            <div className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2 space-y-3">
              <p>
                BRC STAR OPC PRIVATE LIMITED (”BRC STAR”, ”we”, ”us”, or ”our”) respects your privacy and is committed to protecting personal information that you provide to us or that is collected when you use our website, services, and digital platforms.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, store, and protect personal information when you visit or interact with:
              </p>
              <p className="font-mono text-blue-400 text-sm">
                https://brcpartner.brcstar.in/
              </p>
              <p>
                By using our website or voluntarily providing information to us, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8 text-sm sm:text-[15px] leading-relaxed text-slate-300">
            {/* 1. About BRC STAR */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                1. About BRC STAR
              </h2>
              <p>
                BRC STAR OPC PRIVATE LIMITED is a technology and digital solutions company providing services that may include website development, web application development, mobile application development, enterprise software, AI and automation solutions, e-commerce solutions, UI/UX and product design, digital consulting, architecture and related technology services.
              </p>
              <p>
                For privacy-related matters, BRC STAR OPC PRIVATE LIMITED acts as the organization responsible for the personal information processed through this website, subject to applicable law.
              </p>
            </section>

            {/* 2. Information We May Collect */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                2. Information We May Collect
              </h2>
              <p>
                Depending on how you interact with our website and services, we may collect the following categories of information.
              </p>

              {/* 2.1 */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-blue-600/60">
                <h3 className="text-base font-semibold text-white">
                  2.1 Information You Provide Directly
                </h3>
                <p>
                  When you contact us, request a consultation, submit a project enquiry, request an estimate, or communicate with us, you may provide information such as:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Full name</li>
                  <li>Business or company name</li>
                  <li>Email address</li>
                  <li>Telephone or mobile number</li>
                  <li>Country, city, or business location</li>
                  <li>Project requirements</li>
                  <li>Service preferences</li>
                  <li>Budget or project-related information</li>
                  <li>Messages, enquiries, or other information you voluntarily submit</li>
                  <li>Any other information you choose to provide</li>
                </ul>
                <p className="pt-2 text-slate-400 italic">
                  You should avoid submitting sensitive personal information through general website enquiry forms unless it is specifically requested and necessary for the relevant service.
                </p>
              </div>

              {/* 2.2 */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-blue-600/60">
                <h3 className="text-base font-semibold text-white">
                  2.2 Technical and Usage Information
                </h3>
                <p>
                  When you visit our website, certain technical information may be collected automatically, depending on the technologies and services enabled on the website.
                </p>
                <p>This may include:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device type</li>
                  <li>Operating system</li>
                  <li>Approximate geographic information derived from technical data</li>
                  <li>Pages visited</li>
                  <li>Referring pages or websites</li>
                  <li>Date and time of access</li>
                  <li>Website interaction information</li>
                  <li>Performance and diagnostic information</li>
                  <li>Other technical information reasonably necessary to operate, secure, and improve the website</li>
                </ul>
              </div>

              {/* 2.3 */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-blue-600/60">
                <h3 className="text-base font-semibold text-white">
                  2.3 Cookies and Similar Technologies
                </h3>
                <p>
                  We may use cookies, local storage, pixels, tags, or similar technologies for purposes such as:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Essential website functionality</li>
                  <li>Security</li>
                  <li>Remembering preferences</li>
                  <li>Website performance</li>
                  <li>Analytics</li>
                  <li>Understanding website usage</li>
                  <li>Improving user experience</li>
                  <li>Measuring the effectiveness of our communications or marketing, where applicable</li>
                </ul>
                <p className="pt-2">
                  Additional information about cookies is provided in our <Link href="/cookies-policy" className="text-blue-400 hover:underline">Cookies Policy</Link>.
                </p>
              </div>
            </section>

            {/* 3. How We Use Personal Information */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                3. How We Use Personal Information
              </h2>
              <p>
                We may use information collected through the website for legitimate business and service-related purposes, including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Responding to enquiries and requests</li>
                <li>Understanding your project requirements</li>
                <li>Providing quotations or proposals</li>
                <li>Scheduling consultations or meetings</li>
                <li>Providing requested services</li>
                <li>Communicating about projects, services, or enquiries</li>
                <li>Managing business relationships</li>
                <li>Improving our website and services</li>
                <li>Maintaining website security</li>
                <li>Detecting, preventing, and addressing fraud, abuse, security incidents, or technical problems</li>
                <li>Maintaining business and technical records</li>
                <li>Complying with applicable legal and regulatory requirements</li>
                <li>Protecting our legal rights and interests</li>
                <li>Performing other purposes that are communicated to you at or before the time information is collected</li>
              </ul>
              <p className="pt-2">
                We will seek to process personal information only for lawful and relevant purposes.
              </p>
            </section>

            {/* 4. Legal Basis for Processing */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                4. Legal Basis for Processing
              </h2>
              <p>Where applicable, personal information may be processed:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>With your consent;</li>
                <li>To respond to a request or provide a service you have requested;</li>
                <li>To perform or take steps in connection with an agreement or business relationship;</li>
                <li>To comply with applicable legal obligations;</li>
                <li>For legitimate business purposes permitted by applicable law; or</li>
                <li>Where otherwise permitted or required by applicable law.</li>
              </ul>
              <p>
                Where processing is based on consent, you may have the right to withdraw that consent, subject to applicable law and any consequences associated with such withdrawal.
              </p>
              <p>
                India&apos;s Digital Personal Data Protection framework recognizes consent and certain legitimate uses as grounds for processing personal data.
              </p>
            </section>

            {/* 5. Information Sharing and Disclosure */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-5">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                5. Information Sharing and Disclosure
              </h2>
              <p>We do not sell your personal information as a business practice.</p>
              <p>We may share or provide access to personal information where reasonably necessary with:</p>

              <div className="space-y-3 pt-2">
                <h3 className="text-base font-semibold text-white">Service Providers</h3>
                <p>Third-party vendors or service providers that assist us with activities such as:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Website hosting</li>
                  <li>Cloud infrastructure</li>
                  <li>Email and communication services</li>
                  <li>Analytics</li>
                  <li>Security</li>
                  <li>Technical maintenance</li>
                  <li>Customer relationship management</li>
                  <li>Project management</li>
                  <li>Payment processing, where applicable</li>
                  <li>Other technology or business-support services</li>
                </ul>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Such parties may process information only to the extent reasonably necessary for the services they provide to us and subject to applicable contractual or legal requirements.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/60">
                <h3 className="text-base font-semibold text-white">Legal and Regulatory Authorities</h3>
                <p>
                  We may disclose information where required or permitted by applicable law, regulation, legal process, court order, governmental request, or to protect the rights, property, safety, or security of BRC STAR, our users, clients, or other persons.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/60">
                <h3 className="text-base font-semibold text-white">Business Transactions</h3>
                <p>
                  Information may also be disclosed as reasonably necessary in connection with a merger, acquisition, restructuring, financing, sale of assets, or similar corporate transaction, subject to applicable law.
                </p>
              </div>
            </section>

            {/* 6. Third-Party Services and Links */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                6. Third-Party Services and Links
              </h2>
              <p>
                Our website may use third-party technologies, services, platforms, APIs, hosting providers, analytics tools, communication services, or other external services.
              </p>
              <p>
                Our website may also contain links to third-party websites.
              </p>
              <p>
                We are not responsible for the privacy practices, security, content, or policies of third-party websites or services that we do not control.
              </p>
              <p>
                We encourage you to review the privacy policies of relevant third parties before providing them with personal information.
              </p>
            </section>

            {/* 7. Data Security */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                7. Data Security
              </h2>
              <p>
                We take reasonable technical and organizational measures designed to protect personal information against unauthorized access, misuse, alteration, disclosure, loss, or destruction.
              </p>
              <p>
                Depending on the nature of the information and the applicable service, security measures may include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Access controls</li>
                <li>Authentication mechanisms</li>
                <li>Encryption or secure transmission technologies where appropriate</li>
                <li>Server and application security controls</li>
                <li>Monitoring and logging</li>
                <li>Input validation and security practices</li>
                <li>Backup and recovery procedures</li>
                <li>Restricted access to personal information</li>
                <li>Security and operational controls appropriate to the relevant processing activity</li>
              </ul>
              <p>
                However, no internet transmission, website, server, or electronic storage system can be guaranteed to be completely secure.
              </p>
              <p>
                Accordingly, we cannot guarantee absolute security of information transmitted through the internet.
              </p>
            </section>

            {/* 8. Data Retention */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                8. Data Retention
              </h2>
              <p>
                We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Providing requested services;</li>
                <li>Maintaining business and transaction records;</li>
                <li>Resolving disputes;</li>
                <li>Enforcing agreements;</li>
                <li>Maintaining security and fraud-prevention records; or</li>
                <li>Complying with applicable legal, tax, accounting, regulatory, or other obligations.</li>
              </ul>
              <p>
                When personal information is no longer reasonably required, we may delete, anonymize, or otherwise dispose of it in accordance with applicable law and our operational requirements.
              </p>
            </section>

            {/* 9. Your Privacy Rights */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                9. Your Privacy Rights
              </h2>
              <p>
                Subject to applicable law, you may have rights relating to your personal information, which may include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Requesting information about the processing of your personal data;</li>
                <li>Requesting access to relevant personal data;</li>
                <li>Requesting correction of inaccurate or incomplete information;</li>
                <li>Requesting deletion or erasure where legally applicable;</li>
                <li>Withdrawing consent where processing is based on consent;</li>
                <li>Raising a privacy-related grievance or complaint;</li>
                <li>Exercising other rights available under applicable data protection law.</li>
              </ul>
              <p>
                Requests may be subject to reasonable verification to protect against unauthorized access to personal information.
              </p>
              <p>
                The DPDP Act provides Data Principals with rights concerning access to information about processing, correction/erasure, grievance redressal and other matters, subject to the Act and applicable rules.
              </p>
            </section>

            {/* 10. How to Withdraw Consent */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                10. How to Withdraw Consent
              </h2>
              <p>
                Where we process your personal information based on consent, you may request withdrawal of that consent by contacting us using the details provided in this Privacy Policy.
              </p>
              <p>
                Withdrawal of consent will not affect processing that was lawfully carried out before the withdrawal.
              </p>
              <p>
                Depending on the nature of the processing, withdrawing consent may affect our ability to provide certain services or respond to certain requests.
              </p>
              <p>
                Where required under applicable law, mechanisms for withdrawal will be provided in a manner that is reasonably accessible.
              </p>
              <p>
                The DPDP Rules, 2025 contemplate accessible mechanisms for withdrawal of consent and exercising data-related rights.
              </p>
            </section>

            {/* 11. Children's Privacy */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                11. Children&apos;s Privacy
              </h2>
              <p>
                Our website and services are primarily intended for businesses, professionals, organizations, and other users who are legally capable of entering into relevant arrangements.
              </p>
              <p>
                We do not knowingly seek to collect personal information from children except where permitted or required by applicable law.
              </p>
              <p>
                If you believe that a child has provided personal information to us without appropriate authorization, please contact us so that we can review and take appropriate action.
              </p>
            </section>

            {/* 12. International Data Processing */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                12. International Data Processing
              </h2>
              <p>
                Depending on the technology providers and infrastructure used to operate our website or deliver services, personal information may be processed or stored in locations outside your state or country.
              </p>
              <p>
                Where applicable, we will take reasonable steps to ensure that such processing is conducted in accordance with applicable law and appropriate contractual, technical, or organizational safeguards.
              </p>
            </section>

            {/* 13. Changes to This Privacy Policy */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                13. Changes to This Privacy Policy
              </h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Our services;</li>
                <li>Website functionality;</li>
                <li>Technology;</li>
                <li>Data-processing practices;</li>
                <li>Applicable laws or regulations; or</li>
                <li>Business requirements.</li>
              </ul>
              <p>
                When we make changes, we may update the “Last Updated” date displayed at the top of this page.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            {/* 14. Contact and Privacy Enquiries */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                14. Contact and Privacy Enquiries
              </h2>
              <p>
                If you have a question, request, concern, or complaint regarding this Privacy Policy or the processing of your personal information, please contact:
              </p>
              <div className="pt-2 text-sm font-mono text-slate-300 space-y-1.5 bg-[#060a14] p-4 rounded-xl border border-slate-800/80">
                <p><strong className="text-white">BRC STAR OPC PRIVATE LIMITED</strong></p>
                <p><strong>Email:</strong> <a href="mailto:contact@brcstar.in" className="text-blue-400 hover:underline">contact@brcstar.in</a></p>
                <p><strong>Website:</strong> <a href="https://brcpartner.brcstar.in/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://brcpartner.brcstar.in/</a></p>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                For privacy-related requests, please provide sufficient information for us to understand and verify your request.
              </p>
              <p className="text-xs sm:text-sm text-slate-400">
                We will review and respond to privacy requests in accordance with applicable law.
              </p>
            </section>

            {/* 15. Grievance Redressal */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                15. Grievance Redressal
              </h2>
              <p>
                BRC STAR is committed to addressing reasonable privacy-related concerns and complaints.
              </p>
              <p>
                You may initially contact us using the privacy contact details provided above. We will take reasonable steps to review the matter and provide an appropriate response in accordance with applicable law.
              </p>
              <p>
                Where applicable, you may have additional rights to approach the relevant statutory or regulatory authority in accordance with Indian data protection law.
              </p>
            </section>

            {/* 16. Governing Framework */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                16. Governing Framework
              </h2>
              <p>
                This Privacy Policy is intended to operate in accordance with applicable laws and regulations of India, including applicable provisions of the Digital Personal Data Protection Act, 2023, the Digital Personal Data Protection Rules, 2025, and other applicable privacy, information-technology, cybersecurity, and data-protection requirements, as amended or replaced from time to time.
              </p>
              <p>
                The application of particular laws may depend on the nature of the service, processing activity, user, and applicable jurisdiction.
              </p>
            </section>

            {/* 17. Acceptance */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                17. Acceptance
              </h2>
              <p>
                By continuing to use our website, where permitted by applicable law, you acknowledge that you have had an opportunity to review this Privacy Policy.
              </p>
              <p>
                If you do not agree with the applicable terms of this Privacy Policy, please discontinue use of the website and contact us regarding any information you have previously provided.
              </p>
              <div className="pt-4 border-t border-slate-800/60 font-mono text-xs text-slate-400 space-y-1">
                <p className="font-bold text-white">BRC STAR OPC PRIVATE LIMITED</p>
                <p>Privacy Policy</p>
                <p>Last Updated: 5 September 2026</p>
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
