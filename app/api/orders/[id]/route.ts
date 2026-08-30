import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = db.getOrderById(id) || db.getOrderByNumber(id);

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const invoice = db.getInvoiceByOrderId(order.id);
  const payments = db.getPaymentsByOrderId(order.id);
  const milestones = db.getMilestonesForOrder(order.id);
  const documents = db.getDocumentsForOrder(order.id);

  return NextResponse.json({
    order,
    invoice,
    payments,
    milestones,
    documents,
  });
}
