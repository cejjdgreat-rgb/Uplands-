import React from 'react';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  DollarSign,
  Utensils,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Volume2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';

interface AdminOverviewProps {
  onNavigateTab: (tabId: string) => void;
  onOpenOrderDetails?: (orderId: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  onNavigateTab,
  onOpenOrderDetails,
}) => {
  const {
    orders,
    menuItems,
    enquiries,
    promotions,
    updateOrderStatus,
    playNotificationSound,
    settings,
  } = useStore();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const preparingOrders = orders.filter((o) => o.status === 'preparing').length;
  const completedOrders = orders.filter((o) => o.status === 'completed').length;
  const totalRevenueGHS = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalGHS, 0);

  const activeMenuItemsCount = menuItems.filter((i) => i.isAvailable !== false).length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  const recentOrders = orders.slice(0, 5);
  const recentEnquiries = enquiries.slice(0, 4);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Pending Action
          </span>
        );
      case 'confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
            Confirmed
          </span>
        );
      case 'preparing':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
            In Kitchen / Grilling
          </span>
        );
      case 'ready':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Ready for Pickup/Dispatch
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-700/50 text-slate-300 border border-slate-600">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#061F14] via-[#092B1B] to-[#04140D] border border-[#0F442C] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-wider text-[#F5D061]">
              Live Storefront Connected
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Uplands Culinary Hub Operations
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Live orders, catering bookings, food catalog, and website content synchronized across all devices in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => playNotificationSound()}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#0B3522] hover:bg-[#10482E] text-slate-200 border border-[#0F442C] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Test Order Alert Chime"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#F5D061]" />
            <span>Test Sound Chime</span>
          </button>

          <button
            onClick={() => onNavigateTab('orders')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Manage Orders ({pendingOrders} Pending)</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#061F14] border border-[#0F442C] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0B3522] text-[#F5D061] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {totalOrders}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">recorded</span>
          </div>
        </div>

        {/* Pending Orders */}
        <div className={`p-4 sm:p-5 rounded-2xl border shadow-sm transition-colors ${
          pendingOrders > 0
            ? 'bg-amber-950/20 border-amber-600/40'
            : 'bg-[#061F14] border-[#0F442C]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Pending Orders
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              pendingOrders > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-[#0B3522] text-slate-400'
            }`}>
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-bold font-mono ${
              pendingOrders > 0 ? 'text-amber-400' : 'text-white'
            }`}>
              {pendingOrders}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">needs attention</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#061F14] border border-[#0F442C] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Revenue Volume
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0B3522] text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-xs font-bold text-[#F5D061]">GH₵</span>
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {totalRevenueGHS.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Inquiries & Menu items */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#061F14] border border-[#0F442C] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Dishes
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0B3522] text-[#F5D061] flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {activeMenuItemsCount}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">of {menuItems.length} listed</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="p-4 rounded-2xl bg-[#061F14] border border-[#0F442C] flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" />
          Storefront Shortcuts:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('menu')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0B3522] text-slate-200 hover:text-white hover:bg-[#11482E] transition-colors cursor-pointer border border-[#0F442C]"
          >
            + Add Food Item
          </button>
          <button
            onClick={() => onNavigateTab('enquiries')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0B3522] text-slate-200 hover:text-white hover:bg-[#11482E] transition-colors cursor-pointer border border-[#0F442C]"
          >
            Review Enquiries ({newEnquiriesCount} New)
          </button>
          <button
            onClick={() => onNavigateTab('promotions')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0B3522] text-slate-200 hover:text-white hover:bg-[#11482E] transition-colors cursor-pointer border border-[#0F442C]"
          >
            Promotions & Specials
          </button>
          <button
            onClick={() => onNavigateTab('content')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0B3522] text-slate-200 hover:text-white hover:bg-[#11482E] transition-colors cursor-pointer border border-[#0F442C]"
          >
            Edit Website Banners
          </button>
        </div>
      </div>

      {/* Recent Orders and Recent Enquiries Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#F5D061]" />
              Recent Incoming Orders
            </h2>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs text-[#F5D061] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>View All ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[#061F14] border border-[#0F442C] text-xs text-slate-400">
                No orders recorded yet. When customers click Order via WhatsApp on the storefront, their orders appear here automatically.
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-xl bg-[#061F14] border border-[#0F442C] hover:border-[#F5D061]/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-white">
                        {order.id}
                      </span>
                      {getStatusBadge(order.status)}
                      <span className="text-[11px] text-slate-400">
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-200">
                      {order.customerName} · <span className="font-mono text-slate-400">{order.phone}</span>
                    </p>

                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block sm:inline mr-1">Total:</span>
                      <span className="font-mono font-bold text-sm text-[#F5D061]">
                        GH₵ {order.totalGHS}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing', 'Kitchen started preparing')}
                          className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#0E4A2F] text-emerald-200 hover:bg-[#145E3B] transition-colors cursor-pointer"
                        >
                          Start Grill
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready', 'Order packed and ready')}
                          className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-blue-900/60 text-blue-200 hover:bg-blue-800 transition-colors cursor-pointer"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed', 'Order fulfilled')}
                          className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Customer Enquiries & Catering Requests */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#F5D061]" />
              Recent Customer Inquiries
            </h2>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs text-[#F5D061] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>View All ({enquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentEnquiries.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[#061F14] border border-[#0F442C] text-xs text-slate-400">
                No customer inquiries yet.
              </div>
            ) : (
              recentEnquiries.map((enq) => {
                const waUrl = `https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${enq.fullName}, regarding your ${enq.type} request with Uplands Culinary Hub...`
                )}`;

                return (
                  <div
                    key={enq.id}
                    className="p-4 rounded-xl bg-[#061F14] border border-[#0F442C] hover:border-[#F5D061]/30 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          enq.type === 'catering'
                            ? 'bg-amber-500/20 text-amber-300'
                            : enq.type === 'reservation'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {enq.type}
                        </span>
                        <span className="text-xs font-bold text-white">{enq.fullName}</span>
                      </div>
                      <span className={`text-[10px] font-semibold capitalize px-2 py-0.5 rounded-full ${
                        enq.status === 'new'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {enq.status}
                      </span>
                    </div>

                    {enq.eventDate && (
                      <p className="text-[11px] text-slate-300">
                        Date: <strong className="text-[#F5D061]">{enq.eventDate}</strong> {enq.guestCount ? `· ${enq.guestCount} guests` : ''}
                      </p>
                    )}

                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {enq.message || enq.specialRequests || enq.subject || 'Inquiry submitted from website.'}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs border-t border-[#0F3823]">
                      <span className="text-slate-400 font-mono text-[11px]">{enq.phone}</span>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#F5D061] hover:underline font-semibold"
                      >
                        <span>WhatsApp Reply</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
