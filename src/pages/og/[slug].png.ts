import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderCard } from './_card';

// One share card per case study, rendered at build time.
export const getStaticPaths = (async () => {
  const entries = await getCollection('work');
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: { title: entry.data.title, summary: entry.data.summary },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderCard({
    legend: 'Case study',
    title: props.title,
    subtitle: props.summary,
  });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
