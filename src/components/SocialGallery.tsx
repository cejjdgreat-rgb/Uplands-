import React from 'react';
import { Sparkles, ExternalLink, Instagram, Facebook, Video, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';

export const SocialGallery: React.FC = () => {
  const { isDay } = useTheme();
  const { settings } = useStore();

  const socialChannels = [
    {
      name: 'Instagram',
      handle: '@uplandsculinaryhub',
      url: settings.socialLinks?.instagram || 'https://instagram.com/uplandsculinaryhub',
      icon: Instagram,
      desc: 'Follow daily specials, live charcoal grilling clips, and kitchen highlights',
      btnText: 'Follow on Instagram',
    },
    {
      name: 'Facebook',
      handle: 'Uplands Culinary Hub',
      url: settings.socialLinks?.facebook || 'https://facebook.com/uplandsculinaryhub',
      icon: Facebook,
      desc: 'Official updates, catering photo albums, and Lakeside community reviews',
      btnText: 'Visit Facebook Page',
    },
    {
      name: 'TikTok',
      handle: '@uplandsculinaryhub',
      url: settings.socialLinks?.tiktok || 'https://tiktok.com/@uplandsculinaryhub',
      icon: Video,
      desc: 'Watch hot banku steaming, tilapia seasoning, and party jollof cooking',
      btnText: 'Watch on TikTok',
    },
    {
      name: 'Snapchat',
      handle: 'uplandsculinary',
      url: settings.socialLinks?.snapchat || 'https://snapchat.com/add/uplandsculinary',
      icon: MessageCircle,
      desc: 'Daily behind-the-scenes kitchen snaps, grill prep, and instant stories',
      btnText: 'Add on Snapchat',
    },
  ];

  const galleryItems = [
    {
      title: 'Char-Grilled Tilapia & Banku',
      dish: 'Banku with Tilapia',
      tag: 'Signature Grill',
      img: '/src/assets/images/food_banku_tilapia_1790612466995.jpg',
    },
    {
      title: 'Party Jollof Rice with Fried Chicken',
      dish: 'Ghanaian Jollof',
      tag: 'Weekend Favorite',
      img: '/src/assets/images/food_jollof_chicken_1790612478647.jpg',
    },
    {
      title: 'Outdoor Event Catering Setup',
      dish: 'Buffet & Live Grill',
      tag: 'Event Service',
      img: '/src/assets/images/catering_event_outdoor_1790612517851.jpg',
    },
    {
      title: 'Vegetable Fried Rice with Grilled Chicken',
      dish: 'Fried Rice',
      tag: 'Lunch Rush',
      img: '/src/assets/images/food_fried_rice_chicken_1790612494196.jpg',
    },
  ];

  return (
    <section id="gallery" className={`py-16 lg:py-24 border-b scroll-mt-20 transition-colors duration-300 ${
      isDay ? 'bg-[#FAF8F5] border-[#D1E7DD]' : 'bg-[#03100A] border-[#0F3823]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
            <span>Official Social Channels</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-serif font-extrabold ${
            isDay ? 'text-[#062316]' : 'text-white'
          }`}>
            Follow Our Culinary Journey
          </h2>
          <p className={`mt-3 text-sm ${isDay ? 'text-[#2D4A3E]' : 'text-slate-300'}`}>
            Join the Uplands community across our official social channels for live cooking previews, outdoor catering moments, and customer highlights in Lakeside Estate, Nsuo Anu.
          </p>
        </div>

        {/* Social Profile Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {socialChannels.map((ch) => {
            const Icon = ch.icon;
            return (
              <div
                key={ch.name}
                className={`p-6 rounded-2xl border transition-colors flex flex-col justify-between space-y-4 group ${
                  isDay
                    ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-sm hover:border-[#8C6207]/40'
                    : 'bg-[#061F14] border-[#0F3823] hover:border-[#C5972C]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDay ? 'bg-[#EBF5F0] text-[#0E4A2F]' : 'bg-[#0B3522] text-[#F5D061]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-semibold font-mono ${
                      isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'
                    }`}>
                      {ch.handle}
                    </span>
                  </div>
                  <h3 className={`text-base font-serif font-bold mt-4 ${
                    isDay ? 'text-[#062316]' : 'text-white'
                  }`}>
                    {ch.name}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${
                    isDay ? 'text-[#506A5F]' : 'text-slate-400'
                  }`}>
                    {ch.desc}
                  </p>
                </div>

                <a
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-[#062316] bg-[#F5D061] hover:bg-white transition-colors cursor-pointer"
                >
                  <span>{ch.btnText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Food & Events Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl overflow-hidden aspect-[4/3] border transition-all duration-300 hover:shadow-xl ${
                isDay ? 'border-[#D1E7DD]' : 'border-[#0F3823]'
              }`}
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5D061] mb-1">
                  {item.tag}
                </span>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
