import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AdminSession {
  token: string;
  username: string;
  role: string;
  expiresAt: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  session: AdminSession | null;
  secondsRemaining: number;
  isLocked: boolean;
  lockRemainingSeconds: number;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  changePassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; message?: string }>;
  renewSession: () => void;
  getAuthHeaders: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN_KEY = 'uplands_auth_token_v1';
const RATE_LIMIT_KEY = 'uplands_auth_rate_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [lockRemainingSeconds, setLockRemainingSeconds] = useState<number>(0);

  // Rate-limiting check helper
  const checkClientRateLimit = useCallback(() => {
    try {
      const raw = localStorage.getItem(RATE_LIMIT_KEY);
      if (raw) {
        const state = JSON.parse(raw);
        if (state.lockedUntil && state.lockedUntil > Date.now()) {
          const remaining = Math.ceil((state.lockedUntil - Date.now()) / 1000);
          setIsLocked(true);
          setLockRemainingSeconds(remaining);
          return { isLocked: true, remaining };
        }
      }
    } catch {
      // ignore
    }
    setIsLocked(false);
    setLockRemainingSeconds(0);
    return { isLocked: false, remaining: 0 };
  }, []);

  const recordFailedAttempt = useCallback(() => {
    try {
      const raw = localStorage.getItem(RATE_LIMIT_KEY);
      const state = raw ? JSON.parse(raw) : { failedAttempts: 0, lockedUntil: null };
      state.failedAttempts = (state.failedAttempts || 0) + 1;
      if (state.failedAttempts >= 5) {
        state.lockedUntil = Date.now() + 30 * 1000; // 30s lockout
      }
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state));
      checkClientRateLimit();
    } catch {
      // ignore
    }
  }, [checkClientRateLimit]);

  const clearRateLimit = useCallback(() => {
    try {
      localStorage.removeItem(RATE_LIMIT_KEY);
      setIsLocked(false);
      setLockRemainingSeconds(0);
    } catch {
      // ignore
    }
  }, []);

  // Check existing token on initial mount
  useEffect(() => {
    checkClientRateLimit();
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    fetch('/api/auth/session', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Session invalid');
      })
      .then((data) => {
        setSession({
          token,
          username: data.user.username,
          role: data.user.role,
          expiresAt: data.expiresAt,
        });
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setSession(null);
      });
  }, [checkClientRateLimit]);

  // Session timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      checkClientRateLimit();

      if (session) {
        const remaining = Math.max(0, Math.floor((session.expiresAt - Date.now()) / 1000));
        setSecondsRemaining(remaining);
        if (remaining <= 0) {
          localStorage.removeItem(TOKEN_KEY);
          setSession(null);
        }
      } else {
        setSecondsRemaining(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [session, checkClientRateLimit]);

  const getAuthHeaders = useCallback((): Record<string, string> => {
    const token = session?.token || localStorage.getItem(TOKEN_KEY);
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }, [session]);

  const renewSession = useCallback(() => {
    const token = session?.token || localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    fetch('/api/auth/session', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Session renewal failed');
      })
      .then((data) => {
        setSession((prev) =>
          prev
            ? { ...prev, expiresAt: data.expiresAt }
            : { token, username: data.user.username, role: data.user.role, expiresAt: data.expiresAt }
        );
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setSession(null);
      });
  }, [session]);

  const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
    const rate = checkClientRateLimit();
    if (rate.isLocked) {
      return {
        success: false,
        message: `Too many failed attempts. Security lockout active. Wait ${rate.remaining} seconds.`,
      };
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        recordFailedAttempt();
        return { success: false, message: data.error || 'Invalid credentials' };
      }

      clearRateLimit();
      localStorage.setItem(TOKEN_KEY, data.token);
      setSession({
        token: data.token,
        username: data.user.username,
        role: data.user.role,
        expiresAt: data.expiresAt,
      });

      return { success: true };
    } catch {
      return { success: false, message: 'Server connection error. Please try again.' };
    }
  };

  const logout = async () => {
    const token = session?.token || localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // ignore
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    setSession(null);
  };

  const changePassword = async (
    currentPass: string,
    newPass: string
  ): Promise<{ success: boolean; message?: string }> => {
    const token = session?.token || localStorage.getItem(TOKEN_KEY);
    if (!token) return { success: false, message: 'Not authenticated' };

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Failed to update password' };
      }
      return { success: true, message: data.message };
    } catch {
      return { success: false, message: 'Connection error while updating password' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!session,
        session,
        secondsRemaining,
        isLocked,
        lockRemainingSeconds,
        login,
        logout,
        changePassword,
        renewSession,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
