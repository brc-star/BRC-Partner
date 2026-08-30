import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || undefined;
  const notifications = db.getAllEmails(email);
  return NextResponse.json({ notifications });
}
