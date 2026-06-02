import React, { useState, useEffect } from 'react';
import { store } from '../store';

const EMPTY = { id: '', title: '', slug: '', content: '', tags: [], status: 'draft', seoTitle: '', seoDescription: '' };

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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
      <div style={{ position: 'relative', width: '100%', maxWidth: 680, background: '#fff', borderRadius: 24, boxShadow: '0 24px 80px rgba(0,0,0,0.2)', padding: 32, maxHeight: '90vh', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

function BlogForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  const inputStyle = { width: '100%', padding: '11px 14px', background: '#FAFAFC', border: '1.5px solid rgba(139,92,246,0.15)', borderRadius: 10, color: '#1E1B2E', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif", outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#6B7280', marginBottom: 7, letterSpacing: '0.05em' };

  const handleTitleChange = (title) => {
    setForm(f => ({ ...f, title, slug: f.id ? f.slug : slugify(title) }));
  };

  const addTag = (t) => {
    const tag = t.trim();
    if (tag && !form.tags.includes(tag)) setForm(f => ({ ...f, tags: [...f.tags, tag] }));
    setTagInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    onSave(form);
    setSaving(false);
  };

  const TABS = [
    { key: 'content', label: 'Content' },
    { key: 'seo', label: 'SEO' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1E1B2E', margin: 0 }}>{form.id ? 'Edit Post' : 'New Blog Post'}</h2>
        <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, padding: '4px', background: 'rgba(139,92,246,0.06)', borderRadius: 10, width: 'fit-content' }}>
        {TABS.map(tab => (
          <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} style={{ padding: '7px 18px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, fontFamily: "'Outfit', sans-serif", background: activeTab === tab.key ? '#fff' : 'transparent', color: activeTab === tab.key ? '#7C3AED' : '#9CA3AF', boxShadow: activeTab === tab.key ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'content' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={labelStyle}>TITLE *</label>
            <input required value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="10 UI Trends for 2025" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          </div>

          <div>
            <label style={labelStyle}>SLUG</label>
            <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="auto-generated-from-title" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          </div>

          <div>
            <label style={labelStyle}>CONTENT *</label>
            <textarea required value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Write your blog post content here..." rows={8} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          </div>

          <div>
            <label style={labelStyle}>TAGS</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              {form.tags.map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 50, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: '#7C3AED', fontSize: '0.8rem', fontWeight: 600 }}>
                  {t}
                  <button type="button" onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A855F7', padding: 0, fontSize: '1rem', lineHeight: 1 }}>×</button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput); }}} placeholder="Design, Development, SEO..." style={{ ...inputStyle, flex: 1 }} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
              <button type="button" onClick={() => addTag(tagInput)} style={{ padding: '0 18px', borderRadius: 10, background: 'rgba(139,92,246,0.08)', border: '1.5px solid rgba(139,92,246,0.2)', color: '#7C3AED', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', fontFamily: "'Outfit', sans-serif" }}>Add</button>
            </div>
          </div>

          <div>
            <label style={labelStyle}>STATUS</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['draft', 'published'].map(s => (
                <button key={s} type="button" onClick={() => setForm(f => ({ ...f, status: s }))} style={{
                  padding: '9px 20px', borderRadius: 50, border: '1.5px solid', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, fontFamily: "'Outfit', sans-serif",
                  borderColor: form.status === s ? (s === 'published' ? 'rgba(16,185,129,0.4)' : 'rgba(139,92,246,0.3)') : 'rgba(139,92,246,0.15)',
                  background: form.status === s ? (s === 'published' ? 'rgba(16,185,129,0.08)' : 'rgba(139,92,246,0.08)') : '#fff',
                  color: form.status === s ? (s === 'published' ? '#10B981' : '#7C3AED') : '#6B7280',
                }}>
                  {s === 'published' ? '● Published' : '○ Draft'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'seo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ padding: '14px', background: 'rgba(139,92,246,0.04)', borderRadius: 12, border: '1px solid rgba(139,92,246,0.1)', marginBottom: 4 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8B5CF6', marginBottom: 4 }}>SEO Preview</div>
            <div style={{ fontSize: '1rem', color: '#1A0DAB', fontWeight: 600, marginBottom: 3 }}>{form.seoTitle || form.title || 'Your Post Title'}</div>
            <div style={{ fontSize: '0.78rem', color: '#006621', marginBottom: 3 }}>impactra.in/blog/{form.slug || 'post-slug'}</div>
            <div style={{ fontSize: '0.82rem', color: '#545454', lineHeight: 1.5 }}>{form.seoDescription || 'Add a meta description to improve your search visibility...'}</div>
          </div>

          <div>
            <label style={labelStyle}>SEO TITLE</label>
            <input value={form.seoTitle} onChange={e => setForm(f => ({ ...f, seoTitle: e.target.value }))} placeholder="60 characters recommended" maxLength={60} style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
            <div style={{ fontSize: '0.72rem', color: form.seoTitle.length > 55 ? '#F59E0B' : '#9CA3AF', marginTop: 4 }}>{form.seoTitle.length}/60</div>
          </div>

          <div>
            <label style={labelStyle}>META DESCRIPTION</label>
            <textarea value={form.seoDescription} onChange={e => setForm(f => ({ ...f, seoDescription: e.target.value }))} placeholder="160 characters recommended" maxLength={160} rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
            <div style={{ fontSize: '0.72rem', color: form.seoDescription.length > 150 ? '#F59E0B' : '#9CA3AF', marginTop: 4 }}>{form.seoDescription.length}/160</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Cancel</button>
        <button type="submit" disabled={saving} style={{ flex: 2, padding: '12px', borderRadius: 12, background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', border: 'none', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700, fontFamily: "'Outfit', sans-serif", opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving...' : (form.id ? 'Update Post' : 'Create Post')}
        </button>
      </div>
    </form>
  );
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { setBlogs(store.getBlogs()); }, []);

  const handleSave = (blog) => {
    setBlogs(store.saveBlog(blog));
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E1B2E', margin: 0 }}>Blog Posts</h1>
          <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginTop: 6 }}>{blogs.length} posts · {blogs.filter(b => b.status === 'published').length} published</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif", boxShadow: '0 4px 16px rgba(139,92,246,0.35)' }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Post
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {blogs.map(blog => (
          <div key={blog.id} style={{
            background: '#fff', borderRadius: 18,
            border: '1.5px solid rgba(139,92,246,0.08)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            padding: '20px 24px',
            display: 'flex', alignItems: 'center', gap: 18,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(139,92,246,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
          >
            {/* Icon */}
            <div style={{ width: 50, height: 50, borderRadius: 14, background: 'rgba(139,92,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6', flexShrink: 0 }}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1E1B2E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{blog.title}</div>
                <span style={{
                  padding: '2px 10px', borderRadius: 50, fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
                  background: blog.status === 'published' ? 'rgba(16,185,129,0.08)' : 'rgba(139,92,246,0.08)',
                  color: blog.status === 'published' ? '#10B981' : '#8B5CF6',
                }}>
                  {blog.status === 'published' ? '● LIVE' : '○ DRAFT'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>/{blog.slug}</span>
                {blog.tags?.length > 0 && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    {blog.tags.slice(0, 3).map(t => <span key={t} style={{ fontSize: '0.72rem', padding: '1px 8px', borderRadius: 4, background: 'rgba(139,92,246,0.06)', color: '#7C3AED', fontWeight: 600 }}>{t}</span>)}
                  </div>
                )}
                <span style={{ fontSize: '0.75rem', color: '#D1D5DB' }}>|</span>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => { setEditing(blog); setModalOpen(true); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button onClick={() => setDeleteId(blog.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: 'rgba(239,68,68,0.06)', border: '1.5px solid rgba(239,68,68,0.15)', color: '#EF4444', cursor: 'pointer' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
              </button>
            </div>
          </div>
        ))}

        {blogs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: 20, border: '1.5px dashed rgba(139,92,246,0.2)', color: '#9CA3AF' }}>
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: '0 auto 16px', display: 'block', color: 'rgba(139,92,246,0.3)' }}><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>No blog posts yet</div>
            <div style={{ fontSize: '0.85rem' }}>Start writing your first post!</div>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }}>
        <BlogForm initial={editing || EMPTY} onSave={handleSave} onClose={() => { setModalOpen(false); setEditing(null); }} />
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#EF4444' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E1B2E', marginBottom: 8 }}>Delete Post?</h3>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: 24 }}>This action cannot be undone.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Cancel</button>
            <button onClick={() => { setBlogs(store.deleteBlog(deleteId)); setDeleteId(null); }} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'linear-gradient(135deg, #EF4444, #DC2626)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
