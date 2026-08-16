// src/components/content/PageHeader.tsx
// Shared editorial page opener: mono eyebrow, Fraunces headline, standfirst.

import { Reveal } from '@/components/primitives/Reveal';

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mx-auto w-full max-w-6xl px-5 pb-12 pt-20 sm:px-8 sm:pt-28">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </Reveal>
    </header>
  );
}
