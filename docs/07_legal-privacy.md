# 07 – Rechtliches und Datenschutz

> **Hinweis:** Dieses File ist eine Arbeitsgrundlage, keine Rechtsberatung. Texte vor Veröffentlichung prüfen, idealerweise mit Mentor:innen oder der HSLU.
> **Verantwortlich für die Seite:** Das Projektteam (Angaben folgen).

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

## 3. Datenschutzerklärung (Inhalte)

1. **Verantwortliche:** wer, Kontakt
2. **Welche Daten:** E-Mail, optional Vor- und Nachname, Institution, Rolle, Herkunftskanal, Sprache, Zeitpunkt der Einwilligung
3. **Zweck:** Versand des Research Reports und gelegentlicher Updates zum Projekt avalis; anonyme Auswertung, aus welchen Institutionen und Rollen Interesse besteht
4. **Rechtsgrundlage:** Einwilligung per Double-Opt-in
5. **Auftragsbearbeiter:**
   - **Brevo** (Speicherung der Kontakte, Mailversand, Server in der EU)
   - **Vercel** (Hosting, cookielose Web Analytics; Unternehmen mit Sitz in den USA, Standort der Verarbeitung prüfen)
   - **Google Drive** (Bereitstellung des Research Reports; beim Download gelten Googles Bedingungen)
6. **Speicherdauer:** bis zur Abmeldung bzw. bis zum Projektende *(festlegen)*
7. **Rechte:** Auskunft, Berichtigung, Löschung, Widerruf der Einwilligung jederzeit per Abmeldelink oder E-Mail
8. **Keine Weitergabe** an Dritte, keine Werbung
9. **Cookies:** keine Tracking-Cookies (prüfen, dass das auch nach Einbau von Turnstile stimmt)
10. **Schriften:** lokal eingebunden, keine Verbindung zu Google Fonts

## 4. Technische Umsetzung der Datenschutzanforderungen

- Einwilligungs-Checkbox nicht vorausgewählt
- Double-Opt-in zwingend
- Abmeldelink in jeder Mail
- Keine personenbezogenen Daten in URLs, Logs oder Analytics
- DM Sans über `next/font` lokal ausliefern
- Keine eingebetteten Drittinhalte (YouTube, Maps, Social Widgets) ohne vorherige Zustimmung
- Nach Projektende: Umgang mit der Kontaktliste festlegen (weiterführen, übergeben oder löschen)

## 5. Offene rechtliche Fragen

- Wer genau ist verantwortlich im Sinne des Datenschutzes (Team, Einzelperson, HSLU)?
- Darf das HSLU-Logo verwendet werden?
- Dürfen die teilnehmenden Institutionen namentlich genannt werden?
- Dürfen Screenshots des Prototyps mit Mock-Daten gezeigt werden (sicherstellen, dass keine echten Personendaten sichtbar sind)?
