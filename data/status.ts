/**
 * Fallbacks for the status strip. Used when an API key is missing or a
 * request fails — keep these honest and update them now and then.
 */
export const statusFallback = {
  listening: {
    title: "Nights",
    artist: "Frank Ocean",
    url: "https://open.spotify.com/track/7eqoqGkKwgOaWNNHx90uEZ",
  },
  playing: {
    name: "EA Sports College Football 26",
    url: undefined as string | undefined,
  },
  /** Free text — what I'm heads-down on this week. */
  doing: "Interning at MergeWorks, shipping ApplyPilot",
};
