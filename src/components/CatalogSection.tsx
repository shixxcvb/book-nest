import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, BookX } from 'lucide-react';
import { BOOKS_DATA, GENRES_LIST } from '../data/books';
import { BookCard } from './BookCard';
import { SortOption } from '../types/book';
import { formatPHP } from '../utils/formatters';

interface CatalogSectionProps {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  selectedGenre,
  onGenreChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(60000); // ₱600.00
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter and sort computation
  const filteredBooks = useMemo(() => {
    let result = [...BOOKS_DATA];

    // Search query: title, author, description, tags
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Genre filter
    if (selectedGenre && selectedGenre !== 'All Genres') {
      result = result.filter((b) => b.genre === selectedGenre);
    }

    // Price filter
    result = result.filter((b) => b.priceCentavos <= maxPrice);

    // In stock filter
    if (inStockOnly) {
      result = result.filter((b) => b.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.priceCentavos - b.priceCentavos);
        break;
      case 'price-desc':
        result.sort((a, b) => b.priceCentavos - a.priceCentavos);
        break;
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'year-desc':
        result.sort((a, b) => b.publicationYear - a.publicationYear);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, selectedGenre, maxPrice, inStockOnly, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedGenre !== 'All Genres' ||
    maxPrice < 60000 ||
    inStockOnly;

  const handleClearFilters = () => {
    setSearchQuery('');
    onGenreChange('All Genres');
    setMaxPrice(60000);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <section id="catalog" className="py-16 bg-[#FFF9F1] border-b border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9785B] block mb-1">
            Browse Editions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A2A25]">
            The BookNest Catalog
          </h2>
          <p className="text-sm text-[#6B564E] mt-1 max-w-2xl">
            Filter by literary genre, price, or availability. Every edition is presented with authentic Philippine pricing and careful metadata.
          </p>
        </div>

        {/* Search & Control Bar */}
        <div className="bg-[#FFFEFB] border border-[#EADBCE] rounded-xl p-4 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#988277] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or keyword (e.g. 'Rizal', 'Gatsby', 'Poetry')..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FFF9F1]/60 border border-[#EADBCE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9785B] focus:bg-white text-[#3A2A25] placeholder:text-[#988277]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#988277] hover:text-[#3A2A25]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown & Filter Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-xs font-medium text-[#6B564E] whitespace-nowrap">
                  Sort:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-xs bg-[#FFF9F1]/80 border border-[#EADBCE] rounded-lg px-3 py-2 text-[#3A2A25] focus:outline-none focus:ring-1 focus:ring-[#C9785B]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="title-asc">Alphabetical (A - Z)</option>
                  <option value="title-desc">Alphabetical (Z - A)</option>
                  <option value="year-desc">Publication Year</option>
                </select>
              </div>

              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs border border-[#EADBCE] rounded-lg text-[#6B564E] hover:text-[#3A2A25]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="flex items-center gap-1 text-xs text-[#C9785B] hover:text-[#B5674B] font-medium px-2 py-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Collapsible / Desktop Filter Strip */}
          <div className={`mt-4 pt-4 border-t border-[#EADBCE]/80 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Genre Pills (Functional filter buttons) */}
              <div className="md:col-span-8 flex flex-wrap gap-1.5 items-center">
                <span className="text-xs font-medium text-[#988277] mr-1">Genres:</span>
                {GENRES_LIST.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => onGenreChange(genre)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      selectedGenre === genre
                        ? 'bg-[#3A2A25] text-white'
                        : 'bg-[#FFF9F1] text-[#6B564E] hover:bg-[#F4D5C5]/40 hover:text-[#3A2A25] border border-[#EADBCE]'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>

              {/* Price Range Slider */}
              <div className="md:col-span-4 flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-[#6B564E] mb-1">
                    <span>Max Price:</span>
                    <span className="font-mono font-bold text-[#3A2A25]">{formatPHP(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="35000"
                    max="60000"
                    step="2500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#C9785B] cursor-pointer"
                  />
                </div>

                {/* Stock Toggle */}
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#6B564E] select-none shrink-0">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#C9785B] rounded"
                  />
                  <span>In Stock</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between text-xs text-[#988277] mb-6">
          <div>
            Showing <span className="font-mono font-medium text-[#3A2A25]">{filteredBooks.length}</span> of{' '}
            <span className="font-mono">{BOOKS_DATA.length}</span> editions
            {selectedGenre !== 'All Genres' && ` in ${selectedGenre}`}
          </div>
          {filteredBooks.length > 0 && (
            <div className="hidden sm:block">
              Free nationwide delivery over ₱1,500.00
            </div>
          )}
        </div>

        {/* Catalog Grid or Empty State */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          /* Pleasant Empty State */
          <div className="bg-[#FFFEFB] border border-[#EADBCE] rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#F4D5C5]/40 text-[#C9785B] flex items-center justify-center mb-4">
              <BookX className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3A2A25]">
              No titles matched your criteria
            </h3>
            <p className="text-sm text-[#6B564E] mt-2 mb-6 leading-relaxed">
              We couldn't find any editions matching "{searchQuery}" with the active filters. Try broadening your price range or exploring all genres.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-5 py-2.5 bg-[#C9785B] text-white text-xs font-medium rounded-lg hover:bg-[#B5674B] transition-colors shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
