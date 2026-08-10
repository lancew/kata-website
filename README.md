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
