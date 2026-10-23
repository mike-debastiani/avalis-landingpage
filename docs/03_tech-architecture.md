# 03 – Tech-Architektur

> **Stand:** 15.09.2026 · Versionen bei der Initialisierung auf die aktuelle stabile Version prüfen, nicht aus dem Gedächtnis übernehmen.

---

## 1. Stack

| Bereich | Wahl | Begründung |
|---|---|---|
| Framework | **Next.js** (App Router, TypeScript strict) | Server Actions für die Registrierung, gutes Zusammenspiel mit Vercel |
| Styling | **Tailwind CSS** mit Tokens als CSS-Variablen | Tokens aus Figma zentral steuerbar |
| i18n | **next-intl** mit Routen `/de` und `/en` | Sprachversionen sauber erweiterbar (FR, IT) |
| Validierung | **Zod** | Gleiche Regeln serverseitig und clientseitig |
| Schrift | **DM Sans**, lokal über `next/font` eingebunden | Keine Anfragen an Google-Server (Datenschutz), keine Layout-Sprünge |
| Kontakte | **Brevo** (REST-API per `fetch`, kein SDK nötig) | EU-Hosting, Single-Opt-in-Registrierung, Newsletter-Editor für das Team |
| Hosting | **Vercel** (Free), verbunden mit GitHub | Automatische Deploys und Previews pro Branch |
| Analytics | **Vercel Web Analytics** | Ohne Cookies |
| Spam-Schutz | Honeypot-Feld, optional **Cloudflare Turnstile** | Siehe `08_open-points.md` |

**Keine eigene Datenbank.** Brevo ist die Kontaktdatenbank. Das bestehende Supabase-Projekt wird für die Landingpage nicht verwendet.

## 2. Architektur

```
Browser (Formular)
   │  POST via Server Action
   ▼
Next.js Server Action  (src/actions/register.ts, läuft auf Vercel)
   │  1. Honeypot prüfen
   │  2. Eingaben mit Zod validieren
   │  3. Brevo-API: Kontakt in der Liste anlegen/aktualisieren
   │  4. Brevo-API: Transaktionsmail (Template) mit Report-Link und
   │     signiertem Abmeldelink verschicken
   ▼
Erfolgsmeldung im Formular: «Der Link kommt per E-Mail» (der Link selbst
wird nie an den Browser ausgeliefert)

Abmeldung: Link in der Mail → /[locale]/abmelden (signiert, Bestätigung per
Button) → Server Action entfernt den Kontakt aus der Brevo-Liste
```

## 3. Environment Variables

In Vercel unter *Settings → Environment Variables* für Production, Preview und Development hinterlegen. Lokal in `.env.local` (steht in `.gitignore`). Im Repo gibt es nur `.env.example` mit leeren Werten.

| Variable | Geheim | Beschreibung |
|---|---|---|
| `BREVO_API_KEY` | **ja** | API-Key von Brevo. Nie im Client, nie in Logs, nie in Docs |
| `BREVO_LIST_ID` | nein | ID der Liste «Avalis Registrierungen» (bereits angelegt, ID 3) |
| `BREVO_REPORT_TEMPLATE_ID` | nein | ID des Brevo-Transaktions-Templates «Research Report» (Mail mit Download-Link) |
| `UNSUBSCRIBE_SECRET` | **ja** | Zufälliger Schlüssel (mind. 32 Zeichen) zum Signieren der Abmeldelinks, z.B. `openssl rand -base64 32`. Wird er geändert, werden bereits verschickte Abmeldelinks ungültig |
| `NEXT_PUBLIC_SITE_URL` | nein | Basis-URL, z.B. `https://….vercel.app`, später eigene Domain |
| `REPORT_DOWNLOAD_URL` | nein | Google-Drive-Link zum Research Report. Wird nur serverseitig als Template-Parameter an Brevo übergeben |
| `TURNSTILE_SECRET_KEY` | **ja** | Nur falls Turnstile verwendet wird |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | nein | Nur falls Turnstile verwendet wird |

Code muss so gebaut sein, dass fehlende Variablen beim Start eine klare Fehlermeldung erzeugen statt stillschweigend zu scheitern.

## 4. Sicherheitsregeln

- `BREVO_API_KEY` wird ausschliesslich in serverseitigem Code gelesen (`src/lib/brevo.ts`, markiert mit `import "server-only"`).
- Keine Brevo-Fehlermeldungen ungefiltert an den Client weitergeben.
- Keine personenbezogenen Daten in URL-Parametern, Logs oder Analytics-Events. **Einzige Ausnahme:** Der signierte Abmeldelink in der Report-Mail enthält die E-Mail-Adresse (base64url) und eine HMAC-Signatur, wie bei Abmeldelinks üblich. Die Seite ist `noindex`, hat keine externen Links (kein Referrer-Leak) und meldet erst nach Klick auf den Button ab.
- Serverseitige Validierung ist massgebend, clientseitige nur Komfort.
- Sicherheits-Header (u.a. Content-Security-Policy, Referrer-Policy) in `next.config` setzen.
- In Brevo die Sperre für unbekannte IP-Adressen deaktivieren, da Vercel wechselnde IPs nutzt.

## 5. Mehrsprachigkeit

- Routen: `/de/...` und `/en/...`, Standardsprache `de`. Die Root-URL leitet anhand der Browsersprache weiter, mit `de` als Fallback.
- Alle Texte in `messages/de.json` und `messages/en.json`, strukturiert nach Sektionen.
- Neue Sprache = neue JSON-Datei + Eintrag in der i18n-Konfiguration. Kein Code in Komponenten ändern.
- Sprachumschalter im Header, per Tastatur bedienbar, mit `lang`-Attribut und `hreflang`-Links.
- Englische Texte werden aus den abgestimmten deutschen Texten übersetzt und vom Team geprüft.

## 6. Qualität und Performance

- Bilder über `next/image`, Screenshots des Prototyps in WebP/AVIF.
- Kein unnötiges Client-JavaScript: Sektionen als Server Components, nur Formular und Sprachumschalter als Client Components.
- Metadaten und OpenGraph-Bild pro Sprache.
- `robots.txt` und `sitemap.xml`.
