# 06 – Seitenstruktur

> **Stand:** 20.10.2026 · Quelle: Figma-File [Avalis-Landingpage](https://www.figma.com/design/WRJ76gBGDPxE8gJXf7VUY9/Avalis-Landingpage) (Desktop-Variante, Node `10067:2049`).
>
> **Wie dieses File zu lesen ist:** Es beschreibt den **aktuellen Figma-Stand** – Struktur, Reihenfolge und Richtung der Texte. Ausdrücklich **nicht final**: Inhalte und Section-Aufbau können sich mit dem Team noch ändern. Wörtliche Figma-Texte sind unten in Anführungszeichen/kursiv übernommen, damit beim Umsetzen klar ist, was Entwurf aus Figma ist. Bei Widerspruch zum Chat gilt der Chat.
>
> Verwandte Files: `02_avalis-context.md` (Faktenbasis), `04_registration-flow.md` (Formular), `05_design-system.md` (visuelle Sprache), `08_open-points.md` (offene Entscheidungen, u.a. zu Logos und Kontaktadresse).

---

## 1. Ziel der Seite

Unverändert zu bisher: avalis in Sekunden erfassbar machen, Vertrauen aufbauen, zur Registrierung für den Research Report führen. Das Figma-File zeigt, dass der Report-Fokus im Vergleich zu früheren Entwürfen **stärker auf die Fragestellung** gelegt wird («Wie läuft Nachteilsausgleich ab? Wo liegen die Grenzen?») statt auf fertige Erkenntnisse – konsequent zur Regel «keine Key Findings zeigen».

## 2. Grundregeln (unverändert gültig)

- **Eigenständiges Projekt**, keine Studienarbeits-Rahmung. Bestätigt durch die Footer-Tagline in Figma, siehe unten.
- **Keine konkreten Erkenntnisse teilen** (keine Key Findings, keine Prozessmodelle). Figma-Texte halten sich konsequent daran.
- **Ehrlich zum Stand:** Prototyp, nicht für den produktiven Einsatz.
- **Respektvolle Sprache:** der Prozess ist das Problem, nicht die Menschen mit Beeinträchtigungen.
- **Zwei Sprachen:** DE und EN zum Launch.

## 3. Aufbau im Überblick

| # | Section (Figma-Name) | Anchor/Nav | Ziel |
|---|---|---|---|
| S1 | Header | – | Logo, Sprachwahl, Nav (Lösung / Einblick / Team / Kontakt), CTA |
| S2 | Hero | `#hero` | Sofort verstehen, worum es geht, Registrierung anbieten |
| S3 | Wer dahinter steht | `#team` | Team zeigen, Vertrauen aufbauen |
| S4 | Was avalis ist und löst (Rollenimpact) | `#loesung` | Nutzen pro Rolle konkret zeigen |
| S5 | Anpassbar und flexibel (Modularität) | – | Ein Gedanke, keine eigene Nav-Section |
| S6 | Einblick in den Prototyp | `#einblick` | Prototyp-Rundgang, Entwicklungsstand einordnen |
| S7 | Registrierung | `#registrierung` | Hauptkonversion |
| S8 | Kontakt | `#kontakt` | Andockpunkt für weitergehendes Interesse |
| S9 | Footer | – | Rechtliches, Marke, Sprache |

**Wichtigste Strukturänderung gegenüber dem vorherigen Stand:** Die Erklärung «was avalis löst» läuft jetzt primär über **drei Rollen-Blöcke mit ausschliesslich der positiven Seite** (kein Vorher/Nachher-Vergleich, keine Pain-Point-Wiederholung pro Rolle – das allgemeine Problem wird einmal kurz in der Section-Einleitung benannt). Der Prototyp-Walkthrough ist jetzt eine **eigene Section mit eigenem Nav-Punkt** («Einblick»), getrennt vom Team-Vorstellungsvideo. Es gibt keinen eigenen Nav-Punkt mehr für «Registrierung» – dahin führen nur die CTA-Buttons.

## 4. Sections im Detail

### Header

- Logo (Icon + Wortmarke «avalis», durchgehend klein geschrieben, auch im Logo)
- Nav: **Lösung · Einblick · Team · Kontakt** (aktiver Punkt wird beim Scrollen hervorgehoben)
- Sprachwahl DE/EN
- CTA-Button: **«Research Report erhalten»**

### S2 – Hero

- Abschnittslabel: «Nachteilsausgleich an Schweizer Hochschulen»
- H1 (dreizeilig, ein Wort farblich akzentuiert): **«Nachteilsausgleich. Digital gebündelt. Für `alle` Beteiligten.»**
- Lead: «avalis ist eine digitale Lösung für den Nachteilsausgleichsprozess an Schweizer Hochschulen. Sie bündelt den Weg vom Antrag bis zur Umsetzung, vereinfacht, transparent und zugänglich.»
- Primärer Button: «Research Report erhalten» (→ `#registrierung`)
- Sekundärer Textlink: «Was ist avalis?» (→ `#loesung`)
- Visueller Anker rechts: drei Rollenillustrationen mit Rollenfarben-Kreisen (Fachstellen/blau, Studierende/grün, Entscheidungsinstanzen/lila) – identische drei Rollen wie in S4

### S3 – Wer dahinter steht (Team)

- Abschnittslabel: «Wer dahinter steht»
- Titel: **«Drei Perspektiven. Ein gemeinsames Anliegen.»**
- Beschreibung: «Hinter avalis stehen Chiara Tremml, Dario Foti und Mike De Bastiani, ein dreiköpfiges Team mit UX-Designhintergrund. Das Video zeigt, was das Team zu diesem Projekt bewogen hat und was avalis löst.»
- Keine separate Namensliste (Figma V5): Die Namen stehen nur im Beschreibungstext.
- Videoplatzhalter 16:9: Format-Hinweis «VIDEO · 16:9», Status «Platzhalter · nicht abspielbar», Titel «Die Menschen hinter avalis», Hinweis «Teamvideo und Originalposter folgen.», Player-UI (inaktiv) mit Play, Zeitleiste, CC-Untertitel-Control

### S4 – Was avalis ist und löst (Rollenimpact)

- Abschnittslabel: «Was avalis ist und löst»
- Titel: **«Ein gemeinsamer Ort für einen komplexen Prozess.»**
- Einleitungstext (ersetzt die früheren Problem-/Lösungs-Textblöcke): «Nachteilsausgleich ermöglicht Studierenden mit Beeinträchtigungen angepasste Studien- und Prüfungsbedingungen. Der Weg dorthin führt über mehrere Instanzen, vom Antrag über Beratung und Bewilligung bis zur Umsetzung.»
- Drei Rollen-Blöcke, alternierend Bild/Text links-rechts, je mit farbiger Rollen-Pille, Rollenillustration, Titel, kurzem Beschreibungstext – **nur die Avalis-Seite, kein Vorher/Nachher:**

  | Rolle | Pille (Rollenfarbe) | Titel | Beschreibung (Figma-Text) |
  |---|---|---|---|
  | Studierende | grün (`bewilligt`) | «Klar geführt und Anträge jederzeit einsehbar» | «Studierende reichen ihren Antrag einmalig digital ein und behalten den Status jederzeit im Blick. Der Prozess wird von der Antragstellung bis zur Verfügung Schritt für Schritt begleitet. Sensible Angaben bleiben geschützt und werden nur an beteiligte Stellen weitergegeben.» |
  | Fachstellen | blau (`beratung`) | «Digitales Fallführungssystem an zentralem Ort» | «Fachstellen verwalten alle Fälle in einem strukturierten System: Anträge prüfen, Beratungstermine koordinieren, Rückmeldungen erfassen. Manuelle Abstimmungen per E-Mail entfallen. Die Kommunikation zwischen allen Beteiligten läuft nachvollziehbar und dokumentiert über avalis.» |
  | Entscheidungsinstanzen | lila (`in-decision`) | «Strukturiert und automatisches Erstellen von Verfügungen» | «Entscheidungsinstanzen erhalten geprüfte Anträge mit allen relevanten Unterlagen und geben ihre Entscheide direkt im System ein. Verfügungen werden auf Basis des Entscheids automatisch erstellt.» |

  Die Rollenfarben entsprechen exakt dem bestehenden Token-Mapping in `05_design-system.md` (bewilligt=grün/Studierende, beratung=blau/Fachstellen, in-decision=lila/Entscheidungsinstanzen) – keine neuen Farben nötig.

### S5 – Anpassbar und flexibel (Modularität)

Eigenständiger, ruhiger Zwischenabschnitt, kein Rollen-Bezug:

- Drei Puzzle-/Organic-Shape-Icons
- Titel: **«Anpassbar und flexibel für jede Hochschule»**
- Text: «Schweizer Hochschulen organisieren den Nachteilsausgleichsprozess unterschiedlich. Als modularer Webprototyp konzipiert, lässt sich avalis flexibel an die bestehenden Prozessstrukturen und institutionelle Zuständigkeiten jeder Hochschule anpassen.»

### S6 – Einblick in den Prototyp

- Titel: **«Einblick in avalis»**
- Kontext: «Der geplante Walkthrough gibt einen Überblick über den Webprototyp und das Zusammenspiel der Beteiligten. Die Aufnahme folgt.»
- Videoplatzhalter 16:9 (gleiches Muster wie S3): Titel «avalis im Überblick», Hinweis «Walkthrough und Originalposter folgen.»
- Statushinweis: «Entwicklungsstand: funktionaler, mit Fachpersonen getesteter Webprototyp. Nicht für den produktiven Einsatz bestimmt.»

### S7 – Registrierung

**Visuell abgesetzt vom Rest der Seite: dunkler/invertierter Hintergrund**, weisse Formular-Karte darauf. Das ist aktuell die einzige Section mit Farb-Inversion.

- Abschnittslabel: «Research Report»
- Titel: **«Den Nachteilsausgleich besser verstehen.»**
- Text 1: «Eine schweizweite Erhebung über 17 Hochschulen: Interviews, Umfragen und die Auswertung offizieller Prozessdokumente.»
- Text 2 (Frage-Format statt Antworten, wie in der Regel vorgesehen): «Wie läuft Nachteilsausgleich ab? Wo liegen die Grenzen? Und was bedeutet das für eine digitale Lösung?»
- **Visuelles Element:** Schweizer-Kantonskarte (statisches SVG `public/registration/switzerland-map.svg`, vom Team geliefert) mit Legende «Anzahl teilnehmende Institutionen pro Kanton» und Verlaufsbalken 0–8 (Figma V5).
- **Logo-Reihe** unter der Karte: im Figma-Stand teils generische Platzhalter-Logos (Notion, Airtable, Evernote) und teils echte (swissuniversities, HSLU Hochschule Luzern). Noch zu klären, siehe `08_open-points.md`.
- Formular-Karte: Titel «Research Report erhalten», Text «Registrieren Sie sich für den Report und gelegentliche Updates zur Weiterentwicklung von avalis.», Hinweis «* Pflichtfeld · alle weiteren Angaben sind optional». Felder siehe `04_registration-flow.md`. Button: **«Jetzt registrieren»**. Darunter: «Jederzeit abmeldbar. Keine Weitergabe Ihrer Daten an Dritte.» und ein kleiner Entwurfshinweis «Formularentwurf · noch ohne Versandfunktion».

### S8 – Kontakt

- Abschnittslabel: «Kontakt»
- Titel: **«Im Gespräch bleiben.»**
- Text: «Gerne stellen wir Ihnen das Projekt avalis vor und tauschen uns mit Ihnen zum Nachteilsausgleichsprozess aus.»
- Kontakt-E-Mail: **nta.avalis@gmail.com** (Figma V5), als `mailto:`-Link.

### S9 – Footer

- Logo + Wortmarke «avalis»
- Tagline: **«Eine digitale Lösung für den Nachteilsausgleich an Schweizer Hochschulen.»** – keine akademische/Bachelorprojekt-Rahmung, bestätigt die bestehende Regel «eigenständiges Projekt»
- Hinweis: «Impressum und Datenschutzerklärung werden vor Veröffentlichung ergänzt.»
- Links: Impressum, Datenschutz
- Sprachwahl DE/EN

## 5. Tonalität (bestätigt durch Figma-Texte)

- **Anrede «Sie»** durchgehend verwendet («Registrieren Sie sich», «Ihre E-Mail-Adresse», «Jederzeit abmeldbar»). Löst den offenen Punkt zur Anrede, siehe `08_open-points.md`.
- **Schreibweise «avalis» durchgehend klein**, auch am Satzanfang im Fliesstext uneinheitlich (im Modularitäts-Text einmal «Avalis» gross) – als Tippfehler im Entwurf werten, Regel bleibt: klein.
- Sachlich, kurz, keine Superlative. Fragen statt Antworten beim Research Report.

## 6. Offene Punkte zu diesem File

Siehe `08_open-points.md` für die laufende Liste (u.a. echte Logo-Reihe statt Platzhalter-Logos, Video-Aufnahmen).
