import Image from "next/image";

/**
 * Real screens from the app, run locally on its fictional "Alex Demo" seed data:
 * the ranked Jobs list, with the daily summary card overlapping.
 */
export function ApplyPilotVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1a1830]">
      <div className="absolute top-[7%] left-[5%] w-[78%] overflow-hidden rounded-lg shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] ring-1 ring-white/10">
        <Image
          src="/projects/applypilot/jobs.webp"
          alt="Ranked jobs list with match scores, confidence levels, and parsed skills"
          width={1600}
          height={1345}
          sizes="(min-width: 1024px) 45vw, 75vw"
          className="h-auto w-full"
        />
      </div>
      <div className="absolute right-[4%] bottom-[6%] w-[44%] overflow-hidden rounded-xl shadow-[0_40px_80px_-24px_rgb(0_0_0/0.8)]">
        <Image
          src="/projects/applypilot/summary.webp"
          alt="Daily summary: 8 jobs found, 5 matched, 2 ready to submit, 3 need approval, 0 need input"
          width={1200}
          height={451}
          sizes="(min-width: 1024px) 34vw, 55vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
