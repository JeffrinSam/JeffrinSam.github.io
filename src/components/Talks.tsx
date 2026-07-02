import { Reveal } from "./Reveal";

export function Talks() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-4">
      <div className="grid gap-6 sm:grid-cols-2">
        <Reveal className="flex h-full flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row">
          <img
            src="/media/hri-2026-presentation.jpg"
            alt="Presenting research at HRI 2026"
            className="h-48 w-full rounded-xl object-cover sm:w-64"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">Conference Talk</p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-50">Presenting at ACM/IEEE HRI 2026</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Sharing recent work on humanoid and human-robot interaction research at the ACM/IEEE
              International Conference on Human-Robot Interaction, 2026.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">Research Vision</p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-50">PhysicalAgent</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Towards general cognitive robotics with foundation world models — an overview of the
            research direction behind this work.
          </p>
          <iframe
            src="https://www.youtube-nocookie.com/embed/CMD9ziE8KeI"
            title="PhysicalAgent: Towards General Cognitive Robotics with Foundation World Models"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mt-4 aspect-video w-full rounded-lg border border-white/10"
          />
        </Reveal>
      </div>
    </section>
  );
}
