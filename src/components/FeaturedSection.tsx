import React, { useState } from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { BOOKS_DATA } from '../data/books';
import { BookCard } from './BookCard';

export const FeaturedSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'featured' | 'newArrivals'>('featured');

  const displayedBooks = BOOKS_DATA.filter((book) =>
    activeTab === 'featured' ? book.featured : book.isNewArrival
  ).slice(0, 4);

  return (
    <section id="featured" className="py-16 bg-[#FFF9F1] border-b border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#C9785B] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editor's Selection</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#3A2A25]">
              Featured Masterpieces
            </h2>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-[#FFFEFB] border border-[#EADBCE] rounded-lg self-start md:self-auto">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'featured'
                  ? 'bg-[#C9785B] text-white shadow-sm'
                  : 'text-[#6B564E] hover:text-[#3A2A25]'
              }`}
            >
              Curator Picks
            </button>
            <button
              onClick={() => setActiveTab('newArrivals')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'newArrivals'
                  ? 'bg-[#C9785B] text-white shadow-sm'
                  : 'text-[#6B564E] hover:text-[#3A2A25]'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};
