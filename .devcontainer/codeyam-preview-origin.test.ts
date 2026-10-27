import { spawnSync } from 'child_process';
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const SCRIPT = path.resolve(__dirname, 'codeyam-preview-origin.sh');

let bin: string;
let log: string;

// Each stub appends one line — its name, then its args — to the shared log,
// and exits with the code named by `<NAME>_EXIT` (default 0).
function stub(name: string, envVar: string) {
  const file = path.join(bin, name);
  writeFileSync(
    file,
    `#!/bin/sh\necho "${name} DATABASE_URL=\${DATABASE_URL:-} $*" >> "${log}"\nexit \${${envVar}:-0}\n`,
  );
  chmodSync(file, 0o755);
}

function run(env: Record<string, string>) {
  const result = spawnSync('sh', [SCRIPT], {
    env: { PATH: `${bin}:/usr/bin:/bin`, ...env },
    encoding: 'utf8',
  });
  let calls: string[] = [];
  try {
    calls = readFileSync(log, 'utf8').trim().split('\n');
  } catch {
    // No stub ran.
  }
  return { status: result.status, stdout: result.stdout, calls };
}

beforeEach(() => {
  bin = mkdtempSync(path.join(tmpdir(), 'preview-origin-'));
  log = path.join(bin, 'calls.log');
  stub('codeyam-editor', 'EDITOR_EXIT');
  stub('gh', 'GH_EXIT');
  stub('npx', 'NPX_EXIT');
});

afterEach(() => {
  rmSync(bin, { recursive: true, force: true });
});

describe('codeyam-preview-origin.sh', () => {
  // Outside a codespace the editor's own origin choice is right, so the
  // script must touch nothing — not the origin, the ports, or the database.
  it('does nothing outside Codespaces', () => {
    const { status, calls } = run({});
    expect(status).toBe(0);
    expect(calls).toEqual([]);
  });

  // The Live Preview must load from the forwarded app port, built from this
  // codespace's name and forwarding domain — localhost is unreachable here.
  it('points the preview at the forwarded app port', () => {
    const { calls } = run({
      CODESPACE_NAME: 'fuzzy-loop-123',
      GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN: 'preview.app.github.dev',
    });
    expect(calls[0]).toContain(
      'editor preview-origin-mode dedicated --origin https://fuzzy-loop-123-3000.preview.app.github.dev',
    );
  });

  // Older codespaces may not export the forwarding domain; the public
  // default keeps the origin well-formed instead of ending in a bare dot.
  it('falls back to app.github.dev when the domain is unset', () => {
    const { calls } = run({ CODESPACE_NAME: 'fuzzy-loop-123' });
    expect(calls[0]).toContain('--origin https://fuzzy-loop-123-3000.app.github.dev');
  });

  // A private port redirects to a GitHub sign-in the iframe refuses to
  // render, so port 3000 of this codespace must be made public.
  it('makes the app port public for this codespace', () => {
    const { calls } = run({ CODESPACE_NAME: 'fuzzy-loop-123' });
    expect(calls[1]).toContain('gh DATABASE_URL= codespace ports visibility 3000:public -c fuzzy-loop-123');
  });

  // Scenario seeds need tables, so the schema is pushed to dev.db.
  it('pushes the schema to dev.db', () => {
    const { calls } = run({ CODESPACE_NAME: 'fuzzy-loop-123' });
    expect(calls[2]).toBe('npx DATABASE_URL=file:./dev.db prisma db push');
  });

  // One failed step must not skip the others: each fix stands alone, and
  // postStartCommand still needs to reach the editor launch afterwards.
  it('runs every step and says which one failed', () => {
    const { status, stdout, calls } = run({
      CODESPACE_NAME: 'fuzzy-loop-123',
      EDITOR_EXIT: '1',
      GH_EXIT: '1',
    });
    expect(calls).toHaveLength(3);
    expect(stdout).toContain('could not set preview origin');
    expect(stdout).toContain('could not make port 3000 public');
    expect(status).toBe(0);
  });
});
