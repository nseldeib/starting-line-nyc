#!/bin/sh
# Runs on every codespace start (postStartCommand), before the editor boots.
# The app does not hydrate under the editor's `/__codeyam_preview` mount, so
# the Live Preview must be served from the app port's own origin. Left to
# itself the editor picks `http://localhost:3000`, which a browser-based
# codespace viewer cannot reach — point it at the forwarded port instead.
# Re-derived each start so a new codespace (new name) gets the right URL.

[ -n "${CODESPACE_NAME:-}" ] || exit 0

port=3000
origin="https://$CODESPACE_NAME-$port.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-app.github.dev}"

codeyam-editor editor preview-origin-mode dedicated --origin "$origin" \
  || echo "codeyam-preview-origin: could not set preview origin to $origin"

# A private port answers with a GitHub sign-in redirect, which refuses to
# render inside the preview iframe — so the pane stays blank. Visibility
# cannot be set in devcontainer.json, and a fresh codespace starts private.
gh codespace ports visibility "$port:public" -c "$CODESPACE_NAME" \
  || echo "codeyam-preview-origin: could not make port $port public"

# A codespace with no dev.db leaves the scenario sandbox without tables, and
# every scenario seed then fails ("table main.Organizer does not exist").
# `db push` is a no-op when the schema is already in sync.
DATABASE_URL=file:./dev.db npx prisma db push \
  || echo "codeyam-preview-origin: prisma db push failed"
