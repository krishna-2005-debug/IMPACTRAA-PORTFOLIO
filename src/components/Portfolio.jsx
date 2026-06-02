import React from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
  {
    title: 'Aura FinTech Platform',
    category: 'Web Development · UI/UX',
    desc: 'A futuristic wealth management platform with real-time dashboards, investment analytics and seamless UX.',
    color: '#8B5CF6',
    tags: ['React', 'Node.js', 'FinTech'],
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
    badgeIcon: (
      <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
        <path d="M3 3v18h18"/><path d="M18 17V9M12 17V5M6 17v-3"/>
      </svg>
    ),
  },
  {
    title: 'Luxe Fashion Store',
    category: 'E-Commerce · Branding',
    desc: 'Premium fashion e-commerce with curated collections, smart filtering, and a conversion-optimized checkout.',
    color: '#A855F7',
    tags: ['Shopify', 'Branding', 'SEO'],
    gradient: 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)',
    badgeIcon: (
      <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    title: 'NovaTech SaaS Landing',
    category: 'Landing Page · CRO',
    desc: 'High-conversion SaaS landing page driving a 320% increase in trial signups with precision copywriting.',
    color: '#7C3AED',
    tags: ['Conversion', 'Copy', 'Analytics'],
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
    badgeIcon: (
      <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    ),
  },
  {
    title: 'HealthFirst Clinic',
    category: 'Website · SEO',
    desc: 'Medical clinic website with online booking, doctor profiles, blog, and local SEO that ranks #1.',
    color: '#9333EA',
    tags: ['WordPress', 'SEO', 'UX'],
    gradient: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
    badgeIcon: (
      <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: 'Zen Food Delivery App',
    category: 'Landing Page · Branding',
    desc: 'Appetizing food delivery landing page with animated menu showcases and app-store conversion design.',
    color: '#8B5CF6',
    tags: ['Landing Page', 'Animation', 'Mobile'],
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    badgeIcon: (
      <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    title: 'RealEstate Pro',
    category: 'Web Development · SEO',
    desc: 'Full-stack real estate platform with property listings, virtual tours, mortgage calculator and lead gen.',
    color: '#C084FC',
    tags: ['Next.js', 'Maps API', 'SEO'],
    gradient: 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)',
    badgeIcon: (
      <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/>
      </svg>
    ),
  },
];

function MockScreen({ gradient, badgeIcon }) {
  return (
    <div style={{
      height: 190,
      background: gradient,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      {/* Floating circles */}
      <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', bottom: -20, left: -20, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

      {/* Browser mock */}
      <div style={{
        width: '76%',
        background: 'rgba(255,255,255,0.14)',
        backdropFilter: 'blur(8px)',
        borderRadius: 10,
        padding: '9px 11px 11px',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        position: 'relative',
      }}>
        {/* Chrome bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
          {['#FF5F5D', '#FFBE2E', '#28CA42'].map(c => (
            <div key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
          ))}
          <div style={{ flex: 1, height: 7, borderRadius: 4, background: 'rgba(255,255,255,0.25)', marginLeft: 4 }} />
        </div>
        {/* Content skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ height: 7, background: 'rgba(255,255,255,0.55)', borderRadius: 3, width: '65%' }} />
          <div style={{ height: 7, background: 'rgba(255,255,255,0.35)', borderRadius: 3, width: '88%' }} />
          <div style={{ height: 7, background: 'rgba(255,255,255,0.25)', borderRadius: 3, width: '50%' }} />
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            <div style={{ height: 14, width: 40, background: 'rgba(255,255,255,0.4)', borderRadius: 4 }} />
            <div style={{ height: 14, width: 30, background: 'rgba(255,255,255,0.2)', borderRadius: 4 }} />
          </div>
        </div>
      </div>

      {/* SVG badge (top-right) */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(6px)',
        borderRadius: 10,
        padding: '7px',
        border: '1px solid rgba(255,255,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {badgeIcon}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] } }}
      style={{ cursor: 'pointer' }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1.5px solid rgba(139,92,246,0.1)',
          borderRadius: 22,
          overflow: 'hidden',
          boxShadow: '0 2px 20px rgba(139,92,246,0.06)',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = `0 16px 50px ${project.color}22, 0 0 0 1.5px ${project.color}35`;
          e.currentTarget.style.borderColor = `${project.color}35`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 2px 20px rgba(139,92,246,0.06)';
          e.currentTarget.style.borderColor = 'rgba(139,92,246,0.1)';
        }}
      >
        <MockScreen gradient={project.gradient} badgeIcon={project.badgeIcon} />

        <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.07em',
            color: project.color,
            textTransform: 'uppercase',
          }}>
            {project.category}
          </span>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: '1.02rem',
            color: '#1E1B2E',
            margin: 0,
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.84rem',
            color: '#6B7280',
            lineHeight: 1.6,
            margin: 0,
            flex: 1,
          }}>
            {project.desc}
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingTop: 4 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: '3px 9px',
                borderRadius: 50,
                background: `${project.color}0F`,
                color: project.color,
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 600,
                border: `1px solid ${project.color}20`,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      style={{
        padding: '100px 32px',
        background: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', top: '10%', right: 0,
        width: 360, height: 360,
        background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: 0,
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(192,132,252,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="label-tag" style={{ marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7', display: 'inline-block' }} />
            Our Work
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1E1B2E',
            margin: '0 0 14px',
            letterSpacing: '-0.02em',
          }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.05rem',
            color: '#6B7280',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            A curated selection of our finest work — each project crafted with purpose, precision and passion.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 22,
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: 52 }}
        >
          <button
            className="btn-ghost"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
