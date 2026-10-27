---
title: "Save races on this device"
mode: ui
createdAt: "2026-10-26T21:39:36Z"
order: 1
source: manual
---

## Summary

Make the Save button work: a runner can mark any race as Interested, Considering or Signed up, kept on their own device with no account.

## What the runner gets

- Save on each home-page row and on the race page opens a small choice: Interested, Considering, Signed up, or Remove.
- Saved races show their status on the row and race page.
- A short note explains saving is on this device only; accounts are not live yet.

## Key Decisions

- Stored in the browser (localStorage) by race slug, so it ships without accounts or a server. Clearing site data clears saves, and the copy says so.
- The page renders correctly with nothing saved and when storage is unavailable (private browsing).

## Implementation

- `app/lib/savedRaces.ts`: read/write saved statuses, tolerant of missing or corrupt storage.
- `app/components/SaveRaceButton.tsx`: client component with the three statuses.
- Race page: add the Save control near the official-site button.
- Remove "not live" wording for saving from the footer/README.

## Scenarios

Nothing saved; a race marked Signed up; storage unavailable; phone layout.