// src/lib/content/testimonials.ts
// `testimonial` — flat fields only, no references.

import type { WrivenEntry } from '@wriven-ai/client';

import { cacheTags, wriven } from '@/lib/wriven';
import { REVALIDATE_SECONDS } from '@/lib/content/shared';

export interface TestimonialData {
  quote: string;
  author_name: string;
  author_role: string;
  rating: number;
  company: string;
  featured: boolean;
}
export type Testimonial = WrivenEntry<TestimonialData>;

export async function getTestimonials(): Promise<Testimonial[]> {
  const { items } = await wriven.getEntries<TestimonialData>('testimonial', {
    sort: '-publishedAt',
    limit: 100,
    next: {
      revalidate: REVALIDATE_SECONDS,
      tags: [cacheTags.type('testimonial')],
    },
  });
  return items;
}
