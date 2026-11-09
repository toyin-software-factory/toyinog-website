# toyinog.com

Toyin's influencer and portfolio site. Look and feel: [`DESIGN.md`](DESIGN.md). What to build: [`docs/scope/`](docs/scope/). How: [`docs/specs/stack.md`](docs/specs/stack.md).

## Stack

- **Language / Runtime**: TypeScript (strict), Node 22 (`.nvmrc`)
- **Framework**: Astro 5, static output; only `POST /api/contact` runs server side (`export const prerender = false`)
- **Hosting**: Cloudflare Workers with static assets (`@astrojs/cloudflare`, `wrangler.jsonc`), deployed by Cloudflare Git builds
- **Key dependencies**: Astro content collections (Zod schemas), Cloudflare Turnstile, Cloudflare Email Routing `send_email` binding, `@fontsource` fonts
- **Styling**: plain CSS; tokens in `src/styles/tokens.css` mirror `DESIGN.md`; scoped `<style>` per component. No Tailwind, no CSS in JS
- **Package manager**: npm (lockfile committed)

## Build approach

**Tracer Bullet**: each feature is built end to end and works before the next one starts.

## Commands

```bash
npm ci                  # install
npm run dev             # dev server, http://localhost:4321
npm run build           # build into dist/
npm run check           # astro check: types and content schemas
npm run format          # Prettier, write
npm run format:check    # Prettier, verify (CI)
npm run build && npx lhci autorun   # Lighthouse locally
```

## Specs

Stored in `docs/specs/`. The approved stack spec is `docs/specs/stack.md`.

## Rules

- Pages and components are plain functions of their props and content: no shared mutable state, side effects (fetch, email, env) only in `src/pages/api/`.
- Content lives in `src/content/` as Markdown or YAML with a Zod schema. Never hard code copy in components; a bad content file must fail the build.
- Use only `DESIGN.md` tokens (`var(--…)`) for colour, type, spacing, radius and motion. No raw hex values or magic numbers in components.
- Ship no client JavaScript unless a component truly needs it; forms must work without JS.
- Accessibility baseline is WCAG 2.2 AA: visible focus, full keyboard use, `prefers-reduced-motion` respected.
- Photos are allowed only for the About portrait and highlight thumbnails (deliberate `DESIGN.md` exception), via `astro:assets`, stored in the repo.
- Secrets (`TURNSTILE_SECRET_KEY`, the destination email) live in Cloudflare only. Never commit, log or print them.
- Validate every server input with Zod and length limits; never trust form data.

## Tooling

- Checks: Prettier (with `prettier-plugin-astro`) and strict TypeScript via `astro check`. No ESLint and no commit hooks (Toyin's choice, 2026-11-09).
- CI (`.github/workflows/ci.yml`) on every PR: Prettier check, `astro check`, build, Lighthouse CI (performance, accessibility, SEO each at least 95).
- Tests only where they earn their keep: Vitest for the contact endpoint. No tests for markup, styling or trivial code.

## Git

- integration: on. One Paperclip issue is one branch and one PR, titled `[SOF-NN] …`.
- Squash merge only; a PR is merged by Maria (CTO), never by its author.
- Every PR waits for CodeRabbit on the latest commit, resolved threads and green CI, and includes its `/sync` changes. Visible changes need a "Proof" section with screenshots.
- Merges deploy to the dev environment only. Toyin alone promotes to production.

## Context files

<!-- Nested AGENTS.md files are listed here as they are created -->

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
