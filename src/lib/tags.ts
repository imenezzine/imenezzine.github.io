import { getSorted } from './utils';

export const TYPES = {
  articles: { label: 'Article', emoji: '✍️', color: 'pink', base: '/articles' },
  talks: { label: 'Talk', emoji: '🎤', color: 'violet', base: '/talks' },
  podcast: { label: 'Épisode', emoji: '🎧', color: 'orange', base: '/podcast' },
  ideas: { label: 'Idée', emoji: '💡', color: 'yellow', base: '/idees' },
  retours: { label: 'Retour d’écoute', emoji: '📝', color: 'blue', base: '/retours' },
  til: { label: 'TIL', emoji: '⚡', color: 'blue', base: '/til' },
} as const;

export type TaggedType = keyof typeof TYPES;

export interface TaggedItem {
  type: TaggedType;
  href: string;
  title: string;
  description?: string;
  date: Date;
  tags: string[];
}

/** « Communauté PHP » → « communaute-php » */
export function tagSlug(tag: string) {
  return tag
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const tagHref = (tag: string) => `/tags/${tagSlug(tag)}`;

/** Tout le contenu tagué du site, du plus récent au plus ancien. */
export async function getTaggedItems(): Promise<TaggedItem[]> {
  const collections = await Promise.all(
    (Object.keys(TYPES) as TaggedType[]).map(async (type) =>
      (await getSorted(type)).map((entry) => ({
        type,
        href: `${TYPES[type].base}/${entry.id}`,
        title: entry.data.title,
        description: 'description' in entry.data ? entry.data.description : undefined,
        date: entry.data.date,
        tags: entry.data.tags,
      })),
    ),
  );
  return collections.flat().sort((a, b) => b.date.getTime() - a.date.getTime());
}

/** Regroupe le contenu par tag (les variantes « PHP » / « php » sont fusionnées). */
export async function getTags() {
  const tags = new Map<string, { slug: string; name: string; items: TaggedItem[] }>();
  for (const item of await getTaggedItems()) {
    for (const name of item.tags) {
      const slug = tagSlug(name);
      if (!slug) continue;
      const tag = tags.get(slug) ?? { slug, name, items: [] };
      tag.items.push(item);
      tags.set(slug, tag);
    }
  }
  return [...tags.values()].sort((a, b) => b.items.length - a.items.length || a.name.localeCompare(b.name, 'fr'));
}
