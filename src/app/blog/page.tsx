// src/app/blog/page.tsx
// Blog index — every published `blog_post`, newest first, author expanded.

import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHeader } from '@/components/content/PageHeader';
import { Reveal } from '@/components/primitives/Reveal';
import { formatDate, getPosts, isExpanded } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing published through the Wriven Delivery API.',
};

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        eyebrow="blog · blog_post"
        title="Writing, delivered as JSON."
        description="Every post below is fetched at request time from the Wriven Delivery API and rendered as rich text by @wriven-ai/react."
      />

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        {posts.length === 0 ? (
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            No published posts yet.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => {
              const author = isExpanded(post.data.author)
                ? post.data.author
                : null;
              return (
                <li key={post.id} className="bg-background">
                  <Reveal delay={i * 60}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                          {post.data.category}
                        </span>
                        <span className="font-mono text-[0.65rem] text-muted-foreground/70">
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-foreground group-hover:underline group-hover:underline-offset-4">
                        {post.data.title}
                      </h2>
                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {post.data.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-2 pt-2">
                        <span className="flex size-6 items-center justify-center rounded-full border border-border bg-muted font-mono text-[0.6rem] font-semibold text-foreground">
                          {author
                            ? author.data.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                            : '—'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {author ? author.data.name : 'Unattributed'}
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
