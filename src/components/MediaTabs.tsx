import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import type { MediaItem } from "../data/projects";

const ADVANCE_MS = 6000;

function MediaFrame({ item, isActive }: { item: MediaItem; isActive: boolean }) {
  if (item.kind === "youtube") {
    const params = isActive ? `?autoplay=1&mute=1&loop=1&playlist=${item.src}` : "";
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${item.src}${params}`}
        title={item.label}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-lg border border-theme"
      />
    );
  }
  if (item.kind === "video") {
    return (
      <video
        key={item.src}
        src={item.src}
        autoPlay={isActive}
        loop
        controls
        muted
        playsInline
        preload="metadata"
        className="aspect-video w-full rounded-lg border border-theme bg-black"
      />
    );
  }
  return (
    <img
      src={item.src}
      alt={item.label}
      loading="lazy"
      className="w-full rounded-lg border border-theme bg-black object-contain"
    />
  );
}

export function MediaTabs({ media }: { media: MediaItem[] }) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (media.length < 2 || !inView) return;
    const t = setInterval(() => setActive((i) => (i + 1) % media.length), ADVANCE_MS);
    return () => clearInterval(t);
  }, [media.length, inView]);

  return (
    <div className="mb-4" ref={containerRef}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-2"
        >
          <MediaFrame item={media[active]} isActive={inView} />
        </motion.div>
      </AnimatePresence>

      {media.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {media.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActive(i);
              }}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
                active === i
                  ? "border-brand/60 bg-brand/10 text-brand-text"
                  : "border-theme bg-theme-subtle text-theme-muted hover:border-brand/40"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
