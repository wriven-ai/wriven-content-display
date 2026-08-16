// src/components/home/LatestWriting.tsx
// The proof: latest posts + featured products fetched live from the Delivery
// API right on the homepage. If the dashboard changes, this changes.

import Link from 'next/link';

import { Reveal } from '@/components/primitives/Reveal';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { getPosts } from '@/lib/content/blog';
import { getProducts } from '@/lib/content/products';
import { formatDate } from '@/lib/content/shared';

export async function LatestWriting() {
  const [posts, products] = await Promise.all([getPosts(), getProducts()]);
  const latest = posts.slice(0, 3);
  const showcase = products.filter((p) => p.data.featured).slice(0, 3);
  const picked = showcase.length > 0 ? showcase : products.slice(0, 3);

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="flex flex-col gap-3">
          <Eyebrow>
            <span className="text-ink">●</span> Live from the Delivery API
          </Eyebrow>
          <h2 className="max-w-2xl font-display text-3xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl">
            Not a mock. Fetched when this page rendered.
          </h2>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {latest.map((post, i) => (
            <li key={post.id} className="bg-background">
              <Reveal delay={i * 80} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>{post.data.category}</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <h3 className="font-sans text-xl font-semibold leading-snug tracking-tight text-foreground group-hover:underline group-hover:underline-offset-4">
                    {post.data.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.data.excerpt}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {picked.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {picked.map((p, i) => (
              <li key={p.id}>
                <Reveal
                  delay={i * 80}
                  className="flex h-full flex-col gap-1 rounded-xl border border-border/70 bg-background p-5"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                    product · {p.data.category}
                  </span>
                  <span className="font-sans text-lg font-semibold tracking-tight text-foreground">
                    {p.data.name}
                  </span>
                  <span className="text-sm text-muted-foreground">{p.data.tagline}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : null}

        <Reveal delay={120} className="mt-8">
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-[0.18em] text-foreground underline-offset-4 hover:underline"
          >
            All writing →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
