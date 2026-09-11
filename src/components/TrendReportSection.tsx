import React from 'react';
import { TREND_REPORTS } from '../data/fashionData';
import { useShop } from '../context/ShopContext';
import { ArrowRight, BookOpen } from 'lucide-react';

export const TrendReportSection: React.FC = () => {
  const { setSelectedAestheticFilter, setActiveView } = useShop();

  const handleShopTrend = () => {
    setSelectedAestheticFilter('Japanese Minimalism');
    setActiveView('shop');
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-zinc-800 pb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <BookOpen size={16} className="text-[#d4af37]" />
              <span className="font-mono text-xs text-[#d4af37] uppercase tracking-widest">
                EDITORIAL PUBLICATION • ISSUE #04
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              THE TREND REPORT
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-body text-zinc-400 text-sm max-w-md">
            Analysis on the cultural shifts, technical fabrics, and structural forms shaping global youth culture this season.
          </p>
        </div>

        {/* Featured Trend Report Layout */}
        {TREND_REPORTS.map((report, idx) => (
          <div
            key={report.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
              idx > 0 ? 'mt-20 pt-20 border-t border-zinc-800/60' : ''
            }`}
          >
            {/* Visual Media Column */}
            <div className="lg:col-span-7 relative group overflow-hidden bg-zinc-900 border border-zinc-800">
              <div className="aspect-[16/10] w-full img-zoom-container">
                <img
                  src={report.image}
                  alt={report.title}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-white font-mono text-[10px] uppercase tracking-widest border border-white/10">
                {report.issue}
              </div>
            </div>

            {/* Editorial Content Breakdown Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block mb-2">
                  TREND ANALYSIS 0{idx + 1}
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl font-extrabold text-white uppercase leading-tight">
                  {report.title}
                </h3>
                <p className="font-body text-base font-medium text-zinc-200 mt-3 italic">
                  "{report.headline}"
                </p>
                <p className="font-body text-sm text-zinc-400 mt-4 leading-relaxed">
                  {report.description}
                </p>
              </div>

              {/* Key Pieces & Styling Notes */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <div>
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-2">
                    KEY CLOTHING PIECES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {report.keyItems.map(item => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-zinc-900 text-white font-mono text-xs border border-zinc-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-1">
                    STYLING SUGGESTION
                  </span>
                  <p className="font-body text-xs text-zinc-300 bg-zinc-900/80 p-3 border border-zinc-800">
                    {report.stylingTips}
                  </p>
                </div>

                {/* Color Palette Swatches */}
                <div>
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-2">
                    SEASONAL COLOR PALETTE
                  </span>
                  <div className="flex items-center space-x-3">
                    {report.colorPalette.map(c => (
                      <div key={c.name} className="flex items-center space-x-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-zinc-600"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="font-mono text-[10px] text-zinc-400">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shop The Trend Action */}
              <div className="pt-4">
                <button
                  onClick={handleShopTrend}
                  className="px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-zinc-200 transition-colors flex items-center space-x-3"
                >
                  <span>SHOP THIS TREND</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
