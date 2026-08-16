// Fetches the Vithean YouTube playlists via RSS and writes src/data/videos.json.
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
//
// ---- Output shape -----------------------------------------------------------
// {
//   updatedAt, count,
//   playlists: [ { id, slug, title, description, url, order, count, videos: [...] } ],
//   videos:    [ ... every video once, newest first ... ],
//   playlistId, playlistUrl        ← the primary playlist, kept for older code
// }
//
// Videos are deliberately written TWICE: grouped under their playlist (what the
// tutorials index renders, in each playlist's own display order) and flattened
// newest-first (what the "latest tutorial" card, the per-video pages and
// llms.txt read). Both copies come from the same objects in one pass, so they
// cannot drift; the per-playlist copies carry that playlist's own `position`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_FILE = path.join(ROOT, 'src', 'data', 'videos.json');

// ---- Configuration ----------------------------------------------------------
// Add a playlist by appending an entry here — nothing else needs to change.
//
//   slug        URL-safe key; the anchor on /tutorials/ (#<slug>). Keep stable.
//   title       overrides the playlist's YouTube title. Omit to use YouTube's.
//   order       'playlist' → keep YouTube's own order (Ep1, Ep2, Ep3 …)
//               'newest'   → most recently published first
// Array order IS the order the sections appear on /tutorials/. The course comes
// first because it is the answer to "I am new, where do I start"; the task
// library below it is what you come back to once you know what you need.
const PLAYLISTS = [
  {
    id: 'PLaYqd2_7Mrhw',
    slug: 'vithean-capacity-building',
    title: 'Vithean Capacity Building',
    description:
      'A numbered series that follows the accounting cycle from end to end — invoice, collection, bill, payment, credit note, goods receipt. Start at Ep1 and work through in order; each episode assumes the one before it.',
    // Episodic: sorting this one newest-first would play the course backwards.
    order: 'playlist',
  },
  {
    id: 'PLaWNim5ubBGtianmfbq8L-hBkerht2-nU',
    slug: 'vithean-manual',
    title: 'Vithean Manual',
    description:
      'Short, self-contained walkthroughs of one task each — creating a sales invoice, a credit note, a goods transfer. Watch whichever one matches what you are doing right now; they do not need to be watched in order.',
    // A reference library, not a course: the newest guide is the most useful
    // one to surface first.
    order: 'newest',
  },
];

// The playlist that older single-playlist consumers should see. Pinned by id,
// not by position, so reordering the sections above cannot silently repoint it.
const PRIMARY =
  PLAYLISTS.find((p) => p.slug === 'vithean-manual') ?? PLAYLISTS[0];

