import React, { useState, useEffect } from 'react';
import { store } from '../store';

const STATUS_CONFIG = {
  new: { label: 'New', color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
  contacted: { label: 'Contacted', color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
  converted: { label: 'Converted', color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
  closed: { label: 'Closed', color: '#9CA3AF', bg: 'rgba(156,163,175,0.08)', border: 'rgba(156,163,175,0.2)' },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  return (
    <span style={{ padding: '3px 12px', borderRadius: 50, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em', color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      {cfg.label.toUpperCase()}
    </span>
  );
}

function Modal({ open, onClose, children }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 560, background: '#fff', borderRadius: 24, boxShadow: '0 24px 80px rgba(0,0,0,0.2)', padding: 32, maxHeight: '90vh', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

export default function LeadsManager() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [viewLead, setViewLead] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { setLeads(store.getLeads()); }, []);

  const filtered = leads.filter(l => {
    const matchFilter = filter === 'all' || l.status === filter;
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()) || l.service?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const updateStatus = (id, status) => {
    const updated = store.updateLeadStatus(id, status);
    setLeads(updated);
    if (viewLead?.id === id) setViewLead(updated.find(l => l.id === id));
  };

  const COUNTS = Object.fromEntries(['all', ...Object.keys(STATUS_CONFIG)].map(s => [s, s === 'all' ? leads.length : leads.filter(l => l.status === s).length]));

  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E1B2E', margin: 0 }}>Leads & Inquiries</h1>
        <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginTop: 6 }}>{leads.length} total leads · {COUNTS.new} new</p>
      </div>

      {/* Status Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: 200, maxWidth: 300 }}>
          <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..." style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1.5px solid rgba(139,92,246,0.15)', borderRadius: 10, fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif", color: '#1E1B2E', background: '#fff', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {[{ key: 'all', label: 'All' }, ...Object.entries(STATUS_CONFIG).map(([k, v]) => ({ key: k, label: v.label }))].map(({ key, label }) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            padding: '8px 18px', borderRadius: 50, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, fontFamily: "'Outfit', sans-serif",
            border: '1.5px solid',
            borderColor: filter === key ? (STATUS_CONFIG[key]?.color || '#8B5CF6') : 'rgba(139,92,246,0.15)',
            background: filter === key ? (STATUS_CONFIG[key]?.bg || 'rgba(139,92,246,0.08)') : '#fff',
            color: filter === key ? (STATUS_CONFIG[key]?.color || '#7C3AED') : '#6B7280',
            transition: 'all 0.2s',
          }}>
            {label} <span style={{ marginLeft: 4, fontSize: '0.72rem', opacity: 0.7 }}>({COUNTS[key] || 0})</span>
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(139,92,246,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(139,92,246,0.08)', background: 'rgba(139,92,246,0.02)' }}>
                {['Lead', 'Contact', 'Service', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 18px', textAlign: 'left', fontSize: '0.73rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <tr key={lead.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(139,92,246,0.05)' : 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.85rem', fontWeight: 700, flexShrink: 0 }}>{lead.name[0]}</div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E1B2E' }}>{lead.name}</div>
                        {lead.phone && <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{lead.phone}</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <a href={`mailto:${lead.email}`} style={{ fontSize: '0.82rem', color: '#7C3AED', textDecoration: 'none', fontWeight: 500 }}>{lead.email}</a>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>{lead.service || '—'}</span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <StatusBadge status={lead.status} />
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => setViewLead(lead)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 7, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        View
                      </button>
                      <button onClick={() => setDeleteId(lead.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 7, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#EF4444', cursor: 'pointer' }}>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#9CA3AF' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>No leads found</div>
                    <div style={{ fontSize: '0.82rem', marginTop: 4 }}>Try adjusting your filters</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      <Modal open={!!viewLead} onClose={() => setViewLead(null)}>
        {viewLead && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>{viewLead.name[0]}</div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E1B2E' }}>{viewLead.name}</div>
                  <StatusBadge status={viewLead.status} />
                </div>
              </div>
              <button onClick={() => setViewLead(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
              {[
                { label: 'Email', value: viewLead.email, href: `mailto:${viewLead.email}` },
                { label: 'Phone', value: viewLead.phone || '—', href: viewLead.phone ? `tel:${viewLead.phone}` : null },
                { label: 'Service', value: viewLead.service || '—' },
                { label: 'Received', value: new Date(viewLead.createdAt).toLocaleString() },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ padding: '12px 14px', background: '#F8F7FF', borderRadius: 10 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.05em', marginBottom: 4 }}>{label.toUpperCase()}</div>
                  {href
                    ? <a href={href} style={{ fontSize: '0.875rem', color: '#7C3AED', fontWeight: 600, textDecoration: 'none' }}>{value}</a>
                    : <div style={{ fontSize: '0.875rem', color: '#1E1B2E', fontWeight: 500 }}>{value}</div>
                  }
                </div>
              ))}
            </div>

            {viewLead.message && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.05em', marginBottom: 8 }}>MESSAGE</div>
                <div style={{ padding: '14px', background: '#F8F7FF', borderRadius: 10, fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.7 }}>{viewLead.message}</div>
              </div>
            )}

            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.05em', marginBottom: 10 }}>UPDATE STATUS</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                  <button key={key} onClick={() => updateStatus(viewLead.id, key)} style={{
                    padding: '8px 18px', borderRadius: 50, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, fontFamily: "'Outfit', sans-serif",
                    border: '1.5px solid', borderColor: viewLead.status === key ? cfg.color : 'rgba(139,92,246,0.15)',
                    background: viewLead.status === key ? cfg.bg : '#fff',
                    color: viewLead.status === key ? cfg.color : '#6B7280',
                    transition: 'all 0.2s',
                  }}>
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <a href={`mailto:${viewLead.email}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px', borderRadius: 10, background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', color: '#fff', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', fontFamily: "'Outfit', sans-serif" }}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Send Email
              </a>
              {viewLead.phone && (
                <a href={`tel:${viewLead.phone}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px', borderRadius: 10, background: 'rgba(16,185,129,0.08)', border: '1.5px solid rgba(16,185,129,0.2)', color: '#059669', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', fontFamily: "'Outfit', sans-serif" }}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63 19.79 19.79 0 01.92 1a2 2 0 012-1.79h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  Call
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#EF4444' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E1B2E', marginBottom: 8 }}>Delete Lead?</h3>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: 24 }}>This action cannot be undone.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Cancel</button>
            <button onClick={() => { setLeads(store.deleteLead(deleteId)); setDeleteId(null); }} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'linear-gradient(135deg, #EF4444, #DC2626)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
