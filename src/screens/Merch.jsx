import { useState } from 'react';
import tokens from '../design/tokens';
import Logo from '../components/ui/Logo';
import Icon from '../components/ui/Icon';

const { colors, font, light } = tokens;

const PAD = 'clamp(20px, 5vw, 80px)';

const MERCH_ITEMS = [
  { name: 'Signature Hoodie', tag: 'Apparel', src: '/brand/merch/Hoodie.png' },
  { name: 'Members Tee', tag: 'Apparel', src: '/brand/merch/Shirt.png' },
  { name: 'Embroidered Cap', tag: 'Headwear', src: '/brand/merch/Hat.png' },
  { name: 'Bottle & Tote Set', tag: 'Everyday', src: '/brand/merch/Bag & Bottle.png' },
  { name: 'Collector Display', tag: 'Limited', src: '/brand/merch/Display.png' },
];

export default function Merch({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const valid = /\S+@\S+\.\S+/.test(email);

  const submit = () => { if (valid) setJoined(true); };

  return (
    <div style={{ background: light.page, minHeight: '100vh', fontFamily: font.family, color: light.ink, overflowX: 'hidden' }}>
      <style>{`
        .merch-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .merch-waitlist { display: flex; gap: 10px; }
        @media (max-width: 900px) { .merch-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) {
          .merch-grid { grid-template-columns: 1fr !important; }
          .merch-waitlist { flex-direction: column !important; }
        }
      `}</style>

      {/* Top bar */}
      <header style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${PAD}` }}>
        <span onClick={() => onNavigate('public-home')} style={{ cursor: 'pointer', display: 'inline-flex' }}>
          <Logo size="md" showText variant="light" />
        </span>
        <button onClick={() => onNavigate('public-home')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', font: `500 14px ${font.family}`, color: 'rgba(255,255,255,0.8)', cursor: 'pointer' }}>
          <Icon name="arrowLeft" size={15} color="rgba(255,255,255,0.8)" /> Back to home
        </button>
      </header>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: 560, display: 'flex', alignItems: 'center', overflow: 'hidden', backgroundColor: light.charcoal }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,13,9,0.96) 0%, rgba(15,13,9,0.55) 45%, rgba(15,13,9,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1200, margin: '0 auto', padding: `120px ${PAD} 72px`, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent, animation: 'livePulse 2s ease-in-out infinite' }} />
            <span style={{ font: `600 11px ${font.family}`, letterSpacing: '.18em', color: 'rgba(255,255,255,0.9)' }}>COMING SOON</span>
          </div>
          <h1 style={{ font: `300 clamp(44px, 7vw, 84px)/0.98 ${font.family}`, letterSpacing: '-0.03em', color: '#fff', margin: '0 auto', maxWidth: 900 }}>
            InScape <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>Merch.</span>
          </h1>
          <p style={{ font: `400 17px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.85)', margin: '22px auto 0', maxWidth: 520 }}>
            A members-first collection, designed to be worn, not just owned. Redeemable with Credits when it drops.
          </p>

          {/* Waitlist */}
          <div style={{ maxWidth: 460, margin: '34px auto 0' }}>
            {joined ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(91,208,138,0.12)', border: '1px solid rgba(91,208,138,0.35)', borderRadius: 14, padding: '14px 22px' }}>
                <Icon name="check" size={18} color={colors.success} />
                <span style={{ font: `500 15px ${font.family}`, color: '#fff' }}>You're on the list. We'll be in touch when it drops.</span>
              </div>
            ) : (
              <>
                <div className="merch-waitlist">
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                    onKeyDown={e => { if (e.key === 'Enter') submit(); }}
                    style={{ flex: 1, height: 54, borderRadius: 14, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', font: `400 15px ${font.family}`, padding: '0 18px', outline: 'none' }}
                  />
                  <button
                    onClick={submit} disabled={!valid}
                    style={{ height: 54, padding: '0 26px', borderRadius: 14, background: colors.accent, border: 'none', color: '#1c1003', font: `600 15px ${font.family}`, cursor: valid ? 'pointer' : 'not-allowed', opacity: valid ? 1 : 0.55, whiteSpace: 'nowrap', boxShadow: '0 14px 30px rgba(238,140,70,0.3)' }}
                  >
                    Join the waitlist
                  </button>
                </div>
                <p style={{ font: `400 12px ${font.family}`, color: 'rgba(255,255,255,0.55)', margin: '12px 0 0' }}>Be first to know when the collection goes live. No spam.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CONCEPT SHOWCASE */}
      <section style={{ padding: `clamp(56px, 8vw, 100px) ${PAD}`, background: light.canvas }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.16em', textTransform: 'uppercase', color: light.dim, marginBottom: 12 }}>The Collection · Concepts</div>
            <h2 style={{ font: `400 clamp(30px, 4vw, 46px)/1.05 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: 0 }}>
              A first look at <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>what's coming.</span>
            </h2>
            <p style={{ font: `400 15px/1.6 ${font.family}`, color: light.body, maxWidth: 500, margin: '14px auto 0' }}>
              These are early concepts. Final designs, materials and drop dates will be shared with members first.
            </p>
          </div>

          <div className="merch-grid">
            {MERCH_ITEMS.map(item => (
              <div key={item.name} style={{ background: light.panel, border: `1px solid ${light.line}`, borderRadius: 24, overflow: 'hidden', boxShadow: light.cardShadow }}>
                <div style={{ position: 'relative', background: light.soft, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
                  <img src={item.src} alt={item.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
                  <span style={{ position: 'absolute', top: 14, left: 14, font: `600 10px ${font.family}`, letterSpacing: '.08em', textTransform: 'uppercase', color: light.dim, background: 'rgba(255,255,255,0.9)', borderRadius: 999, padding: '5px 11px' }}>{item.tag}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '18px 22px' }}>
                  <span style={{ font: `600 16px ${font.family}`, color: light.ink }}>{item.name}</span>
                  <span style={{ font: `600 11px ${font.family}`, letterSpacing: '.04em', color: colors.accent, background: light.accentSoft, border: `1px solid ${light.accentBorder}`, borderRadius: 999, padding: '5px 12px', whiteSpace: 'nowrap' }}>Coming soon</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: light.page, borderTop: `1px solid ${light.line}`, padding: `36px ${PAD}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span onClick={() => onNavigate('public-home')} style={{ cursor: 'pointer', display: 'inline-flex' }}>
            <Logo size="sm" showText variant="charcoal" />
          </span>
          <button onClick={() => onNavigate('public-home')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', font: `500 14px ${font.family}`, color: light.dim, cursor: 'pointer' }}>
            <Icon name="arrowLeft" size={15} color={light.dim} /> Back to home
          </button>
          <div style={{ font: `400 12px ${font.family}`, color: light.dim }}>© 2026 InScape. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
