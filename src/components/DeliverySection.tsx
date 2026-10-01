import React, { useState } from 'react';
import { MapPin, Sparkles, MessageSquare, Clock, ShieldCheck, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { WHATSAPP_NUMBER_RAW } from '../utils/whatsapp';

interface DeliverySectionProps {
  onOpenCart: () => void;
}

interface DeliveryZone {
  area: string;
  eta: string;
  description: string;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({ onOpenCart }) => {
  const { isDay } = useTheme();

  const zones: DeliveryZone[] = [
    { area: 'Nsuo Anu (Hub Vicinity)', eta: '15 – 25 mins', description: 'Immediate direct dispatch from our kitchen' },
    { area: 'Lakeside Estate (Comm. 1 – 4)', eta: '25 – 35 mins', description: 'Fast doorstep bike delivery with thermal warmer' },
    { area: 'Lakeside Estate (Comm. 5 – 8+)', eta: '30 – 40 mins', description: 'Regular delivery route with insulated box' },
    { area: 'Ashaley Botwe', eta: '30 – 45 mins', description: 'Dispatched via verified courier' },
    { area: 'Adenta & Adenta Barrier', eta: '35 – 50 mins', description: 'Fresh and steaming hot upon arrival' },
    { area: 'East Legon Hills', eta: '35 – 50 mins', description: 'Daily delivery service available' },
  ];

  const [selectedZone, setSelectedZone] = useState<string>(zones[0].area);
  const activeZone = zones.find((z) => z.area === selectedZone) || zones[0];

  const steps = [
    {
      num: '01',
      title: 'Select Your Meal',
      desc: 'Browse our signature Banku with Tilapia, Ghanaian party Jollof, Attieke, or morning breakfast porridges.',
    },
    {
      num: '02',
      title: 'Send via WhatsApp',
      desc: 'One click compiles your choices and address directly to our official WhatsApp ordering line.',
    },
    {
      num: '03',
      title: 'Freshly Cooked & Packed',
      desc: 'Our culinary team prepares your dishes fresh to order, packed hot in hygienic thermal food containers.',
    },
    {
      num: '04',
      title: 'Speedy Doorstep Delivery',
      desc: 'Delivered directly to your home, office, or gate in Lakeside Estate, Nsuo Anu, Ashaley Botwe, and surrounding Accra areas.',
    },
  ];

  return (
    <section id="delivery" className={`py-16 lg:py-24 border-b scroll-mt-20 transition-colors duration-300 ${
      isDay ? 'bg-[#F4F1EA] border-[#D1E7DD]' : 'bg-[#03100A] border-[#0F3823]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
            <span>Doorstep Service</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-serif font-extrabold ${
            isDay ? 'text-[#062316]' : 'text-white'
          }`}>
            Food Delivery: Fast. Fresh. Reliable.
          </h2>
          <p className={`mt-3 text-sm ${isDay ? 'text-[#2D4A3E]' : 'text-slate-300'}`}>
            Enjoy steaming hot Ghanaian cuisine without stepping out of your comfort zone. We deliver across Lakeside Estate and neighboring communities.
          </p>
        </div>

        {/* 4 Clean Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`p-6 rounded-2xl border space-y-3 relative group transition-colors duration-300 ${
                isDay
                  ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-sm hover:border-[#8C6207]/40'
                  : 'bg-[#061F14] border-[#0F3823] hover:border-[#C5972C]/40'
              }`}
            >
              <span className={`text-2xl font-serif font-bold font-mono ${
                isDay ? 'text-[#8C6207]' : 'text-[#F5D061]/80'
              }`}>
                {step.num}
              </span>
              <h3 className={`text-base font-serif font-bold ${
                isDay ? 'text-[#062316]' : 'text-white'
              }`}>
                {step.title}
              </h3>
              <p className={`text-xs leading-relaxed ${
                isDay ? 'text-[#506A5F]' : 'text-slate-400'
              }`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Zone & ETA Calculator Card */}
        <div className={`rounded-2xl border p-6 sm:p-8 mb-10 transition-colors duration-300 ${
          isDay ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-sm' : 'bg-[#061F14] border-[#0F442C]'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
                isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'
              }`}>
                <MapPin className="w-4 h-4" />
                <span>Check Delivery Times to Your Area</span>
              </div>
              <h3 className={`text-xl font-serif font-bold ${isDay ? 'text-[#062316]' : 'text-white'}`}>
                Select your neighborhood in Lakeside Estate & Accra
              </h3>
              <p className={`text-xs leading-relaxed ${isDay ? 'text-[#2D4A3E]' : 'text-slate-300'}`}>
                We pack our dishes in high-grade insulated containers so your grilled tilapia stays crisp and your party Jollof stays piping hot upon doorstep arrival.
              </p>

              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${
                  isDay ? 'text-[#062316]' : 'text-slate-300'
                }`}>
                  Choose Location:
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className={`w-full max-w-md px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none font-medium cursor-pointer ${
                    isDay
                      ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] focus:border-[#8C6207]'
                      : 'bg-[#04140D] border-[#0F3823] text-white focus:border-[#F5D061]'
                  }`}
                >
                  {zones.map((z) => (
                    <option key={z.area} value={z.area}>
                      {z.area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Estimated Output Result */}
            <div className={`lg:col-span-6 p-6 rounded-xl border flex flex-col justify-between space-y-4 ${
              isDay ? 'bg-[#FAF8F5] border-[#B9D5C7]' : 'bg-[#04140D] border-[#0F3823]'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isDay ? 'text-[#0E4A2F]' : 'text-emerald-400'
                }`}>
                  Live Delivery Route
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                  isDay
                    ? 'bg-[#EBF5F0] text-[#0E4A2F] border-[#B9D5C7]'
                    : 'bg-[#092B1B] text-[#F5D061] border-[#C5972C]/40'
                }`}>
                  Active Zone
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <Clock className={`w-5 h-5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
                  <span className={`text-2xl font-serif font-extrabold ${isDay ? 'text-[#062316]' : 'text-white'}`}>
                    {activeZone.eta}
                  </span>
                  <span className={`text-xs ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
                    average delivery time
                  </span>
                </div>
                <p className={`mt-1.5 text-xs ${isDay ? 'text-[#2D4A3E]' : 'text-slate-300'}`}>
                  {activeZone.description} to <strong>{activeZone.area}</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={onOpenCart}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  Order Tray to {activeZone.area}
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(`Hello Uplands Culinary Hub, I would like to place an order to ${activeZone.area}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isDay
                      ? 'text-[#062316] bg-white border border-[#B9D5C7] hover:bg-[#EBF5F0]'
                      : 'text-slate-200 bg-[#0B3522] border border-[#C5972C]/40 hover:bg-[#11482E]'
                  }`}
                >
                  <MessageSquare className={`w-3.5 h-3.5 ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
                  <span>WhatsApp This Area</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Trust Banner (Ghanaian Context) */}
        <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-300 ${
          isDay ? 'bg-[#FFFFFF] border-[#D1E7DD]' : 'bg-[#061F14] border-[#0F3823]'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isDay ? 'bg-[#EBF5F0] text-[#0E4A2F]' : 'bg-[#0B3522] text-[#F5D061]'
            }`}>
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`text-sm font-serif font-bold ${isDay ? 'text-[#062316]' : 'text-white'}`}>
                Simple & Convenient Ghanaian Payment Options
              </h4>
              <p className={`text-xs mt-0.5 ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
                Pay with peace of mind. We accept <strong>MTN Mobile Money (MoMo)</strong>, <strong>Telecel Cash</strong>, or <strong>Cash on Delivery/Pickup</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${
              isDay
                ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316]'
                : 'bg-[#04140D] border-[#0F3823] text-slate-200'
            }`}>
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              MTN MoMo
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${
              isDay
                ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316]'
                : 'bg-[#04140D] border-[#0F3823] text-slate-200'
            }`}>
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Telecel Cash
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${
              isDay
                ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316]'
                : 'bg-[#04140D] border-[#0F3823] text-slate-200'
            }`}>
              <Banknote className="w-3.5 h-3.5 text-emerald-500" />
              Cash on Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
