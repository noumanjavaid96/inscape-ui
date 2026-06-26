export default function AllocationSuccess({ onNavigate }) {
  return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 50% at 50% 40%, rgba(91,208,138,0.07), transparent)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 460, textAlign: 'center', position: 'relative' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(91,208,138,0.1)', border: '1px solid rgba(91,208,138,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="#5BD08A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        <h1 style={{ font: "700 36px/1.05 'Cormorant Garamond',serif", color: '#fff', margin: '0 0 10px' }}>Allocated!</h1>
        <p style={{ font: '400 15px Inter', color: '#A3A3A3', margin: '0 0 32px' }}>Your credits are in. Good luck with the draw.</p>

        <div style={{ background: '#0a0c0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '24px 28px', marginBottom: 20, textAlign: 'left' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Campaign', value: 'Range Rover Sport' },
              { label: 'Allocations', value: '1 credit' },
              { label: 'Reference', value: 'INS-ALLOC-7F3A9C' },
              { label: 'Draw date', value: 'Nov 15, 2026' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ font: '400 13px Inter', color: '#707070' }}>{r.label}</span>
                <span style={{ font: r.label === 'Reference' ? '600 12px Inter' : '500 13px Inter', color: r.label === 'Reference' ? '#FF8000' : '#fff', fontFamily: r.label === 'Reference' ? 'monospace' : 'inherit' }}>{r.value}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, borderTop: '1px dashed rgba(255,255,255,0.1)', margin: '16px 0' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 3 4 14h6l-1 7 9-11h-6z" stroke="#47C7FC" strokeWidth="1.7" strokeLinejoin="round"/></svg>
            <span style={{ font: '500 13px Inter', color: '#47C7FC' }}>+10 Momentum earned</span>
          </div>
        </div>

        <button onClick={() => onNavigate('my-campaigns')} style={{ width: '100%', height: 52, borderRadius: 14, background: '#FF8000', border: 'none', cursor: 'pointer', font: '600 16px Inter', color: '#050505', boxShadow: '0 8px 24px rgba(255,128,0,0.35)', marginBottom: 10 }}>View my entries →</button>
        <button onClick={() => onNavigate('campaigns')} style={{ width: '100%', height: 46, borderRadius: 14, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', font: '500 14px Inter', color: '#A3A3A3' }}>Browse more campaigns</button>
      </div>
    </div>
  );
}
