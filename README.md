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
| Listening | Spotify Web API — `lib/spotify.ts` | Build time |
| Playing | Steam Web API — `lib/steam.ts` | Build time |
| Status | `data/status.ts` | Build time |

GitHub Pages can't hold secrets, so Spotify and Steam are fetched **during the build** and the
deploy workflow rebuilds every 3 hours. Without credentials the strip falls back to
`data/status.ts`. To connect them, add these repository secrets (Settings → Secrets → Actions):

- `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` — create an app at
  developer.spotify.com and get a refresh token with the `user-read-currently-playing` and
  `user-read-recently-played` scopes.
- `STEAM_API_KEY`, `STEAM_ID` — from steamcommunity.com/dev/apikey; your game details must be public.

For local testing, copy `.env.example` to `.env.local`.

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
lib/            spotify.ts, steam.ts, weather.ts, status.ts
```

Motion respects `prefers-reduced-motion`: transforms are dropped and only opacity fades remain.
