import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Check } from 'lucide-react';

const AESTHETICS_LIST = [
  { name: 'All Aesthetics', filterValue: null },
  { name: 'Korean Streetwear', filterValue: 'Korean Streetwear' },
  { name: 'Japanese Minimalism', filterValue: 'Japanese Minimalism' },
  { name: 'Y2K Revival', filterValue: 'Y2K Revival' },
  { name: 'Techwear', filterValue: 'Techwear' },
  { name: 'Quiet Luxury', filterValue: 'Quiet Luxury' },
  { name: 'Dark Academia', filterValue: 'Dark Academia' },
  { name: 'Clean Fit', filterValue: 'Clean Fit' },
  { name: 'Vintage Streetwear', filterValue: 'Vintage Streetwear' },
  { name: 'Futuristic Fashion', filterValue: 'Futuristic Fashion' },
];

export const AestheticSelector: React.FC = () => {
  const { selectedAestheticFilter, setSelectedAestheticFilter } = useShop();

  return (
    <div className="py-8 px-6 md:px-12 max-w-7xl mx-auto border-b border-zinc-800">
      <div className="flex items-center space-x-3 mb-6">
        <Sparkles size={16} className="text-[#00f0ff]" />
        <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
          SHOP BY AESTHETIC — INTERACTIVE SELECTOR
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {AESTHETICS_LIST.map((item, idx) => {
          const isSelected = selectedAestheticFilter === item.filterValue;
          return (
            <button
              key={idx}
              onClick={() => setSelectedAestheticFilter(item.filterValue)}
              className={`px-4 py-2.5 font-mono text-xs tracking-wider uppercase transition-all flex items-center space-x-2 border ${
                isSelected
                  ? 'bg-white text-black border-white font-bold shadow-lg shadow-white/10'
                  : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-zinc-500 hover:text-white'
              }`}
            >
              {isSelected && <Check size={14} className="text-black" />}
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
