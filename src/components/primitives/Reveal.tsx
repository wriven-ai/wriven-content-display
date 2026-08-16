// src/components/primitives/Reveal.tsx
// Scroll-triggered reveal: fade + lift + de-blur when an element enters the
// viewport, fires once. Polymorphic (`as`) so it can stand in for <li>, <section>,
// etc. without breaking list/semantics. Reduced-motion users see content
// immediately via Tailwind's motion-reduce variant — no JS branch required.

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Element type to render (default 'div'). */
  as?: ElementType;
}

export function Reveal({ children, className, delay = 0, as, ...rest }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform',
        'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none',
        shown
          ? 'translate-y-0 opacity-100 blur-0'
          : 'translate-y-4 opacity-0 blur-[2px]',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
