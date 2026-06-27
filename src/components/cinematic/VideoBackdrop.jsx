import { useRef, useState, useEffect, useCallback } from 'react';

const CROSSFADE = 0.8; // seconds

/**
 * Seamless full-bleed background video using two stacked <video> elements that
 * crossfade the clip into its own start (no hard loop cut). Falls back to a
 * cinematic animated gradient when no `src` is provided, so the hero looks
 * intentional even before the brand film exists.
 *
 * Drop the generated InScape hero clip URL into `src` to activate the video.
 */
export default function VideoBackdrop({ src, poster, overlay = true }) {
  const aRef = useRef(null);
  const bRef = useRef(null);
  const [active, setActive] = useState(0); // 0 = A, 1 = B
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
    if (a.readyState >= 1) start();
    else a.addEventListener('loadedmetadata', start, { once: true });
  }, [src]);

  useEffect(() => {
    if (!src) return;
    const cur = active === 0 ? aRef.current : bRef.current;
    const other = active === 0 ? bRef.current : aRef.current;
    cur?.addEventListener('timeupdate', onTime);
    other?.removeEventListener('timeupdate', onTime);
    return () => cur?.removeEventListener('timeupdate', onTime);
  }, [active, src, onTime]);

  const vidStyle = (i) => ({
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', zIndex: -10,
    opacity: active === i ? 1 : 0, transition: 'opacity 800ms ease',
  });

  return (
    <>
      {src ? (
        <>
          <video ref={aRef} src={src} poster={poster} muted playsInline preload="auto" style={vidStyle(0)} />
          <video ref={bRef} src={src} muted playsInline preload="auto" style={vidStyle(1)} />
        </>
      ) : (
        // Cinematic fallback: slow-breathing dark gradient with warm key light.
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: -10,
            background:
              'radial-gradient(120% 90% at 75% 20%, rgba(255,128,0,0.16), transparent 55%),' +
              'radial-gradient(90% 80% at 15% 90%, rgba(71,199,252,0.07), transparent 60%),' +
              'linear-gradient(160deg, #14110b 0%, #0a0a0c 45%, #050505 100%)',
            backgroundImage: poster ? `url(${poster})` : undefined,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />
      )}
      {overlay && (
        <div style={{ position: 'absolute', inset: 0, zIndex: -9, background: 'linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.5) 45%, rgba(5,5,5,0.35) 100%)' }} />
      )}
    </>
  );
}