const feedUrl = (id) => `https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`;

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
function readCache() {
  if (!fs.existsSync(OUT_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
  } catch {
    return null;
  }
}

function isCacheFresh(cache) {
  if (FORCE) return false;
  if (!cache?.updatedAt) return false;
  // A playlist added to PLAYLISTS since the last write must be fetched even if
  // the file is minutes old, otherwise it stays invisible for six hours.
  const cached = new Set((cache.playlists ?? []).map((p) => p.id));
  if (PLAYLISTS.some((p) => !cached.has(p.id))) return false;
  const age = Date.now() - new Date(cache.updatedAt).getTime();
  return age >= 0 && age < CACHE_MAX_AGE_MS;
}

// ---- Stable slugs -----------------------------------------------------------
// Slugs are normally derived from the video title, which means retitling on
// YouTube silently moves the /tutorials/<slug>/ URL and 404s the old one.
// Pin a slug here (keyed by YouTube video ID) to decouple the URL from the
// title, so videos can be retitled freely for search without breaking links
// or the sitemap. Anything not listed keeps the title-derived slug.
const SLUG_OVERRIDES = {
  hz40bmNaQmg: 'how-to-create-sales-invoice-by-items-vithean-user-guide',
  wqwszk_sKSk: 'how-to-create-sales-invoice-vithean-user-guide',
  dpOIcuK3Vak: 'how-to-create-goods-transfer-from-one-to-another-warehouse-v',
  '1zzXjUX4ukM': 'how-to-create-goods-return-to-vendor-vithean-user-guide',
  _1uoO6Mr7eg: 'how-to-create-payment-cash-on-delivery-vithean-user-guide',
  'VwPH-4uL99s': 'how-to-create-transfer-cashbank-vithean-user-guide',
  'Gtcxb-dKSl0': 'credit-note-how-to-create-cn-thru-price-adjust-vithean-user-',
  '6-cj-AfFp0o': 'credit-note-how-to-create-cn-thru-goods-return-vithean-user-',
  'xwYyPss_k-c': 'how-to-create-a-supplier-invoice-vithean-user-guide',
  btxIivBnjds: 'vithean-how-to-register-vithean-account-vithean-user-guide',
};

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

// The playlist's own name lives in the <title> before the first <entry>; the
// per-video <title>s come after it, so slice the head off first.
function parseFeedTitle(xml) {
  const head = xml.split('<entry>')[0];
  const m = /<title>([\s\S]*?)<\/title>/.exec(head);
  return m ? decodeEntities(m[1].trim()) : null;
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
    entries.push({
      id,
      slug: SLUG_OVERRIDES[id] || slugify(title) || id.toLowerCase(),
      title,
      url: `https://youtu.be/${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
      thumbnailHQ: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      published: get('published'),
      author: get('name'),
      description: decodeEntities(get('media:description') || ''),
    });
  }
  return entries;
}

const byNewest = (a, b) => {
  const da = a.published ? Date.parse(a.published) : 0;
  const db = b.published ? Date.parse(b.published) : 0;
  return db - da;
};

// ---- Fetch one playlist -----------------------------------------------------
async function fetchPlaylist(cfg, cache) {
  const url = feedUrl(cfg.id);
  log(`fetching ${cfg.slug} — ${url}`);

  let xml;
  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (vithean-docs build)' },
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    xml = await resp.text();
  } catch (err) {
    // One dead feed must not blank out the playlists that did answer, so fall
    // back to this playlist's last known contents and carry on.
    const previous = (cache?.playlists ?? []).find((p) => p.id === cfg.id);
    if (previous?.videos?.length) {
      warn(`${cfg.slug}: fetch failed (${err.message}) — keeping ${previous.videos.length} cached video(s).`);
      return { ...previous, stale: true };
    }
    warn(`${cfg.slug}: fetch failed (${err.message}) — no cache to fall back on.`);
    return { ...playlistShell(cfg), videos: [], count: 0, error: err.message };
  }

  const videos = parseEntries(xml);
  if (cfg.order === 'newest') videos.sort(byNewest);

  return {
    ...playlistShell(cfg),
    title: cfg.title || parseFeedTitle(xml) || cfg.slug,
    count: videos.length,
    videos,
  };
}

function playlistShell(cfg) {
  return {
    id: cfg.id,
    slug: cfg.slug,
    title: cfg.title || cfg.slug,
    description: cfg.description ?? '',
    url: `https://www.youtube.com/playlist?list=${cfg.id}`,
    order: cfg.order ?? 'playlist',
    count: 0,
    videos: [],
  };
}

// ---- Cross-playlist slug resolution ----------------------------------------
// Two things can collide once there is more than one playlist: the same video
// appearing in both (same id, so it must resolve to ONE page) and two different
// videos slugifying to the same string. Resolve both here, before anything is
// written, so every copy of a video agrees on its URL.
function resolveSlugs(playlists) {
  const slugById = new Map();
  const used = new Map();

  for (const pl of playlists) {
    for (const v of pl.videos) {
      if (slugById.has(v.id)) continue; // same video, second playlist — keep its first slug
      let slug = v.slug;
      const n = (used.get(slug) || 0) + 1;
      used.set(slug, n);
      if (n > 1) slug = `${slug}-${v.id.slice(0, 6).toLowerCase()}`;
      slugById.set(v.id, slug);
    }
  }

  for (const pl of playlists) {
    pl.videos = pl.videos.map((v, i) => ({
      ...v,
      slug: slugById.get(v.id),
      playlistId: pl.id,
      playlistSlug: pl.slug,
      playlistTitle: pl.title,
      position: i + 1,
    }));
    pl.count = pl.videos.length;
  }
}

// ---- Main -------------------------------------------------------------------
async function main() {
  const cache = readCache();

  if (isCacheFresh(cache)) {
    log(`cache fresh (< ${CACHE_MAX_AGE_MS / 3_600_000}h old) — skipping fetch.`);
    return;
  }

  const playlists = [];
  for (const cfg of PLAYLISTS) {
    playlists.push(await fetchPlaylist(cfg, cache));
  }

  resolveSlugs(playlists);

  // Flat list: every video exactly once, newest first. A video that sits in two
  // playlists keeps the copy from the first playlist that claimed it, which is
  // also the playlist its page navigates within.
  const seen = new Set();
  const flat = [];
  for (const pl of playlists) {
    for (const v of pl.videos) {
      if (seen.has(v.id)) continue;
      seen.add(v.id);
      flat.push(v);
    }
  }
  flat.sort(byNewest);

  const payload = {
    updatedAt: new Date().toISOString(),
    count: flat.length,
    playlists,
    videos: flat,
    // Back-compat: anything still expecting a single playlist gets the primary.
    playlistId: PRIMARY.id,
    playlistUrl: `https://www.youtube.com/playlist?list=${PRIMARY.id}`,
  };

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2));

  const summary = playlists.map((p) => `${p.slug}=${p.count}`).join(', ');
  log(`wrote ${flat.length} video${flat.length === 1 ? '' : 's'} (${summary}) to ${path.relative(ROOT, OUT_FILE)}`);
}

main();
