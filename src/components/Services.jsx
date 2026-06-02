import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SERVICES = [
  {
    num: '01', color: '#8B5CF6',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    title: 'Website Development',
    desc: 'Hand-coded, lightning-fast websites built with modern tech stacks that convert visitors into customers.',
    tags: ['React', 'Next.js', 'Node.js'],
  },
  {
    num: '02', color: '#A855F7',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path d="M4 5h16M4 12h10M4 19h7"/><rect x="14" y="11" width="8" height="10" rx="1"/></svg>,
    title: 'Landing Pages',
    desc: 'High-conversion landing pages designed to capture leads, tell stories, and drive measurable results.',
    tags: ['Conversion', 'Copy', 'CRO'],
  },
  {
    num: '03', color: '#C084FC',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 01-8 0"/></svg>,
    title: 'E-Commerce',
    desc: 'Full-featured online stores with seamless checkout flows, inventory management and payment integration.',
    tags: ['Shopify', 'WooCommerce', 'Custom'],
  },
  {
    num: '04', color: '#7C3AED',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    title: 'Digital Marketing',
    desc: 'Data-driven campaigns across social media, email and paid ads that maximize ROI and grow your audience.',
    tags: ['Social Media', 'Email', 'PPC'],
  },
  {
    num: '05', color: '#9333EA',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>,
    title: 'SEO Optimization',
    desc: 'Technical SEO, content strategy and link building that push your website to the top of search results.',
    tags: ['On-Page', 'Technical', 'Content'],
  },
  {
    num: '06', color: '#A855F7',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    title: 'Branding',
    desc: 'Complete brand identity systems — logos, color palettes, typography and guidelines for premium presence.',
    tags: ['Logo', 'Identity', 'Guidelines'],
  },
];

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-1, 1], [6, -6]), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useTransform(rawX, [-1, 1], [-6, 6]), { stiffness: 150, damping: 20 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={e => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        rawX.set((e.clientX - rect.left) / rect.width * 2 - 1);
        rawY.set((e.clientY - rect.top) / rect.height * 2 - 1);
      }}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        perspective: 600,
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.95)',
          border: '1.5px solid rgba(139,92,246,0.1)',
          borderRadius: 24,
          padding: '28px 28px 24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          cursor: 'default',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 4px 24px rgba(139,92,246,0.07)',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${service.color}40`;
          e.currentTarget.style.boxShadow = `0 8px 40px ${service.color}20, 0 0 0 1px ${service.color}20`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(139,92,246,0.1)';
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(139,92,246,0.07)';
        }}
      >
        {/* Top gradient line on hover */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${service.color}, ${service.color}80)`,
          borderRadius: '24px 24px 0 0',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }} className="card-top-line" />

        {/* Icon */}
        <div style={{
          width: 50, height: 50,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${service.color}15, ${service.color}08)`,
          border: `1px solid ${service.color}25`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: service.color,
          flexShrink: 0,
        }}>
          {service.icon}
        </div>

        {/* Number */}
        <div style={{
          position: 'absolute',
          top: 20, right: 24,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: '0.75rem',
          color: `${service.color}60`,
          letterSpacing: '0.05em',
        }}>
          {service.num}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: '1.08rem',
          color: '#1E1B2E',
          margin: 0,
        }}>
          {service.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.88rem',
          color: '#6B7280',
          lineHeight: 1.65,
          margin: 0,
          flex: 1,
        }}>
          {service.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {service.tags.map((tag) => (
            <span key={tag} style={{
              padding: '3px 10px',
              borderRadius: 50,
              background: `${service.color}10`,
              color: service.color,
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 600,
              border: `1px solid ${service.color}25`,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: service.color,
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.82rem',
          fontWeight: 600,
          paddingTop: 4,
          cursor: 'pointer',
        }}>
          Learn more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      style={{
        padding: '100px 32px',
        background: '#F8F7FF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bg decoration */}
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="label-tag" style={{ marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7', display: 'inline-block' }} />
            What We Offer
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1E1B2E',
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
          }}>
            Premium <span className="gradient-text">Services</span>
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.05rem',
            color: '#6B7280',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            End-to-end digital solutions crafted with precision, creativity, and an obsession for excellence.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
