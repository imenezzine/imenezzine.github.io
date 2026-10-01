import { getCollection, type CollectionKey } from 'astro:content';

// Sections masquées du menu et de l'accueil tant qu'elles n'ont aucun contenu.
const SECTION_COLLECTIONS: Record<string, CollectionKey> = {
  '/idees': 'ideas',
  '/til': 'til',
  '/projets': 'projects',
};

/** Garde uniquement les liens dont la section a du contenu. */
export async function withContent<T extends { href: string }>(items: readonly T[]): Promise<T[]> {
  const visible = await Promise.all(
    items.map(async (item) => {
      const collection = SECTION_COLLECTIONS[item.href];
      return !collection || (await getCollection(collection)).length > 0;
    }),
  );
  return items.filter((_, i) => visible[i]);
}
