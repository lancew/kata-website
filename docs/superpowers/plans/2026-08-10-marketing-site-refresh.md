# Marketing Site Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the single-page `kata-website` marketing site so it accurately sells Judo Kata Tournament Manager with corrected copy, WCAG-oriented accessibility, and solid on-page/technical SEO.

**Architecture:** Keep one static `index.html` on GitHub Pages / `katajudo.com`, styled with existing AlmondCSS plus extended `kata.css`. Content-first section order from the approved spec; no app code changes.

**Tech Stack:** Static HTML5, AlmondCSS, custom `kata.css`, JSON-LD, `robots.txt`, `sitemap.xml`, web app manifest

**Spec:** `docs/superpowers/specs/2026-08-10-marketing-site-refresh-design.md`

## Global Constraints

- Single static HTML page only — no multi-page site
- Keep AlmondCSS (`css/almond.css`); extend `css/kata.css` only
- Contact email must be `lw@judocoach.com` everywhere (never `judococh.com`)
- Claim only shipped product features from `judo-kata-tournament-manager`; TV overlays / live website feeds are future possibilities only
- Canonical URL: `https://katajudo.com/`
- Memorial section stays after the CTA
- Equal pitch to organisers and judges; short developer note in footer
- Copyright year range through 2026

---

## File map

| File | Responsibility |
|------|----------------|
| `robots.txt` | Allow indexing; point to sitemap |
| `sitemap.xml` | Canonical homepage URL |
| `site.webmanifest` | PWA/manifest name + relative icons |
| `css/kata.css` | Marketing layout, skip-link, focus, section rhythm |
| `index.html` | Full page: SEO head, content sections, JSON-LD, a11y |
| `README.md` | Local preview + canonical URL note |

---

### Task 1: Technical SEO assets

**Files:**
- Create: `robots.txt`
- Create: `sitemap.xml`
- Modify: `site.webmanifest`

**Interfaces:**
- Consumes: Canonical host `https://katajudo.com/`
- Produces: Crawlable robots/sitemap; named manifest with relative icon paths usable on custom domain and GitHub Pages

- [ ] **Step 1: Create `robots.txt`**

```txt
User-agent: *
Allow: /

Sitemap: https://katajudo.com/sitemap.xml
```

- [ ] **Step 2: Create `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://katajudo.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Replace `site.webmanifest` contents**

```json
{
  "name": "Judo Kata Tournament Manager",
  "short_name": "Kata Manager",
  "icons": [
    {
      "src": "android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/"
}
```

- [ ] **Step 4: Verify assets**

Run:

```bash
cd /home/lancew/dev/kata/kata-website
test -f robots.txt && test -f sitemap.xml
python3 -c "import json; json.load(open('site.webmanifest')); print('manifest ok')"
grep -q 'katajudo.com/sitemap.xml' robots.txt
grep -q 'https://katajudo.com/' sitemap.xml
grep -q '"name": "Judo Kata Tournament Manager"' site.webmanifest
```

Expected: `manifest ok` and all greps succeed (exit 0).

- [ ] **Step 5: Commit**

```bash
git add robots.txt sitemap.xml site.webmanifest
git commit -m "$(cat <<'EOF'
Add robots, sitemap, and named web manifest for SEO.

EOF
)"
```

---

### Task 2: Marketing layout CSS

**Files:**
- Modify: `css/kata.css`

**Interfaces:**
- Consumes: AlmondCSS base styles; class names used by Task 3 (`skip-link`, `site-header`, `hero`, `hero-brand`, `hero-actions`, `section`, `two-col`, `cta-panel`, `memorial`, `site-footer`, `inpage-nav`)
- Produces: Readable marketing layout without card-dashboard clutter

- [ ] **Step 1: Replace `css/kata.css` with:**

```css
/* Marketing layout helpers on top of AlmondCSS */

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 1000;
  padding: 0.75rem 1rem;
  background: #111;
  color: #fff;
  text-decoration: none;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
}

