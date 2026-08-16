// src/lib/wriven.ts
// Server-only Wriven delivery client. The read key never reaches the browser —
// every fetch below happens in React Server Components.

import { createClient } from '@wriven-ai/client';

const baseUrl = process.env.WRIVEN_BASE_URL ?? 'https://api.wriven.tech';
const projectId = process.env.WRIVEN_PROJECT_ID ?? '';
const token = process.env.WRIVEN_TOKEN ?? '';

if (!projectId || !token) {
  throw new Error(
    'Missing WRIVEN_PROJECT_ID / WRIVEN_TOKEN — set them in .env.local',
  );
}

export const wriven = createClient({ baseUrl, projectId, token });

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
