// src/app/blog/[slug]/page.tsx
// Post detail — statically generated per published slug, author expanded two
// levels (author → their organization). Falls into notFound() for unknown or
// unpublished slugs.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Media } from '@/components/content/Media';
import { Prose } from '@/components/content/Prose';
import { Reveal } from '@/components/primitives/Reveal';
import { getPost, getPosts } from '@/lib/content/blog';
import { formatDate, isExpanded } from '@/lib/content/shared';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Not found' };
  return {
    title: post.data.title,
    description: post.data.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const author = isExpanded(post.data.author) ? post.data.author : null;
  const org =
    author && isExpanded(author.data.organization)
      ? author.data.organization
      : null;

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-24 pt-20 sm:px-8 sm:pt-28">
      <Reveal>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
          <span>{post.data.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt ?? undefined}>
            {formatDate(post.publishedAt)}
          </time>
          {post.data.tags?.length ? (
            <>
              <span aria-hidden>·</span>
              <span>{post.data.tags.join(' / ')}</span>
            </>
          ) : null}
        </div>

        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          {post.data.title}
        </h1>

        {author ? (
          <div className="mt-7 flex items-center gap-3 border-y border-border py-4">
            <span className="flex size-9 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs font-semibold text-foreground">
              {author.data.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
            <div className="text-sm">
              <span className="font-semibold text-foreground">
                {author.data.name}
              </span>
              <span className="text-muted-foreground">
                {' '}
                — {author.data.role}
                {org ? `, ${org.data.name}` : ''}
              </span>
            </div>
          </div>
        ) : null}
      </Reveal>

      {post.data.cover_image ? (
        <Reveal className="mt-10">
          <Media
            media={post.data.cover_image}
            className="aspect-[16/8] w-full rounded-xl border border-border"
          />
        </Reveal>
      ) : null}

      <Reveal className="mt-10">
        <Prose value={post.data.body} />
      </Reveal>
    </article>
  );
}
