import { useBreakpoint } from '../hooks/useBreakpoint';

const NOTIFS = [
  { type: 'momentum', time: 'Just now', title: 'Monthly Momentum +25', body: 'You hit 75% — 25 bonus credits added to your wallet.', dot: '#47C7FC', fresh: true },
  { type: 'campaign', time: '2h ago', title: 'Maldives Escape closes in 9h', body: 'You have 4 allocations in. Final chance to add more credits.', dot: '#F0B43C', fresh: false },
  { type: 'winner', time: '1d ago', title: 'Range Rover Sport — winner announced', body: 'Congratulations to Sarah M. from London. Better luck next campaign!', dot: '#5BD08A', fresh: false },
  { type: 'referral', time: '3d ago', title: 'Sam R. qualified — +40 Momentum earned', body: 'Your referral completed their first purchase. Reward posted to wallet.', dot: '#FF8000', fresh: false },
  { type: 'membership', time: '5d ago', title: '+120 credits added', body: 'Your Premium membership allocation for June has been posted.', dot: '#FF8000', fresh: false },
];

export default function Notifications({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <button onClick={() => onNavigate('dashboard')} style={{ width: 38, height: 38, borderRadius: '50%', background: '#111418', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <h1 style={{ font: '700 28px/1 Inter', color: '#fff', margin: 0, letterSpacing: '-.02em' }}>Notifications</h1>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {NOTIFS.map((n, i) => (
            <div key={i} style={{ background: n.fresh ? 'rgba(71,199,252,0.04)' : '#0a0c0f', border: `1px solid ${n.fresh ? 'rgba(71,199,252,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 16, padding: '16px 18px', display: 'flex', gap: 14, transition: 'background 0.15s' }}
              onMouseEnter={e => { if (!n.fresh) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
              onMouseLeave={e => { if (!n.fresh) e.currentTarget.style.background = '#0a0c0f'; }}
            >
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: n.dot, flexShrink: 0, marginTop: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ font: '600 14px Inter', color: '#fff', flex: 1 }}>{n.title}</div>
                  <div style={{ font: '400 11px Inter', color: '#4a4f57', flexShrink: 0, whiteSpace: 'nowrap' }}>{n.time}</div>
                </div>
                <div style={{ font: '400 13px/1.55 Inter', color: '#A3A3A3', marginTop: 4 }}>{n.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
