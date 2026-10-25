import React, { useState } from 'react';
import { X, Heart, ShoppingBag, BookOpen, Quote, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useBookstore } from '../context/BookstoreContext';
import { BookCover } from './BookCover';
import { formatPHP } from '../utils/formatters';
import { BOOKS_DATA } from '../data/books';

export const BookDetailModal: React.FC = () => {
  const {
    selectedBook,
    setSelectedBook,
    addToCart,
    toggleWishlist,
    isInWishlist,
    cart,
  } = useBookstore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'synopsis' | 'excerpt'>('synopsis');

  if (!selectedBook) return null;

  const book = selectedBook;
  const wishlisted = isInWishlist(book.id);
  const cartItem = cart.find((i) => i.book.id === book.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;
  const availableStock = Math.max(0, book.stock - inCartQty);
  const isOutOfStock = book.stock <= 0;

  // Related books in the same genre
  const relatedBooks = BOOKS_DATA.filter(
    (b) => b.id !== book.id && (b.genre === book.genre || b.isRecommended)
  ).slice(0, 3);

  const handleIncrement = () => {
    if (quantity < availableStock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = () => {
    if (availableStock > 0) {
      addToCart(book, quantity);
      setQuantity(1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
      {/* Modal Dialog */}
      <div
        className="relative bg-[#FFFEFB] border border-[#EADBCE] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button */}
        <div className="sticky top-0 z-30 bg-[#FFFEFB]/90 backdrop-blur-md px-6 py-4 border-b border-[#EADBCE] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#988277]">
            <span>Book Details</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#3A2A25] font-medium truncate max-w-xs sm:max-w-md">
              {book.title}
            </span>
          </div>

          <button
            onClick={() => setSelectedBook(null)}
            className="p-1.5 text-[#6B564E] hover:text-[#3A2A25] hover:bg-[#FFF9F1] rounded-lg transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Book Cover Showcase & Quick Stats */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="p-6 bg-[#FFF9F1] rounded-2xl border border-[#EADBCE] w-full flex justify-center items-center">
                <BookCover book={book} size="lg" isInteractive={false} />
              </div>

              {/* Book Metadata Sheet */}
              <div className="w-full mt-4 p-4 rounded-xl bg-[#FFF9F1]/60 border border-[#EADBCE] text-xs space-y-2">
                <div className="flex justify-between text-[#6B564E]">
                  <span>Publication Year:</span>
                  <span className="font-mono text-[#3A2A25] font-medium">{book.publicationYear}</span>
                </div>
                <div className="flex justify-between text-[#6B564E]">
                  <span>Pages:</span>
                  <span className="font-mono text-[#3A2A25] font-medium">{book.pages}</span>
                </div>
                <div className="flex justify-between text-[#6B564E]">
                  <span>Publisher:</span>
                  <span className="text-[#3A2A25] font-medium">{book.publisher}</span>
                </div>
                <div className="flex justify-between text-[#6B564E]">
                  <span>ISBN / Code:</span>
                  <span className="font-mono text-[#3A2A25] text-[11px]">{book.isbn}</span>
                </div>
                <div className="flex justify-between text-[#6B564E]">
                  <span>Format:</span>
                  <span className="text-[#3A2A25] font-medium">Fine Hardcover Edition</span>
                </div>
              </div>
            </div>

            {/* Right: Book Details & Purchase Control */}
            <div className="md:col-span-7 flex flex-col space-y-5">
              {/* Genre & Rating */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#C9785B] font-mono tracking-wider uppercase font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{book.genre}</span>
                </div>

                <div className="flex items-center gap-1 text-[#3A2A25]">
                  <span className="text-[#C9785B] font-serif text-sm">★</span>
                  <span className="font-bold">{book.rating.toFixed(2)}</span>
                  <span className="text-[#988277]">({book.reviewCount} readers)</span>
                </div>
              </div>

              {/* Title & Author */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A2A25] leading-tight">
                  {book.title}
                </h2>
                <p className="font-serif italic text-base text-[#6B564E] mt-1">
                  by {book.author}
                </p>
              </div>

              {/* Price & Stock Strip */}
              <div className="p-4 rounded-xl bg-[#FFF9F1] border border-[#EADBCE] flex items-center justify-between">
                <div>
                  <span className="block text-[11px] font-mono uppercase text-[#988277]">Price (PHP)</span>
                  <span className="font-mono text-2xl font-bold text-[#3A2A25]">
                    {formatPHP(book.priceCentavos)}
                  </span>
                </div>

                <div className="text-right">
                  <span className="block text-[11px] font-mono uppercase text-[#988277]">Inventory</span>
                  {isOutOfStock ? (
                    <span className="text-stone-500 font-medium text-xs">Currently Out of Stock</span>
                  ) : book.stock <= 3 ? (
                    <span className="text-[#B5674B] font-medium text-xs">
                      Only {book.stock} copies in store
                    </span>
                  ) : (
                    <span className="text-[#647558] font-medium text-xs">
                      In Stock ({book.stock} copies)
                    </span>
                  )}
                  {inCartQty > 0 && (
                    <span className="block text-[10px] text-[#988277]">
                      ({inCartQty} currently in your cart)
                    </span>
                  )}
                </div>
              </div>

              {/* Purchase Action Buttons */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#EADBCE] rounded-lg bg-white overflow-hidden shrink-0">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="px-3 py-2 text-sm text-[#6B564E] hover:bg-[#FFF9F1] disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-mono font-bold text-[#3A2A25]">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      disabled={quantity >= availableStock || isOutOfStock}
                      className="px-3 py-2 text-sm text-[#6B564E] hover:bg-[#FFF9F1] disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Primary Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={availableStock <= 0}
                    className={`flex-1 py-3 px-5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      availableStock <= 0
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-[#C9785B] text-white hover:bg-[#B5674B] shadow-md hover:shadow-lg active:scale-95'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {isOutOfStock
                        ? 'Edition Out of Stock'
                        : availableStock <= 0
                        ? 'Maximum In Cart'
                        : `Add ${quantity} to Cart · ${formatPHP(book.priceCentavos * quantity)}`}
                    </span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(book.id)}
                    className={`p-3 rounded-lg border transition-colors ${
                      wishlisted
                        ? 'bg-[#F4D5C5]/40 border-[#C9785B] text-[#C9785B]'
                        : 'border-[#EADBCE] bg-white text-[#6B564E] hover:text-[#C9785B]'
                    }`}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#988277]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#647558]" />
                  <span>Demonstration purchase · No credit card or actual payment required</span>
                </div>
              </div>

              {/* Tabs: Synopsis vs Sample Excerpt Reader */}
              <div className="pt-2">
                <div className="flex border-b border-[#EADBCE] gap-6 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('synopsis')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'synopsis'
                        ? 'text-[#C9785B] font-bold'
                        : 'text-[#6B564E] hover:text-[#3A2A25]'
                    }`}
                  >
                    Editorial Synopsis
                    {activeTab === 'synopsis' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9785B]" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('excerpt')}
                    className={`pb-2 transition-colors relative flex items-center gap-1.5 ${
                      activeTab === 'excerpt'
                        ? 'text-[#C9785B] font-bold'
                        : 'text-[#6B564E] hover:text-[#3A2A25]'
                    }`}
                  >
                    <Quote className="w-3 h-3 text-[#C9785B]" />
                    <span>Read Sample Excerpt</span>
                    {activeTab === 'excerpt' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9785B]" />
                    )}
                  </button>
                </div>

                <div className="py-4">
                  {activeTab === 'synopsis' ? (
                    <div className="space-y-3 text-sm text-[#3A2A25] leading-relaxed">
                      <p>{book.longDescription}</p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {book.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] text-[#6B564E] bg-[#FFF9F1] px-2.5 py-1 rounded border border-[#EADBCE]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Sample Excerpt Reader View */
                    <div className="p-5 rounded-xl bg-[#FFF9F1] border border-[#EADBCE] text-[#3A2A25]">
                      <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#C9785B]">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Opening Passage</span>
                      </div>
                      <blockquote className="font-serif italic text-base leading-relaxed pl-3 border-l-2 border-[#C9785B] text-[#3A2A25]">
                        "{book.sampleExcerpt}"
                      </blockquote>
                      <p className="text-right text-xs text-[#988277] mt-3 font-mono">
                        — {book.title}, by {book.author}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Editions Strip */}
          {relatedBooks.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#EADBCE]">
              <h4 className="font-serif text-lg font-bold text-[#3A2A25] mb-4">
                You Might Also Appreciate
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedBooks.map((relBook) => (
                  <div
                    key={relBook.id}
                    onClick={() => {
                      setSelectedBook(relBook);
                      setQuantity(1);
                    }}
                    className="p-3 rounded-xl bg-[#FFF9F1]/60 border border-[#EADBCE] hover:border-[#C9785B] cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <BookCover book={relBook} size="sm" isInteractive={false} />
                    <div className="min-w-0 flex-1">
                      <h5 className="font-serif font-bold text-xs text-[#3A2A25] truncate">
                        {relBook.title}
                      </h5>
                      <p className="text-[11px] text-[#6B564E] truncate italic">
                        {relBook.author}
                      </p>
                      <span className="font-mono text-xs font-bold text-[#C9785B] block mt-1">
                        {formatPHP(relBook.priceCentavos)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
