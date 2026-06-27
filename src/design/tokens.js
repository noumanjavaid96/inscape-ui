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
    // Background levels — darkest to lightest surface.
    bg: '#050505',
    bg1: '#080a0c',
    bg2: '#0B0D10', // brand "Panel"
    bg3: '#0d0f12',
    bg4: '#111418', // brand "Elevated Surface"
    bg5: '#15181d',

    // Brand accent.
    accent: '#FF8000',
    accentDark: '#cc6600',

    // Semantic.
    info: '#47C7FC',
    success: '#5BD08A',
    warning: '#F0B43C',
    danger: '#ff4444',

    // Text levels — brightest to faintest.
    text: '#ffffff',
    textMuted: '#A3A3A3',
    textDim: '#707070',
    textFaint: '#4a4f57',
    textGhost: '#3a3f47',
    line: '#22262c',

    // Common translucent overlays.
    border: 'rgba(255,255,255,0.08)',
    borderStrong: 'rgba(255,255,255,0.15)',
    borderFaint: 'rgba(255,255,255,0.06)',
    surfaceHover: 'rgba(255,255,255,0.04)',
    overlay: 'rgba(5,5,5,0.65)',
    accentSoft: 'rgba(255,128,0,0.1)',
    accentBorder: 'rgba(255,128,0,0.3)',
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
    glow: '0 8px 24px rgba(255,128,0,0.35)',
    glowStrong: '0 16px 40px rgba(255,128,0,0.5)',
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
