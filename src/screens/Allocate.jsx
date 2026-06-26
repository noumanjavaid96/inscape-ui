import { useState } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function Allocate({ onNavigate }) {
  const [qty, setQty] = useState(1);
  const { isMobile } = useBreakpoint();
  const cost = qty;
  const balance = 124;

  return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 40% at 50% 60%, rgba(255,128,0,0.06), transparent)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 480, position: 'relative' }}>

        <button onClick={() => onNavigate('campaign-detail')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', font: '500 14px Inter', color: '#707070', marginBottom: 24 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="#707070" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to campaign
        </button>

        <div style={{ background: '#0a0c0f', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 24, padding: '32px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
          <h1 style={{ font: '700 24px/1.1 Inter', color: '#fff', margin: '0 0 4px', letterSpacing: '-.01em' }}>Allocate credits</h1>
          <p style={{ font: '400 14px Inter', color: '#707070', margin: '0 0 28px' }}>Range Rover Sport · 1 credit per allocation</p>

          {/* Quantity stepper */}
          <div style={{ background: '#111418', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '24px', marginBottom: 20, textAlign: 'center' }}>
            <div style={{ font: '400 13px Inter', color: '#707070', marginBottom: 14 }}>Number of allocations</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 52, height: 52, borderRadius: '50%', background: qty === 1 ? '#0d0f12' : '#1a1e25', border: '1px solid rgba(255,255,255,0.1)', font: '600 24px Inter', color: qty === 1 ? '#3a3f47' : '#fff', cursor: qty === 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>−</button>
              <div style={{ font: '700 56px/1 Inter', color: '#fff', letterSpacing: '-.03em', minWidth: 70, textAlign: 'center' }}>{qty}</div>
              <button onClick={() => setQty(q => Math.min(balance, q + 1))} style={{ width: 52, height: 52, borderRadius: '50%', background: '#1a1e25', border: '1px solid rgba(255,255,255,0.1)', font: '600 24px Inter', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FF8000'}
                onMouseLeave={e => e.currentTarget.style.background = '#1a1e25'}
              >+</button>
            </div>
          </div>

          {/* Quick add */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {[1, 5, 10, 'Max'].map(v => (
              <button key={v} onClick={() => setQty(v === 'Max' ? Math.min(50, balance) : Math.min(balance, qty + (typeof v === 'number' ? v : 0)))}
                style={{ flex: 1, height: 38, borderRadius: 10, background: '#111418', border: '1px solid rgba(255,255,255,0.08)', font: '600 12px Inter', color: '#A3A3A3', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,128,0,0.4)'; e.currentTarget.style.color = '#FF8000'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#A3A3A3'; }}
              >{v === 'Max' ? v : `+${v}`}</button>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background: '#0d0f12', borderRadius: 14, padding: '16px 18px', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ font: '400 13px Inter', color: '#707070' }}>Credits spent</span>
              <span style={{ font: '600 13px Inter', color: '#fff' }}>{cost} cr</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ font: '500 13px Inter', color: '#707070' }}>Remaining balance</span>
              <span style={{ font: '700 14px Inter', color: balance - cost < 10 ? '#F0B43C' : '#fff' }}>{balance - cost} cr</span>
            </div>
          </div>

          <button onClick={() => onNavigate('allocation-success')} style={{ width: '100%', height: 54, borderRadius: 14, background: '#FF8000', border: 'none', cursor: 'pointer', font: '600 16px Inter', color: '#050505', boxShadow: '0 8px 24px rgba(255,128,0,0.35)', marginBottom: 14, transition: 'transform 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >Confirm · {qty} allocation{qty > 1 ? 's' : ''}</button>

          <p style={{ font: '400 11px/1.6 Inter', color: '#3a3f47', textAlign: 'center', margin: 0 }}>
            By confirming you agree to the Official Rules. No purchase necessary. UK residents 18+.
          </p>
        </div>
      </div>
    </div>
  );
}
