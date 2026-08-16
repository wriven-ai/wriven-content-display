// src/components/home/PublishLoop.tsx
// The differentiator story: how a dashboard publish reaches this site without
// a rebuild. Same cache tags at every hop.

import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/primitives/Reveal';

const HOPS = [
  {
    n: '01',
    title: 'Publish in the dashboard',
    body: 'An editor hits publish on an entry. Wriven records the revision and purges its CDN cache tags — proj_…, type_…, entry_….',
  },
  {
    n: '02',
    title: 'Webhook, signed',
    body: 'Wriven POSTs an HMAC-signed webhook to this site. The route (via @wriven-ai/next) verifies signature and timestamp — no CDN in front can forge it.',
  },
  {
    n: '03',
    title: 'revalidateTag',
    body: 'The route purges the same type_… tags this site fetched under. Affected pages regenerate on the next request — no rebuild, no redeploy.',
  },
] as const;

export function PublishLoop() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex flex-col gap-3">
          <Eyebrow>
            <span className="text-ink">●</span> The publish loop
          </Eyebrow>
          <h2 className="max-w-2xl font-display text-3xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl">
            Edit in the dashboard. Refresh here. Done.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            The Delivery API stamps every response with cache tags; this site
            fetches under the same tags and the webhook purges them on publish.
            One key space, three systems, zero staleness.
          </p>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          {HOPS.map((hop, i) => (
            <Reveal
              as="li"
              key={hop.n}
              delay={120 + i * 90}
              className="flex flex-col gap-3 border-t border-border/70 pt-4"
            >
              <span className="font-mono text-sm tracking-tight text-ink">{hop.n}</span>
              <h3 className="font-display text-2xl tracking-tight text-foreground">
                {hop.title}
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {hop.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
