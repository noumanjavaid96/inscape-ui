import { useMemo } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const rand = (a, b) => a + Math.random() * (b - a);

/** Calm rising motes of warm light — the InScape take on drifting petals. */
export default function FloatingEmbers({ count = 14, color = '255,128,0' }) {
  const reduced = useReducedMotion();
  const embers = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        size: rand(4, 11),
        left: rand(0, 100),
        bottom: rand(-10, 30),
        duration: rand(16, 28),
        delay: rand(-20, 4),
        drift: rand(-60, 80),
        opacity: rand(0.12, 0.32),
        blush: Math.random() > 0.7,
      })),
    [count]
  );

  if (reduced) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
      {embers.map((e, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${e.left}%`,
            bottom: `${e.bottom}%`,
            width: e.size,
            height: e.size,
            borderRadius: '60% 40% 60% 40% / 50% 50% 50% 50%',
            background: `radial-gradient(circle at 50% 40%, rgba(${e.blush ? '255,225,200' : color},0.9), rgba(${color},0))`,
            filter: 'blur(1px)',
            opacity: 0,
            '--ember-x': `${e.drift}px`,
            '--ember-opacity': e.opacity,
            animation: `emberRise ${e.duration}s linear ${e.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
