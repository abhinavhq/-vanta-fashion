import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/fashionData';
import type { JournalArticle } from '../data/fashionData';
import { useShop } from '../context/ShopContext';
import { Clock, ArrowRight, X } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const { selectedArticleId, products, openProductModal } = useShop();
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(
    JOURNAL_ARTICLES.find(a => a.id === selectedArticleId) || null
  );

  const shoppableItems = activeArticle
    ? activeArticle.shoppableProductIds.map(id => products.find(p => p.id === id)).filter(Boolean)
    : [];

  return (
    <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-zinc-800 pb-8">
        <div>
          <span className="font-mono text-xs text-[#d4af37] uppercase tracking-widest block mb-2">
            DIGITAL FASHION PUBLICATION
          </span>
          <h1 className="font-editorial text-4xl sm:text-7xl font-black uppercase tracking-tight text-white">
            VANTA JOURNAL
          </h1>
        </div>
        <p className="mt-4 md:mt-0 font-body text-zinc-400 text-sm max-w-md">
          Deep dives into Japanese atelier craft, Gangnam high-street trends, proportion styling rules, and global youth subcultures.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {JOURNAL_ARTICLES.map(art => (
          <div
            key={art.id}
            onClick={() => setActiveArticle(art)}
            className="group cursor-pointer bg-zinc-900/60 border border-zinc-800 hover:border-white transition-all flex flex-col justify-between"
          >
            <div className="aspect-[16/10] overflow-hidden bg-zinc-950">
              <img
                src={art.coverImage}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center space-x-4 text-[10px] font-mono text-zinc-400 mb-3">
                  <span className="text-[#00f0ff] uppercase">{art.category}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock size={10} />
                    <span>{art.readTime}</span>
                  </span>
                </div>

                <h3 className="font-editorial text-2xl font-bold uppercase text-white group-hover:text-zinc-300 transition-colors leading-tight">
                  {art.title}
                </h3>
                <p className="font-body text-xs text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between font-mono text-xs text-zinc-300">
                <span>BY {art.author.toUpperCase()}</span>
                <span className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>READ ARTICLE</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal View */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#09090b] border border-zinc-800 p-6 md:p-12 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="max-w-2xl mx-auto">
              <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block mb-2">
                {activeArticle.category} • {activeArticle.date}
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
                {activeArticle.title}
              </h2>
              <span className="font-mono text-xs text-zinc-400 block mt-2">
                BY {activeArticle.author.toUpperCase()} • {activeArticle.readTime}
              </span>

              <img
                src={activeArticle.coverImage}
                alt=""
                className="w-full aspect-[16/9] object-cover my-8 border border-zinc-800"
              />

              <div className="space-y-6 font-body text-sm md:text-base text-zinc-300 leading-relaxed">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Embedded Shoppable Items in Article */}
              {shoppableItems.length > 0 && (
                <div className="mt-12 pt-8 border-t border-zinc-800">
                  <span className="font-mono text-xs text-[#d4af37] uppercase tracking-widest block mb-4">
                    SHOP PIECES REFERENCED IN THIS ARTICLE
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {shoppableItems.map(item => (
                      <div
                        key={item!.id}
                        onClick={() => {
                          setActiveArticle(null);
                          openProductModal(item!.id);
                        }}
                        className="cursor-pointer bg-zinc-900 border border-zinc-800 p-3 hover:border-white transition-colors"
                      >
                        <img src={item!.images[0]} alt="" className="w-full aspect-[3/4] object-cover mb-2" />
                        <span className="font-editorial text-xs font-bold text-white block truncate">
                          {item!.name}
                        </span>
                        <span className="font-mono text-xs text-zinc-400">${item!.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
