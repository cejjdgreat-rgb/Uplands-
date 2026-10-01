/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureMenu } from './components/SignatureMenu';
import { CateringSection } from './components/CateringSection';
import { ReservationSection } from './components/ReservationSection';
import { DeliverySection } from './components/DeliverySection';
import { AboutSection } from './components/AboutSection';
import { SocialGallery } from './components/SocialGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { FoodDetailModal } from './components/FoodDetailModal';
import { WhatsAppOrderDrawer } from './components/WhatsAppOrderDrawer';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toast } from './components/Toast';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import { useStore } from './context/StoreContext';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { CartItem, MenuItem } from './types';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function App() {
  const { isDay } = useTheme();
  const { isAuthenticated } = useAuth();
  const { unreadOrdersCount } = useStore();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);

  // Admin routing states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Total item count across all quantities
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Check URL hash on initial mount and hash changes
  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#admin') {
        if (isAuthenticated) {
          setIsAdminOpen(true);
          setIsAdminLoginOpen(false);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, [isAuthenticated]);

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
      window.location.hash = '#admin';
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastOpen(true);
    setTimeout(() => {
      setIsToastOpen(false);
    }, 4000);
  };

  // Add item with custom options from detail modal
  const handleAddToCart = (dish: MenuItem, options: Record<string, string>, notes: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.dish.id === dish.id &&
          JSON.stringify(ci.selectedOptions || {}) === JSON.stringify(options || {}) &&
          ci.notes === notes
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      } else {
        return [...prev, { dish, quantity: 1, selectedOptions: options, notes }];
      }
    });
    showToast(`Added ${dish.name} to your tray!`);
  };

  // Quick 1-click add from menu cards
  const handleQuickAdd = (dish: MenuItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.dish.id === dish.id &&
          (!ci.selectedOptions || Object.keys(ci.selectedOptions).length === 0)
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      } else {
        return [...prev, { dish, quantity: 1 }];
      }
    });
    showToast(`Added ${dish.name} to your tray!`);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // If Admin Dashboard is active and authenticated, show full administration app
  if (isAdminOpen && isAuthenticated) {
    return (
      <AdminDashboard
        onClose={() => {
          setIsAdminOpen(false);
          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-400 selection:bg-[#E6B849] selection:text-[#062316] ${
      isDay ? 'bg-[#FAF8F5] text-[#062316]' : 'bg-[#04140D] text-slate-100'
    }`}>
      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsBookingModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero
          onOpenCart={() => setIsCartOpen(true)}
          onOpenReservation={() => setIsBookingModalOpen(true)}
        />

        <SignatureMenu
          onSelectDish={(dish) => setSelectedDish(dish)}
          onQuickAdd={handleQuickAdd}
        />

        <CateringSection />

        <ReservationSection />

        <DeliverySection
          onOpenCart={() => setIsCartOpen(true)}
        />

        <AboutSection />

        <SocialGallery />

        <TestimonialsSection />

        <FAQSection />

        <ContactSection />
      </main>

      {/* Site Footer with subtle Admin Dashboard link */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Sticky Mobile Action Bar (Under 15% viewport height) */}
      <MobileActionBar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Desktop Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Authenticated Staff Floating Quick-Switch (visible only when logged in as admin) */}
      {isAuthenticated && (
        <div className="fixed bottom-20 sm:bottom-6 left-4 z-40 animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => {
              setIsAdminOpen(true);
              window.location.hash = '#admin';
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-[#8C6207]/40"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Portal</span>
            {unreadOrdersCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-mono animate-pulse">
                {unreadOrdersCount}
              </span>
            )}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Item Added Toast Notification */}
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setIsToastOpen(false)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Food Detail & Customization Modal */}
      {selectedDish && (
        <FoodDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* WhatsApp Cart & Multi-Item Order Drawer */}
      <WhatsAppOrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Dedicated Reservation Modal Popup (when clicked from Nav/Hero) */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Secure Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => {
          setIsAdminLoginOpen(false);
          window.location.hash = '';
        }}
        onSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminOpen(true);
          window.location.hash = '#admin';
        }}
      />
    </div>
  );
}
