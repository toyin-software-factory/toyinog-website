import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      role: z.string(),
      year: z.number().int().min(2000).max(2100),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
      featured: z.boolean().default(false),
      order: z.number(),
      cover: image().optional(),
    }),
});

const highlights = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/highlights' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      platform: z.enum(['youtube', 'x', 'github']),
      url: z.string().url(),
      thumbnail: image(),
      date: z.coerce.date(),
    }),
});

// Single entry (id: "site") loaded from src/content/site.yaml.
const site = defineCollection({
  loader: glob({ pattern: 'site.yaml', base: './src/content' }),
  schema: z.object({
    name: z.string().trim().min(1),
    tagline: z.string(),
    descriptor: z.string().optional(),
    availability: z.string(),
    socials: z.object({
      x: z.string().url(),
      github: z.string().url(),
      youtube: z.string().url(),
    }),
  }),
});

// Single entry (id: "about") loaded from src/content/pages/about.md.
const pages = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      heading: z.string(),
      portrait: image(),
      portraitAlt: z.string().min(10),
    }),
});

export const collections = { work, highlights, site, pages };
