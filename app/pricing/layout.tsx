import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing: Websites, Apps & AI from ₹29,999',
  description:
    'Transparent starting prices for web development, e-commerce, mobile apps, AI automation and SaaS. Milestone-based billing.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    url: '/pricing',
    title: 'BRC STAR Pricing: Websites, Apps & AI from ₹29,999',
    description:
      'Transparent starting prices for web development, e-commerce, mobile apps, AI automation and SaaS. Milestone-based billing.',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
