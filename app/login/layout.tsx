import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Login • Secure Portal Access',
  description: 'Client Login and authenticated project portal access for BRC STAR clients.',
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
