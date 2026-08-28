'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Loader2, ShieldCheck, Sparkles, Building, Mail, User, Clock, FileText } from 'lucide-react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export function ProjectInquiryModal({ isOpen, onClose, initialService }: ProjectInquiryModalProps) {
  if (!isOpen) return null;

  return (
    <ProjectInquiryModalContent
      key={initialService || 'default'}
      onClose={onClose}
      initialService={initialService}
    />
  );
}

function ProjectInquiryModalContent({
  onClose,
  initialService,
}: {
  onClose: () => void;
  initialService?: string;
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectType, setProjectType] = useState(initialService || 'Custom Web Application');
  const [budgetRange, setBudgetRange] = useState('Standard Milestone ($10k - $25k)');
  const [timeline, setTimeline] = useState('Within 1–2 Months');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialService ? [initialService] : []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  const availableServices = [
    'Website Development',
    'Web Application / SaaS',
    'Mobile Application (iOS/Android)',
    'Enterprise System / ERP',
    'AI & Automation (LLM/RAG)',
    'UI/UX & Product Design',
    'E-Commerce Solutions',
    'Digital Consulting & Architecture',
  ];

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      setSelectedServices(selectedServices.filter((s) => s !== svc));
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please provide a valid business email address.');
      return;
    }

    if (!projectDescription.trim() || projectDescription.trim().length < 10) {
      setErrorMessage('Please describe your project or requirements (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          companyName,
          projectType,
          budgetRange,
          timeline,
          projectDescription,
          servicesNeeded: selectedServices.length > 0 ? selectedServices : [projectType],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmittedData(data.data);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setCompanyName('');
    setProjectDescription('');
    setSelectedServices([]);
    setSubmittedData(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div
      id="inquiry-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="inquiry-modal-panel"
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0b1120] border border-slate-700 shadow-2xl p-6 sm:p-10 space-y-6 text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
          aria-label="Close Inquiry Form"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Successful Confirmation View */}
        {submittedData ? (
          <div className="space-y-6 text-center py-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800">
                INQUIRY REFERENCE: {submittedData.inquiryId}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Project Discovery Initiated
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{submittedData.client.fullName}</strong>. Your project brief has been received and routed to BRC STAR&apos;s senior architecture leads.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#070c17] border border-slate-800 text-left text-xs space-y-2.5 max-w-lg mx-auto">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Target Deliverable:</span>
                <span className="font-semibold text-white">{submittedData.project.type}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Contact Email:</span>
                <span className="font-semibold text-blue-400">{submittedData.client.email}</span>
              </div>
              <div className="pt-1 text-slate-300 leading-relaxed">
                <strong className="text-emerald-400 block mb-0.5">Next Step:</strong>
                {submittedData.nextStep}
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={resetForm}
                className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                Done / Back to Website
              </button>
            </div>
          </div>
        ) : (
          /* Intake Form View */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 pr-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BRC STAR Technical Consultation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Start Your Project
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Tell us about your product goals, workflows, and timelines. We&apos;ll assess technical feasibility and respond within 24 hours.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>Business Email *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Company */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  <span>Company / Organization</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Ventures"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Timeline */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Target Launch Timeline</span>
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="Immediate (Next 2–4 Weeks)">Immediate (Next 2–4 Weeks)</option>
                  <option value="Within 1–2 Months">Within 1–2 Months</option>
                  <option value="Quarterly Roadmap (3+ Months)">Quarterly Roadmap (3+ Months)</option>
                  <option value="Discovery / Advisory Only">Discovery / Advisory Only</option>
                </select>
              </div>
            </div>

            {/* Multi-Service Pill Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Services Required (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableServices.map((svc) => {
                  const isSelected = selectedServices.includes(svc);
                  return (
                    <button
                      type="button"
                      key={svc}
                      onClick={() => toggleService(svc)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white border border-blue-400 shadow-sm'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {svc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Project Description & Business Objective *</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Briefly describe what you are building, your users, key workflows, or current technical bottlenecks..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>All information protected under strict mutual NDA confidentiality standards.</span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Technical Intake...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Scope for Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
