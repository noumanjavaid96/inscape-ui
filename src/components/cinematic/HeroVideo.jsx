import { useRef, useEffect } from 'react';

/**
 * Full-bleed background video that plays forward then reverses (ping-pong), so
 * the loop never "snaps" back to the start. Forward playback is native/smooth;
 * the reverse leg is driven by rAF seeking. Falls back to the poster if the
 * video can't load, and holds on the first frame under reduced-motion.
 *
 * object-fit: cover keeps it full-bleed; object-position centres the frame so
 * the brand mark in the footage stays visible instead of being cropped to a
 * corner.
 */
export default function HeroVideo({ src, poster, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    v.muted = true;
    v.playsInline = true;

    if (reduced) {
      // Hold on the first frame — no motion.
      v.pause();
      return undefined;
    }

    let raf = 0;
    let dir = 1; // 1 = forward (native play), -1 = reversing (rAF seek)
    let last = performance.now();

    const startForward = () => { dir = 1; v.play().catch(() => {}); };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const dur = v.duration || 0;

      if (dir === 1) {
        // Native forward playback; flip to reverse just before the end.
        if (dur && v.currentTime >= dur - 0.08) { dir = -1; v.pause(); }
      } else {
        // Reverse leg: step the playhead back frame by frame.
        const next = v.currentTime - dt * 1.0;
        if (next <= 0.03) { v.currentTime = 0; startForward(); }
        else { v.currentTime = next; }
      }
      raf = requestAnimationFrame(tick);
    };

    const onReady = () => { startForward(); };
    v.addEventListener('loadeddata', onReady);
    if (v.readyState >= 2) startForward();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener('loadeddata', onReady);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay muted playsInline preload="auto"
      poster={poster}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', ...style }}
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
