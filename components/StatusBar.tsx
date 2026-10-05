"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { status } from "@/data/status";
import { getRecentTrack, type Track } from "@/lib/lastfm";
import { getWeather, type Weather } from "@/lib/weather";

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: site.location.timeZone,
  hour: "numeric",
  minute: "2-digit",
});

/** Current time, re-rendered exactly on each minute boundary. */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    let timer: number;
    const tick = () => {
      const d = new Date();
      setNow(d);
      timer = window.setTimeout(tick, 60_000 - (d.getTime() % 60_000) + 50);
    };
    tick();
    const onVisible = () => document.visibilityState === "visible" && (window.clearTimeout(timer), tick());
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
  return now;
}

function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const ctrl = new AbortController();
    getWeather(site.location.latitude, site.location.longitude, ctrl.signal)
      .then(setWeather)
      .catch((e) => e?.name !== "AbortError" && setFailed(true));
    return () => ctrl.abort();
  }, []);
  return { weather, failed };
}

const { lastfm } = site;
const hasLastfm = Boolean(lastfm.user && lastfm.apiKey);

/** Latest Last.fm track, refreshed every minute while the tab is visible. */
function useTrack() {
  const [track, setTrack] = useState<Track | null | undefined>(undefined);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!hasLastfm) return;
    let ctrl = new AbortController();
    const load = () => {
      ctrl.abort();
      ctrl = new AbortController();
      getRecentTrack(lastfm.user, lastfm.apiKey, ctrl.signal)
        .then((t) => (setTrack(t), setFailed(false)))
        .catch((e) => e?.name !== "AbortError" && setFailed(true));
    };
    load();
    const timer = window.setInterval(() => document.visibilityState === "visible" && load(), 60_000);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      ctrl.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
  return { track, failed };
}

const ago = (then: Date, now: Date) => {
  const mins = Math.max(0, Math.round((now.getTime() - then.getTime()) / 60_000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  return hrs < 48 ? `${hrs}h ago` : `${Math.round(hrs / 24)}d ago`;
};

function Item({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <dt className="t-meta text-ink-3">{label}</dt>
      <dd className="mt-1.5 line-clamp-2 text-[15px] leading-snug tracking-[-0.01em]">{children}</dd>
    </div>
  );
}

const Placeholder = () => <span className="inline-block h-[1em] w-16 animate-pulse rounded-sm bg-paper-2 align-middle" />;

/**
 * The "currently" strip. Time, weather and music are fetched live in the
 * browser; Playing and Status are hand-edited in data/status.ts.
 */
export function StatusBar() {
  const now = useNow();
  const { weather, failed } = useWeather();
  const { track, failed: trackFailed } = useTrack();

  return (
    <section aria-label="Currently">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:auto-cols-fr lg:grid-flow-col">
        <Item label="Location">
          <span className="inline-flex items-center gap-2">
            <span className="live-dot size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            {site.location.label}
          </span>
        </Item>

        <Item label="Weather">
          {weather ? (
            <span title={`${weather.tempC}°C`}>
              <span className="font-mono text-[14px] tabular-nums">{weather.tempF}°F</span>{" "}
              <span className="text-ink-2">{weather.condition}</span>
            </span>
          ) : failed ? (
            <span className="text-ink-2">Indiana-variable</span>
          ) : (
            <Placeholder />
          )}
        </Item>

        <Item label="Local time">
          {now ? (
            <span>
              <time className="font-mono text-[14px] tabular-nums" dateTime={now.toISOString()}>
                {timeFormat.format(now)}
              </time>
            </span>
          ) : (
            <Placeholder />
          )}
        </Item>

        {hasLastfm && (
          <Item label={track?.nowPlaying ? "Listening to" : "Last listened to"}>
            {track ? (
              <>
                <a
                  href={track.url}
                  target="_blank"
                  rel="noopener"
                  className="link-underline"
                  title={`${track.title} — ${track.artist}`}
                >
                  {track.title}
                  <span className="text-ink-2"> — {track.artist}</span>
                </a>
                {track.nowPlaying ? (
                  <span className="live-dot ml-2 inline-block size-1.5 rounded-full bg-accent align-middle" aria-hidden />
                ) : (
                  track.playedAt &&
                  now && <span className="ml-1.5 font-mono text-[12px] text-ink-3">{ago(track.playedAt, now)}</span>
                )}
              </>
            ) : track === null || trackFailed ? (
              <span className="text-ink-2">Nothing recently</span>
            ) : (
              <Placeholder />
            )}
          </Item>
        )}

        <Item label="Playing">
          <span title={status.playing}>{status.playing}</span>
        </Item>

        <Item label="Status">
          <span title={status.doing}>{status.doing}</span>
        </Item>
      </dl>
    </section>
  );
}
