import StatusBar from '../components/StatusBar';

export default function AllocationSuccess({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <div style={{ position: 'absolute', top: 120, left: -40, right: -40, height: 340, background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,128,0,0.18), rgba(255,128,0,0) 70%)', zIndex: 0 }} />
      <StatusBar />

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', flexDirection: 'column', padding: '0 24px' }}>
        {/* Success icon */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 48 }}>
          <div style={{ width: 86, height: 86, borderRadius: '50%', background: 'rgba(255,128,0,0.12)', border: '1px solid rgba(255,128,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(255,128,0,0.25)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4.5 4.5L19 7" stroke="#FF8000" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ font: '600 26px Inter', color: '#fff', marginTop: 22 }}>Allocation confirmed</div>
          <div style={{ font: '400 14px/1.5 Inter', color: '#A3A3A3', marginTop: 7, textAlign: 'center' }}>
            You're now participating in<br/><span style={{ color: '#fff' }}>Range Rover Sport</span>.
          </div>
        </div>

        {/* Receipt */}
        <div style={{ marginTop: 30, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 13 }}>
            {[
              { label: 'Credits allocated', value: '2 credits', valueColor: '#FF8000' },
              { label: 'New balance', value: '122 credits', valueColor: '#fff' },
              { label: 'Date', value: '26 Jun 2026, 21:04', valueColor: '#A3A3A3' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ font: '400 13px Inter', color: '#707070' }}>{r.label}</span>
                <span style={{ font: r.valueColor === '#FF8000' ? '700 15px Inter' : '600 14px Inter', color: r.valueColor }}>{r.value}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px dashed rgba(255,255,255,0.12)', padding: '13px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0c0e' }}>
            <span style={{ font: '400 12px Inter', color: '#707070' }}>Reference</span>
            <span style={{ font: "600 12px 'JetBrains Mono', monospace", color: '#A3A3A3', letterSpacing: '.04em' }}>INS-ALLOC-7F3A9C</span>
          </div>
        </div>

        {/* Momentum earned */}
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 11, background: 'rgba(71,199,252,0.07)', border: '1px solid rgba(71,199,252,0.28)', borderRadius: 14, padding: '13px 15px' }}>
          <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(71,199,252,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M13 3 4 14h6l-1 7 9-11h-6z" stroke="#47C7FC" strokeWidth="1.7" strokeLinejoin="round"/>
            </svg>
          </span>
          <div>
            <div style={{ font: '600 13px Inter', color: '#fff' }}>Monthly Momentum +10</div>
            <div style={{ font: '400 11.5px Inter', color: '#A3A3A3' }}>Two campaigns joined this month</div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 26 }}>
          <button onClick={() => onNavigate('dashboard')} style={{
            height: 54, borderRadius: 14, background: '#FF8000', width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            font: '600 16px Inter', color: '#050505', border: 'none', cursor: 'pointer',
          }}>View my participation</button>
          <div style={{ textAlign: 'center', font: '500 14px Inter', color: '#A3A3A3', marginTop: 15, cursor: 'pointer' }}
            onClick={() => onNavigate('campaigns')}>
            Back to campaigns
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 124, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.28)', zIndex: 25 }} />
    </div>
  );
}
