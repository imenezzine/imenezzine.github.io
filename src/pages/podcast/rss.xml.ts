import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { PODCAST, SITE } from '../../site.config';
import { getSorted } from '../../lib/utils';

// Flux du podcast. Si tu utilises un hébergeur (Ausha, Acast…), c'est plutôt SON flux
// qu'il faut soumettre aux plateformes : celui-ci sert surtout aux lecteurs RSS.
export async function GET(context: APIContext) {
  const episodes = await getSorted('podcast');
  return rss({
    title: PODCAST.name,
    description: PODCAST.description,
    site: context.site!,
    customData: `<language>${SITE.lang}</language>`,
    items: episodes.map((e) => ({
      title: `#${e.data.number} ${e.data.title}`,
      description: e.data.description,
      pubDate: e.data.date,
      link: `/podcast/${e.id}/`,
      ...(e.data.audio && { enclosure: { url: e.data.audio, length: 0, type: 'audio/mpeg' } }),
    })),
  });
}
