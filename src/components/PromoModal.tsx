import React, { useState, useEffect } from 'react';
import { X, Sparkles, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

interface PromoModalProps {
  onScrollToBooking?: () => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({ onScrollToBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Check if user has already seen promo in this session
    const hasSeenPromo = sessionStorage.getItem('growzen_promo_seen');
    if (hasSeenPromo) {
      return;
    }

    // Trigger promotional modal automatically after 6 seconds
    const timer = setTimeout(() => {
      const alreadySeen = sessionStorage.getItem('growzen_promo_seen');
      if (!alreadySeen) {
        setIsRendered(true);
        // Small tick to ensure smooth transition trigger
        requestAnimationFrame(() => {
          setIsOpen(true);
        });
        sessionStorage.setItem('growzen_promo_seen', 'true');
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard accessibility: Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsRendered(false);
    }, 300);
  };

  const handleClaimWhatsApp = () => {
    const message = encodeURIComponent(
      'Hi Growzen! I would like to claim the FREE 3-Day Trial for Social Media Handling.'
    );
    const promoWhatsappUrl = `${AGENCY_CONFIG.whatsappUrl}?text=${message}`;
    window.open(promoWhatsappUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  const handleScrollToBooking = () => {
    handleClose();
    if (onScrollToBooking) {
      setTimeout(() => {
        onScrollToBooking();
      }, 150);
    }
  };

  if (!isRendered) return null;

  return (
    <div
      id="promo-modal-backdrop"
      aria-modal="true"
      role="dialog"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isOpen ? 'bg-black/75 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        id="promo-modal-card"
        className={`relative w-full max-w-md bg-[#0E151E] border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-emerald-500/10 transition-all duration-300 transform ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="promo-modal-close-btn"
          type="button"
          onClick={handleClose}
          aria-label="Close promotional offer"
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>🎉 Limited Time Offer!</span>
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Main Offer Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight leading-snug mb-2">
          Get a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">FREE 3-Day Trial</span> – Social Media Handling
        </h3>

        {/* Supporting Line */}
        <p className="text-sm text-slate-300 font-normal leading-relaxed mb-5">
          Let us manage your social media for 3 days, absolutely free! Experience professional content curation, audience engagement, and strategic growth with zero commitment.
        </p>

        {/* Trial Highlights */}
        <div className="space-y-2 mb-6 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Custom post designs & conversion-focused copy</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Targeted daily audience engagement & hashtag research</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Free • No credit card or upfront deposit required</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {/* Primary CTA */}
          <button
            id="promo-claim-now-btn"
            type="button"
            onClick={handleClaimWhatsApp}
            className="w-full min-h-[44px] flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span>Claim Free Trial on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary CTA: Scroll to booking */}
          {onScrollToBooking && (
            <button
              id="promo-booking-scroll-btn"
              type="button"
              onClick={handleScrollToBooking}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Or reserve your spot via our Booking Form →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
