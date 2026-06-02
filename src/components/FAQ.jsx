import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'How long does it take to build a website?',
    a: 'Timeline depends on the complexity of the project. A standard landing page typically takes 5–7 days. A full business website takes 2–3 weeks, and a custom e-commerce platform can take 3–6 weeks. We always share a detailed timeline at the start of every project.',
  },
  {
    q: 'What is included in the ₹999 Starter plan?',
    a: 'The Starter plan includes a single, beautifully designed landing page, mobile responsiveness, basic SEO setup, contact form integration, fast hosting setup assistance, and 2 rounds of revisions. It\'s perfect for micro-sites, product launches, and event pages.',
  },
  {
    q: 'Do you offer revisions after delivery?',
    a: 'Yes! Every plan includes revision rounds — Starter gets 2, Professional gets 4, and Enterprise gets unlimited revisions. We work until you\'re 100% happy with the result. We also offer a 7-day post-launch support window free of charge.',
  },
  {
    q: 'What platforms and technologies do you work with?',
    a: 'We work with React, Next.js, Node.js, WordPress, Shopify, WooCommerce, Webflow, and custom HTML/CSS/JS stacks. We recommend the best stack based on your specific goals, budget, and scalability requirements.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely! Redesigns are one of our specialties. We start with a full audit of your current site, identify conversion bottlenecks and UX issues, then deliver a modern redesign while preserving your brand identity and SEO rankings.',
  },
  {
    q: 'Do you provide ongoing maintenance and hosting support?',
    a: 'Yes. We offer monthly maintenance retainers that cover performance monitoring, plugin/security updates, content changes, speed optimization, and priority support. Contact us to discuss a custom maintenance plan for your needs.',
  },
  {
    q: 'How do I get started?',
    a: 'Simply click "Get Started" or send us a WhatsApp message! We\'ll schedule a free 30-minute discovery call to understand your goals, answer your questions, and send you a no-obligation custom quote within 24 hours.',
  },
];

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        style={{
          background: isOpen ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.85)',
          border: `1.5px solid ${isOpen ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.08)'}`,
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: isOpen ? '0 8px 32px rgba(139,92,246,0.1)' : '0 1px 8px rgba(139,92,246,0.04)',
          transition: 'all 0.3s ease',
          marginBottom: 10,
        }}
      >
        {/* Question row */}
        <button
          onClick={onToggle}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '20px 24px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: '0.97rem',
            color: isOpen ? '#7C3AED' : '#1E1B2E',
            lineHeight: 1.4,
            transition: 'color 0.25s ease',
            flex: 1,
          }}>
            {item.q}
          </span>

          {/* Toggle icon */}
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 28, height: 28,
              borderRadius: 8,
              background: isOpen ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.06)',
              border: `1px solid ${isOpen ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.12)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8B5CF6',
              flexShrink: 0,
              transition: 'background 0.25s ease, border-color 0.25s ease',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                padding: '0 24px 20px',
                paddingLeft: 24,
              }}>
                {/* Answer gradient left border */}
                <div style={{ display: 'flex', gap: 14 }}>
                  <div style={{
                    width: 2, flexShrink: 0,
                    background: 'linear-gradient(180deg, #8B5CF6, #C084FC)',
                    borderRadius: 2,
                    opacity: 0.5,
                  }} />
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.9rem',
                    color: '#4B5563',
                    lineHeight: 1.75,
                    margin: 0,
                  }}>
                    {item.a}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      style={{
        padding: '100px 32px',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '5%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <div className="label-tag" style={{ marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7', display: 'inline-block' }} />
            FAQ
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1E1B2E',
            margin: '0 0 14px',
            letterSpacing: '-0.02em',
          }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1rem',
            color: '#6B7280',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Everything you need to know before getting started. Can't find an answer? Just ask us directly.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div>
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            marginTop: 40,
            padding: '28px 32px',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(192,132,252,0.04))',
            border: '1.5px solid rgba(139,92,246,0.12)',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: '#1E1B2E',
              marginBottom: 4,
            }}>
              Still have questions?
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.87rem',
              color: '#6B7280',
            }}>
              Our team is happy to help. Reach out anytime.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/919345710960"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 20px', borderRadius: 12,
                background: '#25D366', color: '#fff',
                fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.85rem',
                textDecoration: 'none', transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ghost"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              Send a Message
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
