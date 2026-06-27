import { useRef, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/** Warm ambient glow that follows the cursor with slight lag. Desktop only. */
export default function CursorGlow({ size = 380, color = 'rgba(255,170,90,0.10)' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
    if (window.innerWidth < 768) return;

    const el = ref.current;
    if (!el) return;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 3;
    let cx = tx, cy = ty, raf;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate(${cx - size / 2}px, ${cy - size / 2}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, [reduced, size]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        zIndex: 2,
        pointerEvents: 'none',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
