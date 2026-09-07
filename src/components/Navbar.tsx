import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  ExternalLink 
} from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'pricing', 'booking', 'contact'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#090D10]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#hero" 
          id="nav-brand-logo"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-800 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
            <div className="w-full h-full bg-[#0B1015] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-xl tracking-tight text-white font-display">
                G<span className="text-emerald-400">.</span>
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090D10]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span 
                className="text-[25px] font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                {AGENCY_CONFIG.name}
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Agency
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium tracking-wide">
              Creative & Digital Growth
            </span>
          </div>
        </a>

        {/* Desktop / Laptop Nav Items (769px and above) */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-white/[0.03] border border-white/[0.08] px-2.5 lg:px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-2.5 lg:px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
                activeSection === link.href.substring(1)
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action & Direct Contact (Laptop/Desktop) */}
        <div className="hidden md:flex items-center gap-2.5 lg:gap-3">
          {/* Quick Direct WhatsApp Link on larger desktops */}
          <a
            href={AGENCY_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-whatsapp-direct"
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 hover:border-emerald-500/40 transition-all whitespace-nowrap"
            title={`Chat directly on WhatsApp (${AGENCY_CONFIG.phoneDisplay})`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{AGENCY_CONFIG.phoneDisplay}</span>
          </a>

          {/* Book Now Button */}
          <button
            onClick={onBookClick}
            id="nav-book-cta"
            className="relative group inline-flex items-center justify-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/40 hover:from-emerald-400 hover:to-teal-500 active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile / Tablet Hamburger Toggle (< 769px) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white bg-white/[0.05] border border-white/10 active:scale-95 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile / Tablet Menu Dropdown (< 769px) */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-panel"
          className="md:hidden mt-3 mx-3 sm:mx-4 p-4 sm:p-5 rounded-2xl bg-[#0F151C]/95 border border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col gap-3.5 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="flex flex-col gap-1 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 min-h-[44px] flex items-center rounded-xl text-sm sm:text-base font-medium text-slate-200 hover:bg-emerald-500/15 hover:text-emerald-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              id="mobile-nav-book-cta"
              className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 active:scale-[0.98] transition-all"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={AGENCY_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] border border-emerald-500/30 text-emerald-300 font-medium text-xs sm:text-sm hover:bg-emerald-500/10 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp: {AGENCY_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
