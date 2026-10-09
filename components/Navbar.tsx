'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Terminal,
  Cpu,
  Layers,
  HelpCircle,
  Code2,
  Sparkles,
  Lock,
  Workflow,
  ExternalLink,
  ChevronRight,
  FileText,
  BadgeCheck,
  CreditCard,
  LayoutDashboard,
} from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: (initialService?: string) => void;
}

interface TechDropdownItem {
  name: string;
  href: string;
  description: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TechDropdownGroup {
  groupTitle: string;
  items: TechDropdownItem[];
}

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  const [mobileTechAccordionOpen, setMobileTechAccordionOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside and Escape key to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setTechDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setTechDropdownOpen(false);
        dropdownButtonRef.current?.focus();
      }
    };

    if (techDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [techDropdownOpen]);

  // Main primary navigation links as specified in prompt:
  // 1. Home — Link to /
  // 2. About — Link to /#why-us
  // 3. Services — Link to /#solutions
  // 4. Portfolio — Link to /#showcase
  // 5. Process — Link to /#process
  // 6. Technology ▼ — Dropdown with remaining existing pages & technology sections
  // 7. Contact — Link to /#final-conversion or inquiry modal
  const primaryNavLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#why-us' },
    { label: 'Services', href: '/#solutions' },
    { label: 'Portfolio', href: '/#showcase' },
    { label: 'Process', href: '/#process' },
    // Technology dropdown is rendered here
    { label: 'Contact', href: '/#final-conversion' },
  ];

  // Real existing sections and pages mapped under Technology dropdown
  const techDropdownGroups: TechDropdownGroup[] = [
    {
      groupTitle: 'Technology & Architecture',
      items: [
        {
          name: 'Tech Stack & Frameworks',
          href: '/#tech-stack',
          description: 'Next.js 15, TypeScript, Node.js, PostgreSQL & AWS',
          badge: 'Stack',
          icon: Cpu,
        },
        {
          name: 'Proof of Work & Telemetry',
          href: '/#proof-of-work',
          description: 'Live performance metrics, architecture & audited claims',
          badge: 'Audited',
          icon: ShieldCheck,
        },
        {
          name: 'Verification Protocol',
          href: '/#verification-methodology',
          description: '5-stage rigorous engineering verification workflow',
          badge: 'QA',
          icon: Workflow,
        },
      ],
    },
    {
      groupTitle: 'Engineering & Portals',
      items: [
        {
          name: 'Pricing & Milestone Packages',
          href: '/pricing',
          description: 'Transparent milestone pricing, Razorpay escrow & deposit',
          badge: 'Plans',
          icon: CreditCard,
        },
        {
          name: 'Client Project Dashboard',
          href: '/dashboard',
          description: 'Track orders, invoices, milestone releases & documents',
          badge: 'Portal',
          icon: LayoutDashboard,
        },
        {
          name: 'Project Scope Estimator',
          href: '/#investment',
          description: 'Interactive sprint, cost & timeline calculation engine',
          icon: Code2,
        },
      ],
    },
    {
      groupTitle: 'Knowledge & Assurance',
      items: [
        {
          name: 'Technical FAQs',
          href: '/#faq',
          description: 'Engineering standards, IP ownership & warranty SLAs',
          icon: HelpCircle,
        },
        {
          name: 'Problem vs. Solution',
          href: '/#business-problems',
          description: 'How custom architecture solves software debt & fragility',
          icon: Layers,
        },
        {
          name: 'Security & Legal Compliance',
          href: '/privacy-policy',
          description: 'SOC2 & GDPR-aligned policies, terms & security practices',
          badge: 'Legal',
          icon: Lock,
        },
      ],
    },
  ];

  const handleLinkClick = () => {
    setTechDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Top Audited Trust Bar */}
      <div className="bg-[#050811]/95 border-b border-slate-800/80 text-[11px] text-slate-400 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SOC2 / GDPR-Aligned Architecture</span>
            </span>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>WCAG AA Accessible Standards</span>
            </span>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>24h Architect Response Guaranteed</span>
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Accepting Q3/Q4 Projects
            </span>
            <span className="text-slate-600">|</span>
            <a
              href="mailto:contact@brcstar.in"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              contact@brcstar.in
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div
        className={`${
          isScrolled
            ? 'bg-[#060911]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3'
            : 'bg-[#060911]/80 backdrop-blur-sm py-4'
        } transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              id="brand-logo-link"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
              onClick={() => handleLinkClick()}
            >
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#070b14] rounded-[7px] flex items-center justify-center">
                  {/* Geometric Star Icon */}
                  <svg
                    className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                      fill="currentColor"
                      fillOpacity="0.8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="2" fill="#93c5fd" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    BRC STAR
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60">
                    PARTNER
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                  Full-Stack Technology
                </span>
              </div>
            </Link>

            {/* Desktop Nav Menu in exact ordered sequence:
                Home, About, Services, Portfolio, Process, Technology ▼, Contact */}
            <nav
              id="desktop-nav-menu"
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Main Navigation"
            >
              {/* Home */}
              <Link
                href="/"
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Home
              </Link>

              {/* About */}
              <Link
                href="/#why-us"
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                About
              </Link>

              {/* Services */}
              <Link
                href="/#solutions"
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Services
              </Link>

              {/* Portfolio */}
              <Link
                href="/#showcase"
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Portfolio
              </Link>

              {/* Process */}
              <Link
                href="/#process"
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Process
              </Link>

              {/* Technology Dropdown Container */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setTechDropdownOpen(true)}
                onMouseLeave={() => setTechDropdownOpen(false)}
              >
                <button
                  ref={dropdownButtonRef}
                  id="tech-dropdown-button"
                  type="button"
                  onClick={() => setTechDropdownOpen(!techDropdownOpen)}
                  aria-expanded={techDropdownOpen}
                  aria-haspopup="true"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    techDropdownOpen
                      ? 'text-white bg-slate-800/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span>Technology</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      techDropdownOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>

                {/* Technology Mega Dropdown Panel */}
                {techDropdownOpen && (
                  <div
                    id="tech-dropdown-panel"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] max-w-[90vw] p-5 rounded-2xl bg-[#090d19]/98 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-black/80 ring-1 ring-white/10 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    {/* Top Header Strip inside Dropdown */}
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800/80 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Terminal className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-semibold uppercase tracking-wider text-[11px] font-mono">
                          BRC STAR Engineering & Technology Ecosystem
                        </span>
                      </div>
                      <Link
                        href="/pricing"
                        onClick={handleLinkClick}
                        className="text-blue-400 hover:text-blue-300 font-mono text-[11px] flex items-center gap-1 transition-colors"
                      >
                        <span>View All Plans</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* 3 Columns of Categorized Existing Pages & Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {techDropdownGroups.map((group) => (
                        <div key={group.groupTitle} className="space-y-2">
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 font-mono">
                            {group.groupTitle}
                          </h4>
                          <div className="space-y-1">
                            {group.items.map((item) => {
                              const ItemIcon = item.icon;
                              return (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={handleLinkClick}
                                  className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all duration-150"
                                >
                                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 group-hover/item:text-blue-300 group-hover/item:border-blue-500/40 group-hover/item:bg-blue-950/40 transition-colors shrink-0 mt-0.5">
                                    <ItemIcon className="w-4 h-4" />
                                  </div>
                                  <div className="space-y-0.5 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs font-semibold text-slate-200 group-hover/item:text-white transition-colors truncate">
                                        {item.name}
                                      </span>
                                      {item.badge && (
                                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800/60 shrink-0">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                                      {item.description}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Quick-Action Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 bg-slate-950/40 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="text-slate-300 flex items-center gap-1">
                          <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Zero Tech Debt
                        </span>
                        <span className="text-slate-700">•</span>
                        <span className="text-slate-300 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-blue-400" />
                          100% IP Ownership
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setTechDropdownOpen(false);
                          onOpenInquiry('Technology Advisory');
                        }}
                        className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Request Architecture Review</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link
                href="/#final-conversion"
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Actions: Start a Project CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                id="nav-cta-button"
                onClick={() => onOpenInquiry()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-medium shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 border border-blue-400/30 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#060911]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden gap-2">
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div
              id="mobile-nav-drawer"
              className="lg:hidden mt-4 pt-4 pb-6 px-4 bg-[#0a0f1d] border border-slate-800 rounded-xl shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200"
            >
              {/* Trust Badges in Mobile Menu */}
              <div className="grid grid-cols-1 gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SOC2 / GDPR-Aligned</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>WCAG AA Accessibility</span>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>24h Response Guaranteed</span>
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  Navigation
                </span>
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Accepting Q3/Q4 Projects
                </span>
              </div>

              {/* Mobile Primary Navigation Links */}
              <div className="grid grid-cols-1 gap-1">
                {/* Home */}
                <Link
                  href="/"
                  onClick={handleLinkClick}
                  className="px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-blue-400 font-medium text-sm transition-colors"
                >
                  Home
                </Link>

                {/* About */}
                <Link
                  href="/#why-us"
                  onClick={handleLinkClick}
                  className="px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-blue-400 font-medium text-sm transition-colors"
                >
                  About
                </Link>

                {/* Services */}
                <Link
                  href="/#solutions"
                  onClick={handleLinkClick}
                  className="px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-blue-400 font-medium text-sm transition-colors"
                >
                  Services
                </Link>

                {/* Portfolio */}
                <Link
                  href="/#showcase"
                  onClick={handleLinkClick}
                  className="px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-blue-400 font-medium text-sm transition-colors"
                >
                  Portfolio
                </Link>

                {/* Process */}
                <Link
                  href="/#process"
                  onClick={handleLinkClick}
                  className="px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-blue-400 font-medium text-sm transition-colors"
                >
                  Process
                </Link>

                {/* Technology Accordion in Mobile */}
                <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/40 my-1">
                  <button
                    type="button"
                    onClick={() => setMobileTechAccordionOpen(!mobileTechAccordionOpen)}
                    className="w-full px-3 py-2.5 flex items-center justify-between text-sm font-medium text-slate-200 hover:text-blue-400 hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>Technology</span>
                      <span className="text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800/60 px-1.5 py-0.5 rounded">
                        Ecosystem
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        mobileTechAccordionOpen ? 'rotate-180 text-blue-400' : ''
                      }`}
                    />
                  </button>

                  {mobileTechAccordionOpen && (
                    <div className="px-3 pb-3 pt-1 space-y-3 bg-[#080d19]/60 border-t border-slate-800/60">
                      {techDropdownGroups.map((group) => (
                        <div key={group.groupTitle} className="space-y-1.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono pt-1">
                            {group.groupTitle}
                          </div>
                          {group.items.map((item) => {
                            const ItemIcon = item.icon;
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={handleLinkClick}
                                className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors"
                              >
                                <div className="p-1 rounded bg-slate-900 border border-slate-800 text-blue-400 shrink-0 mt-0.5">
                                  <ItemIcon className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-medium text-slate-200">
                                      {item.name}
                                    </span>
                                    {item.badge && (
                                      <span className="text-[9px] font-mono px-1 rounded bg-blue-950 text-blue-300 border border-blue-800/40">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-slate-400 truncate">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact */}
                <Link
                  href="/#final-conversion"
                  onClick={handleLinkClick}
                  className="px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-blue-400 font-medium text-sm transition-colors"
                >
                  Contact
                </Link>
              </div>

              {/* Start a Project CTA Button */}
              <div className="pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
