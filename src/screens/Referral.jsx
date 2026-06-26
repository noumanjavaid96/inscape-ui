import StatusBar from '../components/StatusBar';

const invites = [
  { initial: 'S', name: 'Sam R.', status: 'Joined · membership active', badge: '+40 ✓', badgeColor: '#47C7FC', badgeBg: 'rgba(71,199,252,0.1)', badgeBorder: 'rgba(71,199,252,0.28)' },
  { initial: 'J', name: 'Jordan P.', status: 'Signed up · awaiting first purchase', badge: 'Pending', badgeColor: '#707070', badgeBg: '#15181d', badgeBorder: 'rgba(255,255,255,0.1)' },
];

export default function Referral({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: 0, left: -40, right: -40, height: 280, background: 'radial-gradient(50% 60% at 50% 0%, rgba(71,199,252,0.13), rgba(71,199,252,0) 72%)', zIndex: 0 }} />
      <StatusBar />

      <button onClick={() => onNavigate('dashboard')} style={{ position: 'absolute', top: 54, left: 18, zIndex: 30, width: 38, height: 38, borderRadius: '50%', background: 'rgba(17,20,24,0.7)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 0, overflowY: 'auto', zIndex: 10, scrollbarWidth: 'none' }}>
        <div style={{ padding: '54px 22px 24px' }}>
          <div style={{ font: "600 30px/1.02 'Cormorant Garamond',serif", color: '#fff' }}>Give friends a head start</div>
          <div style={{ font: '400 13.5px/1.55 Inter', color: '#A3A3A3', marginTop: 8 }}>
            Earn <span style={{ color: '#47C7FC', fontWeight: 600 }}>+40 Momentum</span> and bonus credits when a friend qualifies.
          </div>

          {/* Code card */}
          <div style={{ marginTop: 20, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 16 }}>
            <div style={{ font: '500 11px Inter', letterSpacing: '.1em', textTransform: 'uppercase', color: '#707070' }}>Your referral code</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <span style={{ font: "700 26px 'JetBrains Mono', monospace", color: '#fff', letterSpacing: '.06em' }}>ALEX-7K2P</span>
              <span style={{ width: 38, height: 38, borderRadius: 11, background: '#15181d', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <rect x="8" y="8" width="12" height="12" rx="2" stroke="#FF8000" strokeWidth="1.6"/>
                  <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="#FF8000" strokeWidth="1.6"/>
                </svg>
              </span>
            </div>
            <button style={{ height: 46, borderRadius: 12, background: '#FF8000', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14, border: 'none', cursor: 'pointer' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M12 4v11m0-11 4 4m-4-4-4 4M5 20h14" stroke="#050505" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ font: '600 15px Inter', color: '#050505' }}>Share invite link</span>
            </button>
          </div>

          {/* Legal note */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginTop: 16, padding: '0 2px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="9" stroke="#707070" strokeWidth="1.5"/>
              <path d="M12 11v5M12 8h.01" stroke="#707070" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            <span style={{ font: '400 11.5px/1.5 Inter', color: '#707070' }}>Rewards unlock after a friend's first paid membership or purchase. Anti-fraud checks apply; self-referrals don't qualify.</span>
          </div>

          {/* Invite status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 22 }}>
            <div style={{ font: '600 15px Inter', color: '#fff' }}>Your invites</div>
            <div style={{ font: '500 12px Inter', color: '#707070' }}>4 invited · 1 qualified</div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {invites.map(inv => (
              <div key={inv.name} style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 13, padding: '12px 14px' }}>
                <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#1c1f24', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 13px Inter', color: '#A3A3A3' }}>{inv.initial}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ font: '600 13.5px Inter', color: '#fff' }}>{inv.name}</div>
                  <div style={{ font: '400 11px Inter', color: '#707070' }}>{inv.status}</div>
                </div>
                <span style={{ font: '600 12px Inter', color: inv.badgeColor, background: inv.badgeBg, border: `1px solid ${inv.badgeBorder}`, borderRadius: 7, padding: '4px 9px' }}>{inv.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 124, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.28)', zIndex: 25 }} />
    </div>
  );
}
