import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg, initWasm } from '@resvg/resvg-wasm';

// Phosphor Console colours from DESIGN.md. Satori renders to SVG outside the
// CSS cascade, so the token values are mirrored here.
const color = {
  surface: '#001427',
  onSurface: '#e6e1d1',
  primary: '#708d81',
  tertiary: '#f4d58d',
  border: '#233c46',
};

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) =>
  readFile(require.resolve(`@fontsource/${pkg}/files/${file}`));

let wasmReady: Promise<void> | undefined;
const ensureWasm = () =>
  (wasmReady ??= readFile(
    require.resolve('@resvg/resvg-wasm/index_bg.wasm'),
  ).then((wasm) => initWasm(wasm)));

let fontsReady: ReturnType<typeof readFonts> | undefined;
const loadFonts = () => (fontsReady ??= readFonts());

async function readFonts() {
  const [voice, mono] = await Promise.all([
    font('barlow-condensed', 'barlow-condensed-latin-700-normal.woff'),
    font('ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff'),
  ]);
  return [
    { name: 'Barlow Condensed', data: voice, weight: 700 as const },
    { name: 'IBM Plex Mono', data: mono, weight: 400 as const },
  ];
}

interface CardOptions {
  legend: string;
  title: string;
  subtitle: string;
}

/** Renders a 1200x630 share card as PNG bytes. */
export async function renderCard({ legend, title, subtitle }: CardOptions) {
  const el = (
    type: string,
    style: Record<string, string | number>,
    children?: unknown,
  ) => ({ type, props: { style: { display: 'flex', ...style }, children } });

  const tree = el(
    'div',
    {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 72,
      backgroundColor: color.surface,
      border: `2px solid ${color.border}`,
      fontFamily: 'IBM Plex Mono',
    },
    [
      el(
        'div',
        {
          alignItems: 'center',
          gap: 16,
          color: color.primary,
          fontSize: 26,
          letterSpacing: 4,
          textTransform: 'uppercase',
        },
        [
          el('div', {
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: color.tertiary,
          }),
          el('div', {}, legend),
        ],
      ),
      el('div', { flexDirection: 'column', gap: 24, width: '100%' }, [
        el(
          'div',
          {
            fontFamily: 'Barlow Condensed',
            fontWeight: 700,
            fontSize: title.length > 40 ? 88 : title.length > 20 ? 104 : 128,
            lineHeight: 1,
            width: '100%',
            color: color.onSurface,
          },
          title,
        ),
        el(
          'div',
          {
            fontSize: 30,
            lineHeight: 1.5,
            color: color.primary,
            maxWidth: 960,
          },
          subtitle.length > 140 ? `${subtitle.slice(0, 137)}...` : subtitle,
        ),
      ]),
      el(
        'div',
        { fontSize: 28, color: color.tertiary, letterSpacing: 2 },
        'toyinog.com',
      ),
    ],
  );

  await ensureWasm();
  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: await loadFonts(),
  });
  return new Resvg(svg).render().asPng();
}
