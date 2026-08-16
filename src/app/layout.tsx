// src/app/layout.tsx
// Root shell for every route: masthead, page content, colophon.
// App Router handles scroll restoration and per-route code splitting —
// the Vite-era Layout/ScrollToTop wrappers are gone. Fonts load via
// @fontsource-variable imports in globals.css (no next/font needed).

import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Wriven Display — content, live from the CMS',
    template: '%s — Wriven Display',
  },
  description:
    'A public content site rendered entirely from the Wriven Delivery API — the official showcase for the @wriven-ai npm packages.',
  openGraph: {
    type: 'website',
    siteName: 'Wriven Display',
    title: 'Wriven Display — content, live from the CMS',
    description:
      'Blog, products, team, case studies — every page fetched from the Wriven Delivery API by the @wriven-ai SDK.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wriven Display — content, live from the CMS',
    description:
      'Every page fetched from the Wriven Delivery API by the @wriven-ai SDK.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <div id="top" className="flex min-h-dvh w-full flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
