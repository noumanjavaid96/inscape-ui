import StatusBar from '../components/StatusBar';

const packages = [
  { id: 'bronze', short: 'Br', label: 'Bronze', credits: '1 credit', price: '$2', color: '#9a7b52', bg: '#1a1c1e', selected: false, badge: null },
  { id: 'silver', short: 'Si', label: 'Silver', credits: '8 credits', price: '$10', color: '#b8bcc2', bg: '#1c1e21', selected: false, badge: null },
  { id: 'gold', short: 'Go', label: 'Gold', credits: '30 credits · best for one campaign run', price: '$30', color: '#FF8000', bg: '#23200f', selected: true, badge: null },
  { id: 'platinum', short: 'Pt', label: 'Platinum', credits: '120 credits', price: '$100', color: '#cfd4db', bg: '#1c1e22', selected: false, badge: 'BEST VALUE' },
  { id: 'diamond', short: 'Di', label: 'Diamond', credits: '300 credits', price: '$200', color: '#a9d4e8', bg: '#1b1f23', selected: false, badge: null },
];

export default function Boost({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <StatusBar />

      {/* Back */}
      <button onClick={() => onNavigate('wallet')} style={{ position: 'absolute', top: 54, left: 18, zIndex: 30, width: 38, height: 38, borderRadius: '50%', background: '#111418', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 92, overflowY: 'auto', zIndex: 10, scrollbarWidth: 'none' }}>
        <div style={{ padding: '54px 20px 0' }}>
          <div style={{ font: '700 27px/1.05 Inter', color: '#fff', letterSpacing: '-.02em' }}>Boost Credits</div>
          <div style={{ font: '400 13.5px/1.5 Inter', color: '#A3A3A3', marginTop: 7 }}>One-time Campaign Access. Buy credits instantly — no subscription required.</div>
        </div>

        <div style={{ padding: '18px 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {packages.map(p => (
            <div key={p.id} style={{
              display: 'flex', alignItems: 'center', gap: 13,
              background: p.selected ? 'rgba(255,128,0,0.08)' : '#0d0f12',
              border: p.selected ? '1.5px solid #FF8000' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '13px 15px', position: 'relative', cursor: 'pointer',
            }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 11px Inter', color: p.color }}>{p.short}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ font: '600 15px Inter', color: '#fff' }}>{p.label}</span>
                  {p.badge && (
                    <span style={{ font: '600 9px Inter', letterSpacing: '.05em', color: '#47C7FC', background: 'rgba(71,199,252,0.12)', border: '1px solid rgba(71,199,252,0.3)', borderRadius: 5, padding: '2px 5px' }}>{p.badge}</span>
                  )}
                </div>
                <div style={{ font: '400 11.5px Inter', color: p.selected ? '#A3A3A3' : '#707070' }}>{p.credits}</div>
              </div>
              <div style={{ font: '600 15px Inter', color: '#fff' }}>{p.price}</div>
              {p.selected && (
                <span style={{ position: 'absolute', top: -9, right: 14, width: 20, height: 20, borderRadius: '50%', background: '#FF8000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4.5 4.5L19 7" stroke="#050505" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </div>
          ))}

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginTop: 6, padding: '0 2px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="9" stroke="#707070" strokeWidth="1.5"/>
              <path d="M12 11v5M12 8h.01" stroke="#707070" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            <span style={{ font: '400 11.5px/1.5 Inter', color: '#707070' }}>One-time purchases deliver credits only. They don't include member-only Monthly Momentum or benefits.</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '13px 20px 20px', background: 'linear-gradient(0deg,#050505 72%,transparent)', zIndex: 20 }}>
        <button style={{ height: 54, borderRadius: 14, background: '#FF8000', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 10px 26px rgba(255,128,0,0.28)', border: 'none', cursor: 'pointer' }}>
          <span style={{ font: '600 16px Inter', color: '#050505' }}>Continue</span>
          <span style={{ font: '500 14px Inter', color: 'rgba(5,5,5,0.7)' }}>·  $30 → 30 credits</span>
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 124, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.28)', zIndex: 25 }} />
    </div>
  );
}
