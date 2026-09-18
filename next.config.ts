import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// script-src erlaubt 'unsafe-inline': Next.js 16 appliziert den Nonce aus einem
// per-Request-CSP-Header trotz korrektem Setup nicht auf seine eigenen
// Hydration-<script>-Tags (geprüft, siehe docs/08_open-points.md). Bis das
// gelöst ist, bleibt es bei 'unsafe-inline' statt einer kaputten Hydration.
// Alles andere bleibt strikt (kein unsafe-eval in Production, kein Fremd-Origin).
//
// 'unsafe-eval' nur im Dev-Modus: React nutzt eval() dort für Debugging-Features
// (Callstack-Rekonstruktion), in Production nie (siehe docs/08_open-points.md #26).
const isDev = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
