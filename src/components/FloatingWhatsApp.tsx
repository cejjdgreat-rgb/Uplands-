import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { WHATSAPP_NUMBER_RAW } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const { isDay } = useTheme();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Direct WhatsApp Assistance"
      className="hidden md:flex fixed bottom-6 left-6 z-40 items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-500"
    >
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent('Hello Uplands Culinary Hub, I would like to place an order or make an inquiry.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Uplands Culinary Hub on WhatsApp"
        className={`group flex items-center gap-3 px-4 py-3 rounded-full border shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${
          isDay
            ? 'bg-[#FFFFFF] border-[#B9D5C7] text-[#062316] hover:border-[#8C6207]'
            : 'bg-[#061F14] border-[#C5972C]/40 text-white hover:border-[#F5D061]'
        }`}
      >
        <div className="relative w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:rotate-12 transition-transform">
          <MessageSquare className="w-4 h-4 fill-white" />
          {/* Subtle green pulse */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>

        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold font-serif leading-none">Order on WhatsApp</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 font-bold tracking-wider uppercase">
              Online
            </span>
          </div>
          <p className={`text-[10px] mt-0.5 leading-none ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
            Fast kitchen dispatch · Lakeside Estate
          </p>
        </div>
      </a>

      <button
        onClick={() => setIsDismissed(true)}
        aria-label="Hide WhatsApp shortcut"
        className={`p-1.5 rounded-full border text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer ${
          isDay ? 'bg-white border-[#D1E7DD] text-slate-500' : 'bg-[#061F14] border-[#0F3823] text-slate-400'
        }`}
        title="Hide button"
      >
        <X className="w-3 h-3" />
      </button>
    </aside>
  );
};
