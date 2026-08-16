// src/lib/content/shared.ts
// Cross-cutting helpers used by every content module.

import type { WrivenEntry } from '@wriven-ai/client';

/** Shared revalidation window; webhook tag-purges override it instantly. */
export const REVALIDATE_SECONDS = 300;

export function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Reference fields are raw ids unless `include` expanded them. */
export function isExpanded<TData>(
  ref: WrivenEntry<TData> | string | null | undefined,
): ref is WrivenEntry<TData> {
  return !!ref && typeof ref === 'object';
}

/** Flatten a rich-text value to plain text (card excerpts etc.). */
export function plaintext(value: unknown): string {
  if (!value || typeof value !== 'object') return '';
  const node = value as {
    content?: Array<{ content?: Array<{ text?: string }> }>;
  };
  return (node.content ?? [])
    .map((n) => (n.content ?? []).map((c) => c.text ?? '').join(''))
    .join(' ')
    .trim();
}
