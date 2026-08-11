# Features and Screenshots Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the katajudo.com one-pager so every shipped tournament-manager capability is described, with current UI and PDF-page screenshots captured from the app on port 3000.

**Architecture:** Keep the existing static `index.html` + AlmondCSS site. Capture PNGs from `http://127.0.0.1:3000/` into `screenshots/`, extend `css/kata.css` for a third Why column and a PDF gallery, then rewrite `index.html` copy, nav, figures, and meta descriptions. No application-repo changes.

**Tech Stack:** Static HTML5, AlmondCSS, `css/kata.css`, Playwright Chromium, pdftoppm, ImageMagick

**Spec:** `docs/superpowers/specs/2026-08-11-features-screenshots-design.md`

## Global Constraints

- Single static HTML page only — no multi-page site
- Keep AlmondCSS (`css/almond.css`); extend `css/kata.css` only
- Contact email must be `lw@judocoach.com` everywhere
- Claim only shipped features; do not claim TV graphic overlays or pushing results to an external website
- Delete the existing “live displays are roadmap / not part of the current release” sentence
- Kodomo-no-Kata listed as one line “Kodomo-no-Kata 1–7”
- Screenshots from `http://127.0.0.1:3000/` only — do not invent or AI-generate product UI
- Canonical URL: `https://katajudo.com/`
- Memorial section stays after the CTA
- Do not change `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME`, or `og-image.png`
- Do not commit unless the user explicitly asks

---

## File map

| File | Responsibility |
|------|----------------|
| `screenshots/*.png` | Replaced clerk shots, new UI shots, five PDF page types |
| `css/kata.css` | `.three-col`, `.pdf-gallery` |
| `index.html` | Copy, nav, figures, meta/JSON-LD descriptions |

---

### Task 1: Capture UI screenshots from port 3000

**Files:**
- Modify: `screenshots/Competitors-Kata.png`
- Modify: `screenshots/Pairs-Kata.png`
- Modify: `screenshots/Judges-Kata.png`
- Modify: `screenshots/Scoresheet-Kata-Pair-Judge.png`
- Modify: `screenshots/Leaderboard-Kata.png`
- Modify: `screenshots/Kata.png`
- Create: `screenshots/Config.png`
- Create: `screenshots/Draw.png`
- Create: `screenshots/Mats-Clerk.png`
- Create: `screenshots/Judge-Tablet.png`
- Create: `screenshots/Announcer.png`
- Create: `screenshots/Live-Results.png`
- Create: `screenshots/SIZES.md` (width/height for `index.html`)

**Interfaces:**
- Consumes: Live app at `http://127.0.0.1:3000/` (must return 200 on `/`)
- Produces: PNGs ~1046px wide; `screenshots/SIZES.md` with `filename width height` lines

- [ ] **Step 1: Confirm the app is up**

Run:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/
```

Expected: `200`. If not, stop — do not capture from a different host.

- [ ] **Step 2: Write and run the capture script**

Save as `/tmp/capture-kata-ui.py` and run `python3 /tmp/capture-kata-ui.py`.

```python
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path("/home/lancew/dev/kata/kata-website/screenshots")
BASE = "http://127.0.0.1:3000"
WIDTH = 1280
TARGET_W = 1046

# full_page True for clerk tables; False for hall/tablet displays
SHOTS = [
    ("/competitors", "Competitors-Kata.png", True),
    ("/pairs", "Pairs-Kata.png", True),
    ("/judges", "Judges-Kata.png", True),
    ("/scoresheets/nagenokata/1/1", "Scoresheet-Kata-Pair-Judge.png", True),
    ("/leaderboards/nagenokata", "Leaderboard-Kata.png", True),
    ("/nagenokata", "Kata.png", True),
    ("/config", "Config.png", True),
    ("/draw/nagenokata", "Draw.png", True),
    ("/mats/1", "Mats-Clerk.png", True),
    ("/mats/1/seats/1", "Judge-Tablet.png", False),
    ("/mats/1/announce", "Announcer.png", False),
    ("/results/nagenokata", "Live-Results.png", False),
]

