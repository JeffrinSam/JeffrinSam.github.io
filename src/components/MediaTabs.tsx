import { useState } from "react";
import { FiPlay } from "react-icons/fi";
import type { MediaItem } from "../data/projects";

function MediaFrame({ item }: { item: MediaItem }) {
  if (item.kind === "youtube") {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${item.src}`}
        title={item.label}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-lg border border-white/10"
      />
    );
  }
  if (item.kind === "video") {
    return (
      <video
        src={item.src}
        controls
        muted
        playsInline
        preload="metadata"
        className="aspect-video w-full rounded-lg border border-white/10 bg-black"
      />
    );
  }
  return (
    <img
      src={item.src}
      alt={item.label}
      loading="lazy"
      className="w-full rounded-lg border border-white/10 bg-black object-contain"
    />
  );
}

export function MediaTabs({ media }: { media: MediaItem[] }) {
  const allGifs = media.every((m) => m.kind === "gif");
  const [active, setActive] = useState<number | null>(allGifs ? null : 0);

  if (media.length === 1 && media[0].kind !== "gif") {
    return (
      <div className="mb-4">
        <MediaFrame item={media[0]} />
      </div>
    );
  }

  return (
    <div className="mb-4">
      {active !== null && (
        <div className="mb-2">
          <MediaFrame item={media[active]} />
        </div>
      )}
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
                ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
                : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-cyan-400/40"
            }`}
          >
            {item.kind === "gif" && <FiPlay size={11} />}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
