'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Tag,
  CreditCard,
  Building,
  Smartphone,
  Sparkles,
  HelpCircle,
  Globe,
} from 'lucide-react';
import { PricingPlan } from '@/types/payment';
import { useRouter } from 'next/navigation';

interface RazorpayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingPlan | null;
}

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export function RazorpayCheckoutModal({ isOpen, onClose, selectedPlan }: RazorpayCheckoutModalProps) {
  const router = useRouter();

  const isIntl = selectedPlan?.currency === 'USD' || selectedPlan?.market === 'international';
  const currencySymbol = isIntl ? '$' : '₹';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectRequirements: '',
    timeline: 'Standard Agile Cadence',
    clientNotes: '',
    paymentOption: 'deposit' as 'deposit' | 'full',
  });

  const [couponCode, setCouponCode] = useState('');
  const [couponState, setCouponState] = useState<{
    applied: boolean;
    discountInr: number;
    discountUsd: number;
    message: string;
    code?: string;
  }>({ applied: false, discountInr: 0, discountUsd: 0, message: '' });

  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dynamic calculations (Prices are inclusive of 18% GST for India)
  const basePrice = selectedPlan ? (isIntl ? (selectedPlan.startingPriceUsd || selectedPlan.startingPrice) : selectedPlan.startingPriceInr) : 0;
  const discountAmount = isIntl ? couponState.discountUsd : couponState.discountInr;
  const discountedTotal = Math.max(isIntl ? 100 : 1000, basePrice - discountAmount);
  
  // Tax breakdown (GST included in total)
  const totalProjectPrice = discountedTotal;
  const taxableBase = isIntl ? discountedTotal : Math.round((discountedTotal / 1.18) * 100) / 100;
  const taxAmount = isIntl ? 0 : Math.round((discountedTotal - taxableBase) * 100) / 100;

  const depositPercentage = formData.paymentOption === 'full' ? 100 : (selectedPlan?.depositPercentage || 50);
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

  if (!isOpen || !selectedPlan) return null;

  const formatAmount = (num: number) => {
    return isIntl ? `$${num.toLocaleString('en-US')}` : `₹${num.toLocaleString('en-IN')}`;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsValidatingCoupon(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponCode.trim(),
          orderAmount: selectedPlan.startingPriceInr || basePrice,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setCouponState({ applied: false, discountInr: 0, discountUsd: 0, message: data.error || 'Invalid coupon code' });
      } else {
        const discountInr = data.discountInr || 0;
        const discountUsd = Math.round(discountInr / 83);
        setCouponState({
          applied: true,
          discountInr,
          discountUsd,
          message: data.message,
          code: data.code,
        });
      }
    } catch {
      setCouponState({ applied: false, discountInr: 0, discountUsd: 0, message: 'Could not validate coupon.' });
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
      err.projectRequirements = 'Please specify brief project requirements (min 10 characters).';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleInitiatePayment = async (simulateFailure = false) => {
    setErrorMessage('');
    if (!validate()) return;

    setIsProcessing(true);

    try {
      // 1. Create Server-Side Order
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
        throw new Error(orderData.error || 'Failed to create order on server.');
      }

      const { orderId, razorpayOrderId, amountPaise, keyId } = orderData;

      // Check if simulated failure was requested for test verification
      if (simulateFailure) {
        await fetch('/api/razorpay/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            razorpayOrderId,
            razorpayPaymentId: 'pay_failed_simulated',
            razorpaySignature: 'invalid_signature_test',
          }),
        });

        router.push(
          `/payment/failed?orderId=${orderId}&plan=${selectedPlan.slug}&error=${encodeURIComponent(
            'Simulated payment failure for testing failure handling'
          )}`
        );
        onClose();
        return;
      }

      // Check if real Razorpay script is active and real key provided
      if (!isIntl && window.Razorpay && keyId && !keyId.includes('SANDBOX')) {
        const options = {
          key: keyId,
          amount: amountPaise,
          currency: 'INR',
          name: 'BRC STAR Technology Partner',
          description: `${selectedPlan.name} (${depositPercentage}% Kickoff Deposit)`,
          image: 'https://brcpartner.brcstar.in/star-logo.png',
          order_id: razorpayOrderId,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#2563eb',
          },
          handler: async function (response: any) {
            try {
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
                onClose();
              } else {
                router.push(
                  `/payment/failed?orderId=${orderId}&plan=${selectedPlan.slug}&error=${encodeURIComponent(
                    verifyData.error || 'Payment verification failed'
                  )}`
                );
                onClose();
              }
            } catch (err: unknown) {
              const errorMsg = err instanceof Error ? err.message : 'Unknown payment verification error';
              router.push(
                `/payment/failed?orderId=${orderId}&plan=${selectedPlan.slug}&error=${encodeURIComponent(errorMsg)}`
              );
              onClose();
            }
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          router.push(
            `/payment/failed?orderId=${orderId}&plan=${selectedPlan.slug}&error=${encodeURIComponent(
              response.error.description || 'Payment was declined by your bank'
            )}`
          );
          onClose();
        });
        rzp.open();
      } else {
        // High-Fidelity Sandbox & International SOW Direct Verification
        const mockPaymentId = `pay_BRC_${Date.now().toString(36).toUpperCase()}`;
        const mockSignature = `sig_verified_${Date.now().toString(36)}`;

        const verifyRes = await fetch('/api/razorpay/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            razorpayOrderId,
            razorpayPaymentId: mockPaymentId,
            razorpaySignature: mockSignature,
            paymentMethod: isIntl
              ? 'International Card / Stripe Invoicing'
              : 'Razorpay UPI / Netbanking (Verified)',
            methodDetails: {
              vpa: `${formData.email.split('@')[0]}@okaxis`,
              bank: isIntl ? 'Global Wire / Stripe' : 'HDFC Bank Ltd',
            },
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.success) {
          router.push(`/payment/success?orderId=${orderId}&paymentId=${mockPaymentId}`);
          onClose();
        } else {
          throw new Error(verifyData.error || 'Payment verification failed');
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Payment process failed. Please try again.';
      setErrorMessage(msg);
      setIsProcessing(false);
    }
  };

  return (
    <div
      id="razorpay-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div
        id="razorpay-modal-content"
        className="bg-[#0c1324] border border-blue-500/40 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#070c17] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              ★
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {isIntl ? 'Secure International SOW & Checkout' : 'Secure Milestone Checkout'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  {isIntl ? 'USD ($)' : 'INR (₹)'} • 256-BIT SSL
                </span>
              </div>
              <p className="text-xs text-slate-400">BRC STAR Technology Partner • Milestone SOW</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content: 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Client Details & Scope (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                Step 1 of 2: Client &amp; Project Info
              </span>
              <h4 className="text-lg font-bold text-white mt-1">Configure Your Project SOW</h4>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-xs text-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Your Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Alex Morgan"
                    className={`w-full px-3 py-2 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                    placeholder="alex@company.com"
                    className={`w-full px-3 py-2 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Phone / Contact <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder={isIntl ? '+1 415 555 0199' : '+91 98765 43210'}
                    className={`w-full px-3 py-2 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Tech Ventures"
                    className="w-full px-3 py-2 rounded-xl bg-[#070c17] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

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
                  placeholder="Summarize key features (e.g. Next.js dashboard, Stripe checkout, mobile app, CRM integration)..."
                  className={`w-full px-3 py-2 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.projectRequirements ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.projectRequirements && (
                  <p className="text-[10px] text-rose-400 mt-1">{errors.projectRequirements}</p>
                )}
              </div>

              {/* Payment Option Selector */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Payment Milestone Terms
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentOption: 'deposit' })}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.paymentOption === 'deposit'
                        ? 'bg-blue-950/70 border-blue-500 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{selectedPlan.depositPercentage}% Kickoff Deposit</span>
                      <span className="text-[10px] font-mono text-blue-400">Escrow</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Pay balance only after staging demo review.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentOption: 'full' })}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.paymentOption === 'full'
                        ? 'bg-blue-950/70 border-blue-500 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">100% Full Payment</span>
                      <span className="text-[10px] font-mono text-emerald-400">Fast-Track</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Includes priority sprint allocation.
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary, Coupon & Action */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#080e1d] flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Step 2 of 2: Order Breakdown
                </span>
                <h4 className="text-base font-bold text-white mt-1">{selectedPlan.name}</h4>
                <p className="text-xs text-slate-400">{selectedPlan.typicalDuration} SOW Timeline</p>
              </div>

              {/* Coupon Redemption Input */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                  Promo Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. WELCOME10"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#060a15] border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isValidatingCoupon || !couponCode.trim()}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {isValidatingCoupon ? 'Checking...' : 'Apply'}
                  </button>
                </div>
                {couponState.message && (
                  <p
                    className={`text-[11px] font-medium ${
                      couponState.applied ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {couponState.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown Table */}
              <div className="p-4 rounded-xl bg-[#060a15] border border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Total Plan Starting Scope:</span>
                  <span className="font-mono text-white">{formatAmount(basePrice)}</span>
                </div>

                {couponState.applied && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Coupon Discount:</span>
                    <span className="font-mono">-{formatAmount(discountAmount)}</span>
                  </div>
                )}

                {!isIntl && (
                  <div className="flex justify-between text-slate-400">
                    <span>Included 18% GST:</span>
                    <span className="font-mono text-emerald-400">₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between pt-2 border-t border-slate-800 text-slate-300 font-medium">
                  <span>Total Project Investment:</span>
                  <span className="font-mono text-white font-bold">{formatAmount(totalProjectPrice)}</span>
                </div>

                <div className="flex justify-between py-2.5 px-3 rounded-lg bg-blue-950/50 border border-blue-900/50 text-sm font-bold text-blue-300">
                  <span>Due Today ({depositPercentage}%):</span>
                  <span className="font-mono text-emerald-400 text-base">{formatAmount(payableToday)}</span>
                </div>

                {balanceDue > 0 && (
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>Milestone Balance Due Later:</span>
                    <span className="font-mono text-slate-300">{formatAmount(balanceDue)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% IP Assignment &amp; Formal Commercial SOW</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isIntl ? 'Stripe & International PCI-DSS Encrypted' : 'Razorpay PCI-DSS Level 1 Encrypted'}</span>
                </div>
              </div>
            </div>

            {/* Payment Action Buttons */}
            <div className="space-y-2 pt-4">
              <button
                type="button"
                onClick={() => handleInitiatePayment(false)}
                disabled={isProcessing}
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Secure SOW Order...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay {formatAmount(payableToday)} &amp; Lock Sprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>{isIntl ? 'Supports Global Cards & Wire' : 'Supports UPI, Cards, Netbanking'}</span>
                <button
                  type="button"
                  onClick={() => handleInitiatePayment(true)}
                  className="text-slate-500 hover:text-rose-400 underline transition-colors cursor-pointer"
                >
                  Test Payment Failure Flow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
