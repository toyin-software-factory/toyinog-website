---
version: alpha
name: Phosphor Console
description: Dark-only portfolio system for toyinog.com — an instrument panel in which exactly one lamp is lit at a time. Read by hiring managers and clients who skim for 20 seconds, then by engineers who stay for the case studies.

colors:
  primary: "#708d81"
  secondary: "#a0b8ad"
  tertiary: "#f4d58d"
  tertiary-strong: "#fae7af"
  neutral: "#0e1f30"
  surface: "#001427"
  on-surface: "#e6e1d1"
  border: "#233c46"
  error: "#e98664"

typography:
  display:
    fontFamily: Barlow Condensed
    fontSize: 96px
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Barlow Condensed
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Barlow Condensed
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
  body-lg:
    fontFamily: IBM Plex Mono
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.65
  body-md:
    fontFamily: IBM Plex Mono
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  label-caps:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.14em
  label-strong:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.14em
  data-md:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
    fontFeature: "'tnum' 1, 'zero' 1"
  data-sm:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.04em
    fontFeature: "'tnum' 1, 'zero' 1"

rounded:
  none: 0px
  sm: 2px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  xxl: 128px
  gutter: 24px
  margin: 48px

components:
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  heading-hero:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.display}"
  heading-section:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-lg}"
  heading-project:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-md}"
  heading-minor:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-sm}"
  prose-lead:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
  text-meta:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
  text-legend:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
  panel:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  panel-legend:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
    padding: "{spacing.sm}"
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.tertiary}"
    typography: "{typography.body-md}"
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-strong}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  button-primary-hover:
    backgroundColor: "{colors.tertiary-strong}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  chip-stack:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.data-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
  status-live:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.surface}"
    typography: "{typography.data-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  input-error:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
  readout:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.data-md}"
---

# Phosphor Console

## Overview

toyinog.com is an instrument panel that has been switched on. The page is dark and quiet; labels are silkscreened onto the chassis; and at any moment **one lamp is lit** — the single thing the visitor can act on, or the single thing that is currently alive (availability, the latest project, the cursor). Everything else is unlit glass.

The direction is Retro-Futurist HUD, held back on purpose: the instrument-panel *logic* (legends, readouts, bracketed panels, hairline rules, tabular figures) without the costume (no scanlines, no grain, no neon, no CRT curvature). It reads as a person who builds systems and cares how they are labelled. The audience skims for twenty seconds before deciding, so the first screen has to show a name, a one-line claim, and one lit control — nothing competes with them.

**What this system gives up, knowingly.** Warmth and approachability for non-technical visitors. Comfortable long-form reading, because body copy is monospace; case studies must therefore be short, structured, and scannable rather than essayistic. Photography-led storytelling, because the palette has no room for a hero image. If a future screen needs any of those, the answer is a different page, not a softer system.

## Colors

The palette is three pigments and the neutrals derived between them.

The ground is the dark end of a **cyanotype** — the Prussian blue of blueprint paper and of a monitor that is on but showing nothing. It is chosen because it is far darker and more saturated than the slate-navy that most dark interfaces default to, so it reads as a material rather than a template. The legend colour is the **grey-green enamel of 1970s test-equipment chassis**, the paint that panel silkscreen was printed onto. Lit parts are the warm white-gold of a **tungsten indicator lamp behind a lens**.

