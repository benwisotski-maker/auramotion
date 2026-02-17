# Auramotion

Website für Auramotion – Motion Grafiken & Explainvideos für SaaS & Tech, Schweiz.

## Tech-Stack

- **Next.js** (App Router), **Tailwind CSS**, **GSAP**, **Three.js** / React Three Fiber

## Entwicklung

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Kontaktformular (E-Mail)

Ohne Konfiguration wird das Formular nur validiert und zeigt eine Erfolgsmeldung (zum Testen).

Für echten E-Mail-Versand per [Resend](https://resend.com):

1. `RESEND_API_KEY` und `CONTACT_EMAIL` in `.env.local` setzen.
2. Resend ist bereits installiert; Domain/Sender in Resend konfigurieren.

## Inhalte anpassen

- **Videos:** Platzhalter in `components/VideoShowcase.tsx` (Array `placeholderVideos`) durch echte URLs/Thumbnails ersetzen.
- **SEO:** `app/layout.tsx` (Metadata, `siteUrl`). Optional: `NEXT_PUBLIC_SITE_URL` in `.env.local` für OG-URLs.
