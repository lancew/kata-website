# Competitor: Judo Kata Judge

**Last verified:** 2026-09-30
**Source:** https://kata-judge.judowaza.org/ and https://github.com/apparentvisuals/judo-kata-judge

## Identity
- **Name:** Judo Kata Judge
- **Website:** https://kata-judge.judowaza.org/
- **Repo:** https://github.com/apparentvisuals/judo-kata-judge
- **Tagline:** "Open source judo kata judging software based on the IJF ruleset."
- **License:** AGPL-3.0
- **Stack:** Nuxt / Vue web app; requires an Azure account and Azure Cosmos DB for storage
- **Maturity:** small project (2 GitHub stars), active (commits through 2026)

## Positioning
An online judging/scoring app focused on the IJF kata ruleset. Judges and
tournaments are stored in the cloud (Azure Cosmos DB); the hosted version runs
as an Azure Web App.

## Pricing
- Software: free, AGPL-3.0 (self-host)
- Running cost: requires Azure resources (Cosmos DB, Web App) — not free to run as designed

## Feature notes (verified from the repo; unverified = "not evidenced")
- **Scoring:** IJF ruleset
- **Data model:** judges, tournaments, invites, matches (athletes)
- **Export:** spreadsheet export (xlsx dependency)
- **Cloud dependency:** yes — Azure Cosmos DB is required for storage
- **Offline / LAN:** not evidenced; designed around a cloud database
- **Draw:** not evidenced
- **Live hall display / announcer:** not evidenced
- **Prelim-to-final, registration rules, audit, PDF packs:** not evidenced
- **Languages:** not evidenced

## Strengths (be fair)
- Open source under AGPL
- Focused on IJF-ruleset judging
- Modern web stack

## Weaknesses
- Requires Azure/Cosmos DB — a cloud dependency, so it assumes internet access
- Judging-focused: draw, hall display, announcer, prelim-to-final, and paperwork are not evidenced
- Self-hosting means setting up Azure resources
- Very small project — limited community and support

## Best for
- Organisers/panels who want an IJF-ruleset judging app and are comfortable with cloud hosting

## Not ideal for
- Venues without reliable internet
- Organisers who want one system for draw, judging, live displays, and printable packs

## Migration notes
- Both are AGPL web apps; no shared data format evidenced. Moving between them means re-entering entrants/judges.

## Review mining
- No G2/Capterra/review presence found; too niche for review platforms.
