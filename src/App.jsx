import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GlobalHeader } from './components/GlobalHeader';
import { PartASubNav } from './components/PartASubNav';
import { Footer } from './components/Footer';
import { CategoryView } from './pages/CategoryView';
import { PartBPage } from './pages/PartBPage';
import { CATEGORIES } from './data/categories';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function App() {
  const [cat1, cat2, cat3, cat4, cat5] = CATEGORIES;
  const location = useLocation();

  // Part A valid routes
  const partAPaths = [
    '/',
    '/everyday-basics',
    '/activewear',
    '/loungewear',
    '/full-coverage',
    '/multiway-styling',
  ];

  const isPartA = partAPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-studio-50 text-studio-950 font-sans selection:bg-burgundy-900 selection:text-white">
      <ScrollToTop />

      {/* Single Global Sticky Header */}
      <GlobalHeader />

      {/* Dedicated Secondary Sub-Navigation — ONLY renders inside Part A routes */}
      {isPartA && <PartASubNav />}

      {/* Main Routed Views */}
      <div className="flex-1">
        <Routes>
          {/* Default Route redirects to /everyday-basics */}
          <Route path="/" element={<Navigate to="/everyday-basics" replace />} />

          {/* Part A — 5 Distinct Category Routes */}
          <Route path="/everyday-basics" element={<CategoryView category={cat1} />} />
          <Route path="/activewear" element={<CategoryView category={cat2} />} />
          <Route path="/loungewear" element={<CategoryView category={cat3} />} />
          <Route path="/full-coverage" element={<CategoryView category={cat4} />} />
          <Route path="/multiway-styling" element={<CategoryView category={cat5} />} />

          {/* Part B — 23-Page Continuous Scroll Route */}
          <Route path="/part-b" element={<PartBPage />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/everyday-basics" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
