'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Mail, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const planSlug = searchParams.get('plan') || 'plan-ecommerce';
  const errorReason = searchParams.get('error') || 'The transaction could not be authorized by the issuing bank.';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center space-y-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-rose-950/80 border border-rose-500/50 flex items-center justify-center mx-auto text-rose-400 shadow-xl shadow-rose-950/50">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
            Transaction Incomplete
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Payment Could Not Be Processed</h1>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Your bank or payment gateway did not complete the transaction. No funds were debited, and your project draft is preserved.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1324] border border-rose-900/40 space-y-6 shadow-2xl">
        <div className="p-4 rounded-xl bg-[#160808] border border-rose-900/60 text-xs text-rose-200 space-y-1">
          <strong className="text-rose-400 uppercase font-mono tracking-wider block">Gateway Decline Reason:</strong>
          <p className="text-sm font-medium">{errorReason}</p>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          <h4 className="text-sm font-bold text-white">Suggested Troubleshooting Steps:</h4>
          <ul className="space-y-2 list-disc list-inside text-slate-400">
            <li>Ensure international/online e-commerce transactions are enabled on your card.</li>
            <li>Try using UPI (Google Pay, PhonePe, Paytm, or BHIM) or Netbanking.</li>
            <li>Check your daily bank limit for online transactions.</li>
            <li>If the problem persists, contact our payment support team to generate a direct NEFT/RTGS invoice.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <a
            href="mailto:contact@brcstar.in?subject=Payment%20Assistance%20Required"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 text-blue-400" />
            <span>Contact Payment Support (contact@brcstar.in)</span>
          </a>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/pricing"
              className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
            >
              Choose Another Plan
            </Link>

            <Link
              href={`/checkout?plan=${planSlug}`}
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Payment Securely</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Navbar onOpenInquiry={() => {}} />
      <main className="flex-grow pt-24 sm:pt-32">
        <Suspense
          fallback={
            <div className="py-24 text-center text-slate-400 text-sm">
              Loading Payment Status...
            </div>
          }
        >
          <PaymentFailedContent />
        </Suspense>
      </main>
      <Footer onOpenInquiry={() => {}} />
    </div>
  );
}
