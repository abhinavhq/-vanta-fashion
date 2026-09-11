import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Heart } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, setActiveView } = useShop();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto min-h-[70vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-800 pb-6">
        <div>
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block mb-2">
            SAVED FASHION ARCHIVE
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            YOUR WISHLIST ({savedProducts.length})
          </h1>
        </div>

        <button
          onClick={() => setActiveView('shop')}
          className="mt-4 md:mt-0 px-6 py-2.5 bg-zinc-900 border border-zinc-800 text-white font-mono text-xs uppercase hover:bg-zinc-800"
        >
          CONTINUE EXPLORING
        </button>
      </div>

      {savedProducts.length === 0 ? (
        <div className="text-center py-24 bg-zinc-900/40 border border-zinc-800">
          <Heart size={48} className="mx-auto text-zinc-600 mb-4" />
          <h3 className="font-editorial text-2xl font-bold uppercase text-white mb-2">
            YOUR WISHLIST IS EMPTY
          </h3>
          <p className="font-body text-xs text-zinc-400 max-w-md mx-auto mb-6">
            Tap the heart icon on any product to save pieces to your private style folder.
          </p>
          <button
            onClick={() => setActiveView('shop')}
            className="px-8 py-3 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-zinc-200"
          >
            DISCOVER NEW DROPS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
