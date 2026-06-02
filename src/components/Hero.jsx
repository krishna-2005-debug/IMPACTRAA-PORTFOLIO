import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ── 3D floating logo on right side ── */
function FloatingLogo() {
  const containerRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-1, 1], [12, -12]), { stiffness: 120, damping: 18 });
  const rotY = useSpring(useTransform(rawX, [-1, 1], [-12, 12]), { stiffness: 120, damping: 18 });

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width * 2 - 1);
    rawY.set((e.clientY - rect.top) / rect.height * 2 - 1);
  };

  const particles = [
    { cx: '15%', cy: '20%', r: 4, color: '#8B5CF6', delay: 0 },
    { cx: '85%', cy: '15%', r: 3, color: '#C084FC', delay: 0.8 },
    { cx: '10%', cy: '75%', r: 5, color: '#A855F7', delay: 1.4 },
    { cx: '90%', cy: '70%', r: 3, color: '#8B5CF6', delay: 0.5 },
    { cx: '50%', cy: '8%', r: 2.5, color: '#C084FC', delay: 1.1 },
    { cx: '20%', cy: '50%', r: 2, color: '#A855F7', delay: 0.3 },
    { cx: '80%', cy: '45%', r: 3.5, color: '#8B5CF6', delay: 1.7 },
    { cx: '60%', cy: '88%', r: 2, color: '#C084FC', delay: 0.9 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        perspective: '800px',
      }}
    >
      {/* Ambient purple blob */}
      <div style={{
        position: 'absolute',
        width: 320, height: 320,
        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite',
      }} />

      {/* Secondary blob */}
      <div style={{
        position: 'absolute',
        width: 200, height: 200,
        top: '15%', right: '10%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 8s ease-in-out infinite reverse',
      }} />

      {/* Floating sparkle particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: p.cx,
            top: p.cy,
            width: p.r * 2,
            height: p.r * 2,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 ${p.r * 4}px ${p.color}`,
            opacity: 0.6,
          }}
          animate={{ y: [-8, 8, -8], opacity: [0.4, 0.9, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Orbit rings */}
      {[
        { size: 320, duration: 24, color: 'rgba(139,92,246,0.12)', dashes: '4 8', reverse: false },
        { size: 240, duration: 18, color: 'rgba(168,85,247,0.18)', dashes: '6 10', reverse: true },
        { size: 160, duration: 12, color: 'rgba(192,132,252,0.2)', dashes: '3 6', reverse: false },
      ].map((ring, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: ring.size,
            height: ring.size,
            borderRadius: '50%',
            border: `1.5px dashed ${ring.color}`,
            animation: `${ring.reverse ? 'spin-reverse' : 'spin-slow'} ${ring.duration}s linear infinite`,
          }}
        >
          {/* Glowing dot on ring */}
          <div style={{
            position: 'absolute',
            top: -5, left: '50%',
            width: 8, height: 8,
            borderRadius: '50%',
            background: `radial-gradient(circle, #A855F7, #8B5CF6)`,
            boxShadow: '0 0 12px rgba(168,85,247,0.8)',
            transform: 'translateX(-50%)',
          }} />
        </div>
      ))}

      {/* 3D Tilting Logo Card */}
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 260,
            height: 260,
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(24px)',
            border: '1.5px solid rgba(139,92,246,0.2)',
            borderRadius: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            boxShadow: '0 20px 80px rgba(139,92,246,0.2), 0 0 0 1px rgba(255,255,255,0.8) inset, 0 4px 0 rgba(139,92,246,0.1) inset',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top rim highlight */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.8), transparent)',
          }} />

          {/* Corner accents */}
          {[[0, 0, '0 0 12px 0'], [0, 'auto', '0 12px 0 0'], ['auto', 0, '0 0 0 12px'], ['auto', 'auto', '0 0 12px 0']].map(([t, r, br], i) => (
            <div key={i} style={{
              position: 'absolute',
              top: t, right: r, bottom: i > 1 ? 0 : undefined, left: i === 2 ? 0 : i === 3 ? 'auto' : undefined,
              width: 20, height: 20,
              border: `2px solid rgba(168,85,247,0.4)`,
              borderRadius: i === 0 ? '12px 0 0 0' : i === 1 ? '0 12px 0 0' : i === 2 ? '0 0 0 12px' : '0 0 12px 0',
              borderRight: i === 0 ? 'none' : i === 2 ? 'none' : undefined,
              borderBottom: i === 0 ? 'none' : i === 1 ? 'none' : undefined,
              borderLeft: i === 1 ? 'none' : i === 3 ? 'none' : undefined,
              borderTop: i === 2 ? 'none' : i === 3 ? 'none' : undefined,
            }} />
          ))}

          {/* Official IMPACTRA Logo PNG — exact brand asset */}
          <img
            src="/impactra-logo.png"
            alt="IMPACTRA"
            style={{
              width: 200,
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
            draggable={false}
          />


          {/* Animated purple dots row */}
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 0.2, 0.4].map((delay, i) => (
              <motion.div
                key={i}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7' }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, delay }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom ground reflection */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        width: 180,
        height: 20,
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.25) 0%, transparent 70%)',
        filter: 'blur(8px)',
      }} />
    </div>
  );
}

