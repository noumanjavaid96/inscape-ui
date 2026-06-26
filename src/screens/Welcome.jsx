import StatusBar from '../components/StatusBar';

export default function Welcome({ onContinue }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <StatusBar />

      {/* Glow */}
      <div style={{
        position: 'absolute', top: 200, left: -40, right: -40, height: 360,
        background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,128,0,0.22), rgba(255,128,0,0) 70%)',
        zIndex: 0,
      }} />

      <div style={{
        position: 'absolute', top: 46, left: 0, right: 0, bottom: 0,
        zIndex: 10, display: 'flex', flexDirection: 'column', padding: '0 26px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
          <span style={{ font: '500 13px Inter', color: '#707070', cursor: 'pointer' }}>Skip</span>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ font: '600 11px/1 Inter', letterSpacing: '.2em', textTransform: 'uppercase', color: '#FF8000' }}>Welcome to</div>
          <div style={{ font: "600 46px/1 'Cormorant Garamond', serif", color: '#fff', marginTop: 6 }}>InScape, Alex</div>
          <div style={{ font: '400 15px/1.5 Inter', color: '#A3A3A3', marginTop: 10 }}>
            Your account is ready. We've added some Campaign Credits to get you started.
          </div>
        </div>

        {/* Grant card */}
        <div style={{
          marginTop: 30,
          background: 'linear-gradient(180deg, rgba(255,128,0,0.08), rgba(255,128,0,0.02))',
          border: '1px solid rgba(255,128,0,0.28)', borderRadius: 22,
          padding: '30px 24px', textAlign: 'center',
        }}>
          <div style={{ font: '600 11px/1 Inter', letterSpacing: '.14em', textTransform: 'uppercase', color: '#A3A3A3' }}>
            Welcome grant · one-time
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 4, marginTop: 14 }}>
            <span style={{ font: '700 30px/1 Inter', color: '#FF8000', marginTop: 8 }}>+</span>
            <span style={{ font: '700 78px/0.85 Inter', color: '#FF8000', letterSpacing: '-.02em' }}>3</span>
          </div>
          <div style={{ font: '600 16px Inter', color: '#fff', marginTop: 8 }}>Campaign Credits</div>
          <div style={{ font: '400 13px/1.5 Inter', color: '#707070', marginTop: 6 }}>
            Allocate them to any eligible campaign — no payment needed to begin.
          </div>
        </div>

        {/* Steps */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { n: 1, bold: 'Allocate', rest: ' credits to a campaign you like.' },
            { n: 2, bold: 'Track', rest: ' your participation in real time.' },
            { n: 3, bold: 'Earn', rest: ' more through Momentum & referrals.' },
          ].map(({ n, bold, rest }) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <span style={{
                width: 26, height: 26, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                font: '700 12px Inter', color: '#FF8000', flexShrink: 0,
              }}>{n}</span>
              <span style={{ font: '400 14px/1.35 Inter', color: '#A3A3A3' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>{bold}</span>{rest}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 26 }}>
          <button onClick={onContinue} style={{
            height: 54, borderRadius: 14, background: '#FF8000', width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            font: '600 16px Inter', color: '#050505',
            boxShadow: '0 10px 26px rgba(255,128,0,0.3)', border: 'none', cursor: 'pointer',
          }}>
            Use my 3 credits
          </button>
          <div style={{ textAlign: 'center', font: '500 14px Inter', color: '#A3A3A3', marginTop: 16, cursor: 'pointer' }}
            onClick={onContinue}>
            Explore campaigns first
          </div>
        </div>
      </div>
    </div>
  );
}
