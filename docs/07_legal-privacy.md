# 07 – Rechtliches und Datenschutz

> **Hinweis:** Dieses File ist eine Arbeitsgrundlage, keine Rechtsberatung. Texte vor Veröffentlichung prüfen, idealerweise mit Mentor:innen oder der HSLU.
> **Verantwortlich für die Seite:** Das Projektteam (Angaben folgen).
> **Stand 23.10.2026:** Die Datenschutzerklärung ist umgesetzt (`src/app/[locale]/datenschutz/page.tsx`, Texte in `messages/de.json` und `messages/en.json` unter `Legal.privacy`). Der Impressum-Text fehlt noch. Der Text ist ein Entwurf auf Basis des tatsächlichen Codes und **keine Rechtsberatung**; vor dem Launch von einer fachkundigen Person prüfen lassen. Die Punkte in Abschnitt 6 müssen dafür geklärt sein.

---

## 1. Rahmen

- Schweizer Datenschutzgesetz (**nDSG**) gilt.
- Da auch Personen aus dem EU-Raum die Seite nutzen könnten, orientieren sich die Texte zusätzlich an den Grundsätzen der DSGVO (Transparenz, Einwilligung, Widerruf).
- Grundsatz der **Datensparsamkeit:** Nur Daten erheben, die wir für Versand und Auswertung wirklich brauchen.

## 2. Impressum (Inhalte)

- Verantwortliche Personen: Namen *(folgen)*
- Kontaktadresse und E-Mail *(folgen)*
- Hinweis: Bachelorprojekt im Studiengang Digital Ideation, Hochschule Luzern
- Klären, ob HSLU-Name und Logo verwendet werden dürfen *(siehe `08_open-points.md`)*

## 3. Datenschutzerklärung (Inhalte, umgesetzt)

Die Erklärung hat 11 Ziffern. Sie beschreibt nur, was der Code heute tatsächlich tut. Ändert sich eine der Grundlagen (Analytics, neue Dienstleister, Speicherdauer), muss die Erklärung **im selben Pull Request** angepasst werden.

1. **Verantwortliche Stelle und Kontakt:** Projektteam avalis, `nta.avalis@gmail.com`. Rechtsrahmen: DSG, zusätzlich DSGVO.
2. **Welche Daten:** Server-Verbindungsdaten (Hosting), Registrierung (E-Mail, Institution, Rolle, optional Vor-/Nachname, Herkunft `source`, Zeitpunkt durch Brevo), Report-Mail inkl. Zustellinformationen, Abmeldung (signierter Link mit codierter E-Mail), Kontakt per E-Mail
3. **Zwecke und Rechtsgrundlagen:** Einwilligung (Registrierung, Videoklick; Art. 31 DSG, Art. 6 Abs. 1 lit. a DSGVO), berechtigtes Interesse (Betrieb/Sicherheit, aggregierte Auswertung, Anfragen; lit. f). Kein Profiling, keine automatisierten Entscheidungen, keine Werbung Dritter
4. **Empfänger/Auftragsbearbeiter:** Brevo (Kontaktliste, Mailversand), Vercel (Hosting), Google (Drive für den Report-Link, Gmail-Postfach), YouTube (Videos)
5. **Bekanntgabe ins Ausland:** USA über Data Privacy Framework (Vercel, Google), Brevo in der EU
6. **Speicherdauer:** Registrierungsdaten bis Abmeldung/Löschwunsch, längstens bis Projektende
7. **Cookies und Schriften:** keine Tracking-Cookies, nur das Sitzungs-Cookie `NEXT_LOCALE` (Sprachwahl, von next-intl gesetzt); DM Sans lokal über `next/font`
8. **Eingebettete Videos:** YouTube erst nach Klick (`youtube-nocookie.com`), Vorschaubild über den eigenen Server (`next/image`)
9. **Datensicherheit**
10. **Rechte:** Auskunft, Berichtigung, Löschung/Einschränkung, Widerspruch, Herausgabe, Widerruf; Pflichtangaben; Beschwerde beim EDÖB bzw. der Aufsichtsbehörde im Wohnsitzstaat
11. **Änderungen**

