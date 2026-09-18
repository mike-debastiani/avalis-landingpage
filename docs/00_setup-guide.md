# 00 – Setup-Guide für Claude Code

> **Zweck:** Einstiegspunkt für Claude Code. Beschreibt, wie das Projekt aufgesetzt wird, in welcher Reihenfolge gearbeitet wird und welche Regeln gelten.
> **Stand:** 15.09.2026 · **Verantwortlich:** Mike De Bastiani

---

## 1. Worum es geht

Wir bauen eine **Landingpage (Onepager)** für das Bachelorprojekt **«avalis»**, eine digitale Lösung für Nachteilsausgleichsprozesse (NTA) an Schweizer Hochschulen. Die Seite wird am **Netzwerktreffen für Chancengleichheit von swissuniversities am 23.10.2026** vorgestellt und zusätzlich per Mail verteilt.

Die Seite hat zwei Aufgaben:
1. Kurz und verständlich erklären, **was avalis ist, wer wir sind und welches Problem wir lösen**.
2. Besuchende zur **Registrierung per E-Mail** bewegen, damit wir den Research Report und künftige Projekt-Updates verschicken können (Newsletter-Logik).

Details: `01_project-brief.md`.

## 2. Übersicht der Kontext-Files

| File | Inhalt |
|---|---|
| `00_setup-guide.md` | Dieses File: Vorgehen, Regeln, Repo-Struktur |
| `01_project-brief.md` | Ziele, Zielgruppe, Scope, Meilensteine |
| `02_avalis-context.md` | Inhaltlicher Kontext zu avalis, Research und Team |
| `03_tech-architecture.md` | Tech-Stack, Architektur, Environment Variables, Sicherheit |
| `04_registration-flow.md` | Formular, Double-Opt-in mit Brevo, Fehlerfälle |
| `05_design-system.md` | Figma als Quelle, Tokens, Komponenten, Barrierefreiheit |
| `06_content-draft.md` | Textentwürfe pro Sektion (DE) |
| `07_legal-privacy.md` | Anforderungen an Impressum, Datenschutz, Einwilligung |
| `08_open-points.md` | Offene Punkte und Entscheidungen |

**Regel:** Wenn ein File einer Anweisung im Chat widerspricht, gilt der Chat. Nach jeder relevanten Entscheidung wird das betroffene File nachgeführt.

## 3. Reihenfolge des Setups

1. **Docs sichten:** Alle Files in `/docs` lesen, Widersprüche oder Lücken melden, nichts erfinden.
2. **`CLAUDE.md` erstellen:** Kompakt (max. ca. 150 Zeilen), verweist auf `/docs` statt Inhalte zu duplizieren. Inhalt siehe Abschnitt 5.
3. **Next.js-Projekt initialisieren:** gemäss `03_tech-architecture.md`.
4. **Repo-Struktur anlegen:** gemäss Abschnitt 4, inkl. `.env.example` (ohne echte Werte).
5. **i18n-Grundgerüst:** DE und EN über Routen (`/de`, `/en`), erweiterbar für FR und IT.
6. **Erster Deploy:** Leere Seite mit Grundlayout auf Vercel prüfen.
7. **Design Tokens aus Figma:** über den Figma MCP auslesen, siehe `05_design-system.md`.
8. Danach weiter gemäss Meilensteinen in `01_project-brief.md`.

Jeder Schritt wird zuerst im **Plan Mode** geplant und erst nach Freigabe umgesetzt.

## 4. Ziel-Repo-Struktur (Vorschlag)

