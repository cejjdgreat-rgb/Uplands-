import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Trash2, Copy, Check, Filter, Plus } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { MediaItem } from '../../types';
import { validateImageFile } from '../../utils/security';

export const AdminMediaManagement: React.FC = () => {
  const { media, addMediaItem, deleteMediaItem } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string>('');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'food' | 'gallery' | 'promotional' | 'event'>('food');

  const filteredMedia = media.filter((m) =>
    selectedCategory === 'all' ? true : m.category === selectedCategory
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file format.');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const title = newTitle.trim() || file.name.replace(/\.[^/.]+$/, '');

      addMediaItem({
        title,
        category: newCategory,
        url: dataUrl,
        sizeKb: Math.round(file.size / 1024),
      });

      setNewTitle('');
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Media & Asset Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Store and organize high-resolution food photography, outdoor catering banners, and event images.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      <div className="p-5 rounded-2xl bg-[#061F14] border border-[#0F442C] space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-[#F5D061]" />
          Upload New Image Asset
        </h3>

        {uploadError && (
          <p className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded-xl border border-red-800">
            {uploadError}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Asset Title (e.g. Tilapia & Hot Pepper Salsa)"
            className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
          />

          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as any)}
            className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
          >
            <option value="food">Food Product</option>
            <option value="gallery">Storefront Gallery</option>
            <option value="promotional">Promotional Banner</option>
            <option value="event">Outdoor / Catering Event</option>
          </select>

          <label className="w-full py-2 px-3 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] to-[#F5D061] hover:brightness-110 cursor-pointer flex items-center justify-center gap-1.5 transition-all text-center">
            <Upload className="w-3.5 h-3.5" />
            <span>Select File to Upload</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[#061F14] p-1.5 rounded-2xl border border-[#0F442C]">
        {[
          { id: 'all', label: 'All Media' },
          { id: 'food', label: 'Food Dishes' },
          { id: 'event', label: 'Catering & Events' },
          { id: 'promotional', label: 'Promotional' },
          { id: 'gallery', label: 'Gallery' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-[#0E4A2F] text-[#FBE08D] border border-[#F5D061]/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-[#061F14] border border-[#0F442C] overflow-hidden flex flex-col justify-between hover:border-[#F5D061]/50 transition-colors shadow-sm"
          >
            <div className="relative aspect-video sm:aspect-square bg-black overflow-hidden">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/70 text-[#FBE08D] backdrop-blur-sm border border-[#C5972C]/40">
                {item.category}
              </span>
            </div>

            <div className="p-3 space-y-2">
              <p className="text-xs font-bold text-white line-clamp-1">{item.title}</p>

              <div className="flex items-center justify-between pt-1 border-t border-[#0F3823]">
                <button
                  onClick={() => copyToClipboard(item.id, item.url)}
                  className="inline-flex items-center gap-1 text-[11px] text-[#F5D061] hover:underline cursor-pointer"
                  title="Copy URL"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Delete media item "${item.title}"?`)) {
                      deleteMediaItem(item.id);
                    }
                  }}
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  title="Delete image"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
