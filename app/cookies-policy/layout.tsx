import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies Policy',
  description:
    'Cookies Policy and local browser storage transparency for BRC STAR OPC PRIVATE LIMITED.',
  alternates: { canonical: '/cookies-policy' },
};

export default function CookiesPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
