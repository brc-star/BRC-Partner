import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Disclaimer',
  description:
    'Legal disclaimers, technological warranties, demonstration limitations and liability boundaries for BRC STAR PARTNER.',
  alternates: { canonical: '/disclaimer' },
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
