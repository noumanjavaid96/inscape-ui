import { useBreakpoint } from '../hooks/useBreakpoint';

export default function CampaignDetail({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ height: isDesktop ? 400 : 260, background: 'linear-gradient(160deg,#1a2030,#0c1018)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 60% at 30% 40%, rgba(255,128,0,0.12), transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,#050505 0%,transparent 60%)' }} />
        <button onClick={() => onNavigate('campaigns')} style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderRadius: '50%', background: 'rgba(5,5,5,0.6)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ position: 'absolute', bottom: 28, left: 24, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(5,5,5,0.7)', border: '1px solid rgba(255,128,0,0.4)', borderRadius: 10, padding: '6px 12px', backdropFilter: 'blur(8px)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF8000', animation: 'livePulse 2s ease-in-out infinite' }} />
          <span style={{ font: '700 11px Inter', color: '#FF8000', letterSpacing: '.1em' }}>LIVE</span>
        </div>
        <div style={{ position: 'absolute', bottom: 28, right: 24, font: '500 13px Inter', color: '#A3A3A3', background: 'rgba(5,5,5,0.6)', borderRadius: 9, padding: '6px 12px', backdropFilter: 'blur(8px)' }}>2d 14h remaining</div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isDesktop ? '0 48px 60px' : isMobile ? '0 20px 100px' : '0 32px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 380px' : '1fr', gap: 40, marginTop: isDesktop ? -40 : 0 }}>

          {/* Main content */}
          <div>
            <div style={{ font: '500 12px Inter', color: '#707070', marginTop: isDesktop ? 0 : 24 }}>Vehicles · Prize value £92,000</div>
            <h1 style={{ font: "700 clamp(32px,4vw,48px)/1.05 'Cormorant Garamond',serif", color: '#fff', margin: '8px 0 20px', letterSpacing: '-.01em' }}>Range Rover Sport</h1>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
              {[
                { label: 'Prize value', value: '£92,000', color: '#fff' },
                { label: 'Entries', value: '4,821', color: '#fff' },
                { label: 'Cost per entry', value: '1 credit', color: '#FF8000' },
                { label: 'Closes', value: '2d 14h', color: '#F0B43C' },
              ].map(s => (
                <div key={s.label} style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 18px', minWidth: 100 }}>
                  <div style={{ font: '400 11px Inter', color: '#4a4f57', marginBottom: 5 }}>{s.label}</div>
                  <div style={{ font: '700 18px/1 Inter', color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '22px 24px', marginBottom: 20 }}>
              <h2 style={{ font: '600 16px Inter', color: '#fff', margin: '0 0 12px' }}>About this campaign</h2>
              <p style={{ font: '400 14px/1.7 Inter', color: '#A3A3A3', margin: 0 }}>
                Win a brand-new Range Rover Sport in Santorini Black metallic, fully loaded with 22-inch alloys, panoramic roof, Meridian sound system, and a five-year extended warranty. Handover includes complimentary first service and delivery anywhere in mainland UK.
              </p>
            </div>

            <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '22px 24px' }}>
              <h2 style={{ font: '600 16px Inter', color: '#fff', margin: '0 0 14px' }}>Eligibility</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['UK residents 18+', 'One entry minimum', 'No purchase necessary', 'Official Rules apply'].map(e => (
                  <div key={e} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(91,208,138,0.06)', border: '1px solid rgba(91,208,138,0.2)', borderRadius: 8, padding: '5px 10px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="#5BD08A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ font: '500 12px Inter', color: '#5BD08A' }}>{e}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile CTA */}
            {isMobile && (
              <button onClick={() => onNavigate('allocate')} style={{ width: '100%', height: 54, borderRadius: 14, background: '#FF8000', border: 'none', cursor: 'pointer', font: '600 16px Inter', color: '#050505', boxShadow: '0 8px 24px rgba(255,128,0,0.35)', marginTop: 24 }}>
                Allocate credits →
              </button>
            )}
          </div>

          {/* Sticky allocation panel — desktop */}
          {!isMobile && (
            <div style={{ position: isDesktop ? 'sticky' : 'static', top: 24, alignSelf: 'start' }}>
              <div style={{ background: 'linear-gradient(160deg,#13161b,#0a0c0f)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 22, padding: '26px 24px', boxShadow: '0 20px 48px rgba(0,0,0,0.4)' }}>
                <div style={{ font: '600 16px Inter', color: '#fff', marginBottom: 6 }}>Allocate credits</div>
                <div style={{ font: '400 13px Inter', color: '#707070', marginBottom: 22 }}>Each credit = one allocation to this campaign</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ font: '500 14px Inter', color: '#A3A3A3' }}>Your balance</span>
                  <span style={{ font: '700 18px Inter', color: '#fff' }}>124 cr</span>
                </div>
                <button onClick={() => onNavigate('allocate')} style={{ width: '100%', height: 52, borderRadius: 14, background: '#FF8000', border: 'none', cursor: 'pointer', font: '600 16px Inter', color: '#050505', boxShadow: '0 8px 24px rgba(255,128,0,0.35)', transition: 'transform 0.15s', marginBottom: 12 }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >Allocate credits →</button>
                <div style={{ textAlign: 'center', font: '400 11px/1.6 Inter', color: '#3a3f47' }}>
                  By allocating you agree to the Official Rules. UK residents 18+ only.
                </div>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ font: '600 11px Inter', color: '#4a4f57', letterSpacing: '.08em', marginBottom: 10 }}>DRAW DETAILS</div>
                  {[['Draw date', 'Nov 15, 2026'], ['Draw method', 'Random · witnessed'], ['Winner notified', 'By email within 24h']].map(([l, v]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ font: '400 12px Inter', color: '#4a4f57' }}>{l}</span>
                      <span style={{ font: '500 12px Inter', color: '#A3A3A3' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
