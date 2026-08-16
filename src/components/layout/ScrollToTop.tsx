// src/components/layout/ScrollToTop.tsx
// Resets scroll to the top on every route change so detail pages don't inherit
// the list's scroll position.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
