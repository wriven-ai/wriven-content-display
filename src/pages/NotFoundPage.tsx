// src/pages/NotFoundPage.tsx
// A missing route is an invitation back to known ground.

import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-start gap-5 px-5 py-28 sm:px-8 sm:py-36">
      <Eyebrow>
        <span className="text-ink">●</span> 404 / not found
      </Eyebrow>
      <h1 className="font-display text-4xl leading-[1.02] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl">
        Nothing published here.
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        That route has no entry. Head back to the homepage or browse the catalogue.
      </p>
      <Button asChild size="lg" className="mt-2">
        <Link to="/">
          <ArrowLeft className="size-4" />
          Back home
        </Link>
      </Button>
    </section>
  );
}
