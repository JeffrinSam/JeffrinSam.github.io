import { motion } from "framer-motion";
import { FiExternalLink, FiFileText, FiYoutube } from "react-icons/fi";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { publications } from "../data/publications";
import { profile } from "../data/profile";

export function Publications() {
  return (
    <section id="publications" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Publications" title="Peer-reviewed research" />

      <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
        {publications.map((pub, i) => {
          const youtubeHref = pub.video ? `https://youtu.be/${pub.video}` : undefined;
          const primaryHref = pub.href ?? youtubeHref;

          return (
            <motion.li
              key={pub.title}
              className="flex items-start gap-4 px-6 py-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
            >
              <FiFileText className="mt-1 shrink-0 text-zinc-500" />
              <div className="min-w-0 flex-1">
                {primaryHref ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-zinc-100 transition-colors hover:text-cyan-300 sm:text-base"
                  >
                    {pub.title}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-zinc-100 sm:text-base">{pub.title}</p>
                )}
                <p className="mt-1 text-sm text-zinc-500">{pub.venue}</p>
                {pub.status && <p className="mt-1 text-xs text-cyan-300/90">{pub.status}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-3 pt-1">
                {pub.href && pub.video && (
                  <a
                    href={youtubeHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Watch video for ${pub.title}`}
                    title="Watch video"
                    className="text-zinc-500 transition-colors hover:text-cyan-300"
                  >
                    <FiYoutube size={16} />
                  </a>
                )}
                {primaryHref && <FiExternalLink className="shrink-0 text-zinc-600" />}
              </div>
            </motion.li>
          );
        })}
      </ul>

      <Reveal delay={0.1} className="mt-6">
        <a
          href={profile.links.scholar}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
        >
          View full publication list on Google Scholar <FiExternalLink />
        </a>
      </Reveal>
    </section>
  );
}
