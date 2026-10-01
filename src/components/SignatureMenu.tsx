import React, { useState, useMemo } from 'react';
import { MessageSquare, Plus, Clock, Sparkles, Search, X, Filter, Ban } from 'lucide-react';
import { MenuItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';
import { createWhatsAppItemUrl } from '../utils/whatsapp';

interface SignatureMenuProps {
  onSelectDish: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
}

export const SignatureMenu: React.FC<SignatureMenuProps> = ({
  onSelectDish,
  onQuickAdd,
}) => {
  const { menuItems, categories } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const { isDay } = useTheme();

  const dietaryOptions = [
    'all',
    'Pescatarian',
    'Charcoal-Grilled',
    'Gluten-Free',
    'Halal-Friendly',
    'Vegetarian',
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Dietary tag filter
      if (selectedDiet !== 'all') {
        const matchesDiet = item.dietaryTags?.some(
          (tag) => tag.toLowerCase() === selectedDiet.toLowerCase()
        );
        if (!matchesDiet) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchIng = item.ingredients?.some((ing) => ing.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchIng) return false;
      }

      return true;
    });
  }, [menuItems, activeCategory, selectedDiet, searchQuery]);

  const clearAllFilters = () => {
    setActiveCategory('all');
    setSelectedDiet('all');
    setSearchQuery('');
  };

  return (
    <section id="menu" className={`py-16 lg:py-24 border-b scroll-mt-20 transition-colors duration-300 ${
      isDay ? 'bg-[#FAF8F5] border-[#D1E7DD]' : 'bg-[#04140D] border-[#0F3823]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 ${
              isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'}`} />
              <span>Authentic Culinary Selection</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-serif font-extrabold ${
              isDay ? 'text-[#062316]' : 'text-white'
            }`}>
              Prepared Fresh. Cooked to Perfection.
            </h2>
            <p className={`mt-2 text-sm max-w-xl ${
              isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
            }`}>
              From our famous Banku with fresh grilled Tilapia and smoky Jollof to heritage morning breakfast porridges, every plate is prepared with authentic Ghanaian ingredients and love.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className={`flex flex-wrap items-center gap-1.5 p-1 border rounded-xl self-start md:self-auto transition-colors duration-300 ${
            isDay
              ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-sm'
              : 'bg-[#061F14] border-[#0F3823]'
          }`}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] text-[#062316] shadow-sm font-bold'
                    : isDay
                    ? 'text-[#2D4A3E] hover:text-[#062316] hover:bg-[#EBF5F0]'
                    : 'text-slate-300 hover:text-white hover:bg-[#0B3522]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar & Dietary Filter Row */}
        <div className={`p-4 rounded-2xl border mb-10 transition-colors duration-300 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 ${
          isDay ? 'bg-[#FFFFFF] border-[#D1E7DD] shadow-xs' : 'bg-[#061F14] border-[#0F3823]'
        }`}>
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              isDay ? 'text-[#506A5F]' : 'text-slate-400'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. tilapia, jollof, oat, banku)..."
              className={`w-full pl-10 pr-9 py-2.5 text-xs rounded-xl border focus:outline-none transition-colors ${
                isDay
                  ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                  : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dietary Tags Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className={`text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 mr-1 ${
              isDay ? 'text-[#506A5F]' : 'text-slate-400'
            }`}>
              <Filter className="w-3 h-3" />
              <span>Diet:</span>
            </span>

            {dietaryOptions.map((diet) => {
              const isSelected = selectedDiet === diet;
              const label = diet === 'all' ? 'All Diets' : diet;
              return (
                <button
                  key={diet}
                  onClick={() => setSelectedDiet(diet)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? isDay
                        ? 'bg-[#0E4A2F] text-white border-[#0E4A2F] shadow-xs'
                        : 'bg-[#0B3522] border-[#F5D061] text-[#FBE08D]'
                      : isDay
                      ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#244234] hover:bg-[#EBF5F0]'
                      : 'bg-[#04140D] border-[#0F3823] text-slate-400 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State if no items found */}
        {filteredItems.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border ${
            isDay ? 'bg-white border-[#D1E7DD]' : 'bg-[#061F14] border-[#0F3823]'
          }`}>
            <p className={`text-base font-serif font-bold ${isDay ? 'text-[#062316]' : 'text-white'}`}>
              No dishes found matching your criteria
            </p>
            <p className={`text-xs mt-1 max-w-sm mx-auto ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
              Try clearing your search query or switching dietary filters to view all our freshly cooked offerings.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-4 px-4 py-2 text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] rounded-lg shadow-sm hover:brightness-110 transition-all cursor-pointer"
            >
              Reset Filters & Show All
            </button>
          </div>
        ) : (
          /* Menu Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((dish) => {
              const directWhatsApp = createWhatsAppItemUrl(dish);
              const isAvailable = dish.isAvailable !== false;

              return (
                <article
                  key={dish.id}
                  className={`group rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden ${
                    !isAvailable
                      ? 'opacity-75 grayscale-25'
                      : ''
                  } ${
                    isDay
                      ? 'bg-[#FFFFFF] border-[#D1E7DD] hover:border-[#8C6207]/40 shadow-sm hover:shadow-lg hover:shadow-[#0B4D2B]/5'
                      : 'bg-[#061F14] border-[#0F3823] hover:border-[#C5972C]/50 hover:shadow-xl hover:shadow-[#0B3522]/30'
                  }`}
                >
                  {/* Image Section */}
                  <div
                    onClick={() => onSelectDish(dish)}
                    className="relative h-56 w-full bg-[#04140D] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent pointer-events-none ${
                      isDay ? 'from-black/60' : 'from-[#061F14]'
                    }`} />

                    {/* Badge */}
                    {dish.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold text-[#FBE08D] bg-[#092B1B]/95 border border-[#C5972C]/40 rounded backdrop-blur-sm shadow-sm">
                        {dish.badge}
                      </span>
                    )}

                    {/* Sold out overlay tag if unavailable */}
                    {!isAvailable && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold text-white bg-red-600/95 border border-red-400 rounded backdrop-blur-sm shadow-md flex items-center gap-1">
                        <Ban className="w-3 h-3" />
                        <span>Sold Out Today</span>
                      </span>
                    )}

                    {/* Quick view overlay prompt */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 text-xs font-semibold text-white bg-[#061F14]/90 rounded-md border border-[#F5D061]/50 backdrop-blur-sm">
                        View Details & Options
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Category and Serving Time */}
                      <div className="flex items-center gap-2 text-xs mb-1.5">
                        <span className={`font-semibold ${isDay ? 'text-[#8C6207]' : 'text-[#C5972C]'}`}>
                          {dish.categoryLabel}
                        </span>
                        {dish.servingTime && (
                          <>
                            <span aria-hidden="true" className={isDay ? 'text-slate-400' : 'text-slate-600'}>·</span>
                            <span className={`flex items-center gap-1 ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
                              <Clock className="w-3 h-3" />
                              {dish.servingTime}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title & Price */}
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          onClick={() => onSelectDish(dish)}
                          className={`text-lg font-serif font-bold transition-colors cursor-pointer ${
                            isDay
                              ? 'text-[#062316] group-hover:text-[#8C6207]'
                              : 'text-white group-hover:text-[#F5D061]'
                          }`}
                        >
                          {dish.name}
                        </h3>

                        <div className={`text-base font-bold font-mono tabular-nums whitespace-nowrap ${
                          isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'
                        }`}>
                          GH₵ {dish.priceGHS}
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`mt-2 text-xs leading-relaxed line-clamp-2 ${
                        isDay ? 'text-[#2D4A3E]' : 'text-slate-300'
                      }`}>
                        {dish.description}
                      </p>

                      {/* Dietary Tags if present */}
                      {dish.dietaryTags && dish.dietaryTags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {dish.dietaryTags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                isDay
                                  ? 'bg-[#EBF5F0] text-[#0E4A2F] border border-[#B9D5C7]'
                                  : 'bg-[#092B1B] text-[#F5D061] border border-[#0F3823]'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Action Buttons */}
                    <div className={`pt-3 border-t flex items-center gap-2 ${
                      isDay ? 'border-[#E2EFE7]' : 'border-[#0F3823]'
                    }`}>
                      {isAvailable ? (
                        <>
                          <a
                            href={directWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] rounded-lg hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer whitespace-nowrap shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5 fill-[#062316]" />
                            <span>Order on WhatsApp</span>
                          </a>

                          <button
                            onClick={() => onQuickAdd(dish)}
                            aria-label={`Add ${dish.name} to tray`}
                            className={`p-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                              isDay
                                ? 'text-[#062316] bg-[#EBF5F0] border border-[#B9D5C7] hover:bg-[#DDF0E6]'
                                : 'text-[#FBE08D] bg-[#0B3522] border border-[#C5972C]/40 hover:bg-[#11482E] hover:border-[#F5D061]'
                            }`}
                            title="Add to Order Tray"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <div className="w-full py-2 px-3 rounded-lg bg-red-950/20 border border-red-900/40 text-center text-xs font-semibold text-red-400 flex items-center justify-center gap-1.5">
                          <Ban className="w-3.5 h-3.5" />
                          <span>Currently Sold Out / Unavailable</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
