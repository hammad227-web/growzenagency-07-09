import React, { useState } from 'react';
import { MessageCircle, Phone, X, Sparkles } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      id="floating-whatsapp-container"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Tooltip / Speech Bubble */}
      <div 
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0F1722]/95 border border-emerald-500/40 text-white text-xs font-medium shadow-2xl backdrop-blur-md transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-90 translate-x-1'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Chat on WhatsApp: <strong className="text-emerald-400">{AGENCY_CONFIG.phoneDisplay}</strong></span>
      </div>

      {/* Floating Action Button */}
      <a
        href={AGENCY_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        aria-label="Chat with Growzen on WhatsApp"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-400/70 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
      >
        {/* Glow halo */}
        <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-white text-emerald-600 group-hover:rotate-12 transition-transform" />

        {/* Online Indicator Badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-[#090D10] shadow" />
      </a>
    </div>
  );
};
