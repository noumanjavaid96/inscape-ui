import { useState } from 'react';
import tokens from '../design/tokens';
import AuthShell from '../components/auth/AuthShell';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Divider from '../components/ui/Divider';

const { colors, font, radius } = tokens;

// Derive a friendly first name from the email local-part for the welcome splash.
function nameFromEmail(email) {
  const local = (email.split('@')[0] || '').split(/[._\-+]/)[0] || '';
  return local ? local.charAt(0).toUpperCase() + local.slice(1) : '';
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84Z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: colors.text }}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.29.07 2.18.74 2.93.8.93-.19 1.87-.84 3.04-.86 1.29.03 2.5.63 3.15 1.68-3.13 1.88-2.41 5.75.77 6.71-.53 1.42-1.22 2.82-1.89 4.53ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z"/>
    </svg>
  );
}

export default function Login({ onNavigate }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const valid = form.email && form.password.length >= 6;
  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <AuthShell glow="rgba(238,140,70,0.05)">
      <h1 style={{ font: `700 26px/1.1 ${font.family}`, color: colors.text, margin: '0 0 6px', letterSpacing: '-.01em' }}>Welcome back</h1>
      <p style={{ font: `400 14px ${font.family}`, color: colors.textDim, margin: '0 0 28px' }}>Sign in to your InScape account.</p>

      <Input label="Email address" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
          <label style={{ font: `500 13px ${font.family}`, color: colors.textMuted }}>Password</label>
          <button style={{ font: `500 12px ${font.family}`, color: colors.accent, background: 'none', border: 'none', cursor: 'pointer' }}>Forgot?</button>
        </div>
        <Input type="password" value={form.password} onChange={set('password')} style={{ marginBottom: 0 }} />
      </div>

      <Button onClick={() => valid && onNavigate('dashboard', { name: nameFromEmail(form.email) })} fullWidth size="lg" disabled={!valid} style={{ marginBottom: 20 }}>
        Sign in
      </Button>

      <Divider label="or continue with" style={{ marginBottom: 20 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
        {[{ label: 'Google', Icon: GoogleIcon }, { label: 'Apple', Icon: AppleIcon }].map(({ label, Icon: Ic }) => (
          <button key={label} style={{ height: 46, borderRadius: radius.md, background: colors.bg4, border: `1px solid ${colors.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, font: `500 14px ${font.family}`, color: colors.text, transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = colors.bg5}
            onMouseLeave={e => e.currentTarget.style.background = colors.bg4}
          >
            <Ic />{label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <span style={{ font: `400 13px ${font.family}`, color: colors.textFaint }}>New to InScape? </span>
        <button onClick={() => onNavigate('signup')} style={{ font: `500 13px ${font.family}`, color: colors.accent, background: 'none', border: 'none', cursor: 'pointer' }}>Join free</button>
      </div>
    </AuthShell>
  );
}
