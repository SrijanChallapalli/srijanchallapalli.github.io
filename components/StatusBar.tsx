"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { getWeather, type Weather } from "@/lib/weather";
import type { Status } from "@/lib/status";

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: site.location.timeZone,
  hour: "numeric",
  minute: "2-digit",
});
const hourFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: site.location.timeZone,
  hour: "numeric",
  hourCycle: "h23",
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

const ago = (iso: string, now: Date) => {
  const mins = Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 60_000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  return hrs < 48 ? `${hrs}h ago` : `${Math.round(hrs / 24)}d ago`;
};

/** A small line about what Srijan is probably doing at this hour. */
function dayPart(now: Date) {
  const h = Number(hourFormat.format(now));
  if (h < 6) return "probably asleep";
  if (h < 9) return "early start";
  if (h < 17) return "class / building";
  if (h < 22) return "building";
  return "late-night commits";
}

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
 * The "currently" strip. Time and weather are live in the browser; music and
 * games are collected at build time (see lib/status.ts) and fall back to
 * data/status.ts when no API keys are configured.
 */
export function StatusBar({ status }: { status: Status }) {
  const now = useNow();
  const { weather, failed } = useWeather();
  const { listening, playing } = status;

  return (
    <section aria-label="Currently">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
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
              </time>{" "}
              <span className="text-ink-2">{dayPart(now)}</span>
            </span>
          ) : (
            <Placeholder />
          )}
        </Item>

        <Item label={listening.nowPlaying ? "Listening now" : "Last played"}>
          <a
            href={listening.url}
            target="_blank"
            rel="noopener"
            className="link-underline"
            title={`${listening.title} — ${listening.artist}`}
          >
            {listening.title}
            <span className="text-ink-2"> — {listening.artist}</span>
          </a>
          {listening.live && !listening.nowPlaying && listening.playedAt && now && (
            <span className="ml-1.5 font-mono text-[12px] text-ink-3">{ago(listening.playedAt, now)}</span>
          )}
        </Item>

        <Item label="Playing">
          {playing.url ? (
            <a href={playing.url} target="_blank" rel="noopener" className="link-underline" title={playing.name}>
              {playing.name}
            </a>
          ) : (
            <span title={playing.name}>{playing.name}</span>
          )}
        </Item>

        <Item label="Status">
          <span title={status.doing}>{status.doing}</span>
        </Item>
      </dl>
    </section>
  );
}
