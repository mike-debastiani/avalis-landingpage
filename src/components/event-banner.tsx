"use client";

import { useState } from "react";
import { Megaphone, X } from "lucide-react";

export function EventBanner({ text, closeLabel }: { text: string; closeLabel: string }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-foreground text-background">
      <div className="section-container flex items-center gap-3 py-2.5">
        <Megaphone className="size-4 shrink-0" aria-hidden="true" />
        <p className="flex-1 text-paragraph-small">{text}</p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label={closeLabel}
          className="shrink-0 rounded-full p-1 text-background/80 hover:bg-background/10 hover:text-background"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
