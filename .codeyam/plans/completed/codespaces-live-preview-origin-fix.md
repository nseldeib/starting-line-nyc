---
title: "Codespaces Live Preview origin fix"
mode: backend
createdAt: "2026-10-27T14:30:49Z"
step: 8
source: prototype
---

## Summary

Fix the Codespaces Live Preview, which loaded blank and kept breaking again after restarts. Already prototyped, committed as `5651798`, and fast-forwarded onto `main`.

## Root cause

1. The app does not hydrate under the editor's `/__codeyam_preview` mount (`diagnose-preview`: proxy leg "did NOT hydrate", direct leg hydrated). The committed `.codeyam/state/preview-subpath-hydration.json` verdict made the editor escalate to a dedicated origin. Its fallback was `http://localhost:3000`, which a browser-based codespace viewer cannot reach.
2. Codespaces ports start private. The forwarded `-3000.app.github.dev` URL answers with a 302 to GitHub's `pf-signin`, which refuses to render inside the preview iframe, so the pane stays blank.
3. Secondary: the codespace had no `dev.db`, and the scenario sandbox `capture.db` came up empty (0 bytes). Every seed then failed with "table `main.Organizer` does not exist".

## Files touched

- `.devcontainer/codeyam-preview-origin.sh` (new). Runs on every start, before the editor boots:
  - `preview-origin-mode dedicated --origin https://$CODESPACE_NAME-3000.$GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN`
  - `gh codespace ports visibility 3000:public`
  - `DATABASE_URL=file:./dev.db npx prisma db push` (a no-op when the schema is already in sync)
  - The script exits early outside Codespaces.
- `.devcontainer/devcontainer.json`
  - `postStartCommand` runs the script, logging to `.codeyam/logs/codespaces-preview-origin.log`.
  - Port 3000 is labelled "CodeYam Live Preview".
- `.codeyam/stack.json`: `preview.sameOriginSafe: false`, written by `preview-origin-mode`.

## Decisions

- The user chose to make port 3000 public rather than keep it private or fix subpath hydration in the app. Trade-off: anyone holding the URL can view the dev app (seed data only) while the codespace runs. The editor port 14199 stays private.
- The origin is derived on every start, not committed, because `previewOrigin` lives in the gitignored `editor.local.json` and the codespace name differs per codespace.

## Verified

- `/api/config` reports `previewOrigin` set to the forwarded 3000 URL and `previewSameOriginSafe: false`.
- `curl` of the forwarded URL returns 200 once the port is public.
- A capture of `home-all-distances-next-12-months` renders the hero photo, race thumbnails and 7 races.
- The user confirmed the preview loads in their browser.
- Not verified: a real codespace restart or a freshly created codespace.

## Remaining for Build

- No app source changed, so there is nothing to deconstruct. The work left is the audit and registration of the new devcontainer script.
- Open question: whether the missing `dev.db` is what empties `capture.db`. It was not confirmed; the start-up `db push` is a safeguard.