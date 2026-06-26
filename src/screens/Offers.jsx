import StatusBar from '../components/StatusBar';
import TabBar from '../components/TabBar';

export default function Offers({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <StatusBar />

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 78, overflowY: 'auto', zIndex: 10, scrollbarWidth: 'none' }}>
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{ font: '700 28px/1 Inter', color: '#fff', letterSpacing: '-.02em' }}>Partner Offers</div>
          <div style={{ font: '400 13px Inter', color: '#A3A3A3', marginTop: 5 }}>Curated benefits from approved partners.</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {['All', 'Travel', 'Tech', 'Lifestyle'].map((f, i) => (
              <div key={f} style={{ font: `${i === 0 ? 600 : 500} 12px Inter`, color: i === 0 ? '#050505' : '#A3A3A3', background: i === 0 ? '#FF8000' : '#111418', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)', borderRadius: 9, padding: '8px 13px', whiteSpace: 'nowrap', cursor: 'pointer' }}>{f}</div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Voyage Prive */}
          <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 46, height: 46, borderRadius: 12, background: 'repeating-linear-gradient(135deg,#1c1f24 0,#1c1f24 6px,#171a1e 6px,#171a1e 12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 10px Inter', color: '#6b7178', flexShrink: 0 }}>VP</span>
              <div style={{ flex: 1 }}>
                <div style={{ font: '600 15px Inter', color: '#fff' }}>Voyage Privé</div>
                <div style={{ font: '400 11.5px Inter', color: '#707070' }}>Luxury travel · Awin network</div>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, font: '500 10px Inter', color: '#707070' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M17 7H9M17 7v8" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                External
              </span>
            </div>
            <div style={{ font: '600 14px Inter', color: '#fff', marginTop: 12 }}>Up to 70% off curated escapes</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
              <span style={{ font: '500 11px Inter', color: '#47C7FC', background: 'rgba(71,199,252,0.1)', border: '1px solid rgba(71,199,252,0.28)', borderRadius: 7, padding: '4px 9px' }}>Tracked link</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, font: '600 13px Inter', color: '#FF8000', cursor: 'pointer' }}>
                View partner
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>

          {/* Helios Tech */}
          <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 46, height: 46, borderRadius: 12, background: 'repeating-linear-gradient(135deg,#1c1f24 0,#1c1f24 6px,#171a1e 6px,#171a1e 12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 10px Inter', color: '#6b7178', flexShrink: 0 }}>HT</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ font: '600 15px Inter', color: '#fff' }}>Helios Tech</span>
                  <span style={{ font: '600 9px Inter', letterSpacing: '.04em', color: '#FF8000', background: 'rgba(255,128,0,0.12)', border: '1px solid rgba(255,128,0,0.3)', borderRadius: 5, padding: '2px 5px' }}>MEMBER</span>
                </div>
                <div style={{ font: '400 11.5px Inter', color: '#707070' }}>Technology · CJ network</div>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, font: '500 10px Inter', color: '#707070' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M17 7H9M17 7v8" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                External
              </span>
            </div>
            <div style={{ font: '600 14px Inter', color: '#fff', marginTop: 12 }}>£40 off your first order</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
              <span style={{ font: '500 11px Inter', color: '#47C7FC', background: 'rgba(71,199,252,0.1)', border: '1px solid rgba(71,199,252,0.28)', borderRadius: 7, padding: '4px 9px' }}>Promo code</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, font: '600 13px Inter', color: '#FF8000', cursor: 'pointer' }}>
                View partner
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '0 2px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="9" stroke="#707070" strokeWidth="1.5"/>
              <path d="M12 11v5M12 8h.01" stroke="#707070" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            <span style={{ font: '400 11.5px/1.5 Inter', color: '#707070' }}>InScape doesn't sell or fulfil partner products. Purchases & returns are handled on the partner's own site.</span>
          </div>
        </div>
      </div>

      <TabBar active="offers" onNavigate={onNavigate} />
    </div>
  );
}
