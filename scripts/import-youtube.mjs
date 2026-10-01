// Importe les épisodes du podcast depuis YouTube dans src/content/podcast/.
//
//   npm run import:youtube                     → nouveaux épisodes du flux RSS (15 dernières vidéos, Shorts ignorés)
//   npm run import:youtube -- <id> <id>=7 …    → vidéos précises (« =7 » force le numéro d'épisode)
//
// Les épisodes déjà importés (même vidéo YouTube) sont ignorés. Le numéro est lu
// dans le titre (« #12 ») ; sinon, c'est le numéro suivant le plus grand existant.
// Pense à relire le fichier créé (titre, invité·es, tags) avant de publier.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CHANNEL_ID = 'UCUe7lPmBpIVGBC4HIPHfCrA'; // Café Tech avec Imen
const PODCAST_NAME = 'Café Tech avec Imen';
const MIN_DURATION = 5 * 60; // en dessous : Short, teaser ou extrait
const OUT = new URL('../src/content/podcast/', import.meta.url).pathname;
const HEADERS = { 'user-agent': 'Mozilla/5.0', 'accept-language': 'fr-FR,fr;q=0.9' };

// Thèmes détectés dans le titre et la description → tags
const TAG_RULES = [
  [/symfony/i, 'symfony'],
  [/\bphp\b/i, 'php'],
  [/\bIA\b|intelligence artificielle/, 'ia'],
  [/recrut/i, 'recrutement'],
  [/reconversion/i, 'reconversion'],
  [/craft/i, 'craftsmanship'],
  [/\bTDD\b/, 'tdd'],
  [/open[ -]?source/i, 'open-source'],
  [/manag/i, 'management'],
  [/refactor/i, 'refactoring'],
  [/architecture/i, 'architecture'],
  [/communaut|conférence|convention/i, 'communauté'],
];

// ---------- Épisodes existants ----------
const existing = readdirSync(OUT)
  .filter((f) => f.endsWith('.md'))
  .map((f) => readFileSync(join(OUT, f), 'utf8'));
