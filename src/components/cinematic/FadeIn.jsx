import { useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Fades and lifts its children in once `start` is true, after `delay` ms.
 * Used to choreograph the hero entrance against the intro lift.
 */
export default function FadeIn({ children, start = true, delay = 0, duration = 1000, y = 14, className, style }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!start) return;
    if (reduced) { setShown(true); return; }
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [start, delay, reduced]);

  return (
    <div
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown || reduced ? 'translateY(0)' : `translateY(${y}px)`,
        transition: reduced ? 'opacity 400ms ease' : `opacity ${duration}ms ease, transform ${duration}ms ease`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
