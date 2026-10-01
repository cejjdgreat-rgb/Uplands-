import React from 'react';
import { Instagram, Facebook, Video, MessageCircle, MapPin, Phone, Mail, Clock, ArrowUp, Lock, Shield } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { isDay } = useTheme();
  const { settings, content } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenAdmin) {
      onOpenAdmin();
    } else {
      window.location.hash = '#admin';
    }
  };

  return (
    <footer className={`border-t pt-16 pb-24 md:pb-16 transition-colors duration-300 ${
      isDay
        ? 'bg-[#EBF5F0] border-[#D1E7DD] text-[#244234]'
        : 'bg-[#020B07] border-[#0F3823] text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b ${
          isDay ? 'border-[#D1E7DD]' : 'border-[#0F3823]'
        }`}>
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-start">
              <BrandLogo size="md" />
            </div>

            <p className={`text-xs leading-relaxed max-w-sm ${
              isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
            }`}>
              <strong className={isDay ? 'text-[#062316]' : 'text-white'}>{settings.restaurantName}</strong> — authentic Ghanaian cuisine, signature charcoal grills, wholesome morning porridges, and full-service event catering.
            </p>

            <p className={`font-serif italic text-sm ${
              isDay ? 'text-[#8C6207] font-semibold' : 'text-[#FBE08D]'
            }`}>
              &quot;{content.footerTagline || 'Good Food. Great Taste. Made with Love.'}&quot;
            </p>

            {/* Verified Social Media Links */}
            <div className="pt-2">
              <p className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${
                isDay ? 'text-[#062316]' : 'text-slate-400'
              }`}>
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                {settings.socialLinks.instagram && (
                  <a
                    href={settings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isDay
                        ? 'bg-white border border-[#B9D5C7] text-[#062316] hover:text-[#8C6207] hover:border-[#8C6207]'
                        : 'bg-[#061F14] border border-[#0F3823] text-slate-300 hover:text-[#F5D061] hover:border-[#F5D061]'
                    }`}
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {settings.socialLinks.facebook && (
                  <a
                    href={settings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isDay
                        ? 'bg-white border border-[#B9D5C7] text-[#062316] hover:text-[#8C6207] hover:border-[#8C6207]'
                        : 'bg-[#061F14] border border-[#0F3823] text-slate-300 hover:text-[#F5D061] hover:border-[#F5D061]'
                    }`}
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {settings.socialLinks.tiktok && (
                  <a
                    href={settings.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isDay
                        ? 'bg-white border border-[#B9D5C7] text-[#062316] hover:text-[#8C6207] hover:border-[#8C6207]'
                        : 'bg-[#061F14] border border-[#0F3823] text-slate-300 hover:text-[#F5D061] hover:border-[#F5D061]'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                  </a>
                )}
                {settings.socialLinks.snapchat && (
                  <a
                    href={settings.socialLinks.snapchat}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Snapchat"
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isDay
                        ? 'bg-white border border-[#B9D5C7] text-[#062316] hover:text-[#8C6207] hover:border-[#8C6207]'
                        : 'bg-[#061F14] border border-[#0F3823] text-slate-300 hover:text-[#F5D061] hover:border-[#F5D061]'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isDay ? 'text-[#062316]' : 'text-white'
            }`}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className={isDay ? 'hover:text-[#8C6207] text-[#244234] transition-colors' : 'hover:text-[#F5D061] transition-colors'}>
                  Signature Menu & Prices
                </a>
              </li>
              <li>
                <a href="#catering" className={isDay ? 'hover:text-[#8C6207] text-[#244234] transition-colors' : 'hover:text-[#F5D061] transition-colors'}>
                  Catering & Outdoor Events
                </a>
              </li>
              <li>
                <a href="#reservations" className={isDay ? 'hover:text-[#8C6207] text-[#244234] transition-colors' : 'hover:text-[#F5D061] transition-colors'}>
                  Reserve a Dining Table
                </a>
              </li>
              <li>
                <a href="#delivery" className={isDay ? 'hover:text-[#8C6207] text-[#244234] transition-colors' : 'hover:text-[#F5D061] transition-colors'}>
                  Food Delivery Coverage
                </a>
              </li>
              <li>
                <a href="#about" className={isDay ? 'hover:text-[#8C6207] text-[#244234] transition-colors' : 'hover:text-[#F5D061] transition-colors'}>
                  Our Culinary Philosophy
                </a>
              </li>
              <li>
                <a href="#faq" className={isDay ? 'hover:text-[#8C6207] text-[#244234] transition-colors' : 'hover:text-[#F5D061] transition-colors'}>
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#contact" className={isDay ? 'hover:text-[#8C6207] text-[#244234] transition-colors' : 'hover:text-[#F5D061] transition-colors'}>
                  Contact & Map Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Menu Specialties */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isDay ? 'text-[#062316]' : 'text-white'
            }`}>
              Signature Dishes
            </h4>
            <ul className={`space-y-1.5 text-xs ${
              isDay ? 'text-[#3E5C4E]' : 'text-slate-400'
            }`}>
              <li>Banku with Grilled Tilapia</li>
              <li>Ghanaian Party Jollof Rice</li>
              <li>Fried Rice & Grilled Chicken</li>
              <li>Attieke with Tilapia</li>
              <li>Tom Brown Porridge</li>
              <li>Oat & Wheat Porridge</li>
              <li>Tea with Soft Bread</li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isDay ? 'text-[#062316]' : 'text-white'
            }`}>
              Hub Location & Contact
            </h4>
            <div className={`space-y-2 text-xs ${
              isDay ? 'text-[#1E4333]' : 'text-slate-300'
            }`}>
              <div className="flex items-start gap-2">
                <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
                <a href={`tel:${settings.phone1}`} className={`font-mono font-medium ${isDay ? 'hover:text-[#8C6207]' : 'hover:text-[#F5D061]'}`}>
                  {settings.phone1}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
                <a href={`mailto:${settings.email}`} className={isDay ? 'hover:text-[#8C6207]' : 'hover:text-[#F5D061]'}>
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className={`w-4 h-4 shrink-0 mt-0.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
                <span>Open Mon–Sun: {settings.weekdayHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with subtle Admin Dashboard link & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className={isDay ? 'text-[#506A5F]' : 'text-slate-500'}>
            {content.footerCopyright || `© ${new Date().getFullYear()} Uplands Culinary Hub. All rights reserved. Lakeside Estate, Nsuo Anu, Accra.`}
          </p>

          <div className="flex items-center gap-6">
            {/* Subtle, discreet Admin Dashboard Link */}
            <a
              href="#admin"
              onClick={handleAdminClick}
              className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-2 rounded-md ${
                isDay
                  ? 'text-[#506A5F] hover:text-[#8C6207] hover:bg-[#DDF0E6]'
                  : 'text-slate-500 hover:text-[#F5D061] hover:bg-[#061F14]'
              }`}
              title="Restricted Staff Portal"
            >
              <Shield className="w-3.5 h-3.5 opacity-70" />
              <span className="font-medium text-[11px]">Admin Dashboard</span>
            </a>

            <button
              onClick={scrollToTop}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDay ? 'text-[#1E4333] hover:text-[#8C6207]' : 'text-slate-400 hover:text-[#F5D061]'
              }`}
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
