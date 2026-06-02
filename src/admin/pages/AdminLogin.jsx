import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AdminApp';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = login(form);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0A1E 0%, #1A0F35 40%, #0D0620 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Outfit', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient blobs */}
      <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', top:'-200px', left:'-200px', filter:'blur(80px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', bottom:'-100px', right:'-100px', filter:'blur(60px)', pointerEvents:'none' }} />

      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 440,
        margin: '0 24px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(139,92,246,0.2)',
        borderRadius: 24,
        padding: '48px 40px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          {/* White card so the logo shows crisp on the dark login background */}
          <div style={{
            background: '#ffffff',
            borderRadius: 24,
            padding: '18px 28px 14px',
            boxShadow: '0 8px 40px rgba(139,92,246,0.25), 0 0 0 1px rgba(255,255,255,0.1)',
            marginBottom: 18,
          }}>
            <img
              src="/impactra-logo.png"
              alt="IMPACTRA"
              style={{ height: 110, width: 'auto', display: 'block', objectFit: 'contain' }}
              draggable={false}
            />
          </div>

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 16px',
            borderRadius: 50,
            background: 'rgba(139,92,246,0.12)',
            border: '1px solid rgba(139,92,246,0.3)',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: 'rgba(192,132,252,0.9)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#A855F7', display: 'inline-block' }} />
            ADMIN CONSOLE
          </div>
        </div>


        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 8 }}>Welcome back</h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginBottom: 32 }}>Sign in to manage your agency</p>


        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 10,
            padding: '10px 14px',
            color: '#FCA5A5',
            fontSize: '0.85rem',
            marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, letterSpacing: '0.05em' }}>EMAIL ADDRESS</label>
            <input
              id="admin-email"
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="admin@impactra.in"
              style={{
                width: '100%', padding: '13px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(139,92,246,0.25)',
                borderRadius: 12,
                color: '#fff',
                fontSize: '0.9rem',
                fontFamily: "'Outfit', sans-serif",
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(139,92,246,0.25)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, letterSpacing: '0.05em' }}>PASSWORD</label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-password"
                type={showPass ? 'text' : 'password'}
                required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '13px 48px 13px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  borderRadius: 12,
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontFamily: "'Outfit', sans-serif",
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(139,92,246,0.25)'}
              />
              <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 0 }}>
                {showPass
                  ? <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              background: loading ? 'rgba(139,92,246,0.5)' : 'linear-gradient(135deg, #8B5CF6, #A855F7)',
              border: 'none',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 700,
              fontFamily: "'Outfit', sans-serif",
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.03em',
              boxShadow: '0 8px 32px rgba(139,92,246,0.4)',
              transition: 'all 0.25s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              marginTop: 4,
            }}
          >
            {loading ? (
              <>
                <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                Signing in...
              </>
            ) : 'Sign In to Admin Panel'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 28, padding: '16px', background: 'rgba(139,92,246,0.06)', borderRadius: 10, border: '1px solid rgba(139,92,246,0.15)' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Demo Credentials</p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(192,132,252,0.8)' }}>admin@impactra.in / Impactra@2024</p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2) !important; }
      `}</style>
    </div>
  );
}
