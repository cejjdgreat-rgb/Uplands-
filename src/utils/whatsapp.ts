import { CartItem, CateringInquiry, MenuItem, ReservationData } from '../types';

export const PRIMARY_PHONE_1 = '+233241131434';
export const PRIMARY_PHONE_2 = '+233554235619';
export const WHATSAPP_NUMBER_RAW = '233241131434';
export const OFFICIAL_EMAIL = 'uplandsculinaryhub@gmail.com';
export const OFFICIAL_LOCATION = 'Lakeside Estate, Nsuo Anu, Accra, Ghana';

export function createWhatsAppItemUrl(item: MenuItem, selectedOptions?: Record<string, string>): string {
  let message = `Hello Uplands Culinary Hub! 🍽️\n\nI would like to order *${item.name}* (GH₵ ${item.priceGHS}).`;
  
  if (selectedOptions && Object.keys(selectedOptions).length > 0) {
    const opts = Object.entries(selectedOptions)
      .map(([key, val]) => `${key}: ${val}`)
      .join(', ');
    message += `\nPreferences: ${opts}`;
  }

  message += `\n\nPlease confirm availability and delivery to my location in Lakeside Estate / Accra. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppCartUrl(
  items: CartItem[],
  customerInfo: { name: string; phone: string; address: string; deliveryTime?: string; notes?: string }
): string {
  let message = `*NEW FOOD ORDER — UPLANDS CULINARY HUB*\n`;
  message += `------------------------------------\n`;
  message += `*Customer:* ${customerInfo.name || 'Valued Customer'}\n`;
  message += `*Phone:* ${customerInfo.phone || 'Provided upon confirmation'}\n`;
  message += `*Delivery Location:* ${customerInfo.address || 'Lakeside Estate / Accra'}\n`;
  if (customerInfo.deliveryTime) {
    message += `*Requested Time:* ${customerInfo.deliveryTime}\n`;
  }
  message += `------------------------------------\n*ITEMS ORDERED:*\n`;

  let grandTotal = 0;
  items.forEach((item, index) => {
    const itemTotal = item.dish.priceGHS * item.quantity;
    grandTotal += itemTotal;
    message += `${index + 1}. *${item.dish.name}* x${item.quantity} — GH₵ ${itemTotal}\n`;
    if (item.selectedOptions && Object.keys(item.selectedOptions).length > 0) {
      const opts = Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(' | ');
      message += `   ↳ _${opts}_\n`;
    }
    if (item.notes) {
      message += `   ↳ Note: _${item.notes}_\n`;
    }
  });

  message += `------------------------------------\n`;
  message += `*ESTIMATED TOTAL:* GH₵ ${grandTotal}\n`;
  
  if (customerInfo.notes) {
    message += `*Special Instructions:* ${customerInfo.notes}\n`;
  }
  
  message += `\n_Sent via Uplands Culinary Hub Website_`;

  return `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppCateringUrl(inquiry: CateringInquiry): string {
  let message = `*CATERING / EVENT INQUIRY — UPLANDS CULINARY HUB*\n`;
  message += `------------------------------------\n`;
  message += `*Client Name:* ${inquiry.fullName}\n`;
  message += `*Phone:* ${inquiry.phone}\n`;
  message += `*Email:* ${inquiry.email}\n`;
  message += `*Event Type:* ${inquiry.eventType.toUpperCase()}\n`;
  message += `*Event Date:* ${inquiry.eventDate}\n`;
  message += `*Estimated Guests:* ${inquiry.guestCount}\n`;
  message += `*Venue / Area:* ${inquiry.locationArea || 'Lakeside Estate / Accra'}\n`;
  if (inquiry.preferredServices.length > 0) {
    message += `*Services Needed:* ${inquiry.preferredServices.join(', ')}\n`;
  }
  if (inquiry.additionalNotes) {
    message += `*Details / Menu Requests:* ${inquiry.additionalNotes}\n`;
  }
  message += `------------------------------------\n`;
  message += `Please provide your catering packages and availability for this date.`;

  return `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppReservationUrl(res: ReservationData): string {
  let message = `*TABLE RESERVATION REQUEST — UPLANDS CULINARY HUB*\n`;
  message += `------------------------------------\n`;
  message += `*Guest Name:* ${res.name}\n`;
  message += `*Phone Number:* ${res.phone}\n`;
  message += `*Date:* ${res.date}\n`;
  message += `*Time:* ${res.time}\n`;
  message += `*Number of Guests:* ${res.guests}\n`;
  message += `*Seating Preference:* ${res.seating === 'outdoor' ? 'Outdoor Terrace' : res.seating === 'indoor' ? 'Indoor Dining' : 'Any Available'}\n`;
  if (res.specialRequests) {
    message += `*Special Notes:* ${res.specialRequests}\n`;
  }
  message += `------------------------------------\n`;
  message += `Please confirm my reservation. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(message)}`;
}
