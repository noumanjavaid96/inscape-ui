import StatusBar from '../components/StatusBar';

const notifs = [
  { type: 'momentum', time: 'Just now', title: 'Monthly Momentum +25', body: 'You hit 75% — 25 bonus credits added to your wallet.', color: '#47C7FC', dot: '#47C7FC' },
  { type: 'campaign', time: '2h ago', title: 'Maldives Escape closes in 9h', body: 'You have 4 allocations in. Final chance to add more credits.', color: '#F0B43C', dot: '#F0B43C' },
  { type: 'winner', time: '1d ago', title: 'Range Rover Sport — winner announced', body: 'Congratulations to Sarah M. from London. Better luck next campaign!', color: '#A3A3A3', dot: '#5BD08A' },
  { type: 'referral', time: '3d ago', title: 'Sam R. qualified — +40 Momentum earned', body: 'Your referral completed their first purchase. Reward posted to wallet.', color: '#A3A3A3', dot: '#FF8000' },
  { type: 'membership', time: '5d ago', title: '+120 credits added', body: 'Your Premium membership allocation for June has been posted.', color: '#A3A3A3', dot: '#FF8000' },
];

const dotColors = { momentum: '#47C7FC', campaign: '#F0B43C', winner: '#5BD08A', referral: '#FF8000', membership: '#FF8000' };

export default function Notifications({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <StatusBar />

      <button onClick={() => onNavigate('dashboard')} style={{ position: 'absolute', top: 54, left: 18, zIndex: 30, width: 38, height: 38, borderRadius: '50%', background: '#111418', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 0, overflowY: 'auto', zIndex: 10, scrollbarWidth: 'none' }}>
        <div style={{ padding: '62px 20px 0' }}>
          <div style={{ font: '700 28px/1 Inter', color: '#fff', letterSpacing: '-.02em' }}>Notifications</div>
          <div style={{ font: '400 13px Inter', color: '#A3A3A3', marginTop: 5 }}>Campaigns, rewards & account updates.</div>
        </div>

        <div style={{ padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {notifs.map((n, i) => (
            <div key={i} style={{ background: i === 0 ? 'rgba(71,199,252,0.05)' : '#0d0f12', border: `1px solid ${i === 0 ? 'rgba(71,199,252,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 16, padding: '14px 15px', display: 'flex', gap: 12 }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: dotColors[n.type], flexShrink: 0, marginTop: 5 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ font: '600 14px Inter', color: '#fff', flex: 1 }}>{n.title}</div>
                  <div style={{ font: '400 11px Inter', color: '#4a4f57', flexShrink: 0 }}>{n.time}</div>
                </div>
                <div style={{ font: '400 12.5px/1.5 Inter', color: '#A3A3A3', marginTop: 4 }}>{n.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
