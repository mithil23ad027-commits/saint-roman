import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, getSlideAssetUrl } from '../data/categories';
import { Sparkles, ArrowRight, Layers, CheckCircle2, Sliders, ExternalLink, ShieldCheck } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      {/* Studio Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-studio-200/80 bg-gradient-to-b from-studio-100/70 via-studio-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-burgundy-900/10 text-burgundy-900 text-xs font-mono font-semibold tracking-widest uppercase border border-burgundy-900/15">
              <Sparkles className="w-3.5 h-3.5 text-burgundy-800" />
              <span>Saint Roman Portfolio • Part A</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-studio-950 tracking-tight leading-[1.1]">
              Intimate Apparel & <br />
              <span className="italic font-light text-burgundy-900">
                Design Studio Presentation
              </span>
            </h1>

            <p className="text-base sm:text-lg text-studio-700 font-serif leading-relaxed max-w-2xl">
              A comprehensive technical and aesthetic exploration of ergonomic innerwear,
              high-impact activewear, luxury silk loungewear, and convertible multiway solutions
              structured across 5 distinct categories.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/category/everyday-ergonomic"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-800 text-white font-medium text-sm shadow-luxury hover:shadow-floating transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Launch Presentation (Category 01)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#all-categories"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-studio-100 text-studio-800 font-medium text-sm border border-studio-200/90 shadow-soft transition-all"
              >
                <Layers className="w-4 h-4 text-burgundy-700" />
                <span>Explore All 5 Categories</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Distinct Categories Showcase Grid */}
      <section id="all-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-burgundy-900">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-studio-950 mt-1">
              5 Distinct Apparel Sub-Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-studio-500 font-mono">
            Each category features 5 high-resolution presentation slides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group glass-card rounded-3xl overflow-hidden border border-studio-200/90 shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 bg-white/90"
            >
              <div>
                {/* Category Card Header Image / Slide Preview */}
                <div className="relative aspect-[16/10] bg-studio-100 overflow-hidden flex items-center justify-center p-3 border-b border-studio-100">
                  <img
                    src={getSlideAssetUrl(cat.slug, 1)}
                    alt={cat.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg shadow-xs"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-studio-950/85 text-white font-mono text-[11px] font-bold backdrop-blur-md">
                    {cat.number} / 05
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 text-burgundy-900 font-mono text-[10px] font-semibold shadow-xs">
                    5 Slides
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-burgundy-800 font-semibold block">
                    {cat.subtitle}
                  </span>

                  <h3 className="text-lg font-serif font-semibold text-studio-950 group-hover:text-burgundy-900 transition-colors leading-snug">
                    {cat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-studio-600 font-serif line-clamp-3 leading-relaxed">
                    {cat.concept}
                  </p>

                  {/* Palette preview */}
                  <div className="flex items-center gap-1.5 pt-2">
                    <span className="text-[10px] font-mono uppercase text-studio-400 mr-1">
                      Palette:
                    </span>
                    {cat.palette.slice(0, 5).map((color, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} (${color.hex})`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <Link
                  to={`/category/${cat.slug}`}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-studio-100 hover:bg-burgundy-900 text-studio-800 hover:text-white font-medium text-xs transition-all duration-200 group-hover:border-transparent border border-studio-200"
                >
                  <span className="font-sans">View Presentation Carousel</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Scaffolding Specification Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="glass-card p-8 rounded-3xl border border-studio-200/90 shadow-soft bg-gradient-to-br from-white via-studio-50/50 to-studio-100/30">
          <div className="flex items-center gap-2 text-xs font-mono text-burgundy-900 font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-burgundy-800" />
            <span>Architecture & Scaffold Checklist</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-studio-950 mb-6">
            Technical Implementation Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-studio-700">
            <div className="p-4 rounded-2xl bg-white border border-studio-200 space-y-2">
              <div className="font-semibold text-studio-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>React Router v7 Routing</span>
              </div>
              <p className="text-studio-600 font-serif">
                Dedicated page layout for all 5 sub-categories with clean URL parameters (`/category/:categorySlug`) and slug validation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-studio-200 space-y-2">
              <div className="font-semibold text-studio-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Exact 5-Slide Carousel</span>
              </div>
              <p className="text-studio-600 font-serif">
                Responsive slide stage, auto-play mode, 5-thumbnail navigation rail, touch-swipe gestures, and fullscreen inspection.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-studio-200 space-y-2">
              <div className="font-semibold text-studio-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mapped Canva Assets</span>
              </div>
              <p className="text-studio-600 font-serif">
                Mapped cleanly to `src/assets/[category]/slide-[1-5].png` and mirrored in `part-A-assets/` for zero-configuration rendering.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
