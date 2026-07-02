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
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand">Contact</p>
        <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-ink sm:text-4xl">
          Let's build something intelligent
        </h2>
        <p className="mt-4 text-base text-theme-muted">
          Open to Research Engineer and PhD opportunities in robotics and embodied AI. Reach out if you
          want to talk world models, VLA, or humanoid control.
        </p>
        <a
          href={profile.links.email}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-medium text-brand-ink transition-transform hover:scale-105"
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
            className="border-theme flex h-11 w-11 items-center justify-center rounded-full border text-theme-muted transition-colors hover:border-brand hover:text-brand"
          >
            <Icon size={18} />
          </a>
        ))}
      </Reveal>
    </section>
  );
}
