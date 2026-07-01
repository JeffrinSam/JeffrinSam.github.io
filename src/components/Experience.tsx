import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { experience, education } from "../data/experience";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Experience" title="Where the work has happened" />

      <ol className="relative space-y-10 border-l border-white/10 pl-8">
        {experience.map((item, i) => (
          <motion.li
            key={item.role + item.org}
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
          >
            <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-cyan-400" />
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">{item.period}</p>
            <h3 className="mt-1 text-lg font-semibold text-zinc-50">{item.role}</h3>
            <p className="text-sm text-cyan-300/90">
              {item.org} · {item.location}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-20">
        <Reveal>
          <h3 className="font-[var(--font-display)] text-2xl font-semibold text-zinc-50">Education</h3>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {education.map((edu, i) => (
            <Reveal delay={i * 0.1} key={edu.degree}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">{edu.period}</p>
                <h4 className="mt-2 text-base font-semibold text-zinc-50">{edu.degree}</h4>
                <p className="mt-1 text-sm text-cyan-300/90">{edu.org}</p>
                <p className="mt-1 text-sm text-zinc-500">{edu.location}</p>
                {edu.note && <p className="mt-3 text-sm text-zinc-400">{edu.note}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
