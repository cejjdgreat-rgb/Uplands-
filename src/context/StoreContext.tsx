import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import masterLogoAsset from '../assets/images/uplands_official_logo.jpg';
import { MENU_ITEMS as DEFAULT_MENU_ITEMS } from '../data/menuData';
import {
  MenuItem,
  Order,
  OrderStatus,
  CustomerEnquiry,
  EnquiryStatus,
  MenuCategory,
  Promotion,
  WebsiteContent,
  StoreSettings,
  MediaItem,
} from '../types';
import { useAuth } from './AuthContext';

const STORE_STORAGE_KEY = 'uplands_storefront_state_v2';

// Audio chime using Web Audio API for incoming order alerts
export function playOrderNotificationChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;
    
    // First bell tone (D5 - 587.33Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    // Second bell tone (A5 - 880Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.15);
    gain2.gain.setValueAtTime(0.3, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.8);
  } catch (e) {
    console.warn('Audio chime could not be played', e);
  }
}

// Initial Menu Categories
const INITIAL_CATEGORIES: MenuCategory[] = [
  { id: 'all', label: 'All Offerings', displayOrder: 0, description: 'Complete culinary spread' },
  { id: 'grilled', label: 'Local & Grilled Dishes', displayOrder: 1, description: 'Charcoal tilapia, banku & attieke' },
  { id: 'mains', label: 'Rice Specialties', displayOrder: 2, description: 'Party Jollof & vegetable fried rice' },
  { id: 'breakfast', label: 'Breakfast Porridges', displayOrder: 3, description: 'Tom Brown, oats, wheat & teas' },
];

// Initial Promotions
const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-weekend-10',
    title: 'Lakeside Weekend Feast',
    code: 'LAKESIDE10',
    discountBadge: '10% OFF',
    description: 'Get 10% off all orders above GH₵ 150 every Friday through Sunday.',
    isActive: true,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    highlightColor: 'emerald',
  },
  {
    id: 'promo-breakfast-combo',
    title: 'Early Bird Breakfast Boost',
    code: 'SUNRISE',
    discountBadge: 'FREE TEA / BREAD',
    description: 'Complimentary spiced tea or buttered bread slice with any hot porridge bowl ordered before 9:30 AM.',
    isActive: true,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    highlightColor: 'amber',
  },
];

// Initial Website Content
const INITIAL_CONTENT: WebsiteContent = {
  announcementBarActive: true,
  announcementBarText: '🔥 Charcoal Grilled Whole Tilapia, Party Jollof & Hot Morning Porridges daily! Fast Delivery across Lakeside Estate & Accra.',
  announcementBarLink: '#menu',
  heroHeadline: 'Good Food. Great Taste.',
  heroHeadlineHighlight: 'Made with Love.',
  heroTagline: 'Welcome to Uplands Culinary Hub. Authentic Ghanaian party Jollof, smoky charcoal-grilled Tilapia with fresh hot Banku, nourishing morning breakfast bowls, and full-service outdoor event catering.',
  heroBadgeText: 'Authentic Ghanaian Cuisine',
  aboutTitle: 'Crafted with Heritage, Spiced with Passion',
  aboutStory1: 'Founded with a deep love for authentic Ghanaian cooking, Uplands Culinary Hub brings together the smokiness of roadside grills, the homeliness of slow-cooked party stews, and the comforting warmth of traditional morning porridges.',
  aboutStory2: 'Based in Lakeside Estate, Nsuo Anu, Accra, we pride ourselves on sourcing fresh local ingredients daily—from pristine river tilapia to hand-fermented corn dough and vine-ripened tomatoes.',
  chefQuote: 'Good food is our love language to the Lakeside community.',
  cateringTitle: 'For All Occasions. We\'ve Got You Covered.',
  cateringSubtitle: 'Outdoor weddings, corporate luncheons, family celebrations, and private chef carvery stations.',
  cateringHighlights: [
    'Live Charcoal Grill Station (Whole Tilapia & Seasoned Chicken)',
    'Full Chafing Buffet Setup with Warmers & Serving Ware',
    'Morning Breakfast Porridge Bar (Tom Brown, Oat, Wheat)',
    'Professional Uniformed Serving Crew',
    'Customized Menus & Thermal Box Deliveries',
  ],
  deliveryCoverageNotice: 'Prompt food delivery covering Lakeside Estate, Ashaley Botwe, Nmai Dzorn, Adiringanor, East Legon, and surrounding areas.',
  footerTagline: 'Good Food. Great Taste. Made with Love.',
  footerCopyright: `© ${new Date().getFullYear()} Uplands Culinary Hub. All rights reserved. Lakeside Estate, Nsuo Anu, Accra.`,
};

