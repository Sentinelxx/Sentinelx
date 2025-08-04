import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Adjust import if needed (e.g., from 'next/font/google')
import "./globals.css";

import { ClientProvider } from "@/components/ClientProvider"; // Adjust path if your components folder is different
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sentinel",
  icons: {
    icon: "/favicon.ico"
  },
  description: "The ultimate firewall for smart contracts",
  keywords: ['Smart Contract Security', 'AI-Powered Auditing', 'MEV-Resistant Execution'],
  authors: [{ name: 'Aryan', url: 'https://github.com/aryanzutshi' }],
  creator: 'Aryan Zutshi',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: "Sentinel",
    description: "The Ultimate Firewall for Smart Contracts",
    siteName: "Sentinel",
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Removed unused 'opts' variable; re-add if needed

  return (
    <html lang="en" className="scroll-smooth">
      <body className="overflow-x-hidden">
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
} 