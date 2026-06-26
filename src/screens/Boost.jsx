import { useState } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const PACKAGES = [
  { name: 'Bronze', price: '£2', credits: 1, badge: null },
  { name: 'Silver', price: '£9', credits: 5, badge: null },
  { name: 'Gold', price: '£17', credits: 10, badge: null },
  { name: 'Platinum', price: '£30', credits: 30, badge: 'Best value' },
  { name: 'Diamond', price: '£200', credits: 300, badge: null },
];

export default function Boost({ onNavigate }) {
  const [selected, setSelected] = useState(2);
  const { isMobile, isDesktop } = useBreakpoint();
  const pkg = PACKAGES[selected];

  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>
        <button onClick={() => onNavigate('wallet')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', font: '500 14px Inter', color: '#707070', marginBottom: 28 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="#707070" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>Back
        </button>
        <h1 style={{ font: '700 30px/1 Inter', color: '#fff', margin: '0 0 6px', letterSpacing: '-.02em' }}>Boost credits</h1>
        <p style={{ font: '400 14px Inter', color: '#707070', margin: '0 0 28px' }}>One-time top-ups — credits never expire.</p>

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3,1fr)' : isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
          {PACKAGES.map((p, i) => (
            <div key={p.name} onClick={() => setSelected(i)} style={{ background: selected === i ? 'linear-gradient(135deg,#1a1206,#0f0c04)' : '#0d0f12', border: `1px solid ${selected === i ? 'rgba(255,128,0,0.5)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 18, padding: '20px 18px', cursor: 'pointer', position: 'relative', transition: 'all 0.2s', boxShadow: selected === i ? '0 0 28px rgba(255,128,0,0.12)' : 'none' }}>
              {p.badge && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#47C7FC', borderRadius: 20, padding: '2px 10px', font: '600 10px Inter', color: '#050505', whiteSpace: 'nowrap' }}>{p.badge}</div>}
              {selected === i && <div style={{ position: 'absolute', top: 12, right: 12, width: 18, height: 18, borderRadius: '50%', background: '#FF8000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
              <div style={{ font: '500 13px Inter', color: selected === i ? '#FF8000' : '#707070', marginBottom: 8 }}>{p.name}</div>
              <div style={{ font: "700 28px/1 'Cormorant Garamond',serif", color: '#fff' }}>{p.credits}</div>
              <div style={{ font: '400 11px Inter', color: '#707070', marginBottom: 10 }}>credits</div>
              <div style={{ font: '600 15px Inter', color: selected === i ? '#FF8000' : '#A3A3A3' }}>{p.price}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '16px 20px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ font: '400 13px Inter', color: '#707070' }}>Adding</span>
            <span style={{ font: '600 13px Inter', color: '#fff' }}>{pkg.credits} credits</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ font: '400 13px Inter', color: '#707070' }}>New balance</span>
            <span style={{ font: '700 14px Inter', color: '#5BD08A' }}>{124 + pkg.credits} cr</span>
          </div>
        </div>

        <button onClick={() => onNavigate('wallet')} style={{ width: '100%', height: 54, borderRadius: 14, background: '#FF8000', border: 'none', cursor: 'pointer', font: '600 16px Inter', color: '#050505', boxShadow: '0 8px 24px rgba(255,128,0,0.35)' }}>
          Continue · {pkg.price} → {pkg.credits} credits
        </button>
      </div>
    </div>
  );
}
