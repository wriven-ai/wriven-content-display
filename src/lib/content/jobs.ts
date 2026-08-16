// src/lib/content/jobs.ts
// `job_posting` — select fields (department, type), booleans (remote,
// featured), numeric salary band; no references.

import type { WrivenEntry } from '@wriven-ai/client';

import { cacheTags, wriven } from '@/lib/wriven';
import { REVALIDATE_SECONDS } from '@/lib/content/shared';

export interface JobPostingData {
  title: string;
  department: string;
  location: string;
  type: string;
  description: unknown;
  salary_min: number;
  salary_max: number;
  remote: boolean;
  featured: boolean;
}
export type JobPosting = WrivenEntry<JobPostingData>;

export async function getJobs(): Promise<JobPosting[]> {
  const { items } = await wriven.getEntries<JobPostingData>('job_posting', {
    sort: '-publishedAt',
    limit: 100,
    next: {
      revalidate: REVALIDATE_SECONDS,
      tags: [cacheTags.type('job_posting')],
    },
  });
  return items;
}
