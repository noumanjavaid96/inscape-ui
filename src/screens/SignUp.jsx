import { useState } from 'react';

export default function SignUp({ onNavigate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [consents, setConsents] = useState({ age: false, rules: false, terms: false });

  const step1Valid = form.name && form.email && form.password.length >= 8;
  const step2Valid = consents.age && consents.rules && consents.terms;

  const Field = ({ label, type = 'text', field }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ font: '500 13px Inter', color: '#A3A3A3', display: 'block', marginBottom: 7 }}>{label}</label>
      <input type={type} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
        style={{ width: '100%', height: 50, borderRadius: 13, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', font: '400 15px Inter', padding: '0 16px', outline: 'none', boxSizing: 'border-box' }}
        onFocus={e => e.target.style.borderColor = 'rgba(255,128,0,0.5)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    </div>
  );

  return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 40% at 50% 20%, rgba(255,128,0,0.06), transparent)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 440, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, justifyContent: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#FF8000,#cc6600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ font: "700 14px/1 'Cormorant Garamond',serif", color: '#fff' }}>I</span>
          </div>
          <span style={{ font: "600 22px/1 'Cormorant Garamond',serif", color: '#fff' }}>InScape</span>
        </div>

        <div style={{ background: '#0a0c0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '36px', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
            {[1, 2].map(s => <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? '#FF8000' : '#1a1e25', transition: 'background 0.3s' }} />)}
          </div>

          {step === 1 ? (
            <>
              <h1 style={{ font: '700 26px/1.1 Inter', color: '#fff', margin: '0 0 6px', letterSpacing: '-.01em' }}>Create your account</h1>
              <p style={{ font: '400 14px Inter', color: '#707070', margin: '0 0 28px' }}>Start with 3 free credits — no card required.</p>
              <Field label="Full name" field="name" />
              <Field label="Email address" type="email" field="email" />
              <Field label="Password (min. 8 characters)" type="password" field="password" />
              <button onClick={() => step1Valid && setStep(2)} style={{ width: '100%', height: 52, borderRadius: 14, background: step1Valid ? '#FF8000' : '#1a1e25', border: 'none', cursor: step1Valid ? 'pointer' : 'default', font: '600 16px Inter', color: step1Valid ? '#050505' : '#3a3f47', transition: 'all 0.2s', marginTop: 8, boxShadow: step1Valid ? '0 8px 24px rgba(255,128,0,0.3)' : 'none' }}>Continue →</button>
            </>
          ) : (
            <>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,128,0,0.1)', border: '1px solid rgba(255,128,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52 6.38 18.5l2.09-6.26L3 8.26h6.91L12 2Z" stroke="#FF8000" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              </div>
              <h1 style={{ font: '700 26px/1.1 Inter', color: '#fff', margin: '0 0 6px', letterSpacing: '-.01em' }}>Almost there</h1>
              <p style={{ font: '400 14px Inter', color: '#707070', margin: '0 0 24px' }}>Review and confirm to claim your 3 free credits.</p>
              <div style={{ background: 'rgba(255,128,0,0.06)', border: '1px solid rgba(255,128,0,0.2)', borderRadius: 14, padding: '16px 18px', marginBottom: 24 }}>
                <div style={{ font: '600 13px Inter', color: '#FF8000', marginBottom: 4 }}>Welcome grant</div>
                <div style={{ font: '700 28px/1 Inter', color: '#fff' }}>3 credits</div>
                <div style={{ font: '400 12px Inter', color: '#707070', marginTop: 4 }}>Ready to use immediately after sign-up</div>
              </div>
              {[
                { key: 'age', label: 'I confirm I am 18 years of age or older and a UK resident.' },
                { key: 'rules', label: 'I have read and agree to the Official Rules governing campaign draws.' },
                { key: 'terms', label: 'I agree to the Terms of Service and Privacy Policy.' },
              ].map(c => (
                <div key={c.key} onClick={() => setConsents(p => ({ ...p, [c.key]: !p[c.key] }))} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, cursor: 'pointer' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${consents[c.key] ? '#FF8000' : 'rgba(255,255,255,0.15)'}`, background: consents[c.key] ? '#FF8000' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'all 0.15s' }}>
                    {consents[c.key] && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span style={{ font: '400 13px/1.55 Inter', color: '#A3A3A3' }}>{c.label}</span>
                </div>
              ))}
              <button onClick={() => step2Valid && onNavigate('welcome')} style={{ width: '100%', height: 52, borderRadius: 14, background: step2Valid ? '#FF8000' : '#1a1e25', border: 'none', cursor: step2Valid ? 'pointer' : 'default', font: '600 16px Inter', color: step2Valid ? '#050505' : '#3a3f47', transition: 'all 0.2s', marginTop: 8, boxShadow: step2Valid ? '0 8px 24px rgba(255,128,0,0.3)' : 'none' }}>Create account & claim credits →</button>
            </>
          )}
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <span style={{ font: '400 13px Inter', color: '#4a4f57' }}>Already have an account? </span>
            <button onClick={() => onNavigate('login')} style={{ font: '500 13px Inter', color: '#FF8000', background: 'none', border: 'none', cursor: 'pointer' }}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
}
