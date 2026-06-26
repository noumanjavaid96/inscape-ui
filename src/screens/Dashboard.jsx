import { useBreakpoint } from '../hooks/useBreakpoint';

const ACTIVE_CAMPAIGNS = [
  { title: 'Range Rover Sport', category: 'Vehicles', prize: '£92,000', badge: 'LIVE', badgeColor: '#FF8000', closes: '2d 14h', your: 2, cr: 1, gradient: 'linear-gradient(135deg,#1a2030,#0c1018)', glow: 'rgba(255,128,0,0.1)' },
  { title: 'Maldives Escape', category: 'Travel', prize: '£18,500', badge: 'CLOSING SOON', badgeColor: '#F0B43C', closes: '9h 40m', your: 4, cr: 2, gradient: 'linear-gradient(135deg,#1a1e28,#0c0e18)', glow: 'rgba(240,180,60,0.1)' },
];

const TRANSACTIONS = [
  { label: 'Monthly allocation', detail: 'Premium · June', amount: '+120', color: '#5BD08A', icon: '↓' },
  { label: 'Range Rover allocation', detail: '2 credits spent', amount: '-2', color: '#FF8000', icon: '↑' },
  { label: 'Momentum reward', detail: '50% milestone', amount: '+20', color: '#47C7FC', icon: '⚡' },
];

