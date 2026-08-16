// src/components/home/CtaBand.tsx
// Static closing CTA — the brand promise, anchored to the sections above.

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/primitives/Reveal';

export default function CtaBand() {
  return (
    <section id="start" className="scroll-mt-20 border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>
            <span className="text-ink">●</span> The short version
          </Eyebrow>
          <h2 className="specimen-headline max-w-3xl text-balance text-4xl leading-[1.02] tracking-[-0.02em] text-foreground sm:text-6xl">
            Define a content type. Publish an entry. Read it here.
          </h2>
          <p className="max-w-xl text-base text-muted-foreground">
            Wriven is an AI-native headless CMS — author in the dashboard, read over a
            typed Delivery API. Every page beyond this one is rendered from live
            published content.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg">
              <Link href="/blog">
                Read it here
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#code">See the code</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
