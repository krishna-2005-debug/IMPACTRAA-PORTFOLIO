import React, { useState, useEffect, useRef } from 'react';
import { store } from '../store';

const CATEGORIES = ['Web App', 'E-Commerce', 'Mobile', 'Branding', 'UI/UX', 'SaaS', 'Other'];
const TECH_SUGGESTIONS = ['React', 'Next.js', 'Vue', 'Angular', 'Node.js', 'Django', 'Laravel', 'PostgreSQL', 'MongoDB', 'Firebase', 'AWS', 'Figma', 'React Native', 'Flutter', 'TypeScript'];

const EMPTY_PROJECT = {
  id: '',
  title: '',
  category: 'Web App',
  technologies: [],
  description: '',
  liveUrl: '',
  imageUrl: '',
  featured: false,
};

function Modal({ open, onClose, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 620, maxHeight: '90vh', overflowY: 'auto', background: '#fff', borderRadius: 24, boxShadow: '0 24px 80px rgba(0,0,0,0.2)', padding: '32px' }}>
        {children}
      </div>
    </div>
  );
}

function ProjectForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({ ...EMPTY_PROJECT, ...initial });
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);

  const addTech = (t) => {
    const tech = t.trim();
    if (tech && !form.technologies.includes(tech)) {
      setForm(f => ({ ...f, technologies: [...f.technologies, tech] }));
    }
    setTechInput('');
  };

  const removeTech = (t) => setForm(f => ({ ...f, technologies: f.technologies.filter(x => x !== t) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    onSave(form);
    setSaving(false);
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: '#FAFAFC',
    border: '1.5px solid rgba(139,92,246,0.15)',
    borderRadius: 10,
    color: '#1E1B2E',
    fontSize: '0.875rem',
    fontFamily: "'Outfit', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle = { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#6B7280', marginBottom: 7, letterSpacing: '0.05em' };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1E1B2E', margin: 0 }}>
          {form.id ? 'Edit Project' : 'New Project'}
        </h2>
        <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4 }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={labelStyle}>PROJECT TITLE *</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. NeoBank Dashboard" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          </div>
          <div>
            <label style={labelStyle}>CATEGORY</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>DESCRIPTION *</label>
          <textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief project description..." rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
        </div>

        <div>
          <label style={labelStyle}>LIVE DEMO URL</label>
          <input type="url" value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} placeholder="https://yourdemo.com" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
        </div>

        <div>
          <label style={labelStyle}>PROJECT IMAGE URL</label>
          <input type="url" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://image.url/project.jpg" style={inputStyle} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
          {form.imageUrl && <img src={form.imageUrl} alt="" style={{ marginTop: 8, width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} onError={e => e.target.style.display='none'} />}
        </div>

        <div>
          <label style={labelStyle}>TECHNOLOGIES</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            {form.technologies.map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 50, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: '#7C3AED', fontSize: '0.8rem', fontWeight: 600 }}>
                {t}
                <button type="button" onClick={() => removeTech(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A855F7', padding: 0, fontSize: '1rem', lineHeight: 1 }}>×</button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(techInput); }}} placeholder="Add technology..." style={{ ...inputStyle, flex: 1 }} onFocus={e => e.target.style.borderColor='rgba(139,92,246,0.5)'} onBlur={e => e.target.style.borderColor='rgba(139,92,246,0.15)'} />
            <button type="button" onClick={() => addTech(techInput)} style={{ padding: '0 18px', borderRadius: 10, background: 'rgba(139,92,246,0.08)', border: '1.5px solid rgba(139,92,246,0.2)', color: '#7C3AED', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', fontFamily: "'Outfit', sans-serif" }}>Add</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {TECH_SUGGESTIONS.filter(t => !form.technologies.includes(t)).slice(0, 8).map(t => (
              <button key={t} type="button" onClick={() => addTech(t)} style={{ padding: '3px 10px', borderRadius: 50, background: '#F3F4F6', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: '#6B7280', fontFamily: "'Outfit', sans-serif" }}>+ {t}</button>
            ))}
          </div>
        </div>

        {/* Featured toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'rgba(139,92,246,0.04)', borderRadius: 12, border: '1px solid rgba(139,92,246,0.1)' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E1B2E' }}>Featured Project</div>
            <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>Show this project prominently on the website</div>
          </div>
          <button
            type="button"
            onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
            style={{
              width: 52, height: 28,
              borderRadius: 14,
              background: form.featured ? 'linear-gradient(135deg, #8B5CF6, #A855F7)' : 'rgba(139,92,246,0.1)',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.25s',
            }}
          >
            <div style={{ position: 'absolute', width: 22, height: 22, borderRadius: '50%', background: '#fff', top: 3, left: form.featured ? 27 : 3, transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif" }}>Cancel</button>
        <button type="submit" disabled={saving} style={{ flex: 2, padding: '12px', borderRadius: 12, background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', border: 'none', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif", opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving...' : (form.id ? 'Update Project' : 'Create Project')}
        </button>
      </div>
    </form>
  );
}

export default function PortfolioManager() {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => { setProjects(store.getProjects()); }, []);

  const handleSave = (project) => {
    const updated = store.saveProject(project);
    setProjects(updated);
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    const updated = store.deleteProject(id);
    setProjects(updated);
    setDeleteId(null);
  };

  const filtered = projects.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cats = ['All', ...CATEGORIES];

  return (
    <div style={{ maxWidth: 1300 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E1B2E', margin: 0 }}>Portfolio</h1>
          <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginTop: 6 }}>{projects.length} projects · {projects.filter(p => p.featured).length} featured</p>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif", boxShadow: '0 4px 16px rgba(139,92,246,0.35)' }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Project
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: 200, maxWidth: 320 }}>
          <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1.5px solid rgba(139,92,246,0.15)', borderRadius: 10, fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif", color: '#1E1B2E', background: '#fff', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: '8px 16px', borderRadius: 50, border: '1.5px solid',
              borderColor: filter === c ? '#8B5CF6' : 'rgba(139,92,246,0.15)',
              background: filter === c ? 'linear-gradient(135deg, #8B5CF6, #A855F7)' : '#fff',
              color: filter === c ? '#fff' : '#6B7280',
              cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, fontFamily: "'Outfit', sans-serif",
              transition: 'all 0.2s',
            }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {filtered.map(project => (
          <div key={project.id} style={{
            background: '#fff', borderRadius: 20,
            border: '1px solid rgba(139,92,246,0.08)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(139,92,246,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'; }}
          >
            {/* Image */}
            <div style={{ height: 160, background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(168,85,247,0.05))', position: 'relative', overflow: 'hidden' }}>
              {project.imageUrl
                ? <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
                : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(139,92,246,0.3)' }}>
                    <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
              }
              {project.featured && (
                <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', borderRadius: 50, background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em' }}>★ FEATURED</div>
              )}
              <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', borderRadius: 50, background: 'rgba(255,255,255,0.9)', color: '#7C3AED', fontSize: '0.72rem', fontWeight: 600 }}>{project.category}</div>
            </div>

            {/* Content */}
            <div style={{ padding: '18px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1E1B2E', marginBottom: 6 }}>{project.title}</div>
              <p style={{ fontSize: '0.82rem', color: '#6B7280', lineHeight: 1.5, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>

              {/* Technologies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {project.technologies.slice(0, 4).map(t => (
                  <span key={t} style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(139,92,246,0.06)', color: '#7C3AED', fontSize: '0.72rem', fontWeight: 600 }}>{t}</span>
                ))}
                {project.technologies.length > 4 && <span style={{ padding: '2px 8px', borderRadius: 4, background: '#F3F4F6', color: '#9CA3AF', fontSize: '0.72rem' }}>+{project.technologies.length - 4}</span>}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8 }}>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 8, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', color: '#7C3AED', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none' }}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Live
                  </a>
                )}
                <button onClick={() => { setEditing(project); setModalOpen(true); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px 12px', borderRadius: 8, background: '#fff', border: '1.5px solid rgba(139,92,246,0.2)', color: '#7C3AED', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit
                </button>
                <button onClick={() => setDeleteId(project.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: 'rgba(239,68,68,0.06)', border: '1.5px solid rgba(239,68,68,0.15)', color: '#EF4444', cursor: 'pointer' }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#9CA3AF' }}>
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: '0 auto 16px', display: 'block' }}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>No projects found</div>
            <div style={{ fontSize: '0.85rem' }}>Try adjusting your filters or create a new project.</div>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }}>
        <ProjectForm
          initial={editing || EMPTY_PROJECT}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditing(null); }}
        />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#EF4444' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E1B2E', marginBottom: 8 }}>Delete Project?</h3>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: 24 }}>This action cannot be undone. The project will be permanently removed.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)', color: '#7C3AED', cursor: 'pointer', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Cancel</button>
            <button onClick={() => handleDelete(deleteId)} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'linear-gradient(135deg, #EF4444, #DC2626)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
