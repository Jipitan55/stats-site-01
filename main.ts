// Nippon Numbers — hand-in program (Node 22, standard library only).
// Copies this repository's app/ and screenshots/ beside it to the output
// directory and writes /output/dossier.json with the vendored make.fun
// library, so the judge can read the site, its first load and its source.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's own caps (see the kit's RULES.txt): at most 4 screenshots,
// each at most 256 KiB; app/ at most 993 files and directories and 16 MiB;
// the dossier text at most 160 KiB.
const APP_MAX_FILES = 993;
const APP_MAX_BYTES = 16777216;
const SHOT_MAX = 4;
const SHOT_MAX_BYTES = 262144;

// Fail fast with a clear message when the entry would break the scorer's
// caps, instead of letting buildDossier refuse it opaquely.
function treeSize(dir) {
  let files = 0, bytes = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      const sub = treeSize(p);
      files += sub.files + 1;
      bytes += sub.bytes;
    } else if (st.isFile()) {
      files += 1;
      bytes += st.size;
    }
  }
  return { files, bytes };
}

const appDir = join(here, 'app');
const app = treeSize(appDir);
if (app.files > APP_MAX_FILES) throw new Error(`app/ has ${app.files} files/directories, over the cap of ${APP_MAX_FILES}`);
if (app.bytes > APP_MAX_BYTES) throw new Error(`app/ is ${app.bytes} bytes, over the cap of ${APP_MAX_BYTES}`);

const shotsDir = join(here, 'screenshots');
const shots = existsSync(shotsDir) ? readdirSync(shotsDir).filter((n) => !n.startsWith('.')) : [];
if (shots.length > SHOT_MAX) throw new Error(`${shots.length} screenshots, over the cap of ${SHOT_MAX}`);
for (const n of shots) {
  const size = statSync(join(shotsDir, n)).size;
  if (size > SHOT_MAX_BYTES) throw new Error(`screenshots/${n} is ${size} bytes, over the cap of ${SHOT_MAX_BYTES}`);
}

// Start from a clean output directory so a stale file from an earlier run
// can never leak into the entry. Empty the directory instead of removing
// it: the grader mounts /output as a volume, and removing a mount point
// fails with "Device or resource busy".
if (existsSync(out)) {
  for (const name of readdirSync(out)) {
    rmSync(join(out, name), { recursive: true, force: true });
  }
} else {
  mkdirSync(out, { recursive: true });
}

cpSync(appDir, join(out, 'app'), { recursive: true });
if (shots.length) cpSync(shotsDir, join(out, 'screenshots'), { recursive: true });

const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: SHOT_MAX, max_bytes: SHOT_MAX_BYTES },
  app_max_files: APP_MAX_FILES,
  app_max_bytes: APP_MAX_BYTES,
});
writeFileSync(join(out, 'dossier.json'), dossier);
console.log(`app: ${app.files} entries, ${app.bytes} bytes; screenshots: ${shots.length}; dossier.json: ${dossier.length} bytes`);

