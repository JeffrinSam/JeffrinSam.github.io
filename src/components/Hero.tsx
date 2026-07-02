import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { useTypewriter } from "../hooks/useTypewriter";
import { useTheme } from "../hooks/useTheme";
import { ParticleField } from "./ParticleField";
import { FiArrowDown, FiDownload } from "react-icons/fi";

export function Hero() {
  const typed = useTypewriter(profile.roles);
  const { theme } = useTheme();

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-24">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
      <ParticleField theme={theme} />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />
      <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-brand/10 blur-[100px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-sm uppercase tracking-[0.3em] text-brand"
          >
            {profile.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-[var(--font-display)] text-4xl font-semibold text-ink sm:text-6xl"
          >
            Hi, I'm {profile.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 h-10 font-[var(--font-display)] text-xl text-theme-muted sm:text-2xl"
          >
            <span className="text-gradient">{typed}</span>
            <span
              className="ml-0.5 inline-block w-[2px] animate-pulse bg-brand align-middle"
              style={{ height: "1.2em" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-theme-muted sm:text-lg"
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
              className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-ink transition-transform hover:scale-105"
            >
              View my work
            </a>
            <a
              href="/resume.pdf"
              className="border-theme inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <FiDownload /> Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-brand/20 blur-2xl" />
          <img
            src="/media/jeff-with-g1.jpg"
            alt={`${profile.name} with a Unitree humanoid and VTOL build`}
            className="border-theme relative aspect-[4/5] w-full rounded-[2rem] border object-cover"
          />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-theme-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <FiArrowDown size={20} />
      </motion.a>
    </section>
  );
}
