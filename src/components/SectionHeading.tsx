import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">{eyebrow}</p>
      <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-zinc-50 sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}
