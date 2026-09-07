import React from 'react';
import { Check, Sparkles, ArrowRight, Zap, Shield } from 'lucide-react';
import { PRICING_PACKAGES } from '../data/agencyData';
import { PricingPackage } from '../types';

interface PricingProps {
  onSelectPackage: (packageName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage }) => {
  return (
    <section id="pricing" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0B1015]/90 border-t border-white/[0.06] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,48rem)] h-[min(60vw,28rem)] bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Agency Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            Predictable Pricing. Zero Surprises.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            All our services start from an accessible <strong className="text-emerald-400 font-bold">$5</strong> baseline. Pick a ready tier or request a tailored scope for your enterprise.
          </p>
        </div>

        {/* Pricing Cards Grid (Basic, Standard, Premium) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              id={`pricing-card-${pkg.id}`}
              className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                pkg.highlighted
                  ? 'bg-[#0F1722] border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 lg:-translate-y-2'
                  : 'bg-[#0E151E] border border-white/[0.08] hover:border-white/20 hover:-translate-y-1'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/30">
                  {pkg.badge || 'Most Popular'}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white font-display">
                    {pkg.name}
                  </h3>
                  {!pkg.highlighted && pkg.badge && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/10">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 min-h-[40px]">
                  {pkg.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-white/[0.08]">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    From
                  </span>
                  <span className="text-4xl sm:text-5xl font-extrabold text-white font-display">
                    {pkg.currency}{pkg.price}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    / project
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3.5 mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                    Included in this plan:
                  </span>
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPackage(pkg.name)}
                id={`choose-plan-${pkg.id}`}
                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold transition-all active:scale-[0.98] ${
                  pkg.highlighted
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:from-emerald-400 hover:to-teal-400 shadow-xl shadow-emerald-500/25'
                    : 'bg-white/[0.05] hover:bg-emerald-500 hover:text-black text-white border border-white/10 hover:border-emerald-500'
                }`}
              >
                <span>Choose {pkg.name} Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Pricing Guarantee Banner */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Transparent terms. No hidden maintenance charges or surprise milestone additions.</span>
        </div>

      </div>
    </section>
  );
};
