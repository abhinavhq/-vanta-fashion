import React from 'react';
import { useShop } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, Sparkles, SlidersHorizontal, Sun, Moon, ShieldAlert } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cart,
    wishlist,
    toggleCart,
    toggleSearch,
    toggleAiAssistant,
    toggleOutfitBuilder,
    theme,
    toggleTheme
  } = useShop();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-300">
      {/* Top Editorial Ticker Bar */}
      <div className="bg-[#0f0f12] text-[#a1a1aa] text-[10px] sm:text-xs font-mono py-1.5 px-4 border-b border-[#27272a]/50 flex justify-between items-center overflow-hidden">
        <div className="flex items-center space-x-6 animate-marquee whitespace-nowrap">
          <span>PARIS • TOKYO • SEOUL • NEW YORK • MILAN</span>
          <span className="text-white/40">•</span>
          <span className="text-white font-medium">SS26 COLLECTION NOW LIVE</span>
          <span className="text-white/40">•</span>
          <span>FREE EXPRESS INTERNATIONAL SHIPPING OVER $200</span>
          <span className="text-white/40">•</span>
          <span className="text-[#d4af37]">USE CODE 'VANTA15' FOR 15% OFF</span>
        </div>
        <div className="hidden md:flex items-center space-x-4 pl-4 shrink-0 bg-[#0f0f12] border-l border-[#27272a]">
          <button
            onClick={() => setActiveView('admin')}
            className="hover:text-white transition-colors flex items-center space-x-1"
          >
            <ShieldAlert size={12} className="text-[#d4af37]" />
            <span>ATELIER ADMIN</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="glass-panel px-4 md:px-8 py-4 flex items-center justify-between transition-all">
        {/* Brand Logo */}
        <div className="flex items-center space-x-8">
          <button
            onClick={() => setActiveView('home')}
            className="group flex flex-col text-left focus:outline-none"
          >
            <span className="font-editorial text-2xl sm:text-3xl font-extrabold tracking-widest text-white group-hover:text-zinc-300 transition-colors">
              V A N T A
            </span>
            <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors">
              ATELIER METROPOLE
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 text-xs font-mono tracking-widest">
            <button
              onClick={() => setActiveView('shop')}
              className={`hover:text-white transition-colors uppercase ${
                activeView === 'shop' ? 'text-white border-b border-white pb-0.5' : 'text-zinc-400'
              }`}
            >
              COLLECTIONS
            </button>
            <button
              onClick={() => setActiveView('trending')}
              className={`hover:text-white transition-colors uppercase ${
                activeView === 'trending' ? 'text-white border-b border-white pb-0.5' : 'text-zinc-400'
              }`}
            >
              TREND REPORT
            </button>
            <button
              onClick={() => setActiveView('journal')}
              className={`hover:text-white transition-colors uppercase ${
                activeView === 'journal' ? 'text-white border-b border-white pb-0.5' : 'text-zinc-400'
              }`}
            >
              JOURNAL
            </button>
            <button
              onClick={() => toggleOutfitBuilder(true)}
              className="flex items-center space-x-1 text-[#d4af37] hover:text-amber-300 transition-colors uppercase"
            >
              <SlidersHorizontal size={13} />
              <span>OUTFIT BUILDER</span>
            </button>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* AI Assistant Quick Trigger */}
          <button
            onClick={() => toggleAiAssistant(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/60 text-xs text-white hover:bg-zinc-800 hover:border-zinc-500 transition-all shadow-md group"
            title="Open VANTA AI Stylist"
          >
            <Sparkles size={14} className="text-[#00f0ff] animate-pulse" />
            <span className="font-mono text-[11px] hidden sm:inline group-hover:text-[#00f0ff] transition-colors">
              VANTA AI
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Search Drawer Trigger */}
          <button
            onClick={() => toggleSearch(true)}
            className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            title="Search Fashion Trends"
          >
            <Search size={18} />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => setActiveView('wishlist')}
            className="relative p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            title="Wishlist"
          >
            <Heart size={18} className={wishlist.length > 0 ? 'text-red-400 fill-red-400/20' : ''} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-mono w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => toggleCart(true)}
            className="relative flex items-center space-x-2 px-3 py-1.5 bg-white text-black font-mono text-xs font-bold rounded-none hover:bg-zinc-200 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">BAG</span>
            <span>({cartItemCount})</span>
          </button>
        </div>
      </nav>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around py-2.5 px-4 bg-zinc-950/90 border-b border-zinc-800 text-[11px] font-mono tracking-wider text-zinc-400">
        <button
          onClick={() => setActiveView('shop')}
          className={activeView === 'shop' ? 'text-white font-bold' : ''}
        >
          COLLECTIONS
        </button>
        <button
          onClick={() => setActiveView('trending')}
          className={activeView === 'trending' ? 'text-white font-bold' : ''}
        >
          TRENDS
        </button>
        <button
          onClick={() => setActiveView('journal')}
          className={activeView === 'journal' ? 'text-white font-bold' : ''}
        >
          JOURNAL
        </button>
        <button
          onClick={() => toggleOutfitBuilder(true)}
          className="text-[#d4af37] font-bold"
        >
          OUTFIT BUILDER
        </button>
      </div>
    </header>
  );
};
