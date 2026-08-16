// src/components/home/LiveStats.tsx
// A single line of truth, counted from the API: content types and published
// entries in this project, right now. Sits under the marquee band.

import { wriven } from '@/lib/wriven';

const TYPES = [
  'blog_post',
  'product',
  'team_member',
  'case_study',
  'job_posting',
  'testimonial',
  'brand',
  'organization',
] as const;

export async function LiveStats() {
  // One limit-1 read per type; `total` does the counting server-side.
  const counts = await Promise.all(
    TYPES.map(async (t) => {
      const { total } = await wriven.getEntries(t, {
        limit: 1,
        next: { revalidate: 300, tags: [`type_${t}`] },
      });
      return total;
    }),
  );
  const entries = counts.reduce((a, b) => a + b, 0);

  return (
    <p className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-5 py-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground sm:px-8">
      <span className="text-ink">●</span>
      <span>
        {TYPES.length} content types · {entries} published entries · rendering now
      </span>
    </p>
  );
}
