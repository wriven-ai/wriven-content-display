// src/app/testimonials/page.tsx
// Social proof — `testimonial` entries; rating is a numeric field, featured a
// boolean filterable via filter[featured]=true.

import type { Metadata } from 'next';

import { PageHeader } from '@/components/content/PageHeader';
import { Reveal } from '@/components/primitives/Reveal';
import { getTestimonials } from '@/lib/content/testimonials';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Quotes managed as structured content in Wriven.',
};

export default async function TestimonialsPage() {
  const quotes = await getTestimonials();

  return (
    <>
      <PageHeader
        eyebrow="social proof · testimonial"
        title="Kind words, typed fields."
        description="Quote, author, role, company, and a numeric rating — five plain fields, one API call."
      />

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((t, i) => (
            <li key={t.id}>
              <Reveal
                delay={i * 60}
                className="flex h-full flex-col gap-4 rounded-xl border border-border bg-background p-6"
              >
                <span className="font-mono text-sm tracking-widest text-foreground">
                  {'★'.repeat(Math.max(0, Math.min(5, Number(t.data.rating) || 0)))}
                  <span className="text-border">
                    {'★'.repeat(5 - Math.max(0, Math.min(5, Number(t.data.rating) || 0)))}
                  </span>
                </span>
                <blockquote className="font-display text-lg italic leading-relaxed text-foreground/90">
                  &ldquo;{t.data.quote}&rdquo;
                </blockquote>
                <div className="mt-auto border-t border-border pt-3">
                  <div className="text-sm font-semibold text-foreground">
                    {t.data.author_name}
                  </div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                    {t.data.author_role} · {t.data.company}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
