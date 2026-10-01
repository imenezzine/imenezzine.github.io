import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

export function formatDate(date: Date, opts: Intl.DateTimeFormatOptions = { dateStyle: 'long' }) {
  return new Intl.DateTimeFormat('fr-FR', opts).format(date);
}

export function readingTime(body = '') {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min de lecture`;
}

type Dated = { data: { date: Date; draft?: boolean } };

export function byDateDesc<T extends Dated>(a: T, b: T) {
  return b.data.date.getTime() - a.data.date.getTime();
}

/** Récupère une collection triée du plus récent au plus ancien, sans les brouillons en prod. */
export async function getSorted<C extends CollectionKey>(name: C) {
  const entries = (await getCollection(name)) as (CollectionEntry<C> & Dated)[];
  return entries.filter((e) => !(import.meta.env.PROD && e.data.draft)).sort(byDateDesc);
}

export function splitTalks(talks: CollectionEntry<'talks'>[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = talks.filter((t) => t.data.date >= today).sort((a, b) => -byDateDesc(a, b));
  const past = talks.filter((t) => t.data.date < today).sort(byDateDesc);
  return { upcoming, past };
}

/** Transforme un lien YouTube (watch, youtu.be, live, shorts) en URL d'intégration. */
export function youtubeEmbed(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/|\/(?:embed|live|shorts)\/)([\w-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : undefined;
}
