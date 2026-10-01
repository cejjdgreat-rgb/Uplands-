import React, { useState } from 'react';
import { CalendarCheck, Clock, Users, MapPin, MessageSquare, Check, Sparkles } from 'lucide-react';
import { ReservationData } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';
import { createWhatsAppReservationUrl } from '../utils/whatsapp';

interface ReservationSectionProps {
  onReservationSubmitted?: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationSubmitted,
}) => {
  const { isDay } = useTheme();
  const { addEnquiry } = useStore();
  const [data, setData] = useState<ReservationData>({
    name: '',
    phone: '',
    email: '',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '18:30',
    seating: 'outdoor',
    specialRequests: '',
  });

  const [confirmed, setConfirmed] = useState(false);
  const [resWhatsAppUrl, setResWhatsAppUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      type: 'reservation',
      fullName: data.name,
      phone: data.phone,
      email: data.email,
      eventDate: data.date,
      reservationTime: data.time,
      guestCount: data.guests,
      seating: data.seating,
      specialRequests: data.specialRequests,
    });
    const url = createWhatsAppReservationUrl(data);
    setResWhatsAppUrl(url);
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // ignore
    }
    setConfirmed(true);
    if (onReservationSubmitted) onReservationSubmitted();
  };

  return (
    <section id="reservations" className={`py-16 lg:py-24 border-b scroll-mt-20 transition-colors duration-300 ${
      isDay ? 'bg-[#FAF8F5] border-[#D1E7DD]' : 'bg-[#04140D] border-[#0F3823]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
              isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
              <span>Dine With Us</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl font-serif font-extrabold ${
              isDay ? 'text-[#062316]' : 'text-white'
            }`}>
              Reserve Your Table at Uplands Culinary Hub
            </h2>

            <p className={`text-sm leading-relaxed ${
              isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
            }`}>
              Experience the warmth of authentic Ghanaian dining in our welcoming setting at Lakeside Estate, Nsuo Anu. Whether an intimate dinner for two, a weekend family gathering, or a small celebratory meal, we ensure your table is prepared with care.
            </p>

            <div className={`p-4 rounded-xl border space-y-3 text-xs transition-colors duration-300 ${
              isDay
                ? 'bg-[#FFFFFF] border-[#D1E7DD] text-[#1C3B2E]'
                : 'bg-[#061F14] border-[#0F3823] text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <MapPin className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
                <span>Lakeside Estate, Nsuo Anu, Ashaley Botwe, Accra</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
                <span>Serving Daily from 7:00 AM to 9:30 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
                <span>Group bookings and custom celebratory tables welcomed</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className={`rounded-2xl border p-6 sm:p-8 shadow-2xl transition-colors duration-300 ${
              isDay
                ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-[#0B4D2B]/5'
                : 'bg-[#061F14] border-[#0F442C]'
            }`}>
              <div className={`flex items-center justify-between pb-4 border-b mb-6 ${
                isDay ? 'border-[#E2EFE7]' : 'border-[#0F3823]'
              }`}>
                <div>
                  <h3 className={`text-lg font-serif font-bold ${
                    isDay ? 'text-[#062316]' : 'text-white'
                  }`}>
                    Book a Table
                  </h3>
                  <p className={`text-xs ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
                    Instant confirmation dispatched via our official WhatsApp line
                  </p>
                </div>
                <CalendarCheck className={`w-6 h-6 ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${
                      isDay ? 'text-[#062316]' : 'text-slate-200'
                    }`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      placeholder="e.g. Kofi Boateng"
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none transition-colors ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                          : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${
                      isDay ? 'text-[#062316]' : 'text-slate-200'
                    }`}>
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      placeholder="e.g. +233 24 XXX XXXX"
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none transition-colors ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                          : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${
                      isDay ? 'text-[#062316]' : 'text-slate-200'
                    }`}>
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={data.date}
                      onChange={(e) => setData({ ...data, date: e.target.value })}
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none transition-colors ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] focus:border-[#8C6207]'
                          : 'bg-[#04140D] border-[#0F3823] text-white focus:border-[#F5D061]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${
                      isDay ? 'text-[#062316]' : 'text-slate-200'
                    }`}>
                      Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={data.time}
                      onChange={(e) => setData({ ...data, time: e.target.value })}
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none transition-colors ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] focus:border-[#8C6207]'
                          : 'bg-[#04140D] border-[#0F3823] text-white focus:border-[#F5D061]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${
                      isDay ? 'text-[#062316]' : 'text-slate-200'
                    }`}>
                      Number of Guests *
                    </label>
                    <select
                      value={data.guests}
                      onChange={(e) => setData({ ...data, guests: Number(e.target.value) })}
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none transition-colors ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] focus:border-[#8C6207]'
                          : 'bg-[#04140D] border-[#0F3823] text-white focus:border-[#F5D061]'
                      }`}
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="6">6 Persons</option>
                      <option value="8">8 Persons</option>
                      <option value="12">10-12 Persons (Group Table)</option>
                      <option value="20">15+ Persons (Private Party)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${
                    isDay ? 'text-[#062316]' : 'text-slate-200'
                  }`}>
                    Seating Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'outdoor', label: 'Outdoor Terrace' },
                      { id: 'indoor', label: 'Indoor Dining' },
                      { id: 'any', label: 'First Available' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setData({ ...data, seating: opt.id as any })}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                          data.seating === opt.id
                            ? isDay
                              ? 'bg-[#EBF5F0] border-[#0E4A2F] text-[#062316]'
                              : 'bg-[#0B3522] border-[#F5D061] text-[#FBE08D]'
                            : isDay
                            ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#2D4A3E] hover:text-[#062316]'
                            : 'bg-[#04140D] border-[#0F3823] text-slate-400 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${
                    isDay ? 'text-[#062316]' : 'text-slate-200'
                  }`}>
                    Special Occasion or Notes (optional)
                  </label>
                  <input
                    type="text"
                    value={data.specialRequests}
                    onChange={(e) => setData({ ...data, specialRequests: e.target.value })}
                    placeholder="e.g. Birthday dinner, high chair needed, etc."
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none transition-colors ${
                      isDay
                        ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                        : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <MessageSquare className="w-4 h-4 fill-[#062316]" />
                  <span>Confirm Reservation on WhatsApp</span>
                </button>

                {confirmed && (
                  <div className="space-y-2 mt-3">
                    <p className="text-center text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>Table reservation request submitted to kitchen dispatch!</span>
                    </p>
                    {resWhatsAppUrl && (
                      <a
                        href={resWhatsAppUrl}
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
        </div>
      </div>
    </section>
  );
};

