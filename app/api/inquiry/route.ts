import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { emailService } from '@/lib/email-service';

const inquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().default(''),
  companyName: z.string().optional().default(''),
  projectType: z.string().min(1, 'Please select a service'),
  budgetRange: z.string().optional().default('To be estimated'),
  timeline: z.string().optional().default('Standard Agile Cadence'),
  projectDescription: z.string().min(10, 'Project requirements must be at least 10 characters'),
  servicesNeeded: z.array(z.string()).optional().default([]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = inquirySchema.safeParse(body);

    if (!result.success) {
      const errorMsg = result.error.issues[0]?.message || 'Invalid form input.';
      return NextResponse.json({ error: errorMsg, details: result.error.format() }, { status: 400 });
    }

    const { fullName, email, phone, companyName, projectType, budgetRange, timeline, projectDescription } =
      result.data;

    // Create inquiry record in db
    const savedInquiry = db.createInquiry({
      name: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim() || 'Not specified',
      company: companyName.trim() || 'Direct Venture',
      service: projectType,
      budgetRange: budgetRange,
      timeline: timeline,
      requirements: projectDescription.trim(),
    });

    // Create or update customer record
    db.createOrUpdateCustomer({
      name: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim() || 'N/A',
      company: companyName.trim(),
    });

    // Dispatch automated confirmation email
    await emailService.sendInquiryReceivedEmail(savedInquiry);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. Our Lead Systems Architect will review your requirements and respond within 24 business hours.',
      inquiryId: savedInquiry.id,
      data: savedInquiry,
    });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request. Please try again or email contact@brcstar.in.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const inquiries = db.getAllInquiries();
  return NextResponse.json({ inquiries });
}
