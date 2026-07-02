import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { profile } from "../data/profile";

const facts = [
  { label: "Based in", value: profile.location },
  { label: "Current role", value: "Graduate Researcher, Skoltech ISR Lab" },
  { label: "Focus", value: "VLA · World Models · Humanoid Control" },
  { label: "Platforms", value: "Unitree G1 / H1 · UAV / VTOL" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="About" title="Building the loop between simulation and reality" />

      <div className="grid items-start gap-12 md:grid-cols-5">
        <Reveal delay={0.1} className="md:col-span-3">
          <p className="text-base leading-relaxed text-ink sm:text-lg">{profile.bio}</p>
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
