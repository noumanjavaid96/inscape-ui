/**
 * InScape design tokens.
 *
 * The single source of truth for the visual language: colours, radii, shadows,
 * typography, spacing and motion. Every component and screen imports from here
 * so there are no magic numbers or stray hex codes scattered across the app.
 *
 * The object is deeply frozen to make accidental mutation a hard error.
 */

function deepFreeze(obj) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}

export const tokens = deepFreeze({
  colors: {
    // Background levels — darkest to lightest surface. Theme-dependent values
    // resolve through CSS variables (see index.css); dark is the default and
    // [data-theme="light"] flips the member app to the light palette.
    bg: 'var(--bg)',
    bg1: 'var(--bg1)',
    bg2: 'var(--bg2)', // brand "Panel"
    bg3: 'var(--bg3)',
    bg4: 'var(--bg4)', // brand "Elevated Surface"
    bg5: 'var(--bg5)',

    // Brand accent — softened from the raw #FF8000 to a warmer, less neon
    // orange so it reads calmer on the dark surfaces (shared across themes).
    accent: '#F5852E',
    accentDark: '#D9701F',

    // Semantic — shared across themes.
    info: '#47C7FC',
    success: '#5BD08A',
    warning: '#F0B43C',
    danger: '#ff4444',

    // Text levels — brightest to faintest.
    text: 'var(--text)',
    textMuted: 'var(--text-muted)',
    textDim: 'var(--text-dim)',
    textFaint: 'var(--text-faint)',
    textGhost: 'var(--text-ghost)',
    line: 'var(--line)',

    // Common translucent overlays.
    border: 'var(--border)',
    borderStrong: 'var(--border-strong)',
    borderFaint: 'var(--border-faint)',
    surfaceHover: 'var(--surface-hover)',
    overlay: 'var(--overlay)',
    accentSoft: 'rgba(245,133,46,0.1)',
    accentBorder: 'rgba(245,133,46,0.3)',
  },

  // Light "editorial premium" palette — warm cream/white surfaces, ink type,
  // orange reserved for primary actions. Used by the public landing. Accent and
  // semantic hues are shared with `colors`.
  light: {
    page: '#FFFFFF',
    canvas: '#FAF8F4',   // warm cream backdrop
    panel: '#FFFFFF',
    soft: '#F4F1EB',     // soft chip / inset surface
    softer: '#FBFAF7',
    ink: '#15120E',      // near-black warm ink — headings
    body: '#56514A',     // body copy
    dim: '#8C867D',      // muted captions
    faint: '#B6B0A6',    // faintest labels
    line: 'rgba(20,17,12,0.10)',
    lineSoft: 'rgba(20,17,12,0.06)',
    charcoal: '#16140F',     // dark editorial band
    charcoalSoft: '#211E18',
    glass: 'rgba(255,255,255,0.82)',
    glassBorder: 'rgba(255,255,255,0.9)',
    accentSoft: 'rgba(245,133,46,0.10)',
    accentBorder: 'rgba(245,133,46,0.28)',
    cardShadow: '0 18px 44px rgba(20,17,12,0.10)',
    cardShadowHover: '0 30px 70px rgba(20,17,12,0.16)',
    floatShadow: '0 24px 60px rgba(20,17,12,0.16)',
  },

  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
  },

  shadow: {
    card: '0 20px 48px rgba(0,0,0,0.4)',
    float: '0 32px 80px rgba(0,0,0,0.5)',
    glow: '0 8px 24px rgba(245,133,46,0.35)',
    glowStrong: '0 16px 40px rgba(245,133,46,0.5)',
    glowBlue: '0 8px 24px rgba(71,199,252,0.3)',
  },

  transition: {
    fast: 'all 0.15s ease',
    base: 'all 0.2s ease',
    slow: 'all 0.3s ease',
  },

  font: {
    family: "'Inter', sans-serif",
    display: "'Cormorant Garamond', serif",
    bodySize: {
      xs: 11,
      sm: 12,
      md: 13,
      base: 14,
      lg: 15,
      xl: 16,
      xxl: 18,
    },
    weightMap: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 800,
    },
    // Brand type scale (Master Brand Spec §17). Inter for all UI;
    // Cormorant Garamond reserved for campaign titles only.
    scale: {
      h1: { size: 72, weight: 800, line: 0.9, tracking: '-0.02em' },
      h2: { size: 56, weight: 700, line: 1.0 },
      h3: { size: 32, weight: 600, line: 1.1 },
      body: { size: 18, weight: 400, line: 1.6 },
      small: { size: 14, weight: 400, line: 1.5 },
    },
  },

  // Layout system (Master Brand Spec §9): 1440px max, 12-col desktop grid.
  layout: {
    maxWidth: 1440,
    contentWidth: 1200,
    grid: 12,
    gutter: 16,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 48,
  },
});

/** Convenience: map a semantic colour name to its hex value. */
export const accentMap = deepFreeze({
  orange: tokens.colors.accent,
  blue: tokens.colors.info,
  green: tokens.colors.success,
  yellow: tokens.colors.warning,
  red: tokens.colors.danger,
  gray: tokens.colors.textDim,
});

export default tokens;
