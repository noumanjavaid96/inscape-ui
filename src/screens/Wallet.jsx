import StatusBar from '../components/StatusBar';
import TabBar from '../components/TabBar';

const txns = [
  { icon: 'gift', label: 'Welcome grant', sub: '12 Jun · Signup bonus', amount: '+3', color: '#fff', border: 'rgba(255,255,255,0.08)' },
  { icon: 'star', label: 'Membership · Premium', sub: '1 Jun · Monthly allocation', amount: '+120', color: '#fff', border: 'rgba(255,255,255,0.08)' },
  { icon: 'plus', label: 'Top-up · Gold package', sub: '18 Jun · $30 · INS-PAY-3C2', amount: '+30', color: '#fff', border: 'rgba(255,255,255,0.08)' },
  { icon: 'arrow-up', label: 'Allocated · Range Rover', sub: '26 Jun · INS-ALLOC-7F3A9C', amount: '−2', color: '#A3A3A3', border: 'rgba(255,255,255,0.08)' },
  { icon: 'bolt', label: 'Momentum reward · 50%', sub: '20 Jun · Bonus credits', amount: '+10', color: '#47C7FC', border: 'rgba(71,199,252,0.25)' },
];

const TxnIcon = ({ type, border }) => {
  const icons = {
    gift: <path d="M4 8h16M12 8v12M12 8c-2-4-6-3-6 0M12 8c2-4 6-3 6 0" stroke="#A3A3A3" strokeWidth="1.5"/>,
    star: <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" stroke="#FF8000" strokeWidth="1.5" strokeLinejoin="round"/>,
    plus: <path d="M12 5v14M5 12h14" stroke="#A3A3A3" strokeWidth="1.8" strokeLinecap="round"/>,
    'arrow-up': <path d="M7 17 17 7M17 7H9M17 7v8" stroke="#A3A3A3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>,
    bolt: <path d="M13 3 4 14h6l-1 7 9-11h-6z" stroke="#47C7FC" strokeWidth="1.6" strokeLinejoin="round"/>,
  };
  return (
    <span style={{ width: 38, height: 38, borderRadius: 11, background: '#15181d', border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">{icons[type]}</svg>
    </span>
  );
};

export default function Wallet({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <StatusBar />

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 78, overflowY: 'auto', zIndex: 10, scrollbarWidth: 'none' }}>
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{ font: '700 28px/1 Inter', color: '#fff', letterSpacing: '-.02em' }}>Wallet</div>

          {/* Balance card */}
          <div style={{ marginTop: 16, background: 'linear-gradient(160deg,#15181d,#0c0e11)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 20, padding: 20, boxShadow: '0 14px 30px rgba(0,0,0,0.4)' }}>
            <div style={{ font: '500 12px/1 Inter', letterSpacing: '.1em', textTransform: 'uppercase', color: '#A3A3A3' }}>Available balance</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginTop: 9 }}>
              <span style={{ font: '700 44px/0.9 Inter', color: '#fff', letterSpacing: '-.02em' }}>122</span>
              <span style={{ font: '500 14px Inter', color: '#707070', paddingBottom: 6 }}>credits</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <div style={{ flex: 1, background: '#0c0e11', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '9px 11px' }}>
                <div style={{ font: '400 11px Inter', color: '#707070' }}>Allocated</div>
                <div style={{ font: '600 14px Inter', color: '#fff', marginTop: 2 }}>6</div>
              </div>
              <div style={{ flex: 1, background: '#0c0e11', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '9px 11px' }}>
                <div style={{ font: '400 11px Inter', color: '#707070' }}>Bonus earned</div>
                <div style={{ font: '600 14px Inter', color: '#47C7FC', marginTop: 2 }}>12</div>
              </div>
              <button onClick={() => onNavigate('boost')} style={{ flex: 1.2, borderRadius: 11, background: '#FF8000', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 13px Inter', color: '#050505', border: 'none', cursor: 'pointer' }}>Boost</button>
            </div>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 7, marginTop: 16, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {['All', 'Earned', 'Purchased', 'Allocated'].map((f, i) => (
              <div key={f} style={{ font: `${i === 0 ? 600 : 500} 11.5px Inter`, color: i === 0 ? '#050505' : '#A3A3A3', background: i === 0 ? '#FF8000' : '#111418', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '7px 11px', whiteSpace: 'nowrap', cursor: 'pointer' }}>{f}</div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div style={{ padding: '14px 20px 30px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {txns.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 4px', borderBottom: i < txns.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <TxnIcon type={t.icon} border={t.border} />
              <div style={{ flex: 1 }}>
                <div style={{ font: '600 14px Inter', color: '#fff' }}>{t.label}</div>
                <div style={{ font: '400 11.5px Inter', color: '#707070' }}>{t.sub}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ font: '600 15px Inter', color: t.color }}>{t.amount}</div>
                <div style={{ font: '500 10px Inter', color: '#707070' }}>Posted</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="wallet" onNavigate={onNavigate} />
    </div>
  );
}
