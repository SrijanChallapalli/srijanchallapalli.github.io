/**
 * Current or most recent track from Last.fm. Spotify scrobbles to Last.fm, and
 * Last.fm's read-only API key is meant to be public and is CORS-enabled — so
 * this runs in the browser on a static site and is live on every visit.
 */
export type Track = {
  title: string;
  artist: string;
  url: string;
  nowPlaying: boolean;
  /** When the track finished; absent while it's playing. */
  playedAt?: Date;
};

type LastfmTrack = {
  name: string;
  url: string;
  artist: { "#text": string };
  date?: { uts: string };
  "@attr"?: { nowplaying?: string };
};

export async function getRecentTrack(user: string, apiKey: string, signal?: AbortSignal): Promise<Track | null> {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.search = new URLSearchParams({
    method: "user.getrecenttracks",
    user,
    api_key: apiKey,
    format: "json",
    limit: "1",
  }).toString();

  const res = await fetch(url, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`lastfm ${res.status}`);
  const json = (await res.json()) as { recenttracks?: { track?: LastfmTrack[] } };
  const t = json.recenttracks?.track?.[0];
  if (!t) return null;

  return {
    title: t.name,
    artist: t.artist["#text"],
    url: t.url,
    nowPlaying: t["@attr"]?.nowplaying === "true",
    playedAt: t.date ? new Date(Number(t.date.uts) * 1000) : undefined,
  };
}
