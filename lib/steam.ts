import "server-only";

export type Game = {
  name: string;
  url?: string;
  /** Minutes played in the last two weeks. */
  recentMinutes?: number;
};

/**
 * Most recently played game from the Steam Web API.
 * Runs at build time. Returns null without credentials or on failure.
 */
export async function getRecentGame(): Promise<Game | null> {
  const { STEAM_API_KEY: key, STEAM_ID: id } = process.env;
  if (!key || !id) return null;

  try {
    const url = new URL("https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/");
    url.search = new URLSearchParams({ key, steamid: id, count: "1", format: "json" }).toString();
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      response?: { games?: { appid: number; name: string; playtime_2weeks?: number }[] };
    };
    const game = json.response?.games?.[0];
    if (!game) return null;
    return {
      name: game.name,
      url: `https://store.steampowered.com/app/${game.appid}`,
      recentMinutes: game.playtime_2weeks,
    };
  } catch {
    return null;
  }
}
