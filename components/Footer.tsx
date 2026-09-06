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
      className="bg-[#04060c] border-t border-slate-800/80 text-slate-400 text-xs relative z-20"
      aria-label="Footer Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-[#070b14] rounded-[6.5px] flex items-center justify-center">
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
                <span className="font-bold text-base text-white tracking-tight">
                  BRC STAR
                </span>
                <span className="text-[10px] text-blue-400 block font-mono">
                  Full-Stack Technology Partner
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We design, build, deploy and support high-performance digital products, custom web applications, mobile platforms, and AI architectures for ambitious businesses.
            </p>

            <div className="space-y-1.5 pt-2 font-mono text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href={`mailto:${BRC_STAR_INFO.contactEmail}`} className="hover:text-blue-400 transition-colors">
                  {BRC_STAR_INFO.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>{BRC_STAR_INFO.location}</span>
              </div>
            </div>

            {/* System Status Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-medium">All Engineering Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">
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
                  Next.js 16 / React 19
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">
                  Strict TypeScript
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">
                  Node.js & Microservices
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">
                  PostgreSQL & Prisma
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">
                  Docker & AWS Cloud
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">
                  Google GenAI & RAG
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Direct */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">
              Pricing &amp; Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Pricing &amp; Milestone Plans →
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                  Client Project Dashboard →
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
                  className="text-blue-400 hover:text-blue-300 font-semibold text-left cursor-pointer"
                >
                  Start a Project (Inquiry) →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 text-slate-300 font-medium">
            <Link
              href="/privacy-policy"
              className="text-slate-300 hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-600 select-none" aria-hidden="true">|</span>
            <Link
              href="/terms-and-conditions"
              className="text-slate-300 hover:text-blue-400 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-slate-600 select-none" aria-hidden="true">|</span>
            <Link
              href="/disclaimer"
              className="text-slate-300 hover:text-blue-400 transition-colors"
            >
              Disclaimer
            </Link>
            <span className="text-slate-600 select-none" aria-hidden="true">|</span>
            <Link
              href="/cookies-policy"
              className="text-slate-300 hover:text-blue-400 transition-colors"
            >
              Cookies Policy
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SOC2 / GDPR Compliant Patterns
            </span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span>WCAG AA Accessibility</span>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} BRC STAR. All rights reserved. Full-Stack Digital Technology Partner.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
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
