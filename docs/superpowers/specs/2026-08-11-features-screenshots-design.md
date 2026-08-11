# Marketing Site Feature & Screenshot Update

**Date:** 2026-08-11  
**Repo:** `kata-website` (static site for https://katajudo.com / GitHub Pages)  
**Companion product:** `judo-kata-tournament-manager` (running locally at `http://127.0.0.1:3000/` for screenshots)  
**Status:** Written from agreed decisions; awaiting user review before implementation planning

## Goal

Update the single-page marketing site so every shipped capability in the tournament manager is described accurately, with current screenshots — including all PDF pack page types — captured from the live app on port 3000.

The 10 August refresh is the base. This spec only changes content, screenshots, nav, and the CSS needed for a third “Why” column and a PDF gallery. It does not redo SEO plumbing, AlmondCSS, or the memorial/footer.

## Decisions already agreed

| Topic | Choice |
|-------|--------|
| Scope | Kitchen-sink: document every shipped capability |
| Structure | Stay on one long `index.html` |
| Story | Extend the current IA (hero → why → full day → scoring → deploy → CTA) |
| Screenshots | From the running app on `:3000`; replace stale 2023 clerk shots; add missing UI and PDF pages |
| Kodomo | One line: “Kodomo-no-Kata 1–7”, not seven bullets |
| Visual | Keep AlmondCSS; extend `kata.css` only as needed |

## Non-goals

- Multi-page site, blog, or docs
- Replacing AlmondCSS
- Recapturing Home, Help, login, or mat schedule (announcer covers the hall)
- A screenshot of CSV files (mention download links in copy)
- Claiming TV graphic overlays or pushing live results to an external website
- Search Console / analytics work
- Changing the application repo

## Page information architecture

Keep skip link, `header` / `main` / `footer`. Update in-page nav to: Why · How an event runs · Scoring · Where it runs · Get a demo.

Section order:

1. **Hero** — brand, headline, one supporting sentence, email CTA. Headline/lede must cover organise, score, **and display the hall** from one laptop on the LAN.
2. **Why it helps** (`#why`) — three columns: Organisers / Judges / Hall & spectators.
3. **How an event runs** (`#workflow`) — illustrated day, in this order:
   1. Config (event identity, included kata, scoring rules, PIN, public token, rotation)
   2. Competitors, judges, pairs (manual + CSV)
   3. Draw and competition formula
   4. Mats (assign performances, shadow seats, unsubmit)
   5. Judge tablets (S/M/B/F/+/−, submit, dark/zoom, live update)
   6. Announcer board
   7. Electronic clerk scoresheets (backup if a tablet fails)
   8. Printable PDF pack — gallery of five page types
   9. Live results (rotate kata, EN/FR, dark/zoom)
   10. Leaderboards and CSV (totals + techniques)
   11. Category progress
4. **Scoring you can trust** (`#scoring`) — two rulesets, calculator behaviour, kata catalogue.
5. **Runs where you need it** (`#deploy`) — browser/LAN/SQLite/Docker; organiser PIN; public `/p/…` links; EN/FR on live screens. **Delete** the sentence that live displays are roadmap / not in this release.
6. **Interested?** (`#demo`) — existing CTA.
7. **Memorial** — unchanged placement and intent.
8. **Further reading** — unchanged links.
9. **Footer** — unchanged stack/AGPL/contact; copyright already through 2026.

## Shipped claims (source of truth)

Facts must match `judo-kata-tournament-manager` as of 11 August 2026 (help page, routes in `Kata.pm`, `Structure.pm`, `Settings.pm`, `ScoresheetPdf.pm`). Do not invent beyond these.

**Event setup**

- Config in SQLite: event name, location, dates, logo (URL or upload), referees per performance, scoring rules, break every N performances for M minutes, rotate judging team at breaks, included kata, live-results rotate interval, organiser PIN, public token.

**People**

- Competitors and judges: add one-by-one or CSV import (`Country, Given Name, Surname`; judges also `Kata` code).
- Pairs: tori, uke, kata; same people may pair in more than one kata.

**Draw and mats**

- Random draw writes performance order, seats judges (seat 1 = first listed), and can rotate the panel at each break when extra judges exist. Re-running overwrites order; optional wipe of previous scores.
- Formula by pair count: ≤6 direct final; 7–11 one preliminary (top 4 advance); ≥12 two preliminaries (top 3 per group).
- Mats: add tatami, assign unassigned performances, randomize unfinished (current pair stays), print/show schedule with start time and breaks.
- Shadow seat: recorded, ignored in the total. Unsubmit a seat only while that performance is current.

**Scoring on the day**

- Judge tablets: named judge, technique taps (S/M/B/F/+/−), confirm submit, wait for other official seats, in-place update when the mat advances; dark/light and zoom; no clerk nav.
- Clerk scoresheets: same scores if a phone fails.
- Live announcer: current TORI/UKE, judging team, on deck with estimated time, rest of schedule; in-place SSE updates; dark/zoom/lang.
- Live results: projector ranking, optional `?rotate=1` (interval from Config), `?lang=en|fr`, `?theme=dark`, `?zoom=`.
- Public token: `/p/{token}/…` for results, announcer, and seats without the organiser PIN. PIN protects clerk routes (competitors, judges, pairs, scoresheets, draw, config, mats clerk, leaderboards). Results, announcer, seats, and schedule stay reachable on the LAN.

**Paper and export**

- PDF packs: full day (`/scoresheets/pdf`) or one kata; filters blank / in progress / completed / all; “force blank layout”.
- Day pack pages: cover, kata divider, performance order, results (blank or filled), pair×judge scoresheet (checkbox grid, totals, judge and data-entry signatures, event logo in header).
- CSV from leaderboard/results: totals (rank, country, pair, points) and techniques (per judge, per technique).

**Scoring rules**

- **EJU** (default): drop highest and lowest judge totals when ≥3 official judges; forgotten zeroes that technique then halves the judge’s kata total once (rounded up); +1 correction can reach 10.5.
- **kata-judge / BJA-style**: scores stay between 1 and 10 (0 if forgotten); dropping is per technique; forgotten halves without rounding up.
- Shadow seats never count in either ruleset.
- Tie-breaks (EJU-style): fewer big mistakes, then medium, then small, then average score.

**Kata catalogue** (display names)

- Nage-no-Kata (including 1G, 2G, 3G, and 3-set)
- Katame-no-Kata (including 1G)
- Ju-no-Kata
- Kime-no-Kata
- Kodokan Goshin Jutsu
- Koshiki-no-Kata
- Itsutsu-no-Kata
- Kodomo-no-Kata 1–7

**Ops**

- `./script/start` runs one worker so SSE live screens stay in sync; pages also reload every 5 seconds if SSE drops.
- Each event is one SQLite file; optional Docker; AGPL; Perl / Mojolicious / AlmondCSS.
- In-app **How to** page (`/help`) walks through the same event-day flow. Mention once in Deploy or the workflow intro — no screenshot.

**Do not claim**

- TV graphic overlays
- Pushing live results to a separate public website
- Judobase import, Show Kata, national exclusions, or other items still on the product TODO

## Screenshot inventory

Capture from `http://127.0.0.1:3000/` (Southampton Kata Championships dummy/demo data already loaded). Viewport 1280px wide; save UI shots ~1046px wide to match the existing set. Rasterise PDF pages at 150 dpi, then scale to ~900–1046px wide. `loading="lazy"` and explicit width/height on every `<img>`. Descriptive `alt` + `<figcaption>`.

### Replace (stale May 2023 UI)

| File | Source URL | Notes |
|------|------------|--------|
| `screenshots/Competitors-Kata.png` | `/competitors` | |
| `screenshots/Pairs-Kata.png` | `/pairs` | |
| `screenshots/Judges-Kata.png` | `/judges` | |
| `screenshots/Scoresheet-Kata-Pair-Judge.png` | `/scoresheets/nagenokata/1/1` (or first pair×judge URL that shows the technique grid) | |
| `screenshots/Leaderboard-Kata.png` | `/leaderboards/nagenokata` | include CSV links in frame if visible |
| `screenshots/Kata.png` | `/nagenokata` | category progress |

### Add UI

| File | Source URL | Notes |
|------|------------|--------|
| `screenshots/Config.png` | `/config` | event + scoring + access fields |
| `screenshots/Draw.png` | `/draw/nagenokata` | |
| `screenshots/Mats-Clerk.png` | `/mats/1` | seats, assign, shadow |
| `screenshots/Judge-Tablet.png` | `/mats/1/seats/1` | display layout, no clerk nav |
| `screenshots/Announcer.png` | `/mats/1/announce` | current pair as focus |
| `screenshots/Live-Results.png` | `/results/nagenokata` | projector ranking |

### Add / replace PDF pages

Download `GET /scoresheets/pdf` (day pack, blank or all) and/or `GET /scoresheets/nagenokata/pdf`. Rasterise each page type to PNG (e.g. `pdftoppm -png -r 150`). Use a representative page for each type — not every kata.

| File | PDF page type |
|------|----------------|
| `screenshots/PDF-Cover.png` | Day-pack cover |
| `screenshots/PDF-Divider.png` | Kata section divider |
| `screenshots/PDF-Order.png` | Performance order |
| `screenshots/PDF-Results.png` | Results table |
| `screenshots/PDF-Scoresheet.png` | Pair×judge sheet |

Delete `screenshots/Scoresheet-PDF-Day-Pack.png` after `index.html` points at `PDF-Scoresheet.png`.

Group the five PDF figures in one subsection with a short intro (print a kata or the whole day; filters; force-blank). Do not dump PDFs as a disconnected gallery at the bottom.

### Capture notes

- Prefer a real browser screenshot of rendered pages (Playwright/Chromium) so AlmondCSS, event logo, and display layouts match what organisers see.
- Crop chrome (OS window) out; keep the app header/nav on clerk pages; keep the display layout on tablet/announcer/results (those hide clerk nav).
- If a live page is empty (no pair on mat), still capture it if the layout is clear; prefer a page with a current pair when available on `:3000`.
- Do not invent mock UIs or AI-generate product screenshots.

## Visual / CSS

- Keep `css/almond.css`.
- Extend `css/kata.css`:
  - `.three-col` (or extend `.two-col`) for Why: 1 column on small screens, 3 from ~50rem.
  - `.pdf-gallery`: one column on small screens, two columns from ~40rem. All five PDF figures use this grid.
- No new design system, no card-heavy dashboard.

## Copy tone

- Second person (“you”).
- Benefit first, then the mechanism.
- Specific: “print a full-day PDF pack” not “powerful reporting”.
- Primary CTA stays “Email Lance for a demo or test event”.
- Headline last in the writing pass so it reflects the hall-display claim.

Suggested meta description direction (edit to ~150–160 chars): organise and score judo kata on a laptop LAN — judge tablets, announcer and live results, EJU or BJA-style scoring, printable PDF packs.

## Accessibility and SEO (carry forward)

- Landmarks, one `h1`, no skipped heading levels, informative `alt`, visible `:focus-visible`, valid lists.
- Update title/description/OG/Twitter/JSON-LD `description` to match new claims.
- Canonical, robots, sitemap, manifest, and `og-image.png` stay as they are.
- Contact remains `lw@judocoach.com`.

## Files expected to change

| File | Change |
|------|--------|
| `index.html` | New sections/copy, nav, figures, meta/JSON-LD descriptions |
| `css/kata.css` | Three-column Why; PDF gallery wrapping |
| `screenshots/*.png` | Replace stale; add UI + PDF page shots; delete obsolete PDF filename |
| `docs/superpowers/specs/2026-08-11-features-screenshots-design.md` | This spec |

No change to `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME`, or `og-image.png`.

## Success criteria

- A visitor can see that the system runs the hall (tablets, announcer, live results), not only clerk data entry.
- Every shipped capability listed in this spec appears in copy at least once.
- Feature claims match the running app; the old “live displays are roadmap” line is gone.
- Screenshots match the current UI; PDF gallery shows cover, divider, order, results, and pair×judge sheet.
- Still one static page; AlmondCSS kept; memorial after CTA.
- Accessibility and SEO basics from the 10 August spec still hold.

## Implementation follow-up

After this spec is approved, create an implementation plan via the writing-plans skill, then capture screenshots from `:3000` and edit the static site.
