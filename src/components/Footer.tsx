import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Video, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail,
  Heart
} from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

export const Footer: React.FC = () => {

  const socialLinks = [
    {
      name: 'Instagram',
      url: AGENCY_CONFIG.socials.instagram,
      icon: <Instagram className="w-4 h-4" />,
      hoverColor: 'hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10',
      label: '@growzen_0',
    },
    {
      name: 'Facebook',
      url: AGENCY_CONFIG.socials.facebook,
      icon: <Facebook className="w-4 h-4" />,
      hoverColor: 'hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10',
      label: 'Growzen Studio',
    },
    {
      name: 'TikTok',
      url: AGENCY_CONFIG.socials.tiktok,
      icon: <Video className="w-4 h-4" />,
      hoverColor: 'hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/10',
      label: '@growzen_agency',
    },
    {
      name: 'WhatsApp',
      url: AGENCY_CONFIG.socials.whatsapp,
      icon: <MessageCircle className="w-4 h-4" />,
      hoverColor: 'hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10',
      label: AGENCY_CONFIG.phoneDisplay,
    },
  ];

  return (
    <footer id="footer" className="bg-[#070A0D] border-t border-white/[0.08] pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/[0.08]">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-700 p-0.5">
                <div className="w-full h-full bg-[#0B1015] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-lg text-white font-display">G.</span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                {AGENCY_CONFIG.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              {AGENCY_CONFIG.tagline}. High-conversion digital strategies, modern web design, and graphic craft starting from $5.
            </p>

            {/* Leadership attribution */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] max-w-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Leadership
              </span>
              <p className="text-xs leading-relaxed text-slate-300">
                Growzen Agency is proudly founded and led by{' '}
                <span className="text-emerald-400 font-semibold text-[13px]">{AGENCY_CONFIG.founders.partner1}</span> and{' '}
                <span className="text-emerald-400 font-semibold text-[14px]">{AGENCY_CONFIG.founders.partner2}</span>,{' '}
                whose combined vision and expertise drive our commitment to delivering high impact digital solutions for our clients.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{AGENCY_CONFIG.location}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-display">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">About Growzen</a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">All 8 Services</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-emerald-400 transition-colors">Client Showcase</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-emerald-400 transition-colors">Reviews & Ratings</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing Packages</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-emerald-400 transition-colors">Book Consultation</a>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-display">
              Agency Services (From $5)
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>Graphic Design (Posters & 3D Videos)</li>
              <li>Wedding & Invitation Cards</li>
              <li>Shopify Store & Web Development</li>
              <li>UI/UX Design & Prototypes</li>
              <li>Meta Ads (Facebook & Instagram)</li>
              <li>SEO & Search Optimization</li>
              <li>Restaurant Menu Design (Print & QR)</li>
              <li>Social Media Management</li>
            </ul>
          </div>

          {/* Social Profiles & Direct Reach */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-display">
              Connect on Social Media
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Follow our latest reel breakdowns, client launches, and graphic design templates:
            </p>

            {/* Social Icons List */}
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`footer-social-${item.name.toLowerCase()}`}
                  className={`flex items-center gap-2 p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 transition-all ${item.hoverColor}`}
                >
                  <span className="p-1 rounded-lg bg-black/40">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </a>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp / Call: <strong>{AGENCY_CONFIG.phoneDisplay}</strong></span>
              </div>
              <a 
                href={`mailto:${AGENCY_CONFIG.email}`} 
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{AGENCY_CONFIG.email}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Growzen Agency. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
