import React, { useState } from 'react';
import { MOCK_LOOKBOOKS } from '../data/fashionData';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Plus, Sparkles } from 'lucide-react';

export const LookbookSection: React.FC = () => {
  const { openProductModal } = useShop();
  const [activeLookbookIndex, setActiveLookbookIndex] = useState(0);
  const activeLook = MOCK_LOOKBOOKS[activeLookbookIndex];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-800 pb-6">
        <div>
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block mb-2">
            02 / VISUAL CAMPAIGN
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            STYLE LOOKBOOK
          </h2>
        </div>

        {/* Lookbook Collection Tabs */}
        <div className="mt-6 md:mt-0 flex flex-wrap gap-2 font-mono text-xs">
          {MOCK_LOOKBOOKS.map((look, idx) => (
            <button
              key={look.id}
              onClick={() => setActiveLookbookIndex(idx)}
              className={`px-4 py-2 uppercase border transition-all ${
                activeLookbookIndex === idx
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600'
              }`}
            >
              {look.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Full-Bleed Shoppable Lookbook Container */}
      <div className="relative w-full rounded-none overflow-hidden bg-zinc-900 border border-zinc-800">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full">
          <img
            src={activeLook.coverImage}
            alt={activeLook.title}
            className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Interactive Shoppable Hotspots */}
          {activeLook.hotspots.map((spot, idx) => (
            <div
              key={idx}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              onClick={() => openProductModal(spot.productId)}
            >
              {/* Pulsing Target Dot */}
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-6 w-6 bg-white text-black items-center justify-center shadow-lg font-bold text-xs">
                  <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                </span>
              </div>

              {/* Hover Product Label Popup */}
              <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-30 whitespace-nowrap">
                <div className="bg-black/90 text-white border border-white/20 px-3 py-1.5 text-xs font-mono backdrop-blur-md shadow-2xl flex items-center space-x-2">
                  <ShoppingBag size={12} className="text-[#00f0ff]" />
                  <span>{spot.label}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom Campaign Metadata Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 flex flex-col md:flex-row md:items-end justify-between z-10 text-white">
            <div className="max-w-xl">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-widest border border-white/20 mb-3 inline-block">
                {activeLook.season} • {activeLook.collection}
              </span>
              <h3 className="font-editorial text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-lg">
                {activeLook.title}
              </h3>
              <p className="font-body text-sm text-zinc-300 mt-2 line-clamp-2">
                {activeLook.description}
              </p>
            </div>

            <div className="mt-4 md:mt-0 font-mono text-xs text-zinc-300 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10">
              <Sparkles size={14} className="text-[#d4af37]" />
              <span>CLICK HOTSPOTS TO SHOP THE LOOK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
