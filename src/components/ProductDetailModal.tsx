import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import type { Product } from '../data/fashionData';
import { ThreeDGarmentViewer } from './ThreeDGarmentViewer';
import { X, Heart, ShoppingBag, Star, Sparkles, ChevronRight, Info, Box } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductId,
    closeProductModal,
    products,
    addToCart,
    addMultipleToCart,
    isInWishlist,
    toggleWishlist,
    openProductModal
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [is3DMode, setIs3DMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'fit' | 'material' | 'shipping'>('fit');

  if (!selectedProductId) return null;

  const product = products.find(p => p.id === selectedProductId);
  if (!product) return null;

  const currentColor = selectedColor || product.colors[0]?.name || '';
  const currentSize = selectedSize || product.sizes[0] || 'M';
  const isSaved = isInWishlist(product.id);

  // Recommended "Style It With" products
  const styleWithProducts = product.styleWithIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  const handleAddToCart = () => {
    addToCart(product, currentColor, currentSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, currentColor, currentSize, quantity);
    closeProductModal();
  };

  const handleAddBundle = () => {
    const bundleItems = [
      { product, color: currentColor, size: currentSize },
      ...styleWithProducts.map(p => ({
        product: p,
        color: p.colors[0]?.name || '',
        size: p.sizes[0] || 'M'
      }))
    ];
    addMultipleToCart(bundleItems);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-[#09090b] border border-zinc-800 my-auto shadow-2xl text-white overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          title="Close Modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery or 3D Model Viewer */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails list */}
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-y-auto">
              <button
                onClick={() => setIs3DMode(true)}
                className={`w-16 h-20 bg-zinc-900 border transition-all flex flex-col items-center justify-center text-[10px] font-mono text-[#00f0ff] p-1 shrink-0 ${
                  is3DMode ? 'border-[#00f0ff] bg-zinc-800 font-bold' : 'border-zinc-700 opacity-80 hover:opacity-100'
                }`}
              >
                <Box size={18} />
                <span className="mt-1">3D VIEW</span>
              </button>

              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIs3DMode(false);
                    setActiveImageIndex(idx);
                  }}
                  className={`w-16 h-20 bg-zinc-900 border transition-all overflow-hidden shrink-0 ${
                    !is3DMode && activeImageIndex === idx ? 'border-white ring-1 ring-white' : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Featured Image or 3D WebGL Canvas */}
            <div className="relative flex-1 aspect-[3/4] bg-zinc-900 border border-zinc-800 overflow-hidden group">
              {is3DMode ? (
                <ThreeDGarmentViewer productName={product.name} />
              ) : (
                <>
                  <img
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover filter contrast-[1.04]"
                  />
                  <button
                    onClick={() => setIs3DMode(true)}
                    className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-[#00f0ff] border border-white/10 flex items-center space-x-1 hover:bg-white hover:text-black transition-colors"
                  >
                    <Box size={12} />
                    <span>LAUNCH 3D SILHOUETTE VIEWPORT</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span className="text-[#00f0ff] uppercase">{product.aesthetic}</span>
                <span className="flex items-center space-x-1 text-amber-400">
                  <Star size={12} className="fill-amber-400" />
                  <span>{product.rating} ({product.reviewsCount} REVIEWS)</span>
                </span>
              </div>

              {/* Product Title */}
              <h2 className="font-editorial text-3xl font-black uppercase text-white tracking-tight">
                {product.name}
              </h2>
              <p className="font-body text-xs text-zinc-400 mt-1">
                {product.subtitle}
              </p>

              {/* Price & Stock */}
              <div className="mt-4 flex items-baseline space-x-3 font-mono">
                <span className="text-2xl font-bold text-white">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-base text-zinc-500 line-through">${product.originalPrice}</span>
                )}
                <span className="ml-auto text-[11px] px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {product.stockCount < 10 ? `LOW STOCK: ONLY ${product.stockCount} LEFT` : 'IN STOCK'}
                </span>
              </div>

              <p className="font-body text-sm text-zinc-300 mt-4 leading-relaxed border-t border-zinc-800 pt-4">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mt-6">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-2">
                  COLOR: <span className="text-white font-bold">{currentColor}</span>
                </span>
                <div className="flex items-center space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`px-3 py-1.5 font-mono text-xs border transition-all flex items-center space-x-2 ${
                        currentColor === color.name
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-zinc-500" style={{ backgroundColor: color.hex }} />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector & Size Guide */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                    SIZE: <span className="text-white font-bold">{currentSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="font-mono text-[11px] text-[#00f0ff] underline flex items-center space-x-1"
                  >
                    <Info size={12} />
                    <span>SIZE GUIDE</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 border text-center transition-all ${
                        currentSize === size
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-6 border-t border-zinc-800">
              <div className="flex space-x-3">
                {/* Quantity Control */}
                <div className="flex items-center border border-zinc-800 bg-zinc-900 font-mono text-xs text-white">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-3 hover:bg-zinc-800"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-3 hover:bg-zinc-800"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingBag size={16} />
                  <span>ADD TO BAG — ${(product.price * quantity).toFixed(0)}</span>
                </button>

                {/* Wishlist Toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 border transition-colors ${
                    isSaved ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart size={18} className={isSaved ? 'fill-red-500' : ''} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-zinc-900 border border-zinc-700 text-white font-mono text-xs font-bold uppercase hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-2"
              >
                <span>EXPRESS CHECKOUT</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Product Specifications Tabs */}
            <div className="border-t border-zinc-800 pt-4 font-body text-xs">
              <div className="flex border-b border-zinc-800 font-mono text-[11px] mb-3">
                <button
                  onClick={() => setActiveTab('fit')}
                  className={`pb-2 mr-6 uppercase ${activeTab === 'fit' ? 'text-white border-b-2 border-white font-bold' : 'text-zinc-500'}`}
                >
                  FIT & SILHOUETTE
                </button>
                <button
                  onClick={() => setActiveTab('material')}
                  className={`pb-2 mr-6 uppercase ${activeTab === 'material' ? 'text-white border-b-2 border-white font-bold' : 'text-zinc-500'}`}
                >
                  FABRIC & CARE
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 uppercase ${activeTab === 'shipping' ? 'text-white border-b-2 border-white font-bold' : 'text-zinc-500'}`}
                >
                  SHIPPING & RETURNS
                </button>
              </div>

              {activeTab === 'fit' && <p className="text-zinc-300">{product.fitInfo}</p>}
              {activeTab === 'material' && <p className="text-zinc-300">{product.materialInfo}</p>}
              {activeTab === 'shipping' && (
                <p className="text-zinc-300">
                  Free express courier shipping on orders over $200. Standard 14-day hassle-free global returns.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* STYLE IT WITH - Curated Bundle Section */}
        {styleWithProducts.length > 0 && (
          <div className="border-t border-zinc-800 p-6 md:p-10 bg-zinc-950">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-widest block">
                  COMPLETE THE LOOK
                </span>
                <h3 className="font-editorial text-2xl font-bold uppercase text-white">
                  STYLE IT WITH
                </h3>
              </div>
              <button
                onClick={handleAddBundle}
                className="px-4 py-2 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-zinc-200 transition-colors flex items-center space-x-2"
              >
                <Sparkles size={14} />
                <span>ADD ENTIRE OUTFIT BUNDLE TO BAG</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {styleWithProducts.map(item => (
                <div
                  key={item.id}
                  onClick={() => openProductModal(item.id)}
                  className="cursor-pointer bg-zinc-900 border border-zinc-800 p-3 hover:border-zinc-600 transition-all flex items-center space-x-3"
                >
                  <img src={item.images[0]} alt="" className="w-14 h-16 object-cover bg-zinc-950" />
                  <div>
                    <span className="font-editorial text-xs font-bold text-white block line-clamp-1">
                      {item.name}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">${item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal Overlay */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-[#09090b] border border-zinc-800 p-8 max-w-lg w-full text-white font-mono">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-editorial text-xl font-bold uppercase">VANTA SIZE MATRIX</h4>
              <button onClick={() => setShowSizeGuide(false)} className="text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-700 text-zinc-400">
                  <th className="py-2">SIZE</th>
                  <th className="py-2">CHEST (IN)</th>
                  <th className="py-2">WAIST (IN)</th>
                  <th className="py-2">LENGTH (IN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr><td className="py-2.5 font-bold">S</td><td>36 - 38</td><td>28 - 30</td><td>27.5</td></tr>
                <tr><td className="py-2.5 font-bold">M</td><td>40 - 42</td><td>32 - 34</td><td>28.5</td></tr>
                <tr><td className="py-2.5 font-bold">L</td><td>44 - 46</td><td>36 - 38</td><td>29.5</td></tr>
                <tr><td className="py-2.5 font-bold">XL</td><td>48 - 50</td><td>40 - 42</td><td>30.5</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
