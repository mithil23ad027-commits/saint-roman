import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { Menu, X, Sparkles, Layers, ArrowUpRight, ScrollText, Check } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isPartB = location.pathname === '/part-b';
  const currentCategory = CATEGORIES.find((c) => c.path === location.pathname);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      {/* Top Studio Micro-bar with Segmented Section Switcher */}
      <div className="border-b border-studio-200/60 bg-studio-100/60 text-[11px] uppercase tracking-widest-luxury text-studio-600 py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2">
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3 h-3 text-burgundy-700" />
          <span>Saint Roman • Joshna Christa S B</span>
        </span>

        {/* Top-level Segmented Portfolio Switcher (Part A vs Part B) */}
        <div className="flex items-center bg-white/80 rounded-full p-0.5 border border-studio-200 shadow-2xs">
          <Link
            to="/everyday-basics"
            className={`px-3 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider transition-all ${
              !isPartB
                ? 'bg-burgundy-900 text-white shadow-xs'
                : 'text-studio-600 hover:text-burgundy-900'
            }`}
          >
            Part A (5 Sets)
          </Link>
          <Link
            to="/part-b"
            className={`px-3 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider flex items-center gap-1 transition-all ${
              isPartB
                ? 'bg-burgundy-900 text-white shadow-xs'
                : 'text-burgundy-800 hover:text-burgundy-950 font-bold'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>Part B (23 Slides)</span>
          </Link>
        </div>

        <span className="hidden sm:inline font-mono text-[10px] text-studio-500 font-medium">
          {isPartB ? '23 Continuous Slides' : '5 Sub-Categories • 25 Slides'}
        </span>
      </div>

      {/* Main Sticky Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/everyday-basics"
            className="group flex flex-col items-start focus:outline-none flex-shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl tracking-widest text-studio-950 group-hover:text-burgundy-900 transition-colors">
                SAINT ROMAN
              </span>
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-burgundy-900 text-white shadow-xs">
                {isPartB ? 'Part B' : 'Part A'}
              </span>
            </div>
            <span className="text-[10px] font-serif tracking-widest text-studio-500 uppercase -mt-0.5">
              Fashion Portfolio Presentation
            </span>
          </Link>

          {/* Desktop Navigation Links — 5 Part A Sub-Categories + Prominent Part B Link */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {/* 5 Part A Categories */}
            {CATEGORIES.map((cat) => {
              const isActive = location.pathname === cat.path;
              return (
                <NavLink
                  key={cat.id}
                  to={cat.path}
                  className={({ isActive }) =>
                    `group relative px-2.5 xl:px-3 py-2 text-xs uppercase tracking-editorial transition-all duration-200 font-medium rounded-lg flex items-center gap-1 ${
                      isActive
                        ? 'text-burgundy-950 bg-white shadow-soft font-semibold border border-studio-200/90'
                        : 'text-studio-700 hover:text-burgundy-900 hover:bg-studio-100/70'
                    }`
                  }
                >
                  <span
                    className={`text-[10px] font-mono transition-colors ${
                      isActive
                        ? 'text-burgundy-700 font-bold'
                        : 'text-studio-400 group-hover:text-burgundy-600'
                    }`}
                  >
                    {cat.slideNumber}
                  </span>
                  <span className="truncate max-w-[110px] xl:max-w-none">{cat.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-burgundy-900 rounded-full" />
                  )}
                </NavLink>
              );
            })}

            {/* Divider */}
            <div className="h-6 w-[1px] bg-studio-300 mx-1 xl:mx-2" />

            {/* PROMINENT TOP-LEVEL LINK FOR PART B */}
            <NavLink
              to="/part-b"
              className={({ isActive }) =>
                `group relative px-3 xl:px-4 py-2 text-xs uppercase tracking-editorial font-bold rounded-xl flex items-center gap-1.5 transition-all duration-200 shadow-sm ${
                  isActive
                    ? 'bg-burgundy-900 text-white ring-2 ring-burgundy-900/30 shadow-md'
                    : 'bg-white hover:bg-burgundy-50 text-burgundy-900 border border-burgundy-200/80 hover:border-burgundy-300 hover:shadow-soft'
                }`
              }
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>Part B</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isPartB ? 'bg-white/20 text-white' : 'bg-burgundy-100 text-burgundy-800'
              }`}>
                23p
              </span>
              {isPartB && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
              )}
            </NavLink>
          </nav>

          {/* Slide Indicator Badge */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="glass-card px-3 py-1.5 rounded-full text-xs font-mono text-studio-600 flex items-center gap-2 border border-studio-200/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {isPartB ? (
                <span>Part B • 23 Slides</span>
              ) : (
                <span>
                  Slide {currentCategory?.slideNumber || '01'} / 05
                </span>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-studio-800 hover:bg-studio-100 border border-studio-200/80 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-studio-200 bg-studio-50/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          {/* Prominent Mobile Link for Part B */}
          <div className="p-1 bg-burgundy-50 rounded-2xl border border-burgundy-200">
            <NavLink
              to="/part-b"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-burgundy-900 text-white shadow-md'
                    : 'text-burgundy-950 hover:bg-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <ScrollText className="w-4 h-4 text-burgundy-700" />
                <span>Part B — 23-Page Continuous Portfolio</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/20">23 Slides</span>
            </NavLink>
          </div>

          <div className="px-3 py-1 text-[11px] font-mono font-semibold text-studio-400 uppercase tracking-widest">
            Part A — 5 Sub-Categories
          </div>

          {CATEGORIES.map((cat) => (
            <NavLink
              key={cat.id}
              to={cat.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-burgundy-900 text-white shadow-md'
                    : 'text-studio-800 hover:bg-studio-100'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono opacity-70">Slide {cat.slideNumber}</span>
                <span>{cat.title}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-60" />
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};
