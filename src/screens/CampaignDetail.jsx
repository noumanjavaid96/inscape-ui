import StatusBar from '../components/StatusBar';

export default function CampaignDetail({ onNavigate, onAllocate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      {/* Hero */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 330, background: 'radial-gradient(130% 100% at 28% 12%, #23272e 0%, #0a0c0f 70%)', zIndex: 0 }}>
        <span style={{ position: 'absolute', left: '50%', top: 150, transform: 'translateX(-50%)', font: "500 10px 'JetBrains Mono', monospace", letterSpacing: '.08em', color: '#4f555d' }}>IMAGE · Range Rover Sport — cinematic</span>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 180, background: 'linear-gradient(0deg,#050505 6%,rgba(5,5,5,0.2) 70%,transparent)' }} />
      </div>

      <StatusBar />

      {/* Back button */}
      <button onClick={() => onNavigate('campaigns')} style={{
        position: 'absolute', top: 54, left: 18, zIndex: 30, width: 38, height: 38,
        borderRadius: '50%', background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {/* Share button */}
      <div style={{ position: 'absolute', top: 54, right: 18, zIndex: 30, width: 38, height: 38, borderRadius: '50%', background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 4v11m0 0 4-4m-4 4-4-4M6 20h12" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Scrollable content */}
      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 96, overflowY: 'auto', zIndex: 10, scrollbarWidth: 'none' }}>
        <div style={{ padding: '208px 22px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,128,0,0.14)', border: '1px solid rgba(255,128,0,0.4)', borderRadius: 8, padding: '4px 9px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF8000', animation: 'livePulse 2s ease-in-out infinite' }} />
              <span style={{ font: '600 10px Inter', letterSpacing: '.06em', color: '#FF8000' }}>LIVE</span>
            </span>
            <span style={{ font: '500 12px Inter', color: '#A3A3A3' }}>Vehicles</span>
          </div>
          <div style={{ font: "600 38px/0.98 'Cormorant Garamond',serif", color: '#fff', marginTop: 10 }}>Range Rover Sport</div>
          <div style={{ font: '400 14px Inter', color: '#A3A3A3', marginTop: 6 }}>Prize value <span style={{ color: '#fff', fontWeight: 600 }}>£92,000</span> · P440e Autobiography</div>
        </div>

        <div style={{ padding: '18px 22px 0' }}>
          {/* Stats */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'Closes in', value: '2d 14h 06m', color: '#fff' },
              { label: 'Your allocation', value: '2 credits', color: '#FF8000' },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 13 }}>
                <div style={{ font: '500 10px Inter', letterSpacing: '.08em', textTransform: 'uppercase', color: '#707070' }}>{s.label}</div>
                <div style={{ font: '700 18px Inter', color: s.color, marginTop: 5 }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Eligibility */}
          <div style={{ marginTop: 14, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(91,208,138,0.14)', border: '1px solid rgba(91,208,138,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#5BD08A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span style={{ font: '600 14px Inter', color: '#fff' }}>You're eligible to participate</span>
            </div>
            <div style={{ display: 'flex', gap: 7, marginTop: 12, flexWrap: 'wrap' }}>
              {['18+ confirmed', 'United Kingdom', 'Identity verified'].map(tag => (
                <span key={tag} style={{ font: '500 11px Inter', color: '#A3A3A3', background: '#111418', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 7, padding: '5px 9px' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path d="M7 3h7l4 4v14H7z" stroke="#47C7FC" strokeWidth="1.5"/>
                <path d="M9 12h6M9 16h6" stroke="#47C7FC" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ font: '500 13px Inter', color: '#fff' }}>Official rules & how winners are chosen</span>
            </div>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="#707070" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ height: 20 }} />
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 20px 20px', background: 'linear-gradient(0deg,#050505 72%,transparent)', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ font: '500 11px Inter', color: '#707070' }}>Balance</div>
            <div style={{ font: '700 17px Inter', color: '#fff' }}>124</div>
          </div>
          <button onClick={onAllocate} style={{
            flex: 1, height: 54, borderRadius: 14, background: '#FF8000',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 10px 26px rgba(255,128,0,0.3)', border: 'none', cursor: 'pointer',
          }}>
            <span style={{ font: '600 16px Inter', color: '#050505' }}>Allocate Credits</span>
          </button>
        </div>
      </div>
    </div>
  );
}
