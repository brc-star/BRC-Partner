import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { CORE_PRICING_PLANS, RECURRING_AMC_PLANS } from '@/lib/pricing-data';
import { getRazorpayClient } from '@/lib/razorpay';

const createOrderSchema = z.object({
  planId: z.string().min(1, 'Please select a plan'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid business email'),
  phone: z.string().min(7, 'Please enter a valid phone number with country code'),
  company: z.string().optional().default(''),
  couponCode: z.string().optional().default(''),
  paymentOption: z.enum(['deposit', 'full']).default('deposit'),
  projectRequirements: z.string().min(10, 'Project requirements must be at least 10 characters'),
  timeline: z.string().optional().default('Standard Agile Schedule'),
  clientNotes: z.string().optional().default(''),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createOrderSchema.safeParse(body);

    if (!result.success) {
      const errorMsg = result.error.issues[0]?.message || 'Invalid input data';
      return NextResponse.json({ error: errorMsg, validationErrors: result.error.format() }, { status: 400 });
    }

    const {
      planId,
      name,
      email,
      phone,
      company,
      couponCode,
      paymentOption,
      projectRequirements,
      timeline,
      clientNotes,
    } = result.data;

    // Find the requested plan
    const allPlans = [...CORE_PRICING_PLANS, ...RECURRING_AMC_PLANS];
    const plan = allPlans.find((p) => p.id === planId || p.slug === planId);

    if (!plan) {
      return NextResponse.json({ error: 'Selected plan was not found in our catalog.' }, { status: 404 });
    }

    const baseAmountInr = plan.startingPriceInr;
    let discountInr = 0;
    let appliedCoupon: string | undefined = undefined;

    // Validate and calculate coupon discount
    if (couponCode && couponCode.trim()) {
      const couponCheck = db.validateCoupon(couponCode, baseAmountInr);
      if (couponCheck.valid) {
        discountInr = couponCheck.discountInr;
        appliedCoupon = couponCheck.coupon?.code;
      }
    }

    const discountedBaseInr = Math.max(1000, baseAmountInr - discountInr);
    // 18% GST calculation
    const taxGstInr = Math.round(discountedBaseInr * 0.18 * 100) / 100;
    const amountTotalInr = Math.round((discountedBaseInr + taxGstInr) * 100) / 100;

    // Determine deposit vs full payment
    const depositPct = paymentOption === 'full' ? 100 : plan.depositPercentage;
    const payableAmountInr = Math.round((amountTotalInr * (depositPct / 100)) * 100) / 100;
    const balanceDueInr = Math.max(0, Math.round((amountTotalInr - payableAmountInr) * 100) / 100);

    // Create or update customer record
    const customer = db.createOrUpdateCustomer({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      company: company ? company.trim() : undefined,
    });

    // Create preliminary Order in database with PENDING state
    const order = db.createOrder({
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerCompany: customer.company,
      planId: plan.id,
      planName: plan.name,
      serviceCategory: plan.category,
      billingType: plan.billingType,
      amountBaseInr: baseAmountInr,
      couponCode: appliedCoupon,
      discountInr,
      taxGstInr,
      amountTotalInr,
      depositPercentage: depositPct,
      depositAmountInr: payableAmountInr,
      balanceDueInr,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      paymentMethod: 'Razorpay',
      projectRequirements,
      timeline,
      clientNotes,
    });

    // Attempt Razorpay order creation via SDK
    let razorpayOrderId = `order_BRC_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const payablePaise = Math.round(payableAmountInr * 100);
    const razorpay = getRazorpayClient();

    if (razorpay) {
      try {
        const rzpOrder = await razorpay.orders.create({
          amount: payablePaise,
          currency: 'INR',
          receipt: order.orderNumber,
          notes: {
            orderId: order.id,
            orderNumber: order.orderNumber,
            planName: plan.name,
            customerEmail: customer.email,
          },
        });
        if (rzpOrder && rzpOrder.id) {
          razorpayOrderId = rzpOrder.id;
        }
      } catch (rzpErr) {
        console.warn('Razorpay SDK order creation warning, falling back to simulated order ID:', rzpErr);
      }
    }

    // Update order with the razorpayOrderId
    order.razorpayOrderId = razorpayOrderId;

    // Return order details for Razorpay checkout handler
    const clientKeyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      'rzp_test_BRC_STAR_SANDBOX';

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      razorpayOrderId,
      amountInr: payableAmountInr,
      amountPaise: payablePaise,
      amountTotalInr,
      discountInr,
      taxGstInr,
      depositPercentage: depositPct,
      balanceDueInr,
      currency: 'INR',
      keyId: clientKeyId,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        company: customer.company,
      },
      plan: {
        id: plan.id,
        name: plan.name,
        category: plan.category,
      },
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to initiate secure payment session. Please try again.' },
      { status: 500 }
    );
  }
}
