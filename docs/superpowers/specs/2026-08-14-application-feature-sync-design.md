# Application Feature Sync

**Date:** 2026-08-14  
**Repo:** `kata-website`  
**Companion application:** `judo-kata-tournament-manager`  
**Status:** Approved design; awaiting written-spec review

## Goal

Bring the marketing site up to date with user-facing features shipped in the
application since the website's 12 August update. Explain each capability where
an organiser encounters it in the existing event workflow, using one or two
plain-language paragraphs per feature and current application screenshots where
the interface provides useful evidence.

## Source of truth

Claims must match the application as of 14 August 2026, particularly its Config,
Competitors, Pairs, Draw, Mat clerk, and How to pages. The new shipped feature
groups are:

1. IJF scoring
2. Selectable current or IJF competition formula
3. Seeded preliminary-group draws
4. Nationality-aware judge seating and replacement
5. Optional Senior/U23 registration checks

Frontend validation, AlmondCSS updates, internal architecture changes, and
unfinished backlog items are not product features and will not be marketed.

## Page structure

Keep the current single-page information architecture, navigation, design,
lightbox, contact details, memorial, and footer. Do not add a separate
“IJF-ready” section. Integrate each capability into the point in the workflow
where it matters.

### Config

Use no more than two paragraphs. Explain that organisers can select EJU,
kata-judge/BJA-style, or IJF scoring independently from the competition formula.
Describe the current and IJF formula cut-offs accurately. Then introduce the
nationality policy and optional Senior/U23 registration mode as event-level
controls.

Replace `screenshots/Config.png` with a current capture that clearly shows the
new Scoring rules, Competition formula, Judge nationality policy, and
Registration rules controls.

### Competitors

Use one or two paragraphs. Keep manual, CSV, and Judobase import coverage, then
explain that birth year and grade support eligibility checks when registration
rules are enabled. State that invalid entries are blocked and that Judobase
cannot supply birth year or grade, so registration rules must be off for that
import path.

Replace `screenshots/Competitors-Kata.png` with a current capture showing the
Birth year and Grade columns populated with representative demo data.

### Pairs

Use one or two paragraphs. Explain that organisers choose a Senior or U23
division when registration checks are enabled, and can assign an optional seed
rank. Describe seeds as heads of series used to spread ranked pairs across
two-group preliminaries; performance order within a group remains random.

Replace `screenshots/Pairs-Kata.png` with a current capture showing Division and
Seed columns with representative values.

### Draw

Use one or two paragraphs. Replace the site's current claim that pair count
always selects one fixed formula. Explain both choices:

- Current: up to 6 direct final; 7–11 one preliminary with top 4 advancing;
  12 or more two groups with top 3 from each.
- IJF: up to 6 direct final; 7–9 one preliminary with top 6 advancing; 10 or
  more two groups with top 3 from each.

Explain that the selected formula controls draw grouping and advancement, while
the optional seeds are split between two preliminary groups. Explain that
automatic panel seating prefers judges who do not share either competitor's IOC
country according to the configured hard or soft policy.

Keep the existing Draw screenshot unless a fresh running-app capture visibly
communicates one of these behaviours better. The current Draw page mainly shows
panel seating, so copy is expected to carry the formula and seeding details.

### Mats

Use one or two paragraphs. Describe the PIN-protected mat clerk as the event-day
supervisor. Explain that the clerk sees a warning when an official judge shares
tori or uke's IOC country and can choose an eligible replacement for the
current performance, or the on-deck performance before scoring starts.

State that replacement is deliberately blocked if the seat has submitted or
saved scores; the clerk must unsubmit first. Replacement affects only that
performance, and shadow seats are excluded from the nationality rule.

Replace `screenshots/Mats-Clerk.png` with a staged current capture showing the
“Mat clerk / supervisor” label, nationality warning, and Replace control. Use
demo data only and avoid leaving the application database in an unexplained
state after capture.

### Scoring

Update “Scoring you can trust” so IJF is a complete third ruleset:

- EJU behaviour remains unchanged.
- kata-judge/BJA-style behaviour remains unchanged.
- IJF discards per technique: five official judges drop high and low, four drop
  low, and three or fewer keep all. Technique scoring follows EJU bounds, and
  any official forgotten mark halves the pair total once.

Keep the explanation readable for organisers. Put implementation-level edge
cases only where they affect event setup or expected totals. Continue to state
that shadow seats do not count.

## Registration claims

The site may describe these exact optional checks:

- Off is the default and preserves ordinary club-event entry.
- Senior: both partners are at least 16 by calendar year and at least 1st Dan;
  one Senior pair per person; any included kata.
- U23: both partners are 16–22 by calendar year and at least 1st Kyu;
  Nage-no-Kata, Ju-no-Kata, or Katame-no-Kata only; up to two U23 pairs per
  person.
- Both permits a division choice per pair and applies each division's limits
  separately.

Do not claim federation entry caps; they remain deferred.

## Screenshot capture

Capture screenshots from the real application, not mockups. Reuse the website's
established framing: approximately 1280px browser viewport, output near 1046px
wide, no browser chrome, explicit image dimensions in HTML, descriptive alt
text, captions, lazy loading, and lightbox support.

Required replacements:

| File | Required evidence |
|---|---|
| `screenshots/Config.png` | Four new/expanded event controls |
| `screenshots/Competitors-Kata.png` | Birth year and grade |
| `screenshots/Pairs-Kata.png` | Division and seed |
| `screenshots/Mats-Clerk.png` | Supervisor label, conflict, and replacement |

Recapture other existing images only if application state changes or the current
UI makes them materially stale. Do not add decorative screenshots that repeat
the copy.

## Copy and tone

- Use direct second person and concrete event language.
- Lead with what the capability helps the organiser do, then explain the rule.
- Give each new feature one or two paragraphs in its relevant workflow
  subsection.
- Avoid slogans such as “powerful”, “seamless”, or “revolutionary”.
- Preserve the existing human, practical tone and primary email CTA.
- Avoid presenting IJF-specific controls as requirements for small or local
  events; they are optional.

## Accessibility and SEO

Preserve one `h1`, logical headings, landmarks, keyboard focus, responsive
tables/images, meaningful alt text, and captions. Update the meta description
and structured-data description only if the revised body copy makes the current
summary materially incomplete; do not stuff every new feature into metadata.

## Expected files

- `index.html`
- `screenshots/Config.png`
- `screenshots/Competitors-Kata.png`
- `screenshots/Pairs-Kata.png`
- `screenshots/Mats-Clerk.png`
- `css/kata.css` only if current screenshots or copy reveal a real layout need
- This design specification

## Verification

1. Compare every new claim with the current application UI, Help page, and
   implemented rules.
2. Confirm each new capability receives one or two paragraphs and is not
   needlessly repeated.
3. Confirm all referenced images exist, match their declared dimensions, and
   show the intended feature.
4. Validate the static HTML and CSS.
5. Check the page at narrow and desktop widths, including tables, figures,
   navigation, and lightbox.
6. Read the full page once for consistent terminology and natural tone.

## Success criteria

- All five shipped feature groups are accurately represented.
- Features remain integrated into the existing workflow rather than becoming a
  disconnected promotional section.
- Every new feature has one or two useful, human-sounding paragraphs.
- The four required screenshots visibly demonstrate the current application.
- No internal-only work or unfinished backlog item is presented as shipped.
- The page remains accessible, responsive, factual, and consistent with its
  existing voice.
