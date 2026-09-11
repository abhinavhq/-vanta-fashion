import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import type { Product } from '../data/fashionData';
import { X, Sparkles, ShoppingBag } from 'lucide-react';

export const AiOutfitBuilderModal: React.FC = () => {
  const { isOutfitBuilderOpen, toggleOutfitBuilder, products, addMultipleToCart } = useShop();

  const [gender, setGender] = useState('unisex');
  const [occasion, setOccasion] = useState('Streetwear');
  const [aesthetic, setAesthetic] = useState('Korean Streetwear');
  const [weather, setWeather] = useState('Cold / Autumn');
  const [colorPref, setColorPref] = useState('Monochrome Obsidian');
  const [budget, setBudget] = useState(600);

  const [generatedOutfit, setGeneratedOutfit] = useState<Product[] | null>(null);

  if (!isOutfitBuilderOpen) return null;

  const handleGenerateOutfit = () => {
    // Select 3 to 4 matching products
    const filtered = products.filter(
      p => p.aesthetic === aesthetic || p.aesthetic === 'Korean Streetwear' || p.aesthetic === 'Japanese Minimalism'
    );
    const top = filtered.find(p => p.category === 'Outerwear' || p.category === 'Hoodies & Sweatshirts') || products[0];
    const bottom = filtered.find(p => p.category === 'Pants' || p.category === 'Denim') || products[4];
    const shoes = filtered.find(p => p.category === 'Footwear') || products[7];
    const accessory = filtered.find(p => p.category === 'Accessories') || products[9];

    setGeneratedOutfit([top, bottom, shoes, accessory]);
  };

  const totalPrice = generatedOutfit ? generatedOutfit.reduce((acc, p) => acc + p.price, 0) : 0;

  const handleAddOutfitToCart = () => {
    if (!generatedOutfit) return;
    const items = generatedOutfit.map(p => ({
      product: p,
      color: p.colors[0]?.name || '',
      size: p.sizes[0] || 'M'
    }));
    addMultipleToCart(items);
    toggleOutfitBuilder(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-[#09090b] border border-zinc-800 shadow-2xl p-6 md:p-10 text-white overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => toggleOutfitBuilder(false)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-[#d4af37] font-mono text-xs uppercase mb-1">
            <Sparkles size={16} />
            <span>AI STYLING ALGORITHM</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            INTERACTIVE OUTFIT BUILDER
          </h2>
          <p className="font-body text-xs text-zinc-400 mt-1">
            Configure your style parameters. VANTA AI will curate a complete 4-piece ensemble.
          </p>
        </div>

        {/* Form Configuration Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 font-mono text-xs">
          {/* Gender */}
          <div>
            <label className="text-zinc-400 uppercase tracking-widest block mb-2">STYLE PREFERENCE</label>
            <div className="flex gap-2">
              {['unisex', 'men', 'women'].map(g => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 uppercase border ${
                    gender === g ? 'bg-white text-black border-white font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Aesthetic */}
          <div>
            <label className="text-zinc-400 uppercase tracking-widest block mb-2">TARGET AESTHETIC</label>
            <select
              value={aesthetic}
              onChange={e => setAesthetic(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white uppercase focus:outline-none focus:border-white"
            >
              <option value="Korean Streetwear">Korean Streetwear</option>
              <option value="Japanese Minimalism">Japanese Minimalism</option>
              <option value="Techwear">Techwear</option>
              <option value="Quiet Luxury">Quiet Luxury</option>
              <option value="Y2K Revival">Y2K Revival</option>
            </select>
          </div>

          {/* Occasion */}
          <div>
            <label className="text-zinc-400 uppercase tracking-widest block mb-2">OCCASION</label>
            <select
              value={occasion}
              onChange={e => setOccasion(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white uppercase focus:outline-none focus:border-white"
            >
              <option value="Streetwear">Streetwear & Everyday</option>
              <option value="Date Night">Date Night / Evening</option>
              <option value="Atelier Formal">Atelier Tailored</option>
              <option value="Travel">Airport & Travel</option>
            </select>
          </div>

          {/* Weather */}
          <div>
            <label className="text-zinc-400 uppercase tracking-widest block mb-2">CLIMATE / WEATHER</label>
            <select
              value={weather}
              onChange={e => setWeather(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white uppercase focus:outline-none focus:border-white"
            >
              <option value="Cold / Autumn">Cold / Autumn Layers</option>
              <option value="Mild">Mild Transitional</option>
              <option value="Warm / Summer">Warm Summer</option>
            </select>
          </div>

          {/* Color Preference */}
          <div>
            <label className="text-zinc-400 uppercase tracking-widest block mb-2">COLOR PALETTE</label>
            <select
              value={colorPref}
              onChange={e => setColorPref(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white uppercase focus:outline-none focus:border-white"
            >
              <option value="Monochrome Obsidian">Monochrome Obsidian</option>
              <option value="Neutral Sand">Neutral Sand & Cream</option>
              <option value="Earthy Olive">Earthy Olive & Slate</option>
              <option value="Cyber Silver">Cyber Silver & Indigo</option>
            </select>
          </div>

          {/* Budget Slider */}
          <div>
            <label className="text-zinc-400 uppercase tracking-widest flex justify-between mb-2">
              <span>MAX BUDGET</span>
              <span className="text-white font-bold">${budget}</span>
            </label>
            <input
              type="range"
              min="200"
              max="1200"
              step="50"
              value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              className="w-full accent-white cursor-pointer"
            />
          </div>
        </div>

        {/* Generate CTA */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={handleGenerateOutfit}
            className="px-8 py-4 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-zinc-200 transition-colors flex items-center space-x-2 shadow-xl"
          >
            <Sparkles size={16} />
            <span>GENERATE COMPLETE LOOK</span>
          </button>
        </div>

        {/* Output Ensemble Display */}
        {generatedOutfit && (
          <div className="border-t border-zinc-800 pt-8 bg-zinc-950 p-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
              <div>
                <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block">
                  GENERATED LOOK • {aesthetic.toUpperCase()}
                </span>
                <h3 className="font-editorial text-2xl font-bold uppercase text-white">
                  CURATED OUTFIT ENSEMBLE
                </h3>
              </div>
              <div className="mt-2 md:mt-0 font-mono text-right">
                <span className="text-xs text-zinc-400 block">TOTAL ENSEMBLE PRICE</span>
                <span className="text-2xl font-bold text-white">${totalPrice}</span>
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {generatedOutfit.map(item => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-3">
                  <img src={item.images[0]} alt="" className="w-full aspect-[3/4] object-cover mb-2" />
                  <span className="font-editorial text-xs font-bold text-white block truncate">{item.name}</span>
                  <span className="font-mono text-[11px] text-zinc-400">${item.price}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddOutfitToCart}
              className="w-full py-4 bg-[#00f0ff] text-black font-mono text-xs font-bold uppercase hover:bg-cyan-300 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={16} />
              <span>ADD COMPLETE LOOK TO CART (${totalPrice})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
