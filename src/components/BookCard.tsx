import React from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Book } from '../types/book';
import { BookCover } from './BookCover';
import { formatPHP } from '../utils/formatters';
import { useBookstore } from '../context/BookstoreContext';

interface BookCardProps {
  book: Book;
  onOpenDetails?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onOpenDetails }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedBook, cart } = useBookstore();
  const wishlisted = isInWishlist(book.id);

  // Check if item is already in cart and what qty
  const cartItem = cart.find((i) => i.book.id === book.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = book.stock <= 0;
  const isMaxInCart = inCartQty >= book.stock;

  const handleCardClick = () => {
    if (onOpenDetails) {
      onOpenDetails(book);
    } else {
      setSelectedBook(book);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock && !isMaxInCart) {
      addToCart(book, 1);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(book.id);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative bg-[#FFFEFB] border border-[#EADBCE] rounded-xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#C9785B]/40 cursor-pointer"
    >
      {/* Top action row: Wishlist floating button */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            wishlisted
              ? 'bg-[#C9785B] text-white shadow-sm'
              : 'bg-white/80 text-[#6B564E] hover:text-[#C9785B] hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform active:scale-125 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Book Cover Showcase */}
      <div className="w-full flex justify-center items-center py-4 bg-[#FFF9F1]/80 rounded-lg overflow-hidden group-hover:bg-[#FFF9F1] transition-colors">
        <div className="transition-transform duration-300 group-hover:scale-105">
          <BookCover book={book} size="md" />
        </div>
      </div>

      {/* Book Metadata - Zero Pill Discipline (Clean unboxed text) */}
      <div className="mt-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs text-[#988277]">
          <span>{book.genre}</span>
          <span aria-hidden="true">·</span>
          <span>{book.publicationYear}</span>
          {book.pages && (
            <>
              <span aria-hidden="true">·</span>
              <span>{book.pages} pp</span>
            </>
          )}
        </div>

        <h3 className="font-serif font-bold text-lg text-[#3A2A25] mt-1 line-clamp-1 group-hover:text-[#C9785B] transition-colors">
          {book.title}
        </h3>

        <p className="text-sm font-sans text-[#6B564E] mt-0.5 line-clamp-1 italic">
          by {book.author}
        </p>

        {/* Demo Rating & Stock Status */}
        <div className="mt-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-[#3A2A25]">
            <span className="text-[#C9785B] font-serif text-sm">★</span>
            <span className="font-medium">{book.rating.toFixed(2)}</span>
            <span className="text-[#988277]">({book.reviewCount})</span>
          </div>

          <div>
            {isOutOfStock ? (
              <span className="text-stone-500 font-medium">Out of stock</span>
            ) : book.stock <= 3 ? (
              <span className="text-[#B5674B] font-medium">Only {book.stock} left</span>
            ) : (
              <span className="text-[#647558] font-medium">In stock</span>
            )}
          </div>
        </div>

        {/* Price & Purchase Actions */}
        <div className="mt-4 pt-3 border-t border-[#EADBCE]/80 flex items-center justify-between gap-2">
          <div>
            <span className="block text-[11px] text-[#988277] uppercase tracking-wider font-mono">Price</span>
            <span className="font-mono tabular-nums text-base md:text-lg font-bold text-[#3A2A25]">
              {formatPHP(book.priceCentavos)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick view button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              title="Quick view book details"
              aria-label={`View details for ${book.title}`}
              className="p-2 text-[#6B564E] hover:text-[#3A2A25] hover:bg-[#F4D5C5]/40 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || isMaxInCart}
              aria-label={`Add ${book.title} to cart`}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isOutOfStock
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : isMaxInCart
                  ? 'bg-[#EBF0E7] text-[#647558]'
                  : 'bg-[#C9785B] text-white hover:bg-[#B5674B] shadow-sm hover:shadow active:scale-95'
              }`}
            >
              {isMaxInCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>In Cart ({inCartQty})</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
