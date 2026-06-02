import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import PortfolioManager from './pages/PortfolioManager';
import ServicesManager from './pages/ServicesManager';
import TestimonialsManager from './pages/TestimonialsManager';
import LeadsManager from './pages/LeadsManager';
import BlogManager from './pages/BlogManager';
import SettingsManager from './pages/SettingsManager';

/* ── Auth Context ── */
export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('impactra_admin');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const login = (credentials) => {
    if (credentials.email === 'admin@impactra.in' && credentials.password === 'Impactra@2024') {
      const userData = {
        id: 1,
        name: 'Admin User',
        email: credentials.email,
        role: 'super_admin',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin',
        avatar: null,
      };
      setUser(userData);
      localStorage.setItem('impactra_admin', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('impactra_admin');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public: Login page — NO auth guard */}
        <Route path="login" element={<AdminLogin />} />

        {/* Protected: Admin layout wraps all dashboard pages */}
        <Route
          path="*"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="portfolio" element={<PortfolioManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="leads" element={<LeadsManager />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
