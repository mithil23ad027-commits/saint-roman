import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { Sparkles, Layers, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-studio-200 bg-studio-100/60 pt-12 pb-8 text-studio-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-studio-200/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl tracking-widest text-studio-950 font-bold">
                SAINT ROMAN
              </span>
              <span className="text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded bg-burgundy-900 text-white">
                Portfolio
              </span>
            </div>
            <p className="text-xs sm:text-sm font-serif text-studio-600 max-w-md leading-relaxed">
              Design studio presentation for Saint Roman intimate apparel, activewear, and luxury loungewear.
              Engineered with modern frontend architecture for seamless slide navigation and high-definition review.
            </p>
            <div className="text-xs font-mono text-studio-500 pt-1">
              Design & Direction: <strong className="text-studio-900">Joshna Christa S B</strong>
            </div>
          </div>

          {/* Portfolio Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-burgundy-900 font-semibold">
              Portfolio Navigation
            </h4>
            <ul className="space-y-1.5 text-xs font-sans">
              <li className="pb-1 mb-1 border-b border-studio-200/80">
                <Link
                  to="/part-b"
                  className="text-burgundy-900 font-bold hover:underline flex items-center gap-1.5"
                >
                  <span className="font-mono text-[10px] px-1 rounded bg-burgundy-100 text-burgundy-900">NEW</span>
                  <span>Part B (10-Page Continuous)</span>
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={cat.path}
                    className="hover:text-burgundy-900 transition-colors flex items-center gap-1.5 py-0.5"
                  >
                    <span className="font-mono text-[10px] text-studio-400">{cat.slideNumber}</span>
                    <span className="truncate">{cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-burgundy-900 font-semibold">
              Technical Stack
            </h4>
            <div className="space-y-1.5 text-xs text-studio-600 font-serif">
              <div>• React 19 + Vite Frontend</div>
              <div>• React Router v7 Navigation</div>
              <div>• Tailwind CSS Luxury System</div>
              <div>• Mapped Canva Presentation PNGs</div>
              <div>• Mobile Responsive & Touch Gestures</div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-studio-500 font-serif">
          <div>
            © {new Date().getFullYear()} Saint Roman Studio • Portfolio Part A. All designs reserved.
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-burgundy-700 fill-burgundy-700" />
            <span>for Apparel Design Presentation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
