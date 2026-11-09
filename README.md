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
| `npm run preview`      | Serve the built site locally              |
| `npm run check`        | `astro check` (types and content schemas) |
| `npm run format`       | Format with Prettier                      |
| `npm run format:check` | Verify formatting (CI runs this)          |

CI (GitHub Actions) runs the Prettier check, `astro check`, the build and Lighthouse CI (performance, accessibility and SEO must each score 95 or more) on every pull request. To run Lighthouse locally: `npm run build && npx lhci autorun`.

## Deploys

Cloudflare Git builds deploy from `main` (dev URL) and create a preview per pull request. Production is promoted by Toyin only. `wrangler.jsonc` holds dev config only; secrets live in Cloudflare, never in the repo.
