# srijanchallapalli.com

Personal site. Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion, statically
exported and deployed to GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Editing content

Everything on the page is data-driven — you shouldn't need to touch components to update it.

| File | What it holds |
| --- | --- |
| `data/site.ts` | Name, intro, links, location, About copy, **Now** list, **Stack** |
| `data/projects.ts` | Featured projects (home) and the archive on `/projects` |
| `data/experience.ts` | Experience timeline |
| `data/status.ts` | Fallback values for the status strip (song, game, what you're doing) |

**Project visuals** live in `components/visuals/`, with images in `public/projects/<slug>/`:
ChitYap uses its App Store screenshots, Dillon AI uses its dashboard's Example Mode (mock deal),
ApplyPilot uses the app running on its fictional demo seed, and the LSM engine is a code-drawn diagram.

**Resume:** replace `public/resume.pdf`, and keep `data/experience.ts` in sync with it.

## The status strip

| Item | Source | When |
| --- | --- | --- |
| Local time | `Intl` in the browser | Live |
| Weather | [Open-Meteo](https://open-meteo.com) (no key) — `lib/weather.ts` | Live, in the browser |
| Listening | [Last.fm](https://www.last.fm/api) (Spotify scrobbles to it) — `lib/lastfm.ts` | Live, in the browser, every minute |
| Playing | `data/status.ts` | Hand-edited |
| Status | `data/status.ts` | Hand-edited |

To turn on Listening: connect Spotify at last.fm/settings/applications, create an API key at
last.fm/api/account/create, and fill in `lastfm` in `data/site.ts`. The key is read-only and meant
to be public. With it blank, the Listening slot is hidden.

## Deploying

`.github/workflows/deploy.yml` builds and publishes `out/` on every push to `main`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
`public/CNAME` keeps the custom domain.

## Structure

```
app/            routes: /, /projects, sitemap, robots, OG image
components/     Hero, StatusBar, ProjectShowcase, ExperienceTimeline, AboutSection, …
  motion/       Reveal, SplitHeading, ParallaxFrame — the whole motion system
  visuals/      project visuals (screenshots + one code-drawn diagram)
data/           all content
lib/            lastfm.ts, weather.ts
```

Motion respects `prefers-reduced-motion`: transforms are dropped and only opacity fades remain.
