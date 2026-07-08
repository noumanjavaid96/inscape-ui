import { useState, useEffect, useRef } from 'react';
import tokens from '../../design/tokens';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const { colors, font } = tokens;

// InScape three-bar mark (same paths as the Logo component) for the reveal.
const ICON_PATHS = [
  'M0 0C5.249 26.752-12.403 48.505-39.154 48.505H-217.792L-217.8 48.459C-223.05 21.708-205.398-.045-178.647-.045H-.009Z',
  'M0 0 .009 .045H-178.69C-205.465 .045-231.248-21.684-236.307-48.459L-236.316-48.505H-57.691C-30.915-48.505-5.059-26.775 0 0',
  'M0 0 .009 .045H-178.617C-205.392 .045-231.248-21.684-236.307-48.459L-236.316-48.505H-57.617C-30.842-48.505-5.059-26.775 0 0',
];
const ICON_TRANSFORMS = [
  'matrix(1,0,0,-1,247.8484,141.02519)',
  'matrix(1,0,0,-1,240.316,180.8916)',
  'matrix(1,0,0,-1,273.92433,4.044983)',
];

/**
 * Full-screen brand reveal preloader. Shows the InScape mark + wordmark with a
 * growing hairline, then lifts (fades) and unmounts. Calls onDone when the lift
 * begins so the hero entrance can start in sync.
 */
export default function IntroSplash({ onDone, hold = 1900, lift = 800, name = '' }) {
  const reduced = useReducedMotion();
  const firstWord = name ? name.trim().split(/\s+/)[0] : '';
  const firstName = firstWord ? firstWord.charAt(0).toUpperCase() + firstWord.slice(1) : '';
  const [lifting, setLifting] = useState(false);
  const [gone, setGone] = useState(false);

  // Keep onDone in a ref so a parent re-render (e.g. a per-second countdown)
  // doesn't reset the lift timers and freeze the splash.
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (reduced) {
      onDoneRef.current?.();
      setGone(true);
      return;
    }
    const t1 = setTimeout(() => {
      setLifting(true);
      onDoneRef.current?.();
    }, hold);
    const t2 = setTimeout(() => setGone(true), hold + lift);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [reduced, hold, lift]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        // Theme-independent dark brand reveal so it reads the same (and stays
        // high-contrast) in both light and dark mode.
        background: 'radial-gradient(120% 120% at 50% 38%, #241d16 0%, #14100c 60%, #0d0a08 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
        opacity: lifting ? 0 : 1,
        transition: `opacity ${lift}ms ease`,
        pointerEvents: lifting ? 'none' : 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, animation: reduced ? 'none' : 'introLogo 900ms cubic-bezier(.2,.7,.2,1) both' }}>
        <svg height={40} viewBox="-4 -4 287 242" fill={colors.accent} style={{ display: 'block' }} aria-hidden="true">
          {ICON_PATHS.map((d, i) => <path key={i} transform={ICON_TRANSFORMS[i]} d={d} />)}
        </svg>
        <span style={{ font: `600 30px ${font.display}`, letterSpacing: '.18em', color: '#F4EFE7' }}>INSCAPE</span>
      </div>
      {firstName && (
        <div style={{ font: `400 19px ${font.family}`, color: 'rgba(244,239,231,0.72)', letterSpacing: '.01em', textAlign: 'center', animation: reduced ? 'none' : 'introLogo 800ms 480ms cubic-bezier(.2,.7,.2,1) both' }}>
          Welcome, <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, fontSize: 25, color: colors.accent }}>{firstName}</span>
        </div>
      )}
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`, animation: reduced ? 'none' : 'hairlineGrow 1100ms 300ms ease both', width: reduced ? 120 : 0 }} />
    </div>
  );
}
