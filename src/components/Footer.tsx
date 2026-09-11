import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, ShieldCheck, RefreshCw, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useShop();

  return (
    <footer className="bg-black text-white border-t border-zinc-800 font-mono text-xs">
      {/* Top Editorial Newsletter Bar */}
      <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-b border-zinc-800/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6">
          <span className="text-[#00f0ff] uppercase tracking-widest block mb-2 font-bold">
            JOIN THE ATELIER PRIVÉ
          </span>
          <h3 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            BE FIRST FOR NEW DROPS & PRIVATE LOOKBOOKS.
          </h3>
          <p className="font-body text-xs text-zinc-400 mt-2">
            Subscribe for early drop access, private runway invitations, and exclusive 15% subscriber discounts.
          </p>
        </div>

        <div className="lg:col-span-6">
          <form
            onSubmit={e => {
              e.preventDefault();
              alert('Thank you for subscribing to VANTA Atelier Privé.');
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              required
              placeholder="ENTER YOUR EMAIL ADDRESS..."
              className="flex-1 bg-zinc-900 border border-zinc-800 px-4 py-3.5 text-white placeholder-zinc-500 uppercase text-xs focus:outline-none focus:border-white font-mono"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-white text-black font-bold uppercase hover:bg-zinc-200 transition-colors flex items-center space-x-2"
            >
              <span>JOIN</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Directory Links */}
      <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <span className="font-editorial text-2xl font-black tracking-widest text-white block">
            V A N T A
          </span>
          <p className="font-body text-xs text-zinc-400 leading-relaxed">
            International fashion-tech platform creating the future of Gen-Z streetwear, Tokyo/Seoul aesthetics, and avant-garde luxury minimalism.
          </p>
          <div className="text-[11px] text-zinc-500 space-y-1">
            <p>ATELIERS: PARIS • TOKYO • SEOUL • NEW YORK</p>
            <p>© 2026 VANTA METROPOLE INC.</p>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <span className="text-white font-bold uppercase tracking-widest block mb-4 border-b border-zinc-800 pb-2">
            EXPLORE
          </span>
          <ul className="space-y-2 text-zinc-400">
            <li><button onClick={() => setActiveView('shop')} className="hover:text-white transition-colors">NEW DROPS & COLLECTIONS</button></li>
            <li><button onClick={() => setActiveView('trending')} className="hover:text-white transition-colors">WHAT'S TRENDING</button></li>
            <li><button onClick={() => setActiveView('journal')} className="hover:text-white transition-colors">VANTA JOURNAL MAGAZINE</button></li>
            <li><button onClick={() => setActiveView('wishlist')} className="hover:text-white transition-colors">PRIVATE WISHLIST ARCHIVE</button></li>
          </ul>
        </div>

        {/* Col 3: Aesthetics */}
        <div>
          <span className="text-white font-bold uppercase tracking-widest block mb-4 border-b border-zinc-800 pb-2">
            AESTHETICS
          </span>
          <ul className="space-y-2 text-zinc-400">
            <li><span>KOREAN STREETWEAR</span></li>
            <li><span>JAPANESE MINIMALISM</span></li>
            <li><span>TECHWEAR & UTILITY</span></li>
            <li><span>QUIET LUXURY</span></li>
            <li><span>Y2K CYBER REVIVAL</span></li>
          </ul>
        </div>

        {/* Col 4: Sustainability & Guarantees */}
        <div>
          <span className="text-white font-bold uppercase tracking-widest block mb-4 border-b border-zinc-800 pb-2">
            ATELIER COMMITMENT
          </span>
          <div className="space-y-3 text-zinc-400 text-[11px]">
            <div className="flex items-start space-x-2">
              <ShieldCheck size={16} className="text-[#00f0ff] shrink-0 mt-0.5" />
              <span>100% Authenticity Guaranteed on Japanese & Korean Textiles</span>
            </div>
            <div className="flex items-start space-x-2">
              <RefreshCw size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
              <span>14-Day Global Express Returns & Size Exchange</span>
            </div>
            <div className="flex items-start space-x-2">
              <Globe size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>Carbon Neutral Express Shipping Worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[10px] text-zinc-500 max-w-7xl mx-auto">
        <span>ALL RIGHTS RESERVED • VANTA ATELIER METROPOLE</span>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <span>PRIVACY POLICY</span>
          <span>TERMS OF SERVICE</span>
          <span>SUSTAINABILITY MANIFESTO</span>
        </div>
      </div>
    </footer>
  );
};
