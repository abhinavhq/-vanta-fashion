import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowUpRight, Sparkles } from 'lucide-react';

export const SearchDrawerModal: React.FC = () => {
  const { isSearchOpen, toggleSearch, products, openProductModal, setSelectedAestheticFilter, setActiveView } = useShop();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Korean jacket',
    'Wide-leg denim',
    'Japanese minimalist coat',
    'Tactical cargo',
    'Cashmere cardigan',
    'Y2K metallic bag',
  ];

  const filteredProducts = query.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.aesthetic.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectAesthetic = (aestheticName: string) => {
    setSelectedAestheticFilter(aestheticName);
    setActiveView('shop');
    toggleSearch(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#09090b] border-l border-zinc-800 h-full p-6 md:p-10 flex flex-col justify-between text-white overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest flex items-center space-x-2">
              <Sparkles size={14} />
              <span>GLOBAL FASHION SEARCH</span>
            </span>
            <button onClick={() => toggleSearch(false)} className="text-zinc-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products, trends, aesthetics, or styles..."
              autoFocus
              className="w-full bg-zinc-900 border-b-2 border-white px-4 py-4 text-lg md:text-xl text-white placeholder-zinc-500 focus:outline-none font-editorial tracking-wide"
            />
            <Search size={22} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          </div>

          {/* Popular Search Chips */}
          {!query && (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-3">
                  POPULAR SEARCHES
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 font-mono text-xs transition-colors flex items-center space-x-1.5"
                    >
                      <span>{term}</span>
                      <ArrowUpRight size={12} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-3">
                  FEATURED AESTHETICS
                </span>
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  {['Korean Streetwear', 'Japanese Minimalism', 'Techwear', 'Quiet Luxury'].map(aest => (
                    <button
                      key={aest}
                      onClick={() => handleSelectAesthetic(aest)}
                      className="p-3 bg-zinc-900 border border-zinc-800 hover:border-white text-left transition-colors flex justify-between items-center"
                    >
                      <span>{aest}</span>
                      <ArrowUpRight size={14} className="text-zinc-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results Display */}
          {query && (
            <div>
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-4">
                SEARCH RESULTS ({filteredProducts.length})
              </span>

              {filteredProducts.length === 0 ? (
                <p className="font-mono text-xs text-zinc-500 py-8">
                  No matching products found for "{query}". Try searching "Korean", "Denim", or "Jacket".
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        openProductModal(product.id);
                        toggleSearch(false);
                      }}
                      className="cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-white p-3 flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center space-x-4">
                        <img src={product.images[0]} alt="" className="w-12 h-16 object-cover bg-zinc-950" />
                        <div>
                          <span className="font-editorial text-sm font-bold text-white block group-hover:text-zinc-300">
                            {product.name}
                          </span>
                          <span className="font-mono text-xs text-zinc-400">{product.aesthetic}</span>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold text-white">${product.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
