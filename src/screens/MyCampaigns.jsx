import StatusBar from '../components/StatusBar';
import TabBar from '../components/TabBar';

const active = [
  { title: 'Range Rover Sport', category: 'Vehicles', prize: '£92,000', yours: 2, cr: 1, closes: '2d 14h', status: 'LIVE', statusColor: '#FF8000', gradient: 'radial-gradient(120% 90% at 30% 15%, #20242a, #0c0e11)' },
  { title: '7 Nights, Maldives', category: 'Travel', prize: '£18,500', yours: 4, cr: 2, closes: '9h 40m', status: 'CLOSING SOON', statusColor: '#F0B43C', gradient: 'radial-gradient(120% 90% at 70% 15%, #23211c, #0c0e11)' },
];
const past = [
  { title: 'Tesla Model 3', category: 'Vehicles', prize: '£42,000', yours: 1, result: 'Did not win', closes: 'Ended May 15' },
  { title: 'NYC Weekend Break', category: 'Travel', prize: '£3,200', yours: 3, result: 'Did not win', closes: 'Ended Apr 28' },
];

export default function MyCampaigns({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <StatusBar />

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 78, overflowY: 'auto', zIndex: 10, scrollbarWidth: 'none' }}>
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ font: '700 28px/1 Inter', color: '#fff', letterSpacing: '-.02em' }}>My Campaigns</div>
          <div style={{ font: '400 13px Inter', color: '#A3A3A3', marginTop: 5 }}>Your active and past participations.</div>
        </div>

        {/* Active */}
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ font: '600 12px Inter', letterSpacing: '.1em', textTransform: 'uppercase', color: '#FF8000', marginBottom: 12 }}>Active · {active.length}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {active.map(c => (
              <div key={c.title} onClick={() => onNavigate('campaign-detail')} style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: 100, background: c.gradient, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 12, top: 12, font: '600 9px Inter', letterSpacing: '.06em', color: c.statusColor, background: 'rgba(5,5,5,0.6)', border: `1px solid ${c.statusColor}40`, borderRadius: 6, padding: '3px 7px' }}>{c.status}</span>
                  <span style={{ position: 'absolute', right: 12, top: 12, font: '600 10px Inter', color: c.statusColor, background: 'rgba(5,5,5,0.6)', borderRadius: 6, padding: '3px 7px' }}>{c.closes} left</span>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ font: '500 10px Inter', color: '#707070' }}>{c.category} · {c.prize}</div>
                  <div style={{ font: "600 20px/1.05 'Cormorant Garamond',serif", color: '#fff', marginTop: 2 }}>{c.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ font: '600 12px Inter', color: '#A3A3A3' }}>Your allocations: <span style={{ color: '#FF8000' }}>{c.yours}</span></div>
                    <div style={{ font: '500 11px Inter', color: '#707070' }}>{c.cr} cr each</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past */}
        <div style={{ padding: '22px 20px 30px' }}>
          <div style={{ font: '600 12px Inter', letterSpacing: '.1em', textTransform: 'uppercase', color: '#707070', marginBottom: 12 }}>Past · {past.length}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {past.map(c => (
              <div key={c.title} style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#111418', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ font: "600 14px/1 'Cormorant Garamond',serif", color: '#A3A3A3' }}>{c.title}</div>
                  <div style={{ font: '400 11px Inter', color: '#4a4f57', marginTop: 3 }}>{c.closes} · {c.yours} allocations</div>
                </div>
                <div style={{ font: '500 11px Inter', color: '#4a4f57' }}>{c.result}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TabBar active="campaigns" onNavigate={onNavigate} />
    </div>
  );
}
