import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Plus, Minus, AlertCircle } from 'lucide-react';
import { useBookstore } from '../context/BookstoreContext';
import { BookCover } from './BookCover';
import { formatPHP, FREE_SHIPPING_THRESHOLD_CENTAVOS } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    subtotalCentavos,
    discountCentavos,
    shippingCentavos,
    totalCentavos,
    appliedPromo,
    applyPromo,
    removePromo,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useBookstore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTAVOS - subtotalCentavos);
  const freeShippingProgress = Math.min(100, (subtotalCentavos / FREE_SHIPPING_THRESHOLD_CENTAVOS) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;

    const res = applyPromo(promoInput);
    if (res.success) {
      setPromoInput('');
    } else {
      setPromoError(res.message);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#FFFEFB] border-l border-[#EADBCE] shadow-2xl flex flex-col h-full z-10 animate-slideLeft">
        {/* Top Header */}
        <div className="p-5 border-b border-[#EADBCE] bg-[#FFF9F1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C9785B]" />
            <h2 className="font-serif text-lg font-bold text-[#3A2A25]">
              Your Reading Bag
            </h2>
            <span className="text-xs font-mono text-[#988277]">
              ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-[#988277] hover:text-[#B5674B] transition-colors underline"
              >
                Clear Bag
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#6B564E] hover:text-[#3A2A25] rounded-lg"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-5 py-3 bg-[#FFFEFB] border-b border-[#EADBCE]/60 text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-[#6B564E] mb-1.5">
              Add <span className="font-mono font-bold text-[#3A2A25]">{formatPHP(remainingForFreeShipping)}</span> more to unlock complimentary shipping!
            </p>
          ) : (
            <p className="text-[#647558] font-medium mb-1.5 flex items-center gap-1">
              <span>🎉 You've unlocked Complimentary Nationwide Shipping!</span>
            </p>
          )}
          <div className="w-full bg-[#EADBCE]/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#C9785B] h-full rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F4D5C5]/40 text-[#C9785B] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#3A2A25]">
                Your bag is currently empty
              </h3>
              <p className="text-xs text-[#6B564E] max-w-xs leading-relaxed">
                Discover our curated shelves of Philippine classics, Victorian romances, and timeless philosophy.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 bg-[#C9785B] text-white text-xs font-semibold rounded-lg hover:bg-[#B5674B] transition-colors shadow-sm"
              >
                Browse Books
              </button>
            </div>
          ) : (
            cart.map(({ book, quantity }) => (
              <div
                key={book.id}
                className="p-3.5 rounded-xl bg-[#FFF9F1]/60 border border-[#EADBCE] flex gap-3.5 items-center"
              >
                {/* Book Mini Cover */}
                <BookCover book={book} size="sm" isInteractive={false} />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-sm text-[#3A2A25] truncate">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-[#6B564E] truncate italic">
                    {book.author}
                  </p>
                  <div className="font-mono text-xs font-bold text-[#C9785B] mt-1">
                    {formatPHP(book.priceCentavos)}
                  </div>

                  {/* Quantity Stepper & Removal */}
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#EADBCE]/60">
                    <div className="flex items-center border border-[#EADBCE] rounded bg-white overflow-hidden text-xs">
                      <button
                        onClick={() => updateQuantity(book.id, quantity - 1)}
                        className="px-2 py-0.5 text-[#6B564E] hover:bg-[#FFF9F1]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 font-mono font-bold text-[#3A2A25]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(book.id, quantity + 1)}
                        disabled={quantity >= book.stock}
                        className="px-2 py-0.5 text-[#6B564E] hover:bg-[#FFF9F1] disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#3A2A25]">
                        {formatPHP(book.priceCentavos * quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(book.id)}
                        className="text-[#988277] hover:text-[#B5674B] p-1 transition-colors"
                        aria-label={`Remove ${book.title}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Financial Breakdown & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#EADBCE] bg-[#FFF9F1] space-y-4">
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="p-2.5 rounded-lg bg-[#EBF0E7] border border-[#A9B79F] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#647558] font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon '{appliedPromo}' Active</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-[11px] text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. BOOKNEST15)"
                      className="w-full text-xs px-3 py-2 bg-white border border-[#EADBCE] rounded-lg uppercase tracking-wider font-mono focus:outline-none focus:ring-1 focus:ring-[#C9785B]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#3A2A25] text-white text-xs font-medium rounded-lg hover:bg-[#523A33] transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{promoError}</span>
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#6B564E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#3A2A25] font-medium">
                  {formatPHP(subtotalCentavos)}
                </span>
              </div>

              {discountCentavos > 0 && (
                <div className="flex justify-between text-[#647558]">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums font-bold">
                    -{formatPHP(discountCentavos)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping (Standard)</span>
                <span className="font-mono tabular-nums text-[#3A2A25]">
                  {shippingCentavos === 0 ? (
                    <span className="text-[#647558] font-bold">FREE</span>
                  ) : (
                    formatPHP(shippingCentavos)
                  )}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-[#EADBCE] text-sm font-bold text-[#3A2A25]">
                <span className="font-serif">Estimated Total</span>
                <span className="font-mono text-base text-[#C9785B]">
                  {formatPHP(totalCentavos)}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-[#C9785B] text-white font-medium text-xs rounded-lg hover:bg-[#B5674B] transition-all duration-200 shadow-md flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-[#988277]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#647558]" />
              <span>Demonstration Store · Secure Simulation</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
