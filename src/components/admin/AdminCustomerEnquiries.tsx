import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Calendar,
  Users,
  MapPin,
  ExternalLink,
  Trash2,
  X,
  FileCheck,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomerEnquiry, EnquiryStatus, EnquiryType } from '../../types';

export const AdminCustomerEnquiries: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useStore();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEnquiry, setActiveEnquiry] = useState<CustomerEnquiry | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  const counts = useMemo(() => {
    return {
      all: enquiries.length,
      catering: enquiries.filter((e) => e.type === 'catering').length,
      reservation: enquiries.filter((e) => e.type === 'reservation').length,
      general: enquiries.filter((e) => e.type === 'general').length,
      new: enquiries.filter((e) => e.status === 'new').length,
    };
  }, [enquiries]);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      if (selectedType !== 'all' && item.type !== selectedType) return false;
      if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.fullName.toLowerCase().includes(q);
        const matchPhone = item.phone.toLowerCase().includes(q);
        const matchEmail = item.email.toLowerCase().includes(q);
        const matchMsg = item.message?.toLowerCase().includes(q) || false;
        if (!matchName && !matchPhone && !matchEmail && !matchMsg) return false;
      }

      return true;
    });
  }, [enquiries, selectedType, selectedStatus, searchQuery]);

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            New
          </span>
        );
      case 'contacted':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Contacted
          </span>
        );
      case 'confirmed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Confirmed
          </span>
        );
      case 'closed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-700/40 text-slate-400 border border-slate-600">
            Closed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Customer & Event Enquiries
            </h2>
            {counts.new > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
                {counts.new} New
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage catering quotes, table reservation requests, and general customer communications.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[#061F14] p-1.5 rounded-2xl border border-[#0F442C]">
        {[
          { id: 'all', label: 'All Inquiries', count: counts.all },
          { id: 'catering', label: 'Catering & Events', count: counts.catering },
          { id: 'reservation', label: 'Dining Reservations', count: counts.reservation },
          { id: 'general', label: 'General Contact', count: counts.general },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedType(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedType === tab.id
                ? 'bg-[#0E4A2F] text-[#FBE08D] border border-[#F5D061]/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/40 text-slate-400">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Status Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone, email..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#061F14] border border-[#0F442C] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#F5D061]"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#061F14] p-1 rounded-xl border border-[#0F442C]">
          <span className="text-[11px] font-semibold text-slate-400 px-2 uppercase">Status:</span>
          {['all', 'new', 'contacted', 'confirmed', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-colors cursor-pointer ${
                selectedStatus === st
                  ? 'bg-[#0E4A2F] text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEnquiries.length === 0 ? (
          <div className="md:col-span-2 p-12 text-center rounded-2xl bg-[#061F14] border border-[#0F442C] text-xs text-slate-400">
            No customer inquiries matching this filter.
          </div>
        ) : (
          filteredEnquiries.map((enq) => {
            const waLink = `https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              `Hello ${enq.fullName}, Uplands Culinary Hub here regarding your ${enq.type} inquiry...`
            )}`;

            return (
              <div
                key={enq.id}
                className="p-5 rounded-2xl bg-[#061F14] border border-[#0F442C] hover:border-[#F5D061]/40 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
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
                      <span className="font-mono text-xs text-slate-400">{enq.id}</span>
                    </div>
                    {getStatusBadge(enq.status)}
                  </div>

                  <div>
                    <h3 className="text-base font-serif font-bold text-white">{enq.fullName}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3 text-[#F5D061]" />
                        {enq.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#F5D061]" />
                        {enq.email}
                      </span>
                    </div>
                  </div>

                  {/* Specific Event or Reservation Details */}
                  {(enq.eventDate || enq.guestCount || enq.reservationTime || enq.seating) && (
                    <div className="p-3 rounded-xl bg-[#04140D] border border-[#0F3823] text-xs space-y-1.5">
                      {enq.eventDate && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-[#F5D061]" />
                          <span>
                            Date: <strong className="text-white">{enq.eventDate}</strong>
                            {enq.reservationTime ? ` at ${enq.reservationTime}` : ''}
                          </span>
                        </div>
                      )}
                      {enq.guestCount && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <Users className="w-3.5 h-3.5 text-[#F5D061]" />
                          <span>Guest Count: <strong className="text-white">{enq.guestCount} guests</strong></span>
                        </div>
                      )}
                      {enq.locationArea && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-[#F5D061]" />
                          <span>Area: <strong className="text-white">{enq.locationArea}</strong></span>
                        </div>
                      )}
                      {enq.preferredServices && enq.preferredServices.length > 0 && (
                        <div className="text-[11px] text-slate-400 pt-1">
                          Services: {enq.preferredServices.join(', ')}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Notes / Message */}
                  {(enq.message || enq.specialRequests) && (
                    <div className="text-xs text-slate-300 bg-[#04140D] p-3 rounded-xl border border-[#0F3823]">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Client Message / Special Requests:
                      </span>
                      {enq.message || enq.specialRequests}
                    </div>
                  )}

                  {enq.adminNotes && (
                    <div className="text-xs text-amber-200 bg-amber-950/30 p-2.5 rounded-xl border border-amber-800/40">
                      <strong>Staff Note:</strong> {enq.adminNotes}
                    </div>
                  )}
                </div>

                {/* Card Action Bar */}
                <div className="pt-3 border-t border-[#0F3823] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Status:</span>
                    {(['new', 'contacted', 'confirmed', 'closed'] as EnquiryStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => updateEnquiryStatus(enq.id, st)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize transition-colors cursor-pointer ${
                          enq.status === st
                            ? 'bg-[#F5D061] text-[#062316]'
                            : 'bg-[#04140D] text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] to-[#F5D061] hover:brightness-110 flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp Client</span>
                    </a>

                    <button
                      onClick={() => {
                        if (confirm(`Delete enquiry from ${enq.fullName}?`)) {
                          deleteEnquiry(enq.id);
                        }
                      }}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete enquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
