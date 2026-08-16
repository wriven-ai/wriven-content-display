// src/lib/content/brands.ts
// `brand` — rendered through the product grid's brand reference rather than
// its own page.

import type { WrivenEntry, WrivenMedia } from '@wriven-ai/client';

export interface BrandData {
  name: string;
  tagline: string;
  description: unknown;
  logo: WrivenMedia | null;
  colors: string;
  website: string;
}
export type Brand = WrivenEntry<BrandData>;
