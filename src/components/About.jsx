import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function StatCounter({ target, suffix = '', label, color }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(timer); }
          else setVal(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
        background: `linear-gradient(135deg, ${color}, ${color}CC)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1.1,
      }}>
        {val}{suffix}
      </div>
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.82rem',
        color: '#9CA3AF',
        fontWeight: 500,
        letterSpacing: '0.05em',
        marginTop: 4,
      }}>
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const features = [
    {
      icon: <svg width="15" height="15" fill="none" stroke="#8B5CF6" viewBox="0 0 24 24" strokeWidth={2}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
      text: 'Lightning-fast delivery',
    },
    {
      icon: <svg width="15" height="15" fill="none" stroke="#8B5CF6" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
      text: 'Premium quality code',
    },
    {
      icon: <svg width="15" height="15" fill="none" stroke="#8B5CF6" viewBox="0 0 24 24" strokeWidth={2}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
      text: 'Unique custom designs',
    },
    {
      icon: <svg width="15" height="15" fill="none" stroke="#8B5CF6" viewBox="0 0 24 24" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
      text: 'Secure & scalable',
    },
  ];

  return (
    <section
      id="about"
      style={{
        padding: '100px 32px',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(192,132,252,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}>
          {/* ── LEFT — Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Main card */}
            <div style={{
              background: 'linear-gradient(135deg, #F8F7FF, #F3F0FF)',
              border: '1.5px solid rgba(139,92,246,0.15)',
              borderRadius: 32,
              padding: 48,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 80px rgba(139,92,246,0.1)',
            }}>
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 3,
                background: 'linear-gradient(90deg, #8B5CF6, #C084FC)',
                borderRadius: '32px 32px 0 0',
              }} />

              {/* Orbital logo display */}
              <div style={{ position: 'relative', width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Orbit rings */}
                {[220, 160, 110].map((size, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    width: size, height: size,
                    borderRadius: '50%',
                    border: `1.5px ${i === 1 ? 'solid' : 'dashed'} rgba(139,92,246,${0.1 + i * 0.06})`,
                    animation: `${i % 2 === 0 ? 'spin-slow' : 'spin-reverse'} ${20 + i * 5}s linear infinite`,
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: -4, left: '50%',
                      width: 8, height: 8,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, #A855F7, #8B5CF6)`,
                      boxShadow: '0 0 10px rgba(168,85,247,0.8)',
                      transform: 'translateX(-50%)',
                    }} />
                  </div>
                ))}

                {/* Center logo */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    border: '1.5px solid rgba(139,92,246,0.2)',
                    borderRadius: 24,
                    padding: '18px 20px',
                    boxShadow: '0 8px 32px rgba(139,92,246,0.2)',
                  }}
                >
                  {/* Official IMPACTRA Logo PNG — exact brand asset */}
                  <img
                    src="/impactra-logo.png"
                    alt="IMPACTRA"
                    style={{
                      width: 100,
                      height: 'auto',
                      display: 'block',
                      objectFit: 'contain',
                    }}
                    draggable={false}
                  />

                </motion.div>
              </div>

              {/* Stats row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
                width: '100%',
              }}>
                {[
                  { target: 150, suffix: '+', label: 'Projects', color: '#8B5CF6' },
                  { target: 98, suffix: '%', label: 'Satisfaction', color: '#A855F7' },
                  { target: 3, suffix: '+', label: 'Years', color: '#C084FC' },
                ].map((stat) => (
                  <div key={stat.label} style={{
                    background: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(139,92,246,0.12)',
                    borderRadius: 16,
                    padding: '16px 8px',
                  }}>
                    <StatCounter {...stat} />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                position: 'absolute',
                top: -16, right: -16,
                background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                borderRadius: 18,
                padding: '12px 20px',
                color: 'white',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(139,92,246,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <svg width="13" height="13" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>
              Premium Quality
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="label-tag" style={{ marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7', display: 'inline-block' }} />
              About Us
            </div>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: '#1E1B2E',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              We Build Digital <span className="gradient-text">Excellence</span>
            </h2>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1rem',
              color: '#6B7280',
              lineHeight: 1.75,
              marginBottom: 16,
            }}>
              At <strong style={{ color: '#7C3AED' }}>IA Impactra</strong>, we're a passionate team of designers and developers obsessed with creating
              premium digital experiences that leave lasting impressions.
            </p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1rem',
              color: '#6B7280',
              lineHeight: 1.75,
              marginBottom: 32,
            }}>
              Every project we undertake is approached with meticulous attention to detail, modern aesthetics,
              and a relentless focus on performance and business outcomes.
            </p>

            {/* Feature chips */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 36 }}>
              {features.map((f) => (
                <div key={f.text} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  background: 'rgba(139,92,246,0.04)',
                  border: '1px solid rgba(139,92,246,0.12)',
                  borderRadius: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                    {f.icon}
                  </div>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#374151',
                  }}>
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="btn-primary"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Work With Us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
