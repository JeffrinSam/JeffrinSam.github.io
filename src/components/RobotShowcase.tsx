import { Reveal } from "./Reveal";
import { RobotScene } from "./RobotScene";

export function RobotShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-8">
      <Reveal className="border-theme bg-theme-subtle overflow-hidden rounded-2xl border">
        <div className="flex flex-col items-center justify-between gap-2 border-b border-theme px-6 py-4 sm:flex-row">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-text">Just for fun</p>
            <h3 className="mt-1 text-lg font-semibold text-ink">A little G1, dancing</h3>
          </div>
          <p className="text-xs text-theme-muted">Drag to look around · Scroll to zoom</p>
        </div>
        <div className="h-[420px] w-full sm:h-[480px]">
          <RobotScene />
        </div>
      </Reveal>
    </section>
  );
}
