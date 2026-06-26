import StatusBar from '../components/StatusBar';

export default function PublicHome({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      {/* Cinematic hero backdrop */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '65%',
        background: 'radial-gradient(140% 100% at 30% 5%, #1e2530 0%, #0d1018 55%, #050505 100%)',
        zIndex: 0,
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, #050505 100%)' }} />
        <span style={{ position: 'absolute', left: '50%', top: '38%', transform: 'translateX(-50%)', font: "500 9px 'JetBrains Mono', monospace", letterSpacing: '.08em', color: '#3a4250', whiteSpace: 'nowrap' }}>IMAGE · Hero campaign visual</span>
      </div>

      {/* Orange ambient glow */}
      <div style={{ position: 'absolute', top: 260, left: -60, right: -60, height: 300, background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,128,0,0.14), transparent 70%)', zIndex: 0 }} />

      <StatusBar />

      {/* Logo */}
      <div style={{ position: 'absolute', top: 54, left: 24, zIndex: 20 }}>
        <span style={{ font: "600 26px/1 'Cormorant Garamond', serif", color: '#fff', letterSpacing: '-.01em' }}>InScape</span>
      </div>

      {/* Content */}
      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', flexDirection: 'column', padding: '0 24px' }}>
        <div style={{ marginTop: 'auto', paddingBottom: 36 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,128,0,0.1)', border: '1px solid rgba(255,128,0,0.35)', borderRadius: 20, padding: '5px 12px', marginBottom: 18 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF8000', animation: 'livePulse 2s ease-in-out infinite' }} />
            <span style={{ font: '600 11px Inter', letterSpacing: '.1em', color: '#FF8000' }}>3 LIVE CAMPAIGNS</span>
          </div>

          <div style={{ font: "600 48px/0.95 'Cormorant Garamond', serif", color: '#fff', letterSpacing: '-.01em' }}>
            Campaign Credits,<br />beautifully allocated.
          </div>
          <div style={{ font: '400 15px/1.6 Inter', color: '#A3A3A3', marginTop: 14, maxWidth: 280 }}>
            A premium, mobile-first platform. Allocate credits to campaigns — start with 3 free, no card needed.
          </div>

          {/* Featured campaign teaser */}
          <div onClick={() => onNavigate('signup')} style={{ marginTop: 22, background: 'linear-gradient(135deg, #111518, #0c0e11)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 16, padding: '14px 15px', display: 'flex', alignItems: 'center', gap: 13, cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: 'radial-gradient(120% 90% at 30% 15%, #20242a, #0c0e11)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ font: '600 9px Inter', letterSpacing: '.1em', textTransform: 'uppercase', color: '#FF8000' }}>Featured · 2d left</div>
              <div style={{ font: "600 17px/1.1 'Cormorant Garamond', serif", color: '#fff', marginTop: 3 }}>Range Rover Sport</div>
              <div style={{ font: '400 11px Inter', color: '#707070', marginTop: 2 }}>Prize value £92,000 · 1 credit</div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* CTAs */}
          <button onClick={() => onNavigate('signup')} style={{
            marginTop: 20, height: 54, borderRadius: 14, background: '#FF8000', width: '100%',
            border: 'none', cursor: 'pointer', font: '600 16px Inter', color: '#050505',
            boxShadow: '0 10px 26px rgba(255,128,0,0.3)',
          }}>
            Join free · get 3 credits
          </button>
          <button onClick={() => onNavigate('login')} style={{
            marginTop: 10, height: 48, borderRadius: 14, background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)', width: '100%',
            cursor: 'pointer', font: '600 14px Inter', color: '#fff',
          }}>
            Sign in
          </button>

          <div style={{ textAlign: 'center', font: '400 11px/1.5 Inter', color: '#4a4f57', marginTop: 14 }}>
            By joining you agree to our Terms & Official Rules.
          </div>
        </div>
      </div>
    </div>
  );
}
