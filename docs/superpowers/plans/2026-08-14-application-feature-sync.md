# Application Feature Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the katajudo.com one-page site with the five user-facing capabilities shipped after its 12 August refresh, supported by four current application screenshots.

**Architecture:** Keep the static `index.html` and existing AlmondCSS presentation. Integrate copy into Config, Competitors, Pairs, Draw, Mats, and Scoring; capture evidence from a disposable copy of the application database so screenshot staging cannot alter the organiser's working database.

**Tech Stack:** Static HTML5, AlmondCSS, Playwright Chromium, SQLite, ImageMagick, html-validate, stylelint

**Spec:** `docs/superpowers/specs/2026-08-14-application-feature-sync-design.md`

## Global Constraints

- Keep one static page and the existing workflow-oriented information architecture.
- Explain IJF scoring, competition formulas, seeded draws, nationality-aware seating/replacement, and Senior/U23 registration accurately.
- Give each new capability one or two practical, human-sounding paragraphs where it belongs in the workflow.
- Use direct second person, lead with the benefit, and avoid promotional filler.
- Capture only the real application; do not create mock or generated product UI.
- Keep `css/almond.css`, the memorial, contact details, CTA, lightbox, and footer unchanged.
- Do not market frontend hygiene, internal refactoring, or unfinished backlog items.
- Do not claim federation entry caps.
- Do not commit unless the user explicitly asks.

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Feature copy, screenshot descriptions, and current image dimensions |
| `screenshots/Config.png` | Event-level scoring, formula, nationality, and registration controls |
| `screenshots/Competitors-Kata.png` | Birth-year and grade fields used by registration checks |
| `screenshots/Pairs-Kata.png` | Division and seed-rank controls |
| `screenshots/Mats-Clerk.png` | Supervisor label, nationality warning, and replacement action |
| `.htmlvalidate.json` | Website-specific HTML validation conventions |
| `.stylelintrc.json` | Lint first-party CSS while excluding vendored AlmondCSS |
| `docs/superpowers/specs/2026-08-14-application-feature-sync-design.md` | Approved scope and factual constraints |

No CSS change is planned. The existing figure, responsive image, and lightbox rules already support the replacement images.

---

### Task 1: Integrate the shipped features into the workflow copy

**Files:**
- Modify: `index.html:201-321`
- Modify: `index.html:530-565`

**Interfaces:**
- Consumes: implemented behaviour documented in the companion application's `templates/help/index.html.ep`
- Produces: workflow and scoring prose that describes all five new feature groups without a separate promotional section

- [ ] **Step 1: Replace the two Config paragraphs**

Replace the existing Config paragraph at `index.html:202-209` with:

```html
<p>
  Before anyone walks in, set the event name, location, dates, and logo.
  Choose how many judges sit a performance, schedule breaks, decide whether
  the judging team rotates, and tick the kata this event will run. You can
  also set an organiser PIN, create public links for tablets and displays,
  and choose how long each kata stays on a rotating results screen.
</p>
<p>
  Event rules live here too. Pick EJU, kata-judge/BJA-style, or IJF scoring
  independently from the current or IJF competition formula. Nationality
  policy controls how the draw prefers judges from outside the pair's
  countries, while optional Senior and U23 registration rules turn on the
  corresponding age, grade, division, and entry checks.
</p>
```

- [ ] **Step 2: Replace the Competitors paragraph**

Replace the existing Competitors paragraph at `index.html:223-229` with:

```html
<p>
  Register competitors through the web UI, CSV import, or from this year's
  IJF kata events on Judobase. The CSV header starts with
  <code>"Country","Given Name","Surname"</code> and can include
  <code>"Birth Year","Grade"</code>. Judobase import adds people and skips
  anyone already in this event with the same name and country.
</p>
<p>
  When Senior or U23 registration rules are switched on, birth year and
  grade become required and invalid entries are blocked before they reach
  the draw. Judobase cannot supply those two fields, so leave registration
  checks off for that import, or enter competitors manually or by CSV.
</p>
```

