import { FiMail, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { SiHuggingface, SiGooglescholar } from "react-icons/si";
import { Reveal } from "./Reveal";
import { profile } from "../data/profile";

const socials = [
  { label: "Email", href: profile.links.email, icon: FiMail },
  { label: "GitHub", href: profile.links.github, icon: FiGithub },
  { label: "LinkedIn", href: profile.links.linkedin, icon: FiLinkedin },
  { label: "Google Scholar", href: profile.links.scholar, icon: SiGooglescholar },
  { label: "Hugging Face", href: profile.links.huggingface, icon: SiHuggingface },
  { label: "X / Twitter", href: profile.links.twitter, icon: FiTwitter },
];

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">Contact</p>
        <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-zinc-50 sm:text-4xl">
          Let's build something intelligent
        </h2>
        <p className="mt-4 text-base text-zinc-400">
          Open to Research Engineer and PhD opportunities in robotics and embodied AI. Reach out if you
          want to talk world models, VLA, or humanoid control.
        </p>
        <a
          href={profile.links.email}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 px-8 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-105"
        >
          <FiMail /> {profile.email}
        </a>
      </Reveal>

      <Reveal delay={0.15} className="mt-14 flex flex-wrap items-center justify-center gap-4">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            aria-label={label}
            title={label}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-cyan-400/60 hover:text-cyan-300"
          >
            <Icon size={18} />
          </a>
        ))}
      </Reveal>
    </section>
  );
}
