import { MenuItem } from './index';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type OrderType = 'delivery' | 'pickup';

export interface OrderItem {
  dishId: string;
  name: string;
  priceGHS: number;
  quantity: number;
  selectedOptions?: Record<string, string>;
  notes?: string;
  image?: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  deliveryTime: string;
  orderType: OrderType;
  items: OrderItem[];
  subtotalGHS: number;
  deliveryFeeGHS: number;
  taxGHS: number;
  totalGHS: number;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimelineEvent[];
}

export type EnquiryType = 'catering' | 'reservation' | 'general';
export type EnquiryStatus = 'new' | 'contacted' | 'confirmed' | 'closed';

export interface CustomerEnquiry {
  id: string;
  type: EnquiryType;
  fullName: string;
  phone: string;
  email: string;
  dateCreated: string;
  status: EnquiryStatus;
  subject?: string;
  // Specific payload fields
  eventDate?: string;
  eventType?: string;
  guestCount?: number;
  locationArea?: string;
  preferredServices?: string[];
  reservationTime?: string;
  seating?: string;
  specialRequests?: string;
  message?: string;
  adminNotes?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  displayOrder: number;
  description?: string;
}

export interface Promotion {
  id: string;
  title: string;
  code: string;
  discountBadge: string;
  description: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  highlightColor?: string;
}

export interface WebsiteContent {
  announcementBarActive: boolean;
  announcementBarText: string;
  announcementBarLink?: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroTagline: string;
  heroBadgeText: string;
  aboutTitle: string;
  aboutStory1: string;
  aboutStory2: string;
  chefQuote: string;
  cateringTitle: string;
  cateringSubtitle: string;
  cateringHighlights: string[];
  deliveryCoverageNotice: string;
  footerTagline: string;
  footerCopyright: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  snapchat: string;
  whatsapp: string;
}

export interface StoreSettings {
  restaurantName: string;
  phone1: string;
  phone2: string;
  whatsappNumber: string;
  email: string;
  address: string;
  gpsCoordinates?: string;
  weekdayHours: string;
  weekendHours: string;
  breakfastHours: string;
  currency: string;
  deliveryFeeGHS: number;
  freeDeliveryThresholdGHS: number;
  taxPercent: number;
  serviceFeeGHS: number;
  allowOnlineOrders: boolean;
  soundAlertsEnabled: boolean;
  socialLinks: SocialLinks;
}

export interface MediaItem {
  id: string;
  title: string;
  category: 'food' | 'gallery' | 'promotional' | 'event';
  url: string;
  createdAt: string;
  sizeKb?: number;
}