// Initial Store Settings
const INITIAL_SETTINGS: StoreSettings = {
  restaurantName: 'Uplands Culinary Hub',
  phone1: '+233241131434',
  phone2: '+233554235619',
  whatsappNumber: '233241131434',
  email: 'uplandsculinaryhub@gmail.com',
  address: 'Lakeside Estate, Nsuo Anu, Accra, Ghana',
  gpsCoordinates: '5.6883° N, 0.1342° W',
  weekdayHours: '7:00 AM – 9:30 PM',
  weekendHours: '7:00 AM – 10:00 PM',
  breakfastHours: '7:00 AM – 11:30 AM',
  currency: 'GH₵',
  deliveryFeeGHS: 20,
  freeDeliveryThresholdGHS: 250,
  taxPercent: 0,
  serviceFeeGHS: 0,
  allowOnlineOrders: true,
  soundAlertsEnabled: true,
  socialLinks: {
    instagram: 'https://instagram.com/uplandsculinaryhub',
    facebook: 'https://facebook.com/uplandsculinaryhub',
    tiktok: 'https://tiktok.com/@uplandsculinaryhub',
    snapchat: 'https://snapchat.com/add/uplandsculinary',
    whatsapp: 'https://wa.me/233241131434',
  },
};

// Initial Media Assets
const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'media-0',
    title: 'Uplands Culinary Hub Official Master Logo',
    category: 'promotional',
    url: masterLogoAsset,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'media-1',
    title: 'Banku with Tilapia',
    category: 'food',
    url: `${import.meta.env.BASE_URL}src/assets/images/food_banku_tilapia_1790612466995.jpg`,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'media-2',
    title: 'Ghanaian Party Jollof',
    category: 'food',
    url: `${import.meta.env.BASE_URL}src/assets/images/food_jollof_chicken_1790612478647.jpg`,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'media-3',
    title: 'Fried Rice & Grilled Chicken',
    category: 'food',
    url: `${import.meta.env.BASE_URL}src/assets/images/food_fried_rice_chicken_1790612494196.jpg`,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'media-4',
    title: 'Attieke with Tilapia',
    category: 'food',
    url: `${import.meta.env.BASE_URL}src/assets/images/food_attieke_tilapia_1790612506186.jpg`,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'media-5',
    title: 'Outdoor Catering Spread',
    category: 'event',
    url: `${import.meta.env.BASE_URL}src/assets/images/catering_event_outdoor_1790612517851.jpg`,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'media-6',
    title: 'Grand Culinary Hero Spread',
    category: 'promotional',
    url: `${import.meta.env.BASE_URL}src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg`,
    createdAt: '2026-03-01T10:00:00Z',
  },
];

export interface StoreContextType {
  // Products & Menu
  menuItems: MenuItem[];
  categories: MenuCategory[];
  addProduct: (item: Omit<MenuItem, 'id'>) => MenuItem;
  updateProduct: (id: string, updates: Partial<MenuItem>) => void;
  deleteProduct: (id: string) => void;
  toggleProductAvailability: (id: string) => void;
  toggleProductFeatured: (id: string) => void;
  toggleBreakfastSpecial: (id: string) => void;
  reorderProducts: (newOrderedList: MenuItem[]) => void;
  addCategory: (label: string, description?: string) => void;
  updateCategory: (id: string, label: string, description?: string) => void;
  deleteCategory: (id: string) => void;

