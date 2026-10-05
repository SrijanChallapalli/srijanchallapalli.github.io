import Link from "next/link";
import { archive, projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { getStatus } from "@/lib/status";
import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { AboutSection } from "@/components/AboutSection";
import { Contact } from "@/components/Contact";
import { SectionHeader } from "@/components/SectionHeader";

const total = projects.length + archive.reduce((n, g) => n + g.items.length, 0);

export default async function Home() {
  const status = await getStatus();

  return (
    <>
      <Hero status={status} />

      <section id="work" aria-labelledby="work-title" className="container-page section-space">
        <SectionHeader
          title="Selected work"
          id="work-title"
          note={String(projects.length).padStart(2, "0")}
          aside={
            <Link href="/projects/" className="group t-meta inline-flex items-center gap-2 text-ink-2 hover:text-ink">
              <span className="link-underline">Index of all {total} projects</span>
              <span className="arrow arrow-e" aria-hidden>
                →
              </span>
            </Link>
          }
        />
        <ProjectShowcase projects={projects} />
      </section>

      <section id="experience" aria-labelledby="experience-title" className="container-page section-space">
        <SectionHeader title="Experience" id="experience-title" />
        <ExperienceTimeline items={experience} />
      </section>

      <AboutSection />
      <Contact />
    </>
  );
}
