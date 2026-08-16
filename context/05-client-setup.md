# 05 — Client setup (the "install Wriven npm" step)

## The official SDK (recommended)

Wriven's SDK is **published on npm**:

| Package | What it does |
|---------|--------------|
| `@wriven-ai/client` | `createClient()`, `getEntry()`, `getEntries()`, `getAllEntries()`, `iterateEntries()` — typed, isomorphic, zero-dep |
| `@wriven-ai/react` | `<WrivenRichText>` renderer for rich-text fields |
| `@wriven-ai/next` | Next.js webhook route + signature verification + ISR revalidation |

```bash
pnpm add @wriven-ai/client           # core
pnpm add @wriven-ai/react            # rich-text renderer
pnpm add @wriven-ai/next             # webhook → revalidate (server only)
```

## Where the client lives in a Next.js App Router app

**Server only.** Create `src/lib/wriven.ts` — a single client instance used by
React Server Components. The delivery token never reaches the browser bundle:

```ts
// src/lib/wriven.ts
import { createClient } from '@wriven-ai/client';

const baseUrl = process.env.WRIVEN_BASE_URL ?? 'https://api.wriven.tech';
const projectId = process.env.WRIVEN_PROJECT_ID ?? '';
const token = process.env.WRIVEN_TOKEN ?? '';

if (!projectId || !token) {
  throw new Error('Missing WRIVEN_PROJECT_ID / WRIVEN_TOKEN — set them in .env.local');
}

export const wriven = createClient({ baseUrl, projectId, token });

/**
 * Cache tags mirroring the Delivery API's own `Cache-Tag` response headers
 * (`proj_… type_… entry_…`). The webhook route revalidates these exact tags,
 * so a publish in the dashboard invalidates ISR with the same keys the CDN uses.
 */
export const cacheTags = {
  project: `proj_${projectId}`,
  type: (apiId: string) => `type_${apiId}`,
  entry: (id: string) => `entry_${id}`,
};
```

## Env config (server-side — no `NEXT_PUBLIC_` prefix)

`.env.local` (git-ignored):

```bash
WRIVEN_BASE_URL=https://api.wriven.tech
WRIVEN_PROJECT_ID=11111111-2222-3333-4444-555555555555
WRIVEN_TOKEN=wrk_live_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
WRIVEN_WEBHOOK_SECRET=            # from the dashboard webhook, once registered
NEXT_PUBLIC_SITE_URL=https://your-site.example.com   # sitemap base
```

- Server env vars (`WRIVEN_*`) are **not** inlined into the client bundle —
  fetching in RSC keeps even the public-safe read key off the wire.
- Restart `pnpm dev` after changing `.env.local`.
- Production (Vercel/Netlify): set the same vars in the project's environment
  settings.

## Fetching in a Server Component

```tsx
// src/app/blog/page.tsx (RSC — no 'use client')
import { wriven, cacheTags } from '@/lib/wriven';

export default async function BlogPage() {
  const { items } = await wriven.getEntries<BlogPostData>('blog_post', {
    sort: '-publishedAt',
    limit: 100,
    include: 1,                                   // expand author reference
    next: { revalidate: 300, tags: [cacheTags.type('blog_post')] },
  });
  return <PostGrid posts={items} />;
}
```

The `next` pass-through is the Next.js-specific payoff: responses are cached by
ISR **and tagged** with the same `type_blog_post` key the Delivery API sends as
`Cache-Tag`. See [08-next-build-guide.md](./08-next-build-guide.md) for the
webhook route that purges those tags on publish.

## Typed data, per content type

Keep one module per content type under `src/lib/content/` (see the repo's
actual structure — `blog.ts`, `products.ts`, `team.ts`, …). Each owns its
`*Data` interface, its fetcher(s), and its cache tags:

```ts
// src/lib/content/blog.ts (excerpt)
export interface BlogPostData {
  title: string;
  excerpt: string;
  body: unknown;                 // richtext JSON → <WrivenRichText>
  cover_image: WrivenMedia | null;
  author: WrivenEntry<TeamMemberData> | string | null;  // expanded only if include>0
}
export type BlogPost = WrivenEntry<BlogPostData>;
```

## The rich-text renderer

```tsx
import { WrivenRichText } from '@wriven-ai/react';

<WrivenRichText value={post.data.body} />
```

Pure render (no hooks), so it works in Server Components directly. The repo
wraps it in `src/components/content/Prose.tsx` for typography.

## Need it in a Client Component instead?

The SDK is isomorphic — `createClient` also works in `'use client'` files (or
Node scripts, edge, Bun, Deno). In that case the token **is** in the bundle;
that is acceptable for a `read` key (published content of one project only),
but the server-side pattern above is preferred when the framework allows it.

Next: [06-rendering.md](./06-rendering.md) — rendering entries, media, and rich text.
