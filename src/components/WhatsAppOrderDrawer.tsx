import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ArrowRight, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';
import { createWhatsAppCartUrl } from '../utils/whatsapp';

interface WhatsAppOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const WhatsAppOrderDrawer: React.FC<WhatsAppOrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const { isDay } = useTheme();
  const { addOrder } = useStore();
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('ASAP (35-50 mins)');
  const [notes, setNotes] = useState('');
  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);
  const [placedWhatsAppUrl, setPlacedWhatsAppUrl] = useState<string>('');

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.dish.priceGHS * item.quantity,
    0
  );

  const handleSendOrder = () => {
    if (items.length === 0) return;

    // 1. Record order in live Storefront Admin Database
    const isPickup = deliveryTime.toLowerCase().includes('pickup');
    const createdOrder = addOrder({
      customerName: customerName.trim() || 'Valued Customer',
      phone: phone.trim() || 'Provided on WhatsApp',
      address: address.trim() || (isPickup ? 'Pickup at Lakeside Hub' : 'Lakeside Estate / Accra'),
      deliveryTime,
      orderType: isPickup ? 'pickup' : 'delivery',
      items: items.map((it) => ({
        dish: it.dish,
        quantity: it.quantity,
        selectedOptions: it.selectedOptions,
        notes: it.notes,
      })),
      notes,
    });

    setOrderPlacedId(createdOrder.id);

    // 2. Open official WhatsApp chat with formatted order breakdown
    const url = createWhatsAppCartUrl(items, {
      name: customerName,
      phone,
      address,
      deliveryTime,
      notes: `${notes ? notes + ' | ' : ''}Order Ref: ${createdOrder.id}`,
    });
    setPlacedWhatsAppUrl(url);
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // ignore popup error
    }

    // 3. Clear cart after short delay
    setTimeout(() => {
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md shadow-2xl flex flex-col transition-colors duration-300 ${
          isDay
            ? 'bg-[#FFFFFF] border-l border-[#D1E7DD] text-[#062316]'
            : 'bg-[#061F14] border-l border-[#0F442C] text-slate-100'
        }`}>
          {/* Drawer Header */}
          <div className={`p-5 border-b flex items-center justify-between transition-colors ${
            isDay
              ? 'bg-[#FAF8F5] border-[#E2EFE7]'
              : 'bg-[#04140D] border-[#0F3823]'
          }`}>
            <div>
              <h2 className={`text-lg font-serif font-bold flex items-center gap-2 ${
                isDay ? 'text-[#062316]' : 'text-white'
              }`}>
                <span>Your Order Tray</span>
                <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded border ${
                  isDay
                    ? 'text-[#8C6207] bg-[#EBF5F0] border-[#B9D5C7]'
                    : 'text-[#F5D061] bg-[#092B1B] border-[#0F3823]'
                }`}>
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </h2>
              <p className={`text-xs mt-0.5 ${isDay ? 'text-[#506A5F]' : 'text-slate-400'}`}>
                Review dishes & place order via WhatsApp
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close tray"
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isDay
                  ? 'text-slate-500 hover:text-[#062316] hover:bg-[#EBF5F0]'
                  : 'text-slate-400 hover:text-white hover:bg-[#0B3522]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {orderPlacedId ? (
              <div className="p-6 text-center rounded-2xl bg-emerald-950/40 border border-emerald-700/60 space-y-3 animate-in zoom-in-95">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-serif font-bold text-white">
                  Order Successfully Dispatched!
                </h3>
                <p className="text-xs text-slate-300">
                  Your order reference is <strong className="text-[#F5D061] font-mono">{orderPlacedId}</strong>.
                  Our kitchen dispatch queue has logged your order.
                </p>
                {placedWhatsAppUrl && (
                  <a
                    href={placedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 px-4 text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] rounded-xl hover:brightness-110 text-center cursor-pointer transition-all shadow-md"
                  >
                    Open WhatsApp Chat Now
                  </a>
                )}
                <button
                  onClick={() => {
                    setOrderPlacedId(null);
                    onClose();
                  }}
                  className="mt-2 px-4 py-2 text-xs font-bold text-slate-300 hover:text-white rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
                >
                  Return to Menu
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
                  isDay ? 'bg-[#EBF5F0] text-[#062316]' : 'bg-[#0B3522] text-[#FBE08D]'
                }`}>
                  <MessageSquare className="w-8 h-8 opacity-60" />
                </div>
                <h3 className={`text-base font-serif font-bold ${
                  isDay ? 'text-[#062316]' : 'text-white'
                }`}>
                  Your tray is currently empty
                </h3>
                <p className={`text-xs max-w-xs mx-auto ${
                  isDay ? 'text-[#506A5F]' : 'text-slate-400'
                }`}>
                  Explore our signature charcoal grilled Tilapia, party Jollof, or morning porridges to start your order.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] rounded-lg shadow-sm hover:brightness-110 cursor-pointer"
                >
                  Browse Menu Offerings
                </button>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD]'
                          : 'bg-[#04140D] border-[#0F3823]'
                      }`}
                    >
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-16 h-16 rounded-lg object-cover bg-black shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-xs font-bold truncate ${
                            isDay ? 'text-[#062316]' : 'text-white'
                          }`}>
                            {item.dish.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            aria-label={`Remove ${item.dish.name}`}
                            className="text-slate-400 hover:text-red-400 transition-colors p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Modifiers / Notes */}
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <div className={`text-[10px] mt-0.5 space-y-0.5 ${
                            isDay ? 'text-[#506A5F]' : 'text-slate-400'
                          }`}>
                            {Object.entries(item.selectedOptions).map(([k, v]) => (
                              <div key={k}>
                                <span className="font-medium">{k}:</span> {v}
                              </div>
                            ))}
                          </div>
                        )}

                        {item.notes && (
                          <p className="text-[10px] text-amber-500 italic mt-0.5">
                            Note: {item.notes}
                          </p>
                        )}

                        {/* Price and Quantity Adjuster */}
                        <div className="flex items-center justify-between mt-2 pt-1">
                          <span className={`text-xs font-mono font-bold ${
                            isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'
                          }`}>
                            GH₵ {item.dish.priceGHS * item.quantity}
                          </span>

                          <div className={`flex items-center gap-1.5 border rounded-lg p-0.5 ${
                            isDay
                              ? 'bg-white border-[#D1E7DD]'
                              : 'bg-[#061F14] border-[#0F3823]'
                          }`}>
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="p-1 text-slate-400 hover:text-white cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold px-1.5 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="p-1 text-slate-400 hover:text-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className={`p-4 rounded-xl border space-y-3 ${
                  isDay ? 'bg-[#FFFFFF] border-[#D1E7DD]' : 'bg-[#04140D] border-[#0F3823]'
                }`}>
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${
                    isDay ? 'text-[#062316]' : 'text-white'
                  }`}>
                    Delivery Information
                  </h3>

                  <div>
                    <label className={`block text-[11px] font-medium mb-1 ${
                      isDay ? 'text-[#062316]' : 'text-slate-300'
                    }`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Kwame Mensah"
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                          : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[11px] font-medium mb-1 ${
                      isDay ? 'text-[#062316]' : 'text-slate-300'
                    }`}>
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 024 113 1434"
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                          : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[11px] font-medium mb-1 ${
                      isDay ? 'text-[#062316]' : 'text-slate-300'
                    }`}>
                      Delivery Address / Landmark
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Lakeside Community 4, near Shell"
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                          : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[11px] font-medium mb-1 ${
                      isDay ? 'text-[#062316]' : 'text-slate-300'
                    }`}>
                      Preferred Timing
                    </label>
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] focus:border-[#8C6207]'
                          : 'bg-[#04140D] border-[#0F3823] text-white focus:border-[#F5D061]'
                      }`}
                    >
                      <option value="ASAP (35-50 mins)">Deliver ASAP (approx. 35–50 mins)</option>
                      <option value="Lunch Time (12:30 PM – 1:30 PM)">Lunch Delivery (12:30 PM – 1:30 PM)</option>
                      <option value="Dinner Time (6:30 PM – 8:00 PM)">Dinner Delivery (6:30 PM – 8:00 PM)</option>
                      <option value="Customer Pickup at Hub">I will pick up at Lakeside Estate</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-medium mb-1 ${
                      isDay ? 'text-[#062316]' : 'text-slate-300'
                    }`}>
                      Additional Delivery Notes
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Please call before arriving"
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${
                        isDay
                          ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316] placeholder-slate-400 focus:border-[#8C6207]'
                          : 'bg-[#04140D] border-[#0F3823] text-white placeholder-slate-500 focus:border-[#F5D061]'
                      }`}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && !orderPlacedId && (
            <div className={`p-5 border-t space-y-3 ${
              isDay ? 'bg-[#FAF8F5] border-[#E2EFE7]' : 'bg-[#04140D] border-[#0F3823]'
            }`}>
              <div className="flex items-center justify-between text-sm">
                <span className={isDay ? 'text-[#506A5F]' : 'text-slate-400'}>Estimated Total:</span>
                <span className={`text-xl font-bold font-mono tabular-nums ${
                  isDay ? 'text-[#8C6207]' : 'text-[#F5D061]'
                }`}>
                  GH₵ {totalAmount}
                </span>
              </div>

              <p className={`text-[11px] leading-snug ${
                isDay ? 'text-[#506A5F]' : 'text-slate-400'
              }`}>
                Orders are recorded in the kitchen dispatch queue and sent directly to our official WhatsApp.
              </p>

              <button
                type="button"
                onClick={handleSendOrder}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-[#062316]" />
                <span>Place Order & Open WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <div className={`flex items-center justify-center gap-1.5 text-[11px] pt-1 ${
                isDay ? 'text-[#0E4A2F]' : 'text-emerald-400/90'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Instant kitchen registration & WhatsApp verification</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
