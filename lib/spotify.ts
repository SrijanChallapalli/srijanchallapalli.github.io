import "server-only";

export type Track = {
  title: string;
  artist: string;
  url?: string;
  /** ISO timestamp; absent when the track is playing right now. */
  playedAt?: string;
  nowPlaying: boolean;
};

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API = "https://api.spotify.com/v1/me/player";

async function getAccessToken(): Promise<string | null> {
  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } =
    process.env;
  if (!id || !secret || !refresh) return null;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  external_urls?: { spotify?: string };
};

const toTrack = (t: SpotifyTrack, extra: Pick<Track, "nowPlaying" | "playedAt">): Track => ({
  title: t.name,
  artist: t.artists.map((a) => a.name).join(", "),
  url: t.external_urls?.spotify,
  ...extra,
});

/**
 * Current track if something is playing, otherwise the most recent one.
 * Runs at build time (static export). Returns null without credentials.
 */
export async function getListening(): Promise<Track | null> {
  try {
    const token = await getAccessToken();
    if (!token) return null;
    const headers = { Authorization: `Bearer ${token}` };

    const current = await fetch(`${API}/currently-playing`, { headers, cache: "no-store" });
    if (current.status === 200) {
      const json = (await current.json()) as { is_playing: boolean; item: SpotifyTrack | null };
      if (json.is_playing && json.item) return toTrack(json.item, { nowPlaying: true });
    }

    const recent = await fetch(`${API}/recently-played?limit=1`, { headers, cache: "no-store" });
    if (!recent.ok) return null;
    const json = (await recent.json()) as { items: { track: SpotifyTrack; played_at: string }[] };
    const item = json.items[0];
    return item ? toTrack(item.track, { nowPlaying: false, playedAt: item.played_at }) : null;
  } catch {
    return null;
  }
}
