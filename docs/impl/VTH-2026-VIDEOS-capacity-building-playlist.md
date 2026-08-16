# VTH-2026-VIDEOS — Second YouTube playlist on help.vithean.com

| | |
|---|---|
| **Task code** | VTH-2026-VIDEOS |
| **Type** | feat |
| **Status** | done — 16 videos, 2 playlists, built and verified |
| **Repos affected** | vithean.github.io |
| **Opened** | 2026-08-17 |
| **Last updated** | 2026-08-17 |

## What was asked

Add the **Vithean Capacity Building** playlist
(`https://www.youtube.com/playlist?list=PLaYqd2_7Mrhw`, 6 videos) to the tutorials section
of help.vithean.com, keeping the existing **Vithean Manual** playlist and arranging the two
so a reader can tell them apart.

The playlist's own YouTube title settled the naming question — the feed reports
`<title>Vithean Capacity Building</title>`, not "Vithean Academics".

## Approach

The pipeline handled exactly one playlist: `scripts/fetch-videos.mjs` had a single
`PLAYLIST_ID` const and wrote a flat `videos[]`. Rather than bolt on a second const, the
script now takes a `PLAYLISTS` array and writes both groupings in one pass:

- `playlists[]` — each with its own ordered `videos[]`. This is what the index renders.
- `videos[]` — every video once, newest-first. This is what the homepage "latest tutorial"
  card, the per-video pages and `llms.txt` read, so those kept working unchanged.

Both copies come from the same objects, so they cannot drift. `playlistId` / `playlistUrl`
are still written, pointing at the Manual playlist, for anything that expected the old
single-playlist shape.

### Per-playlist ordering — the part that actually mattered

The old parser sorted every feed newest-first. Capacity Building is a numbered course
(Ep1 → Ep6), so newest-first would have played it **backwards**. Each playlist now declares
an `order`:

| Playlist | `order` | Why |
|---|---|---|
| Vithean Capacity Building | `playlist` | Keeps YouTube's order. A course must run Ep1 → Ep6. |
| Vithean Manual | `newest` | A reference library — the newest guide is the most useful first. |

Array order is also section order on the page: the course sits first because it answers
"I am new, where do I start"; the task library sits below it. Reordering the array
reorders the page, and `PRIMARY` is pinned by slug so that cannot silently repoint the
back-compat fields.

### Cross-playlist collisions

Two playlists introduce two failure modes the single-playlist code never had: the same
video in both (one id, must resolve to **one** page) and two different videos slugifying
to the same string. `resolveSlugs()` handles both before anything is written — an id keeps
the first slug assigned to it, and a genuine slug clash gets the video id appended. The
flat list and `getStaticPaths()` both de-duplicate by id, so a shared video renders one
page and navigates within the first playlist that claimed it.

## Flow

```
YouTube RSS  ──┐
  playlist A   │  scripts/fetch-videos.mjs   (prebuild / predev / daily Action)
  playlist B   ├─→  src/data/videos.json  { playlists[], videos[] }
               │
               ├─→  VideoGrid.astro          → /tutorials/           one section per playlist
               ├─→  tutorials/[slug].astro   → /tutorials/<slug>/    prev/next within playlist
               ├─→  FeaturedVideo.astro      → /                     videos[0] = newest overall
               └─→  llms.txt.ts              → /llms.txt             one section per playlist
```

## Impacted files

| File | Change |
|---|---|
| `scripts/fetch-videos.mjs` | `PLAYLISTS` array, per-playlist `order`, feed-title parsing, per-playlist fetch fallback, `resolveSlugs()` |
| `src/data/videos.json` | regenerated — 16 videos in 2 playlists |
| `src/components/VideoGrid.astro` | renders one `<section id="<playlist-slug>">` per playlist; episode badges; "6 episodes · watch in order" vs "10 tutorials · newest first"; optional `playlist` prop |
| `src/pages/tutorials/[slug].astro` | prev/next walk the video's own playlist; eyebrow names the playlist; back link returns to that section |
| `src/content/docs/tutorials.mdx` | intro explaining which set answers which question |
| `src/styles/custom.css` | `.video-section*`, `.video-episode` |
| `astro.config.mjs` | sidebar "Video Tutorials" becomes a group with anchors to both sections |
| `src/pages/llms.txt.ts` | groups video links by playlist, labelled course vs standalone |

## Verified

`npm run build` → 42 pages, `astro check` clean. In `dist/`: both sections present in
course-then-library order, Ep1–Ep6 in sequence, all 16 video pages emitted, Ep3's page
reads "Episode 3 of 6" with prev = Ep2 and next = Ep4, a Manual page reads "2 of 10" with
no episode wording, the homepage card features Ep6 (newest overall), and `llms.txt` carries
both playlist sections.

## Adding a third playlist

Append one entry to `PLAYLISTS` in `scripts/fetch-videos.mjs` — id, slug, title,
description, order. The section, its anchor, the cards and the llms.txt block all follow.
Only the sidebar entry in `astro.config.mjs` needs adding by hand.
