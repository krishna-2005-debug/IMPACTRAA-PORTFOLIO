import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImpactraLogo from './ImpactraLogo';

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'Services',   href: '#services' },
  { label: 'Portfolio',  href: '#portfolio' },
  { label: 'About',      href: '#about' },
  { label: 'Pricing',    href: '#pricing' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]       = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: update active link based on section in view
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 24px',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Top accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          style={{
            height: 2,
            background: 'linear-gradient(90deg, transparent, #A855F7, #8B5CF6, transparent)',
            transformOrigin: 'left',
          }}
        />

        <nav
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: scrolled ? '12px 32px' : '20px 32px',
            background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 18,
            marginTop: 8,
            border: `1px solid ${scrolled ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.08)'}`,
            boxShadow: scrolled ? '0 8px 40px rgba(139,92,246,0.12)' : '0 2px 20px rgba(139,92,246,0.06)',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => handleNav('#home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/impactra-logo.png"
              alt="IMPACTRA"
              style={{ height: 52, width: 'auto', display: 'block', objectFit: 'contain' }}
              draggable={false}
            />
          </button>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 10,
                  background: active === link.href ? 'rgba(139,92,246,0.1)' : 'transparent',
                  color: active === link.href ? '#7C3AED' : '#4B5563',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: active === link.href ? 600 : 500,
                  fontSize: '0.9rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (active !== link.href) {
                    e.target.style.background = 'rgba(139,92,246,0.06)';
                    e.target.style.color = '#7C3AED';
                  }
                }}
                onMouseLeave={e => {
                  if (active !== link.href) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#4B5563';
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => handleNav('#contact')}
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '0.88rem', borderRadius: 12 }}
            >
              Get Started
            </button>
            {/* Hamburger */}
            <button
              id="hamburger-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: 10,
                padding: '8px 10px',
                cursor: 'pointer',
                color: '#7C3AED',
              }}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{
                maxWidth: 1200,
                margin: '8px auto 0',
                background: 'rgba(255,255,255,0.96)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(139,92,246,0.15)',
                borderRadius: 18,
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    background: active === link.href ? 'rgba(139,92,246,0.1)' : 'transparent',
                    color: active === link.href ? '#7C3AED' : '#4B5563',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.label}
                </button>
              ))}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(139,92,246,0.1)' }}>
                <button
                  onClick={() => handleNav('#contact')}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile CSS hack */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          #hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
