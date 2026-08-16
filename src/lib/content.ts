// src/lib/content.ts
// Typed data interfaces for the project's content types + server fetchers.
// Field shapes mirror the content model in the Wriven dashboard (project
// "Wriven Content Display").

import type { WrivenEntry, WrivenMedia } from '@wriven-ai/client';

import { cacheTags, wriven } from '@/lib/wriven';

/* ------------------------------ content types ----------------------------- */

export interface BlogPostData {
  title: string;
  excerpt: string;
  body: unknown; // ProseMirror JSON → <WrivenRichText>
  cover_image: WrivenMedia | null;
  category: string;
  tags: string[];
  author: WrivenEntry<TeamMemberData> | string | null; // expanded with include>0
  featured: boolean;
}
export type BlogPost = WrivenEntry<BlogPostData>;

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

export interface BrandData {
  name: string;
  tagline: string;
  description: unknown;
  logo: WrivenMedia | null;
  colors: string;
  website: string;
}
export type Brand = WrivenEntry<BrandData>;

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

export interface CaseStudyData {
  title: string;
  client: WrivenEntry<BrandData | OrganizationData> | string | null;
  summary: string;
  body: unknown;
  cover_image: WrivenMedia | null;
  industry: string;
  outcome: string;
}
export type CaseStudy = WrivenEntry<CaseStudyData>;

export interface TestimonialData {
  quote: string;
  author_name: string;
  author_role: string;
  rating: number;
  company: string;
  featured: boolean;
}
export type Testimonial = WrivenEntry<TestimonialData>;

export interface JobPostingData {
  title: string;
  department: string;
  location: string;
  type: string;
  description: unknown;
  salary_min: number;
  salary_max: number;
  remote: boolean;
  featured: boolean;
}
export type JobPosting = WrivenEntry<JobPostingData>;

/* -------------------------------- fetchers -------------------------------- */

/** Shared revalidation: serve from ISR cache for 5 min unless a webhook purges it. */
const REVALIDATE = { revalidate: 300 } as const;

export async function getPosts(): Promise<BlogPost[]> {
  const { items } = await wriven.getEntries<BlogPostData>('blog_post', {
    sort: '-publishedAt',
    limit: 100,
    include: 1, // expand author
    next: { revalidate: 300, tags: [cacheTags.type('blog_post')] },
  });
  return items;
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    return await wriven.getEntry<BlogPostData>('blog_post', slug, {
      include: 2, // author → their organization
      next: {
        revalidate: REVALIDATE.revalidate,
        tags: [cacheTags.type('blog_post')],
      },
    });
  } catch {
    return null; // 404 — caller renders notFound()
  }
}

export async function getProducts(): Promise<Product[]> {
  const { items } = await wriven.getEntries<ProductData>('product', {
    sort: '-publishedAt',
    limit: 100,
    include: 1, // expand brand
    next: { revalidate: 300, tags: [cacheTags.type('product')] },
  });
  return items;
}

export async function getTeam(): Promise<TeamMember[]> {
  const { items } = await wriven.getEntries<TeamMemberData>('team_member', {
    sort: 'slug',
    limit: 100,
    include: 1, // expand organization
    next: { revalidate: 300, tags: [cacheTags.type('team_member')] },
  });
  // sort_order field is the intended ordering; fall back to published recency
  return items.sort((a, b) => (a.data.sort_order ?? 0) - (b.data.sort_order ?? 0));
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const { items } = await wriven.getEntries<CaseStudyData>('case_study', {
    sort: '-publishedAt',
    limit: 100,
    include: 1, // expand client (brand/organization)
    next: { revalidate: 300, tags: [cacheTags.type('case_study')] },
  });
  return items;
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    return await wriven.getEntry<CaseStudyData>('case_study', slug, {
      include: 1,
      next: { revalidate: 300, tags: [cacheTags.type('case_study')] },
    });
  } catch {
    return null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { items } = await wriven.getEntries<TestimonialData>('testimonial', {
    sort: '-publishedAt',
    limit: 100,
    next: { revalidate: 300, tags: [cacheTags.type('testimonial')] },
  });
  return items;
}

export async function getJobs(): Promise<JobPosting[]> {
  const { items } = await wriven.getEntries<JobPostingData>('job_posting', {
    sort: '-publishedAt',
    limit: 100,
    next: { revalidate: 300, tags: [cacheTags.type('job_posting')] },
  });
  return items;
}

/* -------------------------------- helpers --------------------------------- */

export function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Reference fields are raw ids unless `include` expanded them. */
export function isExpanded<TData>(
  ref: WrivenEntry<TData> | string | null | undefined,
): ref is WrivenEntry<TData> {
  return !!ref && typeof ref === 'object';
}
