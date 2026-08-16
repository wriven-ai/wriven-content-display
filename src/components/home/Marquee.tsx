// src/components/home/Marquee.tsx
// Ambient specimen strip: Wriven field/api tokens scrolling as a proof-sheet
// band. Decorative (aria-hidden) — the motion is the point, not the content.

const TOKENS = [
  'blog_post',
  'product',
  'team_member',
  'media',
  'richtext',
  'reference',
  'select',
  'publishedAt',
  'wrk_live_…',
] as const;

export function Marquee() {
  const loop = [...TOKENS, ...TOKENS];
  return (
    <div aria-hidden className="overflow-hidden border-y border-border/60 bg-background py-3">
      <div className="marquee-track flex w-max items-center">
        {loop.map((token, i) => (
          <span
            key={i}
            className="flex items-center gap-6 whitespace-nowrap px-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            {token}
            <span className="text-ink">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
