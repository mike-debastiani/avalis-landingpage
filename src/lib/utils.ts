import { createCn } from "cn/config"

// Eigene Typografie-Tokens (src/app/globals.css) sind für den Klassen-Merger
// Schriftgrössen. Ohne diese Angabe hält er z. B. `text-title` für eine
// Textfarbe und verwirft es, sobald zusätzlich `text-foreground` gesetzt ist.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "title-xl",
            "title",
            "lead",
            "heading-1",
            "heading-2",
            "heading-3",
            "heading-4",
            "paragraph-large",
            "paragraph-regular",
            "paragraph-small",
            "paragraph-mini",
          ],
        },
      ],
    },
  },
})
