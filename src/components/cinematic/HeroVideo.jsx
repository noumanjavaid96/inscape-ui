import { useRef, useEffect } from 'react';

/**
 * Full-bleed background video with a seamless crossfade loop. Two copies of the
 * clip are stacked; as the visible one nears its end, the other starts from the
 * top and we crossfade between them, so the loop point is never a hard cut and
 * there is no reverse-seek stutter. Falls back to the poster if the clip can't
 * load, and holds on the first frame under reduced motion.
 *
 * object-fit: cover keeps it full-bleed; object-position centres the frame so
 * the brand mark in the footage stays visible instead of being cropped.
 */
export default function HeroVideo({ src, poster, style }) {
  const aRef = useRef(null);
  const bRef = useRef(null);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return undefined;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    [a, b].forEach((v) => { v.muted = true; v.playsInline = true; });

    if (reduced) {
      a.pause();
      b.style.display = 'none';
      return undefined;
    }

    const FADE = 0.9; // seconds of overlap between the two copies
    let raf = 0;
    let active = a;
    let incoming = b;

    a.style.opacity = '1';
    b.style.opacity = '0';
    a.play().catch(() => {});

    const tick = () => {
      const d = active.duration || 0;
      if (d && Number.isFinite(d)) {
        const remaining = d - active.currentTime;
        if (remaining <= FADE) {
          if (incoming.paused) { incoming.currentTime = 0; incoming.play().catch(() => {}); }
          const k = Math.min(1, Math.max(0, (FADE - remaining) / FADE)); // 0 → 1
          active.style.opacity = String(1 - k);
          incoming.style.opacity = String(k);
          if (k >= 1) {
            active.pause();
            active.style.opacity = '0';
            incoming.style.opacity = '1';
            const tmp = active; active = incoming; incoming = tmp;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  const base = {
    position: 'absolute', inset: 0, zIndex: 0,
    width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
    ...style,
  };
  const hide = (e) => { e.currentTarget.style.display = 'none'; };

  return (
    <>
      <video ref={aRef} autoPlay muted playsInline preload="auto" poster={poster} aria-hidden="true" style={{ ...base, opacity: 1 }} onError={hide}>
        <source src={src} type="video/mp4" />
      </video>
      <video ref={bRef} muted playsInline preload="auto" aria-hidden="true" style={{ ...base, opacity: 0 }}>
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
