// src/app/case-studies/[slug]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Media } from '@/components/content/Media';
import { PageHeader } from '@/components/content/PageHeader';
import { Prose } from '@/components/content/Prose';
import { Reveal } from '@/components/primitives/Reveal';
import { getCaseStudy, getCaseStudies } from '@/lib/content/case-studies';
import { isExpanded } from '@/lib/content/shared';

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: 'Not found' };
  return { title: study.data.title, description: study.data.summary };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const client = isExpanded(study.data.client) ? study.data.client : null;

  return (
    <>
      <PageHeader
        eyebrow={`case study · ${study.data.industry} · ${study.data.outcome}`}
        title={study.data.title}
        description={study.data.summary}
      />

      <div className="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-8">
        {study.data.cover_image ? (
          <Reveal className="mb-10">
            <Media
              media={study.data.cover_image}
              className="aspect-[16/8] w-full rounded-xl border border-border"
            />
          </Reveal>
        ) : null}

        {client ? (
          <Reveal className="mb-10 flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-5">
            <Media
              media={client.data.logo}
              className="size-12 shrink-0 rounded-lg border border-border bg-background"
            />
            <div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                client · {client.type}
              </div>
              <div className="font-display text-lg font-semibold text-foreground">
                {client.data.name}
              </div>
              {client.data.tagline ? (
                <div className="text-sm text-muted-foreground">
                  {client.data.tagline}
                </div>
              ) : null}
            </div>
          </Reveal>
        ) : null}

        <Reveal>
          <Prose value={study.data.body} />
        </Reveal>
      </div>
    </>
  );
}
