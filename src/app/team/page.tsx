// src/app/team/page.tsx
// Team roster — `team_member` sorted by its numeric `sort_order` field, each
// member's `organization` reference expanded two levels deep via include.

import type { Metadata } from 'next';

import { Media } from '@/components/content/Media';
import { PageHeader } from '@/components/content/PageHeader';
import { Reveal } from '@/components/primitives/Reveal';
import { getTeam, isExpanded } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Team',
  description: 'People, modeled as content with references to organizations.',
};

export default async function TeamPage() {
  const members = await getTeam();

  return (
    <>
      <PageHeader
        eyebrow="people · team_member"
        title="The byline, as a content type."
        description="Photos, roles, bios (rich text), and a reference into an organization content type — sorted by a numeric field, expanded server-side."
      />

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => {
            const org = isExpanded(m.data.organization)
              ? m.data.organization
              : null;
            return (
              <li key={m.id}>
                <Reveal
                  delay={i * 60}
                  className="flex h-full flex-col gap-4 rounded-xl border border-border bg-background p-6"
                >
                  <div className="flex items-center gap-4">
                    <Media
                      media={m.data.photo}
                      className="size-14 shrink-0 rounded-full border border-border"
                    />
                    <div>
                      <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                        {m.data.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {m.data.role}
                      </p>
                    </div>
                  </div>
                  <p className="line-clamp-4 text-sm leading-relaxed text-foreground/75">
                    {plaintext(m.data.bio)}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                    <span>{org ? org.data.name : '—'}</span>
                    <span>#{m.data.sort_order}</span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

/** Bio bodies are rich text; on cards we only need the plain text. */
function plaintext(value: unknown): string {
  if (!value || typeof value !== 'object') return '';
  const node = value as { content?: Array<{ content?: Array<{ text?: string }> }> };
  return (node.content ?? [])
    .map((n) => (n.content ?? []).map((c) => c.text ?? '').join(''))
    .join(' ')
    .trim();
}
