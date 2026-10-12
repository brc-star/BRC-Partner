'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Lock, Mail, Key, ArrowRight, ShieldCheck, ChevronLeft, AlertCircle } from 'lucide-react';
import { SITE } from '@/lib/site-config';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/dashboard';

  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid registered project email address.');
      return;
    }

    setIsLoading(true);

    // Set auth cookie
    document.cookie = `session=active_${Date.now()}; path=/; max-age=86400; SameSite=Lax`;

    setTimeout(() => {
      router.push(nextUrl);
    }, 400);
  };

  const handleQuickDemoAccess = () => {
    document.cookie = `session=active_demo; path=/; max-age=86400; SameSite=Lax`;
    router.push('/dashboard?email=vikram@apexlogistics.in');
  };

  return (
    <div className="w-full max-w-md space-y-8 text-left">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span className="text-slate-400 dark:text-slate-600">/</span>
        <span className="text-blue-600 dark:text-blue-400">Client Login</span>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client Portal Login
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Access your milestone progress, staging links, invoices &amp; documents.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 flex items-center gap-2 text-xs text-red-600 dark:text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Project Business Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. client@yourcompany.com"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-slate-400" />
              <span>Access PIN / Password</span>
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter project passcode"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? 'Verifying Session...' : 'Sign In to Client Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-3 text-center">
          <button
            type="button"
            onClick={handleQuickDemoAccess}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            View Sample Client Portal (Demo Order)
          </button>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Don't have an active passcode? Contact your dedicated lead architect or email{' '}
            <a href={`mailto:${SITE.email}`} className="text-blue-600 dark:text-blue-400 underline">
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#060911] dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col transition-colors duration-200">
      <Navbar onOpenInquiry={() => {}} />

      <main className="flex-grow pt-28 sm:pt-36 pb-24 flex items-center justify-center px-4 sm:px-6">
        <Suspense fallback={<div className="text-xs text-slate-400 font-mono">Loading login portal...</div>}>
          <LoginForm />
        </Suspense>
      </main>

      <Footer onOpenInquiry={() => {}} />
    </div>
  );
}

