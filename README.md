# toyinog.com

Influencer and portfolio site for Toyin. Astro 5 + TypeScript (strict), deployed to Cloudflare Workers with static assets.

- Stack and decisions: [`docs/specs/stack.md`](docs/specs/stack.md)
- Launch scope: [`docs/scope/`](docs/scope/)
- Design system: [`DESIGN.md`](DESIGN.md)

## Run locally

Requires Node 22 (`nvm use` reads `.nvmrc`) and npm.

```sh
npm ci
npm run dev       # dev server at http://localhost:4321
```

| Script                 | What it does                              |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Astro dev server                          |
| `npm run build`        | Production build into `dist/`             |
| `npm run preview`      | Serve the build locally (Wrangler)        |
| `npm test`             | Vitest unit tests (contact endpoint)      |
| `npm run check`        | `astro check` (types and content schemas) |
| `npm run format`       | Format with Prettier                      |
| `npm run format:check` | Verify formatting (CI runs this)          |

CI (GitHub Actions) runs the Prettier check, `astro check`, the unit tests, the build and Lighthouse CI (3 runs per page, asserted on the median run; accessibility and SEO must score 95 or more, and performance under 95 is a warning) on every pull request. To run Lighthouse locally: `npm run build && npx lhci autorun`.

## Deploys

Cloudflare Git builds deploy from `main` (dev URL) and create a preview per pull request. Production is promoted by Toyin only. `wrangler.jsonc` holds dev config only; secrets live in Cloudflare, never in the repo.

## Contact form configuration

`POST /api/contact` needs these in Cloudflare (names only, values never in the repo). Locally, put them in `.dev.vars`, which is gitignored.

| Name                   | Kind                    | Purpose                                                              |
| ---------------------- | ----------------------- | -------------------------------------------------------------------- |
| `TURNSTILE_SECRET_KEY` | secret                  | Server-side Turnstile verification                                   |
| `CONTACT_TO_EMAIL`     | variable                | Verified Email Routing destination address that receives messages    |
| `CONTACT_FROM_EMAIL`   | variable                | Sender address on the Email Routing domain (e.g. `contact@<domain>`) |
| `SEND_EMAIL`           | binding (wrangler.json) | Cloudflare Email Routing `send_email` binding                        |

The form posts `name`, `email`, `message`, `cf-turnstile-response` and a hidden honeypot field named `website` (must stay empty). Plain HTML posts get a 303 redirect to `/contact?sent=1` or `/contact?error=invalid|captcha|send|config`; requests with `Accept: application/json` get `{ ok: true }` or `{ ok: false, error }` (400, 403, 502, 500).
