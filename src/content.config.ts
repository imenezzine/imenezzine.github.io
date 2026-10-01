import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const md = (dir: string) => glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${dir}` });

const articles = defineCollection({
  loader: md('articles'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lang: z.enum(['fr', 'en']).default('fr'),
    // URL d'origine si l'article a d'abord été publié ailleurs (Medium…)
    canonical: z.string().optional(),
    // URL de la version dans l'autre langue
    translation: z.string().optional(),
  }),
});

const talks = defineCollection({
  loader: md('talks'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    event: z.string(),
    eventUrl: z.string().optional(),
    date: z.coerce.date(),
    location: z.string(),
    lang: z.enum(['fr', 'en']).default('fr'),
    format: z.enum(['conférence', 'lightning talk', 'meetup']).default('conférence'),
    cospeakers: z.array(z.string()).default([]),
    slides: z.string().optional(), // URL (Speaker Deck, Slidev…) ou chemin vers un PDF dans /public
    video: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const ideas = defineCollection({
  loader: md('idees'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: z.enum(['graine', 'pousse', 'arbre']).default('graine'),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: md('projets'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().optional(),
    repo: z.string().optional(),
    stack: z.array(z.string()).default([]),
    status: z.enum(['actif', 'en pause', 'archivé']).default('actif'),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const podcast = defineCollection({
  loader: md('podcast'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    number: z.number(),
    date: z.coerce.date(),
    duration: z.string().optional(), // ex. "42 min"
    youtube: z.string().optional(), // lien de la vidéo YouTube de l'épisode
    audio: z.string().optional(), // URL du fichier mp3
    embed: z.string().optional(), // URL d'iframe (Ausha, Spotify…)
    guests: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const retours = defineCollection({
  loader: md('retours'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // Soit un épisode de ton podcast…
    episode: reference('podcast').optional(),
    // …soit un épisode d'un autre podcast
    podcast: z.string().optional(),
    url: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const til = defineCollection({
  loader: md('til'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

// Commentaires positifs laissés sous les épisodes YouTube (sélectionnés à la main, anonymisés)
const commentaires = defineCollection({
  loader: file('./src/content/commentaires.json'),
  schema: z.object({
    episode: reference('podcast'),
    text: z.string(),
    month: z.string(), // AAAA-MM (YouTube ne donne qu'une date approximative)
    url: z.string(), // vidéo de l'épisode
    role: z.string().optional(), // ex. « invité »
  }),
});

export const collections = { articles, talks, ideas, projects, podcast, retours, til, commentaires };
