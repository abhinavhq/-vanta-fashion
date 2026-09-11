import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import type { Product } from '../data/fashionData';
import { Sparkles, X, Send, ShoppingBag } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedProducts?: Product[];
}

export const VantaAiAssistant: React.FC = () => {
  const { isAiAssistantOpen, toggleAiAssistant, products, openProductModal, addMultipleToCart } = useShop();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Welcome to VANTA AI Stylist. I am trained on Harajuku, Gangnam high-street, and luxury minimalist fashion data. What aesthetic or occasion are you styling for today?",
      recommendedProducts: [products[0], products[4]]
    }
  ]);

  if (!isAiAssistantOpen) return null;

  const quickPrompts = [
    "Build me an outfit for a date.",
    "I want a Korean streetwear outfit.",
    "What should I wear with wide-leg cargos?",
    "Give me a Tokyo-inspired look under $250.",
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');

    // Process AI styling recommendations based on query keywords
    setTimeout(() => {
      let responseText = "Here is a bespoke outfit tailored for your aesthetic request:";
      let matchedProds: Product[] = [];

      const lower = query.toLowerCase();
      if (lower.includes('korean') || lower.includes('streetwear')) {
        matchedProds = products.filter(p => p.aesthetic === 'Korean Streetwear').slice(0, 3);
        responseText = "For Seoul High-Street styling, pair an ultra-heavyweight 500GSM hoodie with 14oz Japanese raw selvedge denim and chunky platform runners:";
      } else if (lower.includes('tokyo') || lower.includes('minimal')) {
        matchedProds = products.filter(p => p.aesthetic === 'Japanese Minimalism').slice(0, 3);
        responseText = "Inspired by Tokyo ateliers: clean asymmetric drapery in Japanese wool combined with calfskin leather mules:";
      } else if (lower.includes('date') || lower.includes('night out')) {
        matchedProds = products.filter(p => p.aesthetic === 'Quiet Luxury' || p.aesthetic === 'Clean Fit').slice(0, 3);
        responseText = "For an effortless date night look, wear unbranded cashmere knitwear layered over tapered wool trousers:";
      } else {
        matchedProds = [products[1], products[2], products[7]];
        responseText = "Here is an avant-garde ensemble matching your style criteria:";
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        recommendedProducts: matchedProds
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  const handleAddOutfitBundle = (prods: Product[]) => {
    const items = prods.map(p => ({
      product: p,
      color: p.colors[0]?.name || '',
      size: p.sizes[0] || 'M'
    }));
    addMultipleToCart(items);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#09090b] border border-zinc-800 shadow-2xl flex flex-col h-[650px] max-h-[90vh] text-white overflow-hidden">
        {/* Header */}
        <div className="p-4 px-6 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00f0ff] to-[#d4af37] flex items-center justify-center text-black font-bold">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-editorial text-base font-bold uppercase tracking-wider text-white">
                VANTA AI STYLIST
              </h3>
              <span className="font-mono text-[10px] text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE • FASHION METRICS v3.4</span>
              </span>
            </div>
          </div>
          <button onClick={() => toggleAiAssistant(false)} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 text-xs font-body leading-relaxed border ${
                  msg.sender === 'user'
                    ? 'bg-white text-black border-white font-medium'
                    : 'bg-zinc-900 text-zinc-200 border-zinc-800'
                }`}
              >
                {msg.text}
              </div>

              {/* Shoppable Recommended Products inside Chat */}
              {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                <div className="mt-4 w-full space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {msg.recommendedProducts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          toggleAiAssistant(false);
                          openProductModal(p.id);
                        }}
                        className="cursor-pointer bg-zinc-950 border border-zinc-800 hover:border-zinc-500 p-3 flex items-center space-x-3 group"
                      >
                        <img src={p.images[0]} alt="" className="w-12 h-14 object-cover bg-zinc-900" />
                        <div className="flex-1 min-w-0">
                          <span className="font-editorial text-xs font-bold text-white block truncate group-hover:text-zinc-300">
                            {p.name}
                          </span>
                          <span className="font-mono text-[11px] text-[#00f0ff]">${p.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAddOutfitBundle(msg.recommendedProducts || [])}
                    className="w-full py-2 bg-zinc-900 border border-zinc-700 text-[#00f0ff] font-mono text-xs font-bold uppercase hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag size={14} />
                    <span>ADD COMPLETE OUTFIT TO BAG</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 px-6 bg-zinc-950 border-t border-zinc-900 overflow-x-auto flex space-x-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-mono text-[10px] whitespace-nowrap"
            >
              "{prompt}"
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 px-6 border-t border-zinc-800 bg-zinc-950 flex items-center space-x-3">
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask VANTA AI for styling advice or outfits..."
            className="flex-1 bg-zinc-900 border border-zinc-800 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white font-body"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-3 bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
