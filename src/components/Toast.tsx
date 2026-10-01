import React from 'react';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isOpen,
  onClose,
  onOpenCart,
}) => {
  const { isDay } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`p-4 rounded-2xl border shadow-2xl flex items-center gap-3.5 max-w-md ${
        isDay
          ? 'bg-[#FFFFFF] border-[#B9D5C7] text-[#062316]'
          : 'bg-[#061F14] border-[#C5972C]/50 text-white'
      }`}>
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <p className="text-xs font-semibold truncate">{message}</p>
          <p className={`text-[11px] ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
            Item is safely stored in your tray.
          </p>
        </div>

        <button
          onClick={() => {
            onClose();
            onOpenCart();
          }}
          className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] shadow-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          View Tray
        </button>

        <button
          onClick={onClose}
          aria-label="Dismiss notification"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
