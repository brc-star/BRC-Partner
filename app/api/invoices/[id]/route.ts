import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const invoice = db.getInvoiceById(id);

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  const order = db.getOrderById(invoice.orderId);

  return NextResponse.json({
    invoice,
    order,
    companyDetails: {
      name: 'BRC STAR Technology Partner',
      legalEntity: 'BRC STAR Digital Systems & Solutions',
      gstin: '07AAACB1234F1Z9',
      address: 'Tower 4, Level 9, Cyber City, Gurugram, Haryana, 122002, India',
      email: 'contact@brcstar.in',
      website: 'https://brcpartner.brcstar.in',
    },
  });
}
