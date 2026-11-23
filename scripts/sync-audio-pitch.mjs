import { createHash } from 'node:crypto';
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// The standalone player owns the source. Vercel builds verify the committed
// copies without needing access to the separate/private player repository.
const website = fileURLToPath(new URL('../', import.meta.url));
const source = resolve(website, '../kairos-audio-pitch');
const manifestPath = resolve(website, 'audio-pitch/manifest.json');
const files = [
  { source: 'index.html', destination: 'public/audio-ptch.html' },
  { source: 'pitch.mp3', destination: 'public/pitch.mp3' },
  { source: 'ugo-audio.html', destination: 'public/ugo-audio.html' },
  { source: 'ugo-audio-sw.js', destination: 'public/ugo-audio-sw.js' },
];
const args = process.argv.slice(2);
if (args.some((arg) => arg !== '--check')) throw new Error('Usage: node scripts/sync-audio-pitch.mjs [--check]');
const check = args.includes('--check');
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
async function exists(path) {
  try { await access(path); return true; }
  catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}
async function writeChanged(path, bytes) {
  if (await exists(path) && (await readFile(path)).equals(bytes)) return;
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, bytes);
}

// On Vercel only the committed website exists, so discover asset paths from
// the committed catalogue. Locally, use the canonical source catalogue.
const hasSource = await exists(source);
const catalog = JSON.parse(await readFile(resolve(hasSource ? source : resolve(website, 'public'), 'ugo-audio/catalog.json'), 'utf8'));
const assets = ['catalog.json', ...catalog.tracks.map((track) => track.file), ...Object.values(catalog.sessions).map((session) => session.file)];
if (new Set(assets).size !== assets.length) throw new Error('Duplicate rehearsal audio asset.');
for (const asset of assets) {
  if (!/^[a-z0-9./-]+$/.test(asset) || asset.includes('..') || asset.startsWith('/')) throw new Error('Invalid rehearsal asset path.');
  files.push({ source: `ugo-audio/${asset}`, destination: `public/ugo-audio/${asset}` });
}

if (hasSource) {
  // Read every input before writing, so an incomplete source cannot create a
  // mismatched page/recording pair. No Git/network or credentials are needed.
  const inputs = await Promise.all(files.map(async (file) => {
    const bytes = await readFile(resolve(source, file.source));
    if (!bytes.length) throw new Error(`Audio player source is empty: ${file.source}`);
    return { ...file, bytes, size: bytes.length, sha256: sha256(bytes) };
  }));
  const manifest = Buffer.from(JSON.stringify({
    source: '../kairos-audio-pitch',
    page: '/audio-ptch.html',
    rehearsalPage: '/ugo-audio.html',
    files: inputs.map(({ bytes, ...file }) => file),
  }, null, 2) + '\n');
  if (!check) {
    for (const file of inputs) await writeChanged(resolve(website, file.destination), file.bytes);
    await writeChanged(manifestPath, manifest);
  } else {
    for (const file of inputs) {
      if (!(await readFile(resolve(website, file.destination))).equals(file.bytes)) {
        throw new Error(`${file.destination} differs from the player. Run npm run audio:sync and commit both repositories.`);
      }
    }
    if (!(await readFile(manifestPath)).equals(manifest)) throw new Error('Audio manifest is stale. Run npm run audio:sync.');
  }
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
if (manifest.files.length !== files.length) throw new Error('Unexpected audio player manifest.');
for (const file of files) {
  const recorded = manifest.files.find((entry) => entry.source === file.source && entry.destination === file.destination);
  const path = resolve(website, file.destination);
  const bytes = await readFile(path);
  if (!recorded || (await stat(path)).size !== recorded.size || sha256(bytes) !== recorded.sha256) {
    throw new Error(`Audio player integrity check failed: ${file.destination}. Run npm run audio:sync from the full Kairos workspace.`);
  }
}
console.log(`Audio pitch ${check ? 'check' : 'sync'} passed: both players and ${assets.length - 1} rehearsal recordings.`);
