import React, { useState } from 'react';
import { Globe, Save, Check, Sparkles, Megaphone, Info, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { WebsiteContent } from '../../types';

export const AdminWebsiteContent: React.FC = () => {
  const { content, updateContent } = useStore();
  const [formData, setFormData] = useState<WebsiteContent>({ ...content });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Website Content Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Update hero headlines, promotional top announcement banners, about stories, and catering text in real-time.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>Storefront content updated successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Top Announcement Bar */}
        <div className="p-5 rounded-2xl bg-[#061F14] border border-[#0F442C] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#F5D061]" />
              Top Website Announcement Banner
            </h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs font-semibold text-slate-300">Show Banner</span>
              <input
                type="checkbox"
                checked={formData.announcementBarActive}
                onChange={(e) =>
                  setFormData({ ...formData, announcementBarActive: e.target.checked })
                }
                className="w-4 h-4 accent-[#F5D061] rounded cursor-pointer"
              />
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Announcement Text
            </label>
            <input
              type="text"
              value={formData.announcementBarText}
              onChange={(e) =>
                setFormData({ ...formData, announcementBarText: e.target.value })
              }
              placeholder="e.g. Fresh Tilapia Grilling Daily & Hot Breakfast Porridges Available from 7:00 AM!"
              className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="p-5 rounded-2xl bg-[#061F14] border border-[#0F442C] space-y-4">
          <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F5D061]" />
            Homepage Hero Section
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Main Headline (Primary)
              </label>
              <input
                type="text"
                value={formData.heroHeadline}
                onChange={(e) =>
                  setFormData({ ...formData, heroHeadline: e.target.value })
                }
                placeholder="Good Food. Great Taste."
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Headline Highlight (Gold Gradient)
              </label>
              <input
                type="text"
                value={formData.heroHeadlineHighlight}
                onChange={(e) =>
                  setFormData({ ...formData, heroHeadlineHighlight: e.target.value })
                }
                placeholder="Made with Love."
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Hero Tagline / Subtitle
            </label>
            <textarea
              rows={2}
              value={formData.heroTagline}
              onChange={(e) =>
                setFormData({ ...formData, heroTagline: e.target.value })
              }
              placeholder="Welcoming paragraph describing the specialties and heritage..."
              className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Hero Pill / Badge Text
            </label>
            <input
              type="text"
              value={formData.heroBadgeText}
              onChange={(e) =>
                setFormData({ ...formData, heroBadgeText: e.target.value })
              }
              placeholder="Authentic Ghanaian Cuisine"
              className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
          </div>
        </div>

        {/* About Section Content */}
        <div className="p-5 rounded-2xl bg-[#061F14] border border-[#0F442C] space-y-4">
          <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-[#F5D061]" />
            About & Culinary Philosophy Section
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              About Section Heading
            </label>
            <input
              type="text"
              value={formData.aboutTitle}
              onChange={(e) =>
                setFormData({ ...formData, aboutTitle: e.target.value })
              }
              placeholder="Crafted with Heritage, Spiced with Passion"
              className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Story Paragraph 1
              </label>
              <textarea
                rows={3}
                value={formData.aboutStory1}
                onChange={(e) =>
                  setFormData({ ...formData, aboutStory1: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Story Paragraph 2
              </label>
              <textarea
                rows={3}
                value={formData.aboutStory2}
                onChange={(e) =>
                  setFormData({ ...formData, aboutStory2: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Chef / Founder Quote
            </label>
            <input
              type="text"
              value={formData.chefQuote}
              onChange={(e) =>
                setFormData({ ...formData, chefQuote: e.target.value })
              }
              placeholder="Food in Ghana is not just sustenance; it is community, pride, and heartfelt celebration."
              className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
          </div>
        </div>

        {/* Catering & Delivery Text */}
        <div className="p-5 rounded-2xl bg-[#061F14] border border-[#0F442C] space-y-4">
          <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#F5D061]" />
            Catering & Delivery Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Catering Section Title
              </label>
              <input
                type="text"
                value={formData.cateringTitle}
                onChange={(e) =>
                  setFormData({ ...formData, cateringTitle: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Delivery Coverage Notice
              </label>
              <input
                type="text"
                value={formData.deliveryCoverageNotice}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryCoverageNotice: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="p-5 rounded-2xl bg-[#061F14] border border-[#0F442C] space-y-4">
          <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#F5D061]" />
            Footer Brand Content
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Footer Tagline
              </label>
              <input
                type="text"
                value={formData.footerTagline}
                onChange={(e) =>
                  setFormData({ ...formData, footerTagline: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Copyright Notice
              </label>
              <input
                type="text"
                value={formData.footerCopyright}
                onChange={(e) =>
                  setFormData({ ...formData, footerCopyright: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Content Updates to Storefront</span>
          </button>
        </div>
      </form>
    </div>
  );
};
