// src/components/layout/Navbar.tsx
// Sticky proof-sheet masthead: Fraunces wordmark + mono anchor links + CTA.
// Single-page landing — links scroll to home sections.

import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'How', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'Code', href: '#code' },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Wriven
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
            display
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button asChild variant="outline" size="sm">
          <a href="#start">
            Get started
            <ArrowUpRight className="size-3.5" />
          </a>
        </Button>
      </div>
    </header>
  );
}
