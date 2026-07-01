import { Reveal } from "./Reveal";

export function Talks() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-4">
      <Reveal className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row">
        <img
          src="/media/hri-2026-presentation.jpg"
          alt="Presenting research at HRI 2026"
          className="h-48 w-full rounded-xl object-cover sm:w-64"
        />
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">Conference Talk</p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-50">
            Presenting at ACM/IEEE HRI 2026
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Sharing recent work on humanoid and human-robot interaction research at the ACM/IEEE
            International Conference on Human-Robot Interaction, 2026.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
