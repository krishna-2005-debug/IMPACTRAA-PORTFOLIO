import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PLANS = [
  {
    name: 'Starter',
    price: '₹999',
    period: 'per project',
    tagline: 'Perfect for landing pages & micro-sites',
    color: '#8B5CF6',
    features: [
      'Single landing page',
      'Mobile responsive design',
      'Basic SEO setup',
      'Contact form integration',
      '3 rounds of revisions',
      '14-day turnaround',
      '30-day support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹2,499',
    period: 'per project',
    tagline: 'Ideal for business websites & e-commerce',
    color: '#A855F7',
    features: [
      'Multi-page website (up to 8 pages)',
      'Custom UI/UX design',
      'Advanced SEO optimization',
      'E-commerce integration',
      'CMS integration',
      'Performance optimization',
      'Unlimited revisions',
      '21-day turnaround',
      '3-month support',
    ],
    cta: 'Start Project',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored pricing',
    tagline: 'For large-scale projects & ongoing work',
    color: '#C084FC',
    features: [
      'Unlimited pages & features',
      'Complete brand identity',
      'Full digital marketing',
      'Dedicated project manager',
      'Priority support (24/7)',
      'Monthly performance reports',
      'Ongoing maintenance',
      'Custom integrations',
    ],
    cta: 'Contact Us',
    popular: false,
  },
];

function CheckIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="11" fill={`${color}15`} stroke={`${color}30`} strokeWidth="1"/>
      <polyline points="7 12 10 15 17 9" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Pricing() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="pricing"
      style={{
        padding: '100px 32px',
        background: '#F3F0FF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="label-tag" style={{ marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7', display: 'inline-block' }} />
            Transparent Pricing
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1E1B2E',
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
          }}>
            Simple, <span className="gradient-text">Honest Pricing</span>
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.05rem',
            color: '#6B7280',
            maxWidth: 520,
            margin: '0 auto',
          }}>
            No hidden fees, no surprises. Choose the plan that fits your project and let's get started.
          </p>
        </motion.div>

        {/* Plans */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}>
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                marginTop: plan.popular ? 0 : undefined,
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                  color: 'white',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  letterSpacing: '0.06em',
                  padding: '5px 16px',
                  borderRadius: 50,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 16px rgba(139,92,246,0.4)',
                  zIndex: 2,
                }}>
                  ✦ MOST POPULAR
                </div>
              )}

              <div style={{
                background: 'rgba(255,255,255,0.95)',
                border: `2px solid ${plan.popular || hovered === i ? plan.color + '40' : 'rgba(139,92,246,0.1)'}`,
                borderRadius: 28,
                padding: '32px 28px 28px',
                transition: 'all 0.3s ease',
                boxShadow: plan.popular || hovered === i
                  ? `0 20px 60px ${plan.color}20, 0 4px 24px rgba(139,92,246,0.1)`
                  : '0 4px 24px rgba(139,92,246,0.07)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Top gradient line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${plan.color}, ${plan.color}80)`,
                  borderRadius: '28px 28px 0 0',
                }} />

                {/* Ambient glow */}
                {(plan.popular || hovered === i) && (
                  <div style={{
                    position: 'absolute', top: -30, right: -30,
                    width: 160, height: 160,
                    background: `radial-gradient(circle, ${plan.color}12 0%, transparent 70%)`,
                    filter: 'blur(20px)',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Plan name */}
                <div style={{ marginBottom: 8 }}>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    color: plan.color,
                    textTransform: 'uppercase',
                  }}>
                    {plan.name}
                  </span>
                </div>

                {/* Price */}
                <div style={{ marginBottom: 8 }}>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: plan.price === 'Custom' ? '2.2rem' : '2.8rem',
                    color: '#1E1B2E',
                    letterSpacing: '-0.02em',
                  }}>
                    {plan.price}
                  </span>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.85rem',
                    color: '#9CA3AF',
                    marginLeft: 6,
                  }}>
                    / {plan.period}
                  </span>
                </div>

                {/* Tagline */}
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.85rem',
                  color: '#6B7280',
                  marginBottom: 24,
                  lineHeight: 1.5,
                }}>
                  {plan.tagline}
                </p>

                {/* Divider */}
                <div style={{
                  height: 1,
                  background: `linear-gradient(90deg, ${plan.color}30, transparent)`,
                  marginBottom: 24,
                }} />

                {/* Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckIcon color={plan.color} />
                      <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.875rem',
                        color: '#374151',
                        fontWeight: 500,
                      }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className={plan.popular ? 'btn-primary' : 'btn-ghost'}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    ...(plan.popular ? {
                      background: `linear-gradient(135deg, ${plan.color}, #8B5CF6)`,
                      boxShadow: `0 4px 20px ${plan.color}40`,
                    } : {
                      borderColor: `${plan.color}40`,
                      color: plan.color,
                    }),
                  }}
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            textAlign: 'center',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.85rem',
            color: '#9CA3AF',
            marginTop: 40,
          }}
        >
          ✦ All prices are in INR and project-based. Custom quotes available.  &nbsp;·&nbsp; No hidden fees.
        </motion.p>
      </div>
    </section>
  );
}
