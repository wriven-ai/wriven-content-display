// src/app/sitemap.ts
// Sitemap generated from live Wriven content — slugs come straight from the
// Delivery API, so new publishes appear in the sitemap automatically.

import type { MetadataRoute } from 'next';

import { getPosts } from '@/lib/content/blog';
import { getCaseStudies } from '@/lib/content/case-studies';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, studies] = await Promise.all([getPosts(), getCaseStudies()]);

  return [
    ...['', '/blog', '/products', '/team', '/case-studies', '/jobs', '/testimonials'].map(
      (path) => ({
        url: `${BASE}${path}`,
        changeFrequency: 'weekly' as const,
        priority: path === '' ? 1 : 0.7,
      }),
    ),
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...studies.map((s) => ({
      url: `${BASE}/case-studies/${s.slug}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
