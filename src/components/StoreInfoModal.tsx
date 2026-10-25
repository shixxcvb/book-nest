import React, { useState } from 'react';
import { X, Truck, BookOpen, ShieldCheck, HelpCircle, Package, HeartHandshake, Sparkles } from 'lucide-react';
import { useBookstore } from '../context/BookstoreContext';

export const StoreInfoModal: React.FC = () => {
  const { isStoreInfoModalOpen, setIsStoreInfoModalOpen } = useBookstore();
  const [activeTab, setActiveTab] = useState<'shipping' | 'curation' | 'care' | 'notice'>('shipping');

  if (!isStoreInfoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <div
        className="relative bg-[#FFFEFB] border border-[#EADBCE] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#FFFEFB]/95 backdrop-blur-md px-6 py-4 border-b border-[#EADBCE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C9785B]" />
            <h3 className="font-serif text-lg font-bold text-[#3A2A25]">
              BookNest Store Information & Reader Guide
            </h3>
          </div>

          <button
            onClick={() => setIsStoreInfoModalOpen(false)}
            className="p-1.5 text-[#6B564E] hover:text-[#3A2A25] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-[#EADBCE] flex gap-4 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-2.5 transition-colors whitespace-nowrap relative flex items-center gap-1.5 ${
              activeTab === 'shipping' ? 'text-[#C9785B] font-bold' : 'text-[#6B564E] hover:text-[#3A2A25]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Shipping & Rates</span>
            {activeTab === 'shipping' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9785B]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('curation')}
            className={`pb-2.5 transition-colors whitespace-nowrap relative flex items-center gap-1.5 ${
              activeTab === 'curation' ? 'text-[#C9785B] font-bold' : 'text-[#6B564E] hover:text-[#3A2A25]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Curation Policy</span>
            {activeTab === 'curation' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9785B]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('care')}
            className={`pb-2.5 transition-colors whitespace-nowrap relative flex items-center gap-1.5 ${
              activeTab === 'care' ? 'text-[#C9785B] font-bold' : 'text-[#6B564E] hover:text-[#3A2A25]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Book Care & Packaging</span>
            {activeTab === 'care' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9785B]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('notice')}
            className={`pb-2.5 transition-colors whitespace-nowrap relative flex items-center gap-1.5 ${
              activeTab === 'notice' ? 'text-[#C9785B] font-bold' : 'text-[#6B564E] hover:text-[#3A2A25]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Store Notice</span>
            {activeTab === 'notice' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9785B]" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs text-[#6B564E] leading-relaxed">
              <h4 className="font-serif text-base font-bold text-[#3A2A25]">
                Nationwide Delivery Service Across the Philippines
              </h4>
              <p>
                Every parcel from BookNest is carefully hand-wrapped in protective, biodegradable honeycomb paper and sealed in reinforced mailers to ensure corners arrive pristine.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-[#FFF9F1] border border-[#EADBCE]">
                  <strong className="block text-[#3A2A25] font-serif text-sm mb-1">Standard Courier (₱95.00)</strong>
                  <ul className="space-y-1 text-[11px] list-disc list-inside">
                    <li>Metro Manila: 2–3 business days</li>
                    <li>Luzon Provinces: 3–4 business days</li>
                    <li>Visayas & Mindanao: 4–6 business days</li>
                    <li><strong>FREE</strong> on all orders above ₱1,500.00</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF9F1] border border-[#EADBCE]">
                  <strong className="block text-[#3A2A25] font-serif text-sm mb-1">Priority Book Express (₱160.00)</strong>
                  <ul className="space-y-1 text-[11px] list-disc list-inside">
                    <li>Metro Manila & nearby: 1–2 business days</li>
                    <li>Priority packaging and dispatch queue</li>
                    <li>Direct SMS courier tracking updates</li>
                    <li>Discounted to ₱65.00 on orders over ₱1,500</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'curation' && (
            <div className="space-y-4 text-xs text-[#6B564E] leading-relaxed">
              <h4 className="font-serif text-base font-bold text-[#3A2A25]">
                The BookNest Editorial Standard
              </h4>
              <p>
                We believe that the books you keep in your home should inspire thought, reflection, and delight. Our catalog focuses on two pillars:
              </p>
              <div className="space-y-3 pt-1">
                <div className="p-3.5 rounded-xl bg-[#FFF9F1] border border-[#EADBCE]">
                  <strong className="block text-[#3A2A25] text-sm font-serif mb-1">1. Philippine Heritage & Literary Classics</strong>
                  <p>
                    Celebrating national literary pillars including Dr. José Rizal’s <em>Noli Me Tángere</em> and <em>El Filibusterismo</em>, and Francisco Balagtas’ metrical romance <em>Florante at Laura</em>.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FFF9F1] border border-[#EADBCE]">
                  <strong className="block text-[#3A2A25] text-sm font-serif mb-1">2. Timeless World Literature & Philosophy</strong>
                  <p>
                    From Mary Shelley’s groundbreaking <em>Frankenstein</em> to the stoic reflections of Marcus Aurelius’ <em>Meditations</em> and Jane Austen’s witty domestic comedies.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-4 text-xs text-[#6B564E] leading-relaxed">
              <h4 className="font-serif text-base font-bold text-[#3A2A25]">
                Preserving Your Hardcover Volumes
              </h4>
              <p>
                A well-crafted book can endure for centuries. To ensure your editions remain beautiful:
              </p>
              <ul className="space-y-2 list-disc list-inside pt-1">
                <li>Keep books away from prolonged direct midday sunlight to avoid spine fading.</li>
                <li>Store books vertically on solid shelving with adequate support from bookends.</li>
                <li>Avoid pulling volumes off shelves by the top of their spine headbands; grip the book by the center of the spine.</li>
                <li>Every BookNest order arrives with a complimentary embossed bookmark to avoid dog-earing pages.</li>
              </ul>
            </div>
          )}

          {activeTab === 'notice' && (
            <div className="space-y-4 text-xs text-[#6B564E] leading-relaxed">
              <div className="p-4 rounded-xl bg-[#FFF9F1] border border-[#C9785B]/40">
                <h4 className="font-serif text-base font-bold text-[#3A2A25] mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C9785B]" />
                  <span>Demonstration Store Information</span>
                </h4>
                <p className="mt-1 leading-relaxed">
                  BookNest is an interactive digital demonstration store. While all shopping bag calculations, inventory bounds, and promo codes function in real-time, no monetary transactions are processed, no financial credentials are requested, and no actual packages are dispatched.
                </p>
              </div>

              <div className="text-[11px] text-[#988277]">
                Customer inquiries or demo support: <code className="font-mono text-[#3A2A25]">reader@booknest-books.com</code>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EADBCE] bg-[#FFF9F1] flex justify-end">
          <button
            onClick={() => setIsStoreInfoModalOpen(false)}
            className="px-5 py-2 bg-[#3A2A25] text-white text-xs font-semibold rounded-lg hover:bg-[#523A33] transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
