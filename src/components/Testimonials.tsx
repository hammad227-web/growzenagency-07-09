import React from 'react';
import { Star, Sparkles, Quote, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS_LIST, AGENCY_CONFIG } from '../data/agencyData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-[#090D10] overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 right-1/4 w-[min(80vw,24rem)] h-[min(80vw,24rem)] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Feedback & Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            Endorsed by Businesses Near NTU & Beyond
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Read what entrepreneurs, restaurant owners, and digital creators have to say about collaborating with Growzen.
          </p>
        </div>

        {/* Testimonials Grid (5 verified client reviews) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_LIST.map((item, index) => (
            <div
              key={item.id}
              id={`testimonial-card-${item.id}`}
              className={`rounded-3xl bg-[#0E151E] border border-white/[0.08] hover:border-emerald-500/30 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-emerald-500/30" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-200 leading-relaxed italic mb-6">
                  "{item.review}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-emerald-500/30"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white font-display">
                        {item.name}
                      </h4>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-300">
                      {item.role}, <span className="text-slate-200">{item.company}</span>
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {item.projectType}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-around gap-6 text-center text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>100% On-Time Delivery Track Record</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Verified Customer Testimonials</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Direct Founder Oversight on {AGENCY_CONFIG.phoneDisplay}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
