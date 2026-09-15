"use client";

import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// TODO: Vorstellungsvideo-URL eintragen (YouTube/Vimeo-Embed-Link), sobald verfügbar.
const INTRO_VIDEO_URL = "";

export function VideoDialog({
  label,
  title,
  pendingText,
}: {
  label: string;
  title: string;
  pendingText: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
        >
          <Play className="size-4 fill-current" aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {!INTRO_VIDEO_URL && <DialogDescription>{pendingText}</DialogDescription>}
        </DialogHeader>
        {INTRO_VIDEO_URL ? (
          <div className="aspect-video overflow-hidden rounded-lg">
            <iframe
              src={INTRO_VIDEO_URL}
              title={title}
              className="size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-lg bg-stone-100 text-paragraph-small text-muted-foreground">
            {pendingText}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
