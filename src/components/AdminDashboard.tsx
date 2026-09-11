import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import type { Product } from '../data/fashionData';
import { Plus, Trash2, ShieldCheck, X } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { products, addProduct, deleteProduct, setActiveView } = useShop();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState(180);
  const [category, setCategory] = useState('Outerwear');
  const [aesthetic, setAesthetic] = useState('Korean Streetwear');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80');
  const [stockCount, setStockCount] = useState(10);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `van-${Date.now()}`,
      name,
      subtitle: 'Atelier limited edition release',
      price: Number(price),
      category,
      gender: 'unisex',
      aesthetic,
      description: 'Crafted with premium materials for modern Gen-Z streetwear silhouettes.',
      images: [imageUrl, imageUrl],
      colors: [{ name: 'Obsidian Black', hex: '#0a0a0b' }],
      sizes: ['S', 'M', 'L', 'XL'],
      stockCount: Number(stockCount),
      rating: 5.0,
      reviewsCount: 1,
      isNew: true,
      isTrending: true,
      fitInfo: 'Relaxed oversized fit.',
      materialInfo: '100% Premium Cotton Blend.',
      styleWithIds: [],
      createdAt: new Date().toISOString()
    };

    addProduct(newProd);
    setIsAddModalOpen(false);
    alert('New Product successfully published to VANTA store!');
  };

  return (
    <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[#d4af37] font-mono text-xs uppercase mb-2">
            <ShieldCheck size={16} />
            <span>ADMINISTRATOR CONTROL PANEL</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            ATELIER DASHBOARD
          </h1>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-zinc-200 transition-colors flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>ADD NEW PRODUCT</span>
          </button>
          <button
            onClick={() => setActiveView('shop')}
            className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-white font-mono text-xs uppercase hover:bg-zinc-800"
          >
            VIEW STORE
          </button>
        </div>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 font-mono">
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <span className="text-xs text-zinc-400 block mb-1">TOTAL REVENUE (MTD)</span>
          <span className="text-3xl font-bold text-white">$142,850</span>
          <span className="text-[10px] text-emerald-400 block mt-2">↑ +18.4% vs last month</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <span className="text-xs text-zinc-400 block mb-1">ORDERS FULFILLED</span>
          <span className="text-3xl font-bold text-white">1,240</span>
          <span className="text-[10px] text-emerald-400 block mt-2">↑ 98.6% delivery success</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <span className="text-xs text-zinc-400 block mb-1">STORE CONVERSION RATE</span>
          <span className="text-3xl font-bold text-[#00f0ff]">3.85%</span>
          <span className="text-[10px] text-zinc-400 block mt-2">Top 5% fashion benchmarks</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <span className="text-xs text-zinc-400 block mb-1">INVENTORY ALERTS</span>
          <span className="text-3xl font-bold text-amber-400">4 ITEMS</span>
          <span className="text-[10px] text-amber-400 block mt-2">Low stock threshold reached</span>
        </div>
      </div>

      {/* Product Inventory Management Table */}
      <div className="bg-zinc-900 border border-zinc-800 p-6">
        <h3 className="font-editorial text-2xl font-bold uppercase text-white mb-6">
          PRODUCT INVENTORY CATALOG ({products.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400">
                <th className="py-3 px-2">PRODUCT</th>
                <th className="py-3 px-2">CATEGORY</th>
                <th className="py-3 px-2">AESTHETIC</th>
                <th className="py-3 px-2">PRICE</th>
                <th className="py-3 px-2">STOCK</th>
                <th className="py-3 px-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-zinc-800/50">
                  <td className="py-3 px-2 flex items-center space-x-3">
                    <img src={p.images[0]} alt="" className="w-10 h-12 object-cover bg-zinc-950" />
                    <div>
                      <span className="font-bold text-white block">{p.name}</span>
                      <span className="text-[10px] text-zinc-400">{p.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-zinc-300">{p.category}</td>
                  <td className="py-3 px-2 text-[#00f0ff]">{p.aesthetic}</td>
                  <td className="py-3 px-2 font-bold text-white">${p.price}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-0.5 ${p.stockCount < 10 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {p.stockCount} UNITS
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#09090b] border border-zinc-800 p-8 max-w-xl w-full text-white font-mono">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-editorial text-2xl font-bold uppercase">CREATE NEW ATELIER PRODUCT</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-400 uppercase block mb-1">PRODUCT NAME</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Harajuku Oversized Parka"
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 uppercase block mb-1">PRICE ($)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 uppercase block mb-1">STOCK COUNT</label>
                  <input
                    type="number"
                    required
                    value={stockCount}
                    onChange={e => setStockCount(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 uppercase block mb-1">CATEGORY</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-white"
                  >
                    <option value="Outerwear">Outerwear</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Hoodies & Sweatshirts">Hoodies & Sweatshirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Denim">Denim</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 uppercase block mb-1">AESTHETIC</label>
                  <select
                    value={aesthetic}
                    onChange={e => setAesthetic(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-white"
                  >
                    <option value="Korean Streetwear">Korean Streetwear</option>
                    <option value="Japanese Minimalism">Japanese Minimalism</option>
                    <option value="Techwear">Techwear</option>
                    <option value="Quiet Luxury">Quiet Luxury</option>
                    <option value="Y2K Revival">Y2K Revival</option>
                    <option value="Clean Fit">Clean Fit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 uppercase block mb-1">IMAGE URL</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:outline-none focus:border-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-bold uppercase hover:bg-zinc-200 transition-colors mt-4"
              >
                PUBLISH PRODUCT TO STORE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
