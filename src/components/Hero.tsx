import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { useTypewriter } from "../hooks/useTypewriter";
import { FiArrowDown, FiDownload } from "react-icons/fi";

export function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-24">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[100px]" />
      <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-violet-500/20 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-400"
        >
          {profile.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 font-[var(--font-display)] text-4xl font-semibold text-zinc-50 sm:text-6xl"
        >
          Hi, I'm {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 h-10 font-[var(--font-display)] text-xl text-zinc-300 sm:text-2xl"
        >
          <span className="text-gradient">{typed}</span>
          <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-cyan-300 align-middle" style={{ height: "1.2em" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          {profile.focus}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 px-6 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-105"
          >
            View my work
          </a>
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-zinc-100 transition-colors hover:border-cyan-400/60 hover:text-cyan-300"
          >
            <FiDownload /> Resume
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <FiArrowDown size={20} />
      </motion.a>
    </section>
  );
}
