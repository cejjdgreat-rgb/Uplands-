import React, { useState } from 'react';
import { Lock, ShieldCheck, AlertCircle, ArrowLeft, KeyRound, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../BrandLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { login, isLocked, lockRemainingSeconds } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const result = await login(username, password);
    setIsLoading(false);

    if (result.success) {
      onSuccess();
    } else {
      setErrorMessage(result.message || 'Login failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#04140D] border border-[#0F442C] rounded-2xl shadow-2xl text-slate-100 overflow-hidden relative">
        {/* Subtle top emerald accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0E4A2F] via-[#F5D061] to-[#0E4A2F]" />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <BrandLogo size="sm" />
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-[#061F14]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#061F14] border border-[#0F442C] flex items-center justify-center text-[#F5D061] mb-3 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-serif font-bold text-white tracking-tight">
              Admin & Storefront Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Secure authentication for Uplands Culinary Hub management system.
            </p>
          </div>

          {/* Rate Limit Locked Warning */}
          {isLocked && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Security Lockout Active</p>
                <p className="text-[11px] text-red-300 mt-0.5">
                  Too many failed login attempts. Portal temporarily locked for {lockRemainingSeconds} seconds.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && !isLocked && (
            <div className="mb-5 p-3.5 rounded-xl bg-amber-950/60 border border-amber-800/80 text-amber-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[12px]">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  disabled={isLocked || isLoading}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-3 py-2.5 bg-[#061F14] border border-[#0F442C] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F5D061] transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isLocked || isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#061F14] border border-[#0F442C] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F5D061] transition-colors disabled:opacity-50 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLocked || isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-bold text-[#062316] bg-gradient-to-r from-[#FBE08D] via-[#F5D061] to-[#D4A034] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#062316] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authenticate & Enter Hub</span>
                </>
              )}
            </button>
          </form>

          {/* Staff Access Notice */}
          <div className="mt-6 p-3 rounded-xl bg-[#061F14]/70 border border-[#0F3823] text-[11px] text-slate-400 text-center">
            <span className="text-[#F5D061] font-semibold">Authorized Staff Access Only.</span>
            <p className="mt-1 text-slate-400">
              Please enter your authorized administrative credentials to manage store operations, orders, and content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
