// src/lib/content/organizations.ts
// `organization` — currently rendered through references (team members,
// case-study clients) rather than its own page.

import type { WrivenEntry, WrivenMedia } from '@wriven-ai/client';

export interface OrganizationData {
  name: string;
  tagline: string;
  description: unknown;
  logo: WrivenMedia | null;
  founded: string;
  size: string;
  website: string;
  featured: boolean;
}
export type Organization = WrivenEntry<OrganizationData>;
