import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Layers,
  Sparkles,
  Eye,
  RotateCcw
} from 'lucide-react';

export const SlideCarousel = ({ category }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Exact 5 slides as requested
  const totalSlides = 5;
  const currentSlideInfo = category.slides.find((s) => s.number === currentSlide) || category.slides[0];

  // Map to src/assets/[category-name]/slide-[1-5].png as required by the user prompt
  const getSlideSrc = (slideNum) => {
    return `/src/assets/${category.slug}/slide-${slideNum}.png`;
  };

  const nextSlide = useCallback(() => {
    setImageLoaded(false);
    setZoomLevel(1);
    setCurrentSlide((prev) => (prev === totalSlides ? 1 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setImageLoaded(false);
    setZoomLevel(1);
    setCurrentSlide((prev) => (prev === 1 ? totalSlides : prev - 1));
  }, [totalSlides]);

  const goToSlide = (slideNum) => {
    if (slideNum !== currentSlide) {
      setImageLoaded(false);
      setZoomLevel(1);
      setCurrentSlide(slideNum);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isFullscreen]);

  // Autoplay functionality
  useEffect(() => {
    let interval = null;
    if (isPlaying && viewMode === 'carousel') {
      interval = setInterval(() => {
        nextSlide();
      }, 4500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, nextSlide, viewMode]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setZoomLevel(1);
  };

  return (
    <div className="space-y-6" ref={carouselRef}>
      {/* Top Toolbar: View switcher, autoplay, and slide indicators */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/60 p-3 rounded-2xl border border-studio-200/80 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-studio-500 font-medium">
            Slide <strong className="text-burgundy-900 font-bold">{String(currentSlide).padStart(2, '0')}</strong> / 05
          </span>

          {/* Mini progress indicator */}
          <div className="w-24 sm:w-36 h-1.5 bg-studio-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-burgundy-900 transition-all duration-300 rounded-full"
              style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Autoplay button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isPlaying
                ? 'bg-burgundy-900 text-white shadow-sm'
                : 'bg-studio-100 text-studio-700 hover:bg-studio-200'
            }`}
            title={isPlaying ? 'Pause auto-slide' : 'Auto-play slides'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlaying ? 'Playing' : 'Autoplay'}</span>
          </button>

          {/* View Mode Toggle: Carousel vs All 5 Grid */}
          <div className="inline-flex rounded-lg border border-studio-200 bg-studio-100 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('carousel')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'carousel'
                  ? 'bg-white text-burgundy-900 shadow-sm font-semibold'
                  : 'text-studio-600 hover:text-studio-900'
              }`}
            >
              Stage View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white text-burgundy-900 shadow-sm font-semibold'
                  : 'text-studio-600 hover:text-studio-900'
              }`}
            >
              <Grid className="w-3 h-3" />
              <span>All 5 Grid</span>
            </button>
          </div>

          {/* Fullscreen Modal trigger */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-studio-700 hover:bg-studio-100 border border-studio-200 transition-colors"
            title="Expand Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Presentation Stage (ViewMode: Carousel) */}
      {viewMode === 'carousel' ? (
        <div className="space-y-4">
          <div
            className="relative group bg-studio-100/90 rounded-3xl border border-studio-200/90 overflow-hidden shadow-luxury flex items-center justify-center min-h-[460px] sm:min-h-[580px] lg:min-h-[680px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background Texture & Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-white/40 to-transparent pointer-events-none" />

            {/* Slide Image Container */}
            <div className="relative w-full h-full p-3 sm:p-6 flex items-center justify-center">
              <img
                src={getSlideSrc(currentSlide)}
                alt={`${category.title} - Slide ${currentSlide}`}
                onLoad={() => setImageLoaded(true)}
                className={`max-w-full max-h-[78vh] object-contain rounded-xl shadow-md transition-all duration-300 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
                }`}
                style={{ transform: `scale(${zoomLevel})` }}
              />

              {/* Loading Placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-studio-100/70">
                  <div className="w-10 h-10 border-3 border-burgundy-200 border-t-burgundy-800 rounded-full animate-spin" />
                  <span className="text-xs font-mono tracking-widest text-studio-500 uppercase">
                    Loading Slide {currentSlide} / 05...
                  </span>
                </div>
              )}
            </div>

            {/* Floating Navigation Arrows */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/90 hover:bg-white text-studio-900 shadow-floating border border-studio-200/80 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none z-10"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-950" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/90 hover:bg-white text-studio-900 shadow-floating border border-studio-200/80 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none z-10"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-950" />
            </button>

            {/* Bottom Floating Metadata Pill */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card px-4 py-2 rounded-full shadow-soft flex items-center gap-3 pointer-events-auto">
              <span className="text-[11px] font-mono font-semibold text-burgundy-900 uppercase">
                Slide {currentSlide} of 5
              </span>
              <span className="text-studio-300">|</span>
              <span className="text-xs text-studio-700 font-medium truncate max-w-[220px] sm:max-w-[400px]">
                {currentSlideInfo.title}
              </span>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="text-studio-500 hover:text-burgundy-800 transition-colors ml-1"
                title="View Full Resolution"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Current Slide Info Card */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-studio-200/70 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-burgundy-900 text-white">
                  0{currentSlide}
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-medium text-studio-950">
                  {currentSlideInfo.title}
                </h2>
              </div>
              <span className="text-xs font-mono text-studio-400">
                src/assets/{category.slug}/slide-{currentSlide}.png
              </span>
            </div>

            <p className="text-sm text-studio-700 font-serif leading-relaxed">
              {currentSlideInfo.description}
            </p>

            {currentSlideInfo.highlights && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-studio-400">
                  Slide Callouts:
                </span>
                {currentSlideInfo.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-studio-100 text-studio-800 text-xs border border-studio-200"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-burgundy-700" />
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 5-Slide Thumbnail Navigation Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-studio-500 px-1">
              <span className="uppercase tracking-widest text-[11px]">Canva Slide Thumbnails (1 to 5)</span>
              <span>Click any thumbnail to jump</span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {[1, 2, 3, 4, 5].map((num) => {
                const isActive = num === currentSlide;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => goToSlide(num)}
                    className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 text-left bg-white aspect-[3/4] sm:aspect-[4/3] flex flex-col ${
                      isActive
                        ? 'border-burgundy-900 shadow-glow ring-2 ring-burgundy-900/20 scale-[1.02]'
                        : 'border-studio-200 hover:border-burgundy-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="relative w-full h-full flex items-center justify-center p-1 bg-studio-50 overflow-hidden">
                      <img
                        src={getSlideSrc(num)}
                        alt={`Thumbnail Slide ${num}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-studio-950/80 text-white font-mono text-[10px] font-semibold">
                        0{num}
                      </span>
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-burgundy-900 pointer-events-none rounded-xl" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* View Mode: All 5 Slides Grid / Gallery Mode */
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((num) => {
              const slide = category.slides.find((s) => s.number === num) || {};
              return (
                <div
                  key={num}
                  className="glass-card rounded-2xl overflow-hidden border border-studio-200 shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col group"
                >
                  <div className="p-3 bg-studio-100/80 border-b border-studio-200 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-burgundy-900 text-white">
                      SLIDE 0{num}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        goToSlide(num);
                        setViewMode('carousel');
                      }}
                      className="text-xs text-burgundy-800 hover:text-burgundy-950 font-medium inline-flex items-center gap-1"
                    >
                      <span>Open in Stage</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3 bg-studio-50 flex items-center justify-center min-h-[300px]">
                    <img
                      src={getSlideSrc(num)}
                      alt={`${category.title} Slide ${num}`}
                      className="max-h-[360px] object-contain rounded-lg shadow-sm group-hover:scale-[1.02] transition-transform"
                    />
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h3 className="font-serif text-base font-semibold text-studio-950">
                        {slide.title}
                      </h3>
                      <p className="text-xs text-studio-600 font-serif line-clamp-2 mt-1">
                        {slide.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-studio-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-studio-400 truncate">
                        slide-{num}.png
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          goToSlide(num);
                          setIsFullscreen(true);
                        }}
                        className="p-1 rounded text-studio-600 hover:text-burgundy-900 hover:bg-studio-100"
                        title="Inspect Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fullscreen High-Res Modal / Lightbox */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-studio-950/95 backdrop-blur-2xl flex flex-col animate-fade-in text-white">
          {/* Modal Top Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/30">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-burgundy-700 text-white font-mono text-xs font-semibold">
                0{currentSlide} / 05
              </span>
              <span className="font-serif text-lg font-medium text-white/95">
                {currentSlideInfo.title}
              </span>
              <span className="text-xs text-white/50 font-mono hidden md:inline">
                ({category.title})
              </span>
            </div>

            {/* Modal Controls */}
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
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-lg bg-burgundy-800 hover:bg-burgundy-700 transition-colors"
                title="Close Fullscreen"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Main Stage */}
          <div className="flex-1 relative flex items-center justify-center p-4 overflow-auto">
            <img
              src={getSlideSrc(currentSlide)}
              alt={`${category.title} High-Res Slide ${currentSlide}`}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            />

            {/* Large Navigation arrows */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Modal Bottom Thumbnail Strip */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-center gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => goToSlide(num)}
                className={`relative rounded-lg overflow-hidden border-2 w-16 h-12 transition-all ${
                  num === currentSlide
                    ? 'border-burgundy-500 scale-105 shadow-glow'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={getSlideSrc(num)}
                  alt={`Slide ${num}`}
                  className="w-full h-full object-contain bg-white/5"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
