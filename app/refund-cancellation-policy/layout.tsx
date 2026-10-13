import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description:
    'Refund, milestone cancellation, advance fee governance and commercial dispute terms for BRC STAR PARTNER.',
  alternates: { canonical: '/refund-cancellation-policy' },
};

export default function RefundPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
