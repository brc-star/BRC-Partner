import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { verifyRazorpayPaymentSignature } from '@/lib/razorpay';
import { emailService } from '@/lib/email-service';

const verifyPaymentSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  razorpayOrderId: z.string().min(1, 'Razorpay Order ID is required'),
  razorpayPaymentId: z.string().min(1, 'Razorpay Payment ID is required'),
  razorpaySignature: z.string().min(1, 'Razorpay Signature is required'),
  paymentMethod: z.string().optional().default('Razorpay Gateway'),
  methodDetails: z
    .object({
      cardLast4: z.string().optional(),
      bank: z.string().optional(),
      vpa: z.string().optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = verifyPaymentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message || 'Invalid verification payload' }, { status: 400 });
    }

    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentMethod, methodDetails } =
      result.data;

    // 1. Check if order exists
    const order = db.getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order record was not found in our database.' }, { status: 404 });
    }

    // 2. Duplicate Payment Protection
    if (db.isPaymentAlreadyProcessed(razorpayPaymentId)) {
      return NextResponse.json(
        {
          error: 'Duplicate payment detected. This transaction has already been verified and processed.',
          orderId: order.id,
          orderNumber: order.orderNumber,
        },
        { status: 409 }
      );
    }

    // 3. Cryptographic Signature Verification
    const verification = verifyRazorpayPaymentSignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!verification.isValid) {
      // Record failed payment attempt
      db.recordPayment({
        orderId: order.id,
        customerId: order.customerId,
        amountInr: order.depositAmountInr,
        currency: 'INR',
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        status: 'FAILED',
        failureReason: verification.error || 'Cryptographic HMAC signature mismatch',
      });

      db.updateOrderStatus(order.id, 'PENDING', 'FAILED');

      // Dispatch failure email alert
      await emailService.sendPaymentFailureEmail(order, verification.error || 'Cryptographic verification failure');

      return NextResponse.json(
        {
          success: false,
          error: verification.error || 'Payment signature verification failed. Untrusted payload.',
        },
        { status: 400 }
      );
    }

    // 4. Update Order State to PAID & IN_DEVELOPMENT
    const updatedOrder = db.updateOrderStatus(order.id, 'IN_DEVELOPMENT', 'PAID', razorpayPaymentId);
    if (!updatedOrder) {
      return NextResponse.json({ error: 'Failed to update order state.' }, { status: 500 });
    }

    // 5. Record verified payment
    const payment = db.recordPayment({
      orderId: order.id,
      customerId: order.customerId,
      amountInr: order.depositAmountInr,
      currency: 'INR',
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      status: 'PAID',
      method: paymentMethod,
      vpa: methodDetails?.vpa,
      bank: methodDetails?.bank,
      cardLast4: methodDetails?.cardLast4,
      verifiedAt: new Date().toISOString(),
    });

    // 6. Generate Formal GST Tax Invoice
    const invoice = db.generateInvoiceForOrder(updatedOrder, razorpayPaymentId);

    // 7. Initialize Project Milestones & SOW Documents
    const milestones = db.getMilestonesForOrder(order.id);
    const documents = db.getDocumentsForOrder(order.id);

    // 8. If coupon was applied, increment usage count
    if (order.couponCode) {
      db.incrementCouponUsage(order.couponCode);
    }

    // 9. If recurring AMC plan, create active Subscription in DB
    if (order.billingType === 'MONTHLY' || order.billingType === 'YEARLY') {
      const now = new Date();
      const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      db.createSubscription({
        customerId: order.customerId,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        planId: order.planId,
        serviceName: order.planName,
        billingCycle: order.billingType,
        amountInr: order.amountTotalInr,
        currency: 'INR',
        status: 'ACTIVE',
        currentPeriodStart: now.toISOString(),
        currentPeriodEnd: nextMonth.toISOString(),
        nextRenewalDate: nextMonth.toISOString(),
        autoRenew: true,
        gracePeriodDays: 5,
        lastPaymentDate: now.toISOString(),
        lastRazorpayPaymentId: razorpayPaymentId,
      });
    }

    // 10. Dispatch Transactional Order Confirmation & Invoice Email
    await emailService.sendOrderPaymentSuccessEmail(updatedOrder, payment, invoice);

    return NextResponse.json({
      success: true,
      message: 'Payment verified and project roadmap initialized successfully.',
      order: updatedOrder,
      payment,
      invoice,
      milestones,
      documents,
      clientDashboardUrl: `/dashboard?email=${encodeURIComponent(updatedOrder.customerEmail)}`,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while verifying payment.' },
      { status: 500 }
    );
  }
}
