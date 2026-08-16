# 08 — Next.js build, deploy & live revalidation

This app is a **Next.js 16 App Router** project (TypeScript, Tailwind v4,
`src/` dir, `@/*` alias). Everything about building, deploying, and — the
particular trick — keeping content fresh via Wriven webhooks.

## Commands

```bash
pnpm dev        # dev server (http://localhost:3000)
pnpm build      # production build — SSGs every published slug
pnpm start      # serve the production build
pnpm lint       # eslint
```

`pnpm build` runs `generateStaticParams` against the live Delivery API, so the
static page list **is** the published content:

```
● /blog/[slug]           ← 4 posts, prerendered
● /case-studies/[slug]   ← 2 studies, prerendered
ƒ /api/wriven            ← webhook route, dynamic
○ everything else        ← static with ISR revalidate
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx               # Navbar + Footer shell, metadata
│   ├── page.tsx                 # static landing sections
│   ├── blog/  [slug]/page.tsx   # index + SSG detail (include: 2)
│   ├── products/  team/
│   ├── case-studies/  [slug]/
│   ├── jobs/  testimonials/
│   ├── sitemap.ts               # generated from live slugs
│   ├── not-found.tsx
│   └── api/wriven/route.ts      # webhook → revalidateTag
├── lib/
│   ├── wriven.ts                # server-only SDK client + cacheTags
│   └── content/                 # one module per content type
│       ├── blog.ts  products.ts  team.ts  case-studies.ts
│       ├── jobs.ts  testimonials.ts
│       ├── organizations.ts  brands.ts    # type-only (referenced)
│       └── shared.ts            # formatDate, isExpanded, plaintext
└── components/
    ├── content/                 # Media, Prose, PageHeader
    ├── home/  layout/  primitives/  ui/
```

## Deploying (Vercel)

1. Push the repo; import into Vercel (framework auto-detects Next.js).
2. Set environment variables (Production + Preview):
   - `WRIVEN_BASE_URL` — `https://api.wriven.tech`
   - `WRIVEN_PROJECT_ID`
   - `WRIVEN_TOKEN` — `wrk_live_…` read key
   - `WRIVEN_WEBHOOK_SECRET` — created in the next step
   - `NEXT_PUBLIC_SITE_URL` — the deployed origin (sitemap URLs)
3. Deploy.

Any Node host works too: `pnpm build && pnpm start` behind a reverse proxy.

## Live revalidation — the publish → update loop

This is the showcase flow. Three pieces align on the **same cache tags**:

1. **Delivery API** responses carry `Cache-Tag: proj_… type_… entry_…` — a CDN
   can purge by these on publish.
2. **This app's fetches** pass `next: { revalidate: 300, tags: [type_blog_post] }`
   — ISR caches pages under the same keys.
3. **The webhook route** (built with `@wriven-ai/next`):

```ts
// src/app/api/wriven/route.ts
import { createWebhookRoute } from '@wriven-ai/next';
import { cacheTags } from '@/lib/wriven';

export const { POST } = createWebhookRoute({
  secret: process.env.WRIVEN_WEBHOOK_SECRET ?? '',
  revalidate: (payload) => ({
    tags: [cacheTags.type(payload.entry.type), cacheTags.project],
  }),
});
```

Register it once: **Wriven dashboard → project → Settings → Webhooks → Add**,
URL `https://<your-domain>/api/wriven`, events publish/unpublish/delete. Copy
the generated signing secret into `WRIVEN_WEBHOOK_SECRET` and redeploy.

From then on: edit an entry in the dashboard → hit **Publish** → Wriven POSTs a
signed webhook → the route verifies the HMAC + timestamp and calls
`revalidateTag` → the affected pages rebuild on next request. **No rebuild, no
redeploy, no stale content.**

## SEO notes

- Every slug page exports `generateMetadata` (title/description from fields).
- `/sitemap.xml` is generated from live `blog_post` + `case_study` slugs —
  new publishes appear automatically.
- Rich-text bodies render as real HTML elements (headings, links, lists), not
  client-side JSON.

Next: [09-troubleshooting.md](./09-troubleshooting.md).
