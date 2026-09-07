import React, { useState } from 'react';
import { 
  Palette, 
  LayoutGrid, 
  Search, 
  TrendingUp, 
  Code, 
  ShoppingBag, 
  UtensilsCrossed, 
  Share2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Tag 
} from 'lucide-react';
import { SERVICES_LIST } from '../data/agencyData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'design' | 'development' | 'marketing'>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette': return <Palette className="w-6 h-6" />;
      case 'LayoutGrid': return <LayoutGrid className="w-6 h-6" />;
      case 'Search': return <Search className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'Code': return <Code className="w-6 h-6" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6" />;
      case 'Share2': return <Share2 className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const filteredServices = filterCategory === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter((s) => s.category === filterCategory);

  return (
    <section id="services" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-[#090D10] overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[min(90vw,38rem)] h-[min(60vw,22rem)] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Growth-Focused Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            Comprehensive Services. Transparent Value.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Every service is tailored to maximize visual impact and business ROI. Pricing starts from just <strong className="text-emerald-400 font-bold">$5</strong>, scaling with your brand's unique requirements.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All 8 Services' },
              { id: 'design', label: 'Graphic, UI/UX & Menus' },
              { id: 'development', label: 'Web & Shopify' },
              { id: 'marketing', label: 'SEO, Meta Ads & Social' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id as any)}
                id={`services-filter-${tab.id}`}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  filterCategory === tab.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid (All 8 requested services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group relative rounded-3xl bg-[#0E141B] border border-white/[0.08] hover:border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/40"
            >
              {service.popular && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                  Most Requested
                </div>
              )}

              <div>
                {/* Icon & Price Badge Header */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    {getIcon(service.iconName)}
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                      Starting At
                    </span>
                    <span className="text-xl font-extrabold text-emerald-400 font-display">
                      {service.currency}{service.startingPrice}
                    </span>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-white font-display mb-2.5 group-hover:text-emerald-300 transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Highlights tags */}
                <div className="space-y-1.5 mb-6 pt-4 border-t border-white/[0.06]">
                  {service.highlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectService(service.title)}
                id={`book-service-${service.id}`}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white/[0.05] hover:bg-emerald-500 hover:text-black text-slate-200 border border-white/10 hover:border-emerald-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all active:scale-[0.98]"
              >
                <span>Book Service</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Custom Project Note Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0E151D] to-teal-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Have a custom bundle or hybrid requirement?
              </h4>
              <p className="text-xs text-slate-300">
                We formulate bespoke packages for wedding events, restaurant launches, and high-ticket brands.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectService('Custom Agency Bundle')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20"
          >
            Request Custom Quote
          </button>
        </div>

      </div>
    </section>
  );
};
