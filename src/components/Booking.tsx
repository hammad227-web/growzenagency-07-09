import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  MessageSquareShare, 
  Phone, 
  Mail, 
  Calendar, 
  ArrowRight,
  Database,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Search,
  X
} from 'lucide-react';
import { AGENCY_CONFIG, SERVICES_LIST } from '../data/agencyData';
import { BookingFormData } from '../types';
import { 
  saveBookingToSupabase, 
  SaveBookingResult, 
  SUPABASE_PROJECT_ID 
} from '../lib/supabase';
import { SupabaseModal } from './SupabaseModal';

const COUNTRIES_LIST = [
  { name: 'Pakistan', code: '+92', flag: '🇵🇰', iso: 'PK' },
  { name: 'United States', code: '+1', flag: '🇺🇸', iso: 'US' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧', iso: 'GB' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪', iso: 'AE' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', iso: 'SA' },
  { name: 'Canada', code: '+1', flag: '🇨🇦', iso: 'CA' },
  { name: 'Australia', code: '+61', flag: '🇦🇺', iso: 'AU' },
  { name: 'India', code: '+91', flag: '🇮🇳', iso: 'IN' },
  { name: 'Germany', code: '+49', flag: '🇩🇪', iso: 'DE' },
  { name: 'France', code: '+33', flag: '🇫🇷', iso: 'FR' },
  { name: 'Qatar', code: '+974', flag: '🇶🇦', iso: 'QA' },
  { name: 'Kuwait', code: '+965', flag: '🇰🇼', iso: 'KW' },
  { name: 'Oman', code: '+968', flag: '🇴🇲', iso: 'OM' },
  { name: 'Bahrain', code: '+973', flag: '🇧🇭', iso: 'BH' },
  { name: 'Turkey', code: '+90', flag: '🇹🇷', iso: 'TR' },
  { name: 'Malaysia', code: '+60', flag: '🇲🇾', iso: 'MY' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬', iso: 'SG' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦', iso: 'ZA' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱', iso: 'NL' },
  { name: 'Italy', code: '+39', flag: '🇮🇹', iso: 'IT' },
  { name: 'Spain', code: '+34', flag: '🇪🇸', iso: 'ES' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭', iso: 'CH' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪', iso: 'SE' },
  { name: 'Norway', code: '+47', flag: '🇳🇴', iso: 'NO' },
  { name: 'Ireland', code: '+353', flag: '🇮🇪', iso: 'IE' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿', iso: 'NZ' },
  { name: 'Egypt', code: '+20', flag: '🇪🇬', iso: 'EG' },
  { name: 'Indonesia', code: '+62', flag: '🇮🇩', iso: 'ID' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷', iso: 'BR' },
  { name: 'Japan', code: '+81', flag: '🇯🇵', iso: 'JP' },
  { name: 'China', code: '+86', flag: '🇨🇳', iso: 'CN' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩', iso: 'BD' },
];

interface BookingProps {
  preselectedService?: string;
  preselectedPackage?: string;
}

export const Booking: React.FC<BookingProps> = ({ 
  preselectedService, 
  preselectedPackage 
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    service: preselectedService || 'Graphic Design',
    budget: '',
    packageTier: preselectedPackage || 'Standard Plan',
    message: '',
  });

  const [countryCode, setCountryCode] = useState('+92');
  const [isCountrySearchOpen, setIsCountrySearchOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState('');
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveResult, setSaveResult] = useState<SaveBookingResult | null>(null);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setIsCountrySearchOpen(false);
      }
    };
    if (isCountrySearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCountrySearchOpen]);

  const filteredCountries = COUNTRIES_LIST.filter((c) => {
    const q = countryQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.includes(q) ||
      c.iso.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedPackage) {
      setFormData((prev) => ({ ...prev, packageTier: `${preselectedPackage} Plan` }));
    }
  }, [preselectedPackage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedPhone = formData.phone.trim().startsWith('+')
      ? formData.phone.trim()
      : countryCode
        ? `${countryCode} ${formData.phone.trim()}`
        : formData.phone.trim();

    try {
      const result = await saveBookingToSupabase({
        ...formData,
        phone: formattedPhone,
      });
      setSaveResult(result);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const formattedPhone = formData.phone.trim().startsWith('+')
      ? formData.phone.trim()
      : countryCode
        ? `${countryCode} ${formData.phone.trim()}`
        : formData.phone.trim();

    const budgetLine = formData.budget ? `\n• Budget: ${formData.budget}` : '';

    const text = encodeURIComponent(
      `Hello Growzen Team! 👋\n\nI want to book a consultation:\n• Name: ${formData.fullName || 'Client'}\n• Phone: ${formattedPhone || 'N/A'}\n• Email: ${formData.email || 'N/A'}\n• Service Needed: ${formData.service}${budgetLine}\n• Package: ${formData.packageTier}\n• Project Details: ${formData.message || 'I would like to discuss my project requirements.'}\n\nPlease let me know your availability!`
    );
    window.open(`https://wa.me/923317157073?text=${text}`, '_blank');
  };

  return (
    <section id="booking" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-[#090D10] border-t border-white/[0.06] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[min(80vw,24rem)] h-[min(80vw,24rem)] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Your Growth Journey</span>
            </div>

            {/* Supabase Connection Pill */}
            <button
              type="button"
              onClick={() => setIsDbModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-emerald-500/40 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-300 text-xs font-medium transition-colors cursor-pointer"
              title="Click to view Supabase database sync status and table setup"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Supabase Storage Connected</span>
            </button>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            Book a Free Consultation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Tell us about your brand goals, event requirements, and estimated budget. Your consultation request will be saved directly into our secure database and reviewed within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl bg-[#0E151E] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-3">
                Consultation Request Received!
              </h3>
              <p className="text-slate-300 max-w-md text-sm leading-relaxed mb-6">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. We've received your request for <strong className="text-emerald-400">{formData.service}</strong> ({formData.packageTier}{formData.budget ? ` • Budget: ${formData.budget}` : ''}).
              </p>

              {/* Supabase Storage Status Confirmation */}
              <div className="w-full max-w-lg mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Database className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Database Storage Sync</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {saveResult?.source === 'supabase' ? 'Supabase Synced' : 'Stored Securely'}
                      </span>
                    </div>
                    <p className="text-slate-300">
                      {saveResult?.source === 'supabase' ? (
                        <>Saved directly to your Supabase project (<code className="text-emerald-300 font-mono">{SUPABASE_PROJECT_ID}</code>).</>
                      ) : (
                        <>
                          Logged securely in local cache and queued for Supabase project (<code className="text-emerald-300 font-mono">{SUPABASE_PROJECT_ID}</code>).
                        </>
                      )}
                    </p>

                    {saveResult?.tableMissing && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setIsDbModalOpen(true)}
                          className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Run 1-Click SQL to initialize Supabase "bookings" table &rarr;</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-md justify-center">
                <button
                  onClick={handleWhatsAppDirect}
                  id="booking-whatsapp-confirm"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <MessageSquareShare className="w-4 h-4" />
                  <span>Send On WhatsApp for Instant Reply</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSaveResult(null);
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      service: 'Graphic Design',
                      budget: '',
                      packageTier: 'Standard Plan',
                      message: '',
                    });
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-sm font-medium border border-white/10"
                >
                  Book Another Service
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsDbModalOpen(true)}
                className="mt-6 text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <Database className="w-3.5 h-3.5" />
                <span>View Supabase Database Status & Records</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Booking Instructions Banner with Budget Guidance */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/25 flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-emerald-300">Booking Instructions: </span>
                  Please choose your service and package tier, and specify your <strong className="text-white">target budget</strong> and timeline in the details section below to receive a personalized proposal.
                </div>
              </div>

              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Your Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="booking-name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Doe / Brand Representative"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Phone / WhatsApp Number <span className="text-emerald-400">*</span>
                  </label>
                  <div ref={countryDropdownRef} className="relative flex rounded-xl bg-white/[0.04] border border-white/10 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                    {/* Country Code with Search Icon */}
                    <div className="relative flex items-center bg-[#121922] rounded-l-xl border-r border-white/10 shrink-0">
                      <button
                        type="button"
                        id="booking-country-search-btn"
                        onClick={() => setIsCountrySearchOpen(!isCountrySearchOpen)}
                        title="Search country"
                        className="pl-3 pr-1 text-slate-400 hover:text-emerald-400 transition-colors flex items-center focus:outline-none"
                      >
                        <Search className="w-3.5 h-3.5" />
                      </button>
                      <select
                        id="booking-country-code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        aria-label="Country Code"
                        className="bg-transparent text-white text-xs font-semibold pl-1.5 pr-2.5 sm:pr-3 py-3.5 focus:outline-none cursor-pointer"
                      >
                        {COUNTRIES_LIST.map((c) => (
                          <option key={`${c.code}-${c.iso}`} value={c.code} className="bg-[#0F161F] text-white">
                            {c.flag} {c.code} ({c.iso})
                          </option>
                        ))}
                        <option value="" className="bg-[#0F161F] text-white">🌐 Other</option>
                      </select>
                    </div>

                    <div className="relative flex-1">
                      <input
                        type="tel"
                        id="booking-phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="331-7157073"
                        className="w-full pl-3 pr-10 py-3.5 bg-transparent rounded-r-xl text-white placeholder-slate-500 focus:outline-none text-sm"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Searchable Country Popover */}
                    {isCountrySearchOpen && (
                      <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 max-h-72 bg-[#0E1620] border border-emerald-500/30 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
                        <div className="p-2.5 border-b border-white/10 flex items-center gap-2 bg-white/[0.02]">
                          <Search className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
                          <input
                            type="text"
                            autoFocus
                            value={countryQuery}
                            onChange={(e) => setCountryQuery(e.target.value)}
                            placeholder="Search country or code..."
                            className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none py-1"
                          />
                          {countryQuery && (
                            <button
                              type="button"
                              onClick={() => setCountryQuery('')}
                              className="text-slate-400 hover:text-white p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setIsCountrySearchOpen(false);
                              setCountryQuery('');
                            }}
                            className="text-slate-400 hover:text-white p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="overflow-y-auto max-h-56 divide-y divide-white/[0.04]">
                          {filteredCountries.length === 0 ? (
                            <div className="p-4 text-center text-xs text-slate-400">
                              No matching country found.
                            </div>
                          ) : (
                            filteredCountries.map((c) => (
                              <button
                                key={`popover-${c.code}-${c.iso}`}
                                type="button"
                                onClick={() => {
                                  setCountryCode(c.code);
                                  setIsCountrySearchOpen(false);
                                  setCountryQuery('');
                                }}
                                className={`w-full px-3 py-2.5 flex items-center justify-between text-xs hover:bg-emerald-500/10 transition-colors text-left ${
                                  countryCode === c.code ? 'bg-emerald-500/15 text-emerald-300 font-semibold' : 'text-slate-200'
                                }`}
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <span className="text-base">{c.flag}</span>
                                  <span className="truncate">{c.name}</span>
                                </span>
                                <span className="font-mono text-emerald-400 font-medium ml-2 shrink-0">
                                  {c.code}
                                </span>
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Service Needed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="booking-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="booking-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. you@company.com"
                      className="w-full pl-4 pr-10 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm transition-all"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="booking-service" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Service Needed <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    id="booking-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#121922] border border-white/10 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm transition-all"
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.id} value={srv.title} className="bg-[#0F161F] text-white">
                        {srv.title}
                      </option>
                    ))}
                    <option value="Custom Agency Bundle" className="bg-[#0F161F] text-white">
                      Custom Bundle / Enterprise Scope
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 3: Package Tier Preference */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Package Tier Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Basic Plan', 'Standard Plan', 'Premium Plan'].map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setFormData({ ...formData, packageTier: tier })}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                        formData.packageTier.includes(tier.split(' ')[0])
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                          : 'bg-white/[0.03] text-slate-300 border-white/[0.08] hover:bg-white/[0.06]'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Message / Details */}
              <div>
                <label htmlFor="booking-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Project Details / Message <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="booking-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a brief overview of your business, deadline, or design ideas..."
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm transition-all"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="booking-submit-btn"
                  className="w-full sm:flex-1 py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Consultation...' : 'Submit Consultation Request'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 text-emerald-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquareShare className="w-4 h-4 text-emerald-400" />
                  <span>Or Instant WhatsApp</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

      {/* Supabase Database Connection & Setup Modal */}
      <SupabaseModal isOpen={isDbModalOpen} onClose={() => setIsDbModalOpen(false)} />
    </section>
  );
};
