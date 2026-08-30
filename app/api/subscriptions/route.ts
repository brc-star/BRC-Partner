import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { emailService } from '@/lib/email-service';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || undefined;
  const subscriptions = db.getAllSubscriptions(email);
  return NextResponse.json({ subscriptions });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, subscriptionId } = body;

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
    }

    if (action === 'CANCEL') {
      const updated = db.updateSubscriptionStatus(subscriptionId, 'CANCELLED');
      return NextResponse.json({ success: true, subscription: updated, message: 'Subscription cancelled successfully' });
    }

    if (action === 'RESUME') {
      const updated = db.updateSubscriptionStatus(subscriptionId, 'ACTIVE');
      return NextResponse.json({ success: true, subscription: updated, message: 'Subscription reactivated' });
    }

    if (action === 'TRIGGER_RENEWAL_SIMULATION') {
      const sub = db.getAllSubscriptions().find((s) => s.id === subscriptionId);
      if (sub) {
        await emailService.sendSubscriptionRenewalEmail(sub);
        return NextResponse.json({
          success: true,
          message: `Automated renewal reminder email sent to ${sub.customerEmail}`,
          subscription: sub,
        });
      }
    }

    return NextResponse.json({ error: 'Invalid action requested' }, { status: 400 });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to process subscription action' }, { status: 500 });
  }
}
