import React, { useState } from 'react';
import { Sparkles, Plus, Edit2, Trash2, Check, X, Tag, Calendar } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Promotion } from '../../types';

export const AdminPromotions: React.FC = () => {
  const { promotions, addPromotion, updatePromotion, togglePromotionActive, deletePromotion } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    code: string;
    discountBadge: string;
    description: string;
    isActive: boolean;
    startDate: string;
    endDate: string;
    highlightColor: string;
  }>({
    title: '',
    code: '',
    discountBadge: '15% OFF',
    description: '',
    isActive: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    highlightColor: 'emerald',
  });

  const handleOpenAdd = () => {
    setEditingPromo(null);
    setFormData({
      title: '',
      code: 'UCH' + Math.floor(10 + Math.random() * 90),
      discountBadge: '15% OFF',
      description: '',
      isActive: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      highlightColor: 'emerald',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (promo: Promotion) => {
    setEditingPromo(promo);
    setFormData({
      title: promo.title,
      code: promo.code,
      discountBadge: promo.discountBadge,
      description: promo.description,
      isActive: promo.isActive,
      startDate: promo.startDate || '',
      endDate: promo.endDate || '',
      highlightColor: promo.highlightColor || 'emerald',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingPromo) {
      updatePromotion(editingPromo.id, {
        title: formData.title.trim(),
        code: formData.code.trim().toUpperCase(),
        discountBadge: formData.discountBadge.trim(),
        description: formData.description.trim(),
        isActive: formData.isActive,
        startDate: formData.startDate,
        endDate: formData.endDate,
        highlightColor: formData.highlightColor,
      });
    } else {
      addPromotion({
        title: formData.title.trim(),
        code: formData.code.trim().toUpperCase(),
        discountBadge: formData.discountBadge.trim(),
        description: formData.description.trim(),
        isActive: formData.isActive,
        startDate: formData.startDate,
        endDate: formData.endDate,
        highlightColor: formData.highlightColor,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Promotions & Special Offers
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Create promotional coupon codes, limited-time combos, and discount banners for the storefront.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Promotion Offer</span>
        </button>
      </div>

      {/* Promotions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              promo.isActive
                ? 'bg-[#061F14] border-[#0F442C] shadow-md'
                : 'bg-[#04140D]/60 border-[#0F3823] opacity-60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-[#0B3522] text-[#FBE08D] border border-[#C5972C]/40">
                  {promo.discountBadge}
                </span>

                <button
                  onClick={() => togglePromotionActive(promo.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    promo.isActive
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {promo.isActive ? 'Active on Store' : 'Inactive'}
                </button>
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-white">{promo.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400">Coupon Code:</span>
                  <code className="text-xs font-mono font-bold text-[#F5D061] bg-black/40 px-2 py-0.5 rounded border border-[#0F3823]">
                    {promo.code}
                  </code>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{promo.description}</p>

              {(promo.startDate || promo.endDate) && (
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-[#F5D061]" />
                  <span>
                    Valid: {promo.startDate || 'Now'} to {promo.endDate || 'Ongoing'}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#0F3823] flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(promo)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#0B3522] cursor-pointer"
                title="Edit promotion"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete promotion "${promo.title}"?`)) {
                    deletePromotion(promo.id);
                  }
                }}
                className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-950/40 cursor-pointer"
                title="Delete promotion"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Promo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#04140D] border border-[#0F442C] rounded-2xl shadow-2xl text-slate-100 overflow-hidden">
            <div className="p-5 border-b border-[#0F442C] flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-white">
                {editingPromo ? 'Edit Promotion Offer' : 'Create New Promotion'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Promotion Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Midweek Combo 15% OFF"
                  className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Discount Badge *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.discountBadge}
                    onChange={(e) => setFormData({ ...formData, discountBadge: e.target.value })}
                    placeholder="e.g. 15% OFF, FREE DRINK"
                    className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. UPLANDS15"
                    className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white font-mono uppercase focus:outline-none focus:border-[#F5D061]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Description & Terms
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Terms, minimum order amount, or participating dishes..."
                  className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                  />
                </div>
              </div>

              <label className="p-3 rounded-xl bg-[#061F14] border border-[#0F442C] flex items-center justify-between cursor-pointer">
                <span className="text-xs font-semibold text-white">Active and display on website</span>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 accent-[#F5D061] rounded cursor-pointer"
                />
              </label>

              <div className="pt-3 border-t border-[#0F442C] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] to-[#F5D061] rounded-xl hover:brightness-110"
                >
                  Save Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
