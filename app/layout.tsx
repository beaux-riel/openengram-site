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
  title: "Engram — Self-Hosted Memory Infrastructure for AI Agents",
  description: "Open source memory infrastructure for AI agents. Self-hosted on your machine or hybrid with cloud. Local embeddings on Metal GPU, Dream Cycle, ensemble search — all free.",
  keywords: ["AI memory", "agent memory", "self-hosted AI", "local embeddings", "LLM memory", "open source"],
  openGraph: {
    title: "Engram — Self-Hosted Memory Infrastructure for AI Agents",
    description: "Your data, your machine. Self-hosted AI memory with local embeddings, Dream Cycle, and ensemble search. Add cloud when you need it.",
    url: "https://openengram.ai",
    siteName: "Open Engram",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engram — Self-Hosted Memory Infrastructure for AI Agents",
    description: "Your data, your machine. Self-hosted AI memory with local embeddings, Dream Cycle, and ensemble search. Add cloud when you need it.",
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
                { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Self-hosted — all features free" },
                { "@type": "Offer", "price": "4.99", "priceCurrency": "USD", "description": "Starter — cloud add-on" },
                { "@type": "Offer", "price": "14.99", "priceCurrency": "USD", "description": "Pro — cloud add-on" },
                { "@type": "Offer", "price": "29.99", "priceCurrency": "USD", "description": "Scale — cloud add-on" }
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
