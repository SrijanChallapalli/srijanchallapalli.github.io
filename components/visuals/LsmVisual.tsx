const levels = [
  { name: "L0", tables: 3, width: 0.11 },
  { name: "L1", tables: 5, width: 0.14 },
  { name: "L2", tables: 7, width: 0.115 },
];

/** Diagram of the LSM write path, drawn in type. Always on a dark surface, like a terminal. */
export function LsmVisual() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-[5%] overflow-hidden bg-[#141413] px-[7%] font-mono text-[#edebe6] dark:bg-paper-2" aria-hidden>
      {/* Write path */}
      <div className="flex items-center gap-3 text-[10px] sm:text-[13px]">
        <span className="shrink-0 text-[#edebe6]/50">put(k, v)</span>
        <span className="h-px flex-1 bg-[#edebe6]/25" />
        <div className="flex shrink-0 flex-col items-start gap-1.5">
          <span className="tracking-widest text-[#edebe6]/50 uppercase">wal · fsync</span>
          <div className="flex gap-[3px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="lsm-wal h-4 w-2.5 sm:h-5 sm:w-3 rounded-[1px] bg-[#edebe6]/80"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </div>
        </div>
        <span className="h-px flex-1 bg-[#edebe6]/25" />
        <div className="shrink-0 rounded-md border border-[#edebe6]/30 px-3 py-2">
          <div className="tracking-widest text-[#edebe6]/50 uppercase">memtable</div>
          <div className="mt-1 text-[#edebe6]/90">a·c·f·k·q·z</div>
        </div>
      </div>

      {/* Levels */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {levels.map((level, li) => (
          <div key={level.name} className="flex items-center gap-4 text-[10px] sm:text-[13px]">
            <span className="w-6 shrink-0 text-[#edebe6]/50">{level.name}</span>
            <div className="flex flex-1 gap-1.5">
              {Array.from({ length: level.tables }).map((_, i) => (
                <div
                  key={i}
                  className={`relative h-9 sm:h-12 rounded-[3px] border border-[#edebe6]/25 ${
                    li === 0 && i === 2 ? "lsm-compact" : ""
                  }`}
                  style={{ flexBasis: `${level.width * 100}%` }}
                >
                  {/* bloom filter bits */}
                  <div className="absolute inset-x-1.5 bottom-1.5 flex gap-[2px]">
                    {Array.from({ length: 8 }).map((_, b) => (
                      <span
                        key={b}
                        className="h-1 flex-1 rounded-[1px]"
                        style={{
                          background: (b * 7 + i * 3 + li) % 3 === 0 ? "var(--accent)" : "rgb(255 255 255 / 0.12)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[9px] tracking-widest text-[#edebe6]/45 uppercase sm:text-[11px]">
        <span>sstables · sorted · immutable</span>
        <span className="hidden sm:inline">bloom: skip absent keys</span>
        <span>compaction ↓</span>
      </div>
    </div>
  );
}
