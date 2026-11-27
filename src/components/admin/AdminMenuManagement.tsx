import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Star,
  ArrowUp,
  ArrowDown,
  Upload,
  Image as ImageIcon,
  Clock,
  Sparkles,
  Tag,
  Coffee,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { MenuItem } from '../../types';
import { validateImageFile } from '../../utils/security';

export const AdminMenuManagement: React.FC = () => {
  const {
    menuItems,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability,
    toggleProductFeatured,
    toggleBreakfastSpecial,
    reorderProducts,
    addCategory,
    updateCategory,
    deleteCategory,
    media,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'unavailable'>('all');

  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<MenuItem | null>(null);

  // Form State for Add / Edit Product
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    categoryLabel: string;
    description: string;
    ingredientsText: string;
    priceGHS: number;
    image: string;
    badge: string;
    isPopular: boolean;
    isAvailable: boolean;
    isBreakfastSpecial: boolean;
    servingTime: string;
    dietaryTagsText: string;
  }>({
    name: '',
    category: 'mains',
    categoryLabel: 'Rice Dishes',
    description: '',
    ingredientsText: '',
    priceGHS: 70,
    image: `${import.meta.env.BASE_URL}src/assets/images/food_jollof_chicken_1790612478647.jpg`,
    badge: '',
    isPopular: false,
    isAvailable: true,
    isBreakfastSpecial: false,
    servingTime: '11:00 AM – 9:30 PM',
    dietaryTagsText: 'Halal-Friendly, Party Classic',
  });

  const [imageUploadError, setImageUploadError] = useState<string>('');

  // Category Manager State
  const [newCategoryLabel, setNewCategoryLabel] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  // Open modal for creating product
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories.find((c) => c.id !== 'all')?.id || 'mains',
      categoryLabel: categories.find((c) => c.id !== 'all')?.label || 'Rice Dishes',
      description: '',
      ingredientsText: '',
      priceGHS: 75,
      image: media[0]?.url || `${import.meta.env.BASE_URL}src/assets/images/food_banku_tilapia_1790612466995.jpg`,
      badge: 'Chef Special',
      isPopular: false,
      isAvailable: true,
      isBreakfastSpecial: false,
      servingTime: '11:00 AM – 9:30 PM',
      dietaryTagsText: 'Charcoal-Grilled',
    });
    setImageUploadError('');
    setIsProductModalOpen(true);
  };

  // Open modal for editing product
  const handleOpenEdit = (product: MenuItem) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      categoryLabel: product.categoryLabel,
      description: product.description,
      ingredientsText: product.ingredients ? product.ingredients.join(', ') : '',
      priceGHS: product.priceGHS,
      image: product.image,
      badge: product.badge || '',
      isPopular: !!product.isPopular,
      isAvailable: product.isAvailable !== false,
      isBreakfastSpecial: !!product.isBreakfastSpecial,
      servingTime: product.servingTime || '',
      dietaryTagsText: product.dietaryTags ? product.dietaryTags.join(', ') : '',
    });
    setImageUploadError('');
    setIsProductModalOpen(true);
  };

  // Handle local file upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setImageUploadError(validation.error || 'Invalid image file.');
      return;
    }

    setImageUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setFormData((prev) => ({ ...prev, image: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const ingredients = formData.ingredientsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const dietaryTags = formData.dietaryTagsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const matchedCat = categories.find((c) => c.id === formData.category);
    const categoryLabel = matchedCat?.label || formData.categoryLabel;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name.trim(),
        category: formData.category,
        categoryLabel,
        description: formData.description.trim(),
        ingredients,
        priceGHS: Number(formData.priceGHS),
        image: formData.image,
        badge: formData.badge.trim() || undefined,
        isPopular: formData.isPopular,
        isAvailable: formData.isAvailable,
        isBreakfastSpecial: formData.isBreakfastSpecial,
        servingTime: formData.servingTime.trim() || undefined,
        dietaryTags,
      });
    } else {
      addProduct({
        name: formData.name.trim(),
        category: formData.category,
        categoryLabel,
        description: formData.description.trim(),
        ingredients,
        priceGHS: Number(formData.priceGHS),
        image: formData.image,
        badge: formData.badge.trim() || undefined,
        isPopular: formData.isPopular,
        isAvailable: formData.isAvailable,
        isBreakfastSpecial: formData.isBreakfastSpecial,
        servingTime: formData.servingTime.trim() || undefined,
        dietaryTags,
      });
    }

    setIsProductModalOpen(false);
  };

  // Move product up/down in listing
  const handleMoveProduct = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= menuItems.length) return;

    const copy = [...menuItems];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    reorderProducts(copy);
  };

  // Filtered menu items
  const filteredProducts = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Availability filter
      if (availabilityFilter === 'available' && item.isAvailable === false) {
        return false;
      }
      if (availabilityFilter === 'unavailable' && item.isAvailable !== false) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchCat = item.categoryLabel?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      return true;
    });
  }, [menuItems, selectedCategory, availabilityFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Product & Menu Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add dishes, adjust pricing, upload photos, manage breakfast specials, and update storefront availability.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#061F14] text-slate-200 hover:text-white hover:bg-[#0B3522] border border-[#0F442C] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-[#F5D061]" />
            <span>Manage Categories ({categories.length})</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Dish</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#061F14] border border-[#0F442C] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish, description..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#F5D061] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#0E4A2F] text-[#FBE08D] border border-[#F5D061]/50 shadow-xs'
                  : 'bg-[#04140D] text-slate-400 hover:text-white border border-[#0F3823]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Availability Toggle Filter */}
        <div className="flex items-center gap-1 bg-[#04140D] p-1 rounded-xl border border-[#0F3823]">
          <button
            onClick={() => setAvailabilityFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
              availabilityFilter === 'all'
                ? 'bg-[#0E4A2F] text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({menuItems.length})
          </button>
          <button
            onClick={() => setAvailabilityFilter('available')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
              availabilityFilter === 'available'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            In Stock
          </button>
          <button
            onClick={() => setAvailabilityFilter('unavailable')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
              availabilityFilter === 'unavailable'
                ? 'bg-red-950 text-red-300 border border-red-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sold Out
          </button>
        </div>
      </div>

      {/* Menu Items Table */}
      <div className="rounded-2xl bg-[#061F14] border border-[#0F442C] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#04140D] border-b border-[#0F442C] text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4 w-12 text-center">Order</th>
                <th className="py-3 px-4">Dish</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">Availability</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">Breakfast</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0F3823]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No dishes found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item, idx) => {
                  const isAvailable = item.isAvailable !== false;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#08281A] transition-colors group"
                    >
                      {/* Move Up/Down Controls */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center justify-center gap-0.5">
                          <button
                            onClick={() => handleMoveProduct(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleMoveProduct(idx, 'down')}
                            disabled={idx === filteredProducts.length - 1}
                            className="p-1 text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </td>

                      {/* Dish Thumbnail + Title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-black overflow-hidden border border-[#0F442C] shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-white text-xs sm:text-sm">
                                {item.name}
                              </span>
                              {item.badge && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#0B3522] text-[#FBE08D] border border-[#C5972C]/40">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-slate-300">
                        <span className="px-2 py-1 rounded bg-[#04140D] border border-[#0F3823] text-[11px] font-medium">
                          {item.categoryLabel}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-mono font-bold text-sm text-[#F5D061]">
                        GH₵ {item.priceGHS}
                      </td>

                      {/* Availability Switch */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleProductAvailability(item.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isAvailable
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 hover:bg-emerald-900'
                              : 'bg-red-950/80 text-red-300 border border-red-700/50 hover:bg-red-900'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isAvailable ? 'bg-emerald-400' : 'bg-red-500'
                            }`}
                          />
                          <span>{isAvailable ? 'In Stock' : 'Sold Out'}</span>
                        </button>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleProductFeatured(item.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            item.isPopular
                              ? 'text-[#F5D061] hover:text-amber-300'
                              : 'text-slate-600 hover:text-slate-400'
                          }`}
                          title={item.isPopular ? 'Featured on storefront' : 'Not featured'}
                        >
                          <Star className={`w-4 h-4 ${item.isPopular ? 'fill-[#F5D061]' : ''}`} />
                        </button>
                      </td>

                      {/* Breakfast Special Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleBreakfastSpecial(item.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            item.isBreakfastSpecial
                              ? 'text-amber-400 hover:text-amber-300'
                              : 'text-slate-600 hover:text-slate-400'
                          }`}
                          title={item.isBreakfastSpecial ? 'Active Breakfast Special' : 'Not breakfast special'}
                        >
                          <Coffee className="w-4 h-4" />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#0B3522] rounded-lg transition-colors cursor-pointer"
                            title="Edit dish"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(item)}
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                            title="Delete dish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#04140D] border border-[#0F442C] rounded-2xl shadow-2xl text-slate-100 overflow-hidden my-8">
            <div className="p-5 sm:p-6 border-b border-[#0F442C] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">
                  {editingProduct ? 'Edit Food Product' : 'Add New Food Product'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Changes save directly to the storefront menu in real-time.
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-5 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dish Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Product / Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Banku with Grilled Tilapia"
                    className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Price (GH₵) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={formData.priceGHS}
                    onChange={(e) => setFormData({ ...formData, priceGHS: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white font-mono focus:outline-none focus:border-[#F5D061]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Food Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const selected = categories.find((c) => c.id === e.target.value);
                      setFormData({
                        ...formData,
                        category: e.target.value,
                        categoryLabel: selected?.label || e.target.value,
                      });
                    }}
                    className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                  >
                    {categories
                      .filter((c) => c.id !== 'all')
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Promotional Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. House Signature, Chef's Cut, Popular"
                    className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Detailed Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Appetizing description of ingredients, preparation style, and accompaniments..."
                  className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                />
              </div>

              {/* Ingredients & Dietary Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Ingredients (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.ingredientsText}
                    onChange={(e) => setFormData({ ...formData, ingredientsText: e.target.value })}
                    placeholder="Corn Dough, Tilapia, Pepper Salsa, Shito"
                    className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Dietary Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.dietaryTagsText}
                    onChange={(e) => setFormData({ ...formData, dietaryTagsText: e.target.value })}
                    placeholder="Charcoal-Grilled, Gluten-Free, Halal"
                    className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                  />
                </div>
              </div>

              {/* Serving Time */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Serving Hours / Availability Window
                </label>
                <input
                  type="text"
                  value={formData.servingTime}
                  onChange={(e) => setFormData({ ...formData, servingTime: e.target.value })}
                  placeholder="e.g. Daily 11:30 AM – 9:30 PM, or Morning 7:00 AM – 11:00 AM"
                  className="w-full px-3 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                />
              </div>

              {/* Food Image Selection / Upload */}
              <div className="p-4 rounded-xl bg-[#061F14] border border-[#0F442C] space-y-3">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Product Image
                </label>

                {imageUploadError && (
                  <p className="text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-800">
                    {imageUploadError}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Current image preview */}
                  <div className="w-20 h-20 rounded-xl bg-black overflow-hidden border border-[#0F442C] shrink-0 shadow-inner">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    {/* Upload from computer */}
                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0B3522] hover:bg-[#11482E] text-slate-200 border border-[#0F442C] cursor-pointer inline-flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#F5D061]" />
                        <span>Upload File (Max 6MB)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-slate-400">or pick preset below</span>
                    </div>

                    {/* Presets from Hub Media */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {media.slice(0, 6).map((med) => (
                        <button
                          type="button"
                          key={med.id}
                          onClick={() => setFormData({ ...formData, image: med.url })}
                          className={`w-7 h-7 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                            formData.image === med.url
                              ? 'border-[#F5D061] scale-105'
                              : 'border-slate-700 opacity-60 hover:opacity-100'
                          }`}
                          title={med.title}
                        >
                          <img src={med.url} alt={med.title} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>

                    {/* Image URL input */}
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Or enter Image URL"
                      className="w-full px-2.5 py-1.5 text-xs bg-[#04140D] border border-[#0F442C] rounded-lg text-slate-300 text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles: Available, Featured, Breakfast Special */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <label className="p-3 rounded-xl bg-[#061F14] border border-[#0F442C] flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-semibold text-slate-200">Available to Order</span>
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-4 h-4 accent-[#F5D061] rounded cursor-pointer"
                  />
                </label>

                <label className="p-3 rounded-xl bg-[#061F14] border border-[#0F442C] flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-semibold text-slate-200">Featured Item</span>
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="w-4 h-4 accent-[#F5D061] rounded cursor-pointer"
                  />
                </label>

                <label className="p-3 rounded-xl bg-[#061F14] border border-[#0F442C] flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-semibold text-slate-200">Breakfast Special</span>
                  <input
                    type="checkbox"
                    checked={formData.isBreakfastSpecial}
                    onChange={(e) => setFormData({ ...formData, isBreakfastSpecial: e.target.checked })}
                    className="w-4 h-4 accent-[#F5D061] rounded cursor-pointer"
                  />
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#0F442C] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProduct ? 'Save Product Changes' : 'Create Food Item'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Management Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#04140D] border border-[#0F442C] rounded-2xl shadow-2xl text-slate-100 overflow-hidden">
            <div className="p-5 border-b border-[#0F442C] flex items-center justify-between">
              <div>
                <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#F5D061]" />
                  Manage Food Categories
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Organize and structure the public website menu filters.
                </p>
              </div>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Add category form */}
              <div className="p-4 rounded-xl bg-[#061F14] border border-[#0F442C] space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Add New Category
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newCategoryLabel}
                    onChange={(e) => setNewCategoryLabel(e.target.value)}
                    placeholder="Category Name (e.g. Seafood & Soups)"
                    className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                  />
                  <input
                    type="text"
                    value={newCategoryDesc}
                    onChange={(e) => setNewCategoryDesc(e.target.value)}
                    placeholder="Short description..."
                    className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (newCategoryLabel.trim()) {
                      addCategory(newCategoryLabel.trim(), newCategoryDesc.trim());
                      setNewCategoryLabel('');
                      setNewCategoryDesc('');
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#0E4A2F] text-emerald-200 hover:bg-[#145E3B] transition-colors cursor-pointer"
                >
                  + Add Category
                </button>
              </div>

              {/* List of existing categories */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Active Categories
                </span>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-3 rounded-xl bg-[#061F14] border border-[#0F442C] flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white">{cat.label}</span>
                      {cat.description && (
                        <p className="text-[11px] text-slate-400 mt-0.5">{cat.description}</p>
                      )}
                    </div>
                    {cat.id !== 'all' && (
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="p-1 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#0F442C] text-right">
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] to-[#F5D061] hover:brightness-110 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#04140D] border border-red-900/60 rounded-2xl p-6 shadow-2xl text-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-red-950/60 text-red-400 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">
              Delete &quot;{productToDelete.name}&quot;?
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              This action will permanently remove this item from the public menu and order tray. You can alternatively mark it as &quot;Sold Out&quot; to keep it in your records.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(productToDelete.id);
                  setProductToDelete(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-colors shadow-sm"
              >
                Yes, Delete Dish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
