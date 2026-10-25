import React, { useState } from 'react';
import { BookOpen, Send, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { useBookstore } from '../context/BookstoreContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { setIsStoreInfoModalOpen, triggerToast } = useBookstore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    triggerToast('Thank you for subscribing to BookNest literary dispatches!', 'success');
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#3A2A25] text-[#FFF9F1] border-t border-[#523A33] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#523A33]">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#C9785B] text-white flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                BookNest
              </span>
            </div>
            <p className="text-xs text-[#F4D5C5]/80 leading-relaxed max-w-sm">
              An independent sanctuary dedicated to classic literature, Philippine heritage works, and the peaceful art of slow reading. Handcrafted with fine paper aesthetics and curated editions.
            </p>
            <div className="text-[11px] text-[#A9B79F] font-mono">
              Manila · Nationwide Courier Delivery · Est. 2026
            </div>
          </div>

          {/* Quick Nav (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#F4D5C5]/70">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors"
                >
                  Book Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('featured')}
                  className="hover:text-white transition-colors"
                >
                  Curator's Picks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About BookNest
                </button>
              </li>
            </ul>
          </div>

          {/* Curated Shelves (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Literary Shelves
            </h4>
            <ul className="space-y-2 text-xs text-[#F4D5C5]/70">
              <li>Philippine Classics</li>
              <li>Victorian Romance</li>
              <li>Gothic & Mystery</li>
              <li>Ancient Philosophy</li>
              <li>Modernist Prose</li>
            </ul>
          </div>

          {/* Newsletter & Customer Care (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Literary Dispatches
            </h4>
            <p className="text-xs text-[#F4D5C5]/80">
              Receive monthly essays on rare editions and Philippine literary history.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="flex-1 bg-[#2B1E1A] border border-[#523A33] rounded-lg px-3 py-2 text-xs text-white placeholder:text-[#988277] focus:outline-none focus:border-[#C9785B]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#C9785B] text-white rounded-lg hover:bg-[#B5674B] transition-colors text-xs font-medium flex items-center gap-1.5 shrink-0"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                <span>{subscribed ? 'Joined' : 'Subscribe'}</span>
              </button>
            </form>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setIsStoreInfoModalOpen(true)}
                className="text-xs text-[#F4D5C5] hover:text-white underline flex items-center gap-1"
              >
                <HelpCircle className="w-3 h-3 text-[#C9785B]" />
                <span>Shipping & Store Policies</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#988277] gap-4">
          <p>
            © {new Date().getFullYear()} BookNest Bookshop. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span>Independent Bookstore</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#C9785B]">Demonstration Store Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
