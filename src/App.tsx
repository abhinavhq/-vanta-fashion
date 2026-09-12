import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrendingAestheticsSection } from './components/TrendingAestheticsSection';
import { ProductCard } from './components/ProductCard';
import { TrendReportSection } from './components/TrendReportSection';
import { LookbookSection } from './components/LookbookSection';
import { AestheticSelector } from './components/AestheticSelector';
import { ProductDetailModal } from './components/ProductDetailModal';
import { VantaAiAssistant } from './components/VantaAiAssistant';
import { AiOutfitBuilderModal } from './components/AiOutfitBuilderModal';
import { SearchDrawerModal } from './components/SearchDrawerModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistPage } from './components/WishlistPage';
import { JournalPage } from './components/JournalPage';
import { TrendingPage } from './components/TrendingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { Cursor3D } from './components/Cursor3D';
import { Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    activeView,
    products,
    selectedAestheticFilter,
    setSelectedAestheticFilter,
    userStyleProfile,
    toggleOutfitBuilder
  } = useShop();

  // Filtered Products
  const filteredProducts = selectedAestheticFilter
    ? products.filter(p => p.aesthetic === selectedAestheticFilter)
    : products;

  // Personalization "PICKED FOR YOU" products based on user browsing profile
  const personalizedProducts = products.filter(
    p => userStyleProfile.favoriteAesthetics.includes(p.aesthetic) || p.isTrending
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-white selection:text-black">
      {/* 3D Glowing Interactive Cursor */}
      <Cursor3D />

      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            {/* 1. Full-screen Editorial Hero */}
            <Hero />

            {/* 2. Interactive Shop by Aesthetic Selector */}
            <AestheticSelector />

            {/* 3. TRENDING NOW (12 Categories) */}
            <TrendingAestheticsSection />

            {/* 4. NEW DROPS (Product Grid) */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-800 pb-6">
                <div>
                  <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block mb-2">
                    03 / CURATED CATALOG
                  </span>
                  <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
                    {selectedAestheticFilter ? selectedAestheticFilter.toUpperCase() : 'NEW DROPS'}
                  </h2>
                </div>

                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                  <span className="font-mono text-xs text-zinc-400">
                    SHOWING {filteredProducts.length} PIECES
                  </span>
                  {selectedAestheticFilter && (
                    <button
                      onClick={() => setSelectedAestheticFilter(null)}
                      className="text-xs font-mono text-[#00f0ff] underline uppercase"
                    >
                      SHOW ALL
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* 5. THE TREND REPORT (Magazine Section) */}
            <TrendReportSection />

            {/* 6. STYLE LOOKBOOK (Interactive Hotspots) */}
            <LookbookSection />

            {/* 7. PERSONALIZATION ENGINE — "PICKED FOR YOU" */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-800">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <span className="font-mono text-xs text-[#d4af37] uppercase tracking-widest block mb-1 flex items-center space-x-1.5">
                    <Sparkles size={14} />
                    <span>VANTA PERSONALIZATION ENGINE</span>
                  </span>
                  <h3 className="font-editorial text-3xl font-bold uppercase text-white">
                    PICKED FOR YOUR STYLE PROFILE
                  </h3>
                </div>
                <button
                  onClick={() => toggleOutfitBuilder(true)}
                  className="hidden sm:flex px-4 py-2 bg-zinc-900 border border-zinc-700 text-white font-mono text-xs uppercase hover:bg-zinc-800"
                >
                  BUILD CUSTOM OUTFIT
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {personalizedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </>
        )}

        {/* SHOP / COLLECTIONS VIEW */}
        {activeView === 'shop' && (
          <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="mb-10">
              <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block mb-2">
                COMPLETE CATALOGUE
              </span>
              <h1 className="font-editorial text-4xl sm:text-7xl font-black uppercase text-white">
                ALL COLLECTIONS
              </h1>
            </div>

            <AestheticSelector />

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* WHAT'S TRENDING VIEW */}
        {activeView === 'trending' && <TrendingPage />}

        {/* JOURNAL VIEW */}
        {activeView === 'journal' && <JournalPage />}

        {/* WISHLIST VIEW */}
        {activeView === 'wishlist' && <WishlistPage />}

        {/* ADMIN DASHBOARD VIEW */}
        {activeView === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating Modals & Drawers */}
      <ProductDetailModal />
      <VantaAiAssistant />
      <AiOutfitBuilderModal />
      <SearchDrawerModal />
      <CartDrawer />

      <Footer />
    </div>
  );
};

export function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}

export default App;
