// src/components/home/Features.tsx
// Static section: what Wriven gives you. Capabilities described in the
// interface's own vocabulary — plain verbs, no selling. Cards reveal on scroll.

import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/primitives/Reveal';

const FEATURES = [
  {
    title: 'Content model',
    body: 'Typed fields — text, number, boolean, date, select, media, richtext, reference. Compose flat, render-friendly types.',
  },
  {
    title: 'Delivery API',
    body: 'Published-only, paginated, with select, filter, sort and reference expansion. One endpoint per content type.',
  },
  {
    title: 'Media, resolved',
    body: 'Media fields arrive as { url, alt, width, height }. Render the CDN url directly — no extra lookup, no asset ids.',
  },
  {
    title: 'Rich text',
    body: 'Bodies are ProseMirror JSON. Inline images hydrate with src and dimensions. Render with one component.',
  },
  {
    title: 'References',
    body: 'Point one entry at another. Expand them inline with include=1..3 and skip the request waterfall.',
  },
  {
    title: 'Read keys',
    body: 'A wrk_live_ key reads published content for one project. Public-safe, revocable, never writes.',
  },
] as const;

export function Features() {
  return (
    <section id="features" className="border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <header className="flex flex-col gap-3">
            <Eyebrow>
              <span className="text-ink">●</span> What you get
            </Eyebrow>
            <h2 className="max-w-2xl font-display text-3xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl">
              A read surface for published content.
            </h2>
          </header>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal
              as="li"
              key={f.title}
              delay={120 + (i % 3) * 80}
              className="flex flex-col gap-2 border-t border-border/70 pt-4"
            >
              <h3 className="font-display text-xl tracking-tight text-foreground">{f.title}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
