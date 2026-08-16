# Wriven Display — Frontend Integration Guide

This folder is a **complete, self-contained guide** for building a frontend that
displays content managed by **Wriven** (an AI-native headless CMS). It is written
for an AI coding agent (or a developer) building against the **Wriven Delivery
API** — the reference implementation in this repo is a **Next.js 16 App Router**
site that renders **products, blog posts, team members**, etc.

> **You do not need access to the Wriven source code to use this guide.** Everything
> required to build a display app is documented here. Read these files in order.

---

## What you are building

A **public, read-only website** (no login, no auth UI, no complexity) that pulls
**published** content from a Wriven project over HTTP and renders it. Think of it
like a storefront, a blog, or a marketing site whose content is authored in the
Wriven dashboard and served by the Wriven **Delivery API**.

What this repo renders today:

- **Blog posts** — article list + full article rendering (rich text + references)
- **Products** — catalog grid with brand references
- **Team members** — staff/author profiles with organization references
- **Case studies** — index + detail, client references
- **Jobs, testimonials** — structured fields (selects, booleans, numerics)

> **Status of this repo (updated 2026-08-16):** the app is **built and live** —
> Next.js 16 App Router, all content types rendering from the real Delivery API,
> the official `@wriven-ai/*` SDK installed, per-type content modules under
> `src/lib/content/`, SSG slug pages, generated sitemap, and a webhook route for
> ISR revalidation. Remaining deploy steps (Vercel env vars + webhook
> registration) are in [08-next-build-guide.md](./08-next-build-guide.md).
> **This repo uses pnpm** — run `pnpm add` / `pnpm dev`.

---

## How Wriven works (30-second version)

1. Content is authored in the **Wriven dashboard** (a separate hosted app).
2. Each **project** exposes a **read-only Delivery API**.
3. You authenticate with a **project-scoped API key** (`wrk_live_…`).
4. Your frontend calls `GET /v1/projects/{projectId}/content/{apiId}` and renders
   the JSON. That's it. **Nothing of Wriven runs inside your app** — just `fetch`.

A `read` key returns **published content only** and is **safe to expose in a
browser bundle** (exactly like Contentful/Sanity delivery tokens). In this app
the key is kept **server-side** (fetched in React Server Components), so it
never reaches the bundle at all. See
[02-getting-credentials.md](./02-getting-credentials.md) for the security model.

---

## Install the Wriven SDK

Wriven ships an official SDK, **published on npm**:

```bash
pnpm add @wriven-ai/client        # core delivery client (typed, isomorphic, zero-dep)
pnpm add @wriven-ai/react         # <WrivenRichText> renderer
pnpm add @wriven-ai/next          # webhook verification + ISR revalidation (Next only)
```

```ts
// server component / route handler — token stays server-side
import { createClient } from '@wriven-ai/client';
const wriven = createClient({
  baseUrl: process.env.WRIVEN_BASE_URL,       // https://api.wriven.tech
  projectId: process.env.WRIVEN_PROJECT_ID,
  token: process.env.WRIVEN_TOKEN,            // wrk_live_…
});
const posts = await wriven.getEntries('blog_post', { sort: '-publishedAt', limit: 10 });
```

---

## File map (read in order)

| # | File | What it covers |
|---|------|----------------|
| — | [README.md](./README.md) | This index + quickstart |
| 1 | [01-what-is-wriven.md](./01-what-is-wriven.md) | Headless-CMS model, delivery-only integration, architecture, why no auth is needed |
| 2 | [02-getting-credentials.md](./02-getting-credentials.md) | Get `projectId` + API key from the dashboard, scopes, security rules, base URL, verify with `curl`, CORS |
| 3 | [03-delivery-api.md](./03-delivery-api.md) | Endpoints, query params (`select`/`filter`/`sort`/`page`/`limit`/`include`), response envelope, entry shape, error codes, pagination, caching |
| 4 | [04-content-model.md](./04-content-model.md) | Content types, field types, how `media` / `richtext` / `reference` fields resolve in responses, modeling guidance |
| 5 | [05-client-setup.md](./05-client-setup.md) | The official `@wriven-ai/*` SDK in Next.js: server-only client, env config, cache tags, per-type content modules |
| 6 | [06-rendering.md](./06-rendering.md) | React rendering patterns: typed data, media, **rich text renderer (full vendored component)**, references, dates, loading/error/empty states |
| 7 | [07-content-type-examples.md](./07-content-type-examples.md) | Ready-to-use content types: `product`, `blog_post`, `team_member` — field definitions + sample data + component sketches |
| 8 | [08-next-build-guide.md](./08-next-build-guide.md) | Commands, project structure, Vercel deploy, **webhook → ISR revalidation flow** |
| 9 | [09-troubleshooting.md](./09-troubleshooting.md) | FAQ: 401/403/404, CORS, empty results, media not resolving, blank rich text, rate limits |

---

## Quickstart (TL;DR)

```bash
# 1. Scaffold a Next.js app (this repo is already built — this is for a new one)
pnpm create next-app@latest my-display --ts --tailwind --eslint --app --src-dir --import-alias "@/*"

# 2. Env — fill these in from the Wriven dashboard (see 02-getting-credentials.md)
cat > .env.local <<'EOF'
WRIVEN_BASE_URL=https://api.wriven.tech
WRIVEN_PROJECT_ID=<your project id>
WRIVEN_TOKEN=<wrk_live_... read key>
EOF

# 3. SDK client from 05-client-setup.md -> src/lib/wriven.ts

# 4. Fetch published entries in a server component
const posts = await wriven.getEntries('blog_post', { sort: '-publishedAt', limit: 10 });

# 5. Run
pnpm dev
```

Then read [08-next-build-guide.md](./08-next-build-guide.md) for deploy + the
live-revalidation webhook.

---

## Conventions used in this guide

- All code is **TypeScript + React + Next.js App Router** (patterns transfer to
  any React setup; the SDK itself is isomorphic).
- HTTP examples use the global `fetch` (works in browser, Node 18+, edge).
- Every Delivery API response is wrapped in `{ success, data }` / `{ success, error }`.
- Timestamps are ISO 8601 strings (or `null`).
- Field names like `blog_post`, `publishedAt`, `wrk_live_…` are literal — match them exactly.
