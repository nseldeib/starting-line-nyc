---
title: "Race detail pages with real race data"
mode: ui
createdAt: "2026-10-26T20:24:53Z"
step: 3
source: manual
---

## Summary

Give every race its own page at `/races/<race>` so a runner can understand how and when to enter, and replace the labelled sample races with real NYC-area race data researched from organizers' official pages.

## What the runner gets

- **Race page header:** name, terrain, distance (and climb), organizer, place, race day in Eastern Time, weeks to train, and a licensed photo (or the distance tile).
- **How to enter:** the entry method in plain words (open registration, lottery, time qualifier, charity, membership), the current status, and the price when the organizer lists it.
- **Registration timeline for this year's race:** every date, past ones checked off, the next one highlighted. Every upcoming date and race day has **Add to calendar**.
- **Official links:** a prominent "Register on the official site" button, plus the source link and "last verified" date.
- **Missing or wrong details:** anything not confirmed is left out and labelled ("Price not listed — check the official site"). A **Report a missing or wrong detail** link opens a pre-filled GitHub issue on the public repo.
- **Home page:** tapping anywhere on a race row opens its page.
- **Unknown race:** a friendly not-found page with a link back to all races.

## Key Decisions

- Real data is researched once from official sources and stored with a source link and last-verified date per race edition. Nothing is guessed; unconfirmed fields stay empty and say so. Data does not refresh automatically (an automatic scraper is a separate, later plan).
- The "sample data" labels come off for researched editions; anything still unverified keeps a clear label.
- No mockup exists for this page; it reuses the home page's tokens, type and components and the improvisations are pointed out at the demo.

## Implementation

- `prisma/sample-data.json` → researched race data (and `prisma/seed.ts` loads it); no schema change needed (price, registration link, source and last-verified already exist per edition).
- New `app/races/[slug]/page.tsx` and `not-found.tsx`; new `app/lib/raceDetail.ts` (timeline state, plain-language entry method, report-issue link).
- `app/api/races/[slug]/calendar/route.ts`: download any single upcoming milestone, not just the next.
- `app/components/RaceRow.tsx`: whole-row link that keeps Save and Add to calendar working.
- `app/components/SiteFooter.tsx`, `README.md`: replace sample-data wording with source and verification wording.

## Scenarios

Race with full details (open registration, upcoming deadline); lottery race; race whose registration dates are not announced; race with no photo; unknown race (not found); phone layout.