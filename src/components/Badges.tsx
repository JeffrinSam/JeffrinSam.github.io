import { Reveal } from "./Reveal";
import { badges } from "../data/badges";

export function Badges() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-4">
      <Reveal className="flex flex-wrap items-center justify-center gap-2.5">
        {badges.map((badge) => (
          <a key={badge.alt} href={badge.href} target="_blank" rel="noreferrer">
            <img src={badge.src} alt={badge.alt} className="h-5" />
          </a>
        ))}
      </Reveal>
    </section>
  );
}
