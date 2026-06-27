import { useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Wrapper that nudges its child toward the cursor (magnetic pull) and springs
 * back on leave. Disabled under reduced-motion. Render any element via `as`.
 */
export default function MagneticButton({ children, strength = 7, onClick, style, ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const onMove = (e) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const my = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        transition: 'transform 0.25s cubic-bezier(.2,.7,.2,1)',
        cursor: 'pointer',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
