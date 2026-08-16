// src/app/case-studies/page.tsx
// Case study index — `case_study` entries, client reference expanded.

import type { Metadata } from 'next';
import Link from 'next/link';

import { Media } from '@/components/content/Media';
import { PageHeader } from '@/components/content/PageHeader';
import { Reveal } from '@/components/primitives/Reveal';
import { getCaseStudies } from '@/lib/content/case-studies';
import { isExpanded } from '@/lib/content/shared';

export const metadata: Metadata = {
  title: 'Case studies',
  description: 'Work stories delivered from Wriven.',
};

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  return (
    <>
      <PageHeader
        eyebrow="proof · case_study"
        title="Work, told structurally."
        description="Each study references a client (brand or organization) and carries industry/outcome as select fields — filterable in any consumer."
      />

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        {studies.length === 0 ? (
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            No published case studies yet.
          </p>
        ) : (
          <ul className="space-y-6">
            {studies.map((s, i) => {
              const client = isExpanded(s.data.client) ? s.data.client : null;
              return (
                <li key={s.id}>
                  <Reveal delay={i * 60}>
                    <Link
                      href={`/case-studies/${s.slug}`}
                      className="group grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-background transition-colors hover:bg-muted/40 sm:grid-cols-[240px_1fr]"
                    >
                      <Media
                        media={s.data.cover_image}
                        className="aspect-[16/10] w-full border-b border-border sm:aspect-auto sm:h-full sm:border-b-0 sm:border-r"
                      />
                      <div className="flex flex-col gap-3 p-6">
                        <div className="flex flex-wrap items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                          <span>{s.data.industry}</span>
                          <span aria-hidden>·</span>
                          <span className="text-foreground">{s.data.outcome}</span>
                          {client ? (
                            <>
                              <span aria-hidden>·</span>
                              <span>{client.data.name}</span>
                            </>
                          ) : null}
                        </div>
                        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground group-hover:underline group-hover:underline-offset-4">
                          {s.data.title}
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {s.data.summary}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
