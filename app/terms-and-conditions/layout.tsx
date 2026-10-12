import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and conditions, engineering deliverables governance and intellectual property terms for BRC STAR OPC PRIVATE LIMITED.',
  alternates: { canonical: '/terms-and-conditions' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
