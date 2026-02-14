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

export const metadata: Metadata = {
  title: "Open Engram — Memory Infrastructure for AI Agents",
  description: "Open source memory infrastructure for AI agents. Self-hosted. Actually works.",
  openGraph: {
    title: "Open Engram — Memory Infrastructure for AI Agents",
    description: "Open source memory infrastructure for AI agents. Self-hosted. Actually works.",
    url: "https://openengram.ai",
    siteName: "Open Engram",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Engram — Memory Infrastructure for AI Agents",
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
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
