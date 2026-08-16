// src/components/home/HowItWorks.tsx
// Static section: the three-step model that defines Wriven. Numbered because
// order is information here (define → publish → read is a real pipeline).
// Steps reveal in sequence on scroll.

import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/primitives/Reveal';

const STEPS = [
  {
    n: '01',
    title: 'Define',
    body: 'Model content types in the dashboard — text, media, richtext, references. No schema migrations, no server restarts.',
  },
  {
    n: '02',
    title: 'Publish',
    body: 'Author entries and hit publish. Drafts stay hidden; the Delivery API only ever returns published content.',
  },
  {
    n: '03',
    title: 'Read',
    body: 'Fetch over a typed read API. A wrk_live_ key is project-scoped and public-safe — ship it straight in the bundle.',
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <header className="flex flex-col gap-3">
          <Eyebrow>
            <span className="text-ink">●</span> How it works
          </Eyebrow>
          <h2 className="max-w-2xl font-display text-3xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl">
            Author in the dashboard. Read from anywhere.
          </h2>
        </header>
      </Reveal>

      <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal
            as="li"
            key={step.n}
            delay={120 + i * 90}
            className="flex flex-col gap-3 border-t border-border/70 pt-4"
          >
            <span className="font-mono text-sm tracking-tight text-ink">{step.n}</span>
            <h3 className="font-display text-2xl tracking-tight text-foreground">
              {step.title}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
