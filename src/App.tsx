// src/App.tsx
// Top-level entry. Static landing site. The homepage is the whole experience;
// unknown routes hit the 404. No data fetching anywhere.

import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/components/home/HomePage';

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
