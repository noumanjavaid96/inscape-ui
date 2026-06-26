import { useBreakpoint } from '../hooks/useBreakpoint';

const MENU = [
  { label: 'Personal details', sub: 'Name, email, address', action: null },
  { label: 'Payment methods', sub: 'Cards & billing', action: null },
  { label: 'Notification preferences', sub: 'Campaigns, rewards, news', action: 'notifications' },
  { label: 'Membership', sub: 'Premium · renews Jul 1', action: 'membership' },
  { label: 'Referral Centre', sub: '4 invited · 1 qualified', action: 'referral' },
  { label: 'Official rules', sub: 'How winners are chosen', action: null },
  { label: 'Help & support', sub: 'FAQs, contact us', action: null },
];

const STATS = [
  { label: 'Credits', value: '122', color: '#fff' },
  { label: 'Campaigns', value: '3', color: '#fff' },
  { label: 'Momentum', value: '62%', color: '#47C7FC' },
  { label: 'Referrals', value: '1', color: '#fff' },
];

export default function Profile({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>
        {/* Profile header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
          <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'linear-gradient(135deg,#2a1f0e,#1a1206)', border: '2.5px solid #FF8000', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 26px Inter', color: '#FF8000', flexShrink: 0 }}>A</div>
          <div>
            <h1 style={{ font: '700 24px/1.1 Inter', color: '#fff', margin: '0 0 4px' }}>Alex Mercer</h1>
            <div style={{ font: '400 14px Inter', color: '#707070' }}>alex@example.com</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8, background: 'rgba(255,128,0,0.12)', border: '1px solid rgba(255,128,0,0.3)', borderRadius: 20, padding: '3px 10px', width: 'fit-content' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF8000' }} />
              <span style={{ font: '600 12px Inter', color: '#FF8000' }}>Premium member</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 28 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ font: '700 20px Inter', color: s.color }}>{s.value}</div>
              <div style={{ font: '400 11px Inter', color: '#707070', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div style={{ background: '#0a0c0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden', marginBottom: 16 }}>
          {MENU.map((item, i) => (
            <button key={item.label} onClick={() => item.action && onNavigate(item.action)} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', background: 'none', border: 'none', borderBottom: i < MENU.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', padding: '16px 20px', cursor: 'pointer', transition: 'background 0.15s', textAlign: 'left' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ flex: 1 }}>
                <div style={{ font: '500 14px Inter', color: '#fff' }}>{item.label}</div>
                <div style={{ font: '400 12px Inter', color: '#4a4f57', marginTop: 2 }}>{item.sub}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="#3a3f47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>

        <button onClick={() => onNavigate('public-home')} style={{ width: '100%', height: 48, borderRadius: 14, background: 'transparent', border: '1px solid rgba(255,59,59,0.3)', color: '#ff4444', font: '600 14px Inter', cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,59,59,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >Sign out</button>
      </div>
    </div>
  );
}
