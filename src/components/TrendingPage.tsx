import React from 'react';
import { TRENDING_RANKINGS } from '../data/fashionData';
import { useShop } from '../context/ShopContext';
import { TrendingUp, ArrowRight } from 'lucide-react';

export const TrendingPage: React.FC = () => {
  const { setSelectedAestheticFilter, setActiveView } = useShop();

  const handleExploreTrend = () => {
    setSelectedAestheticFilter('Japanese Minimalism');
    setActiveView('shop');
  };

  return (
    <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-zinc-800 pb-8">
        <div>
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block mb-2 flex items-center space-x-2">
            <TrendingUp size={14} />
            <span>GLOBAL SEARCH & COMMERCE VELOCITY METRICS</span>
          </span>
          <h1 className="font-editorial text-4xl sm:text-7xl font-black uppercase tracking-tight text-white">
            WHAT'S TRENDING
          </h1>
        </div>
        <p className="mt-4 md:mt-0 font-body text-zinc-400 text-sm max-w-md">
          Live index ranking international fashion search velocity, Seoul high-street demands, and Tokyo atelier orders.
        </p>
      </div>

      {/* Leaderboard Rankings 01 to 05 */}
      <div className="space-y-8">
        {TRENDING_RANKINGS.map(item => (
          <div
            key={item.rank}
            className="bg-zinc-900/60 border border-zinc-800 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-between hover:border-zinc-500 transition-all"
          >
            {/* Rank Number & Thumbnail */}
            <div className="flex items-center space-x-6 w-full md:w-auto">
              <span className="font-editorial text-5xl md:text-7xl font-black text-white/30 font-mono">
                {item.rank}
              </span>
              <img
                src={item.image}
                alt=""
                className="w-24 h-28 object-cover bg-zinc-950 border border-zinc-800 shrink-0"
              />
              <div>
                <span className="px-2.5 py-0.5 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-mono text-[10px] uppercase inline-block mb-1">
                  {item.growth}
                </span>
                <h3 className="font-editorial text-2xl font-bold uppercase text-white">
                  {item.name}
                </h3>
                <p className="font-body text-xs text-zinc-400 mt-1 max-w-md">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Velocity Score Metric Bar */}
            <div className="w-full md:w-64 space-y-3 font-mono text-xs border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-8">
              <div className="flex justify-between text-zinc-300">
                <span>TREND SCORE</span>
                <span className="font-bold text-white">{item.trendScore} / 100</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-white to-[#00f0ff]"
                  style={{ width: `${item.trendScore}%` }}
                />
              </div>

              <button
                onClick={handleExploreTrend}
                className="w-full py-2.5 bg-white text-black font-bold uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2 mt-2"
              >
                <span>EXPLORE TREND</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
