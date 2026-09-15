# 05 – Design System

> **Quelle der Wahrheit:** Figma Design System von avalis (Styleguide erstellt von Chiara Tremml).
> **Figma-Link:** *folgt*

---

## 1. Grundregel

Die Landingpage verwendet **ausschliesslich** Tokens und Komponenten aus dem Figma Design System. Claude Code liest diese über den **Figma MCP** aus.

- Keine erfundenen Farben, Schriftgrössen, Abstände, Radien oder Schatten.
- Fehlt ein Token oder eine Komponente, die für die Landingpage nötig ist: **stoppen und nachfragen**, keinen Ersatz erfinden.
- Werte aus diesem File sind nur Orientierung. Verbindlich ist Figma.

## 2. Bekannt aus der Präsentation (zur Orientierung)

- **Schrift:** DM Sans
- **Charakter:** klar, gut lesbar, funktional, ruhig, modern, unaufgeregt
- **Farbskalen (Raw Colors):** u.a. Stone, Blue, Sky, Yellow, Purple, jeweils in Abstufungen (50, 100, 200 …)
- **Rollenfarben im Prozess:** Grün für Studierende, Blau für Fachstelle, Lila für Entscheidungsinstanz
- **Komponenten:** u.a. Button (Primary, Secondary, Outline …), Switch Group, Charts, Data Table
- **Logo:** avalis-Logo in Schwarz und Weiss, mit und ohne Schriftzug
- **Illustrationen:** Rollen-Avatare (Studierende Person, Fachstelle, Entscheidungsinstanz) im Schwarz-Weiss-Linienstil

## 3. Vorgehen mit dem Figma MCP

1. **Tokens auslesen:** Farben, Typografie, Spacing, Radien, Schatten als Figma-Variablen abfragen.
2. **Übersetzen:** In `src/styles/globals.css` als CSS-Variablen anlegen (semantische Namen, z.B. `--color-text-primary`, darunter Referenz auf Raw Colors) und im Tailwind-Theme verfügbar machen.
3. **Mapping dokumentieren:** Tabelle Figma-Variable → CSS-Variable am Ende dieses Files ergänzen.
4. **Basiskomponenten bauen:** Button, Link, Input, Select, Checkbox, Card, Section, Container, Badge. Jede einzeln gegen Figma prüfen (Screenshot-Vergleich über den MCP).
5. **Sektionen zusammensetzen:** Erst wenn die Basiskomponenten stehen.

## 4. Landingpage-spezifische Anforderungen

Das Design System wurde für eine Web-Applikation erstellt. Für eine Landingpage braucht es möglicherweise zusätzlich:

- Grössere Überschriften (Display-Grössen) für den Hero
- Sektionsabstände auf Seitenebene
- Responsive Typografie-Skala für Mobile
- Formularzustände: Fehler, Erfolg, Laden, deaktiviert

Fehlen diese in Figma: im Team klären und in Figma ergänzen, bevor sie im Code verwendet werden.

## 5. Barrierefreiheit (verbindlich)

Die Seite richtet sich an ein Netzwerk für Chancengleichheit. Barrierefreiheit ist deshalb Kernanforderung.

- WCAG 2.2 AA: Farbkontrast Text mindestens 4.5:1, grosse Schrift und UI-Elemente mindestens 3:1. **Kontraste der Figma-Farben prüfen**, besonders helle Töne wie Sky und Yellow auf Weiss.
- Information nie nur über Farbe vermitteln (z.B. Rollenfarben immer mit Text).
- Sichtbarer Fokuszustand für alle interaktiven Elemente.
- Semantisches HTML: eine `h1`, logische Überschriftenhierarchie, Landmarks (`header`, `main`, `footer`, `nav`).
- «Zum Inhalt springen»-Link.
- Alle Formularfelder mit sichtbaren Labels, Fehlermeldungen mit Feld verknüpft.
- Alt-Texte für inhaltliche Bilder, dekorative Bilder mit leerem `alt`.
- `prefers-reduced-motion` respektieren, keine automatisch abspielenden Animationen.
- Touch-Ziele mindestens 44 × 44 px.
- Text bis 200 % zoombar ohne Layoutbruch.

## 6. Token-Mapping

*Wird beim Auslesen aus Figma ergänzt.*

| Figma-Variable | CSS-Variable | Wert |
|---|---|---|
| | | |
