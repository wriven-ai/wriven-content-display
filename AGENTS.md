# AGENTS.md

## Project overview

This repository is a Vite + React + TypeScript app for displaying published content from Wriven, a headless CMS. The main goal is to read content from Wriven’s Delivery API and render it in the UI with no auth flow or write access.

Start with [context/README.md](context/README.md) for the product context and implementation guide.

## Architecture and key files

- [src/main.tsx](src/main.tsx): app entry point.
- [src/App.tsx](src/App.tsx): current top-level UI entry. This is the place to wire in the real content-driven experience.
- [src/components](src/components): reusable UI building blocks.
- [src/lib](src/lib): client-side helpers and integration code.
- [src/assets](src/assets): static assets.
- [vite.config.ts](vite.config.ts): Vite config with the alias for the src folder.

## Working conventions

- Prefer TypeScript and React patterns that fit the existing Vite setup.
- Keep UI components focused and reusable; place content-specific logic in small helpers under [src/lib](src/lib) or dedicated feature components.
- Use the configured alias `@/*` for imports; it is already wired in [vite.config.ts](vite.config.ts) and [tsconfig.json](tsconfig.json).
- Treat environment variables as public-safe only when they are read-only Wriven delivery values; never add secrets or write-capable credentials to the frontend bundle.
- When adding Wriven integration, follow the guidance in [context/05-client-setup.md](context/05-client-setup.md) and [context/06-rendering.md](context/06-rendering.md).

## Development commands

Run these from the repository root:

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

## Expectations for changes

- Keep the app focused on read-only display of published content.
- Prefer small, composable changes over large rewrites.
- If a change introduces API calls, make sure it handles loading, error, and empty states clearly.
- When updating UI, preserve the existing Vite/React structure and avoid introducing unnecessary dependencies.

## Notes for AI agents

- The current starter UI in [src/App.tsx](src/App.tsx) is not yet a finished Wriven display implementation; treat it as a placeholder to replace or evolve.
- The most relevant implementation reference is the Wriven guide in [context](context).
- If you need to add new views or content types, mirror the patterns described in [context/07-content-type-examples.md](context/07-content-type-examples.md).
