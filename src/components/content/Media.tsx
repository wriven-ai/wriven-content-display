// src/components/content/Media.tsx
// Renders a resolved Wriven media object with a graceful placeholder —
// the display project currently has few uploaded assets, so most fields
// arrive null and the placeholder keeps layouts intact.

import type { WrivenMedia } from '@wriven-ai/client';

import { cn } from '@/lib/utils';

export function Media({
  media,
  alt,
  className,
  placeholderClassName,
}: {
  media: WrivenMedia | null | undefined;
  alt?: string;
  className?: string;
  placeholderClassName?: string;
}) {
  if (!media?.url) {
    return (
      <div
        aria-hidden
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground/40',
          className,
          placeholderClassName,
        )}
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">
          no image
        </span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media.url}
      alt={media.alt ?? alt ?? ''}
      width={media.width ?? undefined}
      height={media.height ?? undefined}
      loading="lazy"
      className={cn('object-cover', className)}
    />
  );
}