export default function Dashboard({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: '#050505', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div style={{ font: '400 14px Inter', color: '#707070' }}>Good evening</div>
            <h1 style={{ font: '600 28px/1.1 Inter', color: '#fff', margin: '4px 0 0', letterSpacing: '-.01em' }}>Alex Mercer</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => onNavigate('notifications')} style={{ width: 42, height: 42, borderRadius: '50%', background: '#111418', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 19a2 2 0 0 0 4 0" stroke="#fff" strokeWidth="1.6"/></svg>
              <span style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: '50%', background: '#FF8000', border: '1.5px solid #050505' }} />
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 340px' : '1fr', gap: 24 }}>

          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Balance hero card */}
            <div style={{ background: 'linear-gradient(160deg,#13161b,#0a0c0f)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 24, padding: isDesktop ? '28px 32px' : '22px 22px', boxShadow: '0 20px 48px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: 'radial-gradient(50% 50%, rgba(255,128,0,0.08), transparent)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ font: '500 12px Inter', letterSpacing: '.1em', textTransform: 'uppercase', color: '#707070' }}>Available balance</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginTop: 8 }}>
                    <span style={{ font: '700 56px/0.9 Inter', color: '#fff', letterSpacing: '-.03em' }}>124</span>
                    <span style={{ font: '500 16px Inter', color: '#707070', paddingBottom: 8 }}>credits</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,128,0,0.12)', border: '1px solid rgba(255,128,0,0.3)', borderRadius: 20, padding: '5px 11px', flexShrink: 0 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF8000' }} />
                  <span style={{ font: '600 12px Inter', color: '#FF8000' }}>Premium</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 24, marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div>
                  <div style={{ font: '400 12px Inter', color: '#4a4f57' }}>Allocated</div>
                  <div style={{ font: '600 16px Inter', color: '#fff', marginTop: 2 }}>6 cr</div>
                </div>
                <div>
                  <div style={{ font: '400 12px Inter', color: '#4a4f57' }}>Bonus earned</div>
                  <div style={{ font: '600 16px Inter', color: '#5BD08A', marginTop: 2 }}>+20 cr</div>
                </div>
                <div>
                  <div style={{ font: '400 12px Inter', color: '#4a4f57' }}>Next allocation</div>
                  <div style={{ font: '600 16px Inter', color: '#fff', marginTop: 2 }}>12 days</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button onClick={() => onNavigate('boost')} style={{ flex: 1, height: 46, borderRadius: 13, background: '#FF8000', border: 'none', cursor: 'pointer', font: '600 14px Inter', color: '#050505', boxShadow: '0 6px 20px rgba(255,128,0,0.3)', transition: 'transform 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >Boost credits</button>
                <button onClick={() => onNavigate('wallet')} style={{ height: 46, padding: '0 18px', borderRadius: 13, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', font: '600 14px Inter', color: '#fff' }}>Wallet</button>
              </div>
            </div>

            {/* Active campaigns */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ font: '600 18px Inter', color: '#fff', margin: 0 }}>Your campaigns</h2>
                <button onClick={() => onNavigate('my-campaigns')} style={{ font: '500 13px Inter', color: '#FF8000', background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(2,1fr)' : isMobile ? 'repeat(2,1fr)' : 'repeat(2,1fr)', gap: 14 }}>
                {ACTIVE_CAMPAIGNS.map(c => (
                  <div key={c.title} onClick={() => onNavigate('campaign-detail')} style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  >
                    <div style={{ height: 88, background: c.gradient, position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(5,5,5,0.7)', border: `1px solid ${c.badgeColor}40`, borderRadius: 7, padding: '3px 8px' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.badgeColor, animation: c.badge === 'LIVE' ? 'livePulse 2s ease-in-out infinite' : 'none' }} />
                        <span style={{ font: '600 9px Inter', color: c.badgeColor, letterSpacing: '.07em' }}>{c.badge}</span>
                      </div>
                    </div>
                    <div style={{ padding: '12px 14px 14px' }}>
                      <div style={{ font: '400 11px Inter', color: '#707070' }}>{c.category} · {c.prize}</div>
                      <div style={{ font: "600 17px/1.1 'Cormorant Garamond',serif", color: '#fff', marginTop: 3 }}>{c.title}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 9, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <span style={{ font: '600 12px Inter', color: '#A3A3A3' }}>Yours: <span style={{ color: '#FF8000' }}>{c.your}</span></span>
                        <span style={{ font: '500 11px Inter', color: '#707070' }}>{c.closes} left</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browse more */}
            <button onClick={() => onNavigate('campaigns')} style={{ height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', font: '500 14px Inter', color: '#A3A3A3', transition: 'background 0.15s, border-color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >Browse all live campaigns →</button>
          </div>

          {/* Right column — desktop only */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Momentum */}
            <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ font: '600 15px Inter', color: '#fff', margin: 0 }}>Monthly Momentum</h3>
                <span style={{ font: '700 15px Inter', color: '#47C7FC' }}>62%</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: '#191c20', overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ width: '62%', height: '100%', background: 'linear-gradient(90deg,#47C7FC,#7ad8ff)', borderRadius: 4 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ font: '400 12px Inter', color: '#707070' }}>Next: <span style={{ color: '#fff' }}>+25 cr</span> at 75%</span>
                <span style={{ font: '400 12px Inter', color: '#4a4f57' }}>Resets 14d</span>
              </div>
              {/* Milestones */}
              <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
                {[25, 50, 75, 100].map(m => (
                  <div key={m} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ height: 3, borderRadius: 2, background: m <= 62 ? '#47C7FC' : '#1a1e25', marginBottom: 5 }} />
                    <span style={{ font: '500 10px Inter', color: m <= 62 ? '#47C7FC' : '#3a3f47' }}>{m}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 22 }}>
              <h3 style={{ font: '600 15px Inter', color: '#fff', margin: '0 0 14px' }}>Quick actions</h3>
              {[
                { label: 'Allocate credits', sub: 'Browse campaigns', action: 'campaigns', icon: '◎' },
                { label: 'View wallet', sub: '124 credits', action: 'wallet', icon: '◑' },
                { label: 'Referral centre', sub: '4 invited · 1 qualified', action: 'referral', icon: '◈' },
                { label: 'Partner offers', sub: '2 exclusive deals', action: 'offers', icon: '✦' },
              ].map(a => (
                <button key={a.label} onClick={() => onNavigate(a.action)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'none', border: 'none', padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#15181d', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '500 16px Inter', color: '#FF8000', flexShrink: 0 }}>{a.icon}</div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ font: '500 13px Inter', color: '#fff' }}>{a.label}</div>
                    <div style={{ font: '400 11px Inter', color: '#4a4f57', marginTop: 1 }}>{a.sub}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="#3a3f47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              ))}
            </div>

            {/* Recent activity */}
            <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 22 }}>
              <h3 style={{ font: '600 15px Inter', color: '#fff', margin: '0 0 14px' }}>Recent activity</h3>
              {TRANSACTIONS.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: '#15181d', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '14px Inter', color: t.color, flexShrink: 0 }}>{t.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ font: '500 13px Inter', color: '#fff' }}>{t.label}</div>
                    <div style={{ font: '400 11px Inter', color: '#4a4f57', marginTop: 1 }}>{t.detail}</div>
                  </div>
                  <span style={{ font: '600 13px Inter', color: t.color }}>{t.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
