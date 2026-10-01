import React from 'react';
import { Heart, Sparkles, Flame, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';

export const AboutSection: React.FC = () => {
  const { isDay } = useTheme();
  const { content, settings } = useStore();

  return (
    <section id="about" className={`py-16 lg:py-24 border-b scroll-mt-20 transition-colors duration-300 ${
      isDay ? 'bg-[#FAF8F5] border-[#D1E7DD]' : 'bg-[#04140D] border-[#0F3823]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
              isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
              <span>Our Brand Philosophy</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl font-serif font-extrabold leading-tight ${
              isDay ? 'text-[#062316]' : 'text-white'
            }`}>
              {content.aboutTitle || 'Crafted with Care. Rooted in Ghanaian Flavor.'}
            </h2>

            <p className={`text-sm leading-relaxed ${
              isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
            }`}>
              {content.aboutStory1 || (
                <>
                  At <strong className={isDay ? 'text-[#062316] font-semibold' : 'text-white font-semibold'}>{settings.restaurantName}</strong>, our culinary journey is guided by one clear promise: <em>&quot;Good Food. Great Taste. Made with Love.&quot;</em> Located at Lakeside Estate, Nsuo Anu, we are dedicated to celebrating authentic Ghanaian food culture with uncompromising standards of freshness and taste.
                </>
              )}
            </p>

            <p className={`text-sm leading-relaxed ${
              isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
            }`}>
              {content.aboutStory2 || (
                <>
                  Every dish that leaves our kitchen carries the unmistakable mark of homemade dedication—from the fragrant reduction of our party Jollof rice and the smoky char on our seasoned tilapia, to the comforting warmth of traditional morning Tom Brown, oat, and wheat porridges.
                </>
              )}
            </p>

            {/* Three Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className={`p-4 rounded-xl border space-y-2 transition-colors duration-300 ${
                isDay
                  ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-sm'
                  : 'bg-[#061F14] border-[#0F3823]'
              }`}>
                <Flame className={`w-5 h-5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
                <h4 className={`text-xs font-bold uppercase tracking-wider ${
                  isDay ? 'text-[#062316]' : 'text-white'
                }`}>
                  Fresh Daily Charcoal Grills
                </h4>
                <p className={`text-[11px] leading-snug ${
                  isDay ? 'text-[#506A5F]' : 'text-slate-400'
                }`}>
                  Fresh tilapia and herb-marinated chicken grilled over open coals.
                </p>
              </div>

              <div className={`p-4 rounded-xl border space-y-2 transition-colors duration-300 ${
                isDay
                  ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-sm'
                  : 'bg-[#061F14] border-[#0F3823]'
              }`}>
                <Heart className="w-5 h-5 text-[#E53935]" />
                <h4 className={`text-xs font-bold uppercase tracking-wider ${
                  isDay ? 'text-[#062316]' : 'text-white'
                }`}>
                  Made with Love
                </h4>
                <p className={`text-[11px] leading-snug ${
                  isDay ? 'text-[#506A5F]' : 'text-slate-400'
                }`}>
                  Genuine warmth and hospitality poured into every portion.
                </p>
              </div>

              <div className={`p-4 rounded-xl border space-y-2 transition-colors duration-300 ${
                isDay
                  ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-sm'
                  : 'bg-[#061F14] border-[#0F3823]'
              }`}>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <h4 className={`text-xs font-bold uppercase tracking-wider ${
                  isDay ? 'text-[#062316]' : 'text-white'
                }`}>
                  Quality & Hygiene
                </h4>
                <p className={`text-[11px] leading-snug ${
                  isDay ? 'text-[#506A5F]' : 'text-slate-400'
                }`}>
                  Pristine kitchen environments and top sanitary food handling.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Brand Card */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className={`relative w-full max-w-md p-8 sm:p-10 rounded-2xl border text-center shadow-2xl space-y-6 transition-colors duration-300 ${
              isDay
                ? 'bg-[#FFFFFF] border-[#B9D5C7] shadow-[#0B4D2B]/5'
                : 'bg-[#061F14] border-[#C5972C]/40'
            }`}>
              <BrandLogo size="lg" showTagline />

              <div className={`py-4 border-y space-y-2 text-xs transition-colors duration-300 ${
                isDay
                  ? 'border-[#E2EFE7] text-[#2D4A3E]'
                  : 'border-[#0F3823] text-slate-300'
              }`}>
                <p className={`font-serif italic text-base ${
                  isDay ? 'text-[#8C6207]' : 'text-[#FBE08D]'
                }`}>
                  &quot;Thank you for choosing us!&quot;
                </p>
                <p className={isDay ? 'text-[#506A5F]' : 'text-slate-400'}>
                  Serving Lakeside Estate, Nsuo Anu, and the greater Accra community with exceptional food and outdoor catering.
                </p>
              </div>

              <div className={`text-[11px] space-y-1 ${
                isDay ? 'text-[#0E4A2F]' : 'text-[#C5972C]'
              }`}>
                <p className="font-semibold">Lakeside Estate, Nsuo Anu, Accra</p>
                <p className={`font-mono ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
                  +233 24 113 1434 · +233 55 423 5619
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

