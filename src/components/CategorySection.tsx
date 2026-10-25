import React from 'react';
import { BookOpen, Landmark, Sparkles, Feather, Compass, Users } from 'lucide-react';
import { GENRES_LIST } from '../data/books';

interface CategorySectionProps {
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedGenre,
  onSelectGenre,
}) => {
  const categoryMeta: Record<
    string,
    { icon: React.ReactNode; count: string; description: string; accent: string }
  > = {
    'Philippine Literature': {
      icon: <Landmark className="w-5 h-5 text-[#C9785B]" />,
      count: '3 Masterpieces',
      description: 'Foundational national epics, historical satire, and revolutionary prose.',
      accent: 'border-[#C9785B]/40 bg-[#F4D5C5]/10',
    },
    'Classic Fiction': {
      icon: <BookOpen className="w-5 h-5 text-[#A9B79F]" />,
      count: '3 Editions',
      description: 'Sparkling social comedies, roaring jazz age excess, and unforgettable drama.',
      accent: 'border-[#A9B79F]/40 bg-[#EBF0E7]/20',
    },
    'Mystery & Gothic': {
      icon: <Sparkles className="w-5 h-5 text-[#C9785B]" />,
      count: '3 Tales',
      description: 'Haunting Yorkshire moors, ethical horror, and eternal portraits.',
      accent: 'border-[#C9785B]/40 bg-[#F4D5C5]/10',
    },
    'Poetry & Philosophy': {
      icon: <Feather className="w-5 h-5 text-[#A9B79F]" />,
      count: '2 Volumes',
      description: 'Stoic meditations for daily resilience and rhythmic Tagalog awit verse.',
      accent: 'border-[#A9B79F]/40 bg-[#EBF0E7]/20',
    },
    'Coming of Age & Family': {
      icon: <Users className="w-5 h-5 text-[#C9785B]" />,
      count: '2 Stories',
      description: 'Tender sisterhood, secret blooming walled gardens, and quiet healing.',
      accent: 'border-[#C9785B]/40 bg-[#F4D5C5]/10',
    },
    'Modernist Fiction': {
      icon: <Compass className="w-5 h-5 text-[#A9B79F]" />,
      count: '2 Works',
      description: 'Stream of consciousness journeys and surreal existential transformations.',
      accent: 'border-[#A9B79F]/40 bg-[#EBF0E7]/20',
    },
  };

  const actionableGenres = GENRES_LIST.filter((g) => g !== 'All Genres');

  return (
    <section className="py-14 bg-[#FFFEFB] border-b border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C9785B] block mb-1">
              Curated Shelves
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#3A2A25]">
              Browse by Literary Genre
            </h2>
          </div>
          <button
            onClick={() => onSelectGenre('All Genres')}
            className={`text-xs font-mono tracking-wider py-1.5 px-3 rounded-lg border transition-all ${
              selectedGenre === 'All Genres'
                ? 'bg-[#3A2A25] text-white border-[#3A2A25]'
                : 'text-[#6B564E] border-[#EADBCE] hover:border-[#C9785B]'
            }`}
          >
            View Complete Catalog (14 Titles)
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actionableGenres.map((genre) => {
            const isSelected = selectedGenre === genre;
            const meta = categoryMeta[genre] || {
              icon: <BookOpen className="w-5 h-5 text-[#C9785B]" />,
              count: 'Curated',
              description: 'Exquisite literary works chosen for thoughtful readers.',
              accent: 'border-[#EADBCE]',
            };

            return (
              <button
                key={genre}
                onClick={() => onSelectGenre(genre)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 group relative overflow-hidden ${
                  isSelected
                    ? 'border-[#C9785B] bg-[#FFF9F1] shadow-md ring-1 ring-[#C9785B]'
                    : 'border-[#EADBCE] bg-[#FFFEFB] hover:border-[#C9785B]/60 hover:bg-[#FFF9F1]/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-white border border-[#EADBCE] group-hover:scale-105 transition-transform">
                    {meta.icon}
                  </div>
                  <span className="text-[11px] font-mono text-[#988277]">
                    {meta.count}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#3A2A25] mt-3 group-hover:text-[#C9785B] transition-colors">
                  {genre}
                </h3>

                <p className="text-xs text-[#6B564E] mt-1 line-clamp-2 leading-relaxed">
                  {meta.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-[11px] font-medium text-[#C9785B]">
                  <span>{isSelected ? 'Active Selection' : 'Browse Genre'}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
