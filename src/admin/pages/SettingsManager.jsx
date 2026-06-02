import React, { useState, useEffect } from 'react';
import { store } from '../store';

const TABS = [
  { key: 'agency', label: 'Agency Info', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { key: 'contact', label: 'Contact', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63 19.79 19.79 0 01.92 1a2 2 0 012-1.79h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91"/></svg> },
  { key: 'social', label: 'Social Media', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
  { key: 'seo', label: 'SEO', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
];

export default function SettingsManager() {
  const [settings, setSettings] = useState(store.getSettings());
  const [activeTab, setActiveTab] = useState('agency');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings(s => ({ ...s, [key]: value }));
    setSaved(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    store.saveSettings(settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = { width: '100%', padding: '12px 16px', background: '#FAFAFC', border: '1.5px solid rgba(139,92,246,0.15)', borderRadius: 12, color: '#1E1B2E', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' };
  const labelStyle = { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#6B7280', marginBottom: 8, letterSpacing: '0.05em' };

  const SOCIAL_FIELDS = [
    { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/yourpage', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    ), color: '#E1306C' },
    { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/company/yourco', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ), color: '#0077B5' },
    { key: 'twitter', label: 'Twitter / X URL', placeholder: 'https://twitter.com/yourhandle', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    ), color: '#1DA1F2' },
    { key: 'behance', label: 'Behance URL', placeholder: 'https://behance.net/yourprofile', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zm-7.shutterstock-8c-2.282 0-2.907 1.698-3.01 2.635h5.993c-.092-1.075-.635-2.635-2.983-2.635zM8 11c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0 7c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm7-8H9V4h6v6z"/></svg>
    ), color: '#1769FF' },
  ];

  const CONTENT = {
    agency: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <div>
            <label style={labelStyle}>AGENCY NAME</label>
            <input value={settings.agencyName} onChange={e => handleChange('agencyName', e.target.value)} placeholder="IMPACTRA" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          </div>
          <div>
            <label style={labelStyle}>TAGLINE</label>
            <input value={settings.tagline} onChange={e => handleChange('tagline', e.target.value)} placeholder="We Build Digital Excellence" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>LOGO URL</label>
          <input type="url" value={settings.logoUrl} onChange={e => handleChange('logoUrl', e.target.value)} placeholder="https://your-logo-url.png" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          {settings.logoUrl && (
            <div style={{ marginTop: 10, padding: '12px', background: '#F8F7FF', borderRadius: 10 }}>
              <img src={settings.logoUrl} alt="Logo preview" style={{ height: 50, objectFit: 'contain' }} onError={e => e.target.style.display='none'} />
            </div>
          )}
        </div>

        {/* Preview Card */}
        <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(139,92,246,0.04), rgba(168,85,247,0.02))', borderRadius: 16, border: '1px solid rgba(139,92,246,0.1)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF', marginBottom: 12, letterSpacing: '0.05em' }}>LIVE PREVIEW</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.1em', background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{settings.agencyName || 'IMPACTRA'}</div>
          <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: 4 }}>{settings.tagline || 'Your tagline here'}</div>
        </div>
      </div>
    ),
    contact: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={labelStyle}>EMAIL ADDRESS</label>
          <input type="email" value={settings.email} onChange={e => handleChange('email', e.target.value)} placeholder="hello@impactra.in" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
        </div>
        <div>
          <label style={labelStyle}>PHONE NUMBER</label>
          <input type="tel" value={settings.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+91 93457 10960" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
        </div>
        <div>
          <label style={labelStyle}>ADDRESS</label>
          <textarea value={settings.address} onChange={e => handleChange('address', e.target.value)} placeholder="Chennai, Tamil Nadu, India" rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
        </div>
      </div>
    ),
    social: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {SOCIAL_FIELDS.map(({ key, label, placeholder, icon, color }) => (
          <div key={key}>
            <label style={labelStyle}>{label.toUpperCase()}</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color }}>{icon}</div>
              <input type="url" value={settings[key] || ''} onChange={e => handleChange(key, e.target.value)} placeholder={placeholder} style={{ ...inputStyle, paddingLeft: 44 }} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
            </div>
          </div>
        ))}
      </div>
    ),
    seo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* SEO Preview */}
        <div style={{ padding: '16px', background: '#F8F7FF', borderRadius: 12, border: '1px solid rgba(139,92,246,0.1)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF', marginBottom: 10, letterSpacing: '0.05em' }}>GOOGLE PREVIEW</div>
          <div style={{ fontSize: '1rem', color: '#1A0DAB', fontWeight: 600, marginBottom: 3 }}>{settings.seoTitle || 'Your Page Title'}</div>
          <div style={{ fontSize: '0.78rem', color: '#006621', marginBottom: 3 }}>https://impactra.in</div>
          <div style={{ fontSize: '0.85rem', color: '#545454', lineHeight: 1.5 }}>{settings.seoDescription || 'Your meta description will appear here...'}</div>
        </div>

        <div>
          <label style={labelStyle}>SEO TITLE</label>
          <input value={settings.seoTitle} onChange={e => handleChange('seoTitle', e.target.value)} placeholder="IMPACTRA – Premium Digital Agency" maxLength={60} style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          <div style={{ fontSize: '0.72rem', color: settings.seoTitle?.length > 55 ? '#F59E0B' : '#9CA3AF', marginTop: 4 }}>{settings.seoTitle?.length || 0}/60 characters</div>
        </div>

        <div>
          <label style={labelStyle}>META DESCRIPTION</label>
          <textarea value={settings.seoDescription} onChange={e => handleChange('seoDescription', e.target.value)} placeholder="We craft exceptional digital experiences that drive growth." maxLength={160} rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          <div style={{ fontSize: '0.72rem', color: settings.seoDescription?.length > 150 ? '#F59E0B' : '#9CA3AF', marginTop: 4 }}>{settings.seoDescription?.length || 0}/160 characters</div>
        </div>
      </div>
    ),
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E1B2E', margin: 0 }}>Website Settings</h1>
        <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginTop: 6 }}>Manage your agency information and website configuration</p>
      </div>

      <form onSubmit={handleSave}>
        <div style={{ display: 'flex', gap: 24 }}>
          {/* Sidebar Tabs */}
          <div style={{ width: 180, flexShrink: 0 }}>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(139,92,246,0.08)', padding: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '11px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: activeTab === tab.key ? 'rgba(139,92,246,0.08)' : 'transparent',
                    color: activeTab === tab.key ? '#7C3AED' : '#6B7280',
                    fontWeight: activeTab === tab.key ? 600 : 500,
                    fontSize: '0.85rem', fontFamily: "'Outfit', sans-serif",
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    marginBottom: 2,
                  }}
                >
                  <span style={{ color: 'inherit' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(139,92,246,0.08)', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              {CONTENT[activeTab]}
            </div>

            {/* Save Button */}
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14 }}>
              {saved && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#10B981', fontSize: '0.875rem', fontWeight: 600 }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  Settings saved!
                </div>
              )}
              <button
                type="submit"
                disabled={saving}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '12px 28px', borderRadius: 12,
                  background: saving ? 'rgba(139,92,246,0.5)' : 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                  border: 'none', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer',
                  fontWeight: 700, fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif",
                  boxShadow: '0 4px 16px rgba(139,92,246,0.35)',
                  transition: 'all 0.25s',
                }}
              >
                {saving ? (
                  <>
                    <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                    Saving...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
