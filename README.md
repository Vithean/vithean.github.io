# Vithean User Manual

Modern documentation site for **Vithean** — built with [Astro Starlight](https://starlight.astro.build/), hosted on GitHub Pages.

> **Status:** this `astro-migration` branch contains the new site. The existing
> `docs/` folder is still the live Docsify site on `main`. When you're ready
> to cut over, merge this branch and switch the GitHub Pages source.

---

## Quick start (local dev)

```powershell
# 1. Install dependencies
npm install

# 2. (Optional) Fetch the YouTube playlist into src/data/videos.json
npm run fetch:videos

# 3. Run the dev server
npm run dev
```

Then open <http://localhost:4321>.

---

## What's in here

| Path | Purpose |
| --- | --- |
| `astro.config.mjs` | Site config, sidebar, social links, head metadata |
| `src/content/docs/` | All manual content (Markdown / MDX) |
| `src/components/` | Custom Astro components (Footer, VideoEmbed, VideoGrid, Hero) |
| `src/styles/custom.css` | Brand colors, hero gradient, card hover styling, footer |
| `src/assets/logo.png` | Theme logo |
| `src/data/videos.json` | YouTube playlist data (auto-generated; do not edit by hand) |
| `public/` | Static assets (favicons, screenshots) — served at root `/` |
| `public/images/` | All product screenshots, reachable at `/images/...` |
| `scripts/fetch-videos.mjs` | Pulls YouTube playlist RSS → `src/data/videos.json` |
| `scripts/migrate-content.mjs` | One-time Docsify → Starlight migration (already run) |
| `.github/workflows/deploy.yml` | CI build + daily playlist refresh + deploy to Pages |

---

## Writing content

### New page

Create a Markdown file under `src/content/docs/...` with frontmatter:

```markdown
---
title: My new page
description: Short description shown in search and meta tags.
---

Your content here. Starlight renders the H1 from the `title` field
automatically — start the body directly.
```

Then register it in `astro.config.mjs` under `sidebar:` so it appears in nav.

### Images

Drop them anywhere under `public/images/`. Reference with absolute paths:

```markdown
![Caption](/images/process-flow/bill-01.png)
```

### Callouts (admonitions)

```markdown
:::note
Useful info.
:::

:::tip[Pro tip]
Custom-titled tip.
:::

:::caution
Heads up.
:::

:::danger
Critical warning.
:::
```

### Inline video

```mdx
import VideoEmbed from '../../components/VideoEmbed.astro';

<VideoEmbed id="YOUR_VIDEO_ID" title="How to record a bill" />
```

(MDX only — file must be `.mdx`, not `.md`.)

---

## Phase-by-phase verification checklist

Run `npm run dev` then check each item:

- [ ] **Phase 1 (Foundation)** — `http://localhost:4321` loads without errors; sidebar visible on the left.
- [ ] **Phase 2 (Content)** — every page in the sidebar renders; screenshots load (no broken images).
- [ ] **Phase 3 (Branding)** — Vithean logo appears top-left; toggling dark/light mode works; footer shows POSCAR credit + contact email.
- [ ] **Phase 4 (Landing)** — home page (`/`) shows hero + feature cards + CTA buttons; "Watch tutorials" jumps to `/tutorials/`.
- [ ] **Phase 5 (Videos)** — `/tutorials/` either shows the video grid OR the empty-state message (see below if empty).

---

## YouTube playlist setup

The script `scripts/fetch-videos.mjs` reads the playlist via YouTube's public RSS feed:

```
https://www.youtube.com/feeds/videos.xml?playlist_id=PLaWNim5ubBGtianmfbq8L-hBkerht2-nU
```

If you see "Video tutorials will appear here automatically..." the fetch returned 0 videos. Common causes:

1. **Playlist visibility** — RSS only works for `Public` playlists. On YouTube → playlist → ⋯ menu → set to **Public**.
2. **Wrong playlist ID** — edit `PLAYLIST_ID` near the top of `scripts/fetch-videos.mjs`.
3. **Temporary YouTube outage** — re-run `npm run fetch:videos`.

### Larger playlists or richer metadata

The RSS feed returns the latest ~15 videos. If the playlist grows past that, switch to the YouTube Data API:

1. Enable YouTube Data API v3 in Google Cloud Console.
2. Create an API key, store as repo secret `YOUTUBE_API_KEY`.
3. Update `scripts/fetch-videos.mjs` to call `playlistItems`.

---

## Deploying to GitHub Pages

The workflow `.github/workflows/deploy.yml` does this automatically:

- On every push to `main` → build + deploy.
- Daily at 06:00 UTC → re-build to pick up new YouTube videos.
- Manual run available via GitHub UI ("Run workflow").

**One-time setup** in repo settings → Pages:

1. **Source:** GitHub Actions
2. **Custom domain (optional):** `help.vithean.com`

When ready to cut over from Docsify, merge `astro-migration` → `main`.

---

## Tech stack

- [Astro 5](https://astro.build) — static site framework
- [Starlight 0.30](https://starlight.astro.build) — documentation theme
- [MDX](https://mdxjs.com) — Markdown + components (for `.mdx` pages only)
- [Pagefind](https://pagefind.app) — full-text search (bundled with Starlight)
- [Sharp](https://sharp.pixelplumbing.com) — image optimization

---

© 2024–2026 [POSCAR Digital Co., Ltd.](https://poscardigital.com) All rights reserved.
