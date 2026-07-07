"use client";

import { useState } from "react";

interface YouTubeLiteProps {
  id: string;
  title: string;
}

/** Click-to-load YouTube facade — no third-party JS until the user asks for it. */
export default function YouTubeLite({ id, title }: YouTubeLiteProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden bg-carbon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
      aria-label={`Prehrať video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover opacity-70 transition-[opacity,transform] duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-bronze/70 bg-espresso/70 backdrop-blur-sm transition-colors duration-500 group-hover:bg-bronze">
          <span
            aria-hidden
            className="ml-1 block border-y-[10px] border-l-[16px] border-y-transparent border-l-cream transition-colors duration-500 group-hover:border-l-espresso"
          />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 p-6 text-left text-sm font-light text-smoke">
        {title}
      </span>
    </button>
  );
}
