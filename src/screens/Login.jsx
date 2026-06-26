import { useState } from 'react';

export default function Login({ onNavigate }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const valid = form.email && form.password.length >= 6;

  const Field = ({ label, type = 'text', field, placeholder }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ font: '500 13px Inter', color: '#A3A3A3', display: 'block', marginBottom: 7 }}>{label}</label>
      <input type={type} placeholder={placeholder} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
        style={{ width: '100%', height: 50, borderRadius: 13, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', font: '400 15px Inter', padding: '0 16px', outline: 'none', boxSizing: 'border-box' }}
        onFocus={e => e.target.style.borderColor = 'rgba(255,128,0,0.5)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    </div>
  );

  return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 40% at 50% 20%, rgba(255,128,0,0.05), transparent)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 440, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, justifyContent: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#FF8000,#cc6600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ font: "700 14px/1 'Cormorant Garamond',serif", color: '#fff' }}>I</span>
          </div>
          <span style={{ font: "600 22px/1 'Cormorant Garamond',serif", color: '#fff' }}>InScape</span>
        </div>

        <div style={{ background: '#0a0c0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '36px', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
          <h1 style={{ font: '700 26px/1.1 Inter', color: '#fff', margin: '0 0 6px', letterSpacing: '-.01em' }}>Welcome back</h1>
          <p style={{ font: '400 14px Inter', color: '#707070', margin: '0 0 28px' }}>Sign in to your InScape account.</p>

          <Field label="Email address" type="email" field="email" placeholder="you@example.com" />
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <label style={{ font: '500 13px Inter', color: '#A3A3A3' }}>Password</label>
              <button style={{ font: '500 12px Inter', color: '#FF8000', background: 'none', border: 'none', cursor: 'pointer' }}>Forgot?</button>
            </div>
            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              style={{ width: '100%', height: 50, borderRadius: 13, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', font: '400 15px Inter', padding: '0 16px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = 'rgba(255,128,0,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <button onClick={() => valid && onNavigate('dashboard')} style={{ width: '100%', height: 52, borderRadius: 14, background: valid ? '#FF8000' : '#1a1e25', border: 'none', cursor: valid ? 'pointer' : 'default', font: '600 16px Inter', color: valid ? '#050505' : '#3a3f47', transition: 'all 0.2s', marginBottom: 20, boxShadow: valid ? '0 8px 24px rgba(255,128,0,0.3)' : 'none' }}>Sign in</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            <span style={{ font: '400 12px Inter', color: '#3a3f47', whiteSpace: 'nowrap' }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {[
              { label: 'Google', icon: <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84Z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335"/></svg> },
              { label: 'Apple', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.29.07 2.18.74 2.93.8.93-.19 1.87-.84 3.04-.86 1.29.03 2.5.63 3.15 1.68-3.13 1.88-2.41 5.75.77 6.71-.53 1.42-1.22 2.82-1.89 4.53ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z"/></svg> },
            ].map(p => (
              <button key={p.label} style={{ height: 46, borderRadius: 12, background: '#111418', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, font: '500 14px Inter', color: '#fff', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#1a1e25'}
                onMouseLeave={e => e.currentTarget.style.background = '#111418'}
              >
                {p.icon}{p.label}
              </button>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ font: '400 13px Inter', color: '#4a4f57' }}>New to InScape? </span>
            <button onClick={() => onNavigate('signup')} style={{ font: '500 13px Inter', color: '#FF8000', background: 'none', border: 'none', cursor: 'pointer' }}>Join free →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
