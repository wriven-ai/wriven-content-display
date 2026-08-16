// src/components/layout/Layout.tsx
// App shell shared by every route: masthead, scroll reset, page outlet, colophon.
// A single Suspense boundary around the outlet catches lazy-loaded pages.

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { Loading } from '@/components/states/Loading';

const pageFallback = (
  <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
    <Loading label="Loading page" />
  </div>
);

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={pageFallback}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