const knownIds = new Set(existing.map((s) => s.match(/^youtube: .*?([\w-]{11})"?$/m)?.[1]).filter(Boolean));
let maxNumber = Math.max(0, ...existing.map((s) => Number(s.match(/^number: (\d+)/m)?.[1] ?? 0)));

// ---------- Vidéos à importer ----------
const args = process.argv.slice(2);
let targets; // [{ id, number? }]
if (args.length) {
  targets = args.map((a) => {
    const [id, n] = a.split('=');
    return { id, number: n === undefined ? undefined : Number(n), explicit: true };
  });
} else {
  const feed = await (await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, { headers: HEADERS })).text();
  targets = [...feed.matchAll(/<entry>[\s\S]*?<yt:videoId>([\w-]{11})<\/yt:videoId>[\s\S]*?<link rel="alternate" href="([^"]+)"/g)]
    .filter(([, , link]) => !link.includes('/shorts/'))
    .map(([, id]) => ({ id }))
    .reverse(); // du plus ancien au plus récent, pour numéroter dans l'ordre
}

// ---------- Helpers ----------
async function getVideo(id) {
  const html = await (await fetch(`https://www.youtube.com/watch?v=${id}&hl=fr`, { headers: HEADERS })).text();
  const json = html.match(/var ytInitialPlayerResponse = (\{.+?\});(?:var|<\/script>)/s)?.[1];
  if (!json) throw new Error(`Impossible de lire la vidéo ${id}`);
  const data = JSON.parse(json);
  return {
    title: data.videoDetails.title,
    description: data.videoDetails.shortDescription ?? '',
    seconds: Number(data.videoDetails.lengthSeconds),
    date: (data.microformat?.playerMicroformatRenderer?.publishDate ?? '').slice(0, 10),
  };
}

const EMOJI = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu;
const NAME = String.raw`\p{Lu}[\p{L}'’-]+(?:\s+\p{Lu}[\p{L}'’-]+){1,2}`;

function cleanTitle(raw) {
  return raw
    .replace(EMOJI, '')
    .replace(new RegExp(`^\\s*${PODCAST_NAME}\\s*`, 'i'), '')
    .replace(/^\s*[-–—|:]*\s*(#\s*\d+)?\s*[-–—|:]*\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function guessGuests(title) {
  const end = title.match(new RegExp(`(?:avec|de|par)\\s+(${NAME})\\s*!?$`, 'u'));
  if (end) return [end[1]];
  const start = title.match(new RegExp(`^(${NAME})(?:,|$)`, 'u'));
  return start ? [start[1]] : [];
}

function duration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h ? `${h} h ${String(m).padStart(2, '0')}` : `${m} min`;
}

// Description YouTube → Markdown. Les lignes qui se suivent en commençant par un emoji
// deviennent une liste ; hashtags, appels à s'abonner et lien vers la chaîne sont retirés.
function toMarkdown(description) {
  const lines = description
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^(#\S+\s*)+$/.test(l) && !/abonne/i.test(l) && !/^https?:\/\/(www\.)?youtube\.com\/@/.test(l));
  const isBullet = (l) => /^[^\p{L}\p{N}«“"'(@]/u.test(l);
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const listed = isBullet(lines[i]) && (isBullet(lines[i - 1] ?? '') || isBullet(lines[i + 1] ?? ''));
    if (listed && blocks.at(-1)?.list) blocks.at(-1).items.push(lines[i]);
    else if (listed) blocks.push({ list: true, items: [lines[i]] });
    else blocks.push({ list: false, items: [lines[i]] });
  }
  return blocks.map((b) => (b.list ? b.items.map((l) => `- ${l}`).join('\n') : b.items[0])).join('\n\n');
}

function summary(description) {
  const first = description
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, ' ').replace(/^[^\p{L}\p{N}«“"]+/u, '').trim())
    .find((p) => p.length > 60 && !/^[“"«]/.test(p));
  if (!first) return '';
  return first.length > 200 ? first.slice(0, 197).replace(/\s+\S*$/, '') + '…' : first;
}

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/^(.{0,50})-.*$/, (slug, cut) => (slug.length > 50 ? cut : slug));

const quote = (s) => JSON.stringify(s);

// ---------- Import ----------
let created = 0;
for (const target of targets) {
  if (knownIds.has(target.id)) continue;
  const video = await getVideo(target.id);

  if (!target.explicit && video.seconds < MIN_DURATION) {
    console.log(`⏭️  trop court, ignoré : ${video.title}`);
    continue;
  }

  const title = cleanTitle(video.title);
  const number = target.number ?? Number(video.title.match(/#\s*(\d+)/)?.[1] ?? maxNumber + 1);
  maxNumber = Math.max(maxNumber, number);
  const guests = guessGuests(title);
  const text = `${video.title}\n${video.description}`;
  const tags = TAG_RULES.filter(([re]) => re.test(text)).map(([, tag]) => tag);
  const file = join(OUT, `episode-${String(number).padStart(2, '0')}-${slugify(guests[0] ?? title)}.md`);

  const frontmatter = [
    '---',
    `title: ${quote(title)}`,
    `description: ${quote(summary(video.description))}`,
    `number: ${number}`,
    `date: ${video.date}`,
    `duration: ${quote(duration(video.seconds))}`,
    `youtube: "https://www.youtube.com/watch?v=${target.id}"`,
    `guests: [${guests.map(quote).join(', ')}]`,
    `tags: [${tags.map(quote).join(', ')}]`,
    '---',
  ].join('\n');

  writeFileSync(file, `${frontmatter}\n\n${toMarkdown(video.description)}\n`);
  knownIds.add(target.id);
  console.log(`✅ #${number} ${title}${guests.length ? ` (avec ${guests.join(', ')})` : ''}`);
  created++;
}
console.log(`\n${created} épisode(s) importé(s) dans src/content/podcast/`);
