import { useState } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const PLANS = [
  { name: 'Entry', price: { monthly: '£14.99', annual: '£149.99' }, credits: 40, features: ['40 monthly credits', 'Campaign access', 'Momentum tracking', 'Email support'], highlight: false },
  { name: 'Premium', price: { monthly: '£19.99', annual: '£199.99' }, credits: 120, features: ['120 monthly credits', 'Priority access', 'Momentum bonuses', 'Exclusive member offers', 'Referral rewards', 'Live chat support'], highlight: true },
  { name: 'Elite', price: { monthly: '£24.99', annual: '£249.99' }, credits: 250, features: ['250 monthly credits', 'Early campaign access', 'Max Momentum tier', 'Partner offer upgrades', 'Dedicated support', 'Annual prize draws'], highlight: false },
];

export default function Membership({ onNavigate }) {
  const [annual, setAnnual] = useState(false);
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ font: '700 32px/1 Inter', color: '#fff', margin: '0 0 10px', letterSpacing: '-.02em' }}>Membership</h1>
          <p style={{ font: '400 15px Inter', color: '#707070', margin: '0 0 24px' }}>Monthly credits, Momentum bonuses and exclusive access.</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 4 }}>
            {['Monthly', 'Annual'].map((t, i) => (
              <button key={t} onClick={() => setAnnual(i === 1)} style={{ padding: '8px 20px', borderRadius: 9, font: '600 13px Inter', border: 'none', cursor: 'pointer', background: annual === (i === 1) ? '#22262c' : 'transparent', color: annual === (i === 1) ? '#fff' : '#707070', transition: 'all 0.15s' }}>{t}{i === 1 && <span style={{ font: '600 10px Inter', color: '#5BD08A', marginLeft: 5 }}>Save ~17%</span>}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3,1fr)' : isMobile ? '1fr' : 'repeat(2,1fr)', gap: 20 }}>
          {PLANS.map(p => (
            <div key={p.name} style={{ background: p.highlight ? 'linear-gradient(160deg,#1a1206,#0f0c04)' : '#0a0c0f', border: `1px solid ${p.highlight ? 'rgba(255,128,0,0.4)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 22, padding: '28px 26px', position: 'relative', boxShadow: p.highlight ? '0 0 60px rgba(255,128,0,0.1)' : 'none', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              {p.highlight && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#FF8000', borderRadius: 20, padding: '4px 14px', font: '700 11px Inter', color: '#050505', whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
              <div style={{ font: '600 12px Inter', color: p.highlight ? '#FF8000' : '#707070', letterSpacing: '.08em', marginBottom: 8 }}>{p.name.toUpperCase()}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span style={{ font: "700 36px/1 'Cormorant Garamond',serif", color: '#fff' }}>{annual ? p.price.annual : p.price.monthly}</span>
                <span style={{ font: '400 12px Inter', color: '#4a4f57' }}>{annual ? '/yr' : '/mo'}</span>
              </div>
              <div style={{ font: '500 13px Inter', color: '#FF8000', marginBottom: 22 }}>{p.credits} credits/month</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill={p.highlight ? 'rgba(255,128,0,0.12)' : 'rgba(255,255,255,0.04)'}/><path d="M8 12l3 3 5-5" stroke={p.highlight ? '#FF8000' : '#4a4f57'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ font: '400 13px Inter', color: p.highlight ? '#A3A3A3' : '#707070' }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigate('dashboard')} style={{ width: '100%', height: 46, borderRadius: 12, background: p.highlight ? '#FF8000' : 'rgba(255,255,255,0.06)', border: p.highlight ? 'none' : '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', font: '600 14px Inter', color: p.highlight ? '#050505' : '#fff', boxShadow: p.highlight ? '0 8px 24px rgba(255,128,0,0.3)' : 'none' }}>
                Choose {p.name} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
