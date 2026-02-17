import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://auramotion.ch";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Auramotion – Motion Grafiken & Explainvideos für SaaS & Tech | Schweiz",
    template: "%s | Auramotion",
  },
  description:
    "Motion Design aus der Schweiz: Professionelle Motion Grafiken und Explainvideos für SaaS- und Tech-Unternehmen. Produkte überzeugend inszenieren.",
  keywords: [
    "Motion Design Schweiz",
    "Explainvideos SaaS",
    "Tech Explainvideos",
    "Motion Grafiken B2B",
    "Erklärvideos Schweiz",
  ],
  authors: [{ name: "Auramotion", url: siteUrl }],
  creator: "Auramotion",
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: siteUrl,
    siteName: "Auramotion",
    title: "Auramotion – Motion Grafiken & Explainvideos für SaaS & Tech | Schweiz",
    description:
      "Professionelle Motion Grafiken und Explainvideos für SaaS- und Tech-Unternehmen. Aus der Schweiz.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auramotion – Motion Grafiken & Explainvideos | Schweiz",
    description: "Motion Design für SaaS & Tech. Explainvideos und Motion Grafiken aus der Schweiz.",
  },
  robots: "index, follow",
};

function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Auramotion",
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
    name: "Auramotion",
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
