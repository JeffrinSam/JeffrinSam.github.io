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

      <div className="grid gap-12 md:grid-cols-5">
        <Reveal delay={0.1} className="md:col-span-3">
          <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">{profile.bio}</p>
        </Reveal>

        <Reveal delay={0.2} className="md:col-span-2">
          <dl className="grid grid-cols-1 gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-xs uppercase tracking-widest text-zinc-500">{fact.label}</dt>
                <dd className="mt-1 text-sm text-zinc-100">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