- [ ] **Step 3: Replace the Pairs paragraph**

Replace the existing Pairs paragraph at `index.html:253-255` with:

```html
<p>
  Form tori and uke pairs for each kata. When registration checks are on,
  choose Senior or U23 for the pair; the application checks both partners'
  calendar-year age and grade, the permitted kata, and the entry limit for
  that division.
</p>
<p>
  You can also give previous medallists an optional seed rank. In a
  two-group preliminary, the draw spreads those heads of series across the
  groups while keeping performance order within each group random.
</p>
```

- [ ] **Step 4: Replace the Draw explanation and formula list**

Replace the existing Draw paragraphs and list at `index.html:287-301` with:

```html
<p>
  Run an automated draw for performance order and seated panels. You can
  keep the current formula — up to 6 pairs go straight to a final, 7–11 use
  one preliminary with the top 4 advancing, and 12 or more use two groups
  with the top 3 from each — or select the IJF formula: up to 6 direct,
  7–9 with the top 6 advancing, and 10 or more in two groups with the top 3
  from each.
</p>
<p>
  Seed ranks are used only to spread heads of series across two preliminary
  groups; order within a group remains random. When judges are seated
  automatically, the configured nationality policy prefers officials who
  do not share tori or uke's IOC country. Running the draw again overwrites
  that kata's order, with an optional wipe when you also need to remove
  scores already entered.
</p>
```

- [ ] **Step 5: Replace the Mats paragraph**

Replace the existing Mats paragraph at `index.html:314-321` with:

```html
<p>
  Add a tatami, then assign performances in the order you want them to run
  — or assign several and randomize unfinished while the current pair stays
  put. The PIN-protected mat clerk acts as the event-day supervisor, showing
  who is scoring now, who is on deck and double deck, completed
  performances, judge seats, and links to edit scores.
</p>
<p>
  If an official judge shares tori or uke's IOC country, the clerk sees a
  warning and can choose an eligible replacement for this performance only.
  A seat with submitted or saved scores must be unsubmitted first. Shadow
  seats remain available for development and do not count in either the
  total or the nationality rule.
</p>
```

- [ ] **Step 6: Replace the scoring introduction and rules list**

Replace `index.html:532-565` with:

```html
<p>
  Scoring follows the ruleset you choose in Config, so the same tablet marks
  produce the expected event total without rebuilding a spreadsheet at the
  venue. EJU drops the highest and lowest judge totals when there are three
  or more official judges; a forgotten technique zeroes that technique and
  halves that judge's kata total once, rounded up.
</p>
<p>
  kata-judge/BJA-style scoring discards per technique, keeps ordinary scores
  between 1 and 10, and halves without rounding up. IJF also discards per
  technique: five official judges drop high and low, four drop low, and
  three or fewer keep every mark. IJF uses the EJU technique range, including
  a possible 10.5 correction, and any official forgotten mark halves the
  pair total once. Shadow seats never count in any ruleset.
</p>
<ul>
  <li>
    Technique evaluation uses small, medium, and big mistakes, forgotten
    techniques, and optional correction values
  </li>
  <li>
    Tie-breaks use fewer big mistakes, then medium, then small, then average
    score
  </li>
</ul>
```

Keep the existing `Supported kata` heading, kata list, and container diagram immediately after this block.

- [ ] **Step 7: Add exact registration limits to the Competitors copy**

Insert this paragraph after the second Competitors paragraph from Step 2:

```html
<p>
  Senior requires both partners to be at least 16 and 1st Dan, with one
  Senior pair per person. U23 requires both to be 16–22 and at least 1st Kyu,
  allows Nage-no-Kata, Ju-no-Kata, or Katame-no-Kata, and permits up to two
  U23 pairs per person. Leave the setting off for ordinary club-event entry.
</p>
```

This is the second explanatory registration paragraph; the first is the paragraph beginning “When Senior or U23 registration rules are switched on”. The preceding import paragraph describes registration mechanics, not another set of eligibility rules.

