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

      <ul className="border-theme bg-theme-subtle divide-ink/10 divide-y rounded-2xl border">
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
              <FiFileText className="mt-1 shrink-0 text-theme-muted" />
              <div className="min-w-0 flex-1">
                {primaryHref ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-ink transition-colors hover:text-brand sm:text-base"
                  >
                    {pub.title}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-ink sm:text-base">{pub.title}</p>
                )}
                <p className="mt-1 text-sm text-theme-muted">{pub.venue}</p>
                {pub.status && (
                  <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-green-500">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    {pub.status}
                  </span>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-3 pt-1">
                {pub.href && pub.video && (
                  <a
                    href={youtubeHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Watch video for ${pub.title}`}
                    title="Watch video"
                    className="text-theme-muted transition-colors hover:text-brand"
                  >
                    <FiYoutube size={16} />
                  </a>
                )}
                {primaryHref && <FiExternalLink className="shrink-0 text-theme-muted" />}
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
          className="inline-flex items-center gap-2 text-sm text-brand hover:opacity-80"
        >
          View full publication list on Google Scholar <FiExternalLink />
        </a>
      </Reveal>
    </section>
  );
}
