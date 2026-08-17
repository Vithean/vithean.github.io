# VTH-2026-DEPS — Clear the Dependabot backlog (Astro 5→7, Starlight 0.30→0.41)

| | |
|---|---|
| **Task code** | VTH-2026-DEPS |
| **Type** | report |
| **Status** | done — 28 alerts → `found 0 vulnerabilities` |
| **Repos affected** | vithean.github.io |
| **Opened** | 2026-08-17 |
| **Last updated** | 2026-08-17 |

## Starting point

GitHub reported 28 Dependabot alerts (15 high, 9 moderate, 4 low) on the default branch —
27 open alerts across `package.json` and `package-lock.json`, **20 unique advisories**.

## Triage first: none of them were reachable

The published site is prerendered static HTML on GitHub Pages — no `output` mode set, no
adapter, no SSR. Every reflected-XSS, Host-header-SSRF and server-island advisory in the
list needs a server handling requests at runtime. There is none. The remaining Astro XSS
advisories were checked against the source rather than assumed:

| Advisory requires | Present? |
|---|---|
| `server:defer` / server islands | no |
| `transition:*` directives | no — the `transition:` hits are plain CSS |
| `define:vars` | no |
| `set:html` | no |
| Spread attributes | one, `<Default {...props} />` in `Footer.astro`, Starlight's own build-time props |

The one untrusted input is the YouTube RSS feed read at build time by
`scripts/fetch-videos.mjs` (see [VTH-2026-VIDEOS](VTH-2026-VIDEOS-capacity-building-playlist.md)).
Titles and descriptions render as `{v.title}`, which Astro escapes, and nothing uses
`set:html`, so that path is sound.

So the exposure was build-time (CI) and dev-time, not visitors. The upgrade was hygiene and
future-proofing, not incident response.

## Done in two commits, deliberately separable

**1. Non-breaking (`npm audit fix`, lockfile only) — 15 audit entries → 6.**
postcss 8.5.15→8.5.26, js-yaml 4.2.0→4.3.1, nanoid 3.3.12→3.3.18, svgo 4.0.1→4.0.2,
fast-uri 3.1.2→3.1.5, plus the yaml-language-server chain.

**2. The majors — 6 → 0.**

| Package | From | To |
|---|---|---|
| astro | 5.18.2 | 7.2.2 |
| @astrojs/starlight | 0.30.6 | 0.41.7 |
| @astrojs/mdx | 4.3.14 | 7.0.5 |
| sharp | 0.33.5 (+ nested 0.34.5) | 0.35.3 (single copy) |
| esbuild / vite | 0.27.7 / 6.4.3 | 0.28.2 / 8.2.1 (transitive) |

`npm audit fix --force` was **not** used. These move together by necessity: Starlight
0.41.7 peer-requires `astro ^7.0.2`, so the two cannot be upgraded independently.

## Three things that would have broken the deploy

1. **`npm install` failed with ERESOLVE.** npm resolved the new Starlight against the old
   one still on disk (0.30.6 wants `@astrojs/mdx ^4.0.1`, conflicting with mdx 7). Fixed by
   editing `package.json` and reinstalling from a removed `node_modules` + lockfile, not by
   `--legacy-peer-deps`, which would have left a broken tree.

2. **Starlight 0.33 changed the `social` config** from an object keyed by icon name to an
   array of `{ icon, label, href }`. The build fails loudly on this one, so it was cheap to
   find — but it is a config break, invisible to `npm audit`.

3. **CI ran Node 20; Astro 7 declares `engines.node >= 22.12.0`.** This would have passed
   locally and failed only in the Action, so `.github/workflows/deploy.yml` moves to Node
   22 in the same commit. `engines` is now declared in `package.json` so the mismatch
   surfaces at install time in future.

## One real regression, found by diffing the output

Astro 7 trims the newline between an expression and following text, so
`Published {publishedDate}` + `&middot;` rendered as `2026· Watch on YouTube` — the space
disappeared. Fixed with an explicit `{' '}` in `src/pages/tutorials/[slug].astro`.

This is exactly what the before/after comparison was for: `astro check` and the build were
both green while the page was subtly wrong.

## Verification

The pre-upgrade `dist/` was snapshotted and compared against the post-upgrade build:

- **42 pages, identical paths** — nothing added, dropped or renamed.
- **Prose identical on 10 sampled pages** (docs, splash, FAQ, tutorials index, a video page)
  once Starlight's new heading anchors are filtered out.
- The only content difference is an **addition**: Starlight 0.41 emits screen-reader
  heading anchors — `<span class="sr-only" data-pagefind-ignore>Section titled "…"</span>` —
  excluded from the search index by design.
- Both playlist sections, all 16 video pages, the sidebar anchors, the social links (from
  the new array form), the JSON-LD block and `llms.txt` all verified present.
- `npm audit` → **found 0 vulnerabilities**.

## If this needs doing again

Diff the built output, not just the build log. Two majors of a docs framework will keep
`astro check` green while quietly changing whitespace, markup and defaults; the page
inventory plus a prose diff of a handful of representative pages catches what the build
cannot tell you.