:focus-visible {
  outline: 3px solid #0b57d0;
  outline-offset: 2px;
}

.site-header {
  max-width: 48rem;
  margin: 0 auto;
  padding: 1rem 1rem 0;
}

.inpage-nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  list-style: none;
  padding-left: 0;
  margin: 0.5rem 0 0;
}

.hero {
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem 1rem 2rem;
}

.hero-brand {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-weight: bold;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  line-height: 1.15;
  margin: 0 0 0.75rem;
}

.hero p.lede {
  font-size: 1.125rem;
  max-width: 40rem;
}

.hero-actions {
  margin-top: 1.25rem;
}

.hero-actions a[href^="mailto:"] {
  font-weight: 600;
}

.content,
.site-footer {
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}

.section {
  margin: 2.5rem 0;
  padding-top: 0.5rem;
  border-top: 1px solid #ccc;
}

.section:first-of-type {
  border-top: 0;
  margin-top: 0;
}

.two-col {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 40rem) {
  .two-col {
    grid-template-columns: 1fr 1fr;
  }
}

.two-col h3 {
  margin-top: 0;
}

figure {
  margin: 1rem 0 1.5rem;
}

figure img {
  max-width: 100%;
  height: auto;
}

.cta-panel {
  background: #f5f5f5;
  padding: 1.25rem 1.5rem;
  border-left: 4px solid #333;
}

.memorial img {
  max-width: 16rem;
  height: auto;
  display: block;
  margin: 1rem 0;
}

.site-footer {
  border-top: 1px solid #ccc;
  padding-top: 1rem;
}

/* Legacy class kept for compatibility if referenced elsewhere */
.event_name {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-weight: bold;
}

.event_logo img {
  height: 20%;
  position: absolute;
  right: 15px;
  top: 15px;
}
```

- [ ] **Step 2: Sanity-check CSS file**

Run:

```bash
cd /home/lancew/dev/kata/kata-website
grep -q 'skip-link' css/kata.css
grep -q 'hero-brand' css/kata.css
grep -q ':focus-visible' css/kata.css
wc -l css/kata.css
```

Expected: greps succeed; file is non-trivial (roughly 100+ lines).

- [ ] **Step 3: Commit**

```bash
git add css/kata.css
git commit -m "$(cat <<'EOF'
Add marketing layout styles for the landing page.

