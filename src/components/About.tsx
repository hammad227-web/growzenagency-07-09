import React from 'react';
import { 
  MapPin, 
  Target, 
  Sparkles, 
  Check, 
  Layers, 
  Zap, 
  Award, 
  Users, 
  ArrowUpRight 
} from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0B1015]/60 border-t border-b border-white/[0.06]">
      {/* Subtle background ambient lights */}
      <div className="absolute top-1/2 -left-20 w-[min(80vw,20rem)] h-[min(80vw,20rem)] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[min(80vw,24rem)] h-[min(80vw,24rem)] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Growzen Agency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
            Creative Artistry Powered by Modern Digital Engineering
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Headquartered strategically <span className="text-emerald-400 font-semibold underline decoration-emerald-500/40 underline-offset-4">Near National Textile University, Manawala, Faisalabad, Pakistan</span>, Growzen bridges high-end visual design with real commercial conversion.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Narrative Card */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0E151D] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Target className="w-40 h-40 text-emerald-400" />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Strategic Location & Global Reach
                  </h3>
                  <p className="text-xs text-slate-300">
                    Located near National Textile University, Manawala, Faisalabad — serving local enterprises & worldwide clients
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Growzen was founded with a singular ambition: <strong className="text-white">to make tier-one creative design and robust digital marketing accessible to businesses of all sizes</strong>. Whether you need an eye-catching poster, a restaurant QR menu, an unforgettable wedding card, or a full-scale Shopify store that generates sales, we deliver top-tier craftsmanship starting from just $5.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">Speed & Reliability</span>
                    <span className="text-xs text-slate-300">Fast 24-48h turnarounds without compromising finish.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">Transparent Pricing</span>
                    <span className="text-xs text-slate-300">Clear rate cards starting at $5 with zero hidden costs.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">Conversion-Driven UI</span>
                    <span className="text-xs text-slate-300">Every pixel is designed to drive engagement and sales.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">Direct WhatsApp Access</span>
                    <span className="text-xs text-slate-300">Collaborate directly with our founders on {AGENCY_CONFIG.phoneDisplay}.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Visual Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Pillar 1: Creative Suite */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                    1. High-Impact Creative & Motion
                  </h3>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Posters, bespoke wedding cards, 3D video reels, and aesthetic food menus designed to capture consumer attention in milliseconds.
              </p>
            </div>

            {/* Pillar 2: Digital Engineering */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-teal-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display group-hover:text-teal-300 transition-colors">
                    2. Web & Shopify Engineering
                  </h3>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Modern responsive code, optimized checkout architectures, Figma UI/UX prototypes, and flawless mobile experiences that convert traffic into revenue.
              </p>
            </div>

            {/* Pillar 3: Growth & Acquisition */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display group-hover:text-amber-300 transition-colors">
                    3. Performance SEO & Meta Ads
                  </h3>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                High-ROAS Facebook & Instagram campaigns, organic Google search top rankings, and viral social media content management designed for explosive growth.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
