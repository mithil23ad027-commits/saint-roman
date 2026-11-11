import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { Menu, X, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      {/* Top Studio Micro-bar */}
      <div className="border-b border-studio-200/60 bg-studio-100/50 text-[11px] uppercase tracking-widest-luxury text-studio-600 py-1.5 px-4 sm:px-8 flex justify-between items-center">
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3 h-3 text-burgundy-700" />
          <span>Saint Roman • Joshna Christa S B</span>
        </span>
        <span className="hidden md:inline font-light text-studio-500">
          Haute Intimate Apparel & Activewear Studio
        </span>
        <span className="text-burgundy-900 font-semibold tracking-widest font-mono text-[10px]">
          5 Collections • 5 Slides
        </span>
      </div>

      {/* Main Sticky Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/everyday-basics"
            className="group flex flex-col items-start focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl tracking-widest text-studio-950 group-hover:text-burgundy-900 transition-colors">
                SAINT ROMAN
              </span>
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-burgundy-900 text-white shadow-xs">
                Studio
              </span>
            </div>
            <span className="text-[10px] font-serif tracking-widest text-studio-500 uppercase -mt-0.5">
              Fashion Portfolio Presentation
            </span>
          </Link>

          {/* Desktop Navigation Links — The 5 Exact Category Routes */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {CATEGORIES.map((cat) => {
              const isActive = location.pathname === cat.path;
              return (
                <NavLink
                  key={cat.id}
                  to={cat.path}
                  className={({ isActive }) =>
                    `group relative px-3 py-2 text-xs uppercase tracking-editorial transition-all duration-200 font-medium rounded-lg flex items-center gap-1.5 ${
                      isActive
                        ? 'text-burgundy-950 bg-white shadow-soft font-semibold border border-studio-200/90'
                        : 'text-studio-700 hover:text-burgundy-900 hover:bg-studio-100/70'
                    }`
                  }
                >
                  <span className={`text-[10px] font-mono transition-colors ${
                    isActive ? 'text-burgundy-700 font-bold' : 'text-studio-400 group-hover:text-burgundy-600'
                  }`}>
                    {cat.slideNumber}
                  </span>
                  <span>{cat.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-burgundy-900 rounded-full" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Slide Indicator Badge */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="glass-card px-3 py-1.5 rounded-full text-xs font-mono text-studio-600 flex items-center gap-2 border border-studio-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {CATEGORIES.find((c) => c.path === location.pathname)?.slideNumber || '01'} / 05
              </span>
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
        <div className="lg:hidden border-b border-studio-200 bg-studio-50/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          <div className="px-3 py-1 text-[11px] font-mono font-semibold text-studio-400 uppercase tracking-widest">
            Portfolio Categories
          </div>
          {CATEGORIES.map((cat) => (
            <NavLink
              key={cat.id}
              to={cat.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
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
