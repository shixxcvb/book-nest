import React from 'react';
import { ArrowRight, Compass, Bookmark, ShieldCheck, Sparkles, Feather } from 'lucide-react';
import { BOOKS_DATA } from '../data/books';
import { BookCover } from './BookCover';
import { formatPHP } from '../utils/formatters';
import { useBookstore } from '../context/BookstoreContext';

interface HeroProps {
  onExploreClick: () => void;
  onRecommendedClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onRecommendedClick }) => {
  const { setSelectedBook, addToCart } = useBookstore();
  // Hero spotlight book: Noli Me Tángere
  const spotlightBook = BOOKS_DATA.find((b) => b.id === 'noli-me-tangere') || BOOKS_DATA[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F1] via-[#FFFEFB] to-[#FFF9F1] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EADBCE]">
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4D5C5]/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A9B79F]/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9785B] bg-[#F4D5C5]/30 px-3 py-1 rounded-md border border-[#C9785B]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Literary Bookstore · Curated Editions</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3A2A25] tracking-tight leading-[1.12] text-balance">
              Your next favorite story starts here.
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#6B564E] leading-relaxed max-w-2xl">
              A thoughtfully curated sanctuary for Philippine literary treasures, timeless world classics, and quiet reading hours. Built with warm paper-inspired craftsmanship and seamless shopping for bibliophiles everywhere.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-[#C9785B] text-white font-medium text-sm rounded-lg hover:bg-[#B5674B] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 group active:scale-95"
              >
                <span>Explore Books</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onRecommendedClick}
                className="px-6 py-3.5 bg-[#FFFEFB] border border-[#EADBCE] text-[#3A2A25] font-medium text-sm rounded-lg hover:bg-[#FFF9F1] hover:border-[#C9785B]/60 transition-all duration-200 flex items-center gap-2 active:scale-95"
              >
                <Compass className="w-4 h-4 text-[#C9785B]" />
                <span>Curator’s Recommendations</span>
              </button>
            </div>

            {/* Editorial Features Strip */}
            <div className="pt-8 border-t border-[#EADBCE] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#6B564E]">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-[#F4D5C5]/40 text-[#C9785B] shrink-0 mt-0.5">
                  <Bookmark className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-[#3A2A25] font-medium">Free Delivery ₱1,500+</strong>
                  <span className="text-[#988277]">Across Manila & all PH provinces</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-[#A9B79F]/30 text-[#647558] shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-[#3A2A25] font-medium">Tactile Craftsmanship</strong>
                  <span className="text-[#988277]">Embossed spine & signature bookmark</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-[#F4D5C5]/40 text-[#C9785B] shrink-0 mt-0.5">
                  <Feather className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-[#3A2A25] font-medium">Archival Paper Editions</strong>
                  <span className="text-[#988277]">Acid-free pages designed to endure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Atmosphere & Floating Interactive Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Visual Photography Backplate */}
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[#EADBCE] shadow-xl bg-[#FFF9F1] group">
              <img
                src="/src/assets/images/hero_bookstore_corner_1792811365797.jpg"
                alt="Sunlit corner of an artisanal editorial bookstore with oak shelving and open art book"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#F4D5C5] block mb-1">
                  Bookstore Atmosphere
                </span>
                <p className="font-serif text-lg leading-snug drop-shadow-sm">
                  "A room without books is like a body without a soul."
                </p>
                <span className="text-xs text-white/80 italic">— Marcus Tullius Cicero</span>
              </div>
            </div>

            {/* Overlapping Floating Featured Book Card */}
            <div className="absolute -bottom-8 -left-2 sm:-left-6 bg-[#FFFEFB] border border-[#EADBCE] rounded-xl p-3.5 shadow-2xl max-w-xs transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div
                  className="cursor-pointer"
                  onClick={() => setSelectedBook(spotlightBook)}
                >
                  <BookCover book={spotlightBook} size="sm" isInteractive={false} />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono uppercase text-[#C9785B] tracking-wider block">
                    Curator’s Choice
                  </span>
                  <h4
                    onClick={() => setSelectedBook(spotlightBook)}
                    className="font-serif font-bold text-sm text-[#3A2A25] truncate cursor-pointer hover:text-[#C9785B] transition-colors"
                  >
                    {spotlightBook.title}
                  </h4>
                  <p className="text-xs text-[#6B564E] truncate italic">
                    {spotlightBook.author}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#3A2A25]">
                      {formatPHP(spotlightBook.priceCentavos)}
                    </span>
                    <button
                      onClick={() => addToCart(spotlightBook, 1)}
                      className="px-2.5 py-1 text-[11px] bg-[#C9785B] text-white rounded hover:bg-[#B5674B] transition-colors font-medium"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
