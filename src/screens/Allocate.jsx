import { useState } from 'react';
import StatusBar from '../components/StatusBar';

export default function Allocate({ onConfirm, onDismiss }) {
  const [amount, setAmount] = useState(2);
  const balance = 124;

  const dec = () => setAmount(a => Math.max(1, a - 1));
  const inc = () => setAmount(a => Math.min(50, a + 1));
  const add = (n) => setAmount(a => Math.min(50, a + n));

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      {/* Dimmed background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 330, background: 'radial-gradient(130% 100% at 28% 12%, #1c2026 0%, #0a0c0f 70%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 210, left: 22, zIndex: 1, opacity: 0.5 }}>
        <div style={{ font: "600 34px/0.98 'Cormorant Garamond',serif", color: '#fff' }}>Range Rover Sport</div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.62)', zIndex: 2 }} />

      <StatusBar />

      {/* Bottom sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 496,
        background: '#0c0e11', borderTop: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '26px 26px 34px 34px', zIndex: 20,
        boxShadow: '0 -20px 50px rgba(0,0,0,0.5)',
        padding: '14px 22px 22px',
      }}>
        <div style={{ width: 40, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.2)', margin: '0 auto 18px' }} />
        <div style={{ font: '600 19px Inter', color: '#fff' }}>Allocate credits</div>
        <div style={{ font: '400 13px Inter', color: '#A3A3A3', marginTop: 3 }}>
          to <span style={{ color: '#fff' }}>Range Rover Sport</span> · 1 credit each
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, background: '#111418', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 15px' }}>
          <span style={{ font: '500 13px Inter', color: '#A3A3A3' }}>Available balance</span>
          <span style={{ font: '700 16px Inter', color: '#fff' }}>{balance} <span style={{ fontWeight: 500, fontSize: 12, color: '#707070' }}>credits</span></span>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
          <button onClick={dec} style={{ width: 58, height: 58, borderRadius: 16, background: '#15181d', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '400 30px Inter', color: '#A3A3A3', cursor: 'pointer' }}>−</button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ font: '700 50px/0.9 Inter', color: '#fff' }}>{amount}</div>
            <div style={{ font: '500 11px Inter', letterSpacing: '.1em', textTransform: 'uppercase', color: '#707070', marginTop: 4 }}>credits</div>
          </div>
          <button onClick={inc} style={{ width: 58, height: 58, borderRadius: 16, background: 'rgba(255,128,0,0.14)', border: '1px solid rgba(255,128,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '400 30px Inter', color: '#FF8000', cursor: 'pointer' }}>+</button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {[1, 5, 10].map(n => (
            <button key={n} onClick={() => add(n)} style={{ flex: 1, textAlign: 'center', font: '600 12px Inter', color: '#A3A3A3', background: '#111418', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9, padding: '8px 0', cursor: 'pointer' }}>+{n}</button>
          ))}
          <button onClick={() => setAmount(50)} style={{ flex: 1, textAlign: 'center', font: '600 12px Inter', color: '#A3A3A3', background: '#111418', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9, padding: '8px 0', cursor: 'pointer' }}>Max 50</button>
        </div>

        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: '400 13px Inter', color: '#A3A3A3' }}>Resulting balance</span>
          <span style={{ font: '600 14px Inter', color: '#fff' }}>{balance} → <span style={{ color: '#FF8000' }}>{balance - amount}</span></span>
        </div>
        <div style={{ font: '400 11.5px/1.45 Inter', color: '#707070', marginTop: 10 }}>
          Allocations are final once confirmed. Campaign Credits are non-refundable and non-transferable.
        </div>

        <button onClick={onConfirm} style={{
          marginTop: 14, height: 54, borderRadius: 14, background: '#FF8000', width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          font: '600 16px Inter', color: '#050505',
          boxShadow: '0 10px 26px rgba(255,128,0,0.28)', border: 'none', cursor: 'pointer',
        }}>Confirm allocation</button>
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 124, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.4)', zIndex: 25 }} />
    </div>
  );
}
