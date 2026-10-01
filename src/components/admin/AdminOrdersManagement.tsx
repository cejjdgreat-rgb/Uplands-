import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  MapPin,
  Phone,
  Calendar,
  X,
  ExternalLink,
  Printer,
  ChevronRight,
  Eye,
  FileText,
  Volume2,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';

export const AdminOrdersManagement: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    deleteOrder,
    exportOrdersCSV,
    exportOrdersJSON,
    playNotificationSound,
    clearUnreadOrdersCount,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [timelineNote, setTimelineNote] = useState('');

  // Clear unread badge on view
  React.useEffect(() => {
    clearUnreadOrdersCount();
  }, [clearUnreadOrdersCount]);

  const statusCounts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      confirmed: orders.filter((o) => o.status === 'confirmed').length,
      preparing: orders.filter((o) => o.status === 'preparing').length,
      ready: orders.filter((o) => o.status === 'ready').length,
      completed: orders.filter((o) => o.status === 'completed').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (selectedStatus !== 'all' && order.status !== selectedStatus) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = order.id.toLowerCase().includes(q);
        const matchName = order.customerName.toLowerCase().includes(q);
        const matchPhone = order.phone.toLowerCase().includes(q);
        const matchAddr = order.address.toLowerCase().includes(q);
        const matchItem = order.items.some((i) => i.name.toLowerCase().includes(q));
        if (!matchId && !matchName && !matchPhone && !matchAddr && !matchItem) {
          return false;
        }
      }

      return true;
    });
  }, [orders, selectedStatus, searchQuery]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 inline-flex items-center gap-1.5">
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
            Ready for Dispatch
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-700/50 text-slate-300 border border-slate-600">
            Delivered / Completed
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

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status, timelineNote || `Status updated to ${status}`);
    setTimelineNote('');
    // Also update modal order if currently viewing it
    if (selectedOrder && selectedOrder.id === orderId) {
      const updated = orders.find((o) => o.id === orderId);
      if (updated) {
        setSelectedOrder({
          ...updated,
          status,
          timeline: [
            ...updated.timeline,
            { status, timestamp: new Date().toISOString(), note: timelineNote || undefined },
          ],
        });
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Export Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Order Management System
            </h2>
            {statusCounts.pending > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                {statusCounts.pending} New
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Track customer food orders, update kitchen preparation stages, and review order histories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => playNotificationSound()}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#061F14] border border-[#0F442C] transition-colors cursor-pointer"
            title="Test alert tone"
          >
            <Volume2 className="w-4 h-4 text-[#F5D061]" />
          </button>

          <button
            onClick={exportOrdersCSV}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#061F14] text-slate-200 hover:text-white hover:bg-[#0B3522] border border-[#0F442C] transition-colors cursor-pointer flex items-center gap-1.5"
            title="Download CSV Spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-[#F5D061]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={exportOrdersJSON}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#061F14] text-slate-200 hover:text-white hover:bg-[#0B3522] border border-[#0F442C] transition-colors cursor-pointer flex items-center gap-1.5"
            title="Download JSON Data"
          >
            <FileText className="w-3.5 h-3.5 text-[#F5D061]" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[#061F14] p-1.5 rounded-2xl border border-[#0F442C] overflow-x-auto">
        {[
          { id: 'all', label: 'All Orders', count: statusCounts.all },
          { id: 'pending', label: 'Pending', count: statusCounts.pending, alert: statusCounts.pending > 0 },
          { id: 'confirmed', label: 'Confirmed', count: statusCounts.confirmed },
          { id: 'preparing', label: 'In Kitchen', count: statusCounts.preparing },
          { id: 'ready', label: 'Ready', count: statusCounts.ready },
          { id: 'completed', label: 'Completed', count: statusCounts.completed },
          { id: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedStatus(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedStatus === tab.id
                ? 'bg-[#0E4A2F] text-[#FBE08D] border border-[#F5D061]/50 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-[#04140D]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                tab.alert
                  ? 'bg-amber-500/30 text-amber-300 font-bold'
                  : 'bg-black/40 text-slate-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by Order ID (e.g. UCH-8492), Customer, Phone, or Dish..."
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#F5D061] transition-colors"
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

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#061F14] border border-[#0F442C] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#04140D] border-b border-[#0F442C] text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Items Summary</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Quick Step</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0F3823]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No orders found in this view.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const customerWaLink = `https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${order.customerName}! Uplands Culinary Hub here regarding your order ${order.id}.`
                  )}`;

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-[#08281A] transition-colors group cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      {/* ID & Date */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-sm text-white block">
                          {order.id}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <Calendar className="w-3 h-3 text-[#F5D061]" />
                          <span>
                            {new Date(order.createdAt).toLocaleDateString([], {
                              month: 'short',
                              day: 'numeric',
                            })}{' '}
                            ·{' '}
                            {new Date(order.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-white text-xs block">
                            {order.customerName}
                          </span>
                          <span className="font-mono text-slate-400 text-[11px] block">
                            {order.phone}
                          </span>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 line-clamp-1 max-w-xs">
                            <MapPin className="w-2.5 h-2.5 text-[#F5D061] shrink-0" />
                            <span>{order.address}</span>
                          </div>
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="space-y-1">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="text-slate-300 text-[11px] line-clamp-1">
                              <span className="font-bold text-[#F5D061]">{it.quantity}x</span>{' '}
                              <span>{it.name}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-sm text-[#F5D061]">
                          GH₵ {order.totalGHS}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          ({order.orderType})
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>

                      {/* Quick Status Step (stop row click propagation) */}
                      <td
                        className="py-3 px-4 text-center whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'preparing')}
                              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#0E4A2F] text-emerald-200 hover:bg-[#145E3B] transition-colors cursor-pointer"
                            >
                              Start Kitchen
                            </button>
                          )}
                          {order.status === 'preparing' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'ready')}
                              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-blue-900/60 text-blue-200 hover:bg-blue-800 transition-colors cursor-pointer"
                            >
                              Mark Ready
                            </button>
                          )}
                          {order.status === 'ready' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'completed')}
                              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
                            >
                              Mark Delivered
                            </button>
                          )}
                          {order.status === 'completed' && (
                            <span className="text-[11px] text-slate-500 flex items-center gap-1 justify-center">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Fulfilled
                            </span>
                          )}
                          {order.status === 'cancelled' && (
                            <span className="text-[11px] text-red-400">Cancelled</span>
                          )}
                        </div>
                      </td>

                      {/* Details View Button */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-[#0B3522] rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4 text-[#F5D061]" />
                          <span className="text-[11px]">Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Order Receipt & Timeline Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#04140D] border border-[#0F442C] rounded-2xl shadow-2xl text-slate-100 overflow-hidden my-8 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#0F442C] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-serif font-bold text-white">
                    Order Details: {selectedOrder.id}
                  </h3>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()} · {selectedOrder.orderType.toUpperCase()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#0B3522] cursor-pointer"
                  title="Print receipt"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#0B3522] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              {/* Customer & Delivery Information Card */}
              <div className="p-4 rounded-xl bg-[#061F14] border border-[#0F442C] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Customer Information
                  </span>
                  <p className="font-bold text-white text-sm">{selectedOrder.customerName}</p>
                  <div className="flex items-center gap-1.5 mt-1 font-mono text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-[#F5D061]" />
                    <a href={`tel:${selectedOrder.phone}`} className="hover:underline">
                      {selectedOrder.phone}
                    </a>
                  </div>
                  {selectedOrder.email && (
                    <p className="text-slate-400 mt-0.5">{selectedOrder.email}</p>
                  )}
                  <a
                    href={`https://wa.me/${selectedOrder.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedOrder.customerName}, Uplands Culinary Hub here regarding order ${selectedOrder.id}...`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#F5D061] hover:underline font-semibold mt-2"
                  >
                    <span>Message Customer on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Delivery / Pickup Address
                  </span>
                  <div className="flex items-start gap-1.5 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-[#F5D061] shrink-0 mt-0.5" />
                    <span>{selectedOrder.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 mt-2">
                    <Clock className="w-3.5 h-3.5 text-[#F5D061]" />
                    <span>Requested Time: {selectedOrder.deliveryTime}</span>
                  </div>
                  {selectedOrder.notes && (
                    <div className="mt-2 p-2 rounded bg-[#04140D] border border-[#0F3823] text-amber-200 text-[11px]">
                      <strong>Note:</strong> {selectedOrder.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Ordered Items Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Ordered Products ({selectedOrder.items.length})
                </span>

                <div className="rounded-xl border border-[#0F442C] overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#04140D] border-b border-[#0F442C] text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Item</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3">Price</th>
                        <th className="py-2.5 px-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0F3823] bg-[#061F14]">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 px-3">
                            <span className="font-semibold text-white block">{item.name}</span>
                            {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                              <div className="text-[10px] text-slate-400 italic">
                                {Object.entries(item.selectedOptions)
                                  .map(([k, v]) => `${k}: ${v}`)
                                  .join(' | ')}
                              </div>
                            )}
                            {item.notes && (
                              <div className="text-[10px] text-amber-300">
                                Note: {item.notes}
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono font-bold text-white">
                            {item.quantity}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-300">
                            GH₵ {item.priceGHS}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-right text-[#F5D061]">
                            GH₵ {item.priceGHS * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Calculation breakdown */}
                <div className="p-3 rounded-xl bg-[#061F14] border border-[#0F442C] space-y-1 text-xs text-right">
                  <div className="flex justify-between text-slate-400">
                    <span>Food Subtotal:</span>
                    <span className="font-mono">GH₵ {selectedOrder.subtotalGHS}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Delivery Fee:</span>
                    <span className="font-mono">GH₵ {selectedOrder.deliveryFeeGHS}</span>
                  </div>
                  {selectedOrder.taxGHS > 0 && (
                    <div className="flex justify-between text-slate-400">
                      <span>Service Charge / Tax:</span>
                      <span className="font-mono">GH₵ {selectedOrder.taxGHS}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#0F3823] flex justify-between text-sm font-bold text-white">
                    <span>Total Amount:</span>
                    <span className="font-mono text-[#F5D061]">GH₵ {selectedOrder.totalGHS}</span>
                  </div>
                </div>
              </div>

              {/* Status Transition Control */}
              <div className="p-4 rounded-xl bg-[#061F14] border border-[#0F442C] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white block">
                  Update Order Status & Append Note
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {(['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'] as OrderStatus[]).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                          selectedOrder.status === st
                            ? 'bg-[#F5D061] text-[#062316]'
                            : 'bg-[#04140D] text-slate-300 hover:text-white border border-[#0F3823]'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={timelineNote}
                    onChange={(e) => setTimelineNote(e.target.value)}
                    placeholder="Optional timeline note (e.g. Rider dispatch, customer delayed)..."
                    className="flex-1 px-3 py-1.5 text-xs bg-[#04140D] border border-[#0F442C] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#F5D061]"
                  />
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, selectedOrder.status)}
                    className="px-3 py-1.5 text-xs font-semibold bg-[#0B3522] hover:bg-[#11482E] text-slate-200 rounded-lg border border-[#0F442C] cursor-pointer"
                  >
                    Add Note
                  </button>
                </div>
              </div>

              {/* Order Status Timeline History */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Status History & Timeline
                </span>
                <div className="space-y-2">
                  {selectedOrder.timeline.map((evt, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#061F14] border border-[#0F3823] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold capitalize text-white">{evt.status}</span>
                        {evt.note && <span className="text-slate-400">· {evt.note}</span>}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {new Date(evt.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#0F442C] flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete order ${selectedOrder.id}?`)) {
                    deleteOrder(selectedOrder.id);
                    setSelectedOrder(null);
                  }
                }}
                className="text-xs text-red-400 hover:text-red-300 cursor-pointer font-semibold"
              >
                Delete / Archive Order
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0E4A2F] text-white hover:bg-[#145E3B] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
