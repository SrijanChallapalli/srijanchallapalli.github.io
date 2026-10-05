import { site } from "@/data/site";
import type { Status } from "@/lib/status";
import { HeroName } from "./HeroName";
import { StatusBar } from "./StatusBar";

const heroLinks = [
  { label: "GitHub", href: site.links.github, external: true },
  { label: "LinkedIn", href: site.links.linkedin, external: true },
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

          {/* On wide screens the intro sits in the empty space beside the first name. */}
          <div
            className="fade-in mt-10 max-w-[30rem] md:mt-12 lg:absolute lg:top-[0.6vw] lg:right-0 lg:mt-0 lg:w-[34%] xl:w-[32%]"
            style={delay(450)}
          >
            <p className="t-lead text-balance">
              AI @{" "}
              <a
                href="https://www.purdue.edu/"
                target="_blank"
                rel="noopener"
                className="purdue font-semibold"
              >
                Purdue
              </a>
              , {site.intro}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
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
