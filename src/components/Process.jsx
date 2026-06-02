import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01', title: 'Discovery & Strategy',
    desc: 'We deep-dive into your goals, target audience, and market landscape to map out a winning roadmap.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
  },
  {
    num: '02', title: 'Design & Wireframes',
    desc: 'Pixel-perfect wireframes and stunning visual designs that capture your brand\'s unique personality.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>,
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F7, #C084FC)',
  },
  {
    num: '03', title: 'Development',
    desc: 'Clean, modern code built for performance, scalability, and an exceptional user experience across all devices.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    color: '#C084FC',
    gradient: 'linear-gradient(135deg, #C084FC, #A855F7)',
  },
  {
    num: '04', title: 'Testing & QA',
    desc: 'Rigorous cross-device and browser testing ensures flawless performance and zero bugs before delivery.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
  },
  {
    num: '05', title: 'Launch',
    desc: 'Smooth deployment with zero-downtime migrations and post-launch monitoring for peak performance.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path d="M12 19V5M5 12l7-7 7 7"/><path d="M3 19h18"/></svg>,
    color: '#9333EA',
    gradient: 'linear-gradient(135deg, #9333EA, #A855F7)',
  },
  {
    num: '06', title: 'Ongoing Support',
    desc: 'Dedicated maintenance, security updates, and priority support to keep your digital presence running perfectly.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><circle cx="12" cy="12" r="3"/></svg>,
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F7, #C084FC)',
  },
];

export default function Process() {
  return (
    <section
      id="process"
      style={{
        padding: '100px 32px',
        background: '#F8F7FF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />

      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 280,
        background: 'radial-gradient(ellipse, rgba(168,85,247,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="label-tag" style={{ marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7', display: 'inline-block' }} />
            How We Work
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1E1B2E',
            margin: '0 0 14px',
            letterSpacing: '-0.02em',
          }}>
            Our <span className="gradient-text">Workflow</span>
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.05rem',
            color: '#6B7280',
            maxWidth: 540,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            A refined, battle-tested process that delivers every project on time, on budget, and beyond expectations.
          </p>
        </motion.div>

        {/* Horizontal step connector (desktop) */}
        <div style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {/* Row connector lines */}
          <div style={{
            position: 'absolute',
            top: 34, left: '17%', right: '17%',
            height: 2,
            background: 'linear-gradient(90deg, rgba(139,92,246,0.2), rgba(168,85,247,0.4), rgba(139,92,246,0.2))',
            zIndex: 0,
            pointerEvents: 'none',
          }} />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              {/* Step number badge at top */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 12,
                paddingLeft: 4,
              }}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  style={{
                    width: 36, height: 36,
                    borderRadius: '50%',
                    background: step.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    color: '#fff',
                    boxShadow: `0 4px 16px ${step.color}40`,
                    flexShrink: 0,
                    cursor: 'default',
                  }}
                >
                  {step.num}
                </motion.div>
                <div style={{
                  flex: 1,
                  height: 1,
                  background: i < STEPS.length - 1 && (i + 1) % 3 !== 0
                    ? `linear-gradient(90deg, ${step.color}40, transparent)`
                    : 'transparent',
                }} />
              </div>

              {/* Card */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  border: '1.5px solid rgba(139,92,246,0.1)',
                  borderRadius: 20,
                  padding: '22px 22px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 16px rgba(139,92,246,0.06)',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${step.color}35`;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${step.color}18, 0 0 0 1px ${step.color}20`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.1)';
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(139,92,246,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Gradient top rim */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: 2,
                  background: step.gradient,
                  opacity: 0.6,
                  borderRadius: '20px 20px 0 0',
                }} />

                {/* Icon */}
                <div style={{
                  width: 42, height: 42,
                  borderRadius: 11,
                  background: `${step.color}12`,
                  border: `1px solid ${step.color}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step.color,
                }}>
                  {step.icon}
                </div>

                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  color: '#1E1B2E',
                  margin: 0,
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.84rem',
                  color: '#6B7280',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: 52,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.92rem',
            color: '#9CA3AF',
          }}>
            Ready to start your project?
          </p>
          <button
            className="btn-primary"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get a Free Quote
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
