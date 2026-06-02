import React from 'react';
import { motion } from 'framer-motion';

export default function CTABanner() {
  return (
    <section style={{ padding: '0 32px 100px', background: '#F3F0FF', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #7C3AED 100%)',
            borderRadius: 28,
            padding: 'clamp(40px, 6vw, 64px) clamp(32px, 6vw, 72px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 80px rgba(139,92,246,0.3), 0 4px 24px rgba(139,92,246,0.2)',
          }}
        >
          {/* Background decorations */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 240, height: 240,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -40, left: '40%',
            width: 160, height: 160,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }} />

          {/* Grid lines overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }} />

          {/* Left text */}
          <div style={{ position: 'relative', maxWidth: 520 }}>
            {/* Pill badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 14px',
              borderRadius: 50,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              marginBottom: 16,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 8px rgba(74,222,128,0.8)', display: 'inline-block' }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.08em' }}>
                NOW ACCEPTING PROJECTS
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              color: '#FFFFFF',
              lineHeight: 1.2,
              margin: '0 0 14px',
              letterSpacing: '-0.02em',
            }}>
              Ready to Build Something <br />
              <span style={{ color: '#E9D5FF' }}>Extraordinary?</span>
            </h2>

            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.65,
              margin: 0,
            }}>
              Let's turn your vision into reality. Get a free consultation and custom quote within 24 hours.
            </p>
          </div>

          {/* Right CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, position: 'relative' }}>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 32px',
                borderRadius: 14,
                background: '#FFFFFF',
                color: '#7C3AED',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
            >
              Start Your Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <a
              href="https://wa.me/919345710960?text=Hi%20Impactra%2C%20I%20want%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.12)',
                color: '#FFFFFF',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '0.88rem',
                border: '1.5px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
                justifyContent: 'center',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
