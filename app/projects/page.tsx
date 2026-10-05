import type { Metadata } from "next";
import Link from "next/link";
import { archive, primaryLink, projects } from "@/data/projects";
import { site } from "@/data/site";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Everything Srijan Challapalli has built — iOS apps, storage engines, AI agents, smart contracts, and experiments.",
  alternates: { canonical: "/projects/" },
  openGraph: { url: "/projects/" },
};

const total = projects.length + archive.reduce((n, g) => n + g.items.length, 0);

function Row({
  name,
  meta,
  description,
  stack,
  href,
  internal,
}: {
  name: string;
  meta: string;
  description: string;
  stack: string[];
  href?: string;
  internal?: boolean;
}) {
  const inner = (
    <div className="grid-page items-baseline gap-y-2 py-5 md:py-6">
      <span className="col-span-12 text-xl font-medium tracking-[-0.025em] transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-2 md:col-span-4 md:text-2xl">
        {name}
        {href && (
          <span
            className={`arrow ml-2 inline-block text-[0.7em] text-ink-3 group-hover:text-accent ${internal ? "arrow-e" : "arrow-ne"}`}
            aria-hidden
          >
            {internal ? "→" : "↗"}
          </span>
        )}
      </span>
      <span className="t-meta col-span-12 text-ink-3 md:col-span-2">{meta}</span>
      <span className="col-span-12 text-ink-2 md:col-span-4">{description}</span>
      <span className="t-meta col-span-12 text-ink-3 md:col-span-2 md:text-right">{stack.slice(0, 3).join(" / ")}</span>
    </div>
  );

  if (!href) return <li className="border-t border-rule">{inner}</li>;
  return (
    <li className="border-t border-rule">
      {internal ? (
        <Link href={href} className="group block">
          {inner}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener" className="group block">
          {inner}
        </a>
      )}
    </li>
  );
}

export default function ProjectsPage() {
  return (
    <div className="container-page pt-36 pb-[var(--section)] md:pt-48">
      <p className="t-meta mb-6 text-ink-3">
        <Link href="/" className="hover:text-ink">
          ← Home
        </Link>
      </p>
      <div className="flex items-start gap-3">
        <SplitHeading as="h1" text="Index" className="t-display" />
        <span className="t-meta mt-3 text-ink-3">({total})</span>
      </div>
      <Reveal delay={0.15}>
        <p className="t-lead mt-10 max-w-[38ch] text-ink-2">
          Most of what I&apos;ve built, from shipped products to weekend experiments. If a repo is
          private, it&apos;s usually someone&apos;s business — happy to walk you through it.
        </p>
      </Reveal>

      <section aria-labelledby="featured" className="mt-24 md:mt-32">
        <h2 id="featured" className="t-meta mb-4 text-ink-3">
          Featured · {projects.length}
        </h2>
        <ul className="border-b border-rule">
          {projects.map((p) => (
            <Row
              key={p.slug}
              name={p.name}
              meta={`${p.year} · ${p.category}`}
              description={p.oneLiner}
              stack={p.stack}
              href={primaryLink(p)}
            />
          ))}
        </ul>
      </section>

      {archive.map((group) => (
        <section key={group.group} aria-labelledby={`g-${group.group}`} className="mt-20 md:mt-28">
          <h2 id={`g-${group.group}`} className="t-meta mb-4 text-ink-3">
            {group.group} · {group.items.length}
          </h2>
          <ul className="border-b border-rule">
            {group.items.map((p) => (
              <Row key={p.name} name={p.name} meta={p.category} description={p.description} stack={p.stack} href={p.href} />
            ))}
          </ul>
        </section>
      ))}

      <Reveal className="mt-24">
        <a href={site.links.github} target="_blank" rel="noopener" className="group t-h4 inline-flex gap-3 font-medium">
          <span className="link-underline">The rest lives on GitHub</span>
          <span className="arrow arrow-ne text-ink-3 group-hover:text-accent" aria-hidden>
            ↗
          </span>
        </a>
      </Reveal>
    </div>
  );
}