- [ ] **Step 8: Update the four image descriptions**

Use these exact `alt` and caption values while retaining `loading="lazy"`:

```html
<!-- Config.png -->
alt="Config page showing IJF scoring, IJF competition formula, hard judge nationality policy, and Senior and U23 registration rules"
<figcaption>Event scoring, draw, and registration controls</figcaption>

<!-- Competitors-Kata.png -->
alt="Competitors page listing country, name, birth year, and grade"
<figcaption>Competitor details used for optional eligibility checks</figcaption>

<!-- Pairs-Kata.png -->
alt="Pairs page listing tori and uke, kata, Senior or U23 division, and seed rank"
<figcaption>Pair divisions and heads of series</figcaption>

<!-- Mats-Clerk.png -->
alt="Mat clerk and supervisor page showing a judge nationality conflict and eligible replacement control"
<figcaption>Mat supervisor nationality warning and replacement</figcaption>
```

- [ ] **Step 9: Check feature coverage and paragraph count**

Run:

```bash
cd /home/lancew/dev/kata/kata-website
rg -n "IJF|competition formula|seed rank|nationality|Senior|U23|supervisor|replacement" index.html
rg -n -i "federation cap|frontend hygiene|architecture cleanup|flag for review|CARE" index.html
```

Expected: the first command finds the new workflow and scoring prose. The second command prints no matches.

---

### Task 2: Stage and capture current application screenshots safely

**Files:**
- Modify: `screenshots/Config.png`
- Modify: `screenshots/Competitors-Kata.png`
- Modify: `screenshots/Pairs-Kata.png`
- Modify: `screenshots/Mats-Clerk.png`
- Modify: `index.html` image dimensions

**Interfaces:**
- Consumes: the real application code and a disposable copy of `db/kata_competition.db`
- Produces: four 1046px-wide PNG files demonstrating the controls described in Task 1

- [ ] **Step 1: Confirm port 3001 is free and create disposable demo data**

Run:

```bash
cd /home/lancew/dev/kata/judo-kata-tournament-manager
if curl -fsS http://127.0.0.1:3001/ >/dev/null 2>&1; then
  echo "Port 3001 is already serving HTTP; stop and inspect it before continuing"
  exit 1
fi
cp db/kata_competition.db /tmp/kata-feature-sync.db
sqlite3 /tmp/kata-feature-sync.db "
UPDATE settings SET value='ijf' WHERE key='scoring_rules';
UPDATE settings SET value='ijf' WHERE key='competition_formula';
UPDATE settings SET value='hard' WHERE key='judge_nationality_policy';
UPDATE settings SET value='both' WHERE key='registration_rules';
UPDATE competitors
SET birth_year = CASE id
  WHEN 1 THEN 1987 WHEN 2 THEN 1986 WHEN 3 THEN 1985 WHEN 4 THEN 1984
  WHEN 5 THEN 2005 WHEN 6 THEN 2006 WHEN 7 THEN 2004 WHEN 8 THEN 2005
  ELSE birth_year END,
    grade = CASE WHEN id BETWEEN 1 AND 4 THEN '2_dan'
                 WHEN id BETWEEN 5 AND 8 THEN '1_dan'
                 ELSE grade END
WHERE id BETWEEN 1 AND 8;
UPDATE pairs SET division='senior' WHERE id IN (1,2,8);
UPDATE pairs SET division='u23' WHERE id IN (3,7,9);
UPDATE pairs SET seed_rank=1 WHERE id=1;
UPDATE pairs SET seed_rank=2 WHERE id=2;
UPDATE judges SET country_ioc_code='JPN' WHERE id=3;
"
sqlite3 -header -column /tmp/kata-feature-sync.db "
SELECT key,value FROM settings
WHERE key IN ('scoring_rules','competition_formula','judge_nationality_policy','registration_rules')
ORDER BY key;
SELECT id,country_ioc_code,birth_year,grade FROM competitors WHERE id BETWEEN 1 AND 8;
SELECT id,division,seed_rank FROM pairs WHERE id IN (1,2,3,7,8,9);
SELECT id,country_ioc_code FROM judges WHERE id=3;
"
```

