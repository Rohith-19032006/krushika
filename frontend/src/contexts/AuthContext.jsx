import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext();

const TOKEN_KEY = 'farmer-app-token';
const USER_KEY = 'farmer-app-user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  const setToken = useCallback((newToken, userData) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
      if (userData) localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setTokenState(newToken);
      setUser(userData || null);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setTokenState(null);
      setUser(null);
    }
  }, []);

  const logout = useCallback(() => setToken(null), [setToken]);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    const saved = localStorage.getItem(USER_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (_) {}
    }
    api
      .get('/auth/me')
      .then((res) => {
        setUser(res);
        localStorage.setItem(USER_KEY, JSON.stringify(res));
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ user, token, loading, setToken, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
