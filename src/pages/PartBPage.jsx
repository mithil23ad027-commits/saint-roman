import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PART_B_SLIDES } from '../data/partB';
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowUp,
  ChevronDown,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export const PartBPage = () => {
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for back-to-top button and progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }

      if (currentScroll > 600) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedSlide) return;
      if (e.key === 'Escape') {
        setSelectedSlide(null);
        setZoomLevel(1);
      } else if (e.key === 'ArrowRight') {
        setSelectedSlide((prev) => (prev < 23 ? prev + 1 : 1));
        setZoomLevel(1);
      } else if (e.key === 'ArrowLeft') {
        setSelectedSlide((prev) => (prev > 1 ? prev - 1 : 23));
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSlide]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSlide = (slideNum) => {
    const element = document.getElementById(`slide-${slideNum}`);
    if (element) {
      const navbarOffset = 76; // 64px global header + 12px margin
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarOffset,
        behavior: 'smooth',
      });
    }
  };

  const currentModalSlide = selectedSlide
    ? PART_B_SLIDES.find((s) => s.number === selectedSlide)
    : null;

  return (
    <div className="min-h-screen pb-24 animate-fade-in bg-studio-50">
      {/* Scroll Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-studio-200/80 z-40">
        <div
          className="h-full bg-burgundy-900 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Part B Header: Clean, minimal title with quick jump */}
      <section className="border-b border-studio-200/80 bg-studio-100/50 pt-8 pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-studio-950 tracking-tight">
              Saint Roman Comprehensive Portfolio
            </h1>
            <p className="text-xs sm:text-sm font-serif text-studio-600 mt-1">
              23 Pages • Continuous Presentation Deck
            </p>
          </div>

          {/* Quick Jump Dropdown */}
          <div className="relative group self-start sm:self-auto">
            <select
              onChange={(e) => scrollToSlide(Number(e.target.value))}
              defaultValue=""
              aria-label="Jump directly to a slide in the Part B presentation"
              className="appearance-none glass-card pl-4 pr-10 py-2 rounded-xl text-xs font-mono font-medium text-studio-800 bg-white hover:bg-studio-100 border border-studio-200/90 shadow-soft cursor-pointer focus:outline-none focus:ring-2 focus:ring-burgundy-900"
            >
              <option value="" disabled>
                Jump to Slide (1 - 23)...
              </option>
              {PART_B_SLIDES.map((slide) => (
                <option key={slide.number} value={slide.number}>
                  Page {slide.formattedNumber} of 23
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-studio-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* CONTINUOUS SCROLL COLUMN: 23 SLIDES SEQUENTIALLY FROM TOP TO BOTTOM */}
      <main className="flex flex-col gap-8 md:gap-16 items-center w-full max-w-5xl mx-auto py-10 px-4 sm:px-6">
        {PART_B_SLIDES.map((slide) => (
          <article
            key={slide.number}
            id={`slide-${slide.number}`}
            className="w-full h-auto max-w-5xl rounded-2xl overflow-hidden border border-studio-200/90 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            {/* Top Slide Header Bar */}
            <header className="flex items-center justify-between px-5 py-3 bg-studio-100/70 border-b border-studio-200 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold px-2.5 py-0.5 rounded bg-burgundy-900 text-white text-[11px] shadow-xs">
                  PAGE {slide.formattedNumber}
                </span>
                <span className="font-serif font-medium text-studio-800">
                  Saint Roman Presentation
                </span>
                <span className="text-studio-400 font-mono text-[11px] hidden sm:inline">
                  • 0{slide.number} / 23
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden md:inline font-mono text-[11px] text-studio-400">
                  src/assets/part-b/slide-{slide.number}.png
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSlide(slide.number);
                    setZoomLevel(1);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-studio-700 hover:text-burgundy-950 bg-white hover:bg-studio-100 border border-studio-200/80 transition-all shadow-xs"
                  title="Inspect Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-burgundy-800" />
                  <span>Inspect</span>
                </button>
              </div>
            </header>

            {/* Slide Presentation Image Container */}
            <div className="relative p-2 sm:p-4 bg-studio-50/40 flex items-center justify-center">
              <img
                src={slide.src}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain block rounded-xl shadow-xs group-hover:scale-[1.005] transition-transform duration-300 cursor-zoom-in"
                onClick={() => {
                  setSelectedSlide(slide.number);
                  setZoomLevel(1);
                }}
              />
            </div>

            {/* Bottom Caption Bar */}
            <footer className="px-5 py-3 bg-white border-t border-studio-200/70 flex items-center justify-between text-xs text-studio-600">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy-800" />
                <span className="font-mono text-[11px]">
                  Slide {slide.formattedNumber} of 23
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={slide.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-studio-500 hover:text-burgundy-900 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open Image</span>
                </a>
              </div>
            </footer>
          </article>
        ))}

        {/* End of Presentation Banner */}
        <div className="w-full text-center py-12 border-t border-studio-200/80 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-studio-200/80 text-studio-700 text-xs font-mono">
            <span>✓ All 23 Pages Completed</span>
          </div>
          <h2 className="text-2xl font-serif font-medium text-studio-950">
            End of Part B Presentation
          </h2>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-800 text-white font-medium text-xs shadow-soft transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
            <Link
              to="/everyday-basics"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-studio-100 text-studio-800 font-medium text-xs border border-studio-200 shadow-soft transition-all"
            >
              <span>Explore Part A (5 Sets)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3.5 rounded-full bg-burgundy-900 text-white shadow-floating hover:bg-burgundy-800 transition-all duration-200 hover:scale-110 active:scale-95 z-40 focus:outline-none"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Fullscreen High-Resolution Modal / Lightbox */}
      {selectedSlide && currentModalSlide && (
        <div className="fixed inset-0 z-50 bg-studio-950/95 backdrop-blur-2xl flex flex-col animate-fade-in text-white">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded bg-burgundy-700 text-white font-mono text-xs font-semibold">
                Page {currentModalSlide.formattedNumber} / 23
              </span>
              <span className="font-serif text-lg font-medium text-white/95">
                Saint Roman Part B Presentation
              </span>
              <span className="text-xs text-white/50 font-mono hidden md:inline">
                (slide-{currentModalSlide.number}.png)
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
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
                  setSelectedSlide(null);
                  setZoomLevel(1);
                }}
                className="p-2 rounded-lg bg-burgundy-800 hover:bg-burgundy-700 transition-colors"
                title="Close Lightbox"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Main Stage */}
          <div className="flex-1 relative overflow-auto p-4 flex items-center justify-center">
            <img
              src={currentModalSlide.src}
              alt={currentModalSlide.alt}
              className="max-w-none transition-transform duration-200 shadow-2xl rounded-lg"
              style={{
                width: `${zoomLevel * 100}%`,
                maxWidth: zoomLevel <= 1 ? '100%' : 'none',
              }}
            />
          </div>

          {/* Modal Footer Strip with Direct Jump */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-white/70">
            <button
              type="button"
              disabled={selectedSlide <= 1}
              onClick={() => {
                setSelectedSlide((s) => Math.max(s - 1, 1));
                setZoomLevel(1);
              }}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Previous Page
            </button>

            <span className="font-mono">
              Page {currentModalSlide.formattedNumber} of 23 • Zoom: {Math.round(zoomLevel * 100)}%
            </span>

            <button
              type="button"
              disabled={selectedSlide >= 23}
              onClick={() => {
                setSelectedSlide((s) => Math.min(s + 1, 23));
                setZoomLevel(1);
              }}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next Page →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
