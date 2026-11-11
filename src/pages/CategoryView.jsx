import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import {
  Sparkles,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Info,
  Palette,
  CheckCircle2,
  Layers,
  Scissors
} from 'lucide-react';

export const CategoryView = ({ category }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentIndex = CATEGORIES.findIndex((c) => c.id === category.id);
  const prevCategory =
    currentIndex > 0 ? CATEGORIES[currentIndex - 1] : CATEGORIES[CATEGORIES.length - 1];
  const nextCategory =
    currentIndex < CATEGORIES.length - 1 ? CATEGORIES[currentIndex + 1] : CATEGORIES[0];

  // Reset zoom on slide change
  useEffect(() => {
    setImageLoaded(false);
    setZoomLevel(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category.id]);

  // Keyboard navigation between categories
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      {/* Category Navigation Pills Strip */}
      <div className="border-b border-studio-200/70 bg-studio-100/40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            <span className="text-[11px] font-mono uppercase text-studio-400 tracking-wider flex-shrink-0 mr-1">
              Select Category:
            </span>
            {CATEGORIES.map((c) => (
              <NavLink
                key={c.id}
                to={c.path}
                className={({ isActive }) =>
                  `flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 border ${
                    isActive
                      ? 'bg-burgundy-900 text-white border-burgundy-900 shadow-sm font-semibold'
                      : 'bg-white text-studio-700 hover:bg-studio-100 border-studio-200 hover:border-studio-300'
                  }`
                }
              >
                <span className="font-mono text-[10px] opacity-75">{c.slideNumber}</span>
                <span>{c.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Category Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-studio-200/80 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-100/70 text-burgundy-950 text-xs font-mono font-bold tracking-wider uppercase border border-burgundy-200/60">
                <Sparkles className="w-3.5 h-3.5 text-burgundy-800" />
                Category {category.slideNumber} of 05 • Page {category.pageNumber}
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

          {/* Right Header Toolbar: Palette & Actions */}
          <div className="flex flex-wrap items-center gap-3 lg:self-end">
            {/* Color Palette Dots */}
            {category.palette && (
              <div className="glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-soft">
                <Palette className="w-3.5 h-3.5 text-studio-400" />
                <div className="flex items-center gap-1.5">
                  {category.palette.map((color, idx) => (
                    <div key={idx} className="group relative">
                      <div
                        className="w-5 h-5 rounded-full border border-black/15 shadow-xs transition-transform group-hover:scale-125 cursor-pointer"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} (${color.hex})`}
                      />
                      <span className="pointer-events-none absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-studio-950 text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 font-mono">
                        {color.name} {color.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Toggle Details */}
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-medium text-studio-800 bg-white hover:bg-studio-100 border border-studio-200/80 shadow-soft transition-all"
            >
              <Info className="w-3.5 h-3.5 text-burgundy-700" />
              <span>{showDetails ? 'Hide Notes' : 'Design Notes'}</span>
            </button>

            {/* Fullscreen Trigger */}
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-medium text-white bg-burgundy-900 hover:bg-burgundy-800 shadow-soft transition-all"
              title="Inspect Full Resolution"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Collapsible Design & Spec Notes */}
        {showDetails && (
          <div className="glass-card p-6 rounded-3xl border border-studio-200/80 shadow-soft grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-burgundy-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Concept & Philosophy
              </h3>
              <p className="text-sm font-serif text-studio-700 leading-relaxed">
                {category.concept}
              </p>
              <p className="text-xs font-serif text-studio-600 leading-relaxed">
                {category.story}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-burgundy-900 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                Fabrication & Construction Callouts
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.materials?.map((m, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-studio-100 text-studio-900 text-xs font-mono border border-studio-200"
                  >
                    <strong>{m.name}:</strong> {m.spec}
                  </span>
                ))}
              </div>
              <ul className="space-y-1 text-xs font-serif text-studio-700 pt-1">
                {category.features?.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-burgundy-700 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* PROMINENT SLIDE DISPLAY CONTAINER (Step 3: w-full h-auto max-w-5xl mx-auto shadow-lg) */}
        <section className="relative">
          <div className="w-full h-auto max-w-5xl mx-auto shadow-lg rounded-2xl overflow-hidden border border-studio-200/90 bg-white transition-all duration-300 hover:shadow-2xl">
            {/* Top Image Stage Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 bg-studio-100/70 border-b border-studio-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-burgundy-900 text-white text-[11px]">
                  PAGE {category.pageNumber}
                </span>
                <span className="font-serif font-medium text-studio-800 hidden sm:inline">
                  {category.title}
                </span>
              </div>

              <div className="flex items-center gap-3 text-studio-500 font-mono text-[11px]">
                <span className="hidden md:inline">src/assets/{category.imageFilename}</span>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  className="inline-flex items-center gap-1 text-burgundy-800 hover:text-burgundy-950 font-medium font-sans"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>
            </div>

            {/* Slide Presentation Image */}
            <div className="relative p-2 sm:p-4 bg-studio-50/50 flex items-center justify-center min-h-[500px]">
              <img
                src={category.image}
                alt={`${category.title} - Slide ${category.pageNumber}`}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-auto max-w-5xl mx-auto rounded-xl transition-all duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
              />

              {!imageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-studio-50">
                  <div className="w-10 h-10 border-3 border-burgundy-200 border-t-burgundy-900 rounded-full animate-spin" />
                  <span className="text-xs font-mono tracking-widest text-studio-500 uppercase">
                    Loading Slide {category.pageNumber} / 05...
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Image Caption Bar */}
            <div className="px-6 py-4 bg-white border-t border-studio-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-mono text-studio-400 uppercase tracking-widest text-[10px] block">
                  Collection Asset
                </span>
                <span className="font-serif font-medium text-studio-900 text-sm">
                  {category.subtitle}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={category.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-studio-100 hover:bg-studio-200 text-studio-800 font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Raw File</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-burgundy-900 hover:bg-burgundy-800 text-white font-medium transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Zoom / Fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Previous / Next Category Navigation */}
        <nav aria-label="Category Navigation" className="pt-6 border-t border-studio-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to={prevCategory.path}
              className="group glass-card p-4 sm:p-5 rounded-2xl hover:bg-white hover:border-burgundy-300 transition-all flex items-center justify-between shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-studio-100 group-hover:bg-burgundy-900 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-studio-400 block">
                    Previous Category ({prevCategory.slideNumber})
                  </span>
                  <span className="text-sm font-serif font-medium text-studio-950 group-hover:text-burgundy-900 transition-colors">
                    {prevCategory.label}
                  </span>
                </div>
              </div>
            </Link>

            <Link
              to={nextCategory.path}
              className="group glass-card p-4 sm:p-5 rounded-2xl hover:bg-white hover:border-burgundy-300 transition-all flex items-center justify-between text-right shadow-soft"
            >
              <div className="flex items-center justify-between w-full">
                <div className="text-left">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-studio-400 block">
                    Next Category ({nextCategory.slideNumber})
                  </span>
                  <span className="text-sm font-serif font-medium text-studio-950 group-hover:text-burgundy-900 transition-colors">
                    {nextCategory.label}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-studio-100 group-hover:bg-burgundy-900 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        </nav>
      </main>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-studio-950/95 backdrop-blur-2xl flex flex-col animate-fade-in text-white">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded bg-burgundy-700 text-white font-mono text-xs font-semibold">
                Page {category.pageNumber} / 05
              </span>
              <span className="font-serif text-lg font-medium text-white/95">
                {category.title}
              </span>
              <span className="text-xs text-white/50 font-mono hidden md:inline">
                ({category.imageFilename})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFullscreen(false);
                  setZoomLevel(1);
                }}
                className="p-2 rounded-lg bg-burgundy-800 hover:bg-burgundy-700 transition-colors"
                title="Close"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Main Stage with Scroll & Zoom */}
          <div className="flex-1 relative overflow-auto p-4 flex items-center justify-center">
            <img
              src={category.image}
              alt={category.title}
              className="max-w-none transition-transform duration-200 shadow-2xl rounded-lg"
              style={{
                width: `${zoomLevel * 100}%`,
                maxWidth: zoomLevel <= 1 ? '100%' : 'none',
              }}
            />
          </div>

          {/* Modal Bottom Strip */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-white/60">
            <span>Use mouse wheel or zoom buttons to inspect technical callouts</span>
            <span className="font-mono">Zoom: {Math.round(zoomLevel * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};
