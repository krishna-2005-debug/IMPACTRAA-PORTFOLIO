import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AdminApp';

const NAV_ITEMS = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
  )},
  { path: '/admin/portfolio', label: 'Portfolio', icon: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
  )},
  { path: '/admin/services', label: 'Services', icon: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  )},
  { path: '/admin/testimonials', label: 'Testimonials', icon: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
  )},
  { path: '/admin/leads', label: 'Leads', icon: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
  )},
  { path: '/admin/blog', label: 'Blog', icon: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
  )},
  { path: '/admin/settings', label: 'Settings', icon: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
  )},
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{
        padding: sidebarOpen ? '18px 20px 16px' : '18px 10px 16px',
        borderBottom: '1px solid rgba(139,92,246,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: sidebarOpen ? 'flex-start' : 'center',
        overflow: 'hidden',
        transition: 'padding 0.3s',
      }}>
        {sidebarOpen ? (
          /* Expanded: full logo PNG */
          <img
            src="/impactra-logo.png"
            alt="IMPACTRA"
            style={{ height: 56, width: 'auto', display: 'block', objectFit: 'contain' }}
            draggable={false}
          />
        ) : (
          /* Collapsed: cropped to show just the iA mark */
          <div style={{ width: 42, height: 42, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
            <img
              src="/impactra-logo.png"
              alt="IMPACTRA"
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                height: 110,
                width: 'auto',
                objectFit: 'contain',
              }}
              draggable={false}
            />
          </div>
        )}
      </div>


      {/* Navigation */}
      <nav style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: sidebarOpen ? '11px 14px' : '11px',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              borderRadius: 12,
              marginBottom: 4,
              textDecoration: 'none',
              color: isActive ? '#7C3AED' : '#6B7280',
              background: isActive ? 'rgba(139,92,246,0.08)' : 'transparent',
              fontWeight: isActive ? 600 : 500,
              fontSize: '0.88rem',
              fontFamily: "'Outfit', sans-serif",
              transition: 'all 0.2s ease',
              position: 'relative',
              ...(isActive && { boxShadow: 'inset 3px 0 0 #8B5CF6', borderLeft: '3px solid transparent' }),
            })}
          >
            <span style={{ flexShrink: 0, color: 'inherit' }}>{item.icon}</span>
            {sidebarOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
        {sidebarOpen ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, background: 'rgba(139,92,246,0.06)' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.85rem', fontWeight: 700, flexShrink: 0 }}>
              {user?.name?.[0] || 'A'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E1B2E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#9CA3AF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.role?.replace('_', ' ')}</div>
            </div>
            <button onClick={handleLogout} title="Logout" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4, borderRadius: 6, flexShrink: 0 }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={handleLogout} title="Logout" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 8, borderRadius: 8 }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Outfit', sans-serif", background: '#F8F7FF' }}>
      {/* Desktop Sidebar */}
      <aside style={{
        width: sidebarOpen ? 240 : 70,
        background: '#FFFFFF',
        borderRight: '1px solid rgba(139,92,246,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
        zIndex: 100,
        boxShadow: '4px 0 24px rgba(0,0,0,0.04)',
      }} className="admin-sidebar-desktop">
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(s => !s)}
          style={{
            position: 'absolute',
            top: 28,
            right: -12,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: '#fff',
            border: '1.5px solid rgba(139,92,246,0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8B5CF6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 10,
            transition: 'transform 0.3s',
            transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div onClick={() => setMobileOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
          <aside style={{ position: 'relative', width: 240, background: '#fff', display: 'flex', flexDirection: 'column', zIndex: 10, height: '100%', boxShadow: '4px 0 40px rgba(0,0,0,0.2)' }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Bar */}
        <header style={{
          height: 64,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(139,92,246,0.08)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: 16,
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
        }}>
          <button
            className="admin-mobile-menu"
            onClick={() => setMobileOpen(true)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#7C3AED', padding: 4 }}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF', letterSpacing: '0.05em' }}>IMPACTRA ADMIN</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* View Site Button */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(139,92,246,0.06)',
                border: '1px solid rgba(139,92,246,0.15)',
                color: '#7C3AED',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
              View Site
            </a>

            {/* Notification */}
            <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
              <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#A855F7', border: '2px solid #fff' }} />
            </button>

            {/* Avatar */}
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
              {user?.name?.[0] || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '28px 28px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-mobile-menu { display: flex !important; }
          main { padding: 20px 16px !important; }
        }
        .admin-sidebar-desktop a:hover { background: rgba(139,92,246,0.06) !important; color: #7C3AED !important; }
      `}</style>
    </div>
  );
}
