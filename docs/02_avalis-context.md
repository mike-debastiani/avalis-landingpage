# 02 – Kontext: avalis, Research und Team

> **Zweck:** Inhaltliche Wissensbasis für Texte auf der Landingpage.
> **Quellen:** Abschlusspräsentation «Avalis» (Juli 2026), Research Report (Draft), Prototypbeschreibung.
> **Regel:** Nur Fakten aus diesem File verwenden. Keine zusätzlichen Zahlen, Zitate oder Aussagen erfinden. Zitate nur wörtlich und mit Quelle.

---

## 1. avalis in Kürze

**avalis** ist ein Konzept und funktionaler Web-Prototyp für eine digitale, modulare Lösung, die den Nachteilsausgleichsprozess (NTA) an Schweizer Hochschulen für alle Beteiligten abbildet: von der Antragstellung über Beratung und fachliche Prüfung bis zur Bewilligung und Verfügung.

- **Untertitel aus der Präsentation:** «Die digitale Lösung für Nachteilsausgleichsprozesse an Schweizer Hochschulen»
- **Schreibweise:** Im Logo klein «avalis». In Fliesstexten «avalis» (Schreibweise bei Bedarf mit Team klären, siehe `08_open-points.md`).
- **Kontext:** Bachelorprojekt, Studiengang Digital Ideation, Fokus Design, Hochschule Luzern (HSLU), Juli 2026.

**Vision (aus der Präsentation):**
Ein mandantenfähiger Tool-Prototyp, der die drei etablierten Prozessmodelle berücksichtigt, fragmentierte Kommunikationswege bündelt und Medienbrüche auflöst, damit der NTA-Prozess für alle Beteiligten transparenter, effizienter und skalierbar wird.

**Wichtig zum Status:** avalis ist ein **Prototyp** und ausdrücklich **nicht für den Echteinsatz** bestimmt. Es gibt keine produktive Datenhaltung, keine geprüfte Sicherheitsinfrastruktur und keine Anbindung an reale Systeme. Die Landingpage darf nichts anderes suggerieren, etwa «jetzt einsetzen» oder «Demo buchen».

## 2. Ausgangslage und Problem

**Rechtlicher Rahmen (aus der Präsentation, wörtlich zitierbar):**
- Bundesverfassung (BV), Art. 8 Abs. 2: Niemand darf diskriminiert werden, u.a. nicht wegen einer körperlichen, geistigen oder psychischen Behinderung.
- Behindertengleichstellungsgesetz (BehiG), Art. 2 Abs. 5 lit. b: Eine Benachteiligung liegt insbesondere vor, wenn Dauer und Ausgestaltung des Bildungsangebots sowie Prüfungen den spezifischen Bedürfnissen Behinderter nicht angepasst sind.

**Steigende Fallzahlen (Zitate aus der Präsentation):**
- Universität Zürich, 2025: «Die Fachstelle Studium und Behinderung hat letztes Jahr 604 Beratungen für Nachteilsausgleiche durchgeführt, davon rund 400 Erstberatungen – Tendenz steigend.»
- Universität Zürich, 2025: Die «Organisationstrukturen [...] mit dem Anstieg der Fallzahlen leider nicht mitgewachsen sind.»
- swissuniversities, 2024: «Dabei sehen sich die Hochschulen mit einer steigenden Anzahl von Anträgen auf nachteilsausgleichende Massnahmen und einem breiteren Spektrum von angeführten Beeinträchtigungen konfrontiert.»

**Kernproblem:** Der NTA-Prozess ist mehrstufig, rollenübergreifend und läuft fast überall über E-Mail, PDF und Excel. Informationen gehen an Schnittstellen verloren, der Status ist unklar, und sensible Gesundheitsdaten zirkulieren unstrukturiert.

## 3. Research

**Vorarbeit:** Research Report «Nachteilsausgleiche an der HSLU» (Research-Modul Digital Ideation, Mike De Bastiani und Dario Foti, 2025). Daraus entstand eine Vier-Phasen-Struktur des NTA-Prozesses: Antragstellung, Bearbeitung & Bewilligung, Administration, Umsetzung & Monitoring.

