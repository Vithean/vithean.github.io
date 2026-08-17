# Implementation Index — vithean.github.io (user manual, help.vithean.com)

Every implemented bug fix, feature, or dev report in this repo gets a record in this
folder and a row in the table below. Newest first.

**Task code.** `VTH-<issue-number>`, shared verbatim with every other repo the work
touches, so one change can be found across the estate:

```
grep -rl "VTH-2026-VIDEOS" T:\proj\Vithean\*\docs\impl
```

Reuse an existing code when work continues; mint a new one only for genuinely new work.

**File name.** `VTH-<n>-<kebab-slug>.md`. **Type** is `feat`, `bug` or `report`;
**Status** is `in-progress`, `done` or `reverted`.

> This folder documents *how the site is built*. Content for readers belongs in
> `src/content/docs/`, and long-form specs belong in the access-controlled
> `vithean-special-docs` repo.

## Records

| Code | Type | Title | Status | Also in | Updated |
|---|---|---|---|---|---|
| [VTH-2026-DEPS](VTH-2026-DEPS-astro-7-starlight-upgrade.md) | report | Clear the Dependabot backlog — Astro 5→7, Starlight 0.30→0.41 | done | — | 2026-08-17 |
| [VTH-2026-VIDEOS](VTH-2026-VIDEOS-capacity-building-playlist.md) | feat | Second YouTube playlist (Capacity Building) on the tutorials page | done | — | 2026-08-17 |
