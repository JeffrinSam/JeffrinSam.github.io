import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { experience, education } from "../data/experience";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Experience" title="Where the work has happened" />

      <ol className="border-theme relative space-y-10 border-l pl-8">
        {experience.map((item, i) => (
          <motion.li
            key={item.role + item.org}
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
          >
            <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-surface bg-brand" />
            <p className="font-mono text-xs uppercase tracking-widest text-theme-muted">{item.period}</p>
            <h3 className="mt-1 text-lg font-semibold text-ink">{item.role}</h3>
            <p className="text-sm text-ink">
              {item.org} · {item.location}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-theme-muted">{item.description}</p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-20">
        <Reveal>
          <h3 className="font-[var(--font-display)] text-2xl font-semibold text-ink">Education</h3>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {education.map((edu, i) => (
            <Reveal delay={i * 0.1} key={edu.degree}>
              <div className="border-theme bg-theme-subtle h-full rounded-2xl border p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-theme-muted">{edu.period}</p>
                <h4 className="mt-2 text-base font-semibold text-ink">{edu.degree}</h4>
                <p className="mt-1 text-sm text-ink">{edu.org}</p>
                <p className="mt-1 text-sm text-theme-muted">{edu.location}</p>
                {edu.note && (
                  <span className="mt-3 inline-block rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs text-brand">
                    {edu.note}
                  </span>
                )}
                {edu.thesis && (
                  <p className="mt-3 text-sm leading-relaxed text-theme-muted">
                    <span className="text-theme-muted">Thesis: </span>
                    {edu.thesis}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
