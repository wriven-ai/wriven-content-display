// src/lib/content/team.ts
// `team_member` — sorted by the numeric `sort_order` field, each member's
// `organization` reference expanded one level.

import type { WrivenEntry, WrivenMedia } from '@wriven-ai/client';

import { cacheTags, wriven } from '@/lib/wriven';
import { REVALIDATE_SECONDS } from '@/lib/content/shared';
import type { OrganizationData } from '@/lib/content/organizations';

export interface TeamMemberData {
  name: string;
  role: string;
  bio: unknown;
  photo: WrivenMedia | null;
  email: string;
  sort_order: number;
  organization: WrivenEntry<OrganizationData> | string | null;
}
export type TeamMember = WrivenEntry<TeamMemberData>;

export async function getTeam(): Promise<TeamMember[]> {
  const { items } = await wriven.getEntries<TeamMemberData>('team_member', {
    sort: 'slug',
    limit: 100,
    include: 1,
    next: {
      revalidate: REVALIDATE_SECONDS,
      tags: [cacheTags.type('team_member')],
    },
  });
  // sort_order is the intended ordering; fall back to published recency.
  return items.sort(
    (a, b) => (a.data.sort_order ?? 0) - (b.data.sort_order ?? 0),
  );
}
