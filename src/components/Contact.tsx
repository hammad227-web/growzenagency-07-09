import React from 'react';
import { 
  Phone, 
  MessageSquareShare, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  Copy, 
  Check 
} from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

export const Contact: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(AGENCY_CONFIG.phoneDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0B1015] border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-20 w-[min(80vw,20rem)] h-[min(80vw,20rem)] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Channels</span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Connect With Growzen
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            We are readily available for consultations, project scoping, and urgent design turnarounds.
          </p>
        </div>

        {/* 3 Interactive Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Phone / WhatsApp */}
          <div className="rounded-3xl bg-[#0E151E] border border-white/[0.08] hover:border-emerald-500/40 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <Phone className="w-6 h-6" />
              </div>

              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Direct Line & WhatsApp
              </span>
              <h3 
                className="text-2xl font-extrabold text-white mb-2"
                style={{ fontFamily: 'Verdana, sans-serif' }}
              >
                {AGENCY_CONFIG.phoneDisplay}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Direct phone inquiries or WhatsApp chats. Instant responses during working hours.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
              <a
                href={AGENCY_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp-btn"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>Open WhatsApp</span>
              </a>

              <button
                onClick={copyPhoneNumber}
                title="Copy phone number"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Card 2: Location */}
          <div className="rounded-3xl bg-[#0E151E] border border-white/[0.08] hover:border-emerald-500/40 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>

              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Studio Location
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display mb-2">
                {AGENCY_CONFIG.location}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Conveniently situated right near National Textile University, Manawala, Faisalabad, Pakistan. In-person meetings available by prior appointment.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Open for Walk-in Consultations by Appointment</span>
              </div>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="rounded-3xl bg-[#0E151E] border border-white/[0.08] hover:border-emerald-500/40 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6" />
              </div>

              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Electronic Mail
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display mb-2 truncate">
                {AGENCY_CONFIG.email}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Official inquiries, formal briefs, RFP documents, and contract negotiations.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <a
                href={`mailto:${AGENCY_CONFIG.email}`}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-all"
              >
                <span>Send Email</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Location & Studio Highlight Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0F1722] via-[#0E151E] to-[#111A24] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-display">
                Studio Working Hours
              </h4>
              <p className="text-xs text-slate-300">
                Monday – Saturday: 9:00 AM – 9:00 PM PKT | 24/7 WhatsApp Emergency Support
              </p>
            </div>
          </div>

          <a
            href={AGENCY_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <MessageSquareShare className="w-4 h-4" />
            <span>Connect on WhatsApp Now</span>
          </a>
        </div>

      </div>
    </section>
  );
};
