import Image from "next/image";

// App Store marketing panels (apps.apple.com/us/app/chityap-challenges/id6757008313).
// Their background is ChitYap blue (#1271FF), so the frame uses the same color and
// the panels read as one continuous strip.
const panels = [
  { src: "/projects/chityap/momentum.webp", alt: "ChitYap profile screen: “Make your momentum visible.”" },
  { src: "/projects/chityap/friends.webp", alt: "ChitYap friends screen: “Made for lasting friendships.”" },
  { src: "/projects/chityap/streaks.webp", alt: "ChitYap challenges screen: “Build streaks together.”" },
];

export function ChitYapVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-[2%] overflow-hidden bg-[#1271ff] px-[3%]">
      {panels.map((p, i) => (
        <div
          key={p.src}
          className={`relative aspect-[860/1864] h-[94%] shrink-0 ${i === 1 ? "translate-y-[3%]" : "-translate-y-[1%]"}`}
        >
          <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 20vw, 30vw" className="object-contain" />
        </div>
      ))}
    </div>
  );
}
