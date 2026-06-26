import { useState } from 'react';
import StatusBar from '../components/StatusBar';

export default function SignUp({ onNavigate }) {
  const [step, setStep] = useState(1); // 1=details, 2=consent
  const [agreed, setAgreed] = useState({ rules: false, terms: false, age: false });

  const allAgreed = agreed.rules && agreed.terms && agreed.age;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <div style={{ position: 'absolute', top: -20, left: -40, right: -40, height: 260, background: 'radial-gradient(50% 60% at 50% 0%, rgba(255,128,0,0.1), transparent 75%)', zIndex: 0 }} />
      <StatusBar />

      {/* Back */}
      <button onClick={() => step > 1 ? setStep(s => s - 1) : onNavigate('public-home')} style={{ position: 'absolute', top: 54, left: 18, zIndex: 30, width: 38, height: 38, borderRadius: '50%', background: '#111418', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Step indicators */}
      <div style={{ position: 'absolute', top: 62, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 30 }}>
        {[1, 2].map(n => (
          <div key={n} style={{ width: n === step ? 20 : 6, height: 6, borderRadius: 3, background: n <= step ? '#FF8000' : '#22262c', transition: 'width 0.2s' }} />
        ))}
      </div>

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 0, zIndex: 10, overflowY: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ padding: '70px 24px 32px' }}>

          {step === 1 && (
            <>
              <div style={{ font: '600 11px/1 Inter', letterSpacing: '.2em', textTransform: 'uppercase', color: '#FF8000' }}>Step 1 of 2</div>
              <div style={{ font: "600 32px/1.1 'Cormorant Garamond', serif", color: '#fff', marginTop: 8 }}>Create your account</div>
              <div style={{ font: '400 14px Inter', color: '#A3A3A3', marginTop: 6 }}>Free forever. No card required to start.</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
                {[
                  { label: 'Full name', placeholder: 'Alex Mercer', type: 'text' },
                  { label: 'Email address', placeholder: 'alex@example.com', type: 'email' },
                  { label: 'Password', placeholder: '8+ characters', type: 'password' },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ font: '500 12px Inter', color: '#A3A3A3', marginBottom: 6 }}>{f.label}</div>
                    <input type={f.type} placeholder={f.placeholder} style={{
                      width: '100%', height: 48, borderRadius: 12,
                      background: '#0d0f12', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff', padding: '0 14px', font: '400 14px Inter',
                      outline: 'none',
                    }} />
                  </div>
                ))}
              </div>

              <button onClick={() => setStep(2)} style={{
                marginTop: 28, height: 54, borderRadius: 14, background: '#FF8000', width: '100%',
                border: 'none', cursor: 'pointer', font: '600 16px Inter', color: '#050505',
                boxShadow: '0 10px 26px rgba(255,128,0,0.3)',
              }}>Continue</button>

              <div style={{ textAlign: 'center', marginTop: 18 }}>
                <span style={{ font: '400 13px Inter', color: '#707070' }}>Already have an account? </span>
                <span onClick={() => onNavigate('login')} style={{ font: '600 13px Inter', color: '#FF8000', cursor: 'pointer' }}>Sign in</span>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ font: '600 11px/1 Inter', letterSpacing: '.2em', textTransform: 'uppercase', color: '#FF8000' }}>Step 2 of 2</div>
              <div style={{ font: "600 32px/1.1 'Cormorant Garamond', serif", color: '#fff', marginTop: 8 }}>Confirm & consent</div>
              <div style={{ font: '400 14px Inter', color: '#A3A3A3', marginTop: 6 }}>Required before we can award your welcome credits.</div>

              {/* Welcome grant preview */}
              <div style={{ marginTop: 22, background: 'linear-gradient(180deg, rgba(255,128,0,0.07), rgba(255,128,0,0.02))', border: '1px solid rgba(255,128,0,0.25)', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ font: '700 36px/1 Inter', color: '#FF8000' }}>+3</span>
                </div>
                <div>
                  <div style={{ font: '600 14px Inter', color: '#fff' }}>Welcome grant · ready to claim</div>
                  <div style={{ font: '400 12px Inter', color: '#707070', marginTop: 2 }}>3 Campaign Credits once you confirm below</div>
                </div>
              </div>

              {/* Consents */}
              <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { key: 'age', text: 'I confirm I am 18 or over and reside in an eligible territory.' },
                  { key: 'rules', text: 'I have read and agree to the Official Rules governing campaign participation.' },
                  { key: 'terms', text: 'I agree to the Terms of Service and Privacy Policy.' },
                ].map(c => (
                  <button key={c.key} onClick={() => setAgreed(a => ({ ...a, [c.key]: !a[c.key] }))} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0,
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                      background: agreed[c.key] ? '#FF8000' : 'transparent',
                      border: `1.5px solid ${agreed[c.key] ? '#FF8000' : 'rgba(255,255,255,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {agreed[c.key] && (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12.5l4.5 4.5L19 7" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <span style={{ font: '400 13px/1.55 Inter', color: '#A3A3A3' }}>{c.text}</span>
                  </button>
                ))}
              </div>

              <button onClick={() => allAgreed && onNavigate('welcome')} style={{
                marginTop: 28, height: 54, borderRadius: 14,
                background: allAgreed ? '#FF8000' : '#1a1d21',
                width: '100%', border: 'none',
                cursor: allAgreed ? 'pointer' : 'default',
                font: '600 16px Inter',
                color: allAgreed ? '#050505' : '#4a4f57',
                boxShadow: allAgreed ? '0 10px 26px rgba(255,128,0,0.3)' : 'none',
                transition: 'all 0.2s',
              }}>
                Create account & claim credits
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
