import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const GlobalHeader = () => {
  const location = useLocation();

  // Part A paths
  const partAPaths = [
    '/everyday-basics',
    '/activewear',
    '/loungewear',
    '/full-coverage',
    '/multiway-styling',
  ];

  const isPartA = partAPaths.includes(location.pathname) || location.pathname === '/';
  const isPartB = location.pathname === '/part-b';

  return (
    <header className="sticky top-0 z-50 bg-studio-50/95 backdrop-blur-md border-b border-studio-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Identity */}
          <Link
            to="/everyday-basics"
            className="group flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2.5 focus:outline-none"
          >
            <span className="font-display text-base sm:text-xl tracking-widest text-studio-950 font-semibold group-hover:text-burgundy-900 transition-colors leading-none">
              SAINT ROMAN
            </span>
            <span className="hidden sm:inline text-studio-300 font-light">•</span>
            <span className="text-[10px] sm:text-xs font-serif tracking-editorial text-studio-600 uppercase font-medium leading-none">
              Joshna Christa S B
            </span>
          </Link>

          {/* The Two Main Route Toggles: Part A & Part B */}
          <nav aria-label="Main Portfolio Sections" className="flex items-center">
            <div className="flex items-center bg-studio-100/90 p-1 rounded-full border border-studio-200/80 shadow-2xs">
              <Link
                to="/everyday-basics"
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider transition-all duration-200 ${
                  isPartA
                    ? 'bg-burgundy-900 text-white shadow-xs font-semibold'
                    : 'text-studio-700 hover:text-studio-950 hover:bg-white/60'
                }`}
              >
                Part A
              </Link>

              <Link
                to="/part-b"
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider transition-all duration-200 ${
                  isPartB
                    ? 'bg-burgundy-900 text-white shadow-xs font-semibold'
                    : 'text-studio-700 hover:text-studio-950 hover:bg-white/60'
                }`}
              >
                Part B
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
