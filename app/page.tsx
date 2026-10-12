import type { Metadata } from 'next';
import { HomePageClient } from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'BRC STAR • Full-Stack Digital Technology Partner',
  description:
    'Custom websites, web apps, mobile apps and AI solutions for Indian businesses. Transparent pricing, 100% code ownership.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomePageClient />;
}
