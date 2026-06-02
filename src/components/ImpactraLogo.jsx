import React from 'react';

/* ─────────────────────────────────────────────────────────────
   ImpactraLogo — Uses the EXACT official IMPACTRA logo PNG
   Props:
     size        — height of the logo image in px (default 44)
     showText    — if true, renders the FULL logo (mark + wordmark)
                   if false, renders only the iA mark portion (cropped via object-position)
     className   — optional CSS class
     style       — optional inline style overrides
     animate     — optional floating animation (default false)
   ──────────────────────────────────────────────────────────── */
export default function ImpactraLogo({
  size = 44,
  showText = true,
  className = '',
  style = {},
  animate = false,
  // Legacy props accepted but ignored (for backward compatibility)
  theme,
  glow,
}) {
  const baseStyle = {
    display: 'block',
    objectFit: 'contain',
    userSelect: 'none',
    animation: animate ? 'float 5s ease-in-out infinite' : 'none',
    ...style,
  };

  if (showText) {
    // Full logo with iA mark + IMPACTRA wordmark + tagline
    return (
      <img
        src="/impactra-logo.png"
        alt="IMPACTRA Logo"
        className={className}
        style={{
          ...baseStyle,
          height: size * 2.6,   // full logo is taller (includes wordmark + tagline)
          width: 'auto',
          maxWidth: size * 4,
        }}
        draggable={false}
      />
    );
  }

  // Mark-only: crop to just the iA symbol using a wrapper + overflow hidden
  // The iA mark occupies the top ~55% of the full logo image
  const markHeight = size * 2.6 * 0.60;  // how tall the full image would be
  const displaySize = size;

  return (
    <div
      className={className}
      style={{
        width: displaySize,
        height: displaySize,
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
        animation: animate ? 'float 5s ease-in-out infinite' : 'none',
        ...style,
      }}
    >
      <img
        src="/impactra-logo.png"
        alt="IMPACTRA"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          height: markHeight,
          width: 'auto',
          objectFit: 'contain',
          userSelect: 'none',
        }}
        draggable={false}
      />
    </div>
  );
}
