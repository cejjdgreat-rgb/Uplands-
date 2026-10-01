import React, { useState } from 'react';
import { X, MessageSquare, Plus, Check, Clock, Utensils } from 'lucide-react';
import { MenuItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { createWhatsAppItemUrl } from '../utils/whatsapp';

interface FoodDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, options: Record<string, string>, notes: string) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  const { isDay } = useTheme();

  if (!dish) return null;

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    dish.options?.forEach((opt) => {
      if (opt.choices.length > 0) {
        initial[opt.name] = opt.choices[0];
      }
    });
    return initial;
  });

  const [notes, setNotes] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleOptionChange = (optionName: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: choice }));
  };

  const handleAdd = () => {
    onAddToCart(dish, selectedOptions, notes);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  const whatsappDirectUrl = createWhatsAppItemUrl(dish, selectedOptions);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`relative w-full max-w-2xl border rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 transition-colors ${
          isDay
            ? 'bg-[#FFFFFF] border-[#D1E7DD] text-[#062316]'
            : 'bg-[#061F14] border-[#0F442C] text-slate-100'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dish Image */}
        <div className="relative h-64 sm:h-72 w-full bg-[#04140D] overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
            isDay ? 'from-[#FFFFFF]' : 'from-[#061F14]'
          }`} />
          {dish.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-[#092E1B]/95 backdrop-blur-md border border-[#C5972C]/50 text-xs font-semibold text-[#FBE08D] rounded-md shadow-sm">
              {dish.badge}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[calc(100vh-320px)] overflow-y-auto">
          {/* Header & Price */}
          <div className={`flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b pb-4 ${
            isDay ? 'border-[#E2EFE7]' : 'border-[#0F3823]'
          }`}>
            <div>
              <span className={`text-xs uppercase tracking-wider font-semibold ${
                isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
              }`}>
                {dish.categoryLabel}
              </span>
              <h2 className={`text-2xl font-serif font-bold mt-0.5 ${
                isDay ? 'text-[#062316]' : 'text-white'
              }`}>
                {dish.name}
              </h2>
            </div>
            <div className={`text-2xl font-bold font-mono tabular-nums ${
              isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'
            }`}>
              GH₵ {dish.priceGHS}
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm leading-relaxed ${
            isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
          }`}>
            {dish.description}
          </p>

          {/* Serving Time */}
          {dish.servingTime && (
            <div className={`flex items-center gap-2 text-xs ${
              isDay ? 'text-[#506A5F]' : 'text-slate-400'
            }`}>
              <Clock className={`w-4 h-4 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
              <span>Available daily: {dish.servingTime}</span>
            </div>
          )}

          {/* Ingredients list */}
          <div>
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
              isDay ? 'text-[#1C3B2E]' : 'text-slate-200'
            }`}>
              <Utensils className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
              Authentic Ingredients
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {dish.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 rounded border ${
                    isDay
                      ? 'bg-[#EBF5F0] border-[#D1E7DD] text-[#0E4A2F]'
                      : 'bg-[#092B1B] border-[#0F3823] text-slate-300'
                  }`}
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Customizable Options */}
          {dish.options && dish.options.length > 0 && (
            <div className="space-y-4 pt-2">
              {dish.options.map((opt) => (
                <div key={opt.name} className="space-y-2">
                  <label className={`block text-xs font-semibold ${
                    isDay ? 'text-[#062316]' : 'text-slate-200'
                  }`}>
                    {opt.name}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {opt.choices.map((choice) => {
                      const isSelected = selectedOptions[opt.name] === choice;
                      return (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => handleOptionChange(opt.name, choice)}
                          className={`text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? isDay
                                ? 'bg-[#EBF5F0] border-[#8C6207] text-[#062316] font-semibold'
                                : 'bg-[#0B3522] border-[#F5D061] text-[#FBE08D]'
                              : isDay
                              ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#244234] hover:bg-[#EBF5F0]'
                              : 'bg-[#04140D] border-[#0F3823] text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <span>{choice}</span>
                          {isSelected && (
                            <Check className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Preparation Instructions */}
          <div className="pt-2">
            <label className={`block text-xs font-semibold mb-1 ${
              isDay ? 'text-[#062316]' : 'text-slate-200'
            }`}>
              Special Notes / Instructions for the Chef (optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please pack pepper separately, less oil, etc."
              className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${
                isDay
                  ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                  : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
              }`}
            />
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className={`p-4 border-t flex flex-col sm:flex-row items-center gap-3 ${
          isDay ? 'bg-[#FAF8F5] border-[#E2EFE7]' : 'bg-[#04140D] border-[#0F3823]'
        }`}>
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer shadow-sm"
          >
            <MessageSquare className="w-4 h-4 fill-[#062316]" />
            <span>Order Direct on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleAdd}
            className={`w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : isDay
                ? 'bg-[#0E4A2F] text-white hover:bg-[#0A3823] shadow-sm'
                : 'bg-[#0B3522] border border-[#C5972C]/40 text-[#FBE08D] hover:bg-[#11482E]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Tray!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Order Tray (GH₵ {dish.priceGHS})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

