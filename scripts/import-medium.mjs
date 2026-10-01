// Importe les articles Medium en Markdown dans src/content/articles/.
//
//   npm run import:medium              → articles en français uniquement
//   npm run import:medium -- --all     → toutes les langues
//
// Les articles déjà importés (même URL Medium) sont ignorés : tu peux relancer
// le script après chaque nouvelle publication. Le flux Medium ne contient que
// les 10 derniers articles.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import TurndownService from 'turndown';

const USER = 'imenezzine';
const FEED = `https://medium.com/feed/@${USER}`;
const OUT = new URL('../src/content/articles/', import.meta.url).pathname;
const importAll = process.argv.includes('--all');

const res = await fetch(FEED, { headers: { 'user-agent': 'Mozilla/5.0' } });
if (!res.ok) throw new Error(`Impossible de lire ${FEED} (HTTP ${res.status})`);
const xml = await res.text();
const items = [].concat(new XMLParser().parse(xml).rss.channel.item ?? []);

// URLs déjà importées
const known = new Set(
  readdirSync(OUT)
    .map((f) => readFileSync(join(OUT, f), 'utf8').match(/^canonical: "?([^"\n]+)"?$/m)?.[1])
    .filter(Boolean),
);

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
// Medium met le code dans des <pre> avec des <br> au lieu de sauts de ligne.
turndown.addRule('medium-pre', {
  filter: 'pre',
  replacement: (_, node) => {
    const code = node.innerHTML
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/\n+$/, '');
    return `\n\n\`\`\`${guessLang(code)}\n${code}\n\`\`\`\n\n`;
  },
});
turndown.addRule('medium-figure', {
  filter: 'figure',
  replacement: (_, node) => {
    const img = node.querySelector('img');
    const caption = node.querySelector('figcaption');
    const md = img ? `![${img.getAttribute('alt') ?? ''}](${img.getAttribute('src')})` : '';
    return `\n\n${md}${caption ? `\n*${turndown.turndown(caption.innerHTML).trim()}*` : ''}\n\n`;
  },
});
// Pixel de suivi Medium
turndown.remove((node) => node.nodeName === 'IMG' && /medium\.com\/_\/stat/.test(node.getAttribute('src') ?? ''));

function guessLang(code) {
  if (/\$\w+|->|<\?php|function\s*\(|::/.test(code)) return 'php';
  if (/^\s*(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS) \//m.test(code)) return 'http';
  if (/^\s*[{[]/.test(code)) return 'json';
  return '';
}

function detectLang(text) {
  const count = (words) => words.reduce((n, w) => n + (text.match(new RegExp(`\\s${w}\\s`, 'gi'))?.length ?? 0), 0);
  return count(['le', 'la', 'les', 'des', 'est', 'une', 'pour', 'dans']) >
    count(['the', 'and', 'is', 'of', 'to', 'for', 'in', 'with'])
    ? 'fr'
    : 'en';
}

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/^(.{0,80})-.*$/, (slug, cut) => (slug.length > 80 ? cut : slug));

// Regroupe les tags Medium redondants (« php-development », « php-developers »… → « php »).
const TAG_ALIASES = {
  'php-developers': 'php',
  'php-development': 'php',
  test: 'tests',
  testing: 'tests',
  'integration-testing': 'tests',
  'best-practices': 'bonnes-pratiques',
  'good-practices': 'bonnes-pratiques',
  coding: 'code',
  development: 'code',
  'http-request': 'http',
  'http-status-code': 'http',
  https: 'http',
};
const cleanTags = (tags) => [...new Set(tags.map((t) => TAG_ALIASES[t] ?? t))];

const plain = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const quote = (s) => JSON.stringify(s);

let created = 0;
for (const item of items) {
  const html = item['content:encoded'] ?? '';
  const url = item.link.split('?')[0];
  const lang = detectLang(plain(html));
  const title = String(item.title).trim();

  if (known.has(url)) {
    console.log(`⏭️  déjà importé : ${title}`);
    continue;
  }
  if (!importAll && lang !== 'fr') {
    console.log(`🇬🇧 ignoré (anglais) : ${title}\n    ${url}`);
    continue;
  }

  const firstParagraph = [...html.matchAll(/<p>(.*?)<\/p>/gs)].map((m) => plain(m[1])).find((t) => t.length > 60) ?? '';
  const description = firstParagraph.length > 180 ? firstParagraph.slice(0, 177).replace(/\s+\S*$/, '') + '…' : firstParagraph;
  const tags = cleanTags([].concat(item.category ?? []).map(String));
  const file = join(OUT, `${slugify(title)}.md`);
  if (existsSync(file)) {
    console.log(`⚠️  le fichier existe déjà, ignoré : ${file}`);
    continue;
  }

  const frontmatter = [
    '---',
    `title: ${quote(title)}`,
    `description: ${quote(description)}`,
    `date: ${new Date(item.pubDate).toISOString().slice(0, 10)}`,
    `tags: [${tags.map(quote).join(', ')}]`,
    `lang: ${lang}`,
    `canonical: ${quote(url)}`,
    '---',
  ].join('\n');

  // Medium répète le titre en tête de l'article : on le retire.
  const body = turndown
    .turndown(html)
    .trim()
    .replace(/^#{1,4} .*\n+/, (heading) => (plain(heading.replace(/[#*_\\]/g, '')) === plain(title) ? '' : heading));
  writeFileSync(file, `${frontmatter}\n\n${body}\n`);
  console.log(`✅ importé : ${title}`);
  created++;
}
console.log(`\n${created} article(s) importé(s) dans src/content/articles/`);
