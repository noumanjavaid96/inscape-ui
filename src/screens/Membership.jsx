import StatusBar from '../components/StatusBar';

const plans = [
  { id: 'entry', label: 'Entry', price: '$14.99', credits: 40, highlighted: false },
  { id: 'premium', label: 'Premium', price: '$19.99', credits: 120, highlighted: true },
  { id: 'elite', label: 'Elite', price: '$24.99', credits: 250, highlighted: false },
];

export default function Membership({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <StatusBar />

      <button onClick={() => onNavigate('dashboard')} style={{ position: 'absolute', top: 54, left: 18, zIndex: 30, width: 38, height: 38, borderRadius: '50%', background: '#111418', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 92, overflowY: 'auto', zIndex: 10, scrollbarWidth: 'none' }}>
        <div style={{ padding: '54px 20px 0' }}>
          <div style={{ font: '700 27px/1.05 Inter', color: '#fff', letterSpacing: '-.02em' }}>Become a member</div>
          <div style={{ font: '400 13.5px/1.5 Inter', color: '#A3A3A3', marginTop: 6 }}>Recurring credits every month. Change or cancel anytime.</div>

          {/* Toggle */}
          <div style={{ display: 'flex', marginTop: 16, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 11, padding: 4 }}>
            <div style={{ flex: 1, textAlign: 'center', font: '600 13px Inter', color: '#050505', background: '#FF8000', borderRadius: 8, padding: '9px 0', cursor: 'pointer' }}>Monthly</div>
            <div style={{ flex: 1, textAlign: 'center', font: '500 13px Inter', color: '#A3A3A3', padding: '9px 0', cursor: 'pointer' }}>Annual · save 20%</div>
          </div>
        </div>

        <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          {plans.map(p => (
            <div key={p.id} style={{
              background: p.highlighted ? 'linear-gradient(165deg,rgba(255,128,0,0.1),rgba(255,128,0,0.02))' : '#0d0f12',
              border: p.highlighted ? '1.5px solid #FF8000' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 16, position: 'relative',
            }}>
              {p.highlighted && (
                <div style={{ position: 'absolute', top: -9, left: 16, font: '700 9px Inter', letterSpacing: '.08em', color: '#050505', background: '#FF8000', borderRadius: 5, padding: '3px 7px' }}>MOST POPULAR</div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ font: '600 16px Inter', color: '#fff' }}>{p.label}</div>
                  <div style={{ font: '400 12px Inter', color: p.highlighted ? '#A3A3A3' : '#707070', marginTop: 2 }}>
                    {p.price}<span style={{ color: '#707070' }}>/mo</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ font: '700 22px Inter', color: p.highlighted ? '#FF8000' : '#fff', fontSize: p.highlighted ? 26 : 22 }}>{p.credits}</div>
                  <div style={{ font: '500 10px Inter', color: '#707070' }}>credits/mo</div>
                </div>
              </div>
              {p.highlighted && (
                <div style={{ marginTop: 13, paddingTop: 13, borderTop: '1px solid rgba(255,255,255,0.09)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['120 Campaign Credits monthly', 'Monthly Momentum & Explorer', 'Member-only campaigns'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12.5l4.5 4.5L19 7" stroke="#FF8000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ font: '400 13px Inter', color: '#A3A3A3' }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}
              {p.id === 'elite' && (
                <div style={{ font: '400 12px Inter', color: '#707070', marginTop: 10 }}>Everything in Premium · Elite-only campaigns · Partner perks</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '13px 20px 20px', background: 'linear-gradient(0deg,#050505 72%,transparent)', zIndex: 20 }}>
        <button style={{ height: 54, borderRadius: 14, background: '#FF8000', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 10px 26px rgba(255,128,0,0.28)', border: 'none', cursor: 'pointer' }}>
          <span style={{ font: '600 16px Inter', color: '#050505' }}>Choose Premium</span>
          <span style={{ font: '500 14px Inter', color: 'rgba(5,5,5,0.7)' }}>·  $19.99/mo</span>
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 124, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.28)', zIndex: 25 }} />
    </div>
  );
}
