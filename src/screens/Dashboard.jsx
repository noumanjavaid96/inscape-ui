import StatusBar from '../components/StatusBar';
import TabBar from '../components/TabBar';

export default function Dashboard({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <StatusBar />

      <div style={{
        position: 'absolute', top: 46, left: 0, right: 0, bottom: 78,
        overflowY: 'auto', zIndex: 10,
        msOverflowStyle: 'none', scrollbarWidth: 'none',
      }}>
        <style>{`.scroll-hide::-webkit-scrollbar{display:none}`}</style>
        <div className="scroll-hide" style={{ padding: '8px 20px 20px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ font: '400 13px Inter', color: '#707070' }}>Good evening</div>
              <div style={{ font: '600 20px/1.1 Inter', color: '#fff', marginTop: 2 }}>Alex Mercer</div>
            </div>
            <div style={{ position: 'relative', width: 40, height: 40, borderRadius: '50%', background: '#111418', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M10 19a2 2 0 0 0 4 0" stroke="#fff" strokeWidth="1.6"/>
              </svg>
              <span style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: '50%', background: '#FF8000', border: '1.5px solid #050505' }} />
            </div>
          </div>

          {/* Balance hero */}
          <div style={{
            marginTop: 18,
            background: 'linear-gradient(160deg, #15181d, #0c0e11)',
            border: '1px solid rgba(255,255,255,0.09)', borderRadius: 20, padding: 20,
            boxShadow: '0 14px 30px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ font: '500 12px/1 Inter', letterSpacing: '.1em', textTransform: 'uppercase', color: '#A3A3A3' }}>Available balance</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,128,0,0.12)', border: '1px solid rgba(255,128,0,0.3)', borderRadius: 20, padding: '3px 9px' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF8000' }} />
                <span style={{ font: '600 11px Inter', color: '#FF8000' }}>Premium</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginTop: 10 }}>
              <span style={{ font: '700 46px/0.9 Inter', color: '#fff', letterSpacing: '-.02em' }}>124</span>
              <span style={{ font: '500 14px Inter', color: '#707070', paddingBottom: 7 }}>credits</span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button onClick={() => onNavigate('wallet')} style={{
                flex: 1, height: 44, borderRadius: 12, background: '#FF8000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                font: '600 14px Inter', color: '#050505', border: 'none', cursor: 'pointer',
              }}>Boost Credits</button>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#111418', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3.5" y="6" width="17" height="13" rx="2.5" stroke="#fff" strokeWidth="1.6"/>
                  <path d="M3.5 9.5h17" stroke="#fff" strokeWidth="1.6"/>
                  <circle cx="16.5" cy="13.7" r="1.3" fill="#fff"/>
                </svg>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#47C7FC" strokeWidth="1.6"/>
                <path d="M12 7v5l3 2" stroke="#47C7FC" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span style={{ font: '400 12.5px Inter', color: '#A3A3A3' }}>
                Next allocation <span style={{ color: '#fff' }}>+120</span> in 12 days
              </span>
            </div>
          </div>

          {/* Active campaigns */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 22 }}>
            <div style={{ font: '600 15px Inter', color: '#fff' }}>Active campaigns</div>
            <div style={{ font: '500 12px Inter', color: '#FF8000' }}>2 joined</div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12, overflow: 'hidden' }}>
            {[
              { title: 'Range Rover Sport', badge: '● LIVE', badgeColor: '#FF8000', badgeBg: 'rgba(5,5,5,0.6)', badgeBorder: 'rgba(255,128,0,0.4)', closes: 'closes 2d 14h', your: 2, cr: 1, gradient: 'repeating-linear-gradient(125deg,#191c20 0,#191c20 9px,#14171a 9px,#14171a 18px)' },
              { title: 'Maldives Escape', badge: 'CLOSING SOON', badgeColor: '#F0B43C', badgeBg: 'rgba(5,5,5,0.6)', badgeBorder: 'rgba(240,180,60,0.4)', closes: 'closes 9h 40m', your: 4, cr: 2, gradient: 'repeating-linear-gradient(125deg,#1b1a18 0,#1b1a18 9px,#161513 9px,#161513 18px)' },
            ].map(c => (
              <div key={c.title} onClick={() => onNavigate('campaign-detail')} style={{ width: 154, flexShrink: 0, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: 74, background: c.gradient, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 8, top: 8, font: '600 9px Inter', letterSpacing: '.06em', color: c.badgeColor, background: c.badgeBg, border: `1px solid ${c.badgeBorder}`, borderRadius: 5, padding: '3px 6px' }}>{c.badge}</span>
                </div>
                <div style={{ padding: '10px 11px 12px' }}>
                  <div style={{ font: "600 15px/1.1 'Cormorant Garamond',serif", color: '#fff' }}>{c.title}</div>
                  <div style={{ font: '500 11px Inter', color: '#707070', marginTop: 4 }}>{c.closes}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ font: '600 12px Inter', color: '#A3A3A3' }}>Your: <span style={{ color: '#FF8000' }}>{c.your}</span></span>
                    <span style={{ font: '500 11px Inter', color: '#707070' }}>{c.cr} cr</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Momentum */}
          <div style={{ marginTop: 20, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ font: '600 14px Inter', color: '#fff' }}>Monthly Momentum</div>
              <div style={{ font: '600 13px Inter', color: '#47C7FC' }}>62%</div>
            </div>
            <div style={{ marginTop: 11, height: 8, borderRadius: 4, background: '#191c20', overflow: 'hidden' }}>
              <div style={{ width: '62%', height: '100%', background: 'linear-gradient(90deg,#47C7FC,#7ad8ff)', borderRadius: 4 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9 }}>
              <span style={{ font: '400 12px Inter', color: '#707070' }}>Next reward <span style={{ color: '#fff' }}>+25</span> at 75%</span>
              <span style={{ font: '400 12px Inter', color: '#707070' }}>resets in 14d</span>
            </div>
          </div>
        </div>
      </div>

      <TabBar active="home" onNavigate={onNavigate} />
    </div>
  );
}