**Research für avalis (schweizweit):**
- **34** Institutionen angefragt, **17** haben teilgenommen
- **9** ausgefüllte Umfragen, **8** durchgeführte Interviews
- **59** offizielle Prozessdokumente gesichtet
- Fragebogen in zwei Sprachversionen, **132** Mails in drei Sprachen
- Aufbereitung zu **75 Seiten** strukturierter Prozessbeschreibung und **17** Stakeholder-Phasen-Matrizen
- Analyse: 3 Prozessmodell-Typologien, 3 Swimlane-Diagramme, 6 Rollenaggregationen, 6 Rollen-User-Journey-Maps
- Abdeckung: Universitäten und Pädagogische Hochschulen aus allen Sprachregionen der Schweiz; daraus wurden direkte Implikationen für die Lösungsgestaltung abgeleitet (siehe Abschnitt 6)

**Teilnehmende Institutionen (laut Präsentation):**
- Universitäten: ETH, UZH, UniLu, UNIL, EPFL, HSG, Uni Bern
- Fachhochschulen: ZHAW, ZHdK, FHNW, FHGR, SUPSI
- Pädagogische Hochschulen: HfH, PHZH, PHLU, PH FHNW, PHBern

> ⚠️ **Vor Veröffentlichung klären:** Der Research Report sichert Anonymisierung zu. Ob die Namen der teilnehmenden Institutionen öffentlich auf der Landingpage genannt werden dürfen, ist offen (siehe `08_open-points.md`). Bis dahin nur Zahlen verwenden, keine Namen.

## 4. Zentrale Erkenntnis: drei Prozessmodelle

Der NTA-Prozess an Schweizer Hochschulen lässt sich auf **drei Prozessmodelle** reduzieren. Das macht eine modulare Lösung überhaupt erst möglich.

| Modell | Charakteristik | Stärke | Schwäche | Verbreitung |
|---|---|---|---|---|
| **A** | Zentrale Fachstelle steuert den Prozess, Entscheid fällt dezentral auf Studiengangsebene | Klarer Anlaufpunkt, fachlich konsistente Beurteilung, Nähe zum Studiengang beim Entscheid | Bruch nach der Bewilligung: Fachstelle hat keinen Einblick in den Entscheid, Anträge bleiben an der Schnittstelle liegen | 7 von 17 |
| **B** | Gesamter Prozess zentralisiert, Entscheid durch ein Gremium | Höchste Professionalisierung, einheitliche Entscheide zwischen Fakultäten | Sehr ressourcenintensiv, eher für grosse Hochschulen | 3 von 17 |
| **C** | Fallführung bei Fakultät, Departement oder Studiengangsleitung, Fachstelle berät nur fakultativ | Maximale Fakultätsnähe | Verlust von Vergleichbarkeit und Steuerung auf Hochschulebene | 7 von 17 |

## 5. Key Findings (Kurzfassung)

1. Nach der Bewilligung reisst der Informationsfluss ab, Studierende müssen ihren NTA oft selbst kommunizieren.
2. Niemand prüft systematisch, ob bewilligte Massnahmen umgesetzt werden, Monitoring fehlt überall.
3. Der Prozess läuft fast überall über E-Mail und Excel, ein echtes Fallführungssystem existiert praktisch nirgends.
4. Sensible Gesundheitsdaten zirkulieren über E-Mail und Excel, ein konkretes Datenschutzrisiko.
5. Die Antragszahlen steigen, die Prozesse sind strukturell nicht mitgewachsen.
6. Formulare, Fristen und Massnahmen sind uneinheitlich, oft sogar innerhalb derselben Institution.
7. Entschieden und umgesetzt wird oft fachfremd, Fachkenntnisse zum NTA fehlen.

## 6. Implikationen für die Lösung

1. Ein Prozess, an dem alle Rollen am selben Antrag arbeiten, mit klar geregelten Übergaben.
2. Antragstellende sehen jederzeit, wo ihr Antrag steht.
3. Genug Struktur für vergleichbare Anträge, genug Freiraum für den Einzelfall, sensible Gesundheitsdaten nur dort sichtbar, wo nötig.
4. Empfehlung und Entscheid bleiben getrennt.
5. Anpassbar an jede Hochschule.

## 7. Die Lösung avalis

**Zwei Bereiche:**
- **Studierenden-Portal:** Antrag erstellen und einreichen, Anpassungen vornehmen, Status verfolgen, Verfügung einsehen.
- **Administration Workspace:** Beratung und Empfehlung, Review des Antrags Block für Block, Anpassungen anfordern, Bewilligung oder Ablehnung, Verfügung erstellen, Übersicht über alle Anträge.

