import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/pricing', priority: 0.9 },
    { path: '/about', priority: 0.7 },
    { path: '/privacy-policy', priority: 0.3 },
    { path: '/terms-and-conditions', priority: 0.3 },
    { path: '/refund-cancellation-policy', priority: 0.3 },
    { path: '/disclaimer', priority: 0.2 },
    { path: '/cookies-policy', priority: 0.2 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority,
  }));
}
