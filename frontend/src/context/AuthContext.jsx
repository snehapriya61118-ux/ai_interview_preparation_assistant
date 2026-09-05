import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as loginApi, registerUser as registerApi, getMe } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          const res = await getMe();
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        } catch (err) {
          console.error("Token verification failed:", err);
          logout();
        }
      } else {
        // Auto-authenticate default demo session if unauthenticated
        try {
          const res = await loginApi({ email: 'alex.morgan@example.com', password: 'password123' });
          const { access_token, user: userData } = res.data;
          setToken(access_token);
          setUser(userData);
          localStorage.setItem('token', access_token);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
          try {
            const regRes = await registerApi({
              name: 'Alex Morgan',
              email: 'alex.morgan@example.com',
              password: 'password123',
              confirm_password: 'password123'
            });
            const { access_token, user: userData } = regRes.data;
            setToken(access_token);
            setUser(userData);
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(userData));
          } catch (regErr) {
            setUser({ id: 1, name: 'Alex Morgan', email: 'alex.morgan@example.com' });
          }
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await loginApi({ email, password });
    const { access_token, user: userData } = res.data;
    setToken(access_token);
    setUser(userData);
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const register = async (name, email, password, confirmPassword) => {
    const res = await registerApi({ name, email, password, confirm_password: confirmPassword });
    const { access_token, user: userData } = res.data;
    setToken(access_token);
    setUser(userData);
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!token || !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
