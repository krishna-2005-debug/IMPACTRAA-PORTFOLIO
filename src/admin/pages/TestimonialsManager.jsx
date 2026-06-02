import React, { useState, useEffect } from 'react';
import { store } from '../store';

const EMPTY = { id: '', name: '', role: '', text: '', rating: 5, imageUrl: '', approved: true };

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} type="button" onClick={() => onChange && onChange(i)} style={{ background: 'none', border: 'none', cursor: onChange ? 'pointer' : 'default', padding: 2, fontSize: '1.2rem', color: i <= value ? '#F59E0B' : '#E5E7EB' }}>★</button>
      ))}
    </div>
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
      <div style={{ position: 'relative', width: '100%', maxWidth: 540, background: '#fff', borderRadius: 24, boxShadow: '0 24px 80px rgba(0,0,0,0.2)', padding: 32 }}>
        {children}
      </div>
    </div>
  );
}

function TestimonialForm({ initial, onSave, onClose }) {
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
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1E1B2E', margin: 0 }}>{form.id ? 'Edit Testimonial' : 'New Testimonial'}</h2>
        <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={labelStyle}>CLIENT NAME *</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Arjun Mehta" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          </div>
          <div>
            <label style={labelStyle}>ROLE / COMPANY</label>
            <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="CEO, TechVentures" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>TESTIMONIAL *</label>
          <textarea required value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} placeholder="What did the client say?" rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
        </div>

        <div>
          <label style={labelStyle}>CLIENT PHOTO URL</label>
          <input type="url" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://image.url/client.jpg" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
        </div>

        <div>
          <label style={labelStyle}>RATING</label>
          <StarRating value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'rgba(139,92,246,0.04)', borderRadius: 12, border: '1px solid rgba(139,92,246,0.1)' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E1B2E' }}>Approved</div>
            <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>Show this testimonial on the website</div>
          </div>
          <button type="button" onClick={() => setForm(f => ({ ...f, approved: !f.approved }))} style={{ width: 52, height: 28, borderRadius: 14, background: form.approved ? 'linear-gradient(135deg, #8B5CF6, #A855F7)' : 'rgba(139,92,246,0.1)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.25s' }}>
            <div style={{ position: 'absolute', width: 22, height: 22, borderRadius: '50%', background: '#fff', top: 3, left: form.approved ? 27 : 3, transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Cancel</button>
        <button type="submit" disabled={saving} style={{ flex: 2, padding: '12px', borderRadius: 12, background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', border: 'none', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700, fontFamily: "'Outfit', sans-serif", opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving...' : (form.id ? 'Update' : 'Create Testimonial')}
        </button>
      </div>
    </form>
  );
}

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { setTestimonials(store.getTestimonials()); }, []);

  const handleSave = (item) => {
    setTestimonials(store.saveTestimonial(item));
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E1B2E', margin: 0 }}>Testimonials</h1>
          <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginTop: 6 }}>{testimonials.length} total · {testimonials.filter(t => t.approved).length} approved</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif", boxShadow: '0 4px 16px rgba(139,92,246,0.35)' }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Testimonial
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
        {testimonials.map(t => (
          <div key={t.id} style={{
            background: '#fff', borderRadius: 20,
            border: t.approved ? '1.5px solid rgba(139,92,246,0.1)' : '1.5px solid rgba(0,0,0,0.06)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            padding: '22px',
            opacity: t.approved ? 1 : 0.65,
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'flex', flexDirection: 'column',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(139,92,246,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
          >
            {/* Quote mark */}
            <div style={{ fontSize: '2.5rem', color: 'rgba(139,92,246,0.15)', lineHeight: 1, marginBottom: 8, fontFamily: 'Georgia, serif' }}>"</div>

            <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.7, flex: 1, margin: '0 0 16px' }}>{t.text}</p>

            <StarRating value={t.rating} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(139,92,246,0.06)' }}>
              {t.imageUrl
                ? <img src={t.imageUrl} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                : null
              }
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', display: t.imageUrl ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1rem', fontWeight: 700, flexShrink: 0 }}>
                {t.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B2E' }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{t.role}</div>
              </div>
              {!t.approved && <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 50, background: 'rgba(0,0,0,0.06)', color: '#9CA3AF', fontWeight: 600 }}>HIDDEN</span>}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button onClick={() => { setEditing(t); setModalOpen(true); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px', borderRadius: 8, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit
              </button>
              <button onClick={() => setDeleteId(t.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: 'rgba(239,68,68,0.06)', border: '1.5px solid rgba(239,68,68,0.15)', color: '#EF4444', cursor: 'pointer' }}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }}>
        <TestimonialForm initial={editing || EMPTY} onSave={handleSave} onClose={() => { setModalOpen(false); setEditing(null); }} />
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#EF4444' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E1B2E', marginBottom: 8 }}>Delete Testimonial?</h3>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: 24 }}>This action cannot be undone.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Cancel</button>
            <button onClick={() => { setTestimonials(store.deleteTestimonial(deleteId)); setDeleteId(null); }} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'linear-gradient(135deg, #EF4444, #DC2626)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
