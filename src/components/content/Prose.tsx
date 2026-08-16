// src/components/content/Prose.tsx
// Typographic wrapper around <WrivenRichText> so richtext bodies read like
// set editorial columns, not browser defaults.

import { WrivenRichText } from '@wriven-ai/react';

export function Prose({ value }: { value: unknown }) {
  return (
    <div className="space-y-5 text-[0.95rem] leading-relaxed text-foreground/90 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:pt-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_hr]:border-border [&_img]:rounded-lg [&_li]:ml-5 [&_li]:list-disc [&_ol>li]:list-decimal [&_p]:text-foreground/80 [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[0.8rem] [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4">
      <WrivenRichText value={value} />
    </div>
  );
}
