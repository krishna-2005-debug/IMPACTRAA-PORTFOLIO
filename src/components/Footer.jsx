import React from 'react';
import { motion } from 'framer-motion';
import ImpactraLogo from './ImpactraLogo';

const LINKS = {
  Services: ['Website Development', 'Landing Pages', 'E-Commerce', 'Digital Marketing', 'SEO Optimization', 'Branding'],
  Company:  ['About Us', 'Our Work', 'Pricing', 'Process', 'Contact'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    icon: <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    label: 'X (Twitter)',
    href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 5.905zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919345710960',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#FAFAFC',
        borderTop: '1px solid rgba(139,92,246,0.1)',
        padding: '72px 32px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 200,
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Top section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
          marginBottom: 56,
        }}>
          {/* Brand column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/impactra-logo.png"
                alt="IMPACTRA"
                style={{ height: 90, width: 'auto', display: 'block', objectFit: 'contain' }}
                draggable={false}
              />

              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.9rem',
                color: '#6B7280',
                lineHeight: 1.7,
                marginTop: 18,
                marginBottom: 24,
                maxWidth: 280,
              }}>
                Crafting world-class digital experiences for ambitious brands. Premium websites, landing pages, and branding that drive real results.
              </p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: 10 }}>
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: 38, height: 38,
                      borderRadius: 10,
                      background: 'rgba(139,92,246,0.06)',
                      border: '1px solid rgba(139,92,246,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#7C3AED',
                      transition: 'all 0.25s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(139,92,246,0.12)';
                      e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(139,92,246,0.2)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(139,92,246,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(139,92,246,0.15)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, links], colIdx) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (colIdx + 1) * 0.1, duration: 0.5 }}
            >
              <h4 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#1E1B2E',
                marginBottom: 18,
              }}>
                {heading}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.875rem',
                        color: '#6B7280',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#7C3AED'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#6B7280'; }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-gradient" style={{ marginBottom: 28 }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.82rem',
            color: '#9CA3AF',
          }}>
            © 2025 IA Impactra. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.78rem',
              color: '#9CA3AF',
            }}>
              Made with
            </div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#A855F7" style={{ flexShrink: 0 }}>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.78rem',
              color: '#9CA3AF',
            }}>
              by IA Impactra Team
            </div>
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            borderRadius: 50,
            background: 'rgba(139,92,246,0.08)',
            border: '1px solid rgba(139,92,246,0.15)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 6px rgba(74,222,128,0.8)', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: '#7C3AED' }}>
              Open for Projects
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
