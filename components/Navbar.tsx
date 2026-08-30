'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, CheckCircle2, Clock, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: (initialService?: string) => void;
}

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Pricing & Plans', href: '/pricing' },
    { label: 'Client Dashboard', href: '/dashboard' },
    { label: 'Proof of Work', href: '/#proof-of-work' },
    { label: 'Solutions', href: '/#solutions' },
    { label: 'Showcase', href: '/#showcase' },
    { label: 'Why BRC STAR', href: '/#why-us' },
    { label: 'Process', href: '/#process' },
    { label: 'Tech Stack', href: '/#tech-stack' },
    { label: 'FAQ', href: '/#faq' },
  ];

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
            : 'bg-[#060911]/60 backdrop-blur-sm py-4'
        } transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#"
              id="brand-logo-link"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
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
            </a>

            {/* Desktop Nav Links */}
            <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 focus:outline-none focus:text-blue-400"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
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
              className="lg:hidden mt-4 pt-4 pb-6 px-4 bg-[#0a0f1d] border border-slate-800 rounded-xl shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200"
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

              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-blue-400 font-medium text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

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
