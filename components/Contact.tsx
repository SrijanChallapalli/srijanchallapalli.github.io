import { site } from "@/data/site";
import { SplitHeading } from "./motion/SplitHeading";
import { Reveal } from "./motion/Reveal";
import { ArrowLink } from "./SectionHeader";

export function Contact() {
  return (
    <section aria-labelledby="contact-title" id="contact" data-crumb="Contact" className="container-page section-space border-t border-rule">
      <p className="t-meta mb-8 text-ink-3">Contact</p>
      <SplitHeading
        id="contact-title"
        text="Have something interesting to build?"
        className="t-h1 max-w-[14ch]"
      />
      <Reveal delay={0.2} className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
        <a
          href={`mailto:${site.email}`}
          className="group inline-flex items-center gap-3 text-[clamp(1.25rem,3.2vw,2.5rem)] font-medium tracking-[-0.035em] break-all"
        >
          <span className="link-underline">{site.email}</span>
          <span className="arrow arrow-ne text-ink-3 group-hover:text-accent" aria-hidden>
            ↗
          </span>
        </a>
        <div className="flex gap-6 text-ink-2">
          <ArrowLink href={site.links.github}>GitHub</ArrowLink>
          <ArrowLink href={site.links.linkedin}>LinkedIn</ArrowLink>
          <ArrowLink href={site.links.x}>X</ArrowLink>
          <ArrowLink href={site.resume}>Resume</ArrowLink>
        </div>
      </Reveal>
    </section>
  );
}
