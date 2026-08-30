'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CORE_PRICING_PLANS, RECURRING_AMC_PLANS, PROMO_COUPONS } from '@/lib/pricing-data';
import { PricingPlan } from '@/types/payment';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Tag,
  Sparkles,
  Layers,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planParam = searchParams.get('plan') || 'plan-ecommerce';
  const emailParam = searchParams.get('email') || '';

  const allPlans = [...CORE_PRICING_PLANS, ...RECURRING_AMC_PLANS];
  const initialPlan =
    allPlans.find((p) => p.id === planParam || p.slug === planParam) || CORE_PRICING_PLANS[1];

  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(initialPlan);
  const [formData, setFormData] = useState({
    name: '',
    email: emailParam,
    phone: '',
    company: '',
    projectRequirements: '',
    timeline: 'Standard Agile Schedule',
    clientNotes: '',
    paymentOption: 'deposit' as 'deposit' | 'full',
  });

  const [couponCode, setCouponCode] = useState('');
  const [couponState, setCouponState] = useState<{
    applied: boolean;
    discountInr: number;
    message: string;
    code?: string;
  }>({ applied: false, discountInr: 0, message: '' });

  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dynamic calculations
  const basePrice = selectedPlan.startingPriceInr;
  const discountAmount = couponState.discountInr;
  const discountedBase = Math.max(1000, basePrice - discountAmount);
  const gstTax = Math.round(discountedBase * 0.18 * 100) / 100;
  const totalProjectPrice = Math.round((discountedBase + gstTax) * 100) / 100;

  const depositPercentage = formData.paymentOption === 'full' ? 100 : selectedPlan.depositPercentage;
  const payableToday = Math.round((totalProjectPrice * (depositPercentage / 100)) * 100) / 100;
  const balanceDue = Math.max(0, Math.round((totalProjectPrice - payableToday) * 100) / 100);

  // Load Razorpay script dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsValidatingCoupon(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim(), orderAmount: basePrice }),
      });

      const data = await res.json();
      if (!res.ok) {
        setCouponState({ applied: false, discountInr: 0, message: data.error || 'Invalid coupon code' });
      } else {
        setCouponState({
          applied: true,
          discountInr: data.discountInr,
          message: data.message,
          code: data.code,
        });
      }
    } catch {
      setCouponState({ applied: false, discountInr: 0, message: 'Could not validate coupon.' });
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      err.name = 'Full name must be at least 2 characters.';
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      err.email = 'Please provide a valid business email address.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      err.phone = 'Valid phone number with country code is required.';
    }
    if (!formData.projectRequirements.trim() || formData.projectRequirements.trim().length < 10) {
      err.projectRequirements = 'Please specify project requirements (min 10 characters).';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleInitiatePayment = async (simulateFailure = false) => {
    setErrorMessage('');
    if (!validate()) return;

    setIsProcessing(true);

    try {
      // Create order
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          couponCode: couponState.applied ? couponState.code : undefined,
          paymentOption: formData.paymentOption,
          projectRequirements: formData.projectRequirements,
          timeline: formData.timeline,
          clientNotes: formData.clientNotes,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to initialize order.');
      }

      const { orderId, razorpayOrderId, amountPaise, keyId } = orderData;

      if (simulateFailure) {
        await fetch('/api/razorpay/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            razorpayOrderId,
            razorpayPaymentId: 'pay_simulated_failure',
            razorpaySignature: 'invalid_sig',
          }),
        });

        router.push(`/payment/failed?orderId=${orderId}&plan=${selectedPlan.slug}&error=Simulated+payment+failure`);
        return;
      }

      // If Razorpay SDK active and non-sandbox key
      if (window.Razorpay && keyId && !keyId.includes('SANDBOX')) {
        const options = {
          key: keyId,
          amount: amountPaise,
          currency: 'INR',
          name: 'BRC STAR Technology Partner',
          description: `${selectedPlan.name} (${depositPercentage}% Kickoff Deposit)`,
          order_id: razorpayOrderId,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: '#2563eb' },
          handler: async function (response: any) {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId,
                razorpayOrderId: response.razorpay_order_id || razorpayOrderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                paymentMethod: 'Razorpay Gateway',
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              router.push(`/payment/success?orderId=${orderId}&paymentId=${response.razorpay_payment_id}`);
            } else {
              router.push(`/payment/failed?orderId=${orderId}&plan=${selectedPlan.slug}&error=${encodeURIComponent(verifyData.error || 'Payment verification failed')}`);
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (resp: any) {
          router.push(`/payment/failed?orderId=${orderId}&plan=${selectedPlan.slug}&error=${encodeURIComponent(resp.error.description || 'Payment declined by bank')}`);
        });
        rzp.open();
      } else {
        // High fidelity sandbox verification
        const mockPaymentId = `pay_BRC_${Date.now().toString(36).toUpperCase()}`;
        const mockSig = `sig_${Date.now().toString(36)}`;

        const verifyRes = await fetch('/api/razorpay/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            razorpayOrderId,
            razorpayPaymentId: mockPaymentId,
            razorpaySignature: mockSig,
            paymentMethod: 'Razorpay UPI (Sandbox Verified)',
            methodDetails: {
              vpa: `${formData.email.split('@')[0]}@okhdfcbank`,
              bank: 'HDFC Bank Ltd',
            },
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.success) {
          router.push(`/payment/success?orderId=${orderId}&paymentId=${mockPaymentId}`);
        } else {
          throw new Error(verifyData.error || 'Payment verification failed');
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Payment process failed.';
      setErrorMessage(msg);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Pricing Plans</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Client Info & Plan Config (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1324] border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Order Configuration
                </span>
                <h1 className="text-2xl font-extrabold text-white mt-1">Configure SOW &amp; Checkout</h1>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SSL Encrypted</span>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-xs text-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Plan Switcher Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Selected Plan Package
              </label>
              <select
                value={selectedPlan.id}
                onChange={(e) => {
                  const p = allPlans.find((x) => x.id === e.target.value);
                  if (p) setSelectedPlan(p);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-800 text-xs text-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                {allPlans.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#0c1324] text-white">
                    {p.name} — Starting from ₹{p.startingPriceInr.toLocaleString('en-IN')} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Full Name <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Vikram Malhotra"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Business Email <span className="text-blue-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="e.g. vikram@apexlogistics.in"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Phone / WhatsApp <span className="text-blue-400">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Apex Logistics India"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Scope */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Project Scope &amp; Target Features <span className="text-blue-400">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.projectRequirements}
                onChange={(e) => {
                  setFormData({ ...formData, projectRequirements: e.target.value });
                  if (errors.projectRequirements) setErrors({ ...errors, projectRequirements: '' });
                }}
                placeholder="Outline core requirements (e.g. custom product catalog, Razorpay gateway, real-time shipment tracker)..."
                className={`w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.projectRequirements ? 'border-rose-500' : 'border-slate-800'
                }`}
              />
              {errors.projectRequirements && (
                <p className="text-[10px] text-rose-400 mt-1">{errors.projectRequirements}</p>
              )}
            </div>

            {/* Milestone Payment Options */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Payment Milestone Terms
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentOption: 'deposit' })}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    formData.paymentOption === 'deposit'
                      ? 'bg-blue-950/70 border-blue-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{selectedPlan.depositPercentage}% Kickoff Deposit</span>
                    <span className="text-[10px] font-mono text-blue-400 font-bold">Standard SOW</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Balance payable after staging review and acceptance.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentOption: 'full' })}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    formData.paymentOption === 'full'
                      ? 'bg-blue-950/70 border-blue-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">100% Full Payment</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">Fast-Track</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Priority sprint allocation &amp; dedicated architect slot.
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary & Checkout Trigger (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1324] border border-blue-500/30 space-y-6 shadow-2xl">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                Order Summary
              </span>
              <h2 className="text-xl font-bold text-white mt-1">{selectedPlan.name}</h2>
              <p className="text-xs text-blue-400 font-medium">{selectedPlan.tagline}</p>
            </div>

            {/* Promo Coupons */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. WELCOME10"
                  className="flex-1 px-3 py-2.5 rounded-xl bg-[#070c17] border border-slate-800 text-xs font-mono text-white placeholder-slate-600 uppercase focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={isValidatingCoupon || !couponCode.trim()}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {isValidatingCoupon ? '...' : 'Apply'}
                </button>
              </div>
              {couponState.message && (
                <p className={`text-[11px] font-medium ${couponState.applied ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {couponState.message}
                </p>
              )}
            </div>

            {/* Financial Breakdown */}
            <div className="p-4 rounded-2xl bg-[#070c17] border border-slate-800/80 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Base Plan Starting Scope:</span>
                <span className="font-mono text-white">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>

              {couponState.applied && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount Applied:</span>
                  <span className="font-mono">-₹{couponState.discountInr.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>Integrated GST (18%):</span>
                <span className="font-mono text-white">₹{gstTax.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-slate-800 text-slate-300 font-medium">
                <span>Total Project Investment:</span>
                <span className="font-mono text-white font-bold text-sm">₹{totalProjectPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between py-3 px-3.5 rounded-xl bg-blue-950/60 border border-blue-900/60 text-sm font-bold text-blue-300">
                <span>Due Today ({depositPercentage}%):</span>
                <span className="font-mono text-emerald-400 text-lg">₹{payableToday.toLocaleString('en-IN')}</span>
              </div>

              {balanceDue > 0 && (
                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <span>Remaining Milestone Balance:</span>
                  <span className="font-mono text-slate-300">₹{balanceDue.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Instant Tax Invoice &amp; SOW generated upon payment</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Intellectual Property ownership transferred</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Razorpay PCI-DSS Level 1 Encrypted Payment Gateway</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => handleInitiatePayment(false)}
                disabled={isProcessing}
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Order &amp; Connecting Razorpay...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay ₹{payableToday.toLocaleString('en-IN')} via Razorpay</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleInitiatePayment(true)}
                  className="text-[11px] text-slate-500 hover:text-rose-400 underline transition-colors cursor-pointer"
                >
                  Simulate Gateway Payment Failure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Navbar onOpenInquiry={() => {}} />
      <main className="flex-grow pt-24 sm:pt-32">
        <Suspense
          fallback={
            <div className="py-24 text-center text-slate-400 text-sm">
              Loading Secure Checkout Session...
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer onOpenInquiry={() => {}} />
    </div>
  );
}
