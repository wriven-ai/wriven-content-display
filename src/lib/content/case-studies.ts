// src/lib/content/case-studies.ts
// `case_study` — the client reference is a union: it may point at a `brand`
// or an `organization` entry; include=1 expands either.

import type { WrivenEntry, WrivenMedia } from '@wriven-ai/client';

import { cacheTags, wriven } from '@/lib/wriven';
import { REVALIDATE_SECONDS } from '@/lib/content/shared';
import type { BrandData } from '@/lib/content/brands';
import type { OrganizationData } from '@/lib/content/organizations';

export interface CaseStudyData {
  title: string;
  client: WrivenEntry<BrandData | OrganizationData> | string | null;
  summary: string;
  body: unknown;
  cover_image: WrivenMedia | null;
  industry: string;
  outcome: string;
}
export type CaseStudy = WrivenEntry<CaseStudyData>;

const TAGS = [cacheTags.type('case_study')];

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const { items } = await wriven.getEntries<CaseStudyData>('case_study', {
    sort: '-publishedAt',
    limit: 100,
    include: 1,
    next: { revalidate: REVALIDATE_SECONDS, tags: TAGS },
  });
  return items;
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    return await wriven.getEntry<CaseStudyData>('case_study', slug, {
      include: 1,
      next: { revalidate: REVALIDATE_SECONDS, tags: TAGS },
    });
  } catch {
    return null;
  }
}