  // Orders
  orders: Order[];
  unreadOrdersCount: number;
  addOrder: (orderData: {
    customerName: string;
    phone: string;
    email?: string;
    address: string;
    deliveryTime: string;
    orderType: 'delivery' | 'pickup';
    items: {
      dish: MenuItem;
      quantity: number;
      selectedOptions?: Record<string, string>;
      notes?: string;
    }[];
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  deleteOrder: (orderId: string) => void;
  clearUnreadOrdersCount: () => void;
  exportOrdersCSV: () => void;
  exportOrdersJSON: () => void;

  // Enquiries
  enquiries: CustomerEnquiry[];
  unreadEnquiriesCount: number;
  addEnquiry: (enquiry: Omit<CustomerEnquiry, 'id' | 'dateCreated' | 'status'>) => CustomerEnquiry;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, adminNotes?: string) => void;
  deleteEnquiry: (id: string) => void;

  // Promotions
  promotions: Promotion[];
  addPromotion: (promo: Omit<Promotion, 'id'>) => Promotion;
  updatePromotion: (id: string, updates: Partial<Promotion>) => void;
  togglePromotionActive: (id: string) => void;
  deletePromotion: (id: string) => void;

  // Website Content
  content: WebsiteContent;
  updateContent: (updates: Partial<WebsiteContent>) => void;

  // Store Settings
  settings: StoreSettings;
  updateSettings: (updates: Partial<StoreSettings>) => void;
  resetAllToDefaults: () => void;

  // Media
  media: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'createdAt'>) => MediaItem;
  deleteMediaItem: (id: string) => void;

