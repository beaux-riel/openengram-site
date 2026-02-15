import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "./components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Engram — Memory Infrastructure for AI Agents",
  description: "Open source memory infrastructure for AI agents. Self-hosted. Actually works.",
  openGraph: {
    title: "Engram — Memory Infrastructure for AI Agents",
    description: "Open source memory infrastructure for AI agents. Self-hosted. Actually works.",
    url: "https://openengram.ai",
    siteName: "Open Engram",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engram — Memory Infrastructure for AI Agents",
    description: "Open source memory infrastructure for AI agents. Self-hosted. Actually works.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Engram",
              "description": "Memory infrastructure for AI agents",
              "url": "https://openengram.ai",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Cloud, Linux, macOS",
              "offers": [
                { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Self-hosted" },
                { "@type": "Offer", "price": "9", "priceCurrency": "USD", "description": "Starter" },
                { "@type": "Offer", "price": "39", "priceCurrency": "USD", "description": "Pro" },
                { "@type": "Offer", "price": "99", "priceCurrency": "USD", "description": "Scale" }
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
