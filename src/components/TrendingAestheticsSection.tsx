import React from 'react';
import { TRENDING_AESTHETICS } from '../data/fashionData';
import { useShop } from '../context/ShopContext';
import { ThreeDCard } from './ThreeDCard';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const TrendingAestheticsSection: React.FC = () => {
  const { setSelectedAestheticFilter, setActiveView } = useShop();

  const handleAestheticSelect = (aestheticName: string) => {
    setSelectedAestheticFilter(aestheticName);
    setActiveView('shop');
  };

  return (
    <section id="trending-now" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-zinc-800 pb-8"
      >
        <div>
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block mb-2">
            01 / GLOBAL CURATION
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            TRENDING NOW
          </h2>
        </div>
        <p className="mt-4 md:mt-0 font-body text-zinc-400 text-sm max-w-md">
          Explore the 12 dominant style movements defining international youth fashion, Seoul high-street, and Tokyo atelier design.
        </p>
      </motion.div>

      {/* 12 Aesthetics Grid with 3D Tilt & Staggered Motion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TRENDING_AESTHETICS.map((aesthetic, idx) => (
          <motion.div
            key={aesthetic.id}
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
          >
            <ThreeDCard maxDegree={10}>
              <div
                onClick={() => handleAestheticSelect(aesthetic.name)}
                className="group relative cursor-pointer overflow-hidden bg-zinc-900/60 border border-zinc-800/80 hover:border-white/50 transition-all duration-500 flex flex-col justify-between h-[420px]"
              >
                {/* Background Image with Zoom */}
                <div className="absolute inset-0 img-zoom-container z-0">
                  <img
                    src={aesthetic.image}
                    alt={aesthetic.name}
                    className="w-full h-full object-cover filter brightness-[0.65] group-hover:brightness-[0.85] transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Top Pill Tagline */}
                <div className="relative z-10 p-5 flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest">
                    {aesthetic.tagline}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 p-6 flex flex-col justify-end">
                  <span className="font-mono text-[11px] text-zinc-400 block mb-1">
                    {aesthetic.count} CURATED ITEMS
                  </span>
                  <h3 className="font-editorial text-2xl font-extrabold uppercase text-white tracking-wide group-hover:translate-x-1 transition-transform">
                    {aesthetic.name}
                  </h3>
                  <p className="font-body text-xs text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                    {aesthetic.description}
                  </p>

                  {/* Key pieces pill chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {aesthetic.keyPieces.map((piece, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[9px] font-mono px-2 py-0.5 bg-white/10 text-zinc-200 border border-white/5"
                      >
                        {piece}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ThreeDCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
