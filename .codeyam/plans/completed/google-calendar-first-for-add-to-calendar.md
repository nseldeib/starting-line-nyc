---
title: "Google Calendar first for Add to calendar"
mode: ui
createdAt: "2026-10-26T21:39:36Z"
order: 3
source: manual
---

## Summary

Put Google Calendar first: every Add to calendar offers a one-tap "Google Calendar" link, with the .ics download kept for Apple Calendar and Outlook.

## What the runner gets

- Add to calendar opens a small menu: Google Calendar (first), Apple / Outlook (.ics download).
- The Google event has the same title, Eastern Time date and time (or all-day for date-only deadlines), official link and source as the .ics file.

## Key Decisions

- Uses Google's public "create event" link; no Google sign-in or API key, nothing sent to Google until the runner taps it.
- One shared event builder produces both the Google link and the .ics, so they can't disagree.

## Implementation

- `app/lib/raceCalendar.ts`: shared event model; new `googleCalendarUrl(event)`.
- Add-to-calendar control on the home rows and race-page timeline becomes a two-option menu.
- Tests: the Google link encodes timed and all-day events correctly across a daylight-saving change.

## Scenarios

Menu open on a timed deadline; menu open on a date-only deadline; race-day event; phone layout.