import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "../data/projects";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Projects" title="Selected work in simulation, VLA, and world models" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal delay={(i % 2) * 0.1} key={project.title} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
