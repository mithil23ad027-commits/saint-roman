import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { Info, Sparkles, Layers, ChevronRight, Palette, Scissors } from 'lucide-react';

export const CategoryHeader = ({ category }) => {
  const [showStory, setShowStory] = useState(false);

  return (
    <div className="pt-6 pb-8 border-b border-studio-200/80 bg-gradient-to-b from-studio-100/40 to-transparent">
      {/* Category Pills Quick Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          <span className="text-[11px] font-mono uppercase text-studio-400 tracking-wider flex-shrink-0 mr-1">
            Browse Sets:
          </span>
          {CATEGORIES.map((c) => (
            <NavLink
              key={c.id}
              to={`/category/${c.slug}`}
              className={({ isActive }) =>
                `flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-burgundy-900 text-white border-burgundy-900 shadow-sm'
                    : 'bg-white/80 text-studio-700 hover:bg-studio-100 border-studio-200'
                }`
              }
            >
              <span className="font-mono text-[10px] opacity-75">{c.number}</span>
              <span>{c.shortTitle}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main Category Header Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-burgundy-100/70 text-burgundy-900 text-[11px] font-mono font-semibold tracking-wider uppercase border border-burgundy-200/50">
                <Sparkles className="w-3 h-3 text-burgundy-700" />
                Category {category.number} / 05
              </span>
              <span className="text-xs uppercase tracking-widest text-studio-500 font-medium">
                {category.subtitle}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-studio-950 tracking-tight leading-tight">
              {category.title}
            </h1>

            {category.tagline && (
              <p className="text-xs sm:text-sm font-serif italic text-studio-600 tracking-widest">
                {category.tagline}
              </p>
            )}
          </div>

          {/* Right side: Color Palette & Story Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:self-end">
            {/* Color Swatch Dots */}
            {category.palette && category.palette.length > 0 && (
              <div className="glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-soft">
                <Palette className="w-3.5 h-3.5 text-studio-400" />
                <div className="flex items-center gap-1.5">
                  {category.palette.map((color, idx) => (
                    <div
                      key={idx}
                      className="group relative"
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-125 cursor-pointer"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} (${color.hex})`}
                      />
                      <span className="pointer-events-none absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-studio-950 text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        {color.name} <span className="opacity-70 font-mono">{color.hex}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Toggle Story & Specs Button */}
            <button
              type="button"
              onClick={() => setShowStory(!showStory)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-medium text-studio-800 bg-white hover:bg-studio-100 border border-studio-200/80 shadow-soft transition-all"
            >
              <Info className="w-3.5 h-3.5 text-burgundy-700" />
              <span>{showStory ? 'Hide Studio Notes' : 'Story & Specifications'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Story & Concept Drawer */}
        {showStory && (
          <div className="mt-6 pt-6 border-t border-studio-200 grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up bg-white/70 p-6 rounded-2xl border shadow-soft">
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-burgundy-900 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Concept & Philosophy
              </h3>
              <p className="text-xs sm:text-sm text-studio-700 leading-relaxed font-serif">
                {category.concept}
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-burgundy-900 mb-2 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                Material Specs & Design Story
              </h3>
              <p className="text-xs sm:text-sm text-studio-700 leading-relaxed font-serif mb-3">
                {category.story}
              </p>
              {category.materials && (
                <div className="flex flex-wrap gap-2">
                  {category.materials.map((m, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-studio-100 text-studio-800 text-[11px] font-mono border border-studio-200"
                    >
                      <strong className="font-semibold">{m.name}:</strong> {m.spec}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
