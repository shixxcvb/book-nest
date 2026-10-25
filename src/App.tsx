/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookstoreProvider } from './context/BookstoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FeaturedSection } from './components/FeaturedSection';
import { CatalogSection } from './components/CatalogSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { BookDetailModal } from './components/BookDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StoreInfoModal } from './components/StoreInfoModal';
import { Toast } from './components/Toast';

const BookstoreApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectGenre = (genre: string) => {
    setSelectedGenre(genre);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F1] text-[#3A2A25] flex flex-col font-sans selection:bg-[#F4D5C5]">
      {/* 3-Zone Top Navigation with Announcement Bar */}
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Editorial Hero */}
        <div id="home">
          <Hero
            onExploreClick={() => scrollToSection('catalog')}
            onRecommendedClick={() => scrollToSection('featured')}
          />
        </div>

        {/* Categories Section */}
        <CategorySection
          selectedGenre={selectedGenre}
          onSelectGenre={handleSelectGenre}
        />

        {/* Featured Masterpieces & New Arrivals */}
        <FeaturedSection />

        {/* Comprehensive Catalog with Real Multi-Facet Filtering */}
        <CatalogSection
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />

        {/* About BookNest Section */}
        <AboutSection onExploreShelves={() => scrollToSection('catalog')} />
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Modals & Drawers */}
      <BookDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <StoreInfoModal />

      {/* Real-time Toast Feedback */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <BookstoreProvider>
      <BookstoreApp />
    </BookstoreProvider>
  );
}
