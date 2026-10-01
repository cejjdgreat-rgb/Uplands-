import React from 'react';
import { ShieldCheck, Flame, Clock, UtensilsCrossed, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface KitchenStandard {
  icon: React.ElementType;
  title: string;
  description: string;
  badge: string;
}

export const TestimonialsSection: React.FC = () => {
  const { isDay } = useTheme();

  const standards: KitchenStandard[] = [
    {
      icon: Flame,
      title: 'Charcoal-Grilled Fresh Daily',
      description: 'Our river Tilapia and herb-seasoned chicken are grilled over authentic charcoal coals to order, delivering smoky flavor and tender texture.',
      badge: 'Signature Method',
    },
    {
      icon: ShieldCheck,
      title: 'Spotless Kitchen Hygiene',
      description: 'We prioritize pristine food handling, sanitized prep stations, and secure thermal packaging to ensure every meal arrives safe and piping hot.',
      badge: 'Hygiene First',
    },
    {
      icon: Clock,
      title: 'Prompt Lakeside Delivery',
      description: 'Dedicated dispatch service across Lakeside Estate, Nsuo Anu, Ashaley Botwe, and surrounding Greater Accra neighborhoods.',
      badge: 'Fast Dispatch',
    },
    {
      icon: UtensilsCrossed,
      title: 'Full-Service Event Catering',
      description: 'Turnkey live grill stations, chafing warmers, and professional uniformed crews for weddings, birthdays, and corporate lunches.',
      badge: 'Events & Banquets',
    },
  ];

  return (
    <section className={`py-16 lg:py-24 border-b transition-colors duration-300 ${
      isDay ? 'bg-[#FAF8F5] border-[#D1E7DD]' : 'bg-[#04140D] border-[#0F3823]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
            <span>The Uplands Promise</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-serif font-extrabold ${
            isDay ? 'text-[#062316]' : 'text-white'
          }`}>
            Good Food. Great Taste. Made With Love.
          </h2>
          <p className={`mt-3 text-sm leading-relaxed ${
            isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
          }`}>
            Our core culinary standards guiding every dish prepared in our kitchen and every outdoor event we cater across Lakeside Estate and Accra.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((std, index) => {
            const Icon = std.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-2xl border flex flex-col justify-between relative transition-all duration-300 ${
                  isDay
                    ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-sm hover:shadow-md'
                    : 'bg-[#061F14] border-[#0F3823] hover:border-[#C5972C]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      isDay ? 'bg-[#EAF3EE] text-[#0E4A2F]' : 'bg-[#0E4A2F]/40 text-[#F5D061]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isDay ? 'bg-[#FAF8F5] text-[#8C6207] border border-[#D1E7DD]' : 'bg-[#04140D] text-[#FBE08D] border border-[#0F3823]'
                    }`}>
                      {std.badge}
                    </span>
                  </div>

                  <h3 className={`text-base font-serif font-bold mb-2 ${
                    isDay ? 'text-[#062316]' : 'text-white'
                  }`}>
                    {std.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${
                    isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
                  }`}>
                    {std.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
