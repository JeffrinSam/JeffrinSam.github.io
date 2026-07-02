import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "../data/projects";
import { MediaTabs } from "./MediaTabs";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border-theme bg-theme-subtle group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40">
      {project.media && <MediaTabs media={project.media} />}
      <a href={project.href} target="_blank" rel="noreferrer" className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
          <FiArrowUpRight className="mt-1 shrink-0 text-theme-muted transition-colors group-hover:text-brand" />
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-theme-muted">{project.period}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-theme-muted">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border-theme rounded-full border bg-surface px-3 py-1 text-xs text-theme-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </div>
  );
}
