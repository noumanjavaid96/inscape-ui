import { useState } from 'react';
import tokens from '../design/tokens';
import AuthShell from '../components/auth/AuthShell';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import Icon from '../components/ui/Icon';

const { colors, font, radius } = tokens;

const CONSENTS = [
  { key: 'age', label: 'I confirm I am 18 years of age or older and a US resident.' },
  { key: 'rules', label: 'I have read and agree to the Official Rules governing campaign draws.' },
  { key: 'terms', label: 'I agree to the Terms of Service and Privacy Policy.' },
];

export default function SignUp({ onNavigate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [consents, setConsents] = useState({ age: false, rules: false, terms: false });

  const step1Valid = form.name && form.email && form.password.length >= 8;
  const step2Valid = consents.age && consents.rules && consents.terms;

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));
  const toggleConsent = key => setConsents(p => ({ ...p, [key]: !p[key] }));

  return (
    <AuthShell>
      <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
        {[1, 2].map(s => (
          <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? colors.accent : colors.bg4, transition: 'background 0.3s' }} />
        ))}
      </div>

      <div key={step} style={{ animation: 'slideIn 0.45s cubic-bezier(.2,.7,.2,1) both' }}>
      {step === 1 ? (
        <>
          <h1 style={{ font: `700 26px/1.1 ${font.family}`, color: colors.text, margin: '0 0 6px', letterSpacing: '-.01em' }}>Create your account</h1>
          <p style={{ font: `400 14px ${font.family}`, color: colors.textDim, margin: '0 0 28px' }}>Start with 3 free Credits — no card required.</p>
          <Input label="Full name" value={form.name} onChange={set('name')} />
          <Input label="Email address" type="email" value={form.email} onChange={set('email')} />
          <Input label="Password (min. 8 characters)" type="password" value={form.password} onChange={set('password')} style={{ marginBottom: 24 }} />
          <Button onClick={() => step1Valid && setStep(2)} fullWidth size="lg" disabled={!step1Valid}>
            Continue
          </Button>
        </>
      ) : (
        <>
          <div className="liquid-glass" style={{ width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, border: `1px solid ${colors.accentBorder}` }}>
            <Icon name="sparkle" size={28} color={colors.accent} />
          </div>
          <h1 style={{ font: `700 26px/1.1 ${font.family}`, color: colors.text, margin: '0 0 6px', letterSpacing: '-.01em' }}>Almost there</h1>
          <p style={{ font: `400 14px ${font.family}`, color: colors.textDim, margin: '0 0 24px' }}>Review and confirm to claim your 3 free Credits.</p>
          <div className="liquid-glass" style={{ borderRadius: radius.md, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: radius.md, background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="gift" size={22} color={colors.accent} />
            </div>
            <div>
              <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.1em', color: colors.accent }}>WELCOME GRANT</div>
              <div style={{ font: `700 26px/1 ${font.family}`, color: colors.text, margin: '2px 0' }}>3 Credits</div>
              <div style={{ font: `400 12px ${font.family}`, color: colors.textDim }}>Ready to use right after sign-up</div>
            </div>
          </div>
          {CONSENTS.map(c => (
            <Checkbox
              key={c.key}
              checked={consents[c.key]}
              onChange={() => toggleConsent(c.key)}
              label={c.label}
              style={{ marginBottom: 14 }}
            />
          ))}
          <Button onClick={() => step2Valid && onNavigate('welcome', { name: form.name })} fullWidth size="lg" disabled={!step2Valid} style={{ marginTop: 8 }}>
            Create account and claim Credits
          </Button>
        </>
      )}
      </div>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <span style={{ font: `400 13px ${font.family}`, color: colors.textFaint }}>Already have an account? </span>
        <button onClick={() => onNavigate('login')} style={{ font: `500 13px ${font.family}`, color: colors.accent, background: 'none', border: 'none', cursor: 'pointer' }}>Sign in</button>
      </div>
    </AuthShell>
  );
}
