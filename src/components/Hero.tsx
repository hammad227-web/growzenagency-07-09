import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  MessageSquareShare 
} from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreServices }) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Ambient Glow & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[min(90vw,44rem)] h-[min(60vw,32rem)] bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/3 -left-32 w-[min(60vw,28rem)] h-[min(60vw,28rem)] bg-emerald-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/2 -right-32 w-[min(60vw,28rem)] h-[min(60vw,28rem)] bg-amber-500/10 blur-[140px] rounded-full" />
        
        {/* Subtle geometric dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.07]" 
          style={{
            backgroundImage: `radial-gradient(#34d399 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        
        {/* Badges row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] sm:text-xs font-semibold tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-emerald-300" style={{ animationDuration: '4s' }} />
            <span>Creative & Digital Growth Studio</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-[11px] sm:text-xs font-medium backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Near National Textile University, Manawala, Faisalabad</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Services Starting at $5</span>
          </div>
        </div>

        {/* Agency Identity / Big Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.12] sm:leading-[1.08] mb-6">
          Scale Your Brand with{' '}
          <span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500"
            style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '40px' }}
          >
            {AGENCY_CONFIG.name}
          </span>
          <span className="block mt-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100">
            Where Creative Vision Fuels Real Growth.
          </span>
        </h1>

        {/* Subtitle / Tagline */}
        <p className="max-w-3xl text-sm sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10 px-2">
          From high-converting <span className="text-white font-medium">Shopify Stores</span> and modern <span className="text-white font-medium">Website Development</span> to scroll-stopping <span className="text-white font-medium">Graphic Design</span>, <span className="text-white font-medium">Meta Ads</span>, and <span className="text-white font-medium">UI/UX</span> — we build digital solutions tailored for startups, restaurants, and ambitious creators.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mb-12 sm:mb-14">
          <button
            onClick={onBookClick}
            id="hero-primary-cta"
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href={AGENCY_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-cta"
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 hover:border-emerald-400 rounded-2xl transition-all"
          >
            <MessageSquareShare className="w-5 h-5 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            onClick={onExploreServices}
            id="hero-explore-services"
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-2xl transition-all"
          >
            <span>Explore Services</span>
          </button>
        </div>

        {/* Key trust indicators / Metric Cards */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl text-left">
          
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-2xl sm:text-3xl font-display">
              <span>$5</span>
              <span className="text-xs text-emerald-500 font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Base</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Accessible Entry Pricing</p>
            <span className="text-[11px] text-slate-400">Scale as your project grows</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-2xl sm:text-3xl font-display">
              <span>1500+</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Projects Delivered</p>
            <span className="text-[11px] text-slate-400">Design, web & ad campaigns</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-2xl sm:text-3xl font-display">
              <span>4.9 ★</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Client Satisfaction</p>
            <span className="text-[11px] text-slate-400">Trusted local & global ratings</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-2xl sm:text-3xl font-display">
              <span>24/7</span>
              <ShieldCheck className="w-4 h-4 text-teal-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Direct WhatsApp Support</p>
            <span className="text-[11px] text-slate-400">Rapid response on {AGENCY_CONFIG.phoneDisplay}</span>
          </div>

        </div>

      </div>
    </section>
  );
};
