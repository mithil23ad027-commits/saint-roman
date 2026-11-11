import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';

export const PartASubNav = () => {
  return (
    <nav
      aria-label="Part A Collections Sub-Navigation"
      className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-studio-200/80 transition-all shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start md:justify-center overflow-x-auto py-2.5 gap-1.5 sm:gap-2 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => (
            <NavLink
              key={cat.id}
              to={cat.path}
              className={({ isActive }) =>
                `flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-editorial transition-all duration-200 font-medium flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-burgundy-900 text-white border-burgundy-900 shadow-xs font-semibold'
                    : 'bg-studio-50/70 text-studio-700 hover:text-burgundy-900 hover:bg-studio-100 border-studio-200/80'
                }`
              }
            >
              <span className="font-mono text-[10px] opacity-75">
                {cat.slideNumber}
              </span>
              <span>{cat.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