**Funktionsweise der Plattform:** avalis ersetzt entkoppelte E-Mails, Excel-Listen und parallele Ablagen durch ein gemeinsames Fallobjekt. Alle beteiligten Instanzen arbeiten am selben, statusbasierten Antrag. Das ermöglicht einen einzigen, nachvollziehbaren Vorgang mit kontrollierten Verantwortungsübergaben – von der Antragsstellung bis zur ausgestellten Verfügung.

**Scope des Prototyps:** NTA-Antrag erstellen (Studierende) → Prüfung des Antrags (Fachstelle) ⇄ Anpassungen (Studierende) → Bewilligung und Verfügung (Entscheidungsinstanz). Prüfungsplanung und Umsetzung sind noch nicht abgebildet. Priorisiert ist Prozessmodell A.

**Impact pro Rolle (aus der Präsentation):**

| Rolle | Heute | Mit avalis |
|---|---|---|
| Studierende | Kein Statusupdate, unklarer Ablauf, hohe Eigenverantwortung, verstreute Informationen | Geführter Antragsprozess mit Hilfestellungen, Status jederzeit einsehbar, klare Zuständigkeiten, alles an einem Ort |
| Fachstellen | Prozess über E-Mail, PDF und Excel, Anträge bleiben an Schnittstellen hängen, Statistiken aufwändig, kein Fallüberblick, manuelle Weiterleitung | Digitales Fallführungssystem, Statustracking, Statistiken automatisch verfügbar, zentrale Antragsübersicht, automatische Weiterleitung |
| Entscheidungsinstanzen | Anträge im E-Mail-Postfach, Entscheid ohne strukturierte Grundlage, fehlende Fachgrundlage, manuelle Verfügungen | Strukturierte Übergabe des Dossiers, geführter Entscheidungsprozess, fachliche Empfehlung direkt einsehbar, automatisch generierte Verfügung |

**Praxisrelevanz und Transferierbarkeit:** Die Lösung schliesst eine Lücke, die im Schweizer Hochschulkontext bisher nicht adressiert wurde. Das Tool erzwingt keinen Einheitsablauf, sondern ist durch seinen modularen Aufbau so konzipiert, dass es sich an die heterogenen Abläufe verschiedener Institutionen anpassen lässt. Zudem schafft das System eine Datengrundlage für hochschulübergreifendes Monitoring und Prozessplanung.

**Validierung:** Mid-Fidelity-Testing (Demo-Day) und High-Fidelity-Testing mit realen Nutzer:innen (3 Szenarien, 15 Aufgaben, über 30 generierte Testanträge). Die Umsetzbarkeit wurde in mehreren Testing-Loops mit realen Stakeholdern aus Beratung, Entscheidungsinstanz und Administration validiert.

## 8. Nachhaltigkeit (SDGs)

avalis leistet einen direkten Beitrag zum Abbau struktureller Ungleichheiten (SDG 4.5 «Inklusive und gerechte Bildung» und SDG 10 «Weniger Ungleichheiten»), da die Plattform die Voraussetzung für eine faire, nachvollziehbare Behandlung gleichartiger Fälle über Rollen und Institutionen hinweg schafft.

## 9. Zukunftspotenzial (aus der Präsentation)

Requirements Engineering, Rollen erweitern (Prüfungsadministration, Dozierende), Datenschutzkonzept, Mehrmandantenfähigkeit, Sicherheitsinfrastruktur, Anbindung an Prüfungssysteme, Tool-Vorstellung bei Gleichstellungsbeauftragten.

## 10. Team

| Person | Schwerpunkt im Projekt |
|---|---|
| **Chiara Tremml** | Styleguide und Design System *(Beschreibung von Chiara bestätigen lassen)* |
| **Dario Foti** | Research Report als Referenzdokument *(Beschreibung von Dario bestätigen lassen)* |
| **Mike De Bastiani** | Konzept zur Aufbereitung der Research-Daten, technische Umsetzung und Systemarchitektur des Web-Prototyps |

Alle drei waren gemeinsam an Research, Auswertung, Ideation, Wireframing sowie Mid- und High-Fidelity-Screens beteiligt.

**Mentor:innen (laut Research Report):** Angie Born, Patricia Schmidiger, Marcel Uhr, Raphael Theiler, Stefan Fraefel. *(Nennung auf der Seite mit dem Team abstimmen.)*

**Tonalität für die Landingpage:** Erst die Erkenntnis, dann das Produkt als Konsequenz. Sachlich, respektvoll, fachlich fundiert, nicht werbend. Menschen mit Beeinträchtigungen werden nicht als Problem dargestellt, sondern der Prozess.
