"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

// Klick-zum-Abspielen-Player (Facade-Pattern): lädt bis zum Klick nur das
// Vorschaubild, keine YouTube-Skripte/Cookies. Danach iframe über
// youtube-nocookie.com (Privacy-Enhanced-Modus). Siehe next.config.ts (CSP).
export function YoutubeEmbed({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);

  if (isPlaying) {
    return (
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black [clip-path:inset(0_round_1rem)]",
          className
        )}
      >
        {/* Iframe exakt 1:1 in Originalgrösse, keine Überskalierung – sonst
            rückt YouTubes eigenes UI (Titelleiste, Fortschrittsbalken) näher
            an unseren Rand heran, als nötig. Die Maskierung übernimmt allein
            das clip-path auf dem Container: reines overflow-hidden +
            border-radius auf dem Elternelement clippt die Ecken eines
            Iframes in Chromium zuverlässig nicht (eigene Rendering-Surface),
            clip-path funktioniert dafür zuverlässig (1rem = rounded-2xl,
            --radius-2xl). */}
        <iframe
          className="size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={title}
      className={cn(
        "group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted",
        className
      )}
    >
      <Image
        src={thumbnailSrc}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        onError={() => setThumbnailSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)}
      />
      <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" aria-hidden="true" />
      <span className="relative flex size-14 items-center justify-center rounded-full bg-background text-foreground shadow-lg ring-1 ring-border transition-transform group-hover:scale-105 sm:size-16">
        <Play className="size-5 fill-current sm:size-6" aria-hidden="true" />
      </span>
    </button>
  );
}
