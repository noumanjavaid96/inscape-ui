import StatusBar from '../components/StatusBar';

export default function Login({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <div style={{ position: 'absolute', top: -20, left: -40, right: -40, height: 240, background: 'radial-gradient(50% 60% at 50% 0%, rgba(255,128,0,0.09), transparent 75%)', zIndex: 0 }} />
      <StatusBar />

      <button onClick={() => onNavigate('public-home')} style={{ position: 'absolute', top: 54, left: 18, zIndex: 30, width: 38, height: 38, borderRadius: '50%', background: '#111418', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 0, zIndex: 10, overflowY: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ padding: '70px 24px 32px' }}>
          <div style={{ font: "600 36px/1.05 'Cormorant Garamond', serif", color: '#fff' }}>Welcome back</div>
          <div style={{ font: '400 14px Inter', color: '#A3A3A3', marginTop: 6 }}>Sign in to your InScape account.</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
            {[
              { label: 'Email address', placeholder: 'alex@example.com', type: 'email' },
              { label: 'Password', placeholder: 'Your password', type: 'password' },
            ].map(f => (
              <div key={f.label}>
                <div style={{ font: '500 12px Inter', color: '#A3A3A3', marginBottom: 6 }}>{f.label}</div>
                <input type={f.type} placeholder={f.placeholder} style={{
                  width: '100%', height: 48, borderRadius: 12,
                  background: '#0d0f12', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', padding: '0 14px', font: '400 14px Inter', outline: 'none',
                }} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'right', marginTop: 10 }}>
            <span style={{ font: '500 13px Inter', color: '#FF8000', cursor: 'pointer' }}>Forgot password?</span>
          </div>

          <button onClick={() => onNavigate('dashboard')} style={{
            marginTop: 22, height: 54, borderRadius: 14, background: '#FF8000', width: '100%',
            border: 'none', cursor: 'pointer', font: '600 16px Inter', color: '#050505',
            boxShadow: '0 10px 26px rgba(255,128,0,0.3)',
          }}>Sign in</button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ font: '500 12px Inter', color: '#4a4f57' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Social sign-in */}
          {['Continue with Google', 'Continue with Apple'].map((label, i) => (
            <button key={label} style={{
              width: '100%', height: 48, borderRadius: 12,
              background: '#0d0f12', border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff', font: '500 14px Inter', cursor: 'pointer',
              marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}>
              {i === 0 ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="#A3A3A3"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.54 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="#A3A3A3"/>
                </svg>
              )}
              {label}
            </button>
          ))}

          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <span style={{ font: '400 13px Inter', color: '#707070' }}>New to InScape? </span>
            <span onClick={() => onNavigate('signup')} style={{ font: '600 13px Inter', color: '#FF8000', cursor: 'pointer' }}>Join free</span>
          </div>
        </div>
      </div>
    </div>
  );
}
