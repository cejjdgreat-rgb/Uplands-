import React from 'react';
import { MessageSquare, Utensils, Sparkles, MapPin, Clock, Phone, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';
import { PRIMARY_PHONE_1, WHATSAPP_NUMBER_RAW } from '../utils/whatsapp';

interface HeroProps {
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCart, onOpenReservation }) => {
  const { isDay } = useTheme();
  const { content, settings } = useStore();

  return (
    <section className={`relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b transition-colors duration-300 ${
      isDay
        ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316]'
        : 'bg-[#04140D] border-[#0F3823] text-slate-100'
    }`}>
      {/* Subtle radial emerald & gold glow backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40">
        <div className={`absolute top-10 left-1/4 w-96 h-96 rounded-full blur-[128px] ${
          isDay ? 'bg-[#98D8B6]/30' : 'bg-[#0B4D2B]'
        }`} />
        <div className={`absolute top-20 right-1/4 w-96 h-96 rounded-full blur-[140px] ${
          isDay ? 'bg-[#ECC46A]/25' : 'bg-[#C5972C]/20'
        }`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Message & Direct CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Quiet metadata line without pills */}
            <div className={`flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide mb-4 ${
              isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'
            }`}>
              <span className="flex items-center gap-1">
                <MapPin className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
                Lakeside Estate, Nsuo Anu, Accra
              </span>
              <span aria-hidden="true" className={isDay ? 'text-slate-400' : 'text-slate-600'}>·</span>
              <span className="flex items-center gap-1">
                <Clock className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
                Daily 7:00 AM – 9:30 PM
              </span>
              <span aria-hidden="true" className={isDay ? 'text-slate-400' : 'text-slate-600'}>·</span>
              <span className={isDay ? 'text-[#0E4A2F]' : 'text-emerald-400'}>
                {content.heroBadgeText || 'Authentic Ghanaian Cuisine'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold leading-[1.12] tracking-tight ${
              isDay ? 'text-[#062316]' : 'text-white'
            }`}>
              {content.heroHeadline || 'Good Food. Great Taste.'}{' '}
              <span className={isDay ? 'gold-gradient-text-day block sm:inline' : 'gold-gradient-text block sm:inline'}>
                {content.heroHeadlineHighlight || 'Made with Love.'}
              </span>
            </h1>

            {/* Brand Paragraph */}
            <p className={`mt-5 text-base sm:text-lg leading-relaxed max-w-2xl ${
              isDay ? 'text-[#244234]' : 'text-slate-300'
            }`}>
              {content.heroTagline || (
                <>
                  Welcome to <strong className={isDay ? 'text-[#062316] font-semibold' : 'text-white font-semibold'}>{settings.restaurantName}</strong>. 
                  From smoky Ghanaian party Jollof and char-grilled Tilapia with fresh hot Banku 
                  to hearty morning breakfast bowls and full outdoor event catering, we cook with passion, 
                  authenticity, and premium West African flavors.
                </>
              )}
            </p>

            {/* Verified Services Summary */}
            <div className={`mt-6 py-3 border-y flex flex-wrap items-center gap-y-2 gap-x-6 text-xs ${
              isDay
                ? 'border-[#D1E7DD] text-[#1C3B2E]'
                : 'border-[#0F3823] text-slate-300'
            }`}>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5972C]" />
                Catering for All Occasions
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5972C]" />
                Outdoor Events & Live Grills
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5972C]" />
                Fast & Fresh Food Delivery
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent('Hello Uplands Culinary Hub, I would like to place an order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] rounded-lg shadow-lg hover:brightness-110 active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-[#062316]" />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href="#menu"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isDay
                    ? 'text-[#062316] bg-[#FFFFFF] border border-[#B9D5C7] hover:bg-[#EBF5F0] hover:border-[#0E4A2F]'
                    : 'text-white bg-[#0B3522] border border-[#C5972C]/40 hover:bg-[#11482E] hover:border-[#F5D061]'
                }`}
              >
                <Utensils className={`w-4 h-4 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
                <span>Explore Menu</span>
              </a>

              <button
                onClick={onOpenReservation}
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm font-medium transition-colors cursor-pointer ${
                  isDay
                    ? 'text-[#1C3B2E] hover:text-[#062316]'
                    : 'text-slate-300 hover:text-[#F5D061]'
                }`}
              >
                <span>Reserve a Table</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Direct phone and WhatsApp quick call line */}
            <div className={`mt-8 flex items-center gap-4 text-xs ${
              isDay ? 'text-[#506A5F]' : 'text-slate-400'
            }`}>
              <span>Direct lines:</span>
              <a href={`tel:${PRIMARY_PHONE_1}`} className={`font-mono font-medium flex items-center gap-1 transition-colors ${
                isDay ? 'text-[#062316] hover:text-[#8C6207]' : 'text-slate-200 hover:text-[#F5D061]'
              }`}>
                <Phone className={`w-3 h-3 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
                +233 24 113 1434
              </a>
              <span className={isDay ? 'text-slate-400' : 'text-slate-600'}>/</span>
              <a href="tel:+233554235619" className={`font-mono font-medium transition-colors ${
                isDay ? 'text-[#062316] hover:text-[#8C6207]' : 'text-slate-200 hover:text-[#F5D061]'
              }`}>
                +233 55 423 5619
              </a>
            </div>
          </div>

          {/* Right Column: High-Fidelity Culinary Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className={`relative rounded-2xl overflow-hidden border shadow-2xl group transition-all duration-300 ${
              isDay
                ? 'border-[#B9D5C7] bg-[#FFFFFF] shadow-[#0B4D2B]/10'
                : 'border-[#C5972C]/30 bg-[#061F14]'
            }`}>
              <img
                src="/src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg"
                alt="Uplands Culinary Hub signature feast with Banku with Tilapia, Ghanaian Jollof, and Fried Rice"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Scrim overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Artwork Verification Ribbon Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#061F14]/95 backdrop-blur-md border border-[#0F442C]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F5D061] shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">Signature Platters</p>
                      <p className="text-[11px] text-slate-300">Banku · Tilapia · Jollof · Attieke</p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenCart}
                    className="px-3 py-1.5 text-xs font-semibold text-[#062316] bg-[#F5D061] rounded-md hover:bg-white transition-colors cursor-pointer shrink-0"
                  >
                    Quick Order
                  </button>
                </div>
              </div>
            </div>

            {/* Quick breakfast reminder floating badge */}
            <div className={`absolute -top-3 -right-3 hidden sm:flex items-center gap-2 px-3 py-1.5 border rounded-lg shadow-lg text-xs font-medium transition-all duration-300 ${
              isDay
                ? 'bg-[#FFFFFF] border-[#B9D5C7] text-[#062316]'
                : 'bg-[#092E1B] border-[#C5972C]/50 text-[#FBE08D]'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Breakfast Porridge from 7:00 AM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