DISPLAY_H = 800

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": WIDTH, "height": DISPLAY_H})
    for path, name, full in SHOTS:
        page.goto(BASE + path, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(500)
        dest = OUT / name
        page.screenshot(path=str(dest), full_page=full)
        print("wrote", dest, dest.stat().st_size)
    browser.close()
```

Then resize every UI PNG to width 1046:

```bash
cd /home/lancew/dev/kata/kata-website/screenshots
for f in Competitors-Kata.png Pairs-Kata.png Judges-Kata.png \
  Scoresheet-Kata-Pair-Judge.png Leaderboard-Kata.png Kata.png \
  Config.png Draw.png Mats-Clerk.png Judge-Tablet.png Announcer.png \
  Live-Results.png; do
  magick "$f" -resize 1046x "$f"
done
identify -format '%f %w %h\n' \
  Competitors-Kata.png Pairs-Kata.png Judges-Kata.png \
  Scoresheet-Kata-Pair-Judge.png Leaderboard-Kata.png Kata.png \
  Config.png Draw.png Mats-Clerk.png Judge-Tablet.png Announcer.png \
  Live-Results.png | tee SIZES.md
```

Expected: twelve PNGs exist; each width is 1046; SIZES.md lists all twelve.

- [ ] **Step 3: Spot-check**

Open `Judge-Tablet.png` and `Announcer.png`. They must be the display layout (no clerk nav). If a shot is a login page or an error, fix the URL and recapture that file only.

---

### Task 2: Rasterise PDF pack pages

**Files:**
- Create: `screenshots/PDF-Cover.png`
- Create: `screenshots/PDF-Divider.png`
- Create: `screenshots/PDF-Order.png`
- Create: `screenshots/PDF-Results.png`
- Create: `screenshots/PDF-Scoresheet.png`
- Delete: `screenshots/Scoresheet-PDF-Day-Pack.png`
- Modify: `screenshots/SIZES.md`

**Interfaces:**
- Consumes: `GET http://127.0.0.1:3000/scoresheets/pdf` (day pack; page 1 cover, 2 divider, 3 order, 4 results, 5 scoresheet)
- Produces: five PNGs ~900–1046px wide; sizes appended to `SIZES.md`

- [ ] **Step 1: Download the day pack**

```bash
mkdir -p /tmp/kata-pdf
curl -sS -o /tmp/kata-pdf/day.pdf 'http://127.0.0.1:3000/scoresheets/pdf'
pdfinfo /tmp/kata-pdf/day.pdf | head -20
```

Expected: `Pages:` at least 5; `Page size: 595 x 842 pts (A4)`.

- [ ] **Step 2: Rasterise pages 1–5**

```bash
pdftoppm -png -r 150 -f 1 -l 5 /tmp/kata-pdf/day.pdf /tmp/kata-pdf/page
ls -l /tmp/kata-pdf/page-*.png
```

Expected: `page-1.png` … `page-5.png`.

- [ ] **Step 3: Copy, resize, record sizes, delete the old PDF shot**

```bash
cd /home/lancew/dev/kata/kata-website/screenshots
cp /tmp/kata-pdf/page-1.png PDF-Cover.png
cp /tmp/kata-pdf/page-2.png PDF-Divider.png
cp /tmp/kata-pdf/page-3.png PDF-Order.png
cp /tmp/kata-pdf/page-4.png PDF-Results.png
cp /tmp/kata-pdf/page-5.png PDF-Scoresheet.png
for f in PDF-Cover.png PDF-Divider.png PDF-Order.png PDF-Results.png PDF-Scoresheet.png; do
  magick "$f" -resize 1046x "$f"
done
identify -format '%f %w %h\n' \
  PDF-Cover.png PDF-Divider.png PDF-Order.png PDF-Results.png PDF-Scoresheet.png \
  | tee -a SIZES.md
rm -f Scoresheet-PDF-Day-Pack.png
```

Expected: five `PDF-*.png` files at width 1046; `Scoresheet-PDF-Day-Pack.png` gone.

- [ ] **Step 4: Confirm page types**

```bash
pdftotext -f 1 -l 1 -layout /tmp/kata-pdf/day.pdf - | head -8
pdftotext -f 2 -l 2 -layout /tmp/kata-pdf/day.pdf - | head -8
pdftotext -f 3 -l 3 -layout /tmp/kata-pdf/day.pdf - | head -8
pdftotext -f 4 -l 4 -layout /tmp/kata-pdf/day.pdf - | head -8
pdftotext -f 5 -l 5 -layout /tmp/kata-pdf/day.pdf - | head -12
```

Expected: page 1 contains `Full day scoresheet pack`; page 2 `Kata section`; page 3 `Performance order`; page 4 `Results`; page 5 `Scoresheet` and `TORI`.

---

### Task 3: Marketing CSS for three columns and PDF gallery

**Files:**
- Modify: `css/kata.css`

**Interfaces:**
- Consumes: existing `.two-col` pattern in `css/kata.css`
- Produces: `.three-col` (1 col small, 3 col from 50rem) and `.pdf-gallery` (1 col small, 2 col from 40rem)

- [ ] **Step 1: Append these rules to `css/kata.css` after the `.two-col h3` block**

```css
.three-col {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 50rem) {
  .three-col {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.three-col h3 {
  margin-top: 0;
}

.pdf-gallery {
  display: grid;
  gap: 1.5rem;
  margin: 1rem 0 1.5rem;
}

@media (min-width: 40rem) {
  .pdf-gallery {
    grid-template-columns: 1fr 1fr;
  }
}

.pdf-gallery figure {
  margin: 0;
}
```

Do not remove `.two-col`. Do not edit `css/almond.css`.

- [ ] **Step 2: Confirm the file still starts with the skip-link rules and ends with the new blocks**

```bash
rg -n "three-col|pdf-gallery" /home/lancew/dev/kata/kata-website/css/kata.css
```

Expected: matches for both class names.

---

### Task 4: Rewrite `index.html` copy, nav, figures, and meta

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: screenshot filenames and `width`/`height` from `screenshots/SIZES.md`; CSS classes from Task 3
- Produces: one valid `index.html` covering every shipped claim in the spec

- [ ] **Step 1: Read `screenshots/SIZES.md` and substitute those integers** into every `<img width height>` in the HTML below. If a height is missing, run `identify` on that file. Do not leave `width="1046" height="0"`.

- [ ] **Step 2: Replace `index.html` with the following**, after substituting real image heights. Keep the `<head>` favicon/manifest/canonical/JSON-LD graph shape; only descriptions, nav, and `<main>` content change as shown.

Use this document as the page (image heights below are the 1046-wide placeholders to replace from SIZES.md):

Head description (title, meta, OG, Twitter, JSON-LD WebSite + SoftwareApplication `description`):

```
Organise and score judo kata on a laptop LAN. Judge tablets, announcer and live results, EJU or BJA-style scoring, and printable PDF packs.
```

JSON-LD SoftwareApplication description:

```
Software to organise and score judo kata tournaments, with judge tablets, hall displays, and printable PDF scoresheets.
```

In-page nav:

```html
<nav class="inpage-nav" aria-label="On this page">
  <ul>
    <li><a href="#why">Why it helps</a></li>
    <li><a href="#workflow">How an event runs</a></li>
    <li><a href="#scoring">Scoring</a></li>
    <li><a href="#deploy">Where it runs</a></li>
    <li><a href="#demo">Get a demo</a></li>
  </ul>
</nav>
```

Hero lede:

```html
<p class="lede">
  Browser-based software to organise, score, and display judo kata
  competitions from one laptop on the local network — built for
  organisers, judges, and the hall.
</p>
```

Why section (`class="three-col"`):

```html
<section id="why" class="section" aria-labelledby="why-heading">
  <h2 id="why-heading">Why it helps</h2>
  <div class="three-col">
    <div>
      <h3>For organisers</h3>
      <ul>
        <li>Set the event name, logo, included kata, and scoring rules once in Config</li>
        <li>Add competitors and judges by hand or import them from CSV</li>
        <li>Run the draw, seat the panel, and assign performances to mats</li>
        <li>Print a full-day PDF pack — or one kata — when you need paper at the table</li>
        <li>Lock clerk pages with a PIN; share public links for tablets and projectors</li>
        <li>Keep each event in its own SQLite file; no internet required on the day</li>
      </ul>
    </div>
    <div>
      <h3>For judges</h3>
      <ul>
        <li>Open a seat URL that shows your name and the pair on the mat</li>
        <li>Tap small, medium, and big mistakes, forgotten techniques, and ± corrections</li>
        <li>Submit when the kata finishes; the tablet waits for the rest of the panel</li>
        <li>Sit as shadow to record a score that is stored and ignored in the total</li>
        <li>Use dark mode and zoom under hall lighting; the clerk can unsubmit if you sent too soon</li>
      </ul>
    </div>
    <div>
      <h3>For the hall</h3>
      <ul>
        <li>Put the announcer board on a hall screen: current tori and uke, judging team, who is on deck</li>
        <li>Project live results that update in place and can rotate through kata</li>
        <li>Switch English or French on the live screens</li>
        <li>Spectators can use public links without the organiser PIN</li>
      </ul>
    </div>
  </div>
</section>
```

Workflow section — follow this subsection order and screenshot pairing. Intro paragraph: “One laptop, many browsers. Clerks, judge tablets, the announcer, and live results stay in sync on the local network. The in-app How to page walks through the same flow.”

| h3 | Screenshot `src` | figcaption |
|----|------------------|------------|
| Config | `screenshots/Config.png` | Event config |
| Competitors | `screenshots/Competitors-Kata.png` | Competitors page |
| Pairs | `screenshots/Pairs-Kata.png` | Pairs page |
| Judges | `screenshots/Judges-Kata.png` | Judges page |
| Draw | `screenshots/Draw.png` | Performance draw |
| Mats | `screenshots/Mats-Clerk.png` | Mat clerk page |
| Judge tablets | `screenshots/Judge-Tablet.png` | Judge tablet seat |
| Announcer | `screenshots/Announcer.png` | Announcer board |
| Electronic scoresheets | `screenshots/Scoresheet-Kata-Pair-Judge.png` | Electronic scoresheet in the browser |
| Printable PDF pack | five figures inside `<div class="pdf-gallery">` | see below |
| Live results | `screenshots/Live-Results.png` | Live results display |
| Leaderboards and CSV | `screenshots/Leaderboard-Kata.png` | Leaderboard page |
| Category progress | `screenshots/Kata.png` | Category progress summary |

PDF gallery figures:

| src | figcaption |
|-----|------------|
| `screenshots/PDF-Cover.png` | Day-pack cover |
| `screenshots/PDF-Divider.png` | Kata divider |
| `screenshots/PDF-Order.png` | Performance order |
| `screenshots/PDF-Results.png` | Results page |
| `screenshots/PDF-Scoresheet.png` | Pair×judge scoresheet |

Required workflow copy (keep these facts; wording may be tightened but not dropped):

- Config: event name, location, dates, logo, referees per performance, EJU or kata-judge/BJA scoring, breaks every N performances for M minutes, rotate judging team at breaks, included kata, results rotate interval, organiser PIN, public token.
- Competitors/judges CSV headers: `"Country","Given Name","Surname"` and judges also `"Kata"` (code).
- Draw: random order, seats judges, optional score wipe; formula ≤6 direct final; 7–11 one prelim top 4; ≥12 two prelims top 3 per group.
- Mats: assign, randomize unfinished (current pair stays), shadow seats, unsubmit while current.
- Tablets: S/M/B/F/+/−, confirm submit, wait for other official seats, live update, dark/zoom, no clerk nav.
- Announcer: current tori/uke, judging team, on deck with estimated time, rest of schedule, SSE.
- Clerk scoresheets as backup writing the same scores.
- PDF: full day or one kata; blank / in progress / completed / all; force blank; cover, divider, order, results, pair×judge sheet with checkbox grid, signatures, event logo.
- Live results: `?rotate=1`, `?lang=en` or `fr`, `?theme=dark`, `?zoom=`.
- CSV: totals (rank, country, pair, points) and techniques (per judge, per technique).

Scoring section must include both rulesets, shadow seats never count, forgotten/drop/tie-break as in the spec, and this kata list:

```html
<ul>
  <li>Nage-no-Kata (including 1G, 2G, 3G, and 3-set)</li>
  <li>Katame-no-Kata (including 1G)</li>
  <li>Ju-no-Kata</li>
  <li>Kime-no-Kata</li>
  <li>Kodokan Goshin Jutsu</li>
  <li>Koshiki-no-Kata</li>
  <li>Itsutsu-no-Kata</li>
  <li>Kodomo-no-Kata 1–7</li>
</ul>
```

Keep the existing container-diagram figure after the kata list.

Deploy section must include: browser access, LAN/offline, SQLite per event, Docker, Perl/Mojolicious/SQLite/AlmondCSS, AGPL, organiser PIN vs public `/p/…` links, EN/FR on live screens, `./script/start` one worker so SSE stays in sync (pages also reload every 5 seconds). **Do not** include the old roadmap sentence about TV overlays / live website feeds.

Keep the existing demo CTA, memorial (Michel Kozlowski), further reading, and footer details unchanged except that any leftover “not publicly open yet” footer note stays as-is.

- [ ] **Step 3: Confirm banned strings are gone and required strings exist**

```bash
cd /home/lancew/dev/kata/kata-website
rg -n -i 'roadmap|not part of the current release|tv graphic|Scoresheet-PDF-Day-Pack' index.html
rg -n 'three-col|pdf-gallery|PDF-Cover|Judge-Tablet|Announcer|Live-Results|Kodomo-no-Kata 1' index.html
rg -n 'judococh.com' index.html
```

Expected: first command no matches; second command matches; `judococh.com` no matches.

---

### Task 5: Verify page assets and HTML

**Files:**
- Modify: `index.html` only if a width/height or broken `src` needs a fix

**Interfaces:**
- Consumes: Tasks 1–4 outputs
- Produces: every `<img src>` resolves to a file; no leftover Day-Pack filename; valid heading order

- [ ] **Step 1: Every screenshot referenced in HTML exists**

```bash
cd /home/lancew/dev/kata/kata-website
python3 - <<'PY'
from pathlib import Path
import re
html = Path("index.html").read_text()
srcs = re.findall(r'src="([^"]+)"', html)
missing = [s for s in srcs if not Path(s).exists()]
print("images", len(srcs))
print("missing", missing)
assert not missing
assert "screenshots/Scoresheet-PDF-Day-Pack.png" not in html
assert "screenshots/PDF-Scoresheet.png" in html
print("ok")
PY
```

Expected: `ok`.

- [ ] **Step 2: Heading levels and landmarks**

```bash
rg -n '<h[1-6]|<(header|main|footer|nav) ' /home/lancew/dev/kata/kata-website/index.html
```

Expected: one `<h1>`; `h2` for Why / How an event runs / Scoring / Runs where you need it / Interested / memorial / Further reading; `h3` under those; `header`, `main`, `footer` present.

- [ ] **Step 3: Visual pass**

```bash
python3 -m http.server 8000 --directory /home/lancew/dev/kata/kata-website
```

Open `http://127.0.0.1:8000/`. Check: hero mentions hall display; three Why columns; PDF gallery shows five pages; live tablet/announcer/results shots are current UI; memorial still after the CTA. Stop the server when done.

---

## Spec coverage

| Spec requirement | Task |
|------------------|------|
| Kitchen-sink copy of every shipped capability | 4 |
| One page, extend IA, three Why columns | 3, 4 |
| Replace stale clerk screenshots | 1 |
| Add config/draw/mats/tablet/announcer/results | 1, 4 |
| Five PDF page types; delete old Day-Pack file | 2, 4 |
| Remove roadmap live-display sentence | 4 |
| Kodomo as one line | 4 |
| Meta/OG/JSON-LD description update | 4 |
| AlmondCSS kept; robots/sitemap/manifest/og-image unchanged | 3, 4 |
| a11y: alt, figcaption, landmarks, lazy, width/height | 4, 5 |
