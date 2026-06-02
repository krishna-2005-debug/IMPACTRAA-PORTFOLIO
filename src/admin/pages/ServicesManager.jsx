import React, { useState, useEffect } from 'react';
import { store } from '../store';

const ICONS = ['✦', '⬡', '◎', '▲', '⊕', '◈', '⬢', '✧', '⬟'];

const EMPTY = { id: '', title: '', description: '', icon: '✦', price: '', active: true };

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
      <div style={{ position: 'relative', width: '100%', maxWidth: 540, background: '#fff', borderRadius: 24, boxShadow: '0 24px 80px rgba(0,0,0,0.2)', padding: 32 }}>
        {children}
      </div>
    </div>
  );
}

function ServiceForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);

  const inputStyle = { width: '100%', padding: '11px 14px', background: '#FAFAFC', border: '1.5px solid rgba(139,92,246,0.15)', borderRadius: 10, color: '#1E1B2E', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif", outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#6B7280', marginBottom: 7, letterSpacing: '0.05em' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    onSave(form);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1E1B2E', margin: 0 }}>{form.id ? 'Edit Service' : 'New Service'}</h2>
        <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={labelStyle}>SERVICE NAME *</label>
          <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Web Development" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
        </div>

        <div>
          <label style={labelStyle}>DESCRIPTION *</label>
          <textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief service description..." rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={labelStyle}>STARTING PRICE</label>
            <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="₹25,000" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          </div>
          <div>
            <label style={labelStyle}>ICON</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
              {ICONS.map(ic => (
                <button key={ic} type="button" onClick={() => setForm(f => ({ ...f, icon: ic }))} style={{ width: 38, height: 38, borderRadius: 8, border: '2px solid', borderColor: form.icon === ic ? '#8B5CF6' : 'rgba(139,92,246,0.15)', background: form.icon === ic ? 'rgba(139,92,246,0.08)' : '#fff', cursor: 'pointer', fontSize: '1.1rem' }}>
                  {ic}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'rgba(139,92,246,0.04)', borderRadius: 12, border: '1px solid rgba(139,92,246,0.1)' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E1B2E' }}>Active Service</div>
            <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>Show this service on the website</div>
          </div>
          <button type="button" onClick={() => setForm(f => ({ ...f, active: !f.active }))} style={{ width: 52, height: 28, borderRadius: 14, background: form.active ? 'linear-gradient(135deg, #8B5CF6, #A855F7)' : 'rgba(139,92,246,0.1)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.25s' }}>
            <div style={{ position: 'absolute', width: 22, height: 22, borderRadius: '50%', background: '#fff', top: 3, left: form.active ? 27 : 3, transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Cancel</button>
        <button type="submit" disabled={saving} style={{ flex: 2, padding: '12px', borderRadius: 12, background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', border: 'none', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700, fontFamily: "'Outfit', sans-serif", opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving...' : (form.id ? 'Update Service' : 'Create Service')}
        </button>
      </div>
    </form>
  );
}

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { setServices(store.getServices()); }, []);

  const handleSave = (svc) => {
    setServices(store.saveService(svc));
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setServices(store.deleteService(id));
    setDeleteId(null);
  };

  const toggleActive = (id) => {
    const svc = services.find(s => s.id === id);
    if (svc) setServices(store.saveService({ ...svc, active: !svc.active }));
  };

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E1B2E', margin: 0 }}>Services</h1>
          <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginTop: 6 }}>{services.length} services · {services.filter(s => s.active).length} active</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif", boxShadow: '0 4px 16px rgba(139,92,246,0.35)' }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Service
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {services.map((svc) => (
          <div key={svc.id} style={{
            background: '#fff',
            borderRadius: 18,
            border: svc.active ? '1.5px solid rgba(139,92,246,0.12)' : '1.5px solid rgba(0,0,0,0.06)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            opacity: svc.active ? 1 : 0.6,
            transition: 'all 0.2s',
          }}>
            {/* Icon */}
            <div style={{ width: 56, height: 56, borderRadius: 16, background: svc.active ? 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(168,85,247,0.06))' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>
              {svc.icon}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1E1B2E' }}>{svc.title}</div>
                {svc.price && <span style={{ fontSize: '0.75rem', padding: '2px 10px', borderRadius: 50, background: 'rgba(16,185,129,0.08)', color: '#059669', fontWeight: 600 }}>from {svc.price}</span>}
                {!svc.active && <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 50, background: 'rgba(0,0,0,0.06)', color: '#9CA3AF', fontWeight: 600 }}>INACTIVE</span>}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: 0, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{svc.description}</p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => toggleActive(svc.id)} title={svc.active ? 'Deactivate' : 'Activate'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: svc.active ? 'rgba(16,185,129,0.08)' : 'rgba(139,92,246,0.06)', border: `1.5px solid ${svc.active ? 'rgba(16,185,129,0.2)' : 'rgba(139,92,246,0.15)'}`, color: svc.active ? '#10B981' : '#7C3AED', cursor: 'pointer' }}>
                {svc.active
                  ? <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                }
              </button>
              <button onClick={() => { setEditing(svc); setModalOpen(true); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.2)', color: '#7C3AED', cursor: 'pointer' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button onClick={() => setDeleteId(svc.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: 'rgba(239,68,68,0.06)', border: '1.5px solid rgba(239,68,68,0.15)', color: '#EF4444', cursor: 'pointer' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
              </button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: 20, border: '1.5px dashed rgba(139,92,246,0.2)', color: '#9CA3AF' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✦</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>No services yet</div>
            <div style={{ fontSize: '0.85rem' }}>Add your first service to get started.</div>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }}>
        <ServiceForm initial={editing || EMPTY} onSave={handleSave} onClose={() => { setModalOpen(false); setEditing(null); }} />
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#EF4444' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E1B2E', marginBottom: 8 }}>Delete Service?</h3>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: 24 }}>This action cannot be undone.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Cancel</button>
            <button onClick={() => handleDelete(deleteId)} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'linear-gradient(135deg, #EF4444, #DC2626)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
