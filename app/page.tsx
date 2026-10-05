import Link from "next/link";
import { archive, projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { AboutSection, NowSection, StackSection } from "@/components/AboutSection";
import { Contact } from "@/components/Contact";
import { SectionHeader } from "@/components/SectionHeader";
import { StickyColumn } from "@/components/motion/StickyColumn";

const total = projects.length + archive.reduce((n, g) => n + g.items.length, 0);

export default function Home() {
  return (
    <>
      <Hero />

      {/* Split: about on the left, work on the right. Both columns stick so they finish together. */}
      <div className="container-page grid gap-y-32 pt-[var(--section)] pb-[calc(var(--section)/2)] lg:grid-cols-2 lg:gap-x-[clamp(48px,6vw,112px)]">
        <StickyColumn data-col="left" className="flex flex-col gap-24 self-start lg:gap-28">
          <AboutSection />
          <section id="experience" aria-labelledby="experience-title" data-crumb="Experience">
            <SectionHeader title="Experience" id="experience-title" compact />
            <ExperienceTimeline items={experience} />
          </section>
          <StackSection />
          <NowSection />
        </StickyColumn>

        <StickyColumn className="self-start">
          <section id="work" aria-labelledby="work-title" data-crumb="Work">
            <SectionHeader
              title="Selected work"
              id="work-title"
              compact
              note={String(projects.length).padStart(2, "0")}
              aside={
                <Link href="/projects/" className="group t-meta inline-flex items-center gap-2 text-ink-2 hover:text-ink">
                  <span className="link-underline">All {total} projects</span>
                  <span className="arrow arrow-e" aria-hidden>
                    →
                  </span>
                </Link>
              }
            />
            <ProjectShowcase projects={projects} />
          </section>
        </StickyColumn>
      </div>

      <Contact />
    </>
  );
}
