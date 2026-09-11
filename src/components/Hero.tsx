import React from 'react';
import { useShop } from '../context/ShopContext';
import { ThreeBackground } from './ThreeBackground';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveView, setSelectedAestheticFilter } = useShop();

  const handleCategoryClick = (filter: string | null, view: string = 'shop') => {
    setSelectedAestheticFilter(filter);
    setActiveView(view);
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Editorial Background Image with WebGL 3D Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/vanta_hero.jpg"
          alt="VANTA SS26 Hero Editorial"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.1] scale-105 transition-transform duration-1000"
        />
        {/* Three.js Interactive 3D Mesh Canvas Overlay */}
        <ThreeBackground />

        {/* Subtle Dark Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      </div>

      {/* Hero Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full flex flex-col justify-between min-h-[80vh]">
        {/* Top Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center space-x-3"
        >
          <span className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs uppercase tracking-widest flex items-center space-x-2 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span>3D FASHION METROPOLE • SS26</span>
          </span>
        </motion.div>

        {/* Main Headline & Subheading with Framer Motion 3D Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="my-auto py-12 max-w-4xl"
        >
          <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] text-white drop-shadow-2xl">
            WEAR WHAT’S <br />
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 italic inline-block"
            >
              NEXT.
            </motion.span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl font-body font-light text-zinc-300 max-w-2xl leading-relaxed">
            Discover the future of fashion. Avant-garde streetwear, Japanese deconstruction, Korean silhouettes & interactive 3D luxury styling.
          </p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4 sm:gap-6 font-mono text-xs sm:text-sm tracking-widest"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(null, 'shop')}
              className="px-8 py-4 bg-white text-black font-bold uppercase hover:bg-zinc-200 transition-all btn-magnetic flex items-center space-x-2 group shadow-2xl"
            >
              <span>SHOP MEN</span>
              <ArrowDownRight size={16} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(null, 'shop')}
              className="px-8 py-4 bg-transparent border border-white/80 text-white font-bold uppercase hover:bg-white/10 transition-all btn-magnetic flex items-center space-x-2 group backdrop-blur-sm shadow-2xl"
            >
              <span>SHOP WOMEN</span>
              <ArrowDownRight size={16} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(null, 'trending')}
              className="px-8 py-4 bg-zinc-900/90 border border-zinc-700 text-[#00f0ff] font-bold uppercase hover:bg-zinc-800 transition-all btn-magnetic flex items-center space-x-2 backdrop-blur-sm shadow-2xl"
            >
              <Sparkles size={15} />
              <span>EXPLORE TRENDS</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer info in Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between border-t border-white/15 pt-6 text-zinc-400 font-mono text-xs gap-4"
        >
          <div className="flex space-x-6">
            <div>
              <span className="block text-white font-bold">ESTABLISHED</span>
              <span>PARIS / TOKYO 2026</span>
            </div>
            <div>
              <span className="block text-white font-bold">AESTHETICS</span>
              <span>3D METROPOLITAN</span>
            </div>
          </div>

          <a
            href="#trending-now"
            className="flex items-center space-x-2 text-white hover:text-zinc-300 transition-colors animate-bounce pt-2 sm:pt-0"
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