```
/
├── CLAUDE.md
├── .env.example
├── docs/                      # Kontext-Files (dieses Paket)
├── messages/
│   ├── de.json                # UI-Texte Deutsch
│   └── en.json                # UI-Texte Englisch
├── public/                    # Logos, OG-Bilder, Screenshots
└── src/
    ├── app/
    │   └── [locale]/
    │       ├── layout.tsx
    │       ├── page.tsx       # Onepager
    │       ├── bestaetigt/    # Seite nach Double-Opt-in-Bestätigung
    │       ├── impressum/
    │       └── datenschutz/
    ├── actions/
    │   └── register.ts        # Server Action Registrierung
    ├── components/
    │   ├── ui/                # Basiskomponenten aus dem Design System
    │   └── sections/          # Hero, Problem, Research, Loesung, Team, Registrierung, Footer
    ├── i18n/                  # Routing- und Sprachkonfiguration
    ├── lib/
    │   ├── brevo.ts           # Brevo-API-Anbindung (nur serverseitig)
    │   ├── validation.ts      # Zod-Schemas
    │   └── institutions.ts    # Hochschulliste (folgt)
    └── styles/
        └── globals.css        # Tokens als CSS-Variablen
```

Pfadnamen dürfen angepasst werden, wenn es gute Gründe gibt. Änderungen werden hier nachgeführt.

## 5. Anforderungen an die `CLAUDE.md`

Die `CLAUDE.md` soll enthalten:

- **Projekt in drei Sätzen** und Verweis auf `/docs`.
- **Tech-Stack** und die wichtigsten Befehle (dev, build, lint, typecheck).
- **Harte Regeln:**
  - Nur Farben, Schriften, Abstände und Radien aus dem Figma Design System verwenden. Keine erfundenen Werte. Fehlt ein Token oder eine Komponente: stoppen und nachfragen.
  - Keine Secrets im Code, in Commits oder in Docs. Nur `process.env` serverseitig.
  - Alle sichtbaren Texte über die Übersetzungsdateien, keine hartcodierten Strings in Komponenten.
  - Deutsch in Schweizer Rechtschreibung («ss» statt «ß»).
  - Barrierefreiheit nach WCAG 2.2 AA ist Pflicht, nicht optional.
  - Mobile first.
  - Keine Fakten, Zahlen oder Zitate zu avalis erfinden. Quelle ist `02_avalis-context.md` und `06_page-structure.md`.
  - Die Seite muss **100% responsive** sein: auf allen gängigen Breakpoints (Mobile ~360px, Tablet ~768px, Desktop ~1280px+) ohne horizontales Scrollen, Layout-Brüche oder abgeschnittene Inhalte. Gängige Web-Best-Practices sind Pflicht: semantisches HTML, `next/image` für Bilder, keine Layout-Shifts, wiederverwendete Section-Container/-Spacing-Utilities statt Wertwiederholung.
- **Arbeitsweise:** Eine Aufgabe pro Session, zuerst Plan Mode, kleine Commits, jede Änderung in der Vercel Preview prüfen.
- **Definition of Done** pro Aufgabe: Typecheck und Lint ohne Fehler, auf Mobile und Desktop geprüft, Tastaturbedienung geprüft, beide Sprachen vorhanden.

## 6. Git-Workflow

`main` ist immer deploybar, entspricht der Live-Version und ist geschützt.

- Niemals direkt auf `main` committen oder pushen.
- Jede Aufgabe auf einem eigenen Branch, erstellt vom aktuellen `main`.
- Branch-Namen: `feat/…`, `fix/…`, `chore/…`, `docs/…`, kurz und sprechend (z.B. `feat/hero-section`).
- Kleine, thematisch saubere Commits mit Conventional-Commit-Messages (`feat:`, `fix:`, `chore:`, `docs:`).
- Vor dem Pull Request: Lint, Typecheck und Build ohne Fehler (sobald das Projekt existiert).
- Branch mit `git push -u origin <branch>` pushen und den Pull Request mit `gh pr create` gegen `main` erstellen.
- Pull-Request-Beschreibung auf Deutsch mit: Was wurde geändert, Warum, Wie testen (inkl. Hinweis auf die Vercel Preview), betroffene Docs, offene Punkte.
- Niemals mergen, rebasen, force-pushen oder Branches löschen. Der Merge erfolgt manuell auf GitHub.
- Nach dem Erstellen des Pull Requests: Link ausgeben und stoppen.
- Bei gewünschten Änderungen an einem offenen Pull Request: auf demselben Branch weiterarbeiten und pushen, keinen neuen Pull Request erstellen.
