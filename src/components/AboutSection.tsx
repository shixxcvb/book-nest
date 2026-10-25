import React from 'react';
import { BookOpen, Sparkles, Feather, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';
import { useBookstore } from '../context/BookstoreContext';

interface AboutSectionProps {
  onExploreShelves?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreShelves }) => {
  const { setIsStoreInfoModalOpen } = useBookstore();

  const handleExplore = () => {
    if (onExploreShelves) {
      onExploreShelves();
    } else {
      const el = document.getElementById('catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-16 bg-[#FFFEFB] border-b border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Atmosphere */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#EADBCE] shadow-lg group">
              <img
                src="/src/assets/images/reading_nook_ambiance_1792811366288.jpg"
                alt="Cozy reading nook with books, brass lamp and armchair"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4D5C5]">
                  Our Philosophy
                </span>
                <p className="font-serif text-base italic mt-0.5">
                  "Books are a uniquely portable magic."
                </p>
                <span className="text-xs text-white/80">— Stephen King</span>
              </div>
            </div>

            {/* Overlapping small badge */}
            <div className="absolute -bottom-5 -right-3 bg-[#FFF9F1] border border-[#EADBCE] rounded-xl p-3 shadow-md hidden sm:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C9785B] text-white flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="block font-serif font-bold text-[#3A2A25]">100% Curated</span>
                <span className="text-[#988277]">Public Domain & Heritage Classics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#C9785B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About BookNest</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A2A25] leading-tight">
              A celebration of classic prose, quiet craft, and the art of slow reading.
            </h2>

            <p className="text-sm sm:text-base text-[#6B564E] leading-relaxed">
              BookNest was founded as an independent digital sanctuary devoted to timeless literature. In a fast-paced digital world, we champion the sensory and intellectual richness of enduring prose—from foundational Philippine masterworks like Dr. José Rizal’s <em>Noli Me Tángere</em> to the universal wisdom of Marcus Aurelius and Jane Austen.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FFF9F1] border border-[#EADBCE]">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#3A2A25] mb-1">
                  <Feather className="w-4 h-4 text-[#C9785B]" />
                  <span>Thoughtful Curation</span>
                </div>
                <p className="text-xs text-[#6B564E] leading-relaxed">
                  Every edition on our shelves is chosen for literary excellence, cultural resonance, and unforgettable narrative power.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF9F1] border border-[#EADBCE]">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#3A2A25] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#647558]" />
                  <span>Artisanal Standards</span>
                </div>
                <p className="text-xs text-[#6B564E] leading-relaxed">
                  Modeled with archival paper aesthetics, tactile cloth-bound book spines, and sample excerpt reading modes.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleExplore}
                className="px-5 py-2.5 bg-[#3A2A25] text-white text-xs font-medium rounded-lg hover:bg-[#523A33] transition-colors flex items-center gap-2 shadow-sm active:scale-95"
              >
                <span>Browse All Collections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsStoreInfoModalOpen(true)}
                className="px-5 py-2.5 bg-[#FFFEFB] border border-[#EADBCE] text-[#3A2A25] text-xs font-medium rounded-lg hover:bg-[#FFF9F1] hover:border-[#C9785B] transition-colors flex items-center gap-2 active:scale-95"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#C9785B]" />
                <span>Store Information & Shipping FAQ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