  // Audio Notifications
  playNotificationSound: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, getAuthHeaders } = useAuth();

  // Load initial state with fallback to defaults
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORE_STORAGE_KEY + '_menu');
      if (raw) return JSON.parse(raw);
    } catch {}
    return DEFAULT_MENU_ITEMS.map((item, idx) => ({
      ...item,
      isAvailable: item.isAvailable ?? true,
      isBreakfastSpecial: item.category === 'breakfast',
      displayOrder: idx,
    }));
  });

  const [categories, setCategories] = useState<MenuCategory[]>(() => {
    try {
      const raw = localStorage.getItem(STORE_STORAGE_KEY + '_categories');
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_CATEGORIES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem(STORE_STORAGE_KEY + '_orders');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });

  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(() => {
    try {
      const raw = localStorage.getItem(STORE_STORAGE_KEY + '_enquiries');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });

  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    try {
      const raw = localStorage.getItem(STORE_STORAGE_KEY + '_promotions');
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_PROMOTIONS;
  });

  const [content, setContent] = useState<WebsiteContent>(() => {
    try {
      const raw = localStorage.getItem(STORE_STORAGE_KEY + '_content');
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_CONTENT;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const raw = localStorage.getItem(STORE_STORAGE_KEY + '_settings');
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_SETTINGS;
  });

  const [media, setMedia] = useState<MediaItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORE_STORAGE_KEY + '_media');
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_MEDIA;
  });

  const [unreadOrdersCount, setUnreadOrdersCount] = useState<number>(0);
  const unreadEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  // Fetch initial public store data from server
  useEffect(() => {
    fetch('/api/store/data')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        if (data.menu && Array.isArray(data.menu)) setMenuItems(data.menu);
        if (data.categories && Array.isArray(data.categories)) setCategories(data.categories);
        if (data.promotions && Array.isArray(data.promotions)) setPromotions(data.promotions);
        if (data.content) setContent(data.content);
        if (data.settings) setSettings(data.settings);
        if (data.media && Array.isArray(data.media)) setMedia(data.media);
      })
      .catch((err) => {
        console.warn('Initial server fetch fallback to cached/initial data', err);
      });
  }, []);

  // Fetch orders and enquiries from server when admin is authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const headers = getAuthHeaders();
    if (!headers.Authorization) return;

    fetch('/api/orders', { headers })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.orders) {
          setOrders(data.orders);
          setUnreadOrdersCount(data.orders.filter((o: Order) => o.status === 'pending').length);
        }
      })
      .catch(() => {});

    fetch('/api/enquiries', { headers })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.enquiries) {
          setEnquiries(data.enquiries);
        }
      })
      .catch(() => {});
  }, [isAuthenticated, getAuthHeaders]);

  // Sync to localStorage as offline fallback
  useEffect(() => {
    try {
      localStorage.setItem(STORE_STORAGE_KEY + '_menu', JSON.stringify(menuItems));
      localStorage.setItem(STORE_STORAGE_KEY + '_categories', JSON.stringify(categories));
      localStorage.setItem(STORE_STORAGE_KEY + '_orders', JSON.stringify(orders));
      localStorage.setItem(STORE_STORAGE_KEY + '_enquiries', JSON.stringify(enquiries));
      localStorage.setItem(STORE_STORAGE_KEY + '_promotions', JSON.stringify(promotions));
      localStorage.setItem(STORE_STORAGE_KEY + '_content', JSON.stringify(content));
      localStorage.setItem(STORE_STORAGE_KEY + '_settings', JSON.stringify(settings));
      localStorage.setItem(STORE_STORAGE_KEY + '_media', JSON.stringify(media));
    } catch {}
  }, [menuItems, categories, orders, enquiries, promotions, content, settings, media]);

  const playNotificationSound = useCallback(() => {
    if (settings.soundAlertsEnabled) {
      playOrderNotificationChime();
    }
  }, [settings.soundAlertsEnabled]);

  // Product & Menu Methods
  const addProduct = useCallback(
    (itemData: Omit<MenuItem, 'id'>): MenuItem => {
      const newId = 'dish-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
      const newItem: MenuItem = {
        ...itemData,
        id: newId,
        isAvailable: itemData.isAvailable ?? true,
        displayOrder: menuItems.length,
      };

      setMenuItems((prev) => [newItem, ...prev]);

      // Server persistence
      fetch('/api/menu', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newItem),
      }).catch(() => {});

      return newItem;
    },
    [menuItems.length, getAuthHeaders]
  );

  const updateProduct = useCallback(
    (id: string, updates: Partial<MenuItem>) => {
      setMenuItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );

      fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      }).catch(() => {});
    },
    [getAuthHeaders]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));

      fetch(`/api/menu/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).catch(() => {});
    },
    [getAuthHeaders]
  );

  const toggleProductAvailability = useCallback(
    (id: string) => {
      let updatedVal = true;
      setMenuItems((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            updatedVal = item.isAvailable === false ? true : false;
            return { ...item, isAvailable: updatedVal };
          }
          return item;
        })
      );

      fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isAvailable: updatedVal }),
      }).catch(() => {});
    },
    [getAuthHeaders]
  );

  const toggleProductFeatured = useCallback(
    (id: string) => {
      let updatedVal = true;
      setMenuItems((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            updatedVal = !item.isPopular;
            return { ...item, isPopular: updatedVal };
          }
          return item;
        })
      );

      fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isPopular: updatedVal }),
      }).catch(() => {});
    },
    [getAuthHeaders]
  );

  const toggleBreakfastSpecial = useCallback(
    (id: string) => {
      let updatedVal = true;
      setMenuItems((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            updatedVal = !item.isBreakfastSpecial;
            return { ...item, isBreakfastSpecial: updatedVal };
          }
          return item;
        })
      );

      fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isBreakfastSpecial: updatedVal }),
      }).catch(() => {});
    },
    [getAuthHeaders]
  );

  const reorderProducts = useCallback(
    (newOrderedList: MenuItem[]) => {
      const updated = newOrderedList.map((item, idx) => ({ ...item, displayOrder: idx }));
      setMenuItems(updated);
    },
    []
  );

  const addCategory = useCallback(
    (label: string, description?: string) => {
      const id = label.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const updated = [...categories, { id, label, displayOrder: categories.length, description }];
      setCategories(updated);

      fetch('/api/categories', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ categories: updated }),
      }).catch(() => {});
    },
    [categories, getAuthHeaders]
  );

  const updateCategory = useCallback(
    (id: string, label: string, description?: string) => {
      const updated = categories.map((c) => (c.id === id ? { ...c, label, description } : c));
      setCategories(updated);

      fetch('/api/categories', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ categories: updated }),
      }).catch(() => {});
    },
    [categories, getAuthHeaders]
  );

  const deleteCategory = useCallback(
    (id: string) => {
      if (id === 'all') return;
      const updated = categories.filter((c) => c.id !== id);
      setCategories(updated);

      fetch('/api/categories', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ categories: updated }),
      }).catch(() => {});
    },
    [categories, getAuthHeaders]
  );

  // Order Methods
  const addOrder = useCallback(
    (orderData: {
      customerName: string;
      phone: string;
      email?: string;
      address: string;
      deliveryTime: string;
      orderType: 'delivery' | 'pickup';
      items: {
        dish: MenuItem;
        quantity: number;
        selectedOptions?: Record<string, string>;
        notes?: string;
      }[];
      notes?: string;
    }): Order => {
      const orderNumber = Math.floor(1000 + Math.random() * 9000);
      const orderId = `UCH-${orderNumber}`;
      const now = new Date().toISOString();

      const orderItems = orderData.items.map((it) => ({
        dishId: it.dish.id,
        name: it.dish.name,
        priceGHS: it.dish.priceGHS,
        quantity: it.quantity,
        selectedOptions: it.selectedOptions,
        notes: it.notes,
        image: it.dish.image,
      }));

      const subtotalGHS = orderItems.reduce((acc, it) => acc + it.priceGHS * it.quantity, 0);
      const deliveryFeeGHS =
        orderData.orderType === 'delivery'
          ? subtotalGHS >= settings.freeDeliveryThresholdGHS
            ? 0
            : settings.deliveryFeeGHS
          : 0;
      const taxGHS = Math.round((subtotalGHS * settings.taxPercent) / 100);
      const totalGHS = subtotalGHS + deliveryFeeGHS + taxGHS;

      const newOrder: Order = {
        id: orderId,
        customerName: orderData.customerName || 'Valued Customer',
        phone: orderData.phone,
        email: orderData.email,
        address: orderData.address || 'Lakeside Estate / Accra',
        deliveryTime: orderData.deliveryTime || 'Standard ASAP',
        orderType: orderData.orderType,
        items: orderItems,
        subtotalGHS,
        deliveryFeeGHS,
        taxGHS,
        totalGHS,
        notes: orderData.notes,
        status: 'pending',
        createdAt: now,
        updatedAt: now,
        timeline: [
          { status: 'pending', timestamp: now, note: 'Order placed by customer' },
        ],
      };

      setOrders((prev) => [newOrder, ...prev]);
      setUnreadOrdersCount((prev) => prev + 1);
      playNotificationSound();

      // Send to server backend
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.order) {
            setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
          }
        })
        .catch(() => {});

      return newOrder;
    },
    [settings.deliveryFeeGHS, settings.freeDeliveryThresholdGHS, settings.taxPercent, playNotificationSound]
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus, note?: string) => {
      const now = new Date().toISOString();
      setOrders((prev) =>
        prev.map((order) => {
          if (order.id !== orderId) return order;
          const newTimeline = [
            ...order.timeline,
            { status, timestamp: now, note: note || `Status updated to ${status}` },
          ];
          return {
            ...order,
            status,
            updatedAt: now,
            timeline: newTimeline,
          };
        })
      );

      fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, note }),
      }).catch(() => {});
    },
    [getAuthHeaders]
  );

  const deleteOrder = useCallback(
    (orderId: string) => {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));

      fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).catch(() => {});
    },
    [getAuthHeaders]
  );

  const clearUnreadOrdersCount = useCallback(() => {
    setUnreadOrdersCount(0);
  }, []);

  const exportOrdersCSV = useCallback(() => {
    if (orders.length === 0) return;
    const headers = [
      'Order ID',
      'Date',
      'Customer',
      'Phone',
      'Address',
      'Items Summary',
      'Type',
      'Status',
      'Subtotal (GHc)',
      'Delivery Fee (GHc)',
      'Total (GHc)',
      'Notes',
    ];

    const rows = orders.map((o) => {
      const itemsSummary = o.items.map((i) => `${i.name} (x${i.quantity})`).join('; ');
      return [
        `"${o.id}"`,
        `"${new Date(o.createdAt).toLocaleString()}"`,
        `"${o.customerName.replace(/"/g, '""')}"`,
        `"${o.phone}"`,
        `"${o.address.replace(/"/g, '""')}"`,
        `"${itemsSummary.replace(/"/g, '""')}"`,
        `"${o.orderType}"`,
        `"${o.status}"`,
        o.subtotalGHS,
        o.deliveryFeeGHS,
        o.totalGHS,
        `"${(o.notes || '').replace(/"/g, '""')}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `uplands_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [orders]);

  const exportOrdersJSON = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(orders, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `uplands_orders_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [orders]);

  // Enquiry Methods
  const addEnquiry = useCallback(
    (enquiryData: Omit<CustomerEnquiry, 'id' | 'dateCreated' | 'status'>): CustomerEnquiry => {
      const newId = `ENQ-${Math.floor(100 + Math.random() * 900)}`;
      const now = new Date().toISOString();
      const newEnquiry: CustomerEnquiry = {
        ...enquiryData,
        id: newId,
        dateCreated: now,
        status: 'new',
      };

      setEnquiries((prev) => [newEnquiry, ...prev]);
      playNotificationSound();

      // Send to server backend
      fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.enquiry) {
            setEnquiries((prev) => prev.map((e) => (e.id === newId ? data.enquiry : e)));
          }
        })
        .catch(() => {});

      return newEnquiry;
    },
    [playNotificationSound]
  );

  const updateEnquiryStatus = useCallback(
    (id: string, status: EnquiryStatus, adminNotes?: string) => {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status, adminNotes: adminNotes ?? e.adminNotes } : e))
      );

      fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, adminNotes }),
      }).catch(() => {});
    },
    [getAuthHeaders]
  );

  const deleteEnquiry = useCallback(
    (id: string) => {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));

      fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).catch(() => {});
    },
    [getAuthHeaders]
  );

  // Promotion Methods
  const addPromotion = useCallback(
    (promoData: Omit<Promotion, 'id'>): Promotion => {
      const newId = 'promo-' + Date.now().toString(36);
      const newPromo: Promotion = { ...promoData, id: newId };
      const updated = [newPromo, ...promotions];
      setPromotions(updated);

      fetch('/api/promotions', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ promotions: updated }),
      }).catch(() => {});

      return newPromo;
    },
    [promotions, getAuthHeaders]
  );

  const updatePromotion = useCallback(
    (id: string, updates: Partial<Promotion>) => {
      const updated = promotions.map((p) => (p.id === id ? { ...p, ...updates } : p));
      setPromotions(updated);

      fetch('/api/promotions', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ promotions: updated }),
      }).catch(() => {});
    },
    [promotions, getAuthHeaders]
  );

  const togglePromotionActive = useCallback(
    (id: string) => {
      const updated = promotions.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p));
      setPromotions(updated);

      fetch('/api/promotions', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ promotions: updated }),
      }).catch(() => {});
    },
    [promotions, getAuthHeaders]
  );

  const deletePromotion = useCallback(
    (id: string) => {
      const updated = promotions.filter((p) => p.id !== id);
      setPromotions(updated);

      fetch('/api/promotions', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ promotions: updated }),
      }).catch(() => {});
    },
    [promotions, getAuthHeaders]
  );

  // Website Content
  const updateContent = useCallback(
    (updates: Partial<WebsiteContent>) => {
      setContent((prev) => {
        const next = { ...prev, ...updates };
        fetch('/api/content', {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(next),
        }).catch(() => {});
        return next;
      });
    },
    [getAuthHeaders]
  );

  // Store Settings
  const updateSettings = useCallback(
    (updates: Partial<StoreSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...updates };
        fetch('/api/settings', {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(next),
        }).catch(() => {});
        return next;
      });
    },
    [getAuthHeaders]
  );

  const resetAllToDefaults = useCallback(() => {
    setMenuItems(DEFAULT_MENU_ITEMS.map((item, idx) => ({ ...item, isAvailable: true, isBreakfastSpecial: item.category === 'breakfast', displayOrder: idx })));
    setCategories(INITIAL_CATEGORIES);
    setPromotions(INITIAL_PROMOTIONS);
    setContent(INITIAL_CONTENT);
    setSettings(INITIAL_SETTINGS);
    setMedia(INITIAL_MEDIA);
  }, []);

  // Media
  const addMediaItem = useCallback(
    (itemData: Omit<MediaItem, 'id' | 'createdAt'>): MediaItem => {
      const newId = 'media-' + Date.now().toString(36);
      const newItem: MediaItem = {
        ...itemData,
        id: newId,
        createdAt: new Date().toISOString(),
      };
      setMedia((prev) => [newItem, ...prev]);

      fetch('/api/media', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(itemData),
      }).catch(() => {});

      return newItem;
    },
    [getAuthHeaders]
  );

  const deleteMediaItem = useCallback(
    (id: string) => {
      setMedia((prev) => prev.filter((m) => m.id !== id));

      fetch(`/api/media/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).catch(() => {});
    },
    [getAuthHeaders]
  );

  return (
    <StoreContext.Provider
      value={{
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

        orders,
        unreadOrdersCount,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        clearUnreadOrdersCount,
        exportOrdersCSV,
        exportOrdersJSON,

        enquiries,
        unreadEnquiriesCount,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,

        promotions,
        addPromotion,
        updatePromotion,
        togglePromotionActive,
        deletePromotion,

        content,
        updateContent,

        settings,
        updateSettings,
        resetAllToDefaults,

        media,
        addMediaItem,
        deleteMediaItem,

        playNotificationSound,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
