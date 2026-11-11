import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, getSlideAssetUrl } from '../data/categories';
import { Sparkles, ArrowRight, Layers, ExternalLink } from 'lucide-react';

export const AllSetsPage = () => {
  return (
    <div className="min-h-screen pb-20 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <div className="space-y-4 mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-burgundy-900 font-semibold px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200">
          Master Portfolio Board
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-studio-950">
          All 5 Apparel Sub-Categories
        </h1>
        <p className="text-sm font-serif text-studio-600 leading-relaxed">
          Comprehensive review across intimate apparel, athletic wear, luxury loungewear,
          support engineering, and multiway solution garments.
        </p>
      </div>

      <div className="space-y-16">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-studio-200/90 shadow-soft space-y-6"
          >
            {/* Category Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-studio-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-burgundy-900 text-white">
                    CATEGORY {cat.number}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-studio-400">
                    {cat.subtitle}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-medium text-studio-950 mt-1">
                  {cat.title}
                </h2>
              </div>

              <Link
                to={`/category/${cat.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-burgundy-900 hover:bg-burgundy-800 text-white text-xs font-medium transition-all shadow-sm"
              >
                <span>Open Dedicated Carousel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 5 Slides Strip for this Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((num) => {
                const slide = cat.slides.find((s) => s.number === num) || {};
                return (
                  <Link
                    key={num}
                    to={`/category/${cat.slug}`}
                    className="group bg-studio-50/80 hover:bg-white rounded-2xl overflow-hidden border border-studio-200/70 p-3 space-y-2.5 transition-all duration-200 hover:shadow-luxury hover:-translate-y-1 block"
                  >
                    <div className="relative aspect-[3/4] bg-white rounded-xl overflow-hidden border border-studio-200/60 flex items-center justify-center p-2">
                      <img
                        src={getSlideAssetUrl(cat.slug, num)}
                        alt={`${cat.title} Slide ${num}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-studio-950/80 text-white font-mono text-[9px] font-bold">
                        0{num}
                      </span>
                    </div>

                    <div>
                      <div className="text-[11px] font-serif font-semibold text-studio-950 group-hover:text-burgundy-900 transition-colors line-clamp-1">
                        {slide.title}
                      </div>
                      <div className="text-[10px] text-studio-500 font-serif line-clamp-2 mt-0.5">
                        {slide.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
