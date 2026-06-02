import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
    setTimeout(() => setSent(false), 4000);
  };

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Email',
      value: 'hello@impactra.com',
      href: 'mailto:hello@impactra.com',
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.024.507 3.932 1.401 5.604L0 24l6.54-1.371C8.151 23.517 10.03 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.908 0-3.69-.5-5.224-1.378l-.374-.222-3.88.813.824-3.793-.24-.388C2.5 15.54 2 13.82 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" fill="#25D366"/>
        </svg>
      ),
      label: 'WhatsApp',
      value: '+91 98765 43210',
      href: 'https://wa.me/919345710960',
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Location',
      value: 'Mumbai, India',
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: '100px 32px',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="label-tag" style={{ marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7', display: 'inline-block', animation: 'pulse-glow 2s ease-in-out infinite' }} />
            Get In Touch
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1E1B2E',
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
          }}>
            Let's Build <span className="gradient-text">Something Great</span>
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.05rem',
            color: '#6B7280',
            maxWidth: 500,
            margin: '0 auto',
          }}>
            Have a project in mind? We'd love to hear about it and discuss how we can bring your vision to life.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: 32,
          alignItems: 'start',
        }}>
          {/* ── LEFT — Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {/* CTA card */}
            <div style={{
              background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
              borderRadius: 24,
              padding: '28px 24px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -20, right: -20,
                width: 120, height: 120,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
              }} />
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.2rem', marginBottom: 8, position: 'relative' }}>
                Ready to Start?
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6, position: 'relative' }}>
                Tell us about your project and get a free quote within 24 hours.
              </div>
              <div style={{
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '0.85rem',
                position: 'relative',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 8px rgba(74,222,128,0.8)', display: 'inline-block' }} />
                Available for projects
              </div>
            </div>

            {/* Contact items */}
            {contactInfo.map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1.5px solid rgba(139,92,246,0.1)',
                  borderRadius: 18,
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  cursor: item.href ? 'pointer' : 'default',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 2px 12px rgba(139,92,246,0.06)',
                  textDecoration: 'none',
                }}
                as={item.href ? 'a' : 'div'}
                onClick={() => item.href && window.open(item.href, '_blank')}
                onMouseEnter={e => {
                  if (item.href) {
                    e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(139,92,246,0.12)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.1)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(139,92,246,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: 40, height: 40,
                  borderRadius: 12,
                  background: 'rgba(139,92,246,0.08)',
                  border: '1px solid rgba(139,92,246,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7C3AED',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.72rem', color: '#9CA3AF', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item.label}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', color: '#1E1B2E', fontWeight: 600 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── RIGHT — Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1.5px solid rgba(139,92,246,0.12)',
              borderRadius: 28,
              padding: '40px 36px',
              boxShadow: '0 8px 40px rgba(139,92,246,0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Top line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 3,
                background: 'linear-gradient(90deg, #8B5CF6, #C084FC)',
                borderRadius: '28px 28px 0 0',
              }} />

              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '1.25rem',
                color: '#1E1B2E',
                marginBottom: 28,
              }}>
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input-premium"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="input-premium"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Service Needed
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="input-premium"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Select a service...</option>
                    <option>Website Development</option>
                    <option>Landing Page</option>
                    <option>E-Commerce</option>
                    <option>Digital Marketing</option>
                    <option>SEO Optimization</option>
                    <option>Branding</option>
                  </select>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={5}
                    className="input-premium"
                    style={{ resize: 'vertical', minHeight: 120 }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={sending || sent}
                >
                  {sent ? '✓ Message Sent!' : sending ? 'Sending...' : 'Send Message'}
                  {!sending && !sent && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div > div:last-child { grid-template-columns: 1fr !important; }
          #contact > div > div:last-child > div:last-child > div { padding: 28px 20px !important; }
        }
        @media (max-width: 600px) {
          #contact > div > div:last-child > div:last-child > div form > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