Expected: all four settings show the staged values, competitors 1–8 have birth year and grade, listed pairs have divisions, pairs 1 and 2 have seeds 1 and 2, and judge 3 is `JPN`.

- [ ] **Step 2: Start the real application against the disposable database**

Run from `judo-kata-tournament-manager`:

```bash
KATA_DB=/tmp/kata-feature-sync.db \
KATA_SECRET=feature-sync-screenshot \
KATA_LISTEN=http://127.0.0.1:3001 \
./script/start
```

Keep this process running in its terminal. In another terminal run:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3001/
```

Expected: `200`.

- [ ] **Step 3: Capture the four application pages**

Create `/tmp/capture-kata-feature-sync.py` with:

```python
from pathlib import Path
from playwright.sync_api import sync_playwright

base = "http://127.0.0.1:3001"
out = Path("/home/lancew/dev/kata/kata-website/screenshots")
shots = [
    ("/admin/config", "Config.png"),
    ("/competitors", "Competitors-Kata.png"),
    ("/pairs", "Pairs-Kata.png"),
    ("/mats/1", "Mats-Clerk.png"),
]

with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    for route, filename in shots:
        page.goto(base + route, wait_until="networkidle", timeout=30_000)
        page.wait_for_timeout(300)
        destination = out / filename
        page.screenshot(path=str(destination), full_page=True)
        print(f"{filename}: {page.title()} {page.url}")
    browser.close()
```

Run:

```bash
python3 /tmp/capture-kata-feature-sync.py
```

Expected: four output lines, each ending in the requested route rather than `/login`, and four updated PNGs in `kata-website/screenshots`.

- [ ] **Step 4: Resize and record exact dimensions**

Run:

```bash
cd /home/lancew/dev/kata/kata-website/screenshots
for image in Config.png Competitors-Kata.png Pairs-Kata.png Mats-Clerk.png; do
  magick "$image" -resize 1046x "$image"
done
identify -format '%f %w %h\n' Config.png Competitors-Kata.png Pairs-Kata.png Mats-Clerk.png
```

Expected: all four widths are `1046`. Record each reported height in the matching `<img>` element in `index.html`; do not change other image dimensions.

- [ ] **Step 5: Inspect feature evidence**

Open all four PNGs and verify:

- `Config.png` shows the four select controls and their staged values.
- `Competitors-Kata.png` shows populated Birth year and Grade columns.
- `Pairs-Kata.png` shows populated Division and Seed columns.
- `Mats-Clerk.png` shows “Mat clerk / supervisor”, “Nationality conflict”, and a Replace select/button.

If any evidence is missing, correct only the disposable database or route and recapture the affected file.

- [ ] **Step 6: Stop the screenshot server and remove temporary files**

Stop `./script/start` with Ctrl-C in its terminal, then run:

```bash
rm -f /tmp/kata-feature-sync.db /tmp/capture-kata-feature-sync.py
```

Expected: the dedicated server stops; the application's original `db/kata_competition.db` remains unchanged.

---

### Task 3: Validate assets, markup, layout, and tone

**Files:**
- Create: `.htmlvalidate.json`
- Create: `.stylelintrc.json`
- Modify: `index.html` only if validation, image dimensions, or the prose review identifies a concrete defect
- Modify: `css/kata.css` only if the browser pass reveals an actual responsive regression

**Interfaces:**
- Consumes: Task 1 copy and Task 2 screenshots
- Produces: valid static markup with accurate image metadata and a consistent final narrative

- [ ] **Step 1: Verify every local asset and image dimension**

Run:

```bash
cd /home/lancew/dev/kata/kata-website
python3 - <<'PY'
from pathlib import Path
import re
from PIL import Image

