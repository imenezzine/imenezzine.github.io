import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { getSorted, splitTalks } from '../lib/utils';

export async function GET(context: APIContext) {
  const [articles, til, episodes, talks] = await Promise.all([
    getSorted('articles'),
    getSorted('til'),
    getSorted('podcast'),
    getSorted('talks'),
  ]);

  const items = [
    ...articles.map((a) => ({ title: a.data.title, description: a.data.description, pubDate: a.data.date, link: `/articles/${a.id}/`, categories: ['article', ...a.data.tags] })),
    ...til.map((t) => ({ title: `TIL : ${t.data.title}`, pubDate: t.data.date, link: `/til/${t.id}/`, categories: ['til', ...t.data.tags] })),
    ...episodes.map((e) => ({ title: `🎧 #${e.data.number} ${e.data.title}`, description: e.data.description, pubDate: e.data.date, link: `/podcast/${e.id}/`, categories: ['podcast'] })),
    ...splitTalks(talks).past.map((t) => ({ title: `🎤 ${t.data.title} (${t.data.event})`, description: t.data.description, pubDate: t.data.date, link: `/talks/${t.id}/`, categories: ['talk'] })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: SITE.name,
    description: SITE.tagline,
    site: context.site!,
    items,
    customData: `<language>${SITE.lang}</language>`,
  });
}
