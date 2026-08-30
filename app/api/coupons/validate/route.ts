import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const couponValidationSchema = z.object({
  code: z.string().min(1, 'Coupon code cannot be empty'),
  orderAmount: z.number().positive('Order amount must be greater than zero'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = couponValidationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message || 'Invalid input' }, { status: 400 });
    }

    const { code, orderAmount } = result.data;
    const validation = db.validateCoupon(code, orderAmount);

    if (!validation.valid) {
      return NextResponse.json(
        {
          valid: false,
          error: validation.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      code: validation.coupon?.code,
      discountType: validation.coupon?.discountType,
      discountValue: validation.coupon?.discountValue,
      discountInr: validation.discountInr,
      message: validation.message,
      description: validation.coupon?.description,
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json({ error: 'Failed to validate coupon code.' }, { status: 500 });
  }
}
