// src/components/primitives/Eyebrow.tsx
// Monospace small-caps label — the proof-sheet eyebrow above headings.

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  );
}
