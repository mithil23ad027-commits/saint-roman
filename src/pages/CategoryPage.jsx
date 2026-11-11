import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { CategoryHeader } from '../components/CategoryHeader';
import { SlideCarousel } from '../components/SlideCarousel';
import { ArrowLeft, ArrowRight, Sparkles, Layers, BookOpen } from 'lucide-react';

export const CategoryPage = () => {
  const { categorySlug } = useParams();

  const categoryIndex = CATEGORIES.findIndex((c) => c.slug === categorySlug);
  const category = CATEGORIES[categoryIndex];

  // If slug not matched, redirect to first category
  if (!category) {
    return <Navigate to="/category/everyday-ergonomic" replace />;
  }

  const prevCategory =
    categoryIndex > 0 ? CATEGORIES[categoryIndex - 1] : CATEGORIES[CATEGORIES.length - 1];
  const nextCategory =
    categoryIndex < CATEGORIES.length - 1 ? CATEGORIES[categoryIndex + 1] : CATEGORIES[0];

  return (
    <div className="min-h-screen pb-16 animate-fade-in">
      {/* Category Hero / Header */}
      <CategoryHeader category={category} />

      {/* Main Slide Carousel Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        <SlideCarousel category={category} />

        {/* Category Quick Details / Spec Sheet Box */}
        <section className="glass-card p-6 sm:p-8 rounded-3xl border border-studio-200/90 shadow-soft">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-studio-200 pb-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-burgundy-900 font-semibold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Saint Roman Technical Specifications</span>
              </div>
              <h3 className="text-xl font-serif font-medium text-studio-950 mt-1">
                {category.title}
              </h3>
            </div>

            <span className="text-xs font-mono text-studio-500 bg-studio-100 px-3 py-1.5 rounded-full border border-studio-200">
              5 Dedicated Slides Loaded
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-studio-700">
            {/* Color Story */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-studio-400 font-semibold">
                Color Palette Breakdown
              </h4>
              <div className="space-y-2">
                {category.palette.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-mono bg-white/60 p-2 rounded-lg border border-studio-200/60">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-xs"
                        style={{ backgroundColor: p.hex }}
                      />
                      <span className="font-sans font-medium text-studio-900">{p.name}</span>
                    </div>
                    <span className="text-studio-500">{p.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fabric & Materials */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-studio-400 font-semibold">
                Fabrics & Construction
              </h4>
              <div className="space-y-2">
                {category.materials.map((m, idx) => (
                  <div key={idx} className="bg-white/60 p-3 rounded-lg border border-studio-200/60 space-y-1">
                    <div className="font-semibold text-xs text-studio-900">{m.name}</div>
                    <div className="text-xs font-mono text-burgundy-900">{m.spec}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design & Fit Philosophy */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-studio-400 font-semibold">
                Design Philosophy
              </h4>
              <div className="bg-white/60 p-4 rounded-lg border border-studio-200/60 text-xs sm:text-sm font-serif leading-relaxed text-studio-700">
                {category.concept}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Category-to-Category Navigation */}
        <nav aria-label="Category Navigation" className="pt-4 border-t border-studio-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to={`/category/${prevCategory.slug}`}
              className="group glass-card p-4 sm:p-5 rounded-2xl hover:bg-white hover:border-burgundy-300 transition-all flex items-center justify-between shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-studio-100 group-hover:bg-burgundy-900 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-studio-400 block">
                    Previous Category ({prevCategory.number})
                  </span>
                  <span className="text-sm font-serif font-medium text-studio-950 group-hover:text-burgundy-900 transition-colors">
                    {prevCategory.shortTitle}
                  </span>
                </div>
              </div>
            </Link>

            <Link
              to={`/category/${nextCategory.slug}`}
              className="group glass-card p-4 sm:p-5 rounded-2xl hover:bg-white hover:border-burgundy-300 transition-all flex items-center justify-between text-right shadow-soft"
            >
              <div className="flex items-center justify-between w-full">
                <div className="text-left">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-studio-400 block">
                    Next Category ({nextCategory.number})
                  </span>
                  <span className="text-sm font-serif font-medium text-studio-950 group-hover:text-burgundy-900 transition-colors">
                    {nextCategory.shortTitle}
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
    </div>
  );
};
