// src/app/products/page.tsx
// Product grid — `product` entries with their `brand` reference expanded one
// level (`include: 1`), price/badge/category all structured fields.

import type { Metadata } from 'next';

import { Media } from '@/components/content/Media';
import { PageHeader } from '@/components/content/PageHeader';
import { Prose } from '@/components/content/Prose';
import { Reveal } from '@/components/primitives/Reveal';
import { getProducts } from '@/lib/content/products';
import { isExpanded } from '@/lib/content/shared';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Products modeled as structured content in Wriven.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHeader
        eyebrow="catalog · product"
        title="Structured products, one API."
        description="Name, price, category, and a brand reference — every field typed in the content model, expanded server-side by the delivery API."
      />

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        {products.length === 0 ? (
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            No published products yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => {
              const brand = isExpanded(p.data.brand) ? p.data.brand : null;
              return (
                <Reveal
                  key={p.id}
                  delay={i * 60}
                  className="flex flex-col overflow-hidden rounded-xl border border-border bg-background"
                >
                  <Media
                    media={p.data.image}
                    className="aspect-[16/10] w-full border-b border-border"
                  />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                        {p.data.category}
                        {brand ? ` · ${brand.data.name}` : ''}
                      </span>
                      {p.data.badges ? (
                        <span className="rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-foreground">
                          {p.data.badges}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="font-sans text-xl font-semibold tracking-tight text-foreground">
                      {p.data.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {p.data.tagline}
                    </p>
                    <Prose value={p.data.description} />
                    <span className="mt-auto pt-3 font-mono text-sm font-semibold text-foreground">
                      {typeof p.data.price === 'number'
                        ? `$${p.data.price.toFixed(2)}`
                        : '—'}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
