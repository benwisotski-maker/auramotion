import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import GradualBlur from "@/components/GradualBlur";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://auramotion.ch";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AuraMotion – Premium Motion Design für SaaS | Zug & Zürich",
    template: "%s | AuraMotion",
  },
  description:
    "Where Swiss Precision Meets High-Growth SaaS. Handgefertigte Explainvideos und Motion Design aus dem Crypto Valley und Zürich. Keine Massenware, kein AI-Einheitsbrei.",
  keywords: [
    "Motion Design Schweiz",
    "Explainvideos SaaS",
    "Crypto Valley Zug",
    "Motion Grafiken B2B",
    "Handgemachte Animation",
  ],
  authors: [{ name: "AuraMotion", url: siteUrl }],
  creator: "AuraMotion",
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: siteUrl,
    siteName: "AuraMotion",
    title: "AuraMotion – Premium Motion Design für SaaS | Zug & Zürich",
    description:
      "Swiss Digital Craftsmanship: Handgefertigte Motion Grafiken und Explainvideos für SaaS. Zug & Zürich.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraMotion – Premium Motion Design für SaaS | Zug & Zürich",
    description: "Where Swiss Precision Meets High-Growth SaaS. Handgemacht in Zug & Zürich.",
  },
  robots: "index, follow",
};

function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AuraMotion",
    url: siteUrl,
    description:
      "Motion Grafiken und Explainvideos für SaaS- und Tech-Unternehmen in der Schweiz.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: "AuraMotion",
    url: siteUrl,
    description:
      "Professionelle Motion Grafiken und Explainvideos für SaaS und Tech. Schweiz.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${dmSans.variable} ${geistMono.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {children}
        <GradualBlur target="page" position="bottom" height="4rem" strength={1.2} curve="ease-out" />
      </body>
    </html>
  );
}
