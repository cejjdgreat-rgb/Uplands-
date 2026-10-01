import React, { useState } from 'react';
import { Share2, Instagram, Facebook, Video, MessageCircle, Save, Check, ExternalLink } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { SocialLinks } from '../../types';

export const AdminSocialManagement: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const [socials, setSocials] = useState<SocialLinks>({ ...settings.socialLinks });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ socialLinks: socials });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Social Media Channels Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure official restaurant social handles. Changes reflect immediately across website navigation and footers without code changes.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>Social links updated!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#061F14] border border-[#0F442C] space-y-5">
        {/* Instagram */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Instagram URL</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="url"
              required
              value={socials.instagram}
              onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
              placeholder="https://instagram.com/uplan.ds"
              className="flex-1 px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#0B3522] cursor-pointer"
              title="Test link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Facebook */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <Facebook className="w-4 h-4 text-blue-400" />
            <span>Facebook URL</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="url"
              required
              value={socials.facebook}
              onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
              placeholder="https://facebook.com/uplandsculinaryhub"
              className="flex-1 px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
            <a
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#0B3522] cursor-pointer"
              title="Test link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* TikTok */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <Video className="w-4 h-4 text-teal-400" />
            <span>TikTok URL</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="url"
              required
              value={socials.tiktok}
              onChange={(e) => setSocials({ ...socials, tiktok: e.target.value })}
              placeholder="https://tiktok.com/@uplan.ds"
              className="flex-1 px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
            <a
              href={socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#0B3522] cursor-pointer"
              title="Test link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Snapchat */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-yellow-400" />
            <span>Snapchat URL</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="url"
              required
              value={socials.snapchat}
              onChange={(e) => setSocials({ ...socials, snapchat: e.target.value })}
              placeholder="https://snapchat.com/add/uplandshub"
              className="flex-1 px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
            <a
              href={socials.snapchat}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#0B3522] cursor-pointer"
              title="Test link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* WhatsApp Direct Chat Link */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Official URL</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="url"
              required
              value={socials.whatsapp}
              onChange={(e) => setSocials({ ...socials, whatsapp: e.target.value })}
              placeholder="https://wa.me/233241131434"
              className="flex-1 px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
            <a
              href={socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#0B3522] cursor-pointer"
              title="Test link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-3 border-t border-[#0F3823] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Social Links</span>
          </button>
        </div>
      </form>
    </div>
  );
};
