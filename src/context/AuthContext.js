'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import { getUser, setUser, setToken, logout as logoutUtil } from '@/utils/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const currentUser = getUser();
    setUserState(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const userData = response.data;
      const token = userData.token;

      setToken(token);
      setUser(userData);
      setUserState(userData);

      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const signup = async (name, email, phone, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, phone, password });
      const userData = response.data;
      const token = userData.token;

      setToken(token);
      setUser(userData);
      setUserState(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed',
      };
    }
  };

  const logout = () => {
    logoutUtil();
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
