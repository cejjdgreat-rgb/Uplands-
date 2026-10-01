import React from 'react';
import { Utensils, MessageSquare, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PRIMARY_PHONE_1, WHATSAPP_NUMBER_RAW } from '../utils/whatsapp';

interface MobileActionBarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  cartCount,
  onOpenCart,
}) => {
  const { isDay } = useTheme();
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Lakeside Estate Nsuo Anu Accra Ghana')}`;

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-lg px-2 py-1.5 h-16 flex items-center justify-around shadow-2xl transition-colors duration-300 ${
        isDay
          ? 'bg-[#FAF8F5]/95 border-t border-[#D1E7DD] text-[#244234]'
          : 'bg-[#04140D]/95 border-t border-[#0F3823] text-slate-300'
      }`}
    >
      <a
        href="#menu"
        className={`flex flex-col items-center justify-center p-1 transition-colors ${
          isDay ? 'text-[#244234] hover:text-[#8C6207]' : 'text-slate-300 hover:text-[#F5D061]'
        }`}
      >
        <Utensils className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] font-medium leading-tight">Menu</span>
      </a>

      <button
        onClick={onOpenCart}
        className={`flex flex-col items-center justify-center p-1 transition-colors relative cursor-pointer ${
          isDay ? 'text-[#244234] hover:text-[#8C6207]' : 'text-slate-300 hover:text-[#F5D061]'
        }`}
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4 mb-0.5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-[15px] h-3.5 px-0.5 rounded-full bg-[#F5D061] text-[#062316] text-[9px] font-bold flex items-center justify-center font-mono">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium leading-tight">Order Tray</span>
      </button>

      {/* Prominent WhatsApp Center Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent('Hello Uplands Culinary Hub, I would like to place an order.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center px-3 py-1 rounded-xl bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] text-[#062316] font-bold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
      >
        <MessageSquare className="w-4 h-4 fill-[#062316]" />
        <span className="text-[9px] uppercase tracking-wider font-extrabold leading-tight">WhatsApp</span>
      </a>

      <a
        href={`tel:${PRIMARY_PHONE_1}`}
        className={`flex flex-col items-center justify-center p-1 transition-colors ${
          isDay ? 'text-[#244234] hover:text-[#8C6207]' : 'text-slate-300 hover:text-[#F5D061]'
        }`}
      >
        <Phone className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] font-medium leading-tight">Call</span>
      </a>

      <a
        href={mapSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex flex-col items-center justify-center p-1 transition-colors ${
          isDay ? 'text-[#244234] hover:text-[#8C6207]' : 'text-slate-300 hover:text-[#F5D061]'
        }`}
      >
        <MapPin className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] font-medium leading-tight">Location</span>
      </a>
    </nav>
  );
};

