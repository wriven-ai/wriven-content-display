// src/components/states/Loading.tsx
// Skeleton in the proof-sheet system: dotted track + shimmering rule.

import { cn } from '@/lib/utils';

interface LoadingProps {
  label?: string;
  className?: string;
}

export function Loading({ label = 'Loading', className }: LoadingProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)} aria-busy="true" role="status">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
        <span className="animate-pulse text-ink"> ●</span>
      </span>
      <div className="h-px w-full proof-rule" />
      <div className="h-px w-2/3 proof-rule opacity-50" />
      <div className="h-px w-1/2 proof-rule opacity-30" />
    </div>
  );
}
