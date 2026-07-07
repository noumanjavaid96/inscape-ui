import { useRef, useState, useEffect, useCallback } from 'react';

const CROSSFADE = 0.8; // seconds

/**
 * Seamless full-bleed background. A poster still is always painted as the base
 * layer (so the hero never falls back to flat black), with two stacked
 * <video> elements crossfading the clip into its own start over the top. When
 * no src is given, a cinematic animated gradient stands in.
 */
export default function VideoBackdrop({ src, poster, overlay = true }) {
  const aRef = useRef(null);
  const bRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  activeRef.current = active;

  const onTime = useCallback(() => {
    const cur = activeRef.current === 0 ? aRef.current : bRef.current;
    const nxt = activeRef.current === 0 ? bRef.current : aRef.current;
    if (!cur || !nxt || Number.isNaN(cur.duration)) return;
    if (cur.duration - cur.currentTime <= CROSSFADE) {
      nxt.currentTime = 0;
      const p = nxt.play();
      if (p && p.catch) p.catch(() => {});
      setActive((i) => (i === 0 ? 1 : 0));
    }
  }, []);

  useEffect(() => {
    if (!src) return;
    const a = aRef.current;
    if (!a) return;
    const start = () => { const p = a.play(); if (p && p.catch) p.catch(() => {}); };
    if (a.readyState >= 2) start();
    else a.addEventListener('canplay', start, { once: true });
  }, [src]);

  useEffect(() => {
    if (!src) return;
    const cur = active === 0 ? aRef.current : bRef.current;
    const other = active === 0 ? bRef.current : aRef.current;
    cur?.addEventListener('timeupdate', onTime);
    other?.removeEventListener('timeupdate', onTime);
    return () => cur?.removeEventListener('timeupdate', onTime);
  }, [active, src, onTime]);

  const vid = (i, ref) => (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      autoPlay
      playsInline
      preload="auto"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover',
        opacity: active === i ? 1 : 0, transition: 'opacity 800ms ease',
      }}
    />
  );

  const fallbackBg = poster
    ? `url("${poster}") center/cover no-repeat`
    : 'radial-gradient(120% 90% at 75% 20%, rgba(245,133,46,0.18), transparent 55%),' +
      'radial-gradient(90% 80% at 15% 90%, rgba(71,199,252,0.08), transparent 60%),' +
      'linear-gradient(160deg, #14110b 0%, #0a0a0c 45%, #050505 100%)';

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      {/* Base poster / gradient — always visible */}
      <div style={{ position: 'absolute', inset: 0, background: fallbackBg }} />
      {src && (
        <>
          {vid(0, aRef)}
          {vid(1, bRef)}
        </>
      )}
      {overlay && (
        <div
          style={{
            position: 'absolute', inset: 0,
            background:
              'linear-gradient(to top, rgba(5,5,5,0.90) 0%, rgba(5,5,5,0.42) 38%, rgba(5,5,5,0.12) 72%, rgba(5,5,5,0.30) 100%)',
          }}
        />
      )}
    </div>
  );
}
