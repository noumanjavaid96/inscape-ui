export default function Welcome({ onNavigate }) {
  return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 50% at 50% 40%, rgba(255,128,0,0.1), transparent)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 480, textAlign: 'center', position: 'relative' }}>
        <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,128,0,0.1)', border: '1px solid rgba(255,128,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52 6.38 18.5l2.09-6.26L3 8.26h6.91L12 2Z" stroke="#FF8000" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 style={{ font: "700 42px/1.05 'Cormorant Garamond',serif", color: '#fff', margin: '0 0 12px', letterSpacing: '-.01em' }}>Welcome to InScape</h1>
        <p style={{ font: '400 16px/1.6 Inter', color: '#A3A3A3', margin: '0 0 36px' }}>Your 3 free credits are ready to use. Here's how to get started:</p>

        <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '24px 28px', marginBottom: 24, textAlign: 'left' }}>
          {[
            { num: '1', title: 'You have 3 free credits', body: 'No card needed. Credits never expire.' },
            { num: '2', title: 'Allocate to campaigns', body: 'Browse live campaigns and stake your credits.' },
            { num: '3', title: 'Earn Momentum bonuses', body: 'Hit milestones each month for bonus credits.' },
          ].map(s => (
            <div key={s.num} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,128,0,0.12)', border: '1px solid rgba(255,128,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 14px Inter', color: '#FF8000', flexShrink: 0 }}>{s.num}</div>
              <div>
                <div style={{ font: '600 15px Inter', color: '#fff', marginBottom: 3 }}>{s.title}</div>
                <div style={{ font: '400 13px Inter', color: '#707070' }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Credit balance chip */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,128,0,0.08)', border: '1px solid rgba(255,128,0,0.25)', borderRadius: 16, padding: '10px 20px', marginBottom: 28 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#FF8000" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#FF8000" strokeWidth="1.6" strokeLinecap="round"/></svg>
          <span style={{ font: '600 15px Inter', color: '#FF8000' }}>3 credits added to your wallet</span>
        </div>

        <button onClick={() => onNavigate('onboarding')} style={{ width: '100%', height: 54, borderRadius: 14, background: '#FF8000', border: 'none', cursor: 'pointer', font: '600 16px Inter', color: '#050505', boxShadow: '0 10px 28px rgba(255,128,0,0.35)', display: 'block', transition: 'transform 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >Use my 3 credits →</button>
        <button onClick={() => onNavigate('campaigns')} style={{ width: '100%', height: 46, borderRadius: 14, background: 'transparent', border: 'none', cursor: 'pointer', font: '500 14px Inter', color: '#707070', marginTop: 10 }}>Skip to campaigns</button>
      </div>
    </div>
  );
}
