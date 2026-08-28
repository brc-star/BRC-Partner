import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      companyName,
      projectType,
      budgetRange,
      timeline,
      projectDescription,
      servicesNeeded,
    } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { error: 'Please provide a valid business email address.' },
        { status: 400 }
      );
    }

    if (!projectDescription || typeof projectDescription !== 'string' || projectDescription.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a brief project description (at least 10 characters).' },
        { status: 400 }
      );
    }

    // In a production setup, this would dispatch to a CRM/Slack/Email notification webhook.
    const inquiryId = `BRC-${Date.now().toString(36).toUpperCase()}`;
    const receivedAt = new Date().toISOString();

    const simulatedAssessment = {
      inquiryId,
      receivedAt,
      client: {
        fullName: fullName.trim(),
        email: email.trim(),
        companyName: companyName ? companyName.trim() : 'Private Venture / Direct',
      },
      project: {
        type: projectType || 'Custom Technology Project',
        budget: budgetRange || 'To be discussed during discovery',
        timeline: timeline || 'Standard Agile Schedule',
        services: servicesNeeded || [],
        description: projectDescription.trim(),
      },
      nextStep: 'A senior technical architect from BRC STAR will review your requirements and respond within 24 business hours to coordinate an initial discovery consultation.',
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received successfully. Our engineering leadership will contact you shortly.',
        data: simulatedAssessment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request. Please try again or email contact@brcstar.com directly.' },
      { status: 500 }
    );
  }
}
