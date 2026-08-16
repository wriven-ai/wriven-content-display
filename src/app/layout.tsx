// src/app/layout.tsx
// Root shell for every route: masthead, page content, colophon.
// App Router handles scroll restoration and per-route code splitting —
// the Vite-era Layout/ScrollToTop wrappers are gone. Fonts load via
// @fontsource-variable imports in globals.css (no next/font needed).

import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Wriven Display — content, live from the CMS',
    template: '%s — Wriven Display',
  },
  description:
    'A public content site rendered entirely from the Wriven Delivery API — the official showcase for the @wriven-ai npm packages.',
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
