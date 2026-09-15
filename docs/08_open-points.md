# 08 – Offene Punkte und Entscheidungen

> Laufend nachführen. Erledigte Punkte in «Entschieden» verschieben, mit Datum.

---

## Offen

| # | Thema | Was fehlt | Wer | Bis |
|---|---|---|---|---|
| 2 | Brevo | Liste anlegen, Listen-ID | Mike | 04.10. |
| 3 | Brevo | Attribute `HOCHSCHULE`, `ROLLE`, `SOURCE`, `SPRACHE` anlegen, exakte Namen der Namensfelder notieren | Mike | 04.10. |
| 4 | Brevo | Double-Opt-in-Templates DE und EN, Template-IDs | Team | 11.10. |
| 5 | Brevo | Neuer API-Key, nur in Vercel und `.env.local` hinterlegt; IP-Sperre deaktiviert | Mike | 20.09. |
| 6 | Vercel | Projekt-URL für `NEXT_PUBLIC_SITE_URL` | Mike | 20.09. |
| 7 | Domain | Domain kaufen, bei Vercel verbinden, Absender-Domain in Brevo verifizieren (SPF, DKIM, DMARC) | Team | 04.10. |
| 8 | Research Report | Google-Drive-Link, Freigabe «Jeder mit dem Link» prüfen | Team | 11.10. |
| 9 | Research Report | Darf der Download-Link auf `/bestaetigt` öffentlich erreichbar sein, oder nur per Mail? | Team | 04.10. |
| 10 | Hochschulliste | Liste der Institutionen für das Dropdown | Team | 04.10. |
| 11 | Rollenliste | Rollen im Formular bestätigen | Team | 04.10. |
| 12 | Texte | Content-Entwurf prüfen und freigeben | Team | 04.10. |
| 13 | Anrede | Du oder Sie (provisorisch Sie) | Team | 27.09. |
| 14 | Schreibweise | «avalis» oder «Avalis» im Fliesstext | Team | 27.09. |
| 15 | Team-Sektion | Fotos, Kurzbeschreibungen, LinkedIn, Mentor:innen nennen? | Team | 04.10. |
| 16 | Kontakt | Öffentliche Kontakt-E-Mail | Team | 04.10. |
| 17 | Rechtliches | Verantwortliche Personen und Adresse für Impressum und Datenschutz | Team | 11.10. |
| 18 | Rechtliches | Verwendung HSLU-Name und Logo | Team / Mentor:innen | 04.10. |
| 19 | Rechtliches | Teilnehmende Institutionen namentlich nennen? (Anonymisierung im Report) | Team / Mentor:innen | 04.10. |
| 20 | Spam-Schutz | Nur Honeypot oder zusätzlich Cloudflare Turnstile | Mike | 11.10. |
| 21 | Visuals | Screenshots des Prototyps (nur Mock-Daten), OpenGraph-Bild | Team | 11.10. |
| 22 | Englisch | Übersetzung der finalen Texte prüfen | Team | 11.10. |
| 23 | Event | QR-Code mit `?src=netzwerktreffen` für Präsentation | Team | 21.10. |
| 24 | Design System | Hero-Display-Typografie (`--text-display`) ist nur im Code definiert, nicht in Figma abgesichert – bei Gelegenheit mit Team/Figma nachziehen | Team | 04.10. |
| 25 | Design System | Heading-2-Grösse (30px) im Code aus der Typografie-Skala abgeleitet, aber im Figma-MCP-Response nicht enthalten – gegen Figma verifizieren | Mike | 04.10. |
| 26 | Sicherheit | CSP `script-src` nutzt aktuell `'unsafe-inline'` statt Nonce: Next.js 16 appliziert einen per-Request-Nonce (korrekt via `Content-Security-Policy`-Header gesetzt) nicht auf seine eigenen Hydration-`<script>`-Tags, geprüft in Produktion. Bei neuerer Next.js-Version erneut mit Nonce statt `unsafe-inline` versuchen | Mike | – |
| 27 | Registrierung | Formular zeigt heute nur E-Mail + Einwilligung, Submit deaktiviert. Institution/Rolle-Felder und Brevo-Anbindung folgen mit Punkten #2–#5, #10, #11 | Mike | 11.10. |
| 28 | Inhalte | Team-Kurzbeschreibungen, Fotos, Kontakt-E-Mail sowie Impressum/Datenschutz-Inhalt sind Platzhalter ("folgt") | Team | 04.10.–11.10. |

## Entschieden

| Datum | Entscheidung |
|---|---|
| 15.09.2026 | Tech-Stack: Next.js, Vercel, GitHub |
| 15.09.2026 | Brevo für Kontakte, Double-Opt-in und Newsletter; keine eigene Datenbank (Supabase nicht verwendet) |
| 15.09.2026 | Sprachen DE und EN zum Launch, Struktur erweiterbar für FR und IT |
| 15.09.2026 | Design Tokens werden über den Figma MCP ausgelesen |
| 15.09.2026 | Live spätestens 21.10.2026, Event am 23.10.2026 |
| 15.09.2026 | Branch- und Pull-Request-Workflow, Merge nur manuell |
| 15.09.2026 | Figma-Link und Zugriff für Figma MCP vorhanden: [Avalis-Styleguide-BA-2026](https://www.figma.com/design/T7WsBMJeLI71tjKCs9tORo/Avalis-Styleguide-BA-2026) |
| 15.09.2026 | Design-System-Basis (Stone-Palette, Rollenfarben Beratung/In-Decision/Bewilligt, Typografie, Radien) aus Figma ausgelesen und gegen `nta-tool-prototype` verifiziert, in `src/app/globals.css` umgesetzt; shadcn/ui mit Preset `radix-vega` (identisch zum Prototyp) eingerichtet |