- **Primary (#708d81):** Chassis enamel — the structural voice. Silkscreen legends, section indices, bracket marks, form-field outlines, and the quiet "unlit" state of anything interactive. Measures about 5.1:1 on the ground and 4.6:1 on raised panels, so it passes AA in both places but has no headroom — keep it to short labels and outlines, never paragraphs.
- **Secondary (#a0b8ad):** Pale enamel — readable muted text: metadata, captions, dates, stack chips. The lighter step of the same sage ramp, so metadata never looks like a different family.
- **Tertiary (#f4d58d):** The lit lamp — the sole driver of interaction and liveness. Primary action, inline links, the live-status dot, the focus ring. Held under roughly 5% of the surface; if two jasmine things are visible in one viewport and neither is the other's state, one of them is wrong.
- **Tertiary-strong (#fae7af):** The lamp at full brightness — hover and pressed state of the lit control only. It is never a resting colour.
- **Surface (#001427):** Cyanotype ground — the page.
- **Neutral (#0e1f30):** One lift above the ground — panels and inputs. In dark interfaces raised means lighter, never shadowed.
- **On-surface (#e6e1d1):** Phosphor at rest — jasmine drained to near-white, so long text is warm without being yellow and without competing with the lit accent.
- **Border (#233c46):** Hairline teal-blue — rules and panel edges. Deliberately low contrast: it groups, it does not outline controls (controls use primary).
- **Error (#e98664):** Hot filament — a warm vermilion pulled from the jasmine family, not a stock alert red. Always paired with text or an icon, never colour alone.

Neutrals are all tinted: the raised surface and border lean toward the ground's blue, the text toward jasmine's warmth. There is no pure white and no pure black anywhere.

## Typography

Two faces that differ by classification, with distinct jobs. Both are open-source (SIL OFL) and ship on Google Fonts.

**Barlow Condensed** (voice) carries the name, section titles, and project titles — a condensed grotesque descended from DIN road and instrument signage, loud at 96px without being decorative. Set only at weight 700, always sentence case, tight leading (0.96 at display, rising to 1.2 at 24px) and slightly negative tracking that relaxes as size falls. Fallback: `'Arial Narrow', 'Helvetica Neue', sans-serif`.

**IBM Plex Mono** (apparatus) carries everything else: body copy, legends, readouts, nav, buttons. Chosen over JetBrains Mono because its slab details on i, l and r give running prose some cadence, and because it has real italics. Two weights only, 400 and 700, far apart. Uppercase legends are tracked +0.14em — uppercase set solid looks broken. Numerals use tabular and slashed-zero features everywhere they appear. Fallback: `ui-monospace, 'SF Mono', Menlo, monospace`.

The scale steps at roughly 1.5× at the top (96 → 56 → 36 → 24) because a portfolio's display end should feel like a jump, then drops into small, even mono sizes (17 / 15 / 13 / 11). Hold body measure to 64 characters — at 15px Plex Mono that is about 580px.

## Layout

Twelve columns on an 8px base, 24px gutters, 48px outer margin at desktop. The composition is **asymmetric and fixed**: a four-column left rail that stays put (name, role, location and local time, availability, links — the "readout") and an eight-column working area to its right that scrolls. Only the rail and the top header (nav) may be sticky; nothing else.

Density is deliberately uneven. The hero is sparse — a very large name, one line of claim, one lit button, nothing else. The work index below it is dense: a ruled table of projects with year, stack and outcome in aligned columns, because a list of work is a table and not a grid of cards. Sections that belong together sit 32px apart; unrelated sections sit 128px apart. That difference is the page's phrasing — do not equalise it.

Breakpoints: below 960px the rail collapses into a single readout strip above the content, the grid becomes a single column, and the display size drops to 56px with the scale following. Body size and measure never change.

## Elevation & Depth

There are no shadows. Depth comes from three things only: tonal lift (panels and inputs sit one step lighter than the ground), 1px hairline rules, and spacing.

The single exception is **glow on the live-status dot** — a 12px blur at about 25% of the lamp colour, on that one element, because it is the one thing on the page that is actually emitting light. Glow never appears on text, buttons, cards or hover states. Overlays (menus, a lightbox) are the only things that sit "above" the page; they take the neutral fill, a border-colour edge, and nothing else.

## Shapes

Radius is hierarchical and mostly zero. **Panels, tables, images and project blocks are square (0px)** — chassis plates are cut, not moulded. **Buttons, inputs and chips take 2px** — just enough to read as a part you can operate. **Only the status dot is fully round**, because a lamp is the one round thing on a panel.

Panels are identified by a 1px border-colour edge plus 8px corner brackets drawn in primary on all four corners, as on a framed readout. The brackets are the only decoration in the system and appear on panels, never on buttons. Form-field outlines use primary (not border) so the control boundary clears 3:1 against the ground.

## Components

- **Hero heading:** Display size, on-surface, flush-left, never centred, never gradient. Sentence case. A blinking block cursor in tertiary may follow the final word once, as the page's one animated element at load.
- **Legend / index labels:** Uppercase label-caps in primary, e.g. `01 / WORK`. They number the sections like panel positions and are the main way the page signals hierarchy between headings.
- **Primary button:** Lit lamp fill, Prussian-dark text, 2px radius, uppercase bold label. One per viewport. Hover brightens to tertiary-strong; focus draws a 2px tertiary ring offset 2px.
- **Secondary button:** Unlit — ground fill, on-surface text, 1px primary outline. On hover the outline switches to tertiary; the fill never changes.
- **Link:** Inline links are tertiary with a 1px underline offset 3px. Visited links do not change colour; this is a portfolio, not a document trail.
- **Project row / panel:** Neutral fill, square, bracketed corners, a primary legend in the top-left (`PROJECT 03`), a headline-md title, one-sentence outcome in body-md, stack as chips, year in data-md. At most one lit control per panel.
- **Stack chip:** Neutral fill, secondary text, data-sm, 2px radius, no border. Chips are facts, not controls — they never take the accent.
- **Status-live:** Jasmine dot with soft glow plus a text label (`AVAILABLE — MAR 2027`). Colour is never the only carrier of the state. This is the only element that pulses; it fades between 55% and 100% opacity over 2.4s, and stops entirely under reduced-motion.
- **Input:** Neutral fill, 2px radius, 1px primary outline, on-surface text. Focus swaps the outline to tertiary. Error swaps it to error and adds an inline message and a leading `!` — never colour alone.
- **Readout:** Tabular data in data-md — local time, location, build count — aligned on a baseline in the left rail.

## Do's and Don'ts

- Do keep Jasmine to one meaning: *this can be acted on, or this is alive.* If an element is neither, it is not jasmine.
- Do light at most one primary control per viewport and let everything else stay unlit.
- Do set every number in tabular, slashed-zero Plex Mono, including years and dates.
- Do align content to the twelve-column grid and keep the left rail on columns 1–4.
- Do express hierarchy with size, tracking, and the two weights — and with spacing — before reaching for colour.
- Do keep case studies structured: problem, decision, outcome, in short blocks. Body copy is monospace and long paragraphs cost the reader.
- Don't add a second accent. If something needs emphasis, use weight 700, a size step, or space.
- Don't use glow, bloom, scanlines, grain, gradients or blur anywhere except the single glow on the live-status dot.
- Don't use shadows, glassmorphism, or tinted rounded-square icon containers.
- Don't centre body text or the hero; there is no centred layout in this system.
- Don't use weights between 400 and 700, or add a third typeface — not even for a quote.
- Don't use pure white or pure black, and don't introduce a grey with equal R, G and B.
- Don't animate on scroll. Nothing fades up, slides in, or parallaxes; the only motion is the one-time hero cursor, the live-dot pulse, 120ms colour changes on hover and focus, and a 200ms ease-out for overlays entering (leaving is instant).
- Don't tell a visitor something only through colour: pair error, live and selected states with text or a glyph.
- Don't set body measure wider than 64 characters or smaller than 15px.
