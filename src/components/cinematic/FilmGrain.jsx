import { useReducedMotion } from '../../hooks/useReducedMotion';

const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
  );

/** Barely-visible living film grain over the whole viewport. */
export default function FilmGrain({ opacity = 0.06 }) {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        pointerEvents: 'none',
        mixBlendMode: 'soft-light',
        opacity,
        backgroundImage: `url("${NOISE}")`,
        backgroundSize: '140px 140px',
        animation: reduced ? 'none' : 'grainShift 1.4s steps(4) infinite',
      }}
    />
  );
}
