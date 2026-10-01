import React, { useState } from 'react';
import {
  LayoutDashboard,
  Utensils,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  Globe,
  Image as ImageIcon,
  Share2,
  Settings,
  LogOut,
  ArrowLeft,
  Volume2,
  ShieldCheck,
  Menu as MenuIcon,
  X,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../BrandLogo';

import { AdminOverview } from './AdminOverview';
import { AdminMenuManagement } from './AdminMenuManagement';
import { AdminOrdersManagement } from './AdminOrdersManagement';
import { AdminCustomerEnquiries } from './AdminCustomerEnquiries';
import { AdminPromotions } from './AdminPromotions';
import { AdminWebsiteContent } from './AdminWebsiteContent';
import { AdminMediaManagement } from './AdminMediaManagement';
import { AdminSocialManagement } from './AdminSocialManagement';
import { AdminSettings } from './AdminSettings';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { session, logout, secondsRemaining, renewSession } = useAuth();
  const { unreadOrdersCount, unreadEnquiriesCount, playNotificationSound } = useStore();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const minutesRemaining = Math.floor(secondsRemaining / 60);
  const secsRemaining = secondsRemaining % 60;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'menu', label: 'Product & Menu Catalog', icon: Utensils },
    {
      id: 'orders',
      label: 'Orders Management',
      icon: ShoppingBag,
      badge: unreadOrdersCount > 0 ? unreadOrdersCount : undefined,
      alert: unreadOrdersCount > 0,
    },
    {
      id: 'enquiries',
      label: 'Customer Enquiries',
      icon: MessageSquare,
      badge: unreadEnquiriesCount > 0 ? unreadEnquiriesCount : undefined,
    },
    { id: 'promotions', label: 'Promotions & Offers', icon: Sparkles },
    { id: 'content', label: 'Website Content', icon: Globe },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'social', label: 'Social Channels', icon: Share2 },
    { id: 'settings', label: 'Store Settings & Auth', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#020B07] text-slate-100 flex flex-col font-sans">
      {/* Top Operations Header */}
      <header className="sticky top-0 z-40 bg-[#04140D]/95 backdrop-blur-md border-b border-[#0F442C] h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#061F14] cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <BrandLogo size="sm" />
            <div className="hidden sm:block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5D061] block leading-none">
                Admin Operations
              </span>
              <span className="text-xs text-slate-400">Storefront Management</span>
            </div>
          </div>
        </div>

        {/* Center / Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Inactivity Session Expiry Display */}
          <div
            onClick={renewSession}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#061F14] border border-[#0F442C] text-xs text-slate-300 cursor-pointer hover:border-[#F5D061]/50 transition-colors"
            title="Click to renew session"
          >
            <Clock className="w-3.5 h-3.5 text-[#F5D061]" />
            <span className="text-[11px]">
              Session: <strong className="font-mono text-[#F5D061]">{String(minutesRemaining).padStart(2, '0')}:{String(secsRemaining).padStart(2, '0')}</strong>
            </span>
          </div>

          {/* Sound Alert Chime Test */}
          <button
            onClick={() => playNotificationSound()}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-[#061F14] hover:bg-[#0B3522] border border-[#0F442C] transition-colors cursor-pointer"
            title="Test notification chime"
          >
            <Volume2 className="w-4 h-4 text-[#F5D061]" />
          </button>

          {/* View Live Storefront Button */}
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 bg-[#061F14] hover:bg-[#0B3522] border border-[#0F442C] hover:border-slate-400 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Storefront</span>
          </button>

          {/* Secure Logout */}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-red-300 bg-red-950/40 hover:bg-red-950/80 border border-red-900/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Sign out and lock portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col justify-between bg-[#04140D] border-r border-[#0F442C] p-4 shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0E4A2F] to-[#0A3823] text-[#FBE08D] border border-[#F5D061]/50 shadow-sm font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-[#061F14]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5D061]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        item.alert
                          ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40 animate-pulse'
                          : 'bg-black/50 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User profile info in sidebar footer */}
          <div className="pt-4 border-t border-[#0F3823] space-y-3">
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-[#0E4A2F] border border-[#F5D061]/40 flex items-center justify-center text-[#F5D061] text-xs font-bold">
                {session?.username?.substring(0, 2).toUpperCase() || 'AD'}
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-white block truncate">
                  {session?.username || 'Administrator'}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Authenticated Session
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex">
            <div className="w-72 bg-[#04140D] border-r border-[#0F442C] p-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#0F3823]">
                  <BrandLogo size="sm" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                          isActive
                            ? 'bg-[#0E4A2F] text-[#FBE08D] font-bold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#F5D061]" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#0F3823] space-y-2">
                <button
                  onClick={onClose}
                  className="w-full py-2 px-3 text-xs font-semibold text-slate-200 bg-[#061F14] rounded-xl flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Website</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-3 text-xs font-semibold text-red-300 bg-red-950/40 rounded-xl flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <AdminOverview
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}
            {activeTab === 'menu' && <AdminMenuManagement />}
            {activeTab === 'orders' && <AdminOrdersManagement />}
            {activeTab === 'enquiries' && <AdminCustomerEnquiries />}
            {activeTab === 'promotions' && <AdminPromotions />}
            {activeTab === 'content' && <AdminWebsiteContent />}
            {activeTab === 'media' && <AdminMediaManagement />}
            {activeTab === 'social' && <AdminSocialManagement />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};
