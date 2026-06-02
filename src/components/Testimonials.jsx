import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "Impactra elevated our brand to a level we didn't think was possible. The attention to detail and premium aesthetic they brought is truly world-class.",
    name: 'Sarah Chen',
    role: 'CEO, Aura FinTech',
    initials: 'SC',
    color: '#8B5CF6',
    stars: 5,
  },
  {
    quote: "Our e-commerce conversion rate tripled after the redesign. The team understood our vision perfectly and delivered a stunning, functional store.",
    name: 'Marcus Williams',
    role: 'Founder, Luxe Fashion',
    initials: 'MW',
    color: '#A855F7',
    stars: 5,
  },
  {
    quote: "The landing page they created generated 320% more trial signups. Their design and copywriting combination is exceptional — truly game-changing.",
    name: 'Priya Sharma',
    role: 'CMO, NovaTech SaaS',
    initials: 'PS',
    color: '#C084FC',
    stars: 5,
  },
  {
    quote: "Professional, creative, and reliable. They delivered our complete digital identity on time and absolutely exceeded our expectations.",
    name: 'James O\'Brien',
    role: 'Director, HealthFirst Clinic',
    initials: 'JO',
    color: '#7C3AED',
    stars: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const prev = () => { setDir(-1); setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); };
  const next = () => { setDir(1); setCurrent(c => (c + 1) % TESTIMONIALS.length); };

  // Auto-advance every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setDir(1);
      setCurrent(c => (c + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section
      id="testimonials"
      style={{
        padding: '100px 32px',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(168,85,247,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="label-tag" style={{ marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7', display: 'inline-block' }} />
            Client Stories
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1E1B2E',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div style={{ position: 'relative', minHeight: 300 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'rgba(255,255,255,0.95)',
                border: `1.5px solid ${t.color}20`,
                borderRadius: 28,
                padding: '48px 48px 40px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 20px 60px ${t.color}12, 0 4px 24px rgba(139,92,246,0.06)`,
              }}
            >
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${t.color}, ${t.color}80, transparent)`,
                borderRadius: '28px 28px 0 0',
              }} />

              {/* Ambient glow corner */}
              <div style={{
                position: 'absolute', top: -40, right: -40,
                width: 200, height: 200,
                background: `radial-gradient(circle, ${t.color}15 0%, transparent 70%)`,
                filter: 'blur(30px)',
                pointerEvents: 'none',
              }} />

              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
                {Array(t.stars).fill(0).map((_, i) => (
                  <span key={i} style={{ fontSize: '1.1rem', filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.8))' }}>⭐</span>
                ))}
              </div>

              {/* SVG Quote icon */}
              <div style={{ marginBottom: 20 }}>
                <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 36V22.5C0 10.4 6.4 3.2 19.2 0L21.6 4.2C15.6 5.8 12 9.4 10.8 15H18V36H0ZM27.6 36V22.5C27.6 10.4 34 3.2 46.8 0L49.2 4.2C43.2 5.8 39.6 9.4 38.4 15H45.6V36H27.6Z"
                    fill={t.color} opacity="0.2"
                  />
                </svg>
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: '#374151',
                lineHeight: 1.75,
                fontStyle: 'italic',
                margin: '0 0 32px',
                position: 'relative',
              }}>
                {t.quote}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}AA)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '0.9rem',
                  boxShadow: `0 4px 16px ${t.color}40`,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: '#1E1B2E',
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.8rem',
                    color: t.color,
                    fontWeight: 500,
                  }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          marginTop: 32,
        }}>
          <button
            onClick={prev}
            style={{
              width: 44, height: 44,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: '1.5px solid rgba(139,92,246,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: '#7C3AED',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8 }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 50,
                  background: i === current ? TESTIMONIALS[i].color : 'rgba(139,92,246,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            style={{
              width: 44, height: 44,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: '1.5px solid rgba(139,92,246,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: '#7C3AED',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
