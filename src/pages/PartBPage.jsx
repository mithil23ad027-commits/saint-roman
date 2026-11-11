import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PART_B_SLIDES } from '../data/partB';
import {
  ArrowUp,
  ChevronDown,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export const PartBPage = () => {
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
              {PART_B_SLIDES.length} Pages • Continuous Presentation Deck
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
                Jump to Page (1 - {PART_B_SLIDES.length})...
              </option>
              {PART_B_SLIDES.map((slide) => (
                <option key={slide.number} value={slide.number}>
                  Page {slide.number} of {PART_B_SLIDES.length}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-studio-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* CONTINUOUS SCROLL COLUMN: 10 SLIDES SEQUENTIALLY FROM TOP TO BOTTOM */}
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
                  PAGE {slide.number}
                </span>
                <span className="font-serif font-medium text-studio-800">
                  Saint Roman Presentation
                </span>
                <span className="text-studio-400 font-mono text-[11px] hidden sm:inline">
                  • Page {slide.number} of {PART_B_SLIDES.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden md:inline font-mono text-[11px] text-studio-400">
                  src/assets/part-b/slide-{slide.originalSlideNumber}.png
                </span>
              </div>
            </header>

            {/* Slide Presentation Image Container */}
            <div className="relative p-2 sm:p-4 bg-studio-50/40 flex items-center justify-center">
              <img
                src={slide.src}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain block rounded-xl shadow-xs group-hover:scale-[1.005] transition-transform duration-300"
              />
            </div>

            {/* Bottom Caption Bar */}
            <footer className="px-5 py-3 bg-white border-t border-studio-200/70 flex items-center justify-between text-xs text-studio-600">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy-800" />
                <span className="font-mono text-[11px]">
                  Page {slide.number} of {PART_B_SLIDES.length}
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
            <span>✓ All {PART_B_SLIDES.length} Pages Completed</span>
          </div>
          <h2 className="text-2xl font-serif font-medium text-studio-950">
            End of Part B Presentation
          </h2>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-800 text-white font-medium text-xs shadow-soft transition-all cursor-pointer"
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
          className="fixed bottom-6 right-6 p-3.5 rounded-full bg-burgundy-900 text-white shadow-floating hover:bg-burgundy-800 transition-all duration-200 hover:scale-110 active:scale-95 z-40 focus:outline-none cursor-pointer"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
