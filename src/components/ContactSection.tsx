import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Send, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';
import { PRIMARY_PHONE_1, PRIMARY_PHONE_2, OFFICIAL_EMAIL, OFFICIAL_LOCATION, WHATSAPP_NUMBER_RAW } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const { isDay } = useTheme();
  const { settings, addEnquiry } = useStore();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [sent, setSent] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      type: 'general',
      fullName: form.name,
      phone: form.phone,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    const msg = `*GENERAL INQUIRY — ${settings.restaurantName.toUpperCase()}*\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nSubject: ${form.subject}\nMessage: ${form.message}`;
    const rawWa = settings.whatsappNumber || WHATSAPP_NUMBER_RAW;
    const url = `https://wa.me/${rawWa}?text=${encodeURIComponent(msg)}`;
    setWhatsAppUrl(url);
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // ignore
    }
    setSent(true);
  };

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Lakeside Estate Nsuo Anu Accra Ghana')}`;

  return (
    <section id="contact" className={`py-16 lg:py-24 border-b scroll-mt-20 transition-colors duration-300 ${
      isDay ? 'bg-[#FAF8F5] border-[#D1E7DD]' : 'bg-[#04140D] border-[#0F3823]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
          }`}>
            <MapPin className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
            <span>Find & Contact Us</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-serif font-extrabold ${
            isDay ? 'text-[#062316]' : 'text-white'
          }`}>
            We Are Here For You
          </h2>
          <p className={`mt-3 text-sm ${isDay ? 'text-[#2D4A3E]' : 'text-slate-300'}`}>
            Have a question about our menu, delivery to your area, catering a special event, or making a reservation? Get in touch with our team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Information & Map Area */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`p-6 sm:p-8 rounded-2xl border space-y-6 transition-colors duration-300 ${
              isDay
                ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-sm'
                : 'bg-[#061F14] border-[#0F3823]'
            }`}>
              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isDay ? 'bg-[#EBF5F0] text-[#0E4A2F]' : 'bg-[#0B3522] text-[#F5D061]'
                }`}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${
                    isDay ? 'text-[#506A5F]' : 'text-slate-400'
                  }`}>
                    Call / WhatsApp
                  </h4>
                  <div className="mt-1 space-y-1">
                    <a
                      href={`tel:${settings.phone1}`}
                      className={`block text-base font-mono font-bold transition-colors ${
                        isDay ? 'text-[#062316] hover:text-[#8C6207]' : 'text-white hover:text-[#F5D061]'
                      }`}
                    >
                      {settings.phone1}
                    </a>
                    {settings.phone2 && (
                      <a
                        href={`tel:${settings.phone2}`}
                        className={`block text-base font-mono font-bold transition-colors ${
                          isDay ? 'text-[#062316] hover:text-[#8C6207]' : 'text-white hover:text-[#F5D061]'
                        }`}
                      >
                        {settings.phone2}
                      </a>
                    )}
                  </div>
                  <p className={`text-[11px] mt-1 ${isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'}`}>
                    Available on WhatsApp for instant orders and inquiries
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className={`flex items-start gap-4 pt-4 border-t ${
                isDay ? 'border-[#E2EFE7]' : 'border-[#0F3823]'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isDay ? 'bg-[#EBF5F0] text-[#0E4A2F]' : 'bg-[#0B3522] text-[#F5D061]'
                }`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${
                    isDay ? 'text-[#506A5F]' : 'text-slate-400'
                  }`}>
                    Email Address
                  </h4>
                  <a
                    href={`mailto:${settings.email}`}
                    className={`mt-1 block text-sm font-medium transition-colors ${
                      isDay ? 'text-[#062316] hover:text-[#8C6207]' : 'text-white hover:text-[#F5D061]'
                    }`}
                  >
                    {settings.email}
                  </a>
                  <p className={`text-[11px] mt-0.5 ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
                    For corporate catering RFPs and formal business inquiries
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className={`flex items-start gap-4 pt-4 border-t ${
                isDay ? 'border-[#E2EFE7]' : 'border-[#0F3823]'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isDay ? 'bg-[#EBF5F0] text-[#0E4A2F]' : 'bg-[#0B3522] text-[#F5D061]'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${
                    isDay ? 'text-[#506A5F]' : 'text-slate-400'
                  }`}>
                    Physical Hub Location
                  </h4>
                  <p className={`mt-1 text-sm font-semibold ${isDay ? 'text-[#062316]' : 'text-white'}`}>
                    {settings.address}
                  </p>
                  <p className={`text-xs ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
                    Ashaley Botwe / Adenta Municipal, Greater Accra
                  </p>

                  <div className="mt-3">
                    <a
                      href={mapSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#062316] bg-[#F5D061] hover:bg-white transition-colors"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className={`flex items-start gap-4 pt-4 border-t ${
                isDay ? 'border-[#E2EFE7]' : 'border-[#0F3823]'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isDay ? 'bg-[#EBF5F0] text-[#0E4A2F]' : 'bg-[#0B3522] text-[#F5D061]'
                }`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${
                    isDay ? 'text-[#506A5F]' : 'text-slate-400'
                  }`}>
                    Operating Hours
                  </h4>
                  <div className={`mt-1 text-xs space-y-0.5 ${isDay ? 'text-[#2D4A3E]' : 'text-slate-300'}`}>
                    <p><strong className={isDay ? 'text-[#062316]' : 'text-white'}>Monday – Sunday:</strong> 7:00 AM – 9:30 PM</p>
                    <p className={isDay ? 'text-[#506A5F]' : 'text-slate-400'}>• Breakfast Porridges: 7:00 AM – 11:30 AM</p>
                    <p className={isDay ? 'text-[#506A5F]' : 'text-slate-400'}>• Signature Grills & Mains: 11:00 AM – 9:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-6">
            <div className={`p-6 sm:p-8 rounded-2xl border shadow-2xl transition-colors duration-300 ${
              isDay
                ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-[#0B4D2B]/5'
                : 'bg-[#061F14] border-[#0F442C]'
            }`}>
              <h3 className={`text-xl font-serif font-bold mb-1 ${
                isDay ? 'text-[#062316]' : 'text-white'
              }`}>
                Send Us a Direct Message
              </h3>
              <p className={`text-xs mb-6 ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
                Fill in your details and send your note directly to our team via WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${
                    isDay ? 'text-[#062316]' : 'text-slate-200'
                  }`}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Yaw Osei"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                      isDay
                        ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                        : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${
                      isDay ? 'text-[#062316]' : 'text-slate-200'
                    }`}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. +233 24 XXX XXXX"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
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
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. yaw@example.com"
                      className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                          : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${
                    isDay ? 'text-[#062316]' : 'text-slate-200'
                  }`}>
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                      isDay
                        ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] focus:border-[#8C6207]'
                        : 'bg-[#04140D] border-[#0F3823] text-white focus:border-[#F5D061]'
                    }`}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Food Order Status">Food Order / Delivery Question</option>
                    <option value="Catering & Outdoor Event">Catering & Outdoor Event</option>
                    <option value="Table Reservation">Table Reservation</option>
                    <option value="Feedback & Compliment">Customer Feedback</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${
                    isDay ? 'text-[#062316]' : 'text-slate-200'
                  }`}>
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you today?"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-lg border focus:outline-none transition-colors ${
                      isDay
                        ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                        : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via WhatsApp</span>
                </button>

                {sent && (
                  <div className="space-y-2 pt-2">
                    <p className="text-center text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>Inquiry logged in our system!</span>
                    </p>
                    {whatsAppUrl && (
                      <a
                        href={whatsAppUrl}
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