EOF
)"
```

---

### Task 3: Rewrite `index.html`

**Files:**
- Modify: `index.html` (full rewrite)

**Interfaces:**
- Consumes: Task 1 assets; Task 2 CSS class names; existing images under `/` and `screenshots/`
- Produces: Complete marketing page matching the approved section order

- [ ] **Step 1: Replace `index.html` entirely with the following**

Use this exact structure and wording (editorial may tighten slightly only if a clear grammar fix is needed; do not weaken feature claims or invent features):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Judo Kata Tournament Manager | Scoring Software</title>
    <meta
      name="description"
      content="Organise and score judo kata tournaments in the browser. Built for organisers and judges with EJU-aligned scoring, leaderboards, and offline LAN use."
    />
    <meta name="author" content="Lance Wicks" />
    <meta name="copyright" content="Lance Wicks" />
    <link rel="canonical" href="https://katajudo.com/" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://katajudo.com/" />
    <meta
      property="og:title"
      content="Judo Kata Tournament Manager | Scoring Software"
    />
    <meta
      property="og:description"
      content="Organise and score judo kata tournaments in the browser. Built for organisers and judges with EJU-aligned scoring, leaderboards, and offline LAN use."
    />
    <meta
      property="og:image"
      content="https://katajudo.com/KataSoftware-Container.png"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Judo Kata Tournament Manager | Scoring Software"
    />
    <meta
      name="twitter:description"
      content="Organise and score judo kata tournaments in the browser. Built for organisers and judges with EJU-aligned scoring, leaderboards, and offline LAN use."
    />
    <meta
      name="twitter:image"
      content="https://katajudo.com/KataSoftware-Container.png"
    />

    <meta name="yandex-verification" content="f9fff1ca0f81b708" />

    <link rel="stylesheet" href="css/almond.css" />
    <link rel="stylesheet" href="css/kata.css" />
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
    <link rel="manifest" href="site.webmanifest" />

    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "name": "Judo Kata Tournament Manager",
            "url": "https://katajudo.com/",
            "description": "Software to organise and score judo kata tournaments for organisers and judges."
          },
          {
            "@type": "SoftwareApplication",
            "name": "Judo Kata Tournament Manager",
            "applicationCategory": "SportsApplication",
            "operatingSystem": "Web browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "GBP"
            },
            "license": "https://www.gnu.org/licenses/agpl-3.0.html",
            "author": {
              "@type": "Person",
              "name": "Lance Wicks",
              "email": "lw@judocoach.com"
            }
          }
        ]
      }
    </script>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to main content</a>

    <header class="site-header">
      <nav class="inpage-nav" aria-label="On this page">
        <ul>
          <li><a href="#why">Why it helps</a></li>
          <li><a href="#workflow">How an event runs</a></li>
          <li><a href="#scoring">Scoring</a></li>
          <li><a href="#deploy">Where it runs</a></li>
          <li><a href="#demo">Get a demo</a></li>
        </ul>
      </nav>
    </header>

    <main id="main" class="content">
      <section class="hero" aria-labelledby="hero-heading">
        <p class="hero-brand" lang="ja">柔道 | 形</p>
        <h1 id="hero-heading">Judo Kata Tournament Manager</h1>
        <p class="lede">
          Browser-based software to organise, score, and rank judo kata
          competitions — built for event organisers and judges.
        </p>
        <p class="hero-actions">
          <a href="mailto:lw@judocoach.com?subject=Kata%20Tournament%20Manager%20demo"
            >Email Lance for a demo or test event</a
          >
        </p>
      </section>

      <section id="why" class="section" aria-labelledby="why-heading">
        <h2 id="why-heading">Why it helps</h2>
        <div class="two-col">
          <div>
            <h3>For organisers</h3>
            <ul>
              <li>
                Add competitors and judges by hand or import them from CSV
              </li>
              <li>
                Form pairs across categories, run a random performance draw,
                and track progress as scoresheets are completed
              </li>
              <li>
                Keep the event on a local machine with LAN access for tables —
                no internet required during the competition
              </li>
              <li>
                Store each event in its own SQLite database for simple backup
                and reporting
              </li>
            </ul>
          </div>
          <div>
            <h3>For judges</h3>
            <ul>
              <li>
                Enter scoresheets per pair and judge through a clear web
                interface
              </li>
              <li>
                Record small, medium, and big mistakes, correction values, and
                forgotten techniques
              </li>
              <li>
                See leaderboards update from calculated totals with EJU-style
                tie-breaks
              </li>
              <li>
                Work alongside organisers on the same system at the same time
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="workflow" class="section" aria-labelledby="workflow-heading">
        <h2 id="workflow-heading">How an event runs</h2>
        <p>
          One central server, many browsers. Organisers, judges, and other
          helpers can work in parallel from the web interface.
        </p>

        <h3>Competitors</h3>
        <p>
          Register competitors through the web UI or CSV import. Each person
          can enter multiple categories. Create pairs after individuals are in
          the system.
        </p>
        <figure>
          <img
            src="screenshots/Competitors-Kata.png"
            alt="Competitors summary page listing registered athletes"
            loading="lazy"
            width="1046"
            height="858"
          />
          <figcaption>Competitors page</figcaption>
        </figure>

        <h3>Pairs</h3>
        <p>
          Form tori and uke pairs for each kata category. An athlete can appear
          in more than one pair across categories.
        </p>
        <figure>
          <img
            src="screenshots/Pairs-Kata.png"
            alt="Pairs page showing competitor pairs and their kata categories"
            loading="lazy"
            width="1046"
            height="586"
          />
          <figcaption>Pairs page</figcaption>
        </figure>

        <h3>Judges</h3>
        <p>
          Add judges per kata, or import them from CSV. Judges score pairs in
          the categories they are assigned to.
        </p>
        <figure>
          <img
            src="screenshots/Judges-Kata.png"
            alt="Judges page listing judges and the kata they are judging"
            loading="lazy"
            width="1046"
            height="644"
          />
          <figcaption>Judges page</figcaption>
        </figure>

        <h3>Draw and scoresheets</h3>
        <p>
          Run an automated random draw for performance order, then enter
          scoresheets per pair and judge. With three or more judges, the
          highest and lowest judge totals are dropped when calculating the pair
          score.
        </p>
        <figure>
          <img
            src="screenshots/Scoresheet-Kata-Pair-Judge.png"
            alt="Scoresheet page for a pair and judge with technique scores and mistake controls"
            loading="lazy"
            width="1046"
            height="1102"
          />
          <figcaption>Scoresheet page</figcaption>
        </figure>

        <h3>Leaderboards and progress</h3>
        <p>
          Leaderboards rank pairs by calculated score. A summary view shows how
          far the category has progressed — useful for medals, announcements,
          and keeping the mat schedule moving.
        </p>
        <figure>
          <img
            src="screenshots/Leaderboard-Kata.png"
            alt="Leaderboard page ranking pairs by total score for a kata"
            loading="lazy"
            width="1046"
            height="512"
          />
          <figcaption>Leaderboard page</figcaption>
        </figure>
        <figure>
          <img
            src="screenshots/Kata.png"
            alt="Kata category summary showing completion progress"
            loading="lazy"
            width="1046"
            height="941"
          />
          <figcaption>Category progress summary</figcaption>
        </figure>
      </section>

      <section id="scoring" class="section" aria-labelledby="scoring-heading">
        <h2 id="scoring-heading">Scoring you can trust</h2>
        <p>
          Scoring follows EJU/IJF kata competition practice implemented in the
          application calculator — not a spreadsheet rewrite at the venue.
        </p>
        <ul>
          <li>
            Technique evaluation with small, medium, and big mistakes, plus
            optional +0.5 / −0.5 correction values
          </li>
          <li>
            Forgotten technique scores zero for that technique and halves the
            judge’s kata total once (rounded up)
          </li>
          <li>
            With three or more judges, drop the highest and lowest judge totals
          </li>
          <li>
            Tie-breaks: fewer big mistakes, then medium, then small, then
            average score
          </li>
          <li>
            Competition formula by entry size: up to 6 pairs go straight to a
            final; 7–11 use one preliminary (top 4 advance); 12+ use two
            preliminaries (top 3 per group advance)
          </li>
        </ul>
        <h3>Supported kata</h3>
        <ul>
          <li>Nage-no-Kata (including 1G, 2G, and 3G variants)</li>
          <li>Katame-no-Kata (including 1G)</li>
          <li>Ju-no-Kata</li>
          <li>Kime-no-Kata</li>
          <li>Kodokan Goshin Jutsu</li>
        </ul>
        <figure>
          <a href="KataSoftware-Container.png">
            <img
              src="KataSoftware-Container.png"
              alt="Container diagram of the Judo Kata Tournament Manager system components"
              loading="lazy"
              width="1046"
              height="541"
            />
            <figcaption>System overview (click for full size)</figcaption>
          </a>
        </figure>
      </section>

      <section id="deploy" class="section" aria-labelledby="deploy-heading">
        <h2 id="deploy-heading">Runs where you need it</h2>
        <ul>
          <li>
            Access everything through a web browser — no special client install
            for tableside users
          </li>
          <li>
            Run on a primary machine at the venue; use a local network when
            multiple devices need access
          </li>
          <li>Each event uses its own SQLite database file</li>
          <li>Optional Docker packaging for consistent deployment</li>
          <li>
            Built with Perl, Mojolicious, SQLite, and AlmondCSS; licensed under
            the AGPL
          </li>
        </ul>
        <p>
          Audience-facing ideas such as TV graphic overlays and pushing live
          results to external websites are on the roadmap — they are not part of
          the current release.
        </p>
      </section>

      <section id="demo" class="section cta-panel" aria-labelledby="demo-heading">
        <h2 id="demo-heading">Interested in trying it?</h2>
        <p>
          The software is under active volunteer development and is available
          for demos and supervised test use. Online walkthroughs, sandbox
          access, and parallel runs beside an existing scoring process are all
          welcome.
        </p>
        <p>
          Contact
          <a href="mailto:lw@judocoach.com">Lance Wicks (lw@judocoach.com)</a>
          to arrange a demo or discuss a test event.
        </p>
      </section>

      <section class="section memorial" aria-labelledby="memorial-heading">
        <h2 id="memorial-heading">In memory of Michel Kozlowski</h2>
        <p>
          Michel Kozlowski passed away in 2023. This site and software would not
          exist without his many years of dedication to kata and kata scoring
          software.
        </p>
        <img
          src="mk.jpg"
          alt="Portrait of Michel Kozlowski"
          width="660"
          height="657"
          loading="lazy"
        />
        <p>
          This website and the software developed here are dedicated to his
          memory.
        </p>
      </section>

      <section class="section" aria-labelledby="reading-heading">
        <h2 id="reading-heading">Further reading</h2>
        <ul>
          <li>
            <a
              href="https://www.kodokanjudoinstitute.org/en/waza/forms/"
              rel="noopener noreferrer"
              >Kodokan kata pages</a
            >
            — definitive documentation on judo kata
          </li>
          <li>
            <a
              href="https://www.ijf.org/ijf/documents/15"
              rel="noopener noreferrer"
              >IJF Kata Commission documents</a
            >
            — International Judo Federation kata materials
          </li>
          <li>
            <a
              href="https://sites.google.com/site/katascoresheets/"
              rel="noopener noreferrer"
              >Kata Scoresheets (EJU)</a
            >
            — Michel Kozlowski’s Excel-based scoring software
          </li>
        </ul>
      </section>
    </main>

    <footer class="site-footer">
      <details>
        <summary>About Judo Kata Tournament Manager</summary>
        <h3>© Copyright 2022–2026 Lance Wicks</h3>
        <p>
          For assistance please email
          <a href="mailto:lw@judocoach.com">lw@judocoach.com</a>.
        </p>
        <p>
          Developers interested in contributing: please get in touch. The
          application is AGPL-licensed and under active development; the source
          is not publicly open yet while it is brought to a ready state.
        </p>
        <p>This software uses:</p>
        <ul>
          <li>
            <a href="https://www.perl.org/" rel="noopener noreferrer">Perl</a>
          </li>
          <li>
            <a href="https://mojolicious.io/" rel="noopener noreferrer"
              >Mojolicious</a
            >
          </li>
          <li>
            <a href="https://sqlite.org/index.html" rel="noopener noreferrer"
              >SQLite</a
            >
          </li>
          <li>
            <a
              href="https://alvaromontoro.github.io/almond.css/demo/"
              rel="noopener noreferrer"
              >Almond.CSS</a
            >
          </li>
        </ul>
        <p>
          The kata software is licensed under the
          <a
            href="https://github.com/lancew/judo-kata-tournament-manager/blob/main/LICENSE"
            rel="noopener noreferrer"
            >AGPL</a
          >.
        </p>
        <p>
          This website’s source code is available at
          <a
            href="https://github.com/lancew/kata-website"
            rel="noopener noreferrer"
            >github.com/lancew/kata-website</a
          >.
        </p>
      </details>
    </footer>
  </body>
</html>
```

