import React, { useState } from 'react';
import type { Product } from '../data/fashionData';
import { useShop } from '../context/ShopContext';
import { ThreeDCard } from './ThreeDCard';
import { Heart, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductModal, addToCart, isInWishlist, toggleWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');

  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, selectedSize, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <ThreeDCard maxDegree={10}>
      <div
        onClick={() => openProductModal(product.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative cursor-pointer bg-[#121215] border border-[#27272a] hover:border-zinc-500 transition-all duration-300 flex flex-col justify-between h-full"
      >
        {/* Product Image Gallery Box */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
          {/* Main Image */}
          <img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center filter contrast-[1.03] transition-all duration-700 group-hover:scale-105"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && (
              <span className="px-2.5 py-0.5 bg-white text-black font-mono text-[9px] font-bold uppercase tracking-widest">
                NEW DROP
              </span>
            )}
            {product.isTrending && (
              <span className="px-2.5 py-0.5 bg-[#00f0ff] text-black font-mono text-[9px] font-bold uppercase tracking-widest">
                TRENDING
              </span>
            )}
            {product.originalPrice && (
              <span className="px-2.5 py-0.5 bg-red-600 text-white font-mono text-[9px] font-bold uppercase tracking-widest">
                SALE
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all"
            title="Save to Wishlist"
          >
            <Heart size={15} className={isSaved ? 'text-red-500 fill-red-500' : ''} />
          </button>

          {/* Hover Quick Action Drawer Bar */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-black/80 backdrop-blur-md border-t border-white/10 flex flex-col gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            {/* Quick Size Selector */}
            <div className="flex items-center justify-center space-x-1.5 overflow-x-auto py-1">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`text-[10px] font-mono px-2 py-1 border transition-colors ${
                    selectedSize === size
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-zinc-900/80 text-zinc-300 border-zinc-700 hover:border-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={handleQuickAdd}
              className="w-full py-2 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={14} />
              <span>QUICK ADD — ${product.price}</span>
            </button>
          </div>
        </div>

        {/* Product Content Details */}
        <div className="p-4 flex flex-col justify-between flex-1 bg-[#121215]">
          <div>
            {/* Category & Aesthetic Tag */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
              <span>{product.aesthetic}</span>
              <span className="flex items-center space-x-1 text-amber-400">
                <Star size={10} className="fill-amber-400" />
                <span>{product.rating}</span>
              </span>
            </div>

            {/* Title */}
            <h3 className="font-editorial text-base font-bold text-white group-hover:text-zinc-300 transition-colors line-clamp-1">
              {product.name}
            </h3>

            <p className="font-body text-xs text-zinc-400 line-clamp-1 mt-0.5">
              {product.subtitle}
            </p>
          </div>

          {/* Footer info: Colors & Price */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            {/* Color swatches */}
            <div className="flex items-center space-x-1.5">
              {product.colors.map(color => (
                <span
                  key={color.name}
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedColor(color.name);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                    selectedColor === color.name ? 'scale-125 border-white ring-1 ring-white' : 'border-zinc-600'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>

            {/* Pricing */}
            <div className="font-mono text-xs font-bold text-right">
              {product.originalPrice ? (
                <div className="flex items-center space-x-1.5">
                  <span className="text-zinc-500 line-through">${product.originalPrice}</span>
                  <span className="text-red-400">${product.price}</span>
                </div>
              ) : (
                <span className="text-white">${product.price}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ThreeDCard>
  );
};