/* ── Animated heading with gradient highlight ── */
function AnimatedHeading() {
  const words = ['Make', 'Your', 'Brand'];
  return (
    <motion.h1
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: '#1E1B2E',
        margin: 0,
      }}
    >
      {['We'].map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {w}
        </motion.span>
      ))}
      <br />
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (i + 1) * 0.1 + 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {i === 2 ? (
            <span className="gradient-text">{w}</span>
          ) : w}
        </motion.span>
      ))}
      <br />
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="gradient-text"
        style={{ display: 'inline-block' }}
      >
        Shine.
      </motion.span>
    </motion.h1>
  );
}

export default function Hero() {
  const stats = [
    { value: '150+', label: 'Projects' },
    { value: '98%', label: 'Satisfaction' },
    { value: '5★', label: 'Rating' },
  ];

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #FFFFFF 0%, #F8F7FF 40%, #F3F0FF 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background decorations */}
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      {/* Large ambient blobs */}
      <div style={{
        position: 'absolute',
        top: '-10%', right: '-5%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%', left: '-8%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Curved stroke decoration */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path d="M0 300 Q360 100 720 280 Q1080 460 1440 200" stroke="url(#heroGrad)" strokeWidth="2" fill="none" />
        <path d="M0 600 Q400 400 800 580 Q1100 720 1440 500" stroke="url(#heroGrad2)" strokeWidth="1.5" fill="none" />
        <defs>
          <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '120px 32px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
        alignItems: 'center',
        width: '100%',
      }}>
        {/* ── LEFT — text ── */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ marginBottom: 28 }}
          >
            <span className="label-tag" style={{ whiteSpace: 'nowrap' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7', display: 'inline-block', flexShrink: 0, animation: 'pulse-glow 2s ease-in-out infinite' }} />
              Premium Digital Agency
            </span>
          </motion.div>

          {/* Headline */}
          <AnimatedHeading />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: '#6B7280',
              lineHeight: 1.7,
              marginTop: 24,
              marginBottom: 36,
              maxWidth: 480,
            }}
          >
            We craft <strong style={{ color: '#7C3AED' }}>world-class digital experiences</strong> — from stunning websites
            to powerful brands that set you apart from the crowd.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <button
              className="btn-primary"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              className="btn-ghost"
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Work
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{
              display: 'flex',
              gap: 20,
              marginTop: 48,
              paddingTop: 32,
              borderTop: '1px solid rgba(139,92,246,0.1)',
              flexWrap: 'wrap',
            }}
          >
            {[
              {
                value: '150+', label: 'Projects Done',
                icon: <svg width="14" height="14" fill="none" stroke="#8B5CF6" viewBox="0 0 24 24" strokeWidth={2.2}><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
              },
              {
                value: '98%', label: 'Satisfaction',
                icon: <svg width="14" height="14" fill="none" stroke="#8B5CF6" viewBox="0 0 24 24" strokeWidth={2.2}><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
              },
              {
                value: '5.0', label: 'Google Rating',
                icon: <svg width="14" height="14" fill="none" stroke="#8B5CF6" viewBox="0 0 24 24" strokeWidth={2.2}><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
              },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                background: 'rgba(139,92,246,0.04)',
                border: '1px solid rgba(139,92,246,0.1)',
                borderRadius: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18 }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1.1,
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.72rem',
                    color: '#9CA3AF',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                  }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — 3D Logo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: 520, position: 'relative' }}
        >
          <FloatingLogo />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', color: '#9CA3AF', letterSpacing: '0.1em' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: 24, height: 40,
            border: '1.5px solid rgba(139,92,246,0.3)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 4,
          }}
        >
          <div style={{ width: 4, height: 8, borderRadius: 2, background: '#A855F7' }} />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          #home > div > div {
            grid-template-columns: 1fr !important;
          }
          #home > div > div > div:last-child {
            height: 380px !important;
          }
        }
      `}</style>
    </section>
  );
}
