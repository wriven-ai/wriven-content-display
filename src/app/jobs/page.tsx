// src/app/jobs/page.tsx
// Open roles — `job_posting` with select fields (department, employment type),
// booleans (remote, featured), and a numeric salary band.

import type { Metadata } from 'next';

import { PageHeader } from '@/components/content/PageHeader';
import { Prose } from '@/components/content/Prose';
import { Reveal } from '@/components/primitives/Reveal';
import { getJobs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Jobs',
  description: 'Open roles, managed entirely in the CMS.',
};

export default async function JobsPage() {
  const jobs = await getJobs();
  const featured = jobs.filter((j) => j.data.featured);
  const rest = jobs.filter((j) => !j.data.featured);

  const Row = ({ job }: { job: (typeof jobs)[number] }) => (
    <Reveal
      as="li"
      className="rounded-xl border border-border bg-background p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
            {job.data.title}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            <span>{job.data.department}</span>
            <span aria-hidden>·</span>
            <span>{job.data.type}</span>
            <span aria-hidden>·</span>
            <span>{job.data.remote ? 'remote' : job.data.location || 'on-site'}</span>
          </div>
        </div>
        <div className="text-right">
          {typeof job.data.salary_min === 'number' &&
          typeof job.data.salary_max === 'number' ? (
            <span className="font-mono text-sm font-semibold text-foreground">
              ${job.data.salary_min.toLocaleString()} – $
              {job.data.salary_max.toLocaleString()}
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-4 max-w-3xl">
        <Prose value={job.data.description} />
      </div>
    </Reveal>
  );

  return (
    <>
      <PageHeader
        eyebrow="careers · job_posting"
        title="Roles, published like content."
        description="Departments and employment types are select fields; remote and featured are booleans; salary is a numeric band — all filterable via the API."
      />

      <div className="mx-auto w-full max-w-6xl space-y-12 px-5 pb-24 sm:px-8">
        {featured.length > 0 ? (
          <section className="space-y-4">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground">
              featured
            </span>
            <ul className="space-y-4">
              {featured.map((j) => (
                <Row key={j.id} job={j} />
              ))}
            </ul>
          </section>
        ) : null}
        {rest.length > 0 ? (
          <section className="space-y-4">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              all roles
            </span>
            <ul className="space-y-4">
              {rest.map((j) => (
                <Row key={j.id} job={j} />
              ))}
            </ul>
          </section>
        ) : null}
        {jobs.length === 0 ? (
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            No published openings.
          </p>
        ) : null}
      </div>
    </>
  );
}
