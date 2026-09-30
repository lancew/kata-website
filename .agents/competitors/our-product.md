# Our product: Judo Kata Tournament Manager

**Last verified:** 2026-09-30
**Source:** this repository, `llms.txt`, `pricing.md`

## Identity
- **Name:** Judo Kata Tournament Manager
- **Website:** https://katajudo.com/
- **License:** AGPL-3.0
- **Stack:** Perl / Mojolicious, SQLite, browser UI; runs on one laptop
- **Maturity:** validated against the senior categories of the 2024 Silesian Open Judo Kata Competition; no public download yet (demos and supervised test events open)

## Positioning
An all-in-one kata competition system: draw, named judge tablets, live hall
results, announcer board, PDF packs, and CSV exports — from one laptop on the
venue LAN, with no internet.

## Pricing
- Software: free (AGPL-3.0), no subscription or per-event fee
- Optional paid services: on-site operation (£100/day + travel), posted
  pre-configured kit (quote), full hardware supply (quote)

## Feature notes
- **Scoring:** EJU, kata-judge/BJA-style, and IJF rulesets
- **Judge tablets:** named seats, S/M/B/F marks, ± corrections, submit/unsubmit, shadow seats
- **Live display:** hall results (rank 1 → fits 1080p), announcer board, draw and award ceremonies
- **Format:** prelim-to-final, seeding, nationality policy, Senior/U23 checks
- **Paperwork:** printable PDF packs (cover, order, results, pair×judge sheets), CSV exports
- **Audit:** scoring audit log of taps, submits, unsubmits
- **Offline / LAN:** yes — laptop server, no account, no cloud
- **Data ownership:** one SQLite file per event, kept by the organiser
- **Languages:** English, French, German live screens

## Strengths (be honest)
- Fully offline; runs where there is no internet
- All-in-one: draw, judging, displays, and paperwork in one event
- Three rulesets validated against a real competition
- Organiser owns the data; open source; no fees

## Weaknesses (be honest)
- No public download yet — onboarding is via demo/supervised test event
- Self-hosting on a laptop/LAN requires someone to set it up (or paid on-site help)
- Smaller ecosystem than a mass-market SaaS; English/French/German screens only
- Not a public registration/entry-payment platform

## Best for
- Clubs, federations, and organisers running kata competitions who want tablets,
  live results, and reliable offline operation

## Not ideal for
- Events needing cloud/multi-site access, online public entry and payment, or
  shiai (non-kata) bracket management
