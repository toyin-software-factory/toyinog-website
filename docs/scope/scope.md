# Scope: toyinog.com

Toyin's personal influencer and portfolio site. It shows who Toyin is, the work worth looking at, and a way to get in touch, for hiring managers, clients and followers who skim for twenty seconds before deciding. The look is set by `DESIGN.md` (Phosphor Console).

**Build approach:** Tracer Bullet (each feature is built end to end and works before the next one starts).
**Workflow:** GA (after `/develop`: `/check verify`, tests only where they earn their keep, `/document`, then `/sync`). Code review is CodeRabbit on the pull request, so there is no separate model review step. Any feature can carry its own tag (e.g. `· Beta`) to do more or less.

_These are recommendations to keep the build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## Product decisions (from Toyin, 2026-11-09)

- **Launch pages:** Home, Work (case studies), About, Contact. Everything else waits.
- **Platforms linked:** X (`x.com/mastarhtee`), YouTube (channel link still to come), GitHub (`github.com/toyinogun`).
- **Videos and posts:** a few hand picked highlights, chosen by Toyin. No platform feeds or API keys.
- **Updating content:** text files in the repo (Markdown and data files). No admin login, no hosted editor.
- **Contact:** a contact form that emails Toyin. The address stays private.
- **Photos:** a portrait on About and video thumbnails on highlights are allowed. This is a deliberate exception to the "no photography" line in `DESIGN.md`; everything else stays type led.
- **Extras at launch:** search metadata, social share previews, and cookieless visitor stats (no cookie banner). One language (English).
- **Repo:** public on purpose.
- **Still open (Toyin skipped for now):** one line tagline, projects to feature, availability text for the status dot, YouTube channel link, deadline. Placeholder copy is fine until these arrive; they are content, not blockers.

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack & architecture | Foundation | planned |
| 2 | Coding standards & tooling | Foundation | planned |
| 3 | Content model | Foundation | planned |
| 4 | Design system & UI foundation | Foundation | planned |
| 5 | Home page | Slice 1 | planned |
| 6 | Work case studies | Slice 2 | planned |
| 7 | About page | Slice 3 | planned |
| 8 | Contact form | Slice 4 | planned |
| 9 | Search metadata & share previews | Slice 5 | planned |
| 10 | Cookieless visitor stats | Slice 6 | planned |

## Foundations

### 1. Stack & architecture · needs a decision
Pick the framework, hosting and how the dev environment deploys, then scaffold a runnable project every later slice builds on.
**Done when:** the stack is recorded in an approved spec, and the empty scaffold boots locally, builds, and deploys to the dev environment.
- [ ] Decide the stack (spec): `/architect stack & architecture`

### 2. Coding standards & tooling
Capture conventions from the real scaffolded project, then install lint, format, type checks and CI.
**Done when:** root `AGENTS.md` reflects the real stack, and lint, format, type check and CI run clean on a pull request.
- [ ] Capture conventions + tooling choices: `/audit`

### 3. Content model · needs a decision
The shape of the text files that hold projects, highlights, profile details and links, so Toyin can change content without touching code.
**Done when:** projects, highlights and profile data live in typed content files, a bad file fails the build with a clear message, and adding a project is one new file.
- [ ] Design it (spec): `/architect content model`

### 4. Design system & UI foundation · needs a decision
Turn `DESIGN.md` into tokens and base components (panel with corner brackets, legend, buttons, link, chip, status dot, input, readout, left rail layout), and record the photo exception.
**Done when:** every token in `DESIGN.md` exists in code, base components meet WCAG 2.2 AA with visible focus and keyboard use, reduced motion stops the pulse and cursor, and the rail collapses below 960px.
- [ ] Design it (spec): `/architect design system & UI foundation`

## Slice 1: Home page

