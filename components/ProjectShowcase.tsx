import { primaryLink, type Project } from "@/data/projects";
import { ProjectArt } from "./visuals";
import { ParallaxFrame } from "./motion/Parallax";
import { Reveal } from "./motion/Reveal";
import { ArrowLink, StackLine } from "./SectionHeader";

/**
 * One project: big visual, then a short caption-like block underneath.
 * Visual alternates sides on wide screens; no case-study detour.
 */
export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");
  const href = primaryLink(project);

  const title = (
    <span className="inline-flex items-start gap-3 md:gap-4">
      <span className="font-medium transition-[font-variation-settings] duration-300 [font-variation-settings:'wght'_500] group-hover/project:[font-variation-settings:'wght'_640]">
        {project.name}
      </span>
      {href && (
        <span
          className="mt-[0.1em] text-[0.55em] text-ink-3 transition-[transform,color] duration-300 ease-[var(--ease-out)] group-hover/project:translate-x-[2px] group-hover/project:-translate-y-[2px] group-hover/project:text-accent"
          aria-hidden
        >
          ↗
        </span>
      )}
    </span>
  );

  return (
    <article
      data-hover-root
      className="group/project grid-page items-end gap-y-8"
      aria-labelledby={`project-${project.slug}`}
    >
      <Reveal className={`col-span-12 lg:col-span-8 ${flip ? "lg:order-2 lg:col-start-5" : ""}`} y={24}>
        <ParallaxFrame className="aspect-[4/3] rounded-[4px] bg-paper-2 md:aspect-[16/10]" strength={8}>
          <ProjectArt project={project} />
        </ParallaxFrame>
      </Reveal>

      <Reveal
        delay={0.1}
        className={`col-span-12 flex flex-col gap-5 lg:col-span-4 ${
          flip ? "lg:order-1 lg:col-start-1 lg:pr-6" : "lg:col-start-9 lg:pl-6"
        }`}
      >
        <p className="t-meta flex gap-3 text-ink-3">
          <span>{num}</span>
          <span>{project.year}</span>
          <span>{project.category}</span>
        </p>
        <h3 id={`project-${project.slug}`} className="t-h4 !text-[clamp(1.75rem,3vw,2.75rem)] !leading-[1]">
          {href ? (
            <a href={href} target="_blank" rel="noopener">
              {title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="text-lg leading-snug tracking-[-0.01em] text-pretty">{project.oneLiner}</p>
        <p className="text-pretty text-ink-2">{project.blurb}</p>
        <p className="t-meta text-ink">
          {project.facts.map((f, i) => (
            <span key={f}>
              {i > 0 && <span className="text-ink-3"> · </span>}
              {f}
            </span>
          ))}
        </p>
        <StackLine items={project.stack} />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-ink-2">
          {project.live && <ArrowLink href={project.live}>Live</ArrowLink>}
          {project.github && <ArrowLink href={project.github}>GitHub</ArrowLink>}
          {project.privateNote && <span className="t-meta text-ink-3">{project.privateNote}</span>}
        </div>
      </Reveal>
    </article>
  );
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-24 md:gap-40">
      {projects.map((p, i) => (
        <ProjectFeature key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}
