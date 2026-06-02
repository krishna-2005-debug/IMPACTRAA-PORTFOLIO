import React from 'react';
import { motion } from 'framer-motion';

/* All icons are clean SVGs — no emojis */
const ITEMS = [
  {
    label: 'React',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><circle cx="12" cy="12" r="2"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" opacity="0"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>,
  },
  {
    label: 'Next.js',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><path d="M12 2L2 19.5h20L12 2z"/></svg>,
  },
  {
    label: 'Node.js',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  },
  {
    label: 'Shopify',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  },
  {
    label: 'WordPress',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
  },
  {
    label: 'UI / UX Design',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  },
  {
    label: 'SEO Optimization',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  },
  {
    label: 'Branding',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  },
  {
    label: 'Landing Pages',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><path d="M12 19V5M5 12l7-7 7 7"/><path d="M3 19h18"/></svg>,
  },
  {
    label: 'E-Commerce',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
  },
  {
    label: 'Social Media',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  },
  {
    label: 'Email Marketing',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.8}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
];

// Duplicate for seamless loop
const LOOP = [...ITEMS, ...ITEMS];

function Chip({ label, icon }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '9px 20px',
      background: 'rgba(255,255,255,0.85)',
      border: '1.5px solid rgba(139,92,246,0.15)',
      borderRadius: 50,
      boxShadow: '0 2px 12px rgba(139,92,246,0.07)',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16 }}>
        {icon}
      </div>
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600,
        fontSize: '0.85rem',
        color: '#374151',
        letterSpacing: '0.01em',
      }}>
        {label}
      </span>
    </div>
  );
}

export default function Marquee() {
  return (
    <section style={{
      padding: '36px 0',
      background: '#F8F7FF',
      borderTop: '1px solid rgba(139,92,246,0.08)',
      borderBottom: '1px solid rgba(139,92,246,0.08)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
        background: 'linear-gradient(90deg, #F8F7FF, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
        background: 'linear-gradient(-90deg, #F8F7FF, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Scrolling track */}
      <motion.div
        style={{ display: 'flex', gap: 12, width: 'max-content' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {LOOP.map((item, i) => <Chip key={i} {...item} />)}
      </motion.div>
    </section>
  );
}
