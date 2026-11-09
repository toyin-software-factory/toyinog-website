# toyinog.com: stack spec

Status: **approved by Toyin on 2026-11-09**. Build issues are open (see Work order).
Scope source: launch scope in [PR #1](https://github.com/toyin-software-factory/toyinog-website/pull/1) (`docs/scope/`). Design source: `DESIGN.md` in the repo.
This file is committed as `docs/specs/stack.md` by the scaffold PR.

## Decisions Toyin has made

| Area      | Decision                                                                                                               |
| --------- | ---------------------------------------------------------------------------------------------------------------------- |
| Hosting   | Cloudflare                                                                                                             |
| Framework | Astro                                                                                                                  |
| Deploys   | Cloudflare Git builds: each merge to `main` uploads a dev version, each PR gets a preview link, Toyin promotes to live |
| Styling   | Plain CSS with `DESIGN.md` tokens as CSS variables, scoped component styles                                            |
| Content   | Text files in the repo (Markdown/YAML)                                                                                 |
| Contact   | Form that emails Toyin                                                                                                 |
| Photos    | Portrait on About + video thumbnails only (deliberate `DESIGN.md` exception)                                           |
| Extras    | SEO meta, share previews, cookie-free stats; no cookie banner                                                          |

## Stack

- **Astro 5, TypeScript (strict)**, static output by default. Pages are prerendered HTML with no client JS unless a component needs it.
- **`@astrojs/cloudflare` adapter, Cloudflare Workers with static assets.** Only one route runs server-side: `POST /api/contact`. Everything else is static.
- **Node 22 LTS, npm.** One `package.json`, lockfile committed.
- **Content collections** (`src/content/`) with Zod schemas:
  - `work/`: one Markdown file per case study (title, summary, role, year, links, featured flag, order).
  - `highlights/`: 3 to 6 hand-picked videos/posts (title, platform, url, thumbnail, date).
  - `site.yaml`: tagline, availability text, social links (X, YouTube, GitHub). Placeholder copy until Toyin supplies the real text.
- **Styling:** `src/styles/tokens.css` mirrors `DESIGN.md` one to one (colour, type, spacing, radius, motion); `src/styles/global.css` holds reset and base type. Components use Astro scoped `<style>`. No Tailwind, no CSS-in-JS.
- **Images:** `astro:assets` for the portrait and thumbnails (responsive sizes, lazy loading). Thumbnails are stored in the repo, not hot-linked.
- **Fonts:** self-hosted via `@fontsource` (no Google Fonts request).

## Contact form (the one backend piece)

- Astro form posts to `/api/contact` (works without JS; small progressive enhancement for inline success/error).
- **Spam protection: Cloudflare Turnstile** (free, no cookies) plus a honeypot field and server-side validation (Zod, length limits).
- **Email delivery: Cloudflare Email Routing `send_email` binding**, sending only to Toyin's verified inbox. No third-party email service and no API key. Fallback if Toyin prefers a sender like Resend later: same endpoint, one env var.
- Config via Cloudflare environment variables/secrets only: `TURNSTILE_SECRET_KEY`, destination address. Nothing in the repo.
- Rate limit: Cloudflare WAF rate-limit rule on `/api/contact` (dashboard setting, Toyin).

## SEO, share previews, stats

- Per-page `<title>`, description, canonical URL, Open Graph and Twitter card tags from one `Seo.astro` component.
- `@astrojs/sitemap` + `robots.txt`.
- Share images: one static default OG image plus per-case-study images at build time.
- **Cloudflare Web Analytics** (cookie-free, no banner), enabled from the Cloudflare dashboard.

## Repo layout

```
src/
  components/    # DESIGN.md components (Button, StatusDot, Nav, Footer, CaseCard, Seo...)
  content/       # work/, highlights/, site.yaml + config.ts schemas
  layouts/       # Base.astro
  pages/         # index, work/index, work/[slug], about, contact, api/contact.ts, 404
  styles/        # tokens.css, global.css
public/          # favicon, robots.txt, default OG image
docs/scope/  docs/specs/
AGENTS.md  DESIGN.md  wrangler.jsonc  astro.config.mjs
```

## Quality gates (CI on every PR, GitHub Actions)

- `astro check` (types + content schemas), `npm run build`, Prettier check.
- Lighthouse CI on the built site: performance, accessibility, SEO >= 95.
- **Tests only where they earn their keep:** Vitest unit tests for the contact endpoint (validation, Turnstile failure, honeypot). No tests for markup or styling.
- CodeRabbit reviews every PR. Visual PRs include a Proof section with screenshots.

## Environments

- **Dev:** every merge to `main` via Cloudflare Git builds (`*.workers.dev` dev URL).
- **Previews:** one per PR.
- **Production:** `toyinog.com`, promoted by Toyin only. Agents never touch it.

## Work order

1. Scaffold: Astro + Cloudflare adapter + wrangler + CI (Jason) in parallel with design tokens + global CSS (Mario).
2. After scaffold: content collections (Jason), contact endpoint (Jason), base layout + `DESIGN.md` components (Mario). Maria runs `/audit` to write AGENTS.md.
3. Home, Work, About pages (Mario).
4. Contact page wired to the endpoint (Mario, after Jason's endpoint merges).
5. SEO, sitemap, share images (Mario); analytics on (Toyin, dashboard).

## Things only Toyin can do

- Merge PR #1 (scope).
- Repo settings: squash merge only, auto-delete head branches.
- Cloudflare dashboard: connect the repo for Git builds, add `toyinog.com`, turn on Email Routing (verify inbox), create the Turnstile site, enable Web Analytics. We'll send a step-by-step checklist when the scaffold lands.
