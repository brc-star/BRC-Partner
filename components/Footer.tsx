'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Terminal, Shield, Mail, MapPin, Globe, Sparkles } from 'lucide-react';
import { BRC_STAR_INFO } from '@/lib/data';

interface FooterProps {
  onOpenInquiry: () => void;
}

export function Footer({ onOpenInquiry }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="bg-slate-100 dark:bg-[#04060c] border-t border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 text-xs relative z-20"
      aria-label="Footer Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-900 dark:bg-[#070b14] rounded-[6.5px] flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
                  BRC STAR
                </span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 block font-mono">
                  Full-Stack Technology Partner
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              We design, build, deploy and support high-performance digital products, custom web applications, mobile platforms, and AI architectures for ambitious businesses.
            </p>

            <div className="space-y-1.5 pt-2 font-mono text-[11px] text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                <a href={`mailto:${BRC_STAR_INFO.contactEmail}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {BRC_STAR_INFO.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>{BRC_STAR_INFO.location}</span>
              </div>
            </div>

            {/* System Status Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">All Engineering Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Solutions
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#solutions" className="hover:text-blue-400 transition-colors">
                  Web Applications & SaaS
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-blue-400 transition-colors">
                  Mobile App Development
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-blue-400 transition-colors">
                  Enterprise Software & ERP
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-blue-400 transition-colors">
                  AI & Workflow Automation
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-blue-400 transition-colors">
                  UI/UX & Design Systems
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-blue-400 transition-colors">
                  Headless E-Commerce
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Capabilities & Tech */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">
              Architecture & Tech
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">
                  Next.js 15 / React 19
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">
                  Strict TypeScript
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">
                  Node.js &amp; Microservices
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">
                  PostgreSQL &amp; Prisma
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">
                  Docker &amp; AWS Cloud
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">
                  Google GenAI &amp; RAG
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Direct */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Pricing &amp; Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold transition-colors">
                  Pricing &amp; Milestone Plans →
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold transition-colors">
                  Client Login →
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us (Company Story)
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="hover:text-blue-400 transition-colors">
                  Why BRC STAR
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-blue-400 transition-colors">
                  6-Stage Lifecycle
                </Link>
              </li>
              <li>
                <Link href="/#showcase" className="hover:text-blue-400 transition-colors">
                  Visual Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-blue-400 transition-colors">
                  FAQ &amp; Engagements
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenInquiry}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-left cursor-pointer"
                >
                  Start a Project (Inquiry) →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-center text-xs">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-slate-600 dark:text-slate-300 font-medium">
            <Link
              href="/privacy-policy"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-400 dark:text-slate-600 select-none" aria-hidden="true">|</span>
            <Link
              href="/terms-and-conditions"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-slate-400 dark:text-slate-600 select-none" aria-hidden="true">|</span>
            <Link
              href="/refund-cancellation-policy"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Refund &amp; Cancellation Policy
            </Link>
            <span className="text-slate-400 dark:text-slate-600 select-none" aria-hidden="true">|</span>
            <Link
              href="/disclaimer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Disclaimer
            </Link>
            <span className="text-slate-400 dark:text-slate-600 select-none" aria-hidden="true">|</span>
            <Link
              href="/cookies-policy"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Cookies Policy
            </Link>
          </div>
        </div>

        {/* Corporate Entity Details */}
        <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/40 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2 font-mono">
          <div>
            <span><strong>Legal Entity:</strong> BRC STAR PARTNER , Vareli, Surat, Gujarat India -  394327</span>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} BRC STAR PARTNER. All rights reserved. Full-Stack Digital Technology Partner.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
