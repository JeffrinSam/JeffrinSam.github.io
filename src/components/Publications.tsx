import { motion } from "framer-motion";
import { FiExternalLink, FiFileText } from "react-icons/fi";
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
          const content = (
            <>
              <FiFileText className="mt-1 shrink-0 text-zinc-500" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-100 sm:text-base">{pub.title}</p>
                <p className="mt-1 text-sm text-zinc-500">{pub.venue}</p>
                {pub.status && <p className="mt-1 text-xs text-cyan-300/90">{pub.status}</p>}
              </div>
              {pub.href && <FiExternalLink className="mt-1 shrink-0 text-zinc-600" />}
            </>
          );

          return (
            <motion.li
              key={pub.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
            >
              {pub.href ? (
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 px-6 py-5 transition-colors hover:bg-white/[0.03]"
                >
                  {content}
                </a>
              ) : (
                <div className="flex items-start gap-4 px-6 py-5">{content}</div>
              )}
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
