'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { Scale, ChevronLeft, ArrowRight } from 'lucide-react';

export default function TermsAndConditionsPage() {
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
            <span className="text-blue-400">Terms &amp; Conditions</span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-slate-800/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>Legal Documentation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Terms &amp; Conditions
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span><strong>Effective Date:</strong> 5 September 2026</span>
              <span>•</span>
              <span><strong>Last Updated:</strong> 5 September 2026</span>
            </div>
            <div className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2 space-y-3">
              <p>
                Welcome to BRC STAR OPC PRIVATE LIMITED (”BRC STAR”, ”we”, ”us”, or ”our”).
              </p>
              <p>
                These Terms &amp; Conditions (”Terms”) govern your access to and use of our website:
              </p>
              <p className="font-mono text-blue-400 text-sm">
                https://brcpartner.brcstar.in/
              </p>
              <p>
                and, where applicable, the technology, development, consulting, design, software, and other services provided by BRC STAR.
              </p>
              <p>
                By accessing or using our website, submitting an enquiry, requesting a proposal, engaging our services, or entering into a project or service arrangement with us, you agree to be bound by these Terms.
              </p>
              <p>
                If you do not agree with these Terms, please do not use our website or services.
              </p>
            </div>
          </div>

          {/* Terms Content Sections */}
          <div className="space-y-8 text-sm sm:text-[15px] leading-relaxed text-slate-300">
            {/* 1. About BRC STAR */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                1. About BRC STAR
              </h2>
              <p>
                BRC STAR OPC PRIVATE LIMITED is a technology and digital solutions company that may provide services including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Website development</li>
                <li>Web application development</li>
                <li>Mobile application development</li>
                <li>E-commerce development</li>
                <li>Enterprise software solutions</li>
                <li>AI and automation solutions</li>
                <li>UI/UX and product design</li>
                <li>Software consulting</li>
                <li>Technology consulting</li>
                <li>Digital product development</li>
                <li>Custom software development</li>
                <li>API and system integrations</li>
                <li>Maintenance and technical support</li>
                <li>Other technology-related services</li>
              </ul>
              <p className="pt-2">
                The exact services provided to a client will depend on the proposal, quotation, statement of work, agreement, purchase order, or other written arrangement applicable to that project.
              </p>
            </section>

            {/* 2. Website Use */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                2. Website Use
              </h2>
              <p>You may use our website for lawful purposes only.</p>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Use the website for unlawful, fraudulent, or unauthorized activities;</li>
                <li>Attempt to gain unauthorized access to our systems, servers, accounts, or infrastructure;</li>
                <li>Interfere with the operation or security of the website;</li>
                <li>Introduce malicious code, malware, viruses, or other harmful technologies;</li>
                <li>Scrape, copy, reproduce, or systematically extract website content without permission;</li>
                <li>Misrepresent your identity or relationship with another person or organization;</li>
                <li>Use our website to infringe the rights of another person or organization;</li>
                <li>Use the website in a manner that may damage, disable, overburden, or impair our systems; or</li>
                <li>Circumvent security or access-control mechanisms.</li>
              </ul>
              <p className="pt-2">
                We reserve the right to restrict or terminate access to the website where we reasonably believe that these Terms have been violated.
              </p>
            </section>

            {/* 3. Service Enquiries and Proposals */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                3. Service Enquiries and Proposals
              </h2>
              <p>
                Submitting an enquiry through our website does not automatically create a contractual relationship between you and BRC STAR.
              </p>
              <p>Following an enquiry, we may:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Request additional project information;</li>
                <li>Discuss technical requirements;</li>
                <li>Conduct discovery or consultation;</li>
                <li>Prepare a quotation or proposal;</li>
                <li>Provide an estimated timeline;</li>
                <li>Recommend a technology or implementation approach; or</li>
                <li>Decline an enquiry at our discretion.</li>
              </ul>
              <p className="pt-2">
                A binding service relationship will arise only when the applicable proposal, agreement, statement of work, purchase order, or other written arrangement has been accepted by the parties.
              </p>
            </section>

            {/* 4. Project Scope */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                4. Project Scope
              </h2>
              <p>
                For custom development projects, the agreed scope of work should be defined in the applicable proposal, quotation, statement of work, or agreement.
              </p>
              <p>The project scope may specify:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Features and functionality;</li>
                <li>Technology requirements;</li>
                <li>Deliverables;</li>
                <li>Design requirements;</li>
                <li>Integrations;</li>
                <li>Development milestones;</li>
                <li>Testing requirements;</li>
                <li>Deployment requirements;</li>
                <li>Support period;</li>
                <li>Project timeline;</li>
                <li>Fees and payment schedule; and</li>
                <li>Other project-specific conditions.</li>
              </ul>
              <p className="pt-2">
                Work outside the agreed scope may be treated as additional work and may require additional fees and/or an updated timeline.
              </p>
            </section>

            {/* 5. Requirements and Client Responsibilities */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                5. Requirements and Client Responsibilities
              </h2>
              <p>
                Clients are responsible for providing accurate, complete, and timely information necessary for the performance of the agreed services.
              </p>
              <p>Depending on the project, the client may need to provide:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Business requirements;</li>
                <li>Content and copy;</li>
                <li>Images, videos, logos, and branding materials;</li>
                <li>Product information;</li>
                <li>Domain and hosting access;</li>
                <li>API credentials;</li>
                <li>Third-party service credentials;</li>
                <li>Legal notices and policies;</li>
                <li>Approvals and feedback;</li>
                <li>Technical documentation;</li>
                <li>Required licenses or permissions; and</li>
                <li>Other materials reasonably required for the project.</li>
              </ul>
              <p className="pt-2">
                Delays caused by incomplete information, delayed approvals, unavailable credentials, third-party dependencies, or changes requested by the client may affect project timelines.
              </p>
            </section>

            {/* 6. Project Timelines and Delivery */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                6. Project Timelines and Delivery
              </h2>
              <p>
                Any project timeline communicated by BRC STAR is generally an estimate unless expressly agreed as a binding delivery commitment in writing.
              </p>
              <p>Project delivery may depend on:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Timely receipt of client requirements;</li>
                <li>Client approvals;</li>
                <li>Availability of third-party services;</li>
                <li>Hosting and infrastructure;</li>
                <li>API availability;</li>
                <li>Domain and DNS configuration;</li>
                <li>Payment status;</li>
                <li>Scope changes;</li>
                <li>Technical complexity; and</li>
                <li>Other circumstances outside our reasonable control.</li>
              </ul>
              <p className="pt-2">
                Where circumstances reasonably require a timeline adjustment, BRC STAR may revise the estimated delivery schedule.
              </p>
            </section>

            {/* 7. Fees and Payments */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                7. Fees and Payments
              </h2>
              <p>
                Service fees will be communicated through the applicable quotation, proposal, invoice, statement of work, or agreement.
              </p>
              <p>Unless otherwise agreed in writing:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Payments must be made according to the agreed payment schedule;</li>
                <li>Applicable taxes may be charged in addition to quoted amounts where required;</li>
                <li>Client payments must be made using the payment method specified by BRC STAR;</li>
                <li>Work may be paused if required payments are overdue;</li>
                <li>Additional work outside the agreed scope may incur additional charges; and</li>
                <li>Third-party costs may be payable separately where applicable.</li>
              </ul>
              <p className="pt-2">
                Applicable taxes, including GST, will be handled in accordance with applicable Indian tax laws and the terms of the relevant invoice or agreement.
              </p>
            </section>

            {/* 8. Changes and Additional Work */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                8. Changes and Additional Work
              </h2>
              <p>Clients may request changes to project requirements.</p>
              <p>A change may include:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Adding new functionality;</li>
                <li>Removing functionality;</li>
                <li>Changing an approved design;</li>
                <li>Changing technology requirements;</li>
                <li>Adding new integrations;</li>
                <li>Changing business logic;</li>
                <li>Changing project deliverables; or</li>
                <li>Any other modification that materially affects the agreed scope.</li>
              </ul>
              <p className="pt-2">
                Where a requested change affects cost, resources, or timeline, BRC STAR may provide a revised quotation, change request, or additional estimate before performing the additional work.
              </p>
            </section>

            {/* 9. Revisions and Approvals */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                9. Revisions and Approvals
              </h2>
              <p>
                Where design, development, or other deliverables require client approval, the client is responsible for reviewing the deliverables and providing timely feedback.
              </p>
              <p>
                The number of revisions included in a project will depend on the applicable proposal or agreement.
              </p>
              <p>
                Additional revisions or changes beyond the agreed scope may be treated as additional work.
              </p>
              <p>
                Once a deliverable has been approved, subsequent changes to the approved deliverable may be chargeable.
              </p>
            </section>

            {/* 10. Testing and Acceptance */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                10. Testing and Acceptance
              </h2>
              <p>
                Depending on the project, BRC STAR may provide a testing or review period before final delivery.
              </p>
              <p>
                The client should review the deliverables within the agreed review period and communicate any material issues or deviations from the agreed scope.
              </p>
              <p>A deliverable may be considered accepted where:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>The client expressly approves it;</li>
                <li>The client begins using the deliverable for its intended purpose;</li>
                <li>The client does not identify material scope-related issues within the agreed review period; or</li>
                <li>Acceptance otherwise occurs under the applicable project agreement.</li>
              </ul>
              <p className="pt-2">
                Acceptance does not prevent the client from reporting genuine defects covered by an applicable warranty or support arrangement.
              </p>
            </section>

            {/* 11. Intellectual Property */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                11. Intellectual Property
              </h2>
              <p>
                Unless otherwise agreed in writing, each party retains ownership of intellectual property that it owned before the relevant project.
              </p>

              {/* Client Materials */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-blue-600/60">
                <h3 className="text-base font-semibold text-white">Client Materials</h3>
                <p>The client retains ownership of materials supplied by the client, including:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Logos;</li>
                  <li>Brand assets;</li>
                  <li>Text and content;</li>
                  <li>Images and videos;</li>
                  <li>Product information;</li>
                  <li>Business information; and</li>
                  <li>Other materials supplied by the client.</li>
                </ul>
                <p className="pt-2">
                  The client grants BRC STAR the permissions reasonably necessary to use such materials for performing the agreed services.
                </p>
              </div>

              {/* BRC STAR Materials */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-blue-600/60">
                <h3 className="text-base font-semibold text-white">BRC STAR Materials</h3>
                <p>BRC STAR may retain ownership of its pre-existing:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Software;</li>
                  <li>Frameworks;</li>
                  <li>Libraries;</li>
                  <li>Components;</li>
                  <li>Templates;</li>
                  <li>Tools;</li>
                  <li>Development methodologies;</li>
                  <li>Scripts;</li>
                  <li>Utilities;</li>
                  <li>Know-how;</li>
                  <li>Technical processes; and</li>
                  <li>Other reusable technology or intellectual property.</li>
                </ul>
              </div>

              {/* Project-Specific Deliverables */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-blue-600/60">
                <h3 className="text-base font-semibold text-white">Project-Specific Deliverables</h3>
                <p>
                  Ownership or licensing of project-specific deliverables will be determined by the applicable proposal, agreement, statement of work, or other written arrangement.
                </p>
                <p>
                  Unless expressly agreed otherwise, payment for a project does not automatically transfer ownership of BRC STAR&apos;s pre-existing tools, frameworks, reusable components, libraries, methodologies, or other underlying intellectual property.
                </p>
              </div>
            </section>

            {/* 12. Third-Party Software and Services */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                12. Third-Party Software and Services
              </h2>
              <p>
                Projects may depend on third-party products, platforms, APIs, hosting providers, payment gateways, cloud services, software libraries, plugins, or other external services.
              </p>
              <p>Examples may include:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Cloud hosting platforms;</li>
                <li>Payment processors;</li>
                <li>Email providers;</li>
                <li>Analytics platforms;</li>
                <li>AI services;</li>
                <li>Maps and location services;</li>
                <li>Authentication providers;</li>
                <li>Communication platforms;</li>
                <li>Open-source software;</li>
                <li>Software development libraries; and</li>
                <li>Other third-party technologies.</li>
              </ul>
              <p className="pt-2">
                Third-party services are subject to their respective terms, pricing, availability, licenses, and privacy policies.
              </p>
              <p>
                BRC STAR is not responsible for changes, interruptions, outages, pricing changes, restrictions, or discontinuation of third-party services outside our reasonable control.
              </p>
            </section>

            {/* 13. Open-Source Software */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                13. Open-Source Software
              </h2>
              <p>
                Where appropriate, projects may use open-source software or components.
              </p>
              <p>
                Such components remain subject to their respective open-source licenses.
              </p>
              <p>The applicable open-source license may impose requirements concerning:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Attribution;</li>
                <li>Copyright notices;</li>
                <li>Distribution;</li>
                <li>Modification;</li>
                <li>Licensing;</li>
                <li>Disclosure; or</li>
                <li>Other conditions.</li>
              </ul>
              <p className="pt-2">
                The use of open-source software does not mean that all project source code or proprietary BRC STAR materials are open source.
              </p>
            </section>

            {/* 14. Domain Names, Hosting, APIs, and External Accounts */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                14. Domain Names, Hosting, APIs, and External Accounts
              </h2>
              <p>
                Where a project involves domain names, hosting accounts, cloud infrastructure, APIs, payment gateways, email systems, or other external accounts, ownership and responsibility for those accounts will depend on the applicable project arrangement.
              </p>
              <p>Unless expressly agreed otherwise:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Clients are responsible for maintaining ownership of their business-critical accounts;</li>
                <li>Clients are responsible for providing accurate account information;</li>
                <li>Third-party account charges are generally the client&apos;s responsibility;</li>
                <li>BRC STAR may require appropriate access to perform agreed technical work; and</li>
                <li>Suspension or termination of third-party accounts may affect project functionality.</li>
              </ul>
              <p className="pt-2">
                BRC STAR does not guarantee uninterrupted operation of third-party infrastructure.
              </p>
            </section>

            {/* 15. AI and Automated Technologies */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                15. AI and Automated Technologies
              </h2>
              <p>
                Some services may involve artificial intelligence, machine-learning systems, automation tools, or third-party AI platforms.
              </p>
              <p>
                AI-generated or automated outputs may contain inaccuracies, omissions, unexpected results, or errors.
              </p>
              <p>Where AI or automated technology is used:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Outputs should be reviewed before being relied upon for important decisions;</li>
                <li>AI-generated content may require human verification;</li>
                <li>Third-party AI providers may have their own terms and privacy policies;</li>
                <li>AI service availability may depend on third-party providers; and</li>
                <li>BRC STAR does not guarantee that AI-generated outputs will always be accurate, complete, unique, or suitable for a particular purpose.</li>
              </ul>
              <p className="pt-2">
                Clients remain responsible for reviewing and approving AI-generated content or outputs used in their business.
              </p>
            </section>

            {/* 16. Client Content and Legal Compliance */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                16. Client Content and Legal Compliance
              </h2>
              <p>Clients are responsible for ensuring that materials and information supplied to BRC STAR:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Are accurate;</li>
                <li>Do not infringe third-party intellectual-property rights;</li>
                <li>Do not violate applicable law;</li>
                <li>Do not contain unlawful or fraudulent material;</li>
                <li>Are authorized for use; and</li>
                <li>Comply with applicable regulatory requirements.</li>
              </ul>
              <p className="pt-2">
                BRC STAR may refuse to process or publish content that we reasonably believe is unlawful, infringing, malicious, fraudulent, or otherwise inappropriate.
              </p>
            </section>

            {/* 17. Confidentiality */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                17. Confidentiality
              </h2>
              <p>
                Where the parties have entered into a separate confidentiality agreement or NDA, the terms of that agreement will govern confidential information.
              </p>
              <p>
                In the absence of a separate agreement, each party should take reasonable steps to protect non-public confidential information received from the other party in connection with a business relationship.
              </p>
              <p>Confidential information does not generally include information that:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Is already publicly available;</li>
                <li>Becomes publicly available without breach of an obligation;</li>
                <li>Was lawfully known before disclosure;</li>
                <li>Is independently developed without using confidential information; or</li>
                <li>Must be disclosed by law or lawful authority.</li>
              </ul>
            </section>

            {/* 18. Maintenance and Support */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                18. Maintenance and Support
              </h2>
              <p>
                Unless specifically included in the applicable proposal or agreement, ongoing maintenance and support are not automatically included in the development fee.
              </p>
              <p>Maintenance or support may include:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Bug fixes;</li>
                <li>Security updates;</li>
                <li>Dependency updates;</li>
                <li>Content updates;</li>
                <li>Technical monitoring;</li>
                <li>Hosting management;</li>
                <li>Feature enhancements;</li>
                <li>Performance optimization; or</li>
                <li>Other technical services.</li>
              </ul>
              <p className="pt-2">
                The scope, duration, response times, and fees for maintenance or support will depend on the applicable service arrangement.
              </p>
            </section>

            {/* 19. Warranties and Disclaimers */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                19. Warranties and Disclaimers
              </h2>
              <p>
                BRC STAR will use reasonable professional efforts to provide services in accordance with the agreed scope.
              </p>
              <p>
                However, except where expressly stated in a written agreement and to the extent permitted by applicable law:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>We do not guarantee that the website or services will always be uninterrupted or error-free;</li>
                <li>We do not guarantee that every service will meet every business objective or expectation;</li>
                <li>We do not guarantee uninterrupted availability of third-party services;</li>
                <li>We do not guarantee that software will be completely free from defects or vulnerabilities;</li>
                <li>We do not guarantee specific business, financial, sales, traffic, ranking, or conversion results; and</li>
                <li>Information available on our website is provided for general informational purposes.</li>
              </ul>
              <p className="pt-2">
                Any express warranty specifically provided in a project agreement will take precedence over inconsistent general statements in these Terms.
              </p>
            </section>

            {/* 20. Limitation of Liability */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                20. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, BRC STAR OPC PRIVATE LIMITED shall not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Profits;</li>
                <li>Revenue;</li>
                <li>Business opportunities;</li>
                <li>Data;</li>
                <li>Goodwill;</li>
                <li>Expected savings; or</li>
                <li>Business interruption,</li>
              </ul>
              <p>
                arising from or relating to the use of our website or services.
              </p>
              <p>
                Where liability cannot legally be excluded, our liability will be limited to the extent permitted by applicable law.
              </p>
              <p>
                For paid project services, any contractual limitation of liability specifically agreed in writing between BRC STAR and the client will govern that project.
              </p>
              <p>
                Nothing in these Terms is intended to exclude or limit liability that cannot lawfully be excluded or limited under applicable law.
              </p>
            </section>

            {/* 21. Indemnification */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                21. Indemnification
              </h2>
              <p>
                To the extent permitted by applicable law, you agree to indemnify and hold harmless BRC STAR OPC PRIVATE LIMITED, its personnel, contractors, and representatives from claims, losses, liabilities, damages, costs, or expenses arising from:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Your unlawful use of our website or services;</li>
                <li>Your breach of these Terms;</li>
                <li>Materials or content supplied by you;</li>
                <li>Your infringement of third-party rights;</li>
                <li>Your misuse of delivered software or services; or</li>
                <li>Your violation of applicable law.</li>
              </ul>
              <p className="pt-2">
                This section does not apply to the extent that a claim results from BRC STAR&apos;s own unlawful conduct or liability that cannot legally be transferred to you.
              </p>
            </section>

            {/* 22. Suspension or Termination */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                22. Suspension or Termination
              </h2>
              <p>
                We may suspend or terminate access to our website or discontinue a service relationship where reasonably necessary, including where:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>These Terms are materially breached;</li>
                <li>Payments remain overdue;</li>
                <li>There is suspected fraud or unlawful activity;</li>
                <li>Security is at risk;</li>
                <li>Continued service would violate applicable law; or</li>
                <li>Other circumstances justify suspension or termination under the applicable agreement.</li>
              </ul>
              <p className="pt-2">
                Termination of a project or service will be governed by the applicable contract, proposal, statement of work, or agreement where one exists.
              </p>
              <p>
                Amounts already due for completed or authorized work may remain payable after termination.
              </p>
            </section>

            {/* 23. Force Majeure */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                23. Force Majeure
              </h2>
              <p>
                BRC STAR will not be responsible for delays or failures caused by circumstances beyond our reasonable control.
              </p>
              <p>Such circumstances may include:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Natural disasters;</li>
                <li>Fire;</li>
                <li>Flood;</li>
                <li>War;</li>
                <li>Terrorism;</li>
                <li>Government actions;</li>
                <li>Internet or telecommunications failures;</li>
                <li>Major infrastructure outages;</li>
                <li>Cybersecurity incidents;</li>
                <li>Cloud or hosting outages;</li>
                <li>Third-party service failures;</li>
                <li>Power failures;</li>
                <li>Strikes or labor disruptions; or</li>
                <li>Other events beyond reasonable control.</li>
              </ul>
              <p className="pt-2">
                Where reasonably possible, we will take appropriate steps to mitigate the effect of such events.
              </p>
            </section>

            {/* 24. Website Content and Availability */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                24. Website Content and Availability
              </h2>
              <p>
                We may update, modify, suspend, or discontinue portions of the website at any time.
              </p>
              <p>
                We may also correct errors, update information, change functionality, or modify the presentation of services without prior notice.
              </p>
              <p>
                We do not guarantee that all website information will always be complete, current, or error-free.
              </p>
            </section>

            {/* 25. Links to Third-Party Websites */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                25. Links to Third-Party Websites
              </h2>
              <p>
                Our website may contain links to third-party websites or services.
              </p>
              <p>
                These links are provided for convenience or informational purposes.
              </p>
              <p>BRC STAR does not control and is not responsible for:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Third-party content;</li>
                <li>Privacy practices;</li>
                <li>Security;</li>
                <li>Availability;</li>
                <li>Products or services;</li>
                <li>Accuracy of information; or</li>
                <li>Terms and conditions of third-party websites.</li>
              </ul>
              <p className="pt-2">
                Your use of third-party websites is subject to their respective terms and policies.
              </p>
            </section>

            {/* 26. Privacy */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                26. Privacy
              </h2>
              <p>
                Our collection and use of personal information is governed by our <Link href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
              </p>
              <p>
                By using our website or submitting personal information, you should review our Privacy Policy to understand how information may be collected and processed.
              </p>
            </section>

            {/* 27. Cookies */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                27. Cookies
              </h2>
              <p>
                Our website may use cookies and similar technologies.
              </p>
              <p>
                The use of cookies and related technologies is described in our <Link href="/cookies-policy" className="text-blue-400 hover:underline">Cookies Policy</Link>.
              </p>
            </section>

            {/* 28. Disclaimer */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                28. Disclaimer
              </h2>
              <p>
                Information provided through the BRC STAR website does not constitute legal, financial, tax, investment, medical, or other regulated professional advice unless expressly stated otherwise.
              </p>
              <p>
                You should obtain appropriate professional advice before making decisions that require specialized expertise.
              </p>
              <p>
                Additional disclaimers may apply to specific services, products, or content. View our full <Link href="/disclaimer" className="text-blue-400 hover:underline">Disclaimer</Link>.
              </p>
            </section>

            {/* 29. Changes to These Terms */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                29. Changes to These Terms
              </h2>
              <p>
                We may modify these Terms from time to time.
              </p>
              <p>
                When changes are made, we may update the “Last Updated” date at the top of this page.
              </p>
              <p>
                Your continued use of the website after updated Terms are published may constitute acceptance of the updated Terms to the extent permitted by applicable law.
              </p>
              <p>
                For project-specific contractual arrangements, the terms of the applicable signed agreement, proposal, statement of work, or purchase order may take precedence over these general website Terms.
              </p>
            </section>

            {/* 30. Governing Law */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                30. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and interpreted in accordance with the laws of India, subject to applicable legal requirements.
              </p>
              <p>
                Any dispute arising in connection with these Terms or the use of our website or services shall be subject to the jurisdiction of the courts having appropriate jurisdiction in India, unless a separate written agreement between BRC STAR and a client provides otherwise.
              </p>
            </section>

            {/* 31. Severability */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                31. Severability
              </h2>
              <p>
                If any provision of these Terms is determined to be invalid, unlawful, or unenforceable, that provision shall be interpreted or modified to the minimum extent necessary to make it enforceable where legally possible.
              </p>
              <p>
                The remaining provisions shall continue in full force and effect.
              </p>
            </section>

            {/* 32. Waiver */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                32. Waiver
              </h2>
              <p>
                Failure by BRC STAR to enforce any provision of these Terms does not constitute a waiver of our right to enforce that provision or any other provision in the future.
              </p>
            </section>

            {/* 33. Entire Agreement */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                33. Entire Agreement
              </h2>
              <p>
                These website Terms constitute the general terms governing use of the BRC STAR website.
              </p>
              <p>For specific paid services or projects, the applicable:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Proposal;</li>
                <li>Quotation;</li>
                <li>Statement of Work;</li>
                <li>Service Agreement;</li>
                <li>Master Services Agreement;</li>
                <li>Purchase Order; or</li>
                <li>Other written agreement</li>
              </ul>
              <p className="pt-2">
                may contain additional or different terms.
              </p>
              <p>
                In the event of a conflict, the project-specific written agreement will generally take precedence for that project to the extent of the conflict.
              </p>
            </section>

            {/* 34. Contact Information */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                34. Contact Information
              </h2>
              <p>
                For questions regarding these Terms or our services, please contact:
              </p>
              <div className="pt-2 text-sm font-mono text-slate-300 space-y-1.5 bg-[#060a14] p-4 rounded-xl border border-slate-800/80">
                <p><strong className="text-white">BRC STAR OPC PRIVATE LIMITED</strong></p>
                <p><strong>Email:</strong> <a href="mailto:contact@brcstar.in" className="text-blue-400 hover:underline">contact@brcstar.in</a></p>
                <p><strong>Website:</strong> <a href="https://brcpartner.brcstar.in/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://brcpartner.brcstar.in/</a></p>
              </div>
            </section>

            {/* 35. Acceptance of Terms */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                35. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the BRC STAR website, submitting an enquiry, or engaging our services, you acknowledge that you have read and understood these Terms and agree to comply with them to the extent applicable.
              </p>
              <div className="pt-4 border-t border-slate-800/60 font-mono text-xs text-slate-400 space-y-1">
                <p className="font-bold text-white">BRC STAR OPC PRIVATE LIMITED</p>
                <p>Terms &amp; Conditions</p>
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
