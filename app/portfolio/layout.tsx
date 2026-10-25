import type { Metadata } from 'next';
import { SITE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Live Projects Portfolio • Production Deployments & Case Studies | BRC STAR Partner',
  description:
    'Explore 7 live production deployments engineered by BRC STAR Partner across Healthcare, SaaS, Enterprise IT, AI & FinTech, Textile B2B, and Business Advisory.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Live Projects Portfolio • Production Deployments | BRC STAR Partner',
    description:
      'Explore 7 live production deployments engineered by BRC STAR Partner across Healthcare, SaaS, Enterprise IT, AI & FinTech, Textile B2B, and Business Advisory.',
    url: `${SITE.url}/portfolio`,
    siteName: SITE.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Projects Portfolio • BRC STAR Partner',
    description:
      'Explore live production deployments engineered by BRC STAR Partner across Healthcare, SaaS, Enterprise IT, AI & FinTech, and B2B platforms.',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
