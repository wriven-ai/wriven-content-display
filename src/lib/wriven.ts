// src/lib/wriven.ts
// Server-only Wriven delivery client. The read key never reaches the browser —
// every fetch below happens in React Server Components.

import {
  createClient,
  isWrivenError,
  type QueryOptions,
  type WrivenClient,
} from '@wriven-ai/client';

const baseUrl = process.env.WRIVEN_BASE_URL ?? 'https://api.wriven.tech';
const projectId = process.env.WRIVEN_PROJECT_ID ?? '';
const token = process.env.WRIVEN_TOKEN ?? '';

if (!projectId || !token) {
  throw new Error(
    'Missing WRIVEN_PROJECT_ID / WRIVEN_TOKEN — set them in .env.local',
  );
}

// The SDK's built-in retry loop is only 2 attempts (~750ms total) — thin for a
// build-time gateway blip (a transient 502 once killed a Vercel deploy). Disable
// it and retry here instead, with a longer, gentler budget (4 attempts, ~7.5s).
const client = createClient({ baseUrl, projectId, token, retries: 0 });

const MAX_ATTEMPTS = 4;
const BASE_DELAY_MS = 500;

/** Retry transient Delivery API failures (5xx / network) with backoff. */
async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const retryable =
        isWrivenError(err) && (err.status >= 500 || err.status === 0);
      if (!retryable || attempt === MAX_ATTEMPTS - 1) throw err;
      await new Promise((resolve) =>
        setTimeout(resolve, BASE_DELAY_MS * 2 ** attempt),
      );
    }
  }
  throw lastError;
}

/**
 * The two read methods the site actually uses, wrapped so a transient 5xx from
 * the Delivery API retries instead of failing the build or a server render.
 */
export const wriven: WrivenClient = {
  ...client,
  getAllEntries: client.getAllEntries.bind(client),
  iterateEntries: client.iterateEntries.bind(client),
  getEntry: <TData = Record<string, unknown>>(
    type: string,
    slug: string,
    query?: QueryOptions,
  ) => withRetry(() => client.getEntry<TData>(type, slug, query)),
  getEntries: <TData = Record<string, unknown>>(
    type: string,
    query?: QueryOptions,
  ) => withRetry(() => client.getEntries<TData>(type, query)),
};

/**
 * Cache tags mirroring the Delivery API's own `Cache-Tag` response headers
 * (`proj_… type_… entry_…`). The webhook route revalidates these exact tags,
 * so a publish in the dashboard invalidates this site's ISR cache with the
 * same keys the CDN uses.
 */
export const cacheTags = {
  project: `proj_${projectId}`,
  type: (apiId: string) => `type_${apiId}`,
  entry: (id: string) => `entry_${id}`,
};