html = Path("index.html").read_text()
tags = re.findall(r"<img\b[^>]*>", html, flags=re.S)
errors = []

for tag in tags:
    src_match = re.search(r'src="([^"]+)"', tag)
    width_match = re.search(r'width="(\d+)"', tag)
    height_match = re.search(r'height="(\d+)"', tag)
    if not src_match:
        continue
    src = src_match.group(1)
    path = Path(src)
    if not path.exists():
        errors.append(f"missing: {src}")
        continue
    if path.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
        continue
    if not width_match or not height_match:
        errors.append(f"missing dimensions: {src}")
        continue
    with Image.open(path) as image:
        declared = (int(width_match.group(1)), int(height_match.group(1)))
        if image.size != declared:
            errors.append(f"dimension mismatch: {src} file={image.size} html={declared}")

print("\n".join(errors) if errors else "assets and dimensions ok")
raise SystemExit(bool(errors))
PY
```

Expected: `assets and dimensions ok`.

- [ ] **Step 2: Add website-specific validator configuration**

Create `.htmlvalidate.json`:

```json
{
  "extends": ["html-validate:recommended"],
  "rules": {
    "void-style": ["error", { "style": "selfclosing" }],
    "element-required-attributes": "off"
  }
}
```

The lightbox image receives its `src` from `js/lightbox.js`, so the static
required-attribute rule is disabled. Other recommended structural and
accessibility rules remain active.

Create `.stylelintrc.json`:

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "alpha-value-notation": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "media-feature-range-notation": null,
    "no-descending-specificity": null,
    "selector-class-pattern": null
  },
  "ignoreFiles": ["css/almond.css"]
}
```

This validates first-party `css/kata.css` without rewriting the vendored
AlmondCSS file or changing established lightbox declarations.

- [ ] **Step 3: Validate HTML and CSS**

Run:

```bash
cd /home/lancew/dev/kata/kata-website
/home/lancew/dev/kata/judo-kata-tournament-manager/node_modules/.bin/html-validate index.html
/home/lancew/dev/kata/judo-kata-tournament-manager/node_modules/.bin/stylelint \
  --config-basedir /home/lancew/dev/kata/judo-kata-tournament-manager \
  "css/kata.css"
```

Expected: both commands exit `0` with no errors.

- [ ] **Step 4: Serve the site and run responsive browser checks**

Run:

```bash
python3 -m http.server 8000 --directory /home/lancew/dev/kata/kata-website
```

Open `http://127.0.0.1:8000/` at 375×812 and 1280×900. Verify that navigation wraps without horizontal scrolling, all four new screenshots remain legible, tables do not break the page, focus is visible, and clicking each screenshot opens and closes the existing lightbox. Stop the server with Ctrl-C after the pass.

- [ ] **Step 5: Perform the factual and editorial pass**

Read the page from Hero through Scoring and verify these statements exactly:

- IJF scoring and formula are independently selectable.
- Current formula is ≤6 direct, 7–11 top 4, ≥12 top 3×2.
- IJF formula is ≤6 direct, 7–9 top 6, ≥10 top 3×2.
- Seed ranks split heads of series across two preliminary groups without fixing order.
- Nationality conflict uses either competitor's IOC country; replacement is performance-local and blocked until scored/submitted seats are unsubmitted.
- Senior and U23 limits match the approved specification; federation caps are absent.
- Each new capability has no more than two explanatory paragraphs.
- Terms remain consistent: `judge`, `mat clerk / supervisor`, `pair`, `tori`, `uke`, `competition formula`, and `ruleset`.

Revise only sentences that fail one of these checks, then rerun Steps 1 and 3.

- [ ] **Step 6: Review the final working tree**

Run:

```bash
cd /home/lancew/dev/kata/kata-website
git status --short
git diff --check
git diff --stat
```

Expected: only the approved spec, this plan, the two validator configuration
files, `index.html`, and the four required PNG files are changed;
`git diff --check` prints nothing.
