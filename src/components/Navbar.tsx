import React, { useState } from 'react';
import { ShoppingBag, Heart, Menu, X, BookOpen, Truck, HelpCircle } from 'lucide-react';
import { useBookstore } from '../context/BookstoreContext';
import { formatPHP } from '../utils/formatters';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const {
    cartCount,
    subtotalCentavos,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsStoreInfoModalOpen,
  } = useBookstore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Catalog', id: 'catalog' },
    { label: "Curator's Picks", id: 'featured' },
    { label: 'About BookNest', id: 'about' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFEFB]/95 backdrop-blur-md border-b border-[#EADBCE]">
      {/* Store Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-[#3A2A25] text-[#FFF9F1] px-4 py-1.5 text-xs flex items-center justify-between border-b border-[#3A2A25]">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap mx-auto sm:mx-0">
            <Truck className="w-3.5 h-3.5 text-[#C9785B] shrink-0" />
            <span className="font-medium text-[#F4D5C5]">Complimentary Delivery:</span>
            <span className="opacity-90">
              Free nationwide courier on orders over ₱1,500 · Use code <strong>BOOKNEST15</strong> for 15% off
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsStoreInfoModalOpen(true)}
              className="text-[#F4D5C5] hover:text-white underline text-[11px] transition-colors"
            >
              Shipping & FAQ
            </button>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="text-[#FFF9F1]/60 hover:text-[#FFF9F1] p-0.5 ml-1"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main 3-Zone Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2 text-left group shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-[#C9785B] text-white flex items-center justify-center shadow-sm group-hover:bg-[#B5674B] transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#3A2A25] whitespace-nowrap">
              BookNest
            </span>
            <span className="text-[10px] block font-sans tracking-widest uppercase text-[#988277] -mt-1 font-medium">
              Editorial Books
            </span>
          </div>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B564E]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`relative py-1 hover:text-[#3A2A25] transition-colors whitespace-nowrap shrink-0 ${
                activeSection === link.id ? 'text-[#C9785B] font-semibold' : ''
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9785B] rounded-full" />
              )}
            </button>
          ))}

          <button
            onClick={() => setIsStoreInfoModalOpen(true)}
            className="text-xs font-mono py-1 px-2.5 rounded border border-[#EADBCE] text-[#6B564E] hover:text-[#3A2A25] hover:border-[#C9785B] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#C9785B]" />
            <span>Store Info & FAQ</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Interactive Bag / Wishlist */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label={`Wishlist, ${wishlist.length} saved books`}
            className="relative p-2.5 text-[#6B564E] hover:text-[#C9785B] hover:bg-[#FFF9F1] rounded-lg transition-colors"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#C9785B] text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Primary Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping cart with ${cartCount} items, total ${formatPHP(subtotalCentavos)}`}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#3A2A25] text-white rounded-lg hover:bg-[#523A33] transition-all shadow-sm active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#F4D5C5]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-[#C9785B] text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium hidden sm:inline whitespace-nowrap">Cart</span>
            {subtotalCentavos > 0 && (
              <span className="text-xs font-mono tabular-nums text-[#F4D5C5] pl-1.5 border-l border-white/20 hidden lg:inline">
                {formatPHP(subtotalCentavos)}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#6B564E] hover:text-[#3A2A25] rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EADBCE] bg-[#FFFEFB] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="block w-full text-left px-3 py-2 text-base font-medium text-[#3A2A25] hover:bg-[#FFF9F1] rounded-lg"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsStoreInfoModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-[#C9785B] hover:bg-[#FFF9F1] rounded-lg"
          >
            Store Information, Shipping & FAQ
          </button>
        </div>
      )}
    </header>
  );
};
