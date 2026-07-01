import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { skillGroups, certificates, courses } from "../data/skills";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Skills" title="Tools of the trade" />

      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal delay={i * 0.05} key={group.category}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-300">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <Reveal>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-300">Certificates</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              {certificates.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-300">Coursework</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              {courses.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
