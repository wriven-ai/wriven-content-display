// src/components/layout/Navbar.tsx
// Sticky proof-sheet masthead: Fraunces wordmark + mono route links + CTA.

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Products', href: '/products' },
  { label: 'Team', href: '/team' },
  { label: 'Work', href: '/case-studies' },
  { label: 'Jobs', href: '/jobs' },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Wriven
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
            display
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button asChild variant="outline" size="sm">
          <Link href="/testimonials">Praise</Link>
        </Button>
      </div>
    </header>
  );
}

