import "server-only";
import { statusFallback } from "@/data/status";
import { getListening } from "./spotify";
import { getRecentGame } from "./steam";

export type Status = {
  listening: {
    title: string;
    artist: string;
    url?: string;
    nowPlaying: boolean;
    playedAt?: string;
    live: boolean;
  };
  playing: { name: string; url?: string; live: boolean };
  doing: string;
  /** When the build-time data was collected. */
  builtAt: string;
};

/** Collected once per build; the browser fills in time and weather live. */
export async function getStatus(): Promise<Status> {
  const [track, game] = await Promise.all([getListening(), getRecentGame()]);

  return {
    listening: track
      ? { ...track, live: true }
      : { ...statusFallback.listening, nowPlaying: false, live: false },
    playing: game ? { ...game, live: true } : { ...statusFallback.playing, live: false },
    doing: statusFallback.doing,
    builtAt: new Date().toISOString(),
  };
}
