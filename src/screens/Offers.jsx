import { useBreakpoint } from '../hooks/useBreakpoint';

const OFFERS = [
  { brand: 'Voyage Privé', category: 'Travel', title: 'Members-only luxury travel rates', body: 'Exclusive access to 5-star hotels and private villa packages at up to 70% off. Tracked link — no code needed.', type: 'Tracked link', badge: null, accent: '#47C7FC' },
  { brand: 'Helios Tech', category: 'Electronics', title: '20% off premium audio & displays', body: 'Members receive an exclusive 20% discount across the full Helios range. Use at checkout online or in store.', type: 'Promo code', code: 'INSCAPE20', badge: 'MEMBER EXCLUSIVE', accent: '#FF8000' },
];

export default function Offers({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>
        <h1 style={{ font: '700 32px/1 Inter', color: '#fff', margin: '0 0 6px', letterSpacing: '-.02em' }}>Partner Offers</h1>
        <p style={{ font: '400 14px Inter', color: '#707070', margin: '0 0 28px' }}>Exclusive deals for InScape members.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {OFFERS.map(o => (
            <div key={o.brand} style={{ background: '#0a0c0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div style={{ height: 8, background: `linear-gradient(90deg,${o.accent}40,transparent)` }} />
              <div style={{ padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ font: '600 11px Inter', letterSpacing: '.08em', color: o.accent, textTransform: 'uppercase' }}>{o.category}</span>
                      {o.badge && <span style={{ font: '700 10px Inter', color: '#050505', background: '#FF8000', borderRadius: 6, padding: '2px 7px' }}>{o.badge}</span>}
                    </div>
                    <div style={{ font: '600 13px Inter', color: '#707070' }}>{o.brand}</div>
                    <h2 style={{ font: '600 18px/1.2 Inter', color: '#fff', margin: '4px 0 0' }}>{o.title}</h2>
                  </div>
                </div>
                <p style={{ font: '400 14px/1.65 Inter', color: '#A3A3A3', margin: '0 0 18px' }}>{o.body}</p>
                {o.code ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,128,0,0.07)', border: '1px solid rgba(255,128,0,0.25)', borderRadius: 10, padding: '10px 16px' }}>
                      <span style={{ font: '600 16px Inter', color: '#FF8000', letterSpacing: '.05em' }}>{o.code}</span>
                    </div>
                    <button style={{ height: 42, padding: '0 18px', borderRadius: 10, background: '#FF8000', border: 'none', cursor: 'pointer', font: '600 13px Inter', color: '#050505' }}>Copy code</button>
                  </div>
                ) : (
                  <button style={{ height: 42, padding: '0 22px', borderRadius: 10, background: 'rgba(71,199,252,0.1)', border: '1px solid rgba(71,199,252,0.3)', cursor: 'pointer', font: '600 13px Inter', color: '#47C7FC' }}>Open offer →</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <p style={{ font: '400 12px/1.6 Inter', color: '#3a3f47', marginTop: 24 }}>
          Partner offers are provided by third-party brands. InScape is not responsible for offer availability or terms. Offers are exclusive to current InScape members.
        </p>
      </div>
    </div>
  );
}
