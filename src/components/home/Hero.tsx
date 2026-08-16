// src/components/home/Hero.tsx
// The thesis. Eyebrow metadata + a Fraunces variable-font headline that sets
// itself on load (the type-specimen signature), sub-copy, and two CTAs.

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/primitives/Eyebrow';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border/60">
      {/* oversized ghosted wordmark sitting behind the headline */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[34vw] font-semibold leading-none tracking-tight text-foreground/[0.035] sm:text-[26vw] md:text-[20vw]"
      >
        Wriven
      </span>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-24 sm:px-8 sm:py-32 md:py-40">
        <Eyebrow>
          <span className="text-ink">●</span> Wriven — Headless CMS / Delivery API v1
        </Eyebrow>

        <h1 className="specimen-headline max-w-4xl text-balance text-5xl leading-[0.98] tracking-[-0.02em] text-foreground sm:text-7xl md:text-8xl">
          Author it once.
          <br />
          <span className="text-ink">Read it</span> from anywhere.
        </h1>

        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          An AI-native headless CMS. Define content types, publish entries, and read them
          over a typed Delivery API. No auth UI, no writes — just fetch and render.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild size="lg">
            <a href="#how">
              How it works
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/blog">
              <BookOpen className="size-4" />
              Read the live blog
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
