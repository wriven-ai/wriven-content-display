// src/app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-5 py-32 sm:px-8">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        404 — not found
      </span>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground">
        This page didn&apos;t make it to press.
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        The content you&apos;re looking for was never published, was unpublished,
        or the URL mistyped itself.
      </p>
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-[0.18em] text-foreground underline-offset-4 hover:underline"
      >
        ← Back to the front page
      </Link>
    </div>
  );
}
