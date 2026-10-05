import Image from "next/image";

/**
 * Dillon AI by MergeWorks — real screens from the dashboard's Example Mode
 * (the built-in "Apex Industrial Technologies" mock deal, no client data).
 */
export function DiligenceVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#ecebe8]">
      {/* Brand mark */}
      <div className="absolute top-[6%] left-[5%] flex items-center gap-2.5 text-[#111]">
        <span className="relative grid size-8 place-items-center rounded-[9px] bg-[#111] text-[15px] font-bold text-white md:size-9">
          D
          <span className="absolute right-[7px] bottom-[7px] size-[5px] rounded-full bg-[#10b981]" />
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-bold tracking-[-0.03em] md:text-[17px]">Dillon AI</span>
          <span className="block font-mono text-[9px] tracking-wider uppercase opacity-60">by MergeWorks</span>
        </span>
      </div>

      {/* Deal memo, main window */}
      <div className="absolute top-[22%] left-[5%] w-[86%] overflow-hidden rounded-lg bg-white shadow-[0_30px_70px_-30px_rgb(0_0_0/0.45)] ring-1 ring-black/5">
        <Image
          src="/projects/dillon/memo.webp"
          alt="Dillon AI deal memo: Apex Industrial Technologies, proceed with conditions, valuation range $10.8M–$15.2M"
          width={1600}
          height={750}
          sizes="(min-width: 1024px) 55vw, 90vw"
          className="h-auto w-full"
        />
      </div>

      {/* Score rings, overlapping */}
      <div className="absolute right-[4%] bottom-[5%] w-[52%] overflow-hidden rounded-lg bg-white shadow-[0_30px_70px_-24px_rgb(0_0_0/0.5)] ring-1 ring-black/5">
        <Image
          src="/projects/dillon/scores.webp"
          alt="Deal analysis scores: overall 54, valuation 65, cash flow 68, risk 20, growth 60"
          width={1400}
          height={310}
          sizes="(min-width: 1024px) 35vw, 50vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
