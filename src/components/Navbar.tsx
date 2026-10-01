import React, { useState } from 'react';
import { ShoppingBag, Phone, Menu as MenuIcon, X, CalendarCheck, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { PRIMARY_PHONE_1 } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDay } = useTheme();
  const { content, unreadOrdersCount } = useStore();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Catering', href: '#catering' },
    { label: 'Reservations', href: '#reservations' },
    { label: 'Delivery', href: '#delivery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Promotional Announcement Banner */}
      {content.announcementBarActive && content.announcementBarText && (
        <div className={`py-1.5 px-4 text-center text-xs font-medium border-b transition-colors ${
          isDay
            ? 'bg-[#0E4A2F] text-[#FBE08D] border-[#0A3823]'
            : 'bg-[#061F14] text-[#F5D061] border-[#0F442C]'
        }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span>{content.announcementBarText}</span>
            {content.announcementBarLink && (
              <a
                href={content.announcementBarLink}
                className="underline font-bold text-white hover:text-[#FBE08D] ml-1 text-[11px]"
              >
                Order Now
              </a>
            )}
          </div>
        </div>
      )}

      <header className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
        isDay
          ? 'bg-[#FAF8F5]/95 border-b border-[#D1E7DD] text-[#062316]'
          : 'bg-[#04140D]/95 border-b border-[#0F3823] text-slate-100'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single Brand Element */}
        <a href="/" aria-label="Uplands Culinary Hub Home" className="flex items-center gap-2 group focus:outline-none">
          <BrandLogo size="md" />
        </a>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${
          isDay ? 'text-[#1C3B2E]' : 'text-slate-300'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all ${
                isDay
                  ? 'hover:text-[#B8861B] after:bg-[#B8861B]'
                  : 'hover:text-[#F5D061] after:bg-[#F5D061]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 Primary Actions + Day/Night Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Day/Night Theme Toggle */}
          <ThemeToggle />

          {/* Admin Dashboard Access */}
          <button
            onClick={onOpenAdmin}
            aria-label="Admin Dashboard"
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              isAuthenticated
                ? 'bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] text-[#062316] font-bold shadow-sm hover:brightness-110 active:scale-95'
                : isDay
                ? 'text-[#062316] border border-[#B9D5C7] bg-[#FAF8F5] hover:bg-[#EBF5F0] hover:border-[#0E4A2F]'
                : 'text-[#FBE08D] border border-[#C5972C]/40 bg-[#061F14] hover:bg-[#0B3522] hover:border-[#F5D061]'
            }`}
            title="Open Store Management Admin Dashboard"
          >
            <ShieldCheck className={`w-4 h-4 shrink-0 ${isAuthenticated ? 'text-[#062316]' : isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
            <span className="hidden sm:inline">{isAuthenticated ? 'Admin Hub' : 'Admin'}</span>
            {unreadOrdersCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-mono animate-pulse">
                {unreadOrdersCount}
              </span>
            )}
          </button>

          {/* Reservation quick action (Desktop) */}
          <button
            onClick={onOpenReservation}
            className={`hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              isDay
                ? 'text-[#062316] border border-[#B9D5C7] bg-[#EBF5F0] hover:bg-[#DDF0E6]'
                : 'text-[#FBE08D] border border-[#C5972C]/40 bg-[#061F14] hover:bg-[#0B3522] hover:border-[#F5D061]'
            }`}
          >
            <CalendarCheck className={`w-4 h-4 ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
            <span>Table Booking</span>
          </button>

          {/* Cart / WhatsApp Order Drawer Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="View Order Tray"
            className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] rounded-lg shadow-sm hover:brightness-110 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">Order Tray</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-extrabold text-white bg-[#062316] rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isDay
                ? 'text-[#062316] hover:bg-[#EBF5F0]'
                : 'text-slate-300 hover:text-white hover:bg-[#0B3522]'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
          isDay
            ? 'bg-[#FAF8F5] border-[#D1E7DD] text-[#062316]'
            : 'bg-[#061F14] border-[#0F3823] text-slate-200'
        }`}>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isDay
                    ? 'text-[#1C3B2E] hover:bg-[#EBF5F0] hover:text-[#062316]'
                    : 'text-slate-200 hover:bg-[#0B3522] hover:text-[#F5D061]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className={`pt-3 border-t flex flex-col gap-2 ${
            isDay ? 'border-[#D1E7DD]' : 'border-[#0F3823]'
          }`}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-2 cursor-pointer transition-all ${
                isAuthenticated
                  ? 'bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] text-[#062316] font-bold shadow-sm'
                  : isDay
                  ? 'text-[#062316] border border-[#B9D5C7] bg-[#EBF5F0] hover:bg-[#DDF0E6]'
                  : 'text-[#FBE08D] border border-[#C5972C]/50 bg-[#061F14] hover:bg-[#0B3522]'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${isAuthenticated ? 'text-[#062316]' : isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
              <span>Admin Dashboard (Store Management)</span>
              {unreadOrdersCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-mono animate-pulse">
                  {unreadOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-2 ${
                isDay
                  ? 'text-[#062316] border border-[#B9D5C7] bg-[#EBF5F0] hover:bg-[#DDF0E6]'
                  : 'text-[#FBE08D] border border-[#C5972C]/50 hover:bg-[#0B3522]'
              }`}
            >
              <CalendarCheck className={`w-4 h-4 ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
              Reserve a Table
            </button>
            <a
              href={`tel:${PRIMARY_PHONE_1}`}
              className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-2 ${
                isDay
                  ? 'text-[#062316] bg-[#E2EFE7] hover:bg-[#D1E7DD]'
                  : 'text-slate-300 bg-[#0B3522]'
              }`}
            >
              <Phone className={`w-4 h-4 ${isDay ? 'text-[#0E4A2F]' : 'text-[#F5D061]'}`} />
              Call +233 24 113 1434
            </a>
          </div>
        </div>
      )}
    </header>
    </>
  );
};

