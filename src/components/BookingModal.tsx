import React, { useState } from 'react';
import { X, CalendarCheck, MessageSquare, Check } from 'lucide-react';
import { ReservationData } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';
import { createWhatsAppReservationUrl } from '../utils/whatsapp';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
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
  const [modalWaUrl, setModalWaUrl] = useState('');

  if (!isOpen) return null;

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
    setModalWaUrl(url);
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // ignore
    }
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`relative w-full max-w-lg border rounded-2xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 transition-colors ${
          isDay ? 'bg-[#FFFFFF] border-[#D1E7DD] text-[#062316]' : 'bg-[#061F14] border-[#0F442C] text-white'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isDay ? 'text-slate-500 hover:text-[#062316] hover:bg-[#EBF5F0]' : 'text-slate-400 hover:text-white hover:bg-[#0B3522]'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className={`text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5 ${
            isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
          }`}>
            <CalendarCheck className={`w-4 h-4 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
            Direct Table Booking
          </span>
          <h3 className={`text-2xl font-serif font-bold mt-1 ${isDay ? 'text-[#062316]' : 'text-white'}`}>
            Reserve a Table
          </h3>
          <p className={`text-xs mt-1 ${isDay ? 'text-[#506A5F]' : 'text-slate-300'}`}>
            Lakeside Estate, Nsuo Anu · Mon–Sun 7:00 AM – 9:30 PM
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDay ? 'text-[#062316]' : 'text-slate-200'}`}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="e.g. Kwame Asante"
                className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none transition-colors ${
                  isDay
                    ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                    : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDay ? 'text-[#062316]' : 'text-slate-200'}`}>
                Phone (WhatsApp) *
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

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDay ? 'text-[#062316]' : 'text-slate-200'}`}>
                Date *
              </label>
              <input
                type="date"
                required
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
                className={`w-full px-2.5 py-2 text-xs rounded-lg border focus:outline-none transition-colors ${
                  isDay
                    ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] focus:border-[#8C6207]'
                    : 'bg-[#04140D] border-[#0F3823] text-white focus:border-[#F5D061]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDay ? 'text-[#062316]' : 'text-slate-200'}`}>
                Time *
              </label>
              <input
                type="time"
                required
                value={data.time}
                onChange={(e) => setData({ ...data, time: e.target.value })}
                className={`w-full px-2.5 py-2 text-xs rounded-lg border focus:outline-none transition-colors ${
                  isDay
                    ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] focus:border-[#8C6207]'
                    : 'bg-[#04140D] border-[#0F3823] text-white focus:border-[#F5D061]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDay ? 'text-[#062316]' : 'text-slate-200'}`}>
                Guests *
              </label>
              <select
                value={data.guests}
                onChange={(e) => setData({ ...data, guests: Number(e.target.value) })}
                className={`w-full px-2.5 py-2 text-xs rounded-lg border focus:outline-none transition-colors ${
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
                <option value="12">12 Persons</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDay ? 'text-[#062316]' : 'text-slate-200'}`}>
              Seating Area
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'outdoor', label: 'Outdoor Terrace' },
                { id: 'indoor', label: 'Indoor Dining' },
                { id: 'any', label: 'Any Table' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setData({ ...data, seating: opt.id as any })}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
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
            <label className={`block text-xs font-semibold mb-1 ${isDay ? 'text-[#062316]' : 'text-slate-200'}`}>
              Special Requests (optional)
            </label>
            <input
              type="text"
              value={data.specialRequests}
              onChange={(e) => setData({ ...data, specialRequests: e.target.value })}
              placeholder="e.g. Anniversary dinner, high chair"
              className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none transition-colors ${
                isDay
                  ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                  : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <MessageSquare className="w-4 h-4 fill-[#062316]" />
            <span>Confirm Reservation via WhatsApp</span>
          </button>

          {confirmed && (
            <div className="space-y-2 mt-3 pt-2 border-t border-emerald-800/40">
              <p className="text-center text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <Check className="w-4 h-4" />
                <span>Reservation recorded in kitchen dispatch!</span>
              </p>
              {modalWaUrl && (
                <a
                  href={modalWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 px-4 text-xs font-bold text-center text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] rounded-xl hover:brightness-110 cursor-pointer shadow-md transition-all"
                >
                  Open WhatsApp Chat Now
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  setConfirmed(false);
                  onClose();
                }}
                className="w-full py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

