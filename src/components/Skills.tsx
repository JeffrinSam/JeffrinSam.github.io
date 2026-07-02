import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { skillGroups, certifications, organizations } from "../data/skills";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Skills" title="Tools of the trade" />

      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal delay={i * 0.05} key={group.category}>
            <div className="border-theme bg-theme-subtle h-full rounded-2xl border p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="border-theme rounded-full border bg-surface px-3 py-1.5 text-sm text-theme-muted"
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
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink">Certifications</h3>
            <ul className="mt-4 space-y-2 text-sm text-theme-muted">
              {certifications.map((c) => (
                <li key={c.label} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer" className="hover:text-brand">
                      {c.label}
                    </a>
                  ) : (
                    c.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink">Organizations &amp; Service</h3>
            <ul className="mt-4 space-y-2 text-sm text-theme-muted">
              {organizations.map((o) => (
                <li key={o.label} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                  {o.href ? (
                    <a href={o.href} target="_blank" rel="noreferrer" className="hover:text-brand">
                      {o.label}
                    </a>
                  ) : (
                    o.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
