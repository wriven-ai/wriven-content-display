// src/app/error.tsx
// Root error boundary — anything thrown while rendering a page (most commonly
// the Wriven Delivery API being unreachable) lands here instead of a crash
// screen. Content pages re-render on demand, so "Try again" after an outage.

'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-5 py-32 sm:px-8">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        ● 5xx — content temporarily unavailable
      </span>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground">
        The content server didn&apos;t answer.
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        This page is rendered from the Wriven Delivery API, which isn&apos;t
        responding right now. Give it a moment and try again.
      </p>
      <div className="flex items-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Back to the front page</Link>
        </Button>
      </div>
    </div>
  );
}
