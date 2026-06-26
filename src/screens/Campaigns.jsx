import StatusBar from '../components/StatusBar';
import TabBar from '../components/TabBar';

const campaigns = [
  {
    id: 1, status: 'LIVE', statusColor: '#FF8000', statusBorder: 'rgba(255,128,0,0.4)',
    timeLeft: '2d 14h left', timeColor: '#fff',
    gradient: 'radial-gradient(120% 90% at 30% 15%, #20242a 0%, #0c0e11 72%)',
    category: 'Vehicles', prize: '£92,000', title: 'Range Rover Sport', cr: 1,
    imgLabel: 'IMAGE · Range Rover hero',
  },
  {
    id: 2, status: 'CLOSING SOON', statusColor: '#F0B43C', statusBorder: 'rgba(240,180,60,0.4)',
    timeLeft: '9h 40m left', timeColor: '#F0B43C',
    gradient: 'radial-gradient(120% 90% at 70% 15%, #23211c 0%, #0c0e11 72%)',
    category: 'Travel', prize: '£18,500', title: '7 Nights, Maldives', cr: 2,
    imgLabel: 'IMAGE · Maldives villa',
  },
];

const FILTERS = ['All', 'Travel', 'Vehicles', 'Tech', 'Cash'];
const TABS = ['Live', 'Upcoming', 'Closed'];

export default function Campaigns({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <StatusBar />

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 78, overflowY: 'auto', zIndex: 10, scrollbarWidth: 'none' }}>
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ font: '700 28px/1 Inter', color: '#fff', letterSpacing: '-.02em' }}>Campaigns</div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#111418', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6.5" stroke="#fff" strokeWidth="1.7"/>
                <path d="M16 16l4 4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {FILTERS.map((f, i) => (
              <div key={f} style={{
                font: `${i === 0 ? 600 : 500} 12px Inter`,
                color: i === 0 ? '#050505' : '#A3A3A3',
                background: i === 0 ? '#FF8000' : '#111418',
                border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 9, padding: '8px 13px', whiteSpace: 'nowrap', cursor: 'pointer',
              }}>{f}</div>
            ))}
          </div>

          {/* Live/Upcoming/Closed toggle */}
          <div style={{ display: 'flex', marginTop: 14, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 11, padding: 4 }}>
            {TABS.map((t, i) => (
              <div key={t} style={{
                flex: 1, textAlign: 'center',
                font: `${i === 0 ? 600 : 500} 12px Inter`,
                color: i === 0 ? '#fff' : '#707070',
                background: i === 0 ? '#22262c' : 'transparent',
                borderRadius: 8, padding: '8px 0', cursor: 'pointer',
              }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px 30px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {campaigns.map(c => (
            <div key={c.id} onClick={() => onNavigate('campaign-detail')}
              style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 150, background: c.gradient, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: 12, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(5,5,5,0.55)', border: `1px solid ${c.statusBorder}`, borderRadius: 8, padding: '5px 9px' }}>
                  {c.status === 'LIVE' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF8000', animation: 'livePulse 2s ease-in-out infinite' }} />}
                  <span style={{ font: '600 10px Inter', letterSpacing: '.06em', color: c.statusColor }}>{c.status}</span>
                </span>
                <span style={{ position: 'absolute', right: 12, top: 12, font: '600 11px Inter', color: c.timeColor, background: 'rgba(5,5,5,0.55)', borderRadius: 8, padding: '5px 9px' }}>{c.timeLeft}</span>
                <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 54, background: 'linear-gradient(0deg,rgba(5,5,5,0.85),transparent)' }} />
                <span style={{ position: 'absolute', left: 12, bottom: 9, font: "500 9px 'JetBrains Mono', monospace", letterSpacing: '.05em', color: '#5a6068' }}>{c.imgLabel}</span>
              </div>
              <div style={{ padding: '14px 15px 15px' }}>
                <div style={{ font: '500 11px Inter', color: '#707070' }}>{c.category} · Prize value {c.prize}</div>
                <div style={{ font: "600 23px/1.05 'Cormorant Garamond',serif", color: '#fff', marginTop: 4 }}>{c.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, paddingTop: 13, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid #FF8000' }} />
                    <span style={{ font: '600 13px Inter', color: '#fff' }}>{c.cr} <span style={{ color: '#707070', fontWeight: 500 }}>credit / allocation</span></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 13px Inter', color: '#FF8000' }}>
                    Allocate
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 5l7 7-7 7" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="campaigns" onNavigate={onNavigate} />
    </div>
  );
}
