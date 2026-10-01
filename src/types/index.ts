export interface MenuItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  ingredients: string[];
  priceGHS: number;
  image: string;
  badge?: string;
  isPopular?: boolean;
  isAvailable?: boolean;
  isBreakfastSpecial?: boolean;
  displayOrder?: number;
  servingTime?: string;
  dietaryTags?: string[];
  options?: {
    name: string;
    choices: string[];
  }[];
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  notes?: string;
  selectedOptions?: Record<string, string>;
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  seating: 'indoor' | 'outdoor' | 'any';
  specialRequests: string;
}

export interface CateringInquiry {
  fullName: string;
  phone: string;
  email: string;
  eventType: 'wedding' | 'outdoor_event' | 'corporate' | 'private_dinner' | 'party' | 'other';
  eventDate: string;
  guestCount: number;
  locationArea: string;
  preferredServices: string[];
  additionalNotes: string;
}

export * from './store';
