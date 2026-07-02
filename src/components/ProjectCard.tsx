import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "../data/projects";
import { MediaTabs } from "./MediaTabs";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.04]">
      {project.media && <MediaTabs media={project.media} />}
      <a href={project.href} target="_blank" rel="noreferrer" className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-zinc-50">{project.title}</h3>
          <FiArrowUpRight className="mt-1 shrink-0 text-zinc-500 transition-colors group-hover:text-cyan-300" />
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-zinc-500">{project.period}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </div>
  );
}
