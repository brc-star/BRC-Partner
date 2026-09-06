'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectInquiryModal } from '@/components/ProjectInquiryModal';
import { Cookie, ChevronLeft, ArrowRight } from 'lucide-react';

export default function CookiesPolicyPage() {
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
            <span className="text-blue-400">Cookies Policy</span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-slate-800/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <Cookie className="w-3.5 h-3.5 text-blue-400" />
              <span>Legal Documentation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Cookies Policy
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span><strong>Effective Date:</strong> 5 September 2026</span>
              <span>•</span>
              <span><strong>Last Updated:</strong> 5 September 2026</span>
            </div>
            <div className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2 space-y-3">
              <p>
                This Cookies Policy explains how BRC STAR OPC PRIVATE LIMITED (”BRC STAR”, ”we”, ”us”, or ”our”) may use cookies and similar technologies when you visit or interact with our website:
              </p>
              <p className="font-mono text-blue-400 text-sm">
                https://brcpartner.brcstar.in/
              </p>
              <p>
                This policy should be read together with our <Link href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>, <Link href="/terms-and-conditions" className="text-blue-400 hover:underline">Terms &amp; Conditions</Link>, and <Link href="/disclaimer" className="text-blue-400 hover:underline">Disclaimer</Link>.
              </p>
            </div>
          </div>

          {/* Cookies Policy Content Sections */}
          <div className="space-y-8 text-sm sm:text-[15px] leading-relaxed text-slate-300">
            {/* 1. What Are Cookies? */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files or similar technologies that may be stored on your device when you visit a website.
              </p>
              <p>They can help websites:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Function properly;</li>
                <li>Remember preferences;</li>
                <li>Understand how visitors use the website;</li>
                <li>Improve website performance;</li>
                <li>Maintain security;</li>
                <li>Provide relevant features; and</li>
                <li>Improve the overall user experience.</li>
              </ul>
              <p className="pt-2">
                Cookies may be stored by the website itself or by third-party services used by the website.
              </p>
            </section>

            {/* 2. How We Use Cookies */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                2. How We Use Cookies
              </h2>
              <p>BRC STAR may use cookies and similar technologies for purposes such as:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Essential website functionality;</li>
                <li>Security and fraud prevention;</li>
                <li>Remembering user preferences;</li>
                <li>Improving website performance;</li>
                <li>Understanding website traffic and usage;</li>
                <li>Diagnosing technical problems;</li>
                <li>Measuring the effectiveness of website content;</li>
                <li>Supporting communication or marketing functionality, where applicable; and</li>
                <li>Other purposes described at the time of collection or in the applicable privacy notice.</li>
              </ul>
              <p className="pt-2">
                The actual cookies used on the website may change as the website, technology, or services are updated.
              </p>
            </section>

            {/* 3. Types of Cookies */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                3. Types of Cookies
              </h2>
              <p>
                Cookies used on or through our website may generally fall into the following categories.
              </p>

              {/* 3.1 Strictly Necessary Cookies */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-blue-600/60">
                <h3 className="text-base font-semibold text-white">
                  3.1 Strictly Necessary Cookies
                </h3>
                <p>
                  These cookies may be required for the basic operation, security, or functionality of the website.
                </p>
                <p>They may support functions such as:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Website navigation;</li>
                  <li>Security;</li>
                  <li>Session management;</li>
                  <li>Form functionality;</li>
                  <li>Preference management; and</li>
                  <li>Technical operation of the website.</li>
                </ul>
                <p className="pt-2 text-slate-400 text-xs sm:text-sm">
                  Because these cookies may be necessary for the website to function properly, disabling them may affect certain website features.
                </p>
              </div>

              {/* 3.2 Preference or Functional Cookies */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-blue-600/60">
                <h3 className="text-base font-semibold text-white">
                  3.2 Preference or Functional Cookies
                </h3>
                <p>
                  These cookies may allow the website to remember choices you make and provide enhanced functionality.
                </p>
                <p>Examples may include remembering:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Language preferences;</li>
                  <li>Display preferences;</li>
                  <li>Certain session choices; or</li>
                  <li>Other settings selected by you.</li>
                </ul>
                <p className="pt-2 text-slate-400 text-xs sm:text-sm">
                  Where consent is required by applicable law, these cookies may only be used after the relevant consent or preference has been provided.
                </p>
              </div>

              {/* 3.3 Analytics or Performance Cookies */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-blue-600/60">
                <h3 className="text-base font-semibold text-white">
                  3.3 Analytics or Performance Cookies
                </h3>
                <p>
                  Where analytics services are enabled, these cookies may help us understand how visitors interact with the website.
                </p>
                <p>They may help us understand information such as:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Which pages are visited;</li>
                  <li>How visitors navigate the website;</li>
                  <li>Approximate usage patterns;</li>
                  <li>Website performance;</li>
                  <li>Errors or technical issues; and</li>
                  <li>General traffic trends.</li>
                </ul>
                <p className="pt-2 text-slate-400 text-xs sm:text-sm">
                  Analytics information may be aggregated or otherwise processed according to the applicable third-party service and our Privacy Policy.
                </p>
              </div>

              {/* 3.4 Marketing or Advertising Cookies */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-blue-600/60">
                <h3 className="text-base font-semibold text-white">
                  3.4 Marketing or Advertising Cookies
                </h3>
                <p>Where such technologies are used, marketing or advertising cookies may help:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Measure advertising effectiveness;</li>
                  <li>Understand interactions with marketing content;</li>
                  <li>Support advertising functionality;</li>
                  <li>Limit repeated advertisements; or</li>
                  <li>Deliver content or advertising that may be more relevant to users.</li>
                </ul>
                <p className="pt-2 text-slate-400 text-xs sm:text-sm">
                  We will use such technologies in accordance with applicable law and any applicable consent or preference mechanism.
                </p>
              </div>

              {/* 3.5 Third-Party Cookies */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-blue-600/60">
                <h3 className="text-base font-semibold text-white">
                  3.5 Third-Party Cookies
                </h3>
                <p>
                  Some cookies may be placed by third-party service providers whose technologies are integrated into our website.
                </p>
                <p>Third-party services may include, depending on the website configuration:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Analytics providers;</li>
                  <li>Embedded media providers;</li>
                  <li>Security providers;</li>
                  <li>Communication tools;</li>
                  <li>Cloud or hosting providers;</li>
                  <li>Marketing platforms;</li>
                  <li>Payment or transaction services; or</li>
                  <li>Other technology providers.</li>
                </ul>
                <p className="pt-2 text-slate-400 text-xs sm:text-sm">
                  The specific third-party services active on the website may change over time. Third parties may process information according to their own privacy policies and terms.
                </p>
              </div>
            </section>

            {/* 4. Session and Persistent Cookies */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-5">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                4. Session and Persistent Cookies
              </h2>
              <p>Cookies may also differ according to how long they remain on your device.</p>

              <div className="space-y-2 pt-1">
                <h3 className="text-base font-semibold text-white">Session Cookies</h3>
                <p>
                  Session cookies are generally temporary and may be removed when you close your browser or when the relevant session ends.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/60">
                <h3 className="text-base font-semibold text-white">Persistent Cookies</h3>
                <p>
                  Persistent cookies may remain on your device for a defined period or until they are deleted.
                </p>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Their duration may depend on the purpose of the cookie and the technology provider.
                </p>
              </div>
            </section>

            {/* 5. Similar Technologies */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                5. Similar Technologies
              </h2>
              <p>In addition to cookies, we may use technologies such as:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Local storage;</li>
                <li>Pixels;</li>
                <li>Tags;</li>
                <li>Scripts;</li>
                <li>Web beacons; or</li>
                <li>Similar technologies.</li>
              </ul>
              <p className="pt-2">
                These technologies may perform functions similar to cookies, including measurement, security, preferences, analytics, or functionality.
              </p>
              <p>
                For the purposes of this policy, we use the term “cookies” broadly to include such similar technologies where appropriate.
              </p>
            </section>

            {/* 6. Cookie Consent and Preferences */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                6. Cookie Consent and Preferences
              </h2>
              <p>
                Where applicable, visitors may be presented with a cookie or privacy preference mechanism that allows them to manage optional technologies.
              </p>
              <p>Depending on the configuration of the website, available choices may include:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Accepting optional cookies;</li>
                <li>Declining optional cookies;</li>
                <li>Selecting certain categories;</li>
                <li>Saving cookie preferences; or</li>
                <li>Changing previously selected preferences.</li>
              </ul>
              <p className="pt-2">
                Where consent is required for a category of processing, we intend to seek the relevant consent before enabling that processing.
              </p>
              <p>
                India&apos;s DPDP Act states that consent must be free, specific, informed, unconditional and unambiguous, and that withdrawal should be as easy as giving consent.
              </p>
            </section>

            {/* 7. Withdrawal or Change of Cookie Preferences */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                7. Withdrawal or Change of Cookie Preferences
              </h2>
              <p>
                Where the website provides a cookie-preference mechanism, you may use that mechanism to change or withdraw applicable optional-cookie preferences.
              </p>
              <p>
                The website may also provide other methods for managing applicable consent or privacy choices.
              </p>
              <p>
                Where consent is the basis for processing, withdrawal of consent does not affect the lawfulness of processing carried out before the withdrawal.
              </p>
              <p>
                Please note that certain strictly necessary technologies may continue to operate where they are required to provide the requested website functionality or where otherwise permitted by applicable law.
              </p>
            </section>

            {/* 8. Browser Controls */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                8. Browser Controls
              </h2>
              <p>
                Most modern web browsers allow you to manage cookies through browser settings.
              </p>
              <p>Depending on your browser, you may be able to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>View stored cookies;</li>
                <li>Delete existing cookies;</li>
                <li>Block certain cookies;</li>
                <li>Block all cookies;</li>
                <li>Allow cookies only from selected websites; or</li>
                <li>Receive notifications when cookies are being used.</li>
              </ul>
              <p className="pt-2">
                Disabling cookies may affect the functionality, performance, or availability of certain features of the website.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                You should consult your browser&apos;s official documentation for instructions on managing cookies.
              </p>
            </section>

            {/* 9. Do Not Track Signals */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                9. Do Not Track Signals
              </h2>
              <p>
                Some browsers and devices may provide “Do Not Track” or similar privacy signals.
              </p>
              <p>
                Because there is no single universally adopted technical standard for responding to all such signals in every environment, our website may not respond to every browser-generated signal.
              </p>
              <p>
                Where required by applicable law, we will handle applicable privacy signals in accordance with the relevant legal requirements.
              </p>
            </section>

            {/* 10. Cookies and Personal Information */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                10. Cookies and Personal Information
              </h2>
              <p>
                Cookies and similar technologies may sometimes be associated with information that can identify or relate to a particular individual.
              </p>
              <p>
                Where cookies or related technologies involve personal information, such information will be handled in accordance with our Privacy Policy and applicable law.
              </p>
              <p>
                Not every cookie necessarily contains or directly reveals personal information.
              </p>
            </section>

            {/* 11. Third-Party Websites */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                11. Third-Party Websites
              </h2>
              <p>
                Our website may contain links to third-party websites or services.
              </p>
              <p>
                Once you leave our website, the cookie and tracking practices of the third-party website will be governed by that third party&apos;s own policies.
              </p>
              <p>
                BRC STAR does not control the cookies, tracking technologies, privacy practices, or data-processing activities of websites that we do not operate.
              </p>
              <p>
                We recommend reviewing the relevant third party&apos;s privacy and cookie policies.
              </p>
            </section>

            {/* 12. Security */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                12. Security
              </h2>
              <p>
                Cookies and similar technologies may be used to support website security and help detect unauthorized activity, abuse, fraud, or other suspicious behaviour.
              </p>
              <p>
                However, no security mechanism can guarantee complete protection against all threats.
              </p>
              <p>
                You should also maintain appropriate security practices on your own devices, including keeping your browser and operating system reasonably updated.
              </p>
            </section>

            {/* 13. Cookie Duration */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                13. Cookie Duration
              </h2>
              <p>
                The duration of an individual cookie may vary depending on its purpose and the service that places it.
              </p>
              <p>Cookies may expire:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>When a browser session ends;</li>
                <li>After a defined period;</li>
                <li>When a user changes their preferences; or</li>
                <li>When they are manually deleted.</li>
              </ul>
              <p className="pt-2">
                The website&apos;s actual cookie configuration may be updated from time to time.
              </p>
            </section>

            {/* 14. Changes to Cookies Used on the Website */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                14. Changes to Cookies Used on the Website
              </h2>
              <p>
                We may add, remove, replace, or modify cookies and similar technologies as our website, services, security requirements, analytics tools, or technology providers change.
              </p>
              <p>
                Accordingly, the exact list of cookies or technologies active on the website may change over time.
              </p>
              <p>
                Where required, we will update applicable notices or preference mechanisms to reflect material changes.
              </p>
            </section>

            {/* 15. Your Privacy Choices */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                15. Your Privacy Choices
              </h2>
              <p>Depending on applicable law and the technologies in use, you may have choices concerning:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Whether to allow optional cookies;</li>
                <li>Whether to withdraw consent;</li>
                <li>Whether to manage browser-level cookie settings;</li>
                <li>Whether to request information concerning processing of your personal data; and</li>
                <li>Other privacy rights available under applicable law.</li>
              </ul>
              <p className="pt-2">
                Further information about privacy rights is available in our <Link href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
              </p>
            </section>

            {/* 16. Data Protection and Applicable Law */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                16. Data Protection and Applicable Law
              </h2>
              <p>
                This Cookies Policy is intended to be interpreted consistently with applicable Indian data-protection and information-technology laws and regulations, including the <strong>Digital Personal Data Protection Act, 2023</strong>, the <strong>Digital Personal Data Protection Rules, 2025</strong>, and other applicable requirements, as amended or replaced from time to time.
              </p>
              <p>
                The notified Digital Personal Data Protection Rules, 2025 emphasize clear and plain-language privacy notices and accessible mechanisms for exercising privacy choices and withdrawing consent where applicable.
              </p>
            </section>

            {/* 17. Contact Us */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                17. Contact Us
              </h2>
              <p>
                If you have questions about this Cookies Policy or the use of cookies on our website, please contact:
              </p>
              <div className="pt-2 text-sm font-mono text-slate-300 space-y-1.5 bg-[#060a14] p-4 rounded-xl border border-slate-800/80">
                <p><strong className="text-white">BRC STAR OPC PRIVATE LIMITED</strong></p>
                <p><strong>Email:</strong> <a href="mailto:contact@brcstar.in" className="text-blue-400 hover:underline">contact@brcstar.in</a></p>
                <p><strong>Website:</strong> <a href="https://brcpartner.brcstar.in/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://brcpartner.brcstar.in/</a></p>
              </div>
            </section>

            {/* 18. Updates to This Cookies Policy */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                18. Updates to This Cookies Policy
              </h2>
              <p>We may update this Cookies Policy periodically.</p>
              <p>When we make changes, we may update the:</p>
              <p className="font-semibold text-white pl-4 border-l-2 border-blue-500">
                “Last Updated” date displayed at the top of this page.
              </p>
              <p>
                We encourage you to review this policy periodically so that you remain informed about how cookies and similar technologies are used.
              </p>
            </section>

            {/* 19. Related Policies */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                19. Related Policies
              </h2>
              <p>This Cookies Policy should be read together with:</p>
              <div className="space-y-3 pt-2">
                <div>
                  <Link href="/privacy-policy" className="font-semibold text-blue-400 hover:underline">Privacy Policy</Link>
                  <p className="text-xs sm:text-sm text-slate-400">Explains how personal information is collected, used, disclosed, protected, and retained.</p>
                </div>
                <div>
                  <Link href="/terms-and-conditions" className="font-semibold text-blue-400 hover:underline">Terms &amp; Conditions</Link>
                  <p className="text-xs sm:text-sm text-slate-400">Governs the use of the BRC STAR website and applicable services.</p>
                </div>
                <div>
                  <Link href="/disclaimer" className="font-semibold text-blue-400 hover:underline">Disclaimer</Link>
                  <p className="text-xs sm:text-sm text-slate-400">Describes important limitations and disclaimers relating to website information and technology services.</p>
                </div>
              </div>
            </section>

            {/* 20. Acceptance */}
            <section className="bg-[#0a1020]/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                20. Acceptance
              </h2>
              <p>
                By using the BRC STAR website, you acknowledge this Cookies Policy and understand that cookies and similar technologies may be used as described above, subject to your available choices and applicable law.
              </p>
              <div className="pt-4 border-t border-slate-800/60 font-mono text-xs text-slate-400 space-y-1">
                <p className="font-bold text-white">BRC STAR OPC PRIVATE LIMITED</p>
                <p>Cookies Policy</p>
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
              <Link href="/disclaimer" className="hover:text-blue-400 text-slate-300 underline underline-offset-4">
                Disclaimer
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
