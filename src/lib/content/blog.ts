// src/lib/content/blog.ts
// `blog_post` — index fetches expand the author one level; the detail page
// expands two (author → their organization).

import type { WrivenEntry, WrivenMedia } from '@wriven-ai/client';

import { cacheTags, wriven } from '@/lib/wriven';
import { REVALIDATE_SECONDS } from '@/lib/content/shared';
import type { TeamMemberData } from '@/lib/content/team';

export interface BlogPostData {
  title: string;
  excerpt: string;
  body: unknown; // ProseMirror JSON → <WrivenRichText>
  cover_image: WrivenMedia | null;
  category: string;
  tags: string[];
  author: WrivenEntry<TeamMemberData> | string | null;
  featured: boolean;
}
export type BlogPost = WrivenEntry<BlogPostData>;

const TAGS = [cacheTags.type('blog_post')];

export async function getPosts(): Promise<BlogPost[]> {
  const { items } = await wriven.getEntries<BlogPostData>('blog_post', {
    sort: '-publishedAt',
    limit: 100,
    include: 1,
    next: { revalidate: REVALIDATE_SECONDS, tags: TAGS },
  });
  return items;
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    return await wriven.getEntry<BlogPostData>('blog_post', slug, {
      include: 2,
      next: { revalidate: REVALIDATE_SECONDS, tags: TAGS },
    });
  } catch {
    return null; // 404 — caller renders notFound()
  }
}
