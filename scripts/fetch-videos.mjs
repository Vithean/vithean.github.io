// Fetches the Vithean YouTube playlist via RSS and writes src/data/videos.json.
//
// Usage:
//   npm run fetch:videos         → fetch only if cache is stale or missing
//   npm run fetch:videos -- --force  → always refetch
//   npm run fetch:videos -- --quiet  → only log on actual fetch
//
// Wired into:
//   - "predev"   hook in package.json (before astro dev)
//   - "prebuild" hook in package.json (before astro build)
//   - GitHub Action daily cron (.github/workflows/deploy.yml)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_FILE = path.join(ROOT, 'src', 'data', 'videos.json');

// ---- Configuration ----------------------------------------------------------
const PLAYLIST_ID = 'PLaWNim5ubBGtianmfbq8L-hBkerht2-nU';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;
// Cache is considered fresh if the file was written within this window.
// Pre-hooks run on every dev/build; we don't want to hit YouTube every time.
const CACHE_MAX_AGE_MS = 6 * 60 * 60 * 1000; // 6 hours

// ---- CLI flags --------------------------------------------------------------
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const QUIET = args.includes('--quiet');

const log = (...a) => { if (!QUIET) console.log('[fetch-videos]', ...a); };
const warn = (...a) => console.warn('[fetch-videos]', ...a);

// ---- Freshness check --------------------------------------------------------
function isCacheFresh() {
  if (FORCE) return false;
  if (!fs.existsSync(OUT_FILE)) return false;
  try {
    const data = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
    if (!data?.updatedAt) return false;
    const age = Date.now() - new Date(data.updatedAt).getTime();
    return age >= 0 && age < CACHE_MAX_AGE_MS;
  } catch {
    return false;
  }
}

// ---- Helpers ----------------------------------------------------------------
function slugify(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

function decodeEntities(s) {
  return s
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function parseEntries(xml) {
  const entries = [];
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = entryRe.exec(xml)) !== null) {
    const block = m[1];
    const get = (tag) => {
      const r = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`).exec(block);
      return r ? r[1].trim() : null;
    };
    const id = get('yt:videoId');
    if (!id) continue;
    const title = decodeEntities(get('title') || '');
    const baseSlug = slugify(title) || id.toLowerCase();
    entries.push({
      id,
      slug: baseSlug,
      title,
      url: `https://youtu.be/${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
      thumbnailHQ: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      published: get('published'),
      author: get('name'),
      description: decodeEntities(get('media:description') || ''),
    });
  }
  // Sort newest-first by published date so videos[0] is always the latest.
  entries.sort((a, b) => {
    const da = a.published ? Date.parse(a.published) : 0;
    const db = b.published ? Date.parse(b.published) : 0;
    return db - da;
  });

  // De-dup slugs (very rare but defensive). Done AFTER sort so collisions
  // are resolved deterministically by recency.
  const seen = new Map();
  for (const v of entries) {
    const count = (seen.get(v.slug) || 0) + 1;
    seen.set(v.slug, count);
    if (count > 1) v.slug = `${v.slug}-${v.id.slice(0, 6).toLowerCase()}`;
  }
  return entries;
}

function writeEmpty(reason) {
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(
    OUT_FILE,
    JSON.stringify({
      playlistId: PLAYLIST_ID,
      playlistUrl: `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`,
      updatedAt: null,
      count: 0,
      videos: [],
      error: reason,
    }, null, 2)
  );
}

// ---- Main -------------------------------------------------------------------
async function main() {
  if (isCacheFresh()) {
    log(`cache fresh (< ${CACHE_MAX_AGE_MS / 3_600_000}h old) — skipping fetch.`);
    return;
  }

  log(`fetching ${FEED_URL}`);
  let xml;
  try {
    const resp = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (vithean-docs build)' },
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    xml = await resp.text();
  } catch (err) {
    warn('fetch failed:', err.message);
    if (!fs.existsSync(OUT_FILE)) {
      writeEmpty(err.message);
      warn('wrote empty placeholder so the build can continue.');
    } else {
      warn('keeping existing cache.');
    }
    process.exit(0);
  }

  const videos = parseEntries(xml);
  const payload = {
    playlistId: PLAYLIST_ID,
    playlistUrl: `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`,
    updatedAt: new Date().toISOString(),
    count: videos.length,
    videos,
  };

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2));
  log(`wrote ${videos.length} video${videos.length === 1 ? '' : 's'} to ${path.relative(ROOT, OUT_FILE)}`);
}

main();