Note on the container diagram `height="541"`: the source PNG is 6604×3420; 1046×541 preserves aspect ratio for CLS. If display width differs, keep the same ratio.

- [ ] **Step 2: Verify copy and SEO markers**

Run:

```bash
cd /home/lancew/dev/kata/kata-website
# Must NOT find the old typo domain or known bad phrases
! grep -n 'judococh.com' index.html
! grep -n 'This site to home' index.html
! grep -n 'Special chracter' index.html
! grep -n 'Are scoresheets' index.html
# Must find required SEO/a11y pieces
grep -q 'rel="canonical"' index.html
grep -q 'application/ld+json' index.html
grep -q 'Skip to main content' index.html
grep -q 'og:title' index.html
grep -q 'lw@judocoach.com' index.html
grep -q 'Kodokan Goshin Jutsu' index.html
grep -q 'TV graphic overlays' index.html
# Scoresheet alt present
grep -q 'Scoresheet page for a pair and judge' index.html
# Exactly one h1
test "$(grep -c '<h1' index.html)" -eq 1
```

Expected: all commands succeed (exit 0).

- [ ] **Step 3: Manual browser check**

Run a local static server:

```bash
cd /home/lancew/dev/kata/kata-website
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Confirm:

1. Skip link appears on Tab
2. In-page nav jumps to sections
3. Images load with captions
4. Hero CTA mailto works
5. Layout readable at ~375px and desktop widths

Stop the server when done (Ctrl+C).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
Refresh landing page copy, accessibility, and SEO markup.

EOF
)"
```

