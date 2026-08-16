// src/app/api/wriven/route.ts
// Wriven webhook → ISR revalidation, via @wriven-ai/next.
//
// Register this URL in the Wriven dashboard (Project Settings → Webhooks).
// On entry.published / unpublished / deleted the matching cache tag — the same
// `type_…` tag the Delivery API sends as `Cache-Tag` — is purged, so affected
// pages re-render on next request. No rebuild, no redeploy.

import { createWebhookRoute } from '@wriven-ai/next';

import { cacheTags } from '@/lib/wriven';

export const { POST } = createWebhookRoute({
  secret: process.env.WRIVEN_WEBHOOK_SECRET ?? '',
  revalidate: (payload) => ({
    // purge the whole content type + the project-wide tag
    tags: [cacheTags.type(payload.entry.type), cacheTags.project],
  }),
});
