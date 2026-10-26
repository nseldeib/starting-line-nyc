#!/usr/bin/env node
// Build the app with codeyam's generated routes moved out of the way.
//
// Why this exists: anything under the app's own source tree compiles into the
// app and ships with it. The isolation routes carry a production guard that
// calls notFound(), which stops the page *rendering* — it does nothing about
// the chunk, which is still built and still fetchable. So "renders nothing" is
// not "ships nothing", and a static export will happily emit one HTML file per
// isolated component plus the fixture data they render.
//
// The routes are gitignored, so a fresh clone and a CI checkout never have
// them and this script no-ops there. A developer building from their working
// copy does have them on disk, which is the case this closes: move them aside,
// build, and restore in a `finally` so a failed build leaves the tree exactly
// as it found it.
//
// It deliberately does NOT require the codeyam binary. A CI checkout builds
// the app without codeyam installed, and a build script that hard-depended on
// it would break that.

import { spawn } from "node:child_process";
import { existsSync, readFileSync, renameSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";

const projectRoot = resolve(process.env.INIT_CWD ?? process.cwd());

// The directories to move aside come from .codeyam/stack.json rather than
// being hardcoded, so this script and the scaffold that writes those routes
// cannot drift apart. A project with no stack.json, no routing block, or no
// isolationRoute simply has nothing to exclude.
function isolationDirs() {
  const stackPath = join(projectRoot, ".codeyam", "stack.json");
  if (!existsSync(stackPath)) return [];

  let stack;
  try {
    stack = JSON.parse(readFileSync(stackPath, "utf8"));
  } catch (err) {
    // A malformed stack.json must not fail the build — it is codeyam's file,
    // not the app's. Warn and build everything.
    console.warn(`[build-app] could not parse .codeyam/stack.json (${err.message}); building without exclusions`);
    return [];
  }

  const route = stack?.routing?.isolationRoute;
  if (typeof route !== "string" || route.trim() === "") return [];

  const abs = join(projectRoot, route);
  return existsSync(abs) ? [abs] : [];
}

function runBuild() {
  // Pass through whatever arguments the caller added, so `npm run build -- --debug`
  // still works.
  const args = ["build", ...process.argv.slice(2)];

  // Prefer the project's own binary over whatever is on PATH. npm puts
  // node_modules/.bin on PATH for a run-script, but this file is also runnable
  // directly (`node scripts/build-app.mjs`), where it is not.
  const isWindows = process.platform === "win32";
  const binName = isWindows ? "next.cmd" : "next";
  const localBin = join(projectRoot, "node_modules", ".bin", binName);
  const command = existsSync(localBin) ? localBin : binName;

  return new Promise((resolvePromise, rejectPromise) => {
    // `shell` only on Windows, where a .cmd shim cannot be spawned without
    // one. On POSIX it buys nothing and costs an argument-escaping hazard.
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: "inherit",
      shell: isWindows,
    });
    child.on("error", rejectPromise);
    child.on("close", (code, signal) => {
      if (signal) rejectPromise(new Error(`next build terminated by signal ${signal}`));
      else if (code !== 0) rejectPromise(new Error(`next build exited with code ${code}`));
      else resolvePromise();
    });
  });
}

const dirs = isolationDirs();
// Each moved directory is parked in its own temp dir, so a component directory
// never collides with a same-named sibling and the restore is unambiguous.
const parked = [];
let stash;

try {
  if (dirs.length > 0) {
    stash = mkdtempSync(join(tmpdir(), "codeyam-build-"));
    for (const dir of dirs) {
      const away = join(stash, basename(dir));
      renameSync(dir, away);
      parked.push([away, dir]);
      console.log(`[build-app] excluded ${dir} from the build`);
    }
  }
  await runBuild();
} finally {
  // Restore in reverse order, and never let a restore failure mask the
  // build error that may already be propagating.
  for (const [away, original] of parked.reverse()) {
    try {
      renameSync(away, original);
    } catch (err) {
      console.error(`[build-app] FAILED to restore ${original} from ${away}: ${err.message}`);
      console.error(`[build-app] move it back by hand before running the editor again.`);
    }
  }
  if (stash) {
    try {
      rmSync(stash, { recursive: true, force: true });
    } catch {
      // A leftover empty temp dir is harmless; the OS reclaims it.
    }
  }
}
