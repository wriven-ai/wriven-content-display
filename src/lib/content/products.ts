// src/lib/content/products.ts
// `product` — grid fetches expand the brand reference one level.

import type { WrivenEntry, WrivenMedia } from '@wriven-ai/client';

import { cacheTags, wriven } from '@/lib/wriven';
import { REVALIDATE_SECONDS } from '@/lib/content/shared';
import type { BrandData } from '@/lib/content/brands';

export interface ProductData {
  name: string;
  tagline: string;
  description: unknown;
  price: number;
  image: WrivenMedia | null;
  category: string;
  badges: string;
  brand: WrivenEntry<BrandData> | string | null;
  featured: boolean;
}
export type Product = WrivenEntry<ProductData>;

export async function getProducts(): Promise<Product[]> {
  const { items } = await wriven.getEntries<ProductData>('product', {
    sort: '-publishedAt',
    limit: 100,
    include: 1,
    next: { revalidate: REVALIDATE_SECONDS, tags: [cacheTags.type('product')] },
  });
  return items;
}
