# Product Marketing Context

**Document version:** v2
**Last updated:** 2026-09-30

## Product Overview
**One-liner:** Browser-based software that runs an entire judo kata competition from one laptop on the venue's local network — no internet required.

**What it does:** Judo Kata Tournament Manager handles the draw, named judge tablets, live hall results, the announcer board, printable PDF scoresheet packs, and CSV exports. One laptop acts as the server; clerks, judges, the announcer, and displays use any browser on the same LAN. Each event is a single SQLite file owned by the organiser.

**Product category:** Judo kata competition / scoring software. How people search: "judo kata scoring software", "kata competition manager", "judo kata scoresheet".

**Product type:** Free, open-source self-hosted software (AGPL-3.0) plus optional paid services (on-site operation, hardware supply).

**Business model:** Software is free with no per-event fee. Revenue comes from paid services: running an event on-site (£100/day + travel), posting a pre-configured Raspberry Pi kit (quoted), and full hardware supply (quoted).

## Target Audience
**Target companies:** Judo clubs, national federations, and event organisers running kata competitions — from club events to EJU/IJF-level competitions.

**Decision-makers:** Head organiser / competition director (budget + decision); head kata referee or kata commission (ruleset trust); federation IT / technical officer (deployment).

**Primary use case:** Run a kata competition's draw, judging, scoring, live results, and paperwork accurately and on time, without spreadsheets or manual tallying.

**Jobs to be done:**
- Run the competition accurately and on schedule
- Give judges a reliable, ruleset-correct way to score
- Show live results and running order to the hall
- Produce official scoresheets, results, and data exports
- Operate without depending on the venue's internet

**Use cases:**
- Club and national kata competitions
- EJU/IJF/BJA-format events, including prelim-to-final formats
- Multi-mat events with rotation and large fields
- Organisers who want judge tablets and a hall display instead of paper

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Organiser / competition director | Event running on time; correct official results | Coordinating draw, judges, scoring, and paperwork under time pressure | One laptop runs the whole event; results and packs generated automatically |
| Kata judge | Scoring correctly and quickly | Learning new systems; losing marks; disputes | Named tablet seat, each tap saved, submit/unsubmit, shadow seats |
| Mat clerk / controller | Keeping mats moving; handling problems | Judge conflicts, tablet failures, score corrections | Nationality warnings, eligible replacements, browser scoresheet fallback, audit log |
| Federation IT / technical officer | Reliable deployment, data control | Venue networks, no cloud, policy constraints | Offline LAN, SQLite per event, optional Docker, AGPL source |

## Problems & Pain Points
**Core problem:** Scoring kata across a panel of judges and multiple rulesets is done by hand or on a spreadsheet at the table — slow, error-prone, and disconnected from what the hall sees.

