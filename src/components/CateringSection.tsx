import React, { useState } from 'react';
import { Sparkles, CheckCircle2, MessageSquare, ArrowRight, Calculator, Users } from 'lucide-react';
import { CATERING_PACKAGES } from '../data/menuData';
import { CateringInquiry } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';
import { createWhatsAppCateringUrl, PRIMARY_PHONE_1 } from '../utils/whatsapp';

export const CateringSection: React.FC = () => {
  const { isDay } = useTheme();
  const { addEnquiry } = useStore();

  // Calculator State
  const [calcGuests, setCalcGuests] = useState<number>(60);
  const [calcStyle, setCalcStyle] = useState<'buffet' | 'live_grill' | 'wedding' | 'breakfast'>('live_grill');
  const [includeBeverages, setIncludeBeverages] = useState(true);
  const [includeCrew, setIncludeCrew] = useState(true);

  const pricePerGuestMap = {
    breakfast: 40,
    buffet: 65,
    live_grill: 95,
    wedding: 125,
  };

  const styleNames = {
    breakfast: 'Morning Breakfast Porridge Bar',
    buffet: 'Party Jollof & Fried Rice Chafing Buffet',
    live_grill: 'Live Charcoal Tilapia & Chicken Grill + Buffet',
    wedding: 'Executive Wedding Banquet & Live Carvery',
  };

  const basePricePerHead = pricePerGuestMap[calcStyle];
  const beverageAddon = includeBeverages ? 15 : 0;
  const crewAddonTotal = includeCrew ? 350 : 0;
  const totalEstimatedCost = (basePricePerHead + beverageAddon) * calcGuests + crewAddonTotal;

  // Form State
  const [form, setForm] = useState<CateringInquiry>({
    fullName: '',
    phone: '',
    email: '',
    eventType: 'outdoor_event',
    eventDate: '',
    guestCount: 60,
    locationArea: 'Lakeside Estate, Accra',
    preferredServices: ['Live Charcoal Grill Station', 'Full Buffet Setup'],
    additionalNotes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [cateringWhatsAppUrl, setCateringWhatsAppUrl] = useState('');

  const serviceOptions = [
    'Live Charcoal Grill Station (Tilapia & Chicken)',
    'Full Chafing Buffet Setup & Warmers',
    'Individually Packaged Thermal Lunch Boxes',
    'Morning Breakfast Porridge Bar (Tom Brown, Oat, Wheat)',
    'Professional Uniformed Serving Crew',
  ];

  const toggleService = (srv: string) => {
    setForm((prev) => {
      const exists = prev.preferredServices.includes(srv);
      return {
        ...prev,
        preferredServices: exists
          ? prev.preferredServices.filter((s) => s !== srv)
          : [...prev.preferredServices, srv],
      };
    });
  };

  const handleApplyEstimateToForm = () => {
    setForm((prev) => ({
      ...prev,
      guestCount: calcGuests,
      additionalNotes: `Selected Style: ${styleNames[calcStyle]} (Est. GH₵ ${totalEstimatedCost.toLocaleString()}). ${prev.additionalNotes}`,
    }));
    const element = document.getElementById('catering-quote-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      type: 'catering',
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      eventDate: form.eventDate,
      eventType: form.eventType,
      guestCount: form.guestCount,
      locationArea: form.locationArea,
      preferredServices: form.preferredServices,
      message: form.additionalNotes,
    });
    const url = createWhatsAppCateringUrl(form);
    setCateringWhatsAppUrl(url);
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  return (
    <section id="catering" className={`py-16 lg:py-24 border-b scroll-mt-20 transition-colors duration-300 relative ${
      isDay ? 'bg-[#F4F1EA] border-[#D1E7DD]' : 'bg-[#03100A] border-[#0F3823]'
    }`}>
      {/* Anchor for #events navigation */}
      <div id="events" className="absolute -top-20 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
            <span>Catering & Outdoor Events</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-serif font-extrabold ${
            isDay ? 'text-[#062316]' : 'text-white'
          }`}>
            For All Occasions. We&apos;ve Got You Covered.
          </h2>
          <p className={`mt-3 text-sm leading-relaxed ${
            isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
          }`}>
            Whether you are hosting an outdoor celebration with a live grilled tilapia station, a corporate retreat in Accra, or an intimate private gathering in Lakeside Estate, Uplands Culinary Hub delivers authentic flavor and impeccable hospitality.
          </p>
        </div>

        {/* Feature Hero Banner */}
        <div className={`rounded-2xl overflow-hidden border mb-16 grid grid-cols-1 lg:grid-cols-12 shadow-2xl transition-colors duration-300 ${
          isDay
            ? 'border-[#D1E7DD] bg-[#FFFFFF] shadow-[#0B4D2B]/5'
            : 'border-[#0F442C] bg-[#061F14]'
        }`}>
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
            <img
              src="/src/assets/images/catering_event_outdoor_1790612517851.jpg"
              alt="Uplands Culinary Hub outdoor event and catering setup"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className={`absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent ${
              isDay ? 'via-[#FFFFFF]/30 to-[#FFFFFF]' : 'via-[#061F14]/40 to-[#061F14]'
            }`} />
          </div>

          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-center space-y-6">
            <span className={`text-xs font-semibold uppercase tracking-wider ${
              isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'
            }`}>
              Live Outdoor Culinary Experience
            </span>
            <h3 className={`text-2xl font-serif font-bold ${
              isDay ? 'text-[#062316]' : 'text-white'
            }`}>
              The Aroma of Fresh Charcoal Grills at Your Venue
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
            }`}>
              Nothing elevates an event quite like hot, sizzling whole tilapia and spiced chicken grilled fresh on-site, accompanied by rich Ghanaian party Jollof, fragrant fried rice, and house-made shito.
            </p>

            <ul className={`space-y-2.5 text-xs ${
              isDay ? 'text-[#1C3B2E]' : 'text-slate-200'
            }`}>
              <li className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
                <span>Customized menus suited to your guest size and budget</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
                <span>Punctual setup, warm chafing dish displays & sanitary standards</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
                <span>Full outdoor event coverage in Lakeside Estate & Greater Accra</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={`tel:${PRIMARY_PHONE_1}`}
                className={`inline-flex items-center gap-2 text-xs font-bold hover:underline ${
                  isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'
                }`}
              >
                <span>Call Catering Director directly: +233 24 113 1434</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CATERING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 transition-colors duration-300 ${
                isDay
                  ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-sm hover:border-[#8C6207]/40'
                  : 'bg-[#061F14] border-[#0F3823]'
              }`}
            >
              <div className="space-y-3">
                <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                  isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
                }`}>
                  {pkg.idealFor}
                </span>
                <h4 className={`text-lg font-serif font-bold ${
                  isDay ? 'text-[#062316]' : 'text-white'
                }`}>
                  {pkg.title}
                </h4>
                <p className={`text-xs leading-relaxed ${
                  isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
                }`}>
                  {pkg.description}
                </p>

                <ul className={`space-y-2 pt-2 text-xs ${
                  isDay ? 'text-[#506A5F]' : 'text-slate-400'
                }`}>
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`font-bold ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`pt-4 border-t ${isDay ? 'border-[#E2EFE7]' : 'border-[#0F3823]'}`}>
                <p className={`text-[11px] font-semibold mb-3 ${
                  isDay ? 'text-[#8C6207]' : 'text-[#FBE08D]'
                }`}>
                  {pkg.priceEstimate}
                </p>
                <a
                  href={`https://wa.me/233241131434?text=${encodeURIComponent(`Hello Uplands Culinary Hub, I am interested in your ${pkg.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] hover:brightness-110 transition-all cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-[#062316]" />
                  <span>Inquire About Package</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Catering Budget Estimator */}
        <div className={`rounded-2xl border p-6 sm:p-8 mb-16 transition-colors duration-300 ${
          isDay ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-sm' : 'bg-[#061F14] border-[#0F442C]'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#0F3823]/20">
            <div>
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1 ${
                isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'
              }`}>
                <Calculator className="w-4 h-4" />
                <span>Instant Cost Estimator</span>
              </div>
              <h3 className={`text-xl font-serif font-bold ${isDay ? 'text-[#062316]' : 'text-white'}`}>
                Plan Your Event Catering Budget
              </h3>
            </div>
            <span className={`text-xs ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
              Interactive tool · Transparent pricing
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Guest Count Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={`text-xs font-bold flex items-center gap-1.5 ${isDay ? 'text-[#062316]' : 'text-slate-200'}`}>
                    <Users className="w-3.5 h-3.5 text-[#C5972C]" />
                    <span>Number of Guests:</span>
                  </label>
                  <span className={`text-base font-bold font-mono px-3 py-0.5 rounded-lg border tabular-nums ${
                    isDay
                      ? 'bg-[#EBF5F0] border-[#B9D5C7] text-[#0E4A2F]'
                      : 'bg-[#0B3522] border-[#C5972C]/40 text-[#FBE08D]'
                  }`}>
                    {calcGuests} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="5"
                  value={calcGuests}
                  onChange={(e) => setCalcGuests(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#E6B849]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>20 guests (Intimate)</span>
                  <span>100 guests</span>
                  <span>250 guests</span>
                  <span>500+ guests (Grand)</span>
                </div>
              </div>

              {/* Service Style Selector */}
              <div>
                <label className={`block text-xs font-bold mb-2 ${isDay ? 'text-[#062316]' : 'text-slate-200'}`}>
                  Select Catering Style:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {(['breakfast', 'buffet', 'live_grill', 'wedding'] as const).map((styleKey) => {
                    const isSelected = calcStyle === styleKey;
                    return (
                      <button
                        key={styleKey}
                        type="button"
                        onClick={() => setCalcStyle(styleKey)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? isDay
                              ? 'bg-[#EBF5F0] border-[#0E4A2F] text-[#062316] font-semibold'
                              : 'bg-[#0B3522] border-[#F5D061] text-[#FBE08D]'
                            : isDay
                            ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#244234] hover:bg-[#EBF5F0]'
                            : 'bg-[#04140D] border-[#0F3823] text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="font-bold">{styleNames[styleKey].split(' ')[0]} {styleNames[styleKey].split(' ')[1]}</span>
                          <span className="font-mono font-bold">GH₵ {pricePerGuestMap[styleKey]}/head</span>
                        </div>
                        <p className="text-[11px] opacity-80 truncate">{styleNames[styleKey]}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons checkboxes */}
              <div className="space-y-2">
                <label className={`block text-xs font-bold ${isDay ? 'text-[#062316]' : 'text-slate-200'}`}>
                  Optional Add-Ons:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer ${
                    includeBeverages
                      ? isDay ? 'bg-[#EBF5F0] border-[#0E4A2F]' : 'bg-[#0B3522] border-[#F5D061]'
                      : isDay ? 'bg-[#FAF8F5] border-[#D1E7DD]' : 'bg-[#04140D] border-[#0F3823]'
                  }`}>
                    <input
                      type="checkbox"
                      checked={includeBeverages}
                      onChange={(e) => setIncludeBeverages(e.target.checked)}
                      className="rounded text-[#0E4A2F]"
                    />
                    <span>Chilled Hibiscus (Sobolo) & Juice Bar (+GH₵ 15/guest)</span>
                  </label>

                  <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer ${
                    includeCrew
                      ? isDay ? 'bg-[#EBF5F0] border-[#0E4A2F]' : 'bg-[#0B3522] border-[#F5D061]'
                      : isDay ? 'bg-[#FAF8F5] border-[#D1E7DD]' : 'bg-[#04140D] border-[#0F3823]'
                  }`}>
                    <input
                      type="checkbox"
                      checked={includeCrew}
                      onChange={(e) => setIncludeCrew(e.target.checked)}
                      className="rounded text-[#0E4A2F]"
                    />
                    <span>Uniformed Chafing Service Crew (+GH₵ 350 flat)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className={`lg:col-span-5 p-6 rounded-2xl border space-y-5 ${
              isDay ? 'bg-[#FAF8F5] border-[#B9D5C7]' : 'bg-[#04140D] border-[#0F3823]'
            }`}>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${
                isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
              }`}>
                Estimated Budget Summary
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className={isDay ? 'text-[#506A5F]' : 'text-slate-400'}>Selected Package:</span>
                  <span className="font-semibold text-right max-w-[200px] truncate">{styleNames[calcStyle]}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDay ? 'text-[#506A5F]' : 'text-slate-400'}>Guest Count:</span>
                  <span className="font-semibold">{calcGuests} guests</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDay ? 'text-[#506A5F]' : 'text-slate-400'}>Per Guest Rate:</span>
                  <span className="font-mono font-bold">GH₵ {basePricePerHead + beverageAddon} / person</span>
                </div>
              </div>

              <div className={`pt-4 border-t ${isDay ? 'border-[#D1E7DD]' : 'border-[#0F3823]'}`}>
                <div className="flex items-baseline justify-between">
                  <span className={`text-xs font-semibold ${isDay ? 'text-[#244234]' : 'text-slate-300'}`}>
                    Total Estimated Budget:
                  </span>
                  <span className={`text-2xl font-serif font-extrabold font-mono tabular-nums ${
                    isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'
                  }`}>
                    GH₵ {totalEstimatedCost.toLocaleString()}
                  </span>
                </div>
                <p className={`text-[10px] mt-1 ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
                  *Official quotation will be confirmed based on venue location and custom protein selections.
                </p>
              </div>

              <button
                type="button"
                onClick={handleApplyEstimateToForm}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] shadow-sm hover:brightness-110 active:scale-98 transition-all cursor-pointer text-center"
              >
                Apply Estimate to Inquiry Form Below
              </button>
            </div>
          </div>
        </div>

        {/* Catering Inquiry Form */}
        <div id="catering-quote-form" className={`max-w-3xl mx-auto rounded-2xl border p-6 sm:p-10 shadow-2xl transition-colors duration-300 scroll-mt-24 ${
          isDay
            ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-[#0B4D2B]/5'
            : 'bg-[#061F14] border-[#0F442C]'
        }`}>
          <div className="text-center mb-8">
            <h3 className={`text-2xl font-serif font-bold ${
              isDay ? 'text-[#062316]' : 'text-white'
            }`}>
              Request a Catering Quote
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${
              isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
            }`}>
              Share your event details and our catering coordinator will prepare a tailored proposal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${
                  isDay ? 'text-[#062316]' : 'text-slate-200'
                }`}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Ama Darko"
                  className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                    isDay
                      ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                      : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${
                  isDay ? 'text-[#062316]' : 'text-slate-200'
                }`}>
                  Phone Number (WhatsApp preferred) *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="e.g. +233 24 XXX XXXX"
                  className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                    isDay
                      ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                      : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${
                  isDay ? 'text-[#062316]' : 'text-slate-200'
                }`}>
                  Event Type *
                </label>
                <select
                  value={form.eventType}
                  onChange={(e) => setForm({ ...form, eventType: e.target.value as any })}
                  className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                    isDay
                      ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] focus:border-[#8C6207]'
                      : 'bg-[#04140D] border-[#0F3823] text-white focus:border-[#F5D061]'
                  }`}
                >
                  <option value="outdoor_event">Outdoor Event / Party</option>
                  <option value="wedding">Wedding Reception</option>
                  <option value="corporate">Corporate Function</option>
                  <option value="private_dinner">Private Dinner</option>
                  <option value="party">Birthday / Milestone</option>
                  <option value="other">Other Occasion</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${
                  isDay ? 'text-[#062316]' : 'text-slate-200'
                }`}>
                  Event Date *
                </label>
                <input
                  type="date"
                  required
                  value={form.eventDate}
                  onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                  className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                    isDay
                      ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] focus:border-[#8C6207]'
                      : 'bg-[#04140D] border-[#0F3823] text-white focus:border-[#F5D061]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${
                  isDay ? 'text-[#062316]' : 'text-slate-200'
                }`}>
                  Estimated Guests *
                </label>
                <input
                  type="number"
                  min="10"
                  max="2000"
                  required
                  value={form.guestCount}
                  onChange={(e) => setForm({ ...form, guestCount: Number(e.target.value) })}
                  className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                    isDay
                      ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] focus:border-[#8C6207]'
                      : 'bg-[#04140D] border-[#0F3823] text-white focus:border-[#F5D061]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${
                isDay ? 'text-[#062316]' : 'text-slate-200'
              }`}>
                Event Venue / Location Area in Accra
              </label>
              <input
                type="text"
                value={form.locationArea}
                onChange={(e) => setForm({ ...form, locationArea: e.target.value })}
                placeholder="e.g. Lakeside Estate, Nsuo Anu / East Legon / Airport"
                className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                  isDay
                    ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                    : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-2 ${
                isDay ? 'text-[#062316]' : 'text-slate-200'
              }`}>
                Services Desired
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {serviceOptions.map((srv) => {
                  const isChecked = form.preferredServices.includes(srv);
                  return (
                    <label
                      key={srv}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                        isChecked
                          ? isDay
                            ? 'bg-[#EBF5F0] border-[#0E4A2F] text-[#062316]'
                            : 'bg-[#0B3522] border-[#F5D061] text-[#FBE08D]'
                          : isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#1C3B2E] hover:border-slate-400'
                          : 'bg-[#04140D] border-[#0F3823] text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleService(srv)}
                        className="rounded border-slate-400 text-[#0E4A2F] focus:ring-0"
                      />
                      <span>{srv}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${
                isDay ? 'text-[#062316]' : 'text-slate-200'
              }`}>
                Special Menu Requests or Notes
              </label>
              <textarea
                rows={3}
                value={form.additionalNotes}
                onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
                placeholder="Tell us about your theme, preferred dishes (Banku, Jollof, Attieke), dietary requirements..."
                className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                  isDay
                    ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                    : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-[#062316]" />
              <span>Submit Catering Inquiry via WhatsApp</span>
            </button>

            {submitted && (
              <div className="space-y-2 pt-2">
                <p className="text-center text-xs text-emerald-600 font-semibold">
                  Catering inquiry recorded in our kitchen dispatch system!
                </p>
                {cateringWhatsAppUrl && (
                  <a
                    href={cateringWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 px-4 text-xs font-bold text-center text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] rounded-xl hover:brightness-110 cursor-pointer shadow-md transition-all"
                  >
                    Open WhatsApp Chat Directly
                  </a>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
