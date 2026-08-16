// src/components/layout/Footer.tsx
// Colophon: mono metadata line + route links to every content section.

import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Products', href: '/products' },
  { label: 'Team', href: '/team' },
  { label: 'Work', href: '/case-studies' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Praise', href: '/testimonials' },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Wriven
            </Link>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              Content, authored once — read from anywhere.
            </span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-border/60 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <span>wriven.display — iss. 01</span>
          <span>Every page on this site is rendered from the Wriven Delivery API</span>
        </div>
      </div>
    </footer>
  );
}