### 5. Home page · needs a decision
The first screen: name, one line claim, one lit control, the left rail readout (role, location, local time, availability, links), the ruled project table and the highlights. This slice is the walking skeleton: content files through to a deployed page.
**Done when:** Home renders from content files on the dev environment, shows the rail, project table and highlights with thumbnails, has exactly one lit primary control per viewport, and works from 320px wide upward.
- [ ] Design it (spec): `/architect home page`

## Slice 2: Work case studies

### 6. Work case studies
One page per project in the problem, decision, outcome shape, linked from the project table.
**Done when:** each project file produces its own page at a stable URL, the project table links to it, and a missing project returns a styled not found page.
- [ ] Build it: `/develop work case studies`

## Slice 3: About page

### 7. About page
A short bio with Toyin's portrait, and the platform links.
**Done when:** About renders from a content file, the portrait has alt text and is served in modern formats at the right sizes, and the platform links work.
- [ ] Build it: `/develop about page`

## Slice 4: Contact form

### 8. Contact form · needs a decision
A form that sends a visitor's message to Toyin by email without exposing the address.
**Done when:** a valid message reaches Toyin's inbox, invalid input shows inline errors (never colour alone), spam is filtered, the visitor sees a clear sent or failed state, and no secret reaches the browser.
- [ ] Design it (spec): `/architect contact form`

## Slice 5: Search metadata & share previews

### 9. Search metadata & share previews
Titles, descriptions, canonical URLs, sitemap, robots file and social share cards for every public page.
**Done when:** every page has a unique title and description, a sitemap and robots file are served, and a shared link shows a styled preview card on X.
- [ ] Build it: `/develop search metadata & share previews`

## Slice 6: Cookieless visitor stats

### 10. Cookieless visitor stats · needs a decision
Privacy friendly page view stats that set no cookies, so no consent banner is needed.
**Done when:** page views are recorded without cookies, Toyin can see them on a dashboard, and the site still works if the stats script is blocked.
- [ ] Design it (spec): `/architect cookieless visitor stats`

## Deferred
Out of scope for the launch, kept so the plan stays honest.
- **Content hub**: a page of latest videos and posts · needs a decision
- **Media kit**: audience stats, rates and past brand work for sponsors
- **Writing**: articles hosted on the site · needs a decision
- **Newsletter**: email signups · needs a decision
- **Automatic YouTube feed**: latest videos pulled in · needs a decision
- **Booking link**: book a call from Contact
- **Second language** · needs a decision

## Legend

**The decision box.** Every feature carries exactly one, the sub task whose label ends with `(spec)`. Its wording varies (`Design it (spec)` normally, `Decide the stack (spec)` on Stack & architecture), so skills find it by that `(spec)` suffix, never by an exact label. Every other box is an execution box and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves; each row is what it shows and who sets it:

| State | Set by | The feature shows |
|---|---|---|
| `planned` · needs a decision | `/scope` | one box: `Design it (spec): /architect <feature>` |
| `in-progress` (designed) | **`/architect` at spec capture** | `Design it` ticked; spec linked; `Build it: /develop <feature>` + **2 to 5 milestones**; the closing boxes for the tier; any surfaced follow up enrolled |
| `in-progress` (building) | `/develop` | milestone sub boxes tick one by one; code pointer filled |
| `in-progress` (verified) | `/check verify` | `Build it` + milestones ticked; `Verify it` ticked |
| `done` | **you, when you decide it is**; `/sync` reconciles | boxes you ran ticked, skipped ones marked skipped |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise straight to `/develop` (or `/audit` for standards & tooling). The tag drops once the spec is captured.
- **Atomic build tasks live in the spec's `## Build plan`, not here**: the scope carries only the milestone rollup.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (from before this workflow) and `dropped` (taken out of scope, kept for history).
- **Approach tag** beside a heading (e.g. `· Facade`) overrides the project default for that feature; no tag means it inherits.
- **Workflow tier tag** beside a heading (e.g. `· Beta`) sets that one feature's rigor; no tag inherits the default.
- **Pointer line** (`spec <n> · code in <path>`): the spec link added by `/architect`, the code path by `/develop`.
