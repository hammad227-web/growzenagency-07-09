import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Tag, 
  TrendingUp, 
  Eye, 
  X, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/agencyData';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  onBookClick: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onBookClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'design', label: 'Graphic, UI & Menus' },
    { id: 'development', label: 'Web & Shopify' },
    { id: 'marketing', label: 'Meta Ads & SEO' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.serviceCategory === selectedCategory);

  return (
    <section id="portfolio" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0B1015]/80 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Agency Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            Proof of Craft & Commercial Growth
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Take a look at our recent work across visual identities, digital menus, e-commerce stores, and high-conversion ad funnels.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                id={`portfolio-cat-${cat.id}`}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`portfolio-card-${item.id}`}
              className="group rounded-3xl bg-[#0E151E] border border-white/[0.08] hover:border-emerald-500/40 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-950/40"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setActiveModalItem(item)}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E151E] via-transparent to-transparent opacity-80" />
                
                {/* Result Pill */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#090D10]/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-lg">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.resultMetric}</span>
                </div>

                {/* Quick View Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold shadow-xl">
                    <Eye className="w-4 h-4" />
                    <span>View Project Details</span>
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-300">
                      {item.client}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Tags and CTA */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 py-2 border-t border-white/[0.06] transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail View */}
        {activeModalItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveModalItem(null)}
          >
            <div 
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0F161F] border border-white/10 p-5 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-slate-900">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#090D10]/80 backdrop-blur-md text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  {activeModalItem.resultMetric}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {activeModalItem.category}
                </span>
                <span className="text-xs text-slate-300">Client: {activeModalItem.client}</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-3">
                {activeModalItem.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {activeModalItem.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {activeModalItem.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveModalItem(null);
                    onBookClick();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all"
                >
                  Book a Similar Project
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
