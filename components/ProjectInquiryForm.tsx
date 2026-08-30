'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Clock, Send, Sparkles } from 'lucide-react';

interface ProjectInquiryFormProps {
  initialService?: string;
  onSuccess?: (inquiryId: string) => void;
  className?: string;
}

export function ProjectInquiryForm({ initialService = 'Website Development', onSuccess, className = '' }: ProjectInquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: initialService,
    budgetRange: '₹50,000 – ₹1,00,000',
    timeline: '4 to 6 Weeks',
    projectDescription: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const serviceOptions = [
    'Website Development',
    'E-Commerce Development',
    'Mobile App Development',
    'AI & Automation Solutions',
    'Custom Enterprise Solutions',
    'Website Maintenance & AMC',
    'Dedicated Engineering Retainer',
  ];

  const budgetOptions = [
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,50,000',
    '₹2,50,000 – ₹5,00,000',
    '₹5,00,000+ (Enterprise)',
  ];

  const timelineOptions = [
    'Urgent (2 to 3 Weeks)',
    'Standard Agile (4 to 6 Weeks)',
    'Comprehensive (8 to 12 Weeks)',
    'Ongoing Monthly Retainer',
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters.';
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid business email address.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      newErrors.phone = 'Please provide a valid contact number (min 8 digits).';
    }
    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 10) {
      newErrors.projectDescription = 'Please describe your requirements (at least 10 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setIsSuccess(true);
      setInquiryId(data.inquiryId || `BRC-${Date.now().toString(36).toUpperCase()}`);
      if (onSuccess) {
        onSuccess(data.inquiryId);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please email contact@brcstar.in';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`rounded-2xl bg-[#0a101e] border border-slate-800 p-6 sm:p-8 ${className}`}>
      {isSuccess ? (
        <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white">Project Inquiry Received</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <strong className="text-white">{formData.fullName}</strong>. Your requirement has been routed directly to our Lead Systems Architect.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-blue-400">
            <span>Inquiry ID:</span>
            <strong className="text-white">{inquiryId}</strong>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-xl bg-blue-950/40 border border-blue-900/40 text-xs text-blue-300 text-left space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>24-Hour Architect Response Guarantee</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              We will review your technical specifications and reach out with an itemized proposal, recommended architecture, and sprint timeline.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                companyName: '',
                projectType: initialService,
                budgetRange: '₹50,000 – ₹1,00,000',
                timeline: '4 to 6 Weeks',
                projectDescription: '',
              });
            }}
            className="text-xs text-slate-400 hover:text-white underline transition-colors cursor-pointer"
          >
            Submit Another Project Requirement
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">Request a Custom Proposal</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Speak directly with senior engineers — no sales middlemen or unsolicited spam.
              </p>
            </div>
            <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>24h Response</span>
            </span>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-xs text-rose-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="inquiry-fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name <span className="text-blue-400">*</span>
              </label>
              <input
                id="inquiry-fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                placeholder="e.g. Vikram Malhotra"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.fullName ? 'border-rose-500' : 'border-slate-800'
                }`}
              />
              {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="inquiry-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Business Email <span className="text-blue-400">*</span>
              </label>
              <input
                id="inquiry-email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="e.g. vikram@company.in"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.email ? 'border-rose-500' : 'border-slate-800'
                }`}
              />
              {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="inquiry-phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Contact Phone / WhatsApp <span className="text-blue-400">*</span>
              </label>
              <input
                id="inquiry-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="e.g. +91 98765 43210"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.phone ? 'border-rose-500' : 'border-slate-800'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="inquiry-company" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Company / Organization (Optional)
              </label>
              <input
                id="inquiry-company"
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Apex Logistics India"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Service */}
            <div>
              <label htmlFor="inquiry-service" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Selected Service
              </label>
              <select
                id="inquiry-service"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#070c17] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0c1324] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="inquiry-budget" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Estimated Budget
              </label>
              <select
                id="inquiry-budget"
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#070c17] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0c1324] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Timeline */}
            <div>
              <label htmlFor="inquiry-timeline" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Timeline
              </label>
              <select
                id="inquiry-timeline"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#070c17] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {timelineOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0c1324] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <label htmlFor="inquiry-requirements" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Project Requirements &amp; Scope Details <span className="text-blue-400">*</span>
            </label>
            <textarea
              id="inquiry-requirements"
              rows={4}
              value={formData.projectDescription}
              onChange={(e) => {
                setFormData({ ...formData, projectDescription: e.target.value });
                if (errors.projectDescription) setErrors({ ...errors, projectDescription: '' });
              }}
              placeholder="Tell us about the key features, users, integrations (e.g. Stripe/Razorpay, CRM, AI LLMs), and goals for this project..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.projectDescription ? 'border-rose-500' : 'border-slate-800'
              }`}
            />
            {errors.projectDescription && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.projectDescription}</p>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-slate-400">
              🔒 Confidential. We sign mutual NDAs before reviewing sensitive source code.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Submitting Specifications...</span>
              ) : (
                <>
                  <span>Request Itemized Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
