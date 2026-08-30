'use client';

import React from 'react';
import { X, Printer, Download, CheckCircle2, Building2, Mail, Phone, Calendar, Shield } from 'lucide-react';
import { Invoice, Order } from '@/types/payment';

interface InvoiceViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  order?: Order | null;
}

export function InvoiceViewerModal({ isOpen, onClose, invoice, order }: InvoiceViewerModalProps) {
  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const isPaid = invoice.status === 'PAID';

  return (
    <div
      id="invoice-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto print:p-0 print:bg-white"
    >
      <div
        id="invoice-modal-content"
        className="bg-[#0b101d] border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 print:border-0 print:bg-white print:text-black print:shadow-none"
      >
        {/* Modal Top Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#070b14] border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider">
              Official Tax Invoice
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-300 font-mono">{invoice.invoiceNumber}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close invoice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="p-6 sm:p-10 space-y-8 bg-[#0b101d] text-slate-200 print:bg-white print:text-black print:p-8">
          {/* Header & Company Brand */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-slate-800 print:border-slate-300">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  ★
                </div>
                <span className="text-xl font-extrabold text-white print:text-black tracking-tight">
                  BRC STAR PARTNER
                </span>
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1 font-mono">
                Full-Stack Systems &amp; Software Engineering
              </p>
              <div className="text-[11px] text-slate-400 print:text-slate-600 mt-2 space-y-0.5">
                <p>BRC STAR Digital Systems India Pvt. Ltd.</p>
                <p>DLF Cyber City, Tower 4, Level 9, Gurugram, India</p>
                <p className="font-mono">GSTIN: 07AAACB1234F1Z9</p>
                <p>contact@brcstar.in • https://brcpartner.brcstar.in</p>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono border bg-emerald-950/80 text-emerald-300 border-emerald-700/60 print:border-emerald-600 print:text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 print:text-emerald-600" />
                <span>{isPaid ? 'PAID & AUTHENTICATED' : 'PAYMENT DUE'}</span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-slate-400 print:text-slate-600">
                  Invoice #: <strong className="text-white print:text-black font-mono">{invoice.invoiceNumber}</strong>
                </p>
                <p className="text-slate-400 print:text-slate-600">
                  Issue Date: <strong className="text-white print:text-black">{invoice.issueDate}</strong>
                </p>
                {invoice.paidDate && (
                  <p className="text-slate-400 print:text-slate-600">
                    Paid Date: <strong className="text-emerald-400 print:text-emerald-700">{invoice.paidDate.split('T')[0]}</strong>
                  </p>
                )}
                {invoice.razorpayPaymentId && (
                  <p className="text-slate-400 print:text-slate-600">
                    Razorpay ID: <strong className="text-blue-400 print:text-blue-700 font-mono">{invoice.razorpayPaymentId}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bill To Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-[#070c17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                Billed To Client:
              </span>
              <h4 className="text-sm font-bold text-white print:text-black mt-1">{invoice.customerName}</h4>
              {invoice.customerCompany && (
                <p className="text-xs font-medium text-slate-300 print:text-slate-700">{invoice.customerCompany}</p>
              )}
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1">{invoice.customerEmail}</p>
              <p className="text-xs text-slate-400 print:text-slate-600">{invoice.customerPhone}</p>
              {invoice.customerGstin && (
                <p className="text-xs text-slate-400 print:text-slate-600 font-mono mt-0.5">
                  Client GSTIN: {invoice.customerGstin}
                </p>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                Project Reference:
              </span>
              <p className="text-xs font-bold text-white print:text-black mt-1">
                {order ? order.planName : 'Full-Stack Software Development'}
              </p>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-0.5">
                Order Reference: <span className="font-mono text-slate-300 print:text-slate-800">{order?.orderNumber || invoice.orderId}</span>
              </p>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Payment Terms: <span className="text-slate-300 print:text-slate-800">50% Kickoff Deposit / 50% Handover Milestone</span>
              </p>
              <p className="text-xs text-emerald-400 print:text-emerald-700 font-semibold mt-1">
                IP Ownership: 100% Assigned to Client Upon Handover
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 print:border-slate-300 text-slate-400 print:text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-2">Description</th>
                  <th className="py-3 px-2 text-center">Qty</th>
                  <th className="py-3 px-2 text-right">Unit Price</th>
                  <th className="py-3 px-2 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
                {invoice.items.map((item, index) => (
                  <tr key={index} className="text-slate-200 print:text-black">
                    <td className="py-3 px-2 font-medium">
                      {item.description}
                      <span className="block text-[11px] text-slate-400 print:text-slate-600 font-normal">
                        Includes dedicated sprint architecture, CI/CD pipeline, and 30-day warranty.
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center font-mono">{item.quantity}</td>
                    <td className="py-3 px-2 text-right font-mono">₹{item.unitPriceInr.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-2 text-right font-mono font-semibold">
                      ₹{item.amountInr.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Math */}
          <div className="flex justify-end pt-4 border-t border-slate-800 print:border-slate-300">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400 print:text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono text-white print:text-black">₹{invoice.subtotalInr.toLocaleString('en-IN')}</span>
              </div>

              {invoice.discountInr > 0 && (
                <div className="flex justify-between text-emerald-400 print:text-emerald-700">
                  <span>Coupon Discount Applied:</span>
                  <span className="font-mono">-₹{invoice.discountInr.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400 print:text-slate-600">
                <span>Integrated GST (18%):</span>
                <span className="font-mono text-white print:text-black">₹{invoice.taxAmountInr.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between py-2 border-y border-slate-800 print:border-slate-300 text-sm font-bold">
                <span className="text-white print:text-black">Total Project Investment:</span>
                <span className="font-mono text-blue-400 print:text-blue-700">₹{invoice.totalAmountInr.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-emerald-400 print:text-emerald-700 font-semibold">
                <span>Amount Paid (Receipt):</span>
                <span className="font-mono">₹{invoice.amountPaidInr.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-slate-400 print:text-slate-600">
                <span>Balance Due at Milestone Handover:</span>
                <span className="font-mono text-slate-200 print:text-slate-800 font-semibold">
                  ₹{invoice.amountDueInr.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Terms & Security Note */}
          <div className="pt-6 border-t border-slate-800 print:border-slate-300 text-[11px] text-slate-400 print:text-slate-600 space-y-1">
            <p className="font-semibold text-slate-300 print:text-slate-800">
              Payment &amp; Delivery Terms:
            </p>
            <p>
              This is a computer-generated tax invoice verified via Razorpay digital gateway. All software deliverables and source code remain covered under BRC STAR engineering warranty as formalized in the Statement of Work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
