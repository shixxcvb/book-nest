import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, CartItem, OrderConfirmation } from '../types/book';
import { BOOKS_DATA } from '../data/books';
import { evaluatePromoCode, calculateShipping } from '../utils/formatters';

interface ToastState {
  id: string;
  text: string;
  type: 'success' | 'info' | 'warning';
}

interface BookstoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (book: Book, quantity?: number) => boolean;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotalCentavos: number;
  discountCentavos: number;
  shippingCentavos: number;
  totalCentavos: number;
  
  // Promo code
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  wishlistBooks: Book[];
  moveWishlistToCart: (bookId: string) => void;

  // UI Drawer & Modal controls
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isStoreInfoModalOpen: boolean;
  setIsStoreInfoModalOpen: (open: boolean) => void;
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;

  // Orders
  orderHistory: OrderConfirmation[];
  saveOrder: (order: OrderConfirmation) => void;

  // Toasts
  toast: ToastState | null;
  triggerToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
}

const BookstoreContext = createContext<BookstoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'booknest_cart_v1';
const WISHLIST_STORAGE_KEY = 'booknest_wishlist_v1';
const ORDERS_STORAGE_KEY = 'booknest_orders_v1';

export const BookstoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state with localStorage hydration
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Wishlist state with localStorage hydration
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['noli-me-tangere', 'the-great-gatsby'];
  });

  // Orders state
  const [orderHistory, setOrderHistory] = useState<OrderConfirmation[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStoreInfoModalOpen, setIsStoreInfoModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<ToastState | null>(null);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orderHistory));
    } catch {
      // ignore
    }
  }, [orderHistory]);

  const triggerToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, text, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3200);
  };

  const addToCart = (book: Book, quantity: number = 1): boolean => {
    if (book.stock <= 0) {
      triggerToast(`"${book.title}" is currently out of stock.`, 'warning');
      return false;
    }

    let success = false;
    setCart((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      const currentQty = existing ? existing.quantity : 0;
      const targetQty = currentQty + quantity;

      if (targetQty > book.stock) {
        triggerToast(`Only ${book.stock} copies of "${book.title}" available in stock.`, 'warning');
        return prev;
      }

      success = true;
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id ? { ...item, quantity: targetQty } : item
        );
      } else {
        return [...prev, { book, quantity, addedAt: Date.now() }];
      }
    });

    if (success) {
      triggerToast(`Added "${book.title}" to your cart.`, 'success');
    }
    return success;
  };

  const removeFromCart = (bookId: string) => {
    const removedItem = cart.find((i) => i.book.id === bookId);
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
    if (removedItem) {
      triggerToast(`Removed "${removedItem.book.title}" from your cart.`, 'info');
    }
  };

  const updateQuantity = (bookId: string, newQuantity: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.book.id === bookId) {
            const clamped = Math.max(1, Math.min(newQuantity, item.book.stock));
            return { ...item, quantity: clamped };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (bookId: string) => {
    const book = BOOKS_DATA.find((b) => b.id === bookId);
    if (!book) return;

    if (wishlist.includes(bookId)) {
      setWishlist((prev) => prev.filter((id) => id !== bookId));
      triggerToast(`Removed "${book.title}" from your wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, bookId]);
      triggerToast(`Saved "${book.title}" to your wishlist!`, 'success');
    }
  };

  const isInWishlist = (bookId: string) => wishlist.includes(bookId);

  const wishlistBooks = wishlist
    .map((id) => BOOKS_DATA.find((b) => b.id === id))
    .filter((b): b is Book => Boolean(b));

  const moveWishlistToCart = (bookId: string) => {
    const book = BOOKS_DATA.find((b) => b.id === bookId);
    if (!book) return;
    const added = addToCart(book, 1);
    if (added) {
      setWishlist((prev) => prev.filter((id) => id !== bookId));
    }
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalCentavos = cart.reduce(
    (sum, item) => sum + item.book.priceCentavos * item.quantity,
    0
  );

  const promoResult = appliedPromo
    ? evaluatePromoCode(appliedPromo, subtotalCentavos)
    : { valid: false, discountCentavos: 0, freeShipping: false, message: '' };

  const discountCentavos = promoResult.valid ? promoResult.discountCentavos : 0;
  const shippingCentavos = calculateShipping(
    subtotalCentavos,
    'standard',
    promoResult.freeShipping
  );
  const totalCentavos = Math.max(0, subtotalCentavos - discountCentavos + shippingCentavos);

  const applyPromo = (code: string) => {
    const res = evaluatePromoCode(code, subtotalCentavos);
    if (res.valid) {
      setAppliedPromo(code.trim().toUpperCase());
      triggerToast(res.message, 'success');
      return { success: true, message: res.message };
    } else {
      triggerToast(res.message, 'warning');
      return { success: false, message: res.message };
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    triggerToast('Promo code removed.', 'info');
  };

  const saveOrder = (order: OrderConfirmation) => {
    setOrderHistory((prev) => [order, ...prev]);
    clearCart();
  };

  return (
    <BookstoreContext.Provider
      value={{
        cart,
        addToCart,
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
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistBooks,
        moveWishlistToCart,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isStoreInfoModalOpen,
        setIsStoreInfoModalOpen,
        selectedBook,
        setSelectedBook,
        orderHistory,
        saveOrder,
        toast,
        triggerToast,
      }}
    >
      {children}
    </BookstoreContext.Provider>
  );
};

export const useBookstore = (): BookstoreContextType => {
  const context = useContext(BookstoreContext);
  if (!context) {
    throw new Error('useBookstore must be used within a BookstoreProvider');
  }
  return context;
};
