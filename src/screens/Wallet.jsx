import { useBreakpoint } from '../hooks/useBreakpoint';

const TX = [
  { icon: '↓', label: 'Monthly Premium allocation', detail: 'June 1, 2026', amount: '+120', color: '#5BD08A' },
  { icon: '↑', label: 'Range Rover allocation', detail: 'May 30, 2026', amount: '-2', color: '#FF8000' },
  { icon: '⚡', label: 'Momentum reward · 50%', detail: 'May 28, 2026', amount: '+20', color: '#47C7FC' },
  { icon: '↑', label: 'Maldives allocation', detail: 'May 22, 2026', amount: '-4', color: '#FF8000' },
  { icon: '↓', label: 'Referral reward — Sam R.', detail: 'May 20, 2026', amount: '+40', color: '#5BD08A' },
];

export default function Wallet({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>
        <h1 style={{ font: '700 32px/1 Inter', color: '#fff', margin: '0 0 6px', letterSpacing: '-.02em' }}>Wallet</h1>
        <p style={{ font: '400 14px Inter', color: '#707070', margin: '0 0 28px' }}>Credits, history and top-ups</p>

        {/* Balance card */}
        <div style={{ background: 'linear-gradient(160deg,#13161b,#0a0c0f)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 22, padding: '28px 28px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(50% 50%, rgba(255,128,0,0.08), transparent)', pointerEvents: 'none' }} />
          <div style={{ font: '500 12px Inter', letterSpacing: '.1em', textTransform: 'uppercase', color: '#707070', marginBottom: 8 }}>Available balance</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 20 }}>
            <span style={{ font: '700 52px/0.9 Inter', color: '#fff', letterSpacing: '-.03em' }}>124</span>
            <span style={{ font: '500 16px Inter', color: '#707070', paddingBottom: 7 }}>credits</span>
          </div>
          <div style={{ display: 'flex', gap: isDesktop ? 24 : 16, marginBottom: 22, flexWrap: 'wrap' }}>
            {[['Allocated', '6 cr', '#fff'], ['Bonus earned', '+20 cr', '#5BD08A'], ['Total used', '6 cr', '#fff']].map(([l, v, c]) => (
              <div key={l}>
                <div style={{ font: '400 11px Inter', color: '#4a4f57' }}>{l}</div>
                <div style={{ font: '600 15px Inter', color: c, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => onNavigate('boost')} style={{ flex: 1, height: 46, borderRadius: 12, background: '#FF8000', border: 'none', cursor: 'pointer', font: '600 14px Inter', color: '#050505', boxShadow: '0 6px 18px rgba(255,128,0,0.3)' }}>Boost credits</button>
            <button onClick={() => onNavigate('membership')} style={{ flex: 1, height: 46, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', font: '600 14px Inter', color: '#fff' }}>Membership</button>
          </div>
        </div>

        {/* Transaction list */}
        <div style={{ background: '#0a0c0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{ font: '600 16px Inter', color: '#fff', margin: 0 }}>Transaction history</h2>
          </div>
          {TX.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 22px', borderBottom: i < TX.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#15181d', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '500 16px Inter', color: t.color, flexShrink: 0 }}>{t.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '500 14px Inter', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.label}</div>
                <div style={{ font: '400 12px Inter', color: '#4a4f57', marginTop: 2 }}>{t.detail}</div>
              </div>
              <span style={{ font: '700 15px Inter', color: t.color, flexShrink: 0 }}>{t.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
