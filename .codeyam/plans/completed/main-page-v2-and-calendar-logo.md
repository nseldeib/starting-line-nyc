---
title: "Main page v2 and calendar logo"
mode: ui
createdAt: "2026-10-26T19:03:53Z"
step: 11
source: prototype
---

# Main page v2 and logo update (Starting Line)

## What was prototyped

There is no app code yet. The prototype exists only as design mockups under `.codeyam/design/project_mockups/`. Design 11 was left unchanged for comparison.

### Mockup 12: revised main page (now the selected design)
File: `.codeyam/design/project_mockups/12-offcatalog-mockup.html`. It is also copied to `.codeyam/design/selected_mockup.html`, and `selection.json` points at it.

Goals: remove the duplication in Design 11 and make the page clearer.
- **One search instead of two.** Design 11 had a hero search and a second "Race, park or organizer" search in the sidebar. Now there is a single search bar on the hero photo with these fields: Race/park/organizer (text), Distance, When and Terrain. Its button shows the result count ("Show 5 races").
- **Filters sit above the results.** The left sidebar is removed. The filter row shows active filters as dark chips with a remove ✕, other options as plain chips (Registration open, Opening soon, Lottery, 12+ weeks to train) and a dashed "More filters" chip, plus a Sort toggle (Next deadline / Race day).
- **Each race appears once.** The featured race card in the hero and the "Registration opening and closing soon" strip are removed. There is one list sorted by next deadline. Each row shows: thumbnail, name, terrain pill, distance, organizer, race day and place, registration status and next date in ET, weeks to train, and Save. Deadlines within 3 weeks get a blue-tinted highlight and an "Add to calendar" link.
- **Less repeated wording.** The nav is Races / Deadlines / How entry works. The headline is "Races around New York, and when to enter." The bottom section is a single "Save races to see your season" teaser with the season timeline preview and one "Sign up free" button. The separate closing CTA is removed.
- Mobile (≤1050px): the hero search stacks into a 2-column grid, rows collapse to thumbnail + text, the nav is hidden.
- Sample data change: "Greenbelt Trail 10K" became "Greenbelt Trail Half" so it fits the half filter. That race has no licensed photo, so its tile shows "13.1" instead of an image (no invented imagery, no route maps).

### Mockup 13: logo exploration
File: `.codeyam/design/project_mockups/13-offcatalog-mockup.html`. It contains the current mark plus 8 directions on a 48-unit grid: the line, the SL monogram (interlocking, slanted; the S's top stroke sweeps behind the L stem and its tail crosses over the blue foot), race bib, Deadline day calendar, stopwatch, go arrow, starting blocks and lanes. Each card shows the mark in the header on light and dark backgrounds and as 16 px and 32 px favicons.

**Decision:** use 04 "Deadline day" (a calendar with an ink header, binder rings, a grey day grid and one blue day for the registration deadline) **for now**. The user doesn't love any of the options and wants to revisit the logo later. Treat the mark as a swappable placeholder: keep it in one component or asset.

Mockup 12 already uses it in the header (inline SVG, 30 px) and as the SVG favicon.

## Files touched
- `.codeyam/design/project_mockups/12-offcatalog-mockup.html` (new)
- `.codeyam/design/project_mockups/13-offcatalog-mockup.html` (new)
- `.codeyam/design/project_mockups/target.json` (count 11 → 13)
- `.codeyam/design/selected_mockup.html`, `.codeyam/design/selection.json` (now mockup 12)
- `.codeyam/design/design_system.md` (source mockup reference → 12; tokens unchanged)

## Scenarios
None were registered. There are no app routes yet, so everything was reviewed in the design-exploration mockups view.

## For Build
- Build the signed-out home page from mockup 12, using the Design 11/12 tokens (white paper, ink #111, one blue accent #2B4ACB, Didone headings, Avenir body).
- Components to extract: Header (logo slot + nav), HeroSearch (fields + count button), FilterChips + SortToggle, RaceRow (the deadline highlight applies within 3 weeks), SeasonTeaser, Footer (photo credits + sample-data disclaimer).
- Logo: a single `Logo` component or SVG asset for the Deadline day mark, so it is easy to swap later.
- Show all times in ET. Use licensed photos with credits. Never draw invented course maps.
- Scenarios to add in Build: default results (5 halves), empty results, a race with no announced date, mobile layout.