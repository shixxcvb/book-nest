import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useBookstore } from '../context/BookstoreContext';
import { BookCover } from './BookCover';
import { formatPHP } from '../utils/formatters';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlistBooks,
    toggleWishlist,
    moveWishlistToCart,
    isWishlistOpen,
    setIsWishlistOpen,
    setSelectedBook,
  } = useBookstore();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={() => setIsWishlistOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#FFFEFB] border-l border-[#EADBCE] shadow-2xl flex flex-col h-full z-10 animate-slideLeft">
        {/* Header */}
        <div className="p-5 border-b border-[#EADBCE] bg-[#FFF9F1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C9785B] fill-current" />
            <h2 className="font-serif text-lg font-bold text-[#3A2A25]">
              Saved Editions
            </h2>
            <span className="text-xs font-mono text-[#988277]">
              ({wishlistBooks.length})
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-[#6B564E] hover:text-[#3A2A25] rounded-lg"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistBooks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F4D5C5]/40 text-[#C9785B] flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#3A2A25]">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-[#6B564E] max-w-xs leading-relaxed">
                Click the heart icon on any edition in our catalog to save titles you wish to read or purchase later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 bg-[#C9785B] text-white text-xs font-semibold rounded-lg hover:bg-[#B5674B] transition-colors shadow-sm"
              >
                Explore Books
              </button>
            </div>
          ) : (
            wishlistBooks.map((book) => (
              <div
                key={book.id}
                className="p-3.5 rounded-xl bg-[#FFF9F1]/60 border border-[#EADBCE] flex gap-3.5 items-center hover:border-[#C9785B]/40 transition-colors"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setSelectedBook(book);
                  }}
                >
                  <BookCover book={book} size="sm" isInteractive={false} />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setSelectedBook(book);
                    }}
                    className="font-serif font-bold text-sm text-[#3A2A25] truncate cursor-pointer hover:text-[#C9785B] transition-colors"
                  >
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-[#6B564E] truncate italic">
                    {book.author}
                  </p>
                  <div className="font-mono text-xs font-bold text-[#3A2A25] mt-1">
                    {formatPHP(book.priceCentavos)}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#EADBCE]/60">
                    <button
                      onClick={() => moveWishlistToCart(book.id)}
                      disabled={book.stock <= 0}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C9785B] text-white rounded text-xs font-medium hover:bg-[#B5674B] transition-colors disabled:opacity-40"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{book.stock <= 0 ? 'Out of Stock' : 'Move to Bag'}</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(book.id)}
                      className="text-[#988277] hover:text-[#B5674B] p-1 transition-colors"
                      aria-label={`Remove ${book.title} from wishlist`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
