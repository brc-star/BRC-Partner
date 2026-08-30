import { db } from './db';
import { Order, Invoice, PaymentRecord, ProjectInquiryData, Subscription } from '@/types/payment';

export const emailService = {
  /**
   * Order & Payment Success Confirmation Email
   */
  async sendOrderPaymentSuccessEmail(order: Order, payment: PaymentRecord, invoice: Invoice) {
    const formattedDeposit = `₹${order.depositAmountInr.toLocaleString('en-IN')}`;
    const formattedTotal = `₹${order.amountTotalInr.toLocaleString('en-IN')}`;
    const formattedBalance = `₹${order.balanceDueInr.toLocaleString('en-IN')}`;

    const subject = `Payment Confirmed: ${order.orderNumber} • ${order.planName} Kickoff | BRC STAR`;
    const preview = `Your payment of ${formattedDeposit} for ${order.planName} has been verified and confirmed. Order #${order.orderNumber}.`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #060911; color: #f1f5f9; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #0c1324; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; }
    .logo { font-size: 20px; font-weight: 800; color: #60a5fa; letter-spacing: -0.5px; }
    .badge { display: inline-block; background: #065f46; color: #34d399; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; }
    .header { margin-top: 20px; margin-bottom: 24px; }
    .title { font-size: 22px; font-weight: 700; color: #ffffff; margin: 8px 0; }
    .summary-card { background: #070c17; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin: 20px 0; }
    .row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px solid #1e293b; }
    .total-row { display: flex; justify-content: space-between; font-size: 15px; font-weight: 700; color: #60a5fa; padding-top: 10px; }
    .cta-btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: 600; border-radius: 8px; margin: 20px 0; }
    .footer { font-size: 11px; color: #94a3b8; margin-top: 30px; text-align: center; border-top: 1px solid #1e293b; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">BRC STAR PARTNER</div>
    <div class="header">
      <span class="badge">Payment Verified (PAID)</span>
      <h1 class="title">Project Kickoff Confirmed</h1>
      <p style="color: #94a3b8; font-size: 14px; margin: 0;">Hello ${order.customerName}, your deposit payment has been authenticated via Razorpay.</p>
    </div>

    <div class="summary-card">
      <div class="row"><span>Order Number:</span><strong style="color: #ffffff;">${order.orderNumber}</strong></div>
      <div class="row"><span>Invoice Number:</span><strong style="color: #ffffff;">${invoice.invoiceNumber}</strong></div>
      <div class="row"><span>Razorpay Payment ID:</span><strong style="color: #38bdf8; font-family: monospace;">${payment.razorpayPaymentId || 'pay_verified'}</strong></div>
      <div class="row"><span>Selected Plan:</span><strong style="color: #ffffff;">${order.planName}</strong></div>
      <div class="row"><span>Total Project Investment:</span><span>${formattedTotal}</span></div>
      <div class="row"><span>Amount Paid (Deposit):</span><span style="color: #34d399; font-weight: 700;">${formattedDeposit}</span></div>
      <div class="total-row"><span>Remaining Milestone Balance:</span><span>${formattedBalance}</span></div>
    </div>

    <p style="font-size: 13px; color: #cbd5e1; line-height: 1.6;">
      <strong>Next Steps:</strong> Our Lead Systems Architect has been assigned to your project. Your Discovery & Blueprint roadmap is now active in your Client Dashboard.
    </p>

    <div style="text-align: center;">
      <a href="/dashboard?email=${encodeURIComponent(order.customerEmail)}" class="cta-btn">Access Client Dashboard & Milestones</a>
    </div>

    <div class="footer">
      BRC STAR Full-Stack Engineering • contact@brcstar.in • SOC2 &amp; GDPR-Aligned Systems
    </div>
  </div>
</body>
</html>`;

    db.recordEmailNotification({
      recipientEmail: order.customerEmail,
      recipientName: order.customerName,
      subject,
      templateType: 'PAYMENT_RECEIPT',
      contentPreview: preview,
      contentHtml: html,
      status: 'SENT',
      metadata: { orderId: order.id, invoiceId: invoice.id, paymentId: payment.id },
    });
  },

  /**
   * Payment Failure Alert Email
   */
  async sendPaymentFailureEmail(order: Order, errorReason: string) {
    const subject = `Payment Failed: Action Required on ${order.orderNumber} | BRC STAR`;
    const preview = `Your transaction for order #${order.orderNumber} could not be processed: ${errorReason}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: sans-serif; background: #060911; color: #f1f5f9; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #0c1324; border: 1px solid #7f1d1d; border-radius: 16px; padding: 32px; }
    .badge { display: inline-block; background: #7f1d1d; color: #f87171; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; }
    .cta-btn { display: inline-block; background: #ef4444; color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: 600; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div style="font-size: 20px; font-weight: 800; color: #60a5fa;">BRC STAR PARTNER</div>
    <div style="margin-top: 16px;">
      <span class="badge">Payment Declined</span>
      <h1 style="font-size: 20px; margin: 8px 0; color: #ffffff;">Transaction Incomplete</h1>
      <p style="color: #94a3b8; font-size: 14px;">Hello ${order.customerName}, the payment attempt for Order #${order.orderNumber} was unsuccessful.</p>
    </div>
    <div style="background: #180909; border: 1px solid #991b1b; padding: 16px; border-radius: 8px; margin: 16px 0; font-size: 13px; color: #fca5a5;">
      <strong>Reason:</strong> ${errorReason || 'Bank gateway timeout or user cancellation'}
    </div>
    <p style="font-size: 13px; color: #cbd5e1;">Your project draft and configured promo codes have been preserved. You may retry your payment or select another method.</p>
    <a href="/checkout?plan=${order.planId}&email=${encodeURIComponent(order.customerEmail)}" class="cta-btn">Retry Payment Securely</a>
  </div>
</body>
</html>`;

    db.recordEmailNotification({
      recipientEmail: order.customerEmail,
      recipientName: order.customerName,
      subject,
      templateType: 'PAYMENT_FAILED',
      contentPreview: preview,
      contentHtml: html,
      status: 'SENT',
      metadata: { orderId: order.id, errorReason },
    });
  },

  /**
   * Project Inquiry Confirmation Email
   */
  async sendInquiryReceivedEmail(inquiry: ProjectInquiryData) {
    const subject = `Inquiry Acknowledged: ${inquiry.service} | BRC STAR Partner`;
    const preview = `Thank you ${inquiry.name}. Your inquiry for ${inquiry.service} has been received. Our Systems Architect will reply within 24 hours.`;

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; background: #060911; color: #f1f5f9; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #0c1324; border: 1px solid #1e293b; border-radius: 16px; padding: 32px;">
    <div style="font-size: 20px; font-weight: 800; color: #60a5fa;">BRC STAR PARTNER</div>
    <h2 style="color: #ffffff; margin-top: 16px;">Inquiry Received</h2>
    <p style="color: #94a3b8; font-size: 14px;">Hello ${inquiry.name}, thank you for reaching out to BRC STAR.</p>
    <div style="background: #070c17; border: 1px solid #1e293b; padding: 16px; border-radius: 10px; margin: 16px 0; font-size: 13px;">
      <p><strong>Service:</strong> ${inquiry.service}</p>
      <p><strong>Budget Range:</strong> ${inquiry.budgetRange}</p>
      <p><strong>Timeline:</strong> ${inquiry.timeline}</p>
      <p><strong>Requirements:</strong> ${inquiry.requirements}</p>
    </div>
    <p style="font-size: 13px; color: #94a3b8;">Our 24-Hour Guaranteed Architect Review is underway. We will contact you at ${inquiry.email} or ${inquiry.phone}.</p>
  </div>
</body>
</html>`;

    db.recordEmailNotification({
      recipientEmail: inquiry.email,
      recipientName: inquiry.name,
      subject,
      templateType: 'INQUIRY_RECEIVED',
      contentPreview: preview,
      contentHtml: html,
      status: 'SENT',
      metadata: { inquiryId: inquiry.id },
    });
  },

  /**
   * Subscription Renewal Reminder / Invoice Email
   */
  async sendSubscriptionRenewalEmail(sub: Subscription) {
    const subject = `Upcoming AMC Renewal: ${sub.serviceName} | BRC STAR`;
    const preview = `Your maintenance subscription for ${sub.serviceName} (₹${sub.amountInr.toLocaleString('en-IN')}) will renew on ${sub.nextRenewalDate.split('T')[0]}.`;

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; background: #060911; color: #f1f5f9; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #0c1324; border: 1px solid #1e293b; border-radius: 16px; padding: 32px;">
    <div style="font-size: 20px; font-weight: 800; color: #60a5fa;">BRC STAR AMC</div>
    <h2 style="color: #ffffff; margin-top: 16px;">Scheduled Subscription Renewal</h2>
    <p style="color: #94a3b8; font-size: 14px;">Hello ${sub.customerName}, your recurring maintenance agreement is active.</p>
    <div style="background: #070c17; border: 1px solid #1e293b; padding: 16px; border-radius: 10px; margin: 16px 0; font-size: 13px;">
      <p><strong>Service:</strong> ${sub.serviceName}</p>
      <p><strong>Renewal Amount:</strong> ₹${sub.amountInr.toLocaleString('en-IN')} / ${sub.billingCycle.toLowerCase()}</p>
      <p><strong>Scheduled Date:</strong> ${sub.nextRenewalDate.split('T')[0]}</p>
      <p><strong>Grace Period:</strong> ${sub.gracePeriodDays} Days</p>
    </div>
    <a href="/dashboard?email=${encodeURIComponent(sub.customerEmail)}" style="display:inline-block; background:#2563eb; color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; font-size:13px; font-weight:600;">Manage AMC Subscription</a>
  </div>
</body>
</html>`;

    db.recordEmailNotification({
      recipientEmail: sub.customerEmail,
      recipientName: sub.customerName,
      subject,
      templateType: 'RENEWAL_REMINDER',
      contentPreview: preview,
      contentHtml: html,
      status: 'SENT',
      metadata: { subscriptionId: sub.id },
    });
  },
};
