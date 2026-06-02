import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import FAQ from './components/FAQ';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminApp from './admin/AdminApp';
import './index.css';

/* ── Premium Loading Screen ── */
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onComplete, 300); return 100; }
        return p + 2;
      });
    }, 28);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F7FF 50%, #F3F0FF 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      {/* Ambient blob */}
      <div style={{
        position: 'absolute',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 4s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Logo + pulse ring */}
      <div style={{ position: 'relative', marginBottom: 48 }}>
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: -24,
            borderRadius: '50%',
            border: '2px solid rgba(139,92,246,0.4)',
          }}
        />
        {/* Logo */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src="/impactra-logo.png"
            alt="IMPACTRA"
            style={{ height: 140, width: 'auto', display: 'block', objectFit: 'contain' }}
            draggable={false}
          />
        </motion.div>
      </div>


      {/* Progress bar */}
      <div style={{
        width: 200,
        height: 3,
        background: 'rgba(139,92,246,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #8B5CF6, #C084FC)',
            borderRadius: 2,
            transition: 'width 0.03s linear',
          }}
        />
      </div>
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.75rem',
        color: '#9CA3AF',
        marginTop: 10,
        letterSpacing: '0.05em',
      }}>
        {progress}%
      </div>
    </motion.div>
  );
}

/* ── Mouse follow glow ── */
function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <motion.div
      animate={{ x: pos.x - 200, y: pos.y - 200 }}
      transition={{ type: 'spring', mass: 0.5, stiffness: 60, damping: 20 }}
      style={{
        position: 'fixed',
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: 'multiply',
      }}
    />
  );
}

/* ── Floating Action Buttons ── */
function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 28,
      right: 24,
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'center',
    }}>
      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="backtop"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            style={{
              width: 44, height: 44,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)',
              border: '1.5px solid rgba(139,92,246,0.2)',
              backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: '#7C3AED',
              boxShadow: '0 4px 20px rgba(139,92,246,0.15)',
              transition: 'all 0.25s ease',
            }}
            whileHover={{ scale: 1.1, boxShadow: '0 8px 28px rgba(139,92,246,0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp CTA */}
      <motion.a
        href="https://wa.me/919345710960?text=Hi%20Impactra%2C%20I%20want%20to%20discuss%20a%20project!"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 54, height: 54,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 24px rgba(37,211,102,0.4)',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            position: 'absolute', inset: -4,
            borderRadius: '50%',
            border: '2px solid rgba(37,211,102,0.5)',
          }}
        />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Routes>
      {/* Admin Panel — all /admin/* routes */}
      <Route path="/admin/*" element={<AdminApp />} />

      {/* Public Portfolio */}
      <Route path="*" element={
        <>
          <AnimatePresence>
            {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
          </AnimatePresence>

          {!loading && (
            <>
              <MouseGlow />
              <FloatingActions />
              <Navbar />
              <main>
                <Hero />
                <Marquee />
                <Services />
                <Portfolio />
                <About />
                <Process />
                <Testimonials />
                <CTABanner />
                <FAQ />
                <Pricing />
                <Contact />
              </main>
              <Footer />
            </>
          )}
        </>
      } />
    </Routes>
  );
}