## 4. Technische Umsetzung der Datenschutzanforderungen

- Einwilligungs-Checkbox nicht vorausgewählt
- Single Opt-in (Entscheidung vom 23.10.2026, siehe `08_open-points.md`)
- Abmeldelink in der Report-Mail
- Keine personenbezogenen Daten in URLs, Logs oder Analytics (Ausnahme: signierter Abmeldelink, siehe `03_tech-architecture.md` Abschnitt 4)
- DM Sans über `next/font` lokal ausliefern
- Keine eingebetteten Drittinhalte ohne vorherige Zustimmung: YouTube-Videos laden erst nach Klick auf «Abspielen» (`src/components/youtube-embed.tsx`)
- Nach Projektende: Umgang mit der Kontaktliste festlegen (weiterführen, übergeben oder löschen)

## 5. Offene rechtliche Fragen

- Wer genau ist verantwortlich im Sinne des Datenschutzes (Team, Einzelperson, HSLU)?
- Darf das HSLU-Logo verwendet werden?
- Dürfen die teilnehmenden Institutionen namentlich genannt werden?
- Dürfen Screenshots des Prototyps mit Mock-Daten gezeigt werden (sicherstellen, dass keine echten Personendaten sichtbar sind)?

## 6. Vor dem Launch zu klären (Datenschutzerklärung)

| # | Punkt | Warum |
|---|---|---|
| a | **Verantwortliche Stelle** festlegen (Team, Einzelperson, HSLU) und Postadresse ergänzen | Die Erklärung nennt aktuell nur «Projektteam avalis» und die E-Mail-Adresse. Ein Impressum gibt es noch nicht |
| b | **Speicherdauer** bestätigen: «bis Abmeldung/Löschwunsch, längstens bis Projektende, danach Löschung» | Entscheid des Teams, siehe Abschnitt 4 «Nach Projektende» |
| c | **Brevo: Öffnungs-/Klick-Tracking für Transaktionsmails deaktivieren** | Die Erklärung sagt, dass wir Öffnungen und Klicks nicht auswerten. Brevo kann das standardmässig erfassen. Entweder abschalten oder den Text anpassen |
| d | **Brevo: AVV (Auftragsverarbeitungsvertrag) abschliessen**, Betreibergesellschaft, Rechenzentrumsstandort EU und Unterauftragsbearbeiter prüfen | Die Erklärung nennt Brevo als EU-Anbieter mit Speicherung in der EU, das muss zum Vertrag passen |
| e | **Vercel/Google: DPA und DPF-Zertifizierung** auf dataprivacyframework.gov prüfen | Grundlage für die Aussage zur Bekanntgabe in die USA |
| f | **Abmeldung löscht den Kontakt nicht**: `removeContactFromList` entfernt ihn nur aus der Liste, Angaben bleiben in Brevo | Die Erklärung sagt das offen und bietet vollständige Löschung per E-Mail an. Besser wäre, Kontakte bei Abmeldung ganz zu löschen (Code-Änderung, eigener Pull Request) |
| g | **Analytics**: `docs/03_tech-architecture.md` nennt Vercel Web Analytics, im Code ist es **nicht** eingebaut. Die Erklärung sagt «keine Analyse-Werkzeuge». Wird es ergänzt, Erklärung anpassen | Sonst stimmt die Erklärung nicht mehr |
| h | **Zugriff** «nur Mitglieder des Projektteams» bestätigen | Aussage in Ziffer 4 |
| i | **Turnstile**: Falls ergänzt (siehe `08_open-points.md`), Cloudflare als Empfänger aufnehmen und Cookie-Aussage prüfen | Würde Daten an Cloudflare übermitteln |
| j | Fachliche/juristische Prüfung des Texts (z. B. HSLU-Mentor:innen) | Entwurf, keine Rechtsberatung |
