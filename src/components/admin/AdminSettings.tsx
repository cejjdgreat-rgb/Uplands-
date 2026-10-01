import React, { useState } from 'react';
import {
  Settings,
  Shield,
  KeyRound,
  Lock,
  Save,
  Check,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Bell,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { StoreSettings } from '../../types';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetAllToDefaults } = useStore();
  const { changePassword, session, secondsRemaining } = useAuth();

  const [formData, setFormData] = useState<StoreSettings>({ ...settings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Password Change Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setPassError('Password must be at least 6 characters.');
      return;
    }

    const res = await changePassword(currentPassword, newPassword);
    if (res.success) {
      setPassSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(''), 4000);
    } else {
      setPassError(res.message || 'Failed to update password.');
    }
  };

  const minutesRemaining = Math.floor(secondsRemaining / 60);
  const secsRemainder = secondsRemaining % 60;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Store Settings & Security Controls
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage contact channels, delivery fee policies, kitchen hours, and administrator credentials.
          </p>
        </div>

        {settingsSaved && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>Store settings saved!</span>
          </div>
        )}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Contact & Location Info */}
        <div className="p-6 rounded-2xl bg-[#061F14] border border-[#0F442C] space-y-4">
          <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F5D061]" />
            Restaurant Details & Contact Numbers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Restaurant Display Name
              </label>
              <input
                type="text"
                required
                value={formData.restaurantName}
                onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Primary Phone 1
              </label>
              <input
                type="text"
                required
                value={formData.phone1}
                onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white font-mono focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Primary Phone 2
              </label>
              <input
                type="text"
                value={formData.phone2}
                onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white font-mono focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                WhatsApp Orders Number (Raw)
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="233241131434"
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white font-mono focus:outline-none focus:border-[#F5D061]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Physical Location / GPS Address
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
          </div>
        </div>

        {/* Operating Hours */}
        <div className="p-6 rounded-2xl bg-[#061F14] border border-[#0F442C] space-y-4">
          <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#F5D061]" />
            Operating & Kitchen Hours
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Weekday Hours (Mon–Fri)
              </label>
              <input
                type="text"
                value={formData.weekdayHours}
                onChange={(e) => setFormData({ ...formData, weekdayHours: e.target.value })}
                placeholder="7:00 AM – 9:30 PM"
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Weekend Hours (Sat–Sun)
              </label>
              <input
                type="text"
                value={formData.weekendHours}
                onChange={(e) => setFormData({ ...formData, weekendHours: e.target.value })}
                placeholder="7:00 AM – 10:00 PM"
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Breakfast Window
              </label>
              <input
                type="text"
                value={formData.breakfastHours}
                onChange={(e) => setFormData({ ...formData, breakfastHours: e.target.value })}
                placeholder="7:00 AM – 11:30 AM"
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>
          </div>
        </div>

        {/* Ordering & Delivery Fees */}
        <div className="p-6 rounded-2xl bg-[#061F14] border border-[#0F442C] space-y-4">
          <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#F5D061]" />
            Ordering Rules & Delivery Configuration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Currency Symbol
              </label>
              <input
                type="text"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white font-mono focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Standard Delivery Fee (GH₵)
              </label>
              <input
                type="number"
                min="0"
                value={formData.deliveryFeeGHS}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryFeeGHS: Number(e.target.value) })
                }
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white font-mono focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Free Delivery Above (GH₵)
              </label>
              <input
                type="number"
                min="0"
                value={formData.freeDeliveryThresholdGHS}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    freeDeliveryThresholdGHS: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white font-mono focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Tax / Service Charge (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.taxPercent}
                onChange={(e) =>
                  setFormData({ ...formData, taxPercent: Number(e.target.value) })
                }
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white font-mono focus:outline-none focus:border-[#F5D061]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <label className="p-3.5 rounded-xl bg-[#04140D] border border-[#0F3823] flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-white block">Allow Online Ordering</span>
                <span className="text-[11px] text-slate-400">Accept orders through WhatsApp cart</span>
              </div>
              <input
                type="checkbox"
                checked={formData.allowOnlineOrders}
                onChange={(e) =>
                  setFormData({ ...formData, allowOnlineOrders: e.target.checked })
                }
                className="w-4 h-4 accent-[#F5D061] rounded cursor-pointer"
              />
            </label>

            <label className="p-3.5 rounded-xl bg-[#04140D] border border-[#0F3823] flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-white block">Incoming Order Sound Chime</span>
                <span className="text-[11px] text-slate-400">Audible chime on new orders</span>
              </div>
              <input
                type="checkbox"
                checked={formData.soundAlertsEnabled}
                onChange={(e) =>
                  setFormData({ ...formData, soundAlertsEnabled: e.target.checked })
                }
                className="w-4 h-4 accent-[#F5D061] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>

      {/* Security & Password Management Section */}
      <div className="p-6 rounded-2xl bg-[#061F14] border border-[#0F442C] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#F5D061]" />
              Administrator Credentials & Security
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Secure password management protected with cryptographic salted SHA-256 hashing.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Session Inactivity Timeout:</span>
            <span className="font-mono text-xs font-bold text-[#F5D061]">
              {String(minutesRemaining).padStart(2, '0')}:{String(secsRemainder).padStart(2, '0')} remaining
            </span>
          </div>
        </div>

        {passSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{passSuccess}</span>
          </div>
        )}

        {passError && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>{passError}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Current Password
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                New Password (Min 6 chars)
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-3 py-2 text-xs bg-[#04140D] border border-[#0F442C] rounded-xl text-white focus:outline-none focus:border-[#F5D061]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPass ? 'Hide passwords' : 'Show passwords'}</span>
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-[#0E4A2F] hover:bg-[#145E3B] rounded-xl cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#F5D061]" />
              <span>Update Password</span>
            </button>
          </div>
        </form>

        {/* Danger Zone: Reset to seed defaults */}
        <div className="pt-6 border-t border-[#0F3823] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-300 block">Reset Store Data to Default</span>
            <span className="text-[11px] text-slate-500">Restore factory sample menu and settings template</span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to restore default menu dishes and settings?')) {
                resetAllToDefaults();
                alert('Store restored to default demonstration template.');
              }
            }}
            className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 border border-red-900/60 rounded-xl hover:bg-red-950/40 cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