**Why alternatives fall short:**
- Excel scoresheets (e.g. Michel Kozlowski's EJU sheets) are single-user files: no live devices, no hall display, totals entered manually
- Paper scoresheets require manual tallying and re-entry, and are hard to correct or audit
- Generic tournament software targets shiai (contest) brackets, not kata panels and rulesets
- Cloud tools depend on venue internet, which is often unreliable or absent

**What it costs them:** Hours of manual entry, risk of incorrect official results, disputes, delayed results, and stressed volunteers.

**Emotional tension:** Fear of getting official results wrong, of a system failing mid-event, and of switching away from a process everyone already knows.

## Competitive Landscape
**Direct:** [Judo Kata Judge](https://kata-judge.judowaza.org/) (AGPL) — an IJF-ruleset judging web app built on an Azure cloud database; falls short because it assumes internet, is judging-only, and does not evidence draw, hall display, or printable packs. Vader Consulting's *Kata Manager* (MIT, C#/Windows) offers kata scorecards but is Windows-desktop only.

**Secondary:** Michel Kozlowski's Excel "Kata Scoresheets (EJU)" — falls short because it is single-user, not live, and requires manual totals.

**Indirect:** Paper scoresheets + manual tallying, and generic spreadsheets — fall short because they are slow, error-prone, and give the hall nothing live.

## Differentiation
**Key differentiators:**
- Runs fully offline on a laptop LAN — no venue internet
- Named judge tablets with instant save, submit/unsubmit, and shadow seats
- Live results, announcer board, and animated draw/award ceremonies on hall screens
- Three scoring rulesets (EJU, kata-judge/BJA-style, IJF), validated against a real competition
- Printable PDF packs and CSV exports
- Organiser owns the data (one SQLite file; no cloud, no account)
- Open source (AGPL) with no per-event fees

**How we do it differently:** One laptop is the server; every other screen is a plain browser on the LAN. Scoring, display, and paperwork are part of the same event rather than separate manual steps.

**Why that's better:** Reliable where internet isn't, faster than manual tallying, and consistent from tablet tap to official results.

**Why customers choose us:** Accuracy and ruleset fidelity, live results for the hall, offline reliability, and no cost or lock-in.

## Objections
| Objection | Response |
|-----------|----------|
| What if something fails on the day? | Scores save on every tap; the mat clerk can enter scores in a browser scoresheet; pages auto-reload every 5s if a connection drops; on-site or parallel-run options available |
| Will it match our ruleset? | Choose EJU, kata-judge/BJA-style, or IJF; validated against the senior categories of the 2024 Silesian Open Judo Kata Competition |
| What does it cost? | Software is free and open source (AGPL); paid on-site support (£100/day + travel) and hardware are optional |
| Is there a download? | Not yet — demos and supervised test events are open now |

**Anti-persona:** Events needing a cloud/multi-site service, online public registration and entry payments, or non-kata tournament management (shiai brackets).

## Switching Dynamics
**Push:** Spreadsheet tedium, manual tallies, slow or error-prone results, nothing live for the hall.

**Pull:** Judge tablets, live results, offline reliability, printable packs, free and open source.

**Habit:** Familiarity with the existing Excel scoresheet or paper process; "it works fine as it is."

**Anxiety:** Fear of the system failing mid-event; judges and clerks learning new tablets; no public download yet.

## Customer Language
**How they describe the problem:**
- _[needs input — capture verbatim from organisers/judges]_

**How they describe us:**
- _[needs input]_

**Words to use:** kata, tori, uke, panel, tatami/mat, scoresheet, draw, preliminary, final, EJU, IJF, BJA, live results.

**Words to avoid:** Over-claiming ("revolutionary", "seamless"); internal technical terms ("SSE") in customer-facing copy.

**Glossary:**
| Term | Meaning |
|------|---------|
| Kata | Set, choreographed judo forms performed by a pair |
| Tori / Uke | The pair performing a kata (throwing / receiving) |
| Panel | The judges seated for a performance |
| Prelim / Final | Preliminary round(s) then final, with advancers |
| Ruleset | EJU, kata-judge/BJA-style, or IJF scoring rules |

## Brand Voice
**Tone:** Professional, calm, practical, understated. British English.

**Style:** Direct, concrete, benefit-led with specifics ("one laptop", "£100 per day", "no internet required"). Honest about limits (states plainly there is no public download yet).

**Personality:** Reliable, experienced, respectful, plain-spoken.

## Proof Points
**Metrics:** Validated against the senior categories of the 2024 Silesian Open Judo Kata Competition; supports 8 kata families. _[confirm others]_

**Customers:** _[none named publicly yet — confirm]_

**Testimonials:**
> _[none yet — key gap]_

**Value themes:**
| Theme | Proof |
|-------|-------|
| Runs offline | Laptop server on venue LAN; no account or cloud |
| Ruleset fidelity | EJU / BJA / IJF, validated against a real competition |
| Live hall experience | Live results, announcer board, draw and award ceremonies |
| Data ownership | One SQLite file per event, kept by the organiser |
| Free and open | AGPL-3.0, no subscription or per-event fee |
| Credible operator | Built by a member of the IJF and EJU IT teams |

## Goals
**Business goal:** Get organisers to adopt the software and convert interest into demos and paid on-site/hardware services.

**Conversion action:** Email to book a demo or supervised test event; request an on-site support quote.

**Current metrics:** _[none tracked — no analytics installed]_

## Changelog
*Newest first. One line per revision: what changed and why.*
- v2 (2026-09-30) — Confirmed the direct competitive landscape (Judo Kata Judge, Vader Kata Manager) after competitor research; source data in `.agents/competitors/`.
- v1 (2026-09-30) — Initial context auto-drafted from the website, README, llms.txt, and pricing.md; customer language, testimonials, direct competitors, and metrics still to confirm.
