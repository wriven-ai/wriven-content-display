# AGENTS.md

## Project overview

This repository is the **official Wriven showcase site**: a Next.js 16 App Router
app (TypeScript, Tailwind v4) that renders published content from Wriven, a
headless CMS, through the official `@wriven-ai/*` npm packages. It is read-only
— no auth flow, no write access. Its purpose is to demonstrate the full capacity
of the Wriven Delivery API and SDK: typed content modules, reference expansion,
rich text, SSG from live slugs, and webhook-driven ISR revalidation.

Start with [context/README.md](context/README.md) for the product context and
integration guide.

## Architecture and key files

- `src/app/layout.tsx`: root shell (Navbar + Footer), metadata.
- `src/app/page.tsx`: static landing sections (`src/components/home/`).
- `src/app/{blog,products,team,case-studies,jobs,testimonials}/`: content pages.
  `blog/[slug]` and `case-studies/[slug]` are SSG via `generateStaticParams`.
- `src/app/api/wriven/route.ts`: webhook route (`@wriven-ai/next`) — verifies
  the HMAC signature and calls `revalidateTag` so publishes update the site
  without a rebuild.
- `src/lib/wriven.ts`: **server-only** SDK client (`createClient`) + `cacheTags`
  helpers. The delivery token never reaches the browser bundle.
- `src/lib/content/`: one module per content type (`blog.ts`, `products.ts`,
  `team.ts`, `case-studies.ts`, `jobs.ts`, `testimonials.ts`,
  `organizations.ts`, `brands.ts`) — each owns its `*Data` interfaces,
  fetchers, and cache tags. `shared.ts` holds cross-cutting helpers.
- `src/components/`: `content/` (Media, Prose, PageHeader), `home/`, `layout/`,
  `primitives/` (Reveal), `ui/`.
- `src/app/sitemap.ts`: sitemap generated from live Delivery API slugs.

## Working conventions

- TypeScript + React patterns that fit the App Router: server components fetch,
  `'use client'` only where interactivity requires it.
- Keep UI components focused and reusable; content fetching lives in
  `src/lib/content/*`, never inside page components.
- Use the `@/*` alias for imports (wired in `tsconfig.json`).
- Environment variables are **server-only** (`WRIVEN_BASE_URL`,
  `WRIVEN_PROJECT_ID`, `WRIVEN_TOKEN`, `WRIVEN_WEBHOOK_SECRET`,
  `NEXT_PUBLIC_SITE_URL`) — no secrets or write-capable credentials ever.
- When touching content pages, follow [context/06-rendering.md](context/06-rendering.md)
  and mirror the per-type module structure in `src/lib/content/`.

## Development commands

Run from the repository root:

- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`

## Expectations for changes

- Keep the app focused on read-only display of published content.
- Prefer small, composable changes over large rewrites.
- Any new content type gets its own module in `src/lib/content/` and its own
  cache tag; register the tag in the webhook route's revalidate map.
- Handle loading, error, and empty states clearly on new pages.
- Preserve the existing Next.js structure; avoid unnecessary dependencies.

## Notes for AI agents

- The site is complete and rendering live content; treat `context/` as the
  integration reference for *why* things are wired the way they are.
- Deploy + webhook registration steps live in
  [context/08-next-build-guide.md](context/08-next-build-guide.md).
