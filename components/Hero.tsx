import { site } from "@/data/site";
import type { Status } from "@/lib/status";
import { HeroName } from "./HeroName";
import { StatusBar } from "./StatusBar";

const heroLinks = [
  { label: "GitHub", href: site.links.github, external: true },
  { label: "LinkedIn", href: site.links.linkedin, external: true },
  { label: "X", href: site.links.x, external: true },
  { label: "Resume", href: site.resume, external: true },
  { label: "Email", href: `mailto:${site.email}`, external: false },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero({ status }: { status: Status }) {
  return (
    <div className="container-page flex min-h-[100svh] flex-col pt-28 pb-8 md:pt-32">
      <div className="flex flex-1 flex-col justify-center">
        <p className="t-meta fade-in mb-5 flex flex-wrap gap-x-3 text-ink-2 md:mb-6" style={delay(100)}>
          {site.roles.map((r, i) => (
            <span key={r} className="flex gap-x-3">
              {i > 0 && (
                <span className="text-ink-3" aria-hidden>
                  /
                </span>
              )}
              {r}
            </span>
          ))}
        </p>

        <div className="relative">
          <HeroName lines={["Srijan", "Challapalli"]} />

          {/* On wide screens this sits in the empty space beside the first name. */}
          <div
            className="fade-in mt-8 md:mt-10 lg:absolute lg:top-[2.2vw] lg:right-0 lg:mt-0"
            style={delay(450)}
          >
            <p className="text-[clamp(2.25rem,4.6vw,4.25rem)] leading-none font-semibold tracking-[-0.045em]">
              AI @{" "}
              <a
                href="https://www.purdue.edu/"
                target="_blank"
                rel="noopener"
                className="group/purdue inline-flex items-baseline whitespace-nowrap"
                aria-label="Purdue University"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/purdue-p.webp"
                  alt=""
                  width={320}
                  height={171}
                  className="-mr-[0.13em] h-[0.86em] w-auto translate-y-[0.07em] self-baseline transition-transform duration-300 ease-[var(--ease-out)] group-hover/purdue:-rotate-6"
                />
                <span aria-hidden>urdue</span>
              </a>
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-6">
              {heroLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
                    className="group inline-flex items-center gap-1 text-[15px] text-ink-2 transition-colors duration-200 hover:text-ink"
                  >
                    <span className="link-underline">{l.label}</span>
                    <span className="arrow arrow-ne text-ink-3 group-hover:text-accent" aria-hidden>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="fade-in mt-14 border-t border-rule pt-6 md:mt-16" style={delay(650)}>
        <StatusBar status={status} />
      </div>
    </div>
  );
}