---

### Task 4: README update and final verification

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: Completed site from Tasks 1–3
- Produces: Accurate contributor-facing README; green verification checklist

- [ ] **Step 1: Replace `README.md` with:**

```markdown
# kata-website

Marketing site for **Judo Kata Tournament Manager** (not the application itself).

- Live site: https://katajudo.com/ (GitHub Pages; `CNAME` → `katajudo.com`)
- Source of the product: private/companion repo `judo-kata-tournament-manager`
- Design notes: `docs/superpowers/specs/2026-08-10-marketing-site-refresh-design.md`

## Stack

- Single static `index.html`
- [AlmondCSS](https://alvaromontoro.github.io/almond.css/demo/) plus `css/kata.css`

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/

(c) 2022–2026 Lance Wicks
```

- [ ] **Step 2: Final verification checklist**

Run:

```bash
cd /home/lancew/dev/kata/kata-website
python3 -c "import json; json.load(open('site.webmanifest'))"
test -f robots.txt && test -f sitemap.xml
grep -q 'canonical' index.html
grep -q 'application/ld+json' index.html
! grep -n 'judococh.com' index.html README.md
# Heading order smoke: h1 then h2s present
grep -E '<h1|<h2' index.html | head -20
```

Manual pass (tick mentally):

- [ ] One `h1`; sections use `h2`/`h3` without skipping
- [ ] All screenshots and memorial image have `alt`
- [ ] No nested lists inside `<p>`
- [ ] Future TV/live-results wording is clearly roadmap, not current
- [ ] Organiser and judge benefits both present
- [ ] Memorial remains after CTA

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "$(cat <<'EOF'
Update README for the refreshed marketing site.

EOF
)"
```

---

## Spec coverage self-review

| Spec requirement | Task |
|------------------|------|
| Hero + CTA | Task 3 |
| Why it helps (organisers + judges) | Task 3 |
| Workflow with screenshots | Task 3 |
| Scoring credibility + kata list | Task 3 |
| Deploy / LAN / Docker / SQLite | Task 3 |
| CTA + memorial after CTA | Task 3 |
| Further reading + footer/dev note | Task 3 |
| AlmondCSS + kata.css layout | Task 2 |
| A11y (skip link, landmarks, alt, focus, valid HTML, email fix) | Tasks 2–3 |
| Spelling/grammar rewrite | Task 3 |
| Title, description, canonical, OG, JSON-LD | Task 3 |
| robots, sitemap, manifest | Task 1 |
| Copyright through 2026 | Task 3 |
| README | Task 4 |
| No unshipped feature claims as current | Task 3 deploy section |

No remaining placeholders. Types/class names are consistent across Tasks 2 and 3 (`skip-link`, `hero-brand`, `section`, `two-col`, `cta-panel`, `memorial`, `site-footer`, `inpage-nav`).
