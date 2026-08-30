import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyRazorpayWebhookSignature } from '@/lib/razorpay';
import { emailService } from '@/lib/email-service';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || '';

    // Verify webhook signature
    const isValid = verifyRazorpayWebhookSignature({
      rawBody,
      signature,
    });

    if (!isValid && process.env.RAZORPAY_WEBHOOK_SECRET) {
      console.warn('Invalid Razorpay webhook signature received');
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Malformed JSON payload' }, { status: 400 });
    }

    const event = payload.event;
    console.log(`Razorpay Webhook event received: ${event}`);

    // Handle payment.captured or order.paid
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderEntity = payload.payload?.order?.entity;
      const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
      const razorpayPaymentId = paymentEntity?.id;

      if (razorpayOrderId && razorpayPaymentId) {
        // Find existing order
        const order = db.getOrderByRazorpayOrderId(razorpayOrderId);
        if (order && order.paymentStatus !== 'PAID') {
          if (!db.isPaymentAlreadyProcessed(razorpayPaymentId)) {
            const updatedOrder = db.updateOrderStatus(order.id, 'IN_DEVELOPMENT', 'PAID', razorpayPaymentId);
            if (updatedOrder) {
              const payment = db.recordPayment({
                orderId: order.id,
                customerId: order.customerId,
                amountInr: (paymentEntity?.amount || 0) / 100 || order.depositAmountInr,
                currency: paymentEntity?.currency || 'INR',
                razorpayOrderId,
                razorpayPaymentId,
                status: 'PAID',
                method: paymentEntity?.method || 'webhook_captured',
                vpa: paymentEntity?.vpa,
                bank: paymentEntity?.bank,
                cardLast4: paymentEntity?.card?.last4,
                verifiedAt: new Date().toISOString(),
                rawPayload: payload,
              });

              const invoice = db.generateInvoiceForOrder(updatedOrder, razorpayPaymentId);
              db.getMilestonesForOrder(order.id);
              db.getDocumentsForOrder(order.id);

              await emailService.sendOrderPaymentSuccessEmail(updatedOrder, payment, invoice);
            }
          }
        }
      }
    }

    // Handle payment.failed
    if (event === 'payment.failed') {
      const paymentEntity = payload.payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id;
      const errorDescription = paymentEntity?.error_description || 'Payment authorization failed';

      if (razorpayOrderId) {
        const order = db.getOrderByRazorpayOrderId(razorpayOrderId);
        if (order && order.paymentStatus !== 'PAID') {
          db.updateOrderStatus(order.id, 'PENDING', 'FAILED');
          db.recordPayment({
            orderId: order.id,
            customerId: order.customerId,
            amountInr: (paymentEntity?.amount || 0) / 100 || order.depositAmountInr,
            currency: paymentEntity?.currency || 'INR',
            razorpayOrderId,
            razorpayPaymentId: paymentEntity?.id || 'failed_pmt',
            status: 'FAILED',
            failureReason: errorDescription,
            rawPayload: payload,
          });

          await emailService.sendPaymentFailureEmail(order, errorDescription);
        }
      }
    }

    // Handle subscription events
    if (event === 'subscription.charged') {
      const subscriptionEntity = payload.payload?.subscription?.entity;
      console.log('Subscription renewal processed:', subscriptionEntity?.id);
    }

    return NextResponse.json({ status: 'ok', receivedEvent: event }, { status: 200 });
  } catch (error) {
    console.error('Error handling Razorpay webhook:', error);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
