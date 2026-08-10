# Marketing Site Refresh Design

**Date:** 2026-08-10  
**Repo:** `kata-website` (static site for https://katajudo.com / GitHub Pages)  
**Companion product:** `judo-kata-tournament-manager`  
**Status:** Approved direction; awaiting user review of this written spec before implementation planning

## Goal

Refresh the single-page marketing site so it sells the system using accurate capabilities from the codebase, with corrected spelling/grammar, improved accessibility, and stronger on-page/technical SEO — without becoming a multi-page site or a full custom design system.

## Decisions already agreed

| Topic | Choice |
|-------|--------|
| Scope | Full marketing refresh; still one static HTML page |
| Audience | Equal pitch to organisers and judges; short developer note |
| Visual | Keep AlmondCSS; extend `kata.css` for clearer marketing layout |
| Memorial | Keep Michel Kozlowski section near bottom, after CTA |
| Approach | Content-first restructure (hero → benefits → workflow → scoring → deploy → CTA → memorial → footer) |

## Non-goals

- Multi-page blog, docs site, or app UI redesign
- Custom design system replacing AlmondCSS
- Claiming unshipped features (TV overlays, live website feeds) as current
- Search Console / analytics / backlink campaigns
- Opening the private application repo publicly

## Page information architecture

Single `index.html` with this section order:

1. **Skip link** to `#main`
2. **Hero** — brand name, one headline, one supporting sentence, primary CTA (email for demo / test event)
3. **Why it helps** — two short bullet groups: Organisers / Judges
4. **How an event runs** — Competitors → Pairs → Judges → Draw → Scoresheets → Leaderboards → Progress; reuse existing screenshots with improved captions and alt text
5. **Scoring you can trust** — EJU/IJF-aligned rules implemented in code; supported kata list
6. **Runs where you need it** — browser multi-user, LAN/offline, SQLite per event, Docker; mention future audience features carefully as planned, not shipped
7. **Interested?** — CTA: demo, sandbox access, parallel run at a real event; contact email
8. **Memorial** — Michel Kozlowski dedication (existing content, copy-edited)
9. **Further reading** — Kodokan, IJF, historic scoresheets links (HTTPS where possible)
10. **Footer** — contact, stack, AGPL link, website GitHub link, short developer contribute note

Optional in-page nav anchors (Organisers/Judges → Why; Workflow; Scoring; Get a demo) are allowed if they stay minimal and keyboard-friendly.

## Content sourced from the codebase (shipped claims only)

Use these as marketing facts; do not invent beyond them:

- Central web app (Mojolicious + Perl); multi-user via browser
- Competitors, pairs, judges, scoresheets, leaderboards, draw, progress/summary
- CSV import for competitors and judges (routes and controllers present in the app)
- Supported kata from `Judo::Kata::Structure`: Ju No Kata, Katame No Kata, Kime No Kata, Kodokan Goshin Jutsu, Nage No Kata, Nage No Kata 1G/2G/3G, Katame No Kata 1G
- Scoring calculator behaviour: technique mistakes / correction value / forgotten technique (halve once, ceil); drop highest and lowest judge totals when ≥3 judges; EJU-style tie-breaks (big → medium → small mistakes → average); competition formula by pair count (≤6 direct final; 7–11 one prelim advance 4; ≥12 two prelims advance 3 per group)
- Offline/local primary machine; LAN for multiple devices (`docs/03-system-scope-and-context.md`)
- SQLite database per event; Docker run documented in product README
- AGPL licensing; active volunteer development

**Do not claim as current product features:** TV graphics overlays, live results push to external websites — keep as future/audience possibilities only.

**Tone:** Confident product pitch for organisers and judges, still inviting demos and test events (software not positioned as finished commercial distribution).

## Visual / CSS

- Keep `css/almond.css`
- Extend `css/kata.css` for:
  - Hero composition and readable max-width content column
  - Clear section spacing and heading hierarchy
  - Optional subtle section separation (not a card-heavy dashboard)
  - Skip-link and improved `:focus-visible` styles if Almond defaults are weak
- Reuse existing assets: container diagram, screenshots, memorial photo, favicons
- Prefer Impact-based title styling already in `kata.css` only where it fits the hero; body copy remains Almond defaults for readability

## Accessibility requirements

- `lang="en"`; viewport `width=device-width, initial-scale=1`
- Landmarks: `header`, `main`, `footer` (and `nav` only if in-page links are added)
- One `h1`; no skipped heading levels
- Informative images have descriptive `alt`; decorative treatment only where appropriate
- Memorial photo needs meaningful `alt`
- Scoresheet screenshot currently missing `alt` — fix
- Valid HTML: no `<ul>` nested inside `<p>`; close all `<li>` elements
- Consistent contact address: `lw@judocoach.com` (fix typo `judococh.com` in body)
- External links: clear text; `rel="noopener noreferrer"` if opening new tabs
- Keyboard focus visible throughout

## Spelling and grammar

Full editorial pass on all user-facing copy. Known issues to fix include (non-exhaustive): “This site to home”, “Special chracter”, “Are scoresheets”, “in in multiple”, “currently do a random draw”, “There is a online”, “Running it is parallel”, plus awkward phrasing throughout the hero and feature sections. Replace dated “Update Jan 2024” bullet dump with integrated feature narrative.

## SEO requirements

**On-page**
- Title (~60 chars) including primary phrase (e.g. judo kata tournament manager / scoring software)
- Meta description (~150–160 chars) stating value for organisers and judges
- Remove reliance on outdated keyword-stuffing meta as a ranking strategy
- Canonical: `https://katajudo.com/`
- Open Graph + Twitter tags (title, description, image — container diagram or representative screenshot)
- Single H1; H2s aligned to major sections
- Prefer HTTPS for outbound judo reference links where available

**Technical**
- Fix `site.webmanifest` empty `name` / `short_name`; ensure icon paths work on custom domain and GitHub Pages
- Add `robots.txt` and `sitemap.xml` pointing at the canonical homepage
- JSON-LD: `SoftwareApplication` (or `WebApplication`) plus contact/`Person` or `Organization` as appropriate
- Keep image dimensions / lazy-loading below the fold for CLS hygiene
- Update footer copyright year range through 2026

**Out of scope:** Google Search Console configuration, Core Web Vitals field monitoring, multi-URL crawl campaigns

## Files expected to change

| File | Change |
|------|--------|
| `index.html` | Full content restructure, a11y, SEO head tags, JSON-LD |
| `css/kata.css` | Marketing layout helpers |
| `site.webmanifest` | Name, short_name, sensible icon paths |
| `robots.txt` | New |
| `sitemap.xml` | New |
| `README.md` | Brief note of purpose/canonical URL if outdated |

Screenshots and brand images stay unless alt/caption-only changes require none.

## Success criteria

- Visitor understands what the system does, who it is for, and how to request a demo within the first screenful + one scroll
- Feature claims match the current application codebase
- No obvious spelling/grammar errors in English copy
- Accessibility basics pass manual checklist (landmarks, headings, alt, focus, valid lists)
- SEO basics present: title, description, canonical, OG, JSON-LD, robots, sitemap, fixed manifest

## Implementation follow-up

After this spec is approved, create an implementation plan via the writing-plans skill, then edit the static site files accordingly.
