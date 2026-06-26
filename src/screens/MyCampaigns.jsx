import { useBreakpoint } from '../hooks/useBreakpoint';

const ACTIVE = [
  { title: 'Range Rover Sport', category: 'Vehicles', prize: '£92,000', yours: 2, cr: 1, closes: '2d 14h', status: 'LIVE', statusColor: '#FF8000', gradient: 'linear-gradient(135deg,#1a2030,#0c1018)' },
  { title: '7 Nights, Maldives', category: 'Travel', prize: '£18,500', yours: 4, cr: 2, closes: '9h 40m', status: 'CLOSING SOON', statusColor: '#F0B43C', gradient: 'linear-gradient(135deg,#1a1e28,#0c0e18)' },
];
const PAST = [
  { title: 'Tesla Model 3', category: 'Vehicles', prize: '£42,000', yours: 1, result: 'Did not win', date: 'Ended May 15' },
  { title: 'NYC Weekend Break', category: 'Travel', prize: '£3,200', yours: 3, result: 'Did not win', date: 'Ended Apr 28' },
];

export default function MyCampaigns({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>
        <h1 style={{ font: '700 32px/1 Inter', color: '#fff', margin: '0 0 6px', letterSpacing: '-.02em' }}>My Campaigns</h1>
        <p style={{ font: '400 14px Inter', color: '#707070', margin: '0 0 32px' }}>Your active and past participations.</p>

        {/* Active */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ font: '600 11px Inter', letterSpacing: '.12em', textTransform: 'uppercase', color: '#FF8000', marginBottom: 14 }}>Active · {ACTIVE.length}</div>
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(2,1fr)' : '1fr', gap: 16 }}>
            {ACTIVE.map(c => (
              <div key={c.title} onClick={() => onNavigate('campaign-detail')} style={{ background: '#0a0c0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ height: 110, background: c.gradient, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(5,5,5,0.65)', border: `1px solid ${c.statusColor}40`, borderRadius: 8, padding: '4px 9px' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.statusColor, animation: c.status === 'LIVE' ? 'livePulse 2s ease-in-out infinite' : 'none' }} />
                    <span style={{ font: '600 9px Inter', color: c.statusColor, letterSpacing: '.08em' }}>{c.status}</span>
                  </div>
                  <div style={{ position: 'absolute', right: 12, top: 12, font: '500 11px Inter', color: c.statusColor, background: 'rgba(5,5,5,0.65)', borderRadius: 7, padding: '4px 8px' }}>{c.closes} left</div>
                </div>
                <div style={{ padding: '14px 16px 16px' }}>
                  <div style={{ font: '400 11px Inter', color: '#707070' }}>{c.category} · {c.prize}</div>
                  <div style={{ font: "600 20px/1.05 'Cormorant Garamond',serif", color: '#fff', marginTop: 3 }}>{c.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ font: '600 13px Inter', color: '#A3A3A3' }}>Your allocations: <span style={{ color: '#FF8000' }}>{c.yours}</span></span>
                    <span style={{ font: '500 12px Inter', color: '#707070' }}>{c.cr} cr each</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past */}
        <div>
          <div style={{ font: '600 11px Inter', letterSpacing: '.12em', textTransform: 'uppercase', color: '#707070', marginBottom: 14 }}>Past · {PAST.length}</div>
          <div style={{ background: '#0a0c0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, overflow: 'hidden' }}>
            {PAST.map((c, i) => (
              <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderBottom: i < PAST.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#15181d', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ font: '500 14px Inter', color: '#A3A3A3' }}>{c.title}</div>
                  <div style={{ font: '400 12px Inter', color: '#4a4f57', marginTop: 2 }}>{c.date} · {c.yours} allocation{c.yours > 1 ? 's' : ''}</div>
                </div>
                <span style={{ font: '500 12px Inter', color: '#4a4f57' }}>{c.result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
