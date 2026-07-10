import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { publications } from "../data/publications";

const facts = [
  { label: "Based in", value: profile.location },
  { label: "Current role", value: "Skoltech ISR Lab · MWS AI (Contract)" },
  { label: "Focus", value: "World Models · AI Safety · AGI · VLA · Humanoid Control" },
  { label: "Platforms", value: "Unitree G1 / H1 · UAV / VTOL" },
];

const stats = [
  { value: `${publications.length}`, label: "Publications" },
  { value: `${projects.length}`, label: "Projects" },
  { value: "3", label: "Humanoid Platforms" },
  { value: "4", label: "Countries Worked In" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="About" title="Building the loop between simulation and reality" />

      <div className="grid items-start gap-12 md:grid-cols-5">
        <Reveal delay={0.1} className="md:col-span-3">
          <p className="text-base leading-relaxed text-ink sm:text-lg">{profile.bio}</p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-theme bg-theme-subtle rounded-2xl border p-5">
                <p className="font-[var(--font-display)] text-3xl font-semibold text-brand-text">{stat.value}</p>
                <p className="mt-1 text-xs text-theme-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="md:col-span-2">
          <img
            src="/media/jeff-portrait.jpg"
            alt={profile.name}
            className="border-theme mb-5 aspect-[4/3] w-full rounded-2xl border object-cover"
          />
          <dl className="border-theme bg-theme-subtle grid grid-cols-1 gap-5 rounded-2xl border p-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-xs uppercase tracking-widest text-theme-muted">{fact.label}</dt>
                <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
