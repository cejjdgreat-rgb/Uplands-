import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { WHATSAPP_NUMBER_RAW } from '../utils/whatsapp';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const { isDay } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How do I place an order for delivery or pickup?',
      answer: 'You can order in two seamless ways: 1) Click "Order on WhatsApp" on any individual dish to message our kitchen immediately with pre-filled details, or 2) Add items to your "Order Tray" on the website, enter your delivery address in Lakeside Estate or Accra, and dispatch the complete itemized order directly to our official WhatsApp in one tap.',
    },
    {
      question: 'Which areas do you deliver to in Accra?',
      answer: 'Our direct delivery hub is located at Lakeside Estate, Nsuo Anu. We deliver quickly across all Lakeside Estate Communities (1 through 8), Ashaley Botwe, Adenta Barrier, East Legon Hills, ARS, SNNIT Flat, and neighboring Greater Accra areas.',
    },
    {
      question: 'What are your operating and breakfast serving hours?',
      answer: 'We are open 7 days a week from 7:00 AM to 9:30 PM. Our hot breakfast specials (Tom Brown, Oat Porridge, Wheat with Bread, Rice Water, and Tea with Bread) are served fresh from 7:00 AM to 11:30 AM daily. Main meals and charcoal grills are served from 11:00 AM until 9:30 PM.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Ghana Mobile Money (MTN MoMo and Telecel Cash) as well as cash upon delivery or pickup at our hub in Lakeside Estate. Payment details and official merchant numbers are shared directly in our WhatsApp confirmation.',
    },
    {
      question: 'How does Catering & Outdoor Event booking work?',
      answer: 'We provide full catering services for all occasions: wedding banquets, corporate meetings, birthday celebrations, and outdoor gatherings. Services include our signature live charcoal grill stations, chafing dish buffet setups, and boxed meals. Use the Catering builder on our site or reach out via WhatsApp with your date and guest count for an instant quote.',
    },
    {
      question: 'Can I customize my order (e.g. less pepper, pack shito separately)?',
      answer: 'Absolutely! Ghanaian food is cooked with love and tailored to your taste. When ordering on WhatsApp or via our Order Tray, you can select your preferred spice level and add chef notes (such as packing pepper/shito separately, or requesting extra crispy chicken).',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`py-16 lg:py-24 border-b scroll-mt-20 transition-colors duration-300 ${
      isDay ? 'bg-[#F4F1EA] border-[#D1E7DD]' : 'bg-[#03100A] border-[#0F3823]'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
          }`}>
            <HelpCircle className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
            <span>Got Questions?</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-serif font-extrabold ${
            isDay ? 'text-[#062316]' : 'text-white'
          }`}>
            Frequently Asked Questions
          </h2>
          <p className={`mt-3 text-sm max-w-xl mx-auto ${
            isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
          }`}>
            Everything you need to know about our authentic cuisine, WhatsApp ordering, delivery coverage, and outdoor catering.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isDay
                    ? isOpen
                      ? 'bg-[#FFFFFF] border-[#B9D5C7] shadow-sm'
                      : 'bg-[#FFFFFF]/70 border-[#D1E7DD] hover:bg-[#FFFFFF]'
                    : isOpen
                    ? 'bg-[#061F14] border-[#C5972C]/40 shadow-sm'
                    : 'bg-[#04140D] border-[#0F3823] hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm font-semibold transition-colors ${
                    isOpen
                      ? isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'
                      : isDay ? 'text-[#062316]' : 'text-slate-200'
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'transform rotate-180 text-[#C5972C]'
                        : isDay ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className={`px-5 pb-4 pt-1 text-xs leading-relaxed border-t ${
                    isDay
                      ? 'border-[#EBF5F0] text-[#2D4A3E]'
                      : 'border-[#0B3522] text-slate-300'
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Prompt to WhatsApp if question isn't answered */}
        <div className={`mt-8 p-5 rounded-2xl border text-center flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDay ? 'bg-[#FFFFFF] border-[#D1E7DD]' : 'bg-[#061F14] border-[#0F3823]'
        }`}>
          <div className="text-left">
            <h4 className={`text-sm font-bold ${isDay ? 'text-[#062316]' : 'text-white'}`}>
              Have a special request or further questions?
            </h4>
            <p className={`text-xs mt-0.5 ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
              Our team is ready to assist you on WhatsApp every day from 7:00 AM.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent('Hello Uplands Culinary Hub, I have an inquiry.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] shadow-sm hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-[#062316]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
