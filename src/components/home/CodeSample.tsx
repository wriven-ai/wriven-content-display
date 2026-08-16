// src/components/home/CodeSample.tsx
// Static section: the read loop in three lines. Mono proof block, no syntax
// highlighting dependency — the typeface is the point. Columns reveal on scroll.

import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/primitives/Reveal';

const LINES = [
  { t: 'import', s: ' { wriven } ' },
  { t: 'from', s: " '@/lib/wriven'" },
  { t: '', s: '' },
  { t: 'const', s: ' { items } = ' },
  { t: 'await', s: ' wriven.getEntries(' },
  { t: '', s: "  'blog_post'," },
  { t: '', s: '  { sort: ' },
  { t: '', s: "'-publishedAt', limit: 10, include: 1 }," },
  { t: '', s: ')' },
] as const;

export function CodeSample() {
  return (
    <section id="code" className="scroll-mt-20 border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <Reveal className="flex flex-col gap-4">
            <Eyebrow>
              <span className="text-ink">●</span> The read loop
            </Eyebrow>
            <h2 className="font-display text-3xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl">
              Fetch and render. That is the whole integration.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              The typed client appends the project path and unwraps the envelope. No SDK
              required — the helper is ~50 lines of fetch.
            </p>
          </Reveal>

          <Reveal delay={150} className="relative overflow-hidden border border-border/70 bg-card">
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                src/lib/wriven.ts
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink">
                GET /v1/projects/…/content/…
              </span>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.8rem] leading-relaxed text-foreground sm:text-sm">
              <code>
                {LINES.map((line, i) => (
                  <span key={i} className="block">
                    {line.t ? <span className="text-ink">{line.t}</span> : null}
                    {line.s}
                  </span>
                ))}
              </code>
            </pre>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
