const markets = [
  { q: "Green car wins the race", yes: 72 },
  { q: "ETH above $5k by close", yes: 41 },
  { q: "Resolver settles by Friday", yes: 88 },
];

/**
 * Diagram of a few live markets, drawn in type: each YES/NO probability bar is
 * priced in cents, with the collateral invariant along the bottom. Dark surface,
 * like a terminal, matching the other code-drawn visuals.
 */
export function HunchVisual() {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-center gap-[7%] overflow-hidden bg-[#141413] px-[7%] font-mono text-[#edebe6] dark:bg-paper-2"
      aria-hidden
    >
      <div className="flex items-baseline justify-between text-[9px] tracking-widest text-[#edebe6]/45 uppercase sm:text-[11px]">
        <span>8 markets · fully collateralized</span>
        <span className="hidden sm:inline">yes / no · erc20 shares</span>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {markets.map((m, i) => (
          <div key={m.q} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3 text-[10px] sm:text-[13px]">
              <span className="truncate text-[#edebe6]/90">{m.q}</span>
              <span className="shrink-0 text-[#edebe6]/50 tabular-nums">
                {m.yes}¢ / {100 - m.yes}¢
              </span>
            </div>
            <div className="flex h-3 overflow-hidden rounded-[2px] bg-[#edebe6]/12 sm:h-3.5">
              <span
                className="hunch-fill h-full"
                style={{ width: `${m.yes}%`, background: "var(--accent)", animationDelay: `${i * 0.14}s` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[9px] tracking-widest text-[#edebe6]/45 uppercase sm:text-[11px]">
        <span>balance = sets × unit</span>
        <span className="hidden sm:inline">postgres indexer · crash-proof</span>
        <span>0 solvency failures</span>
      </div>
    </div>
  );
}
