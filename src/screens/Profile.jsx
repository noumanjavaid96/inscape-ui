import StatusBar from '../components/StatusBar';
import TabBar from '../components/TabBar';

const menuItems = [
  { icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round"/>, label: 'Personal details', sub: 'Name, email, address' },
  { icon: <><rect x="3.5" y="6" width="17" height="13" rx="2.5" stroke="#A3A3A3" strokeWidth="1.5"/><path d="M3.5 9.5h17" stroke="#A3A3A3" strokeWidth="1.5"/><circle cx="16.5" cy="13.7" r="1.3" fill="#A3A3A3"/></>, label: 'Payment methods', sub: 'Cards & billing' },
  { icon: <><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke="#A3A3A3" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 19a2 2 0 0 0 4 0" stroke="#A3A3A3" strokeWidth="1.5"/></>, label: 'Notifications', sub: 'Campaigns, rewards, news' },
  { icon: <><circle cx="12" cy="12" r="3" stroke="#A3A3A3" strokeWidth="1.5"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round"/></>, label: 'Membership', sub: 'Premium · renews Jul 1' },
  { icon: <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round"/>, label: 'Referral Centre', sub: '4 invited · 1 qualified', action: 'referral' },
  { icon: <path d="M7 3h7l4 4v14H7z" stroke="#A3A3A3" strokeWidth="1.5"/>, label: 'Official rules', sub: 'How winners are chosen' },
  { icon: <><circle cx="12" cy="12" r="9" stroke="#A3A3A3" strokeWidth="1.5"/><path d="M12 11v5M12 8h.01" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round"/></>, label: 'Help & support', sub: 'FAQs, contact us' },
];

export default function Profile({ onNavigate }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <StatusBar />

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 78, overflowY: 'auto', zIndex: 10, scrollbarWidth: 'none' }}>
        <div style={{ padding: '16px 20px 0' }}>

          {/* Avatar + info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#2a1f0e,#1a1206)', border: '2px solid #FF8000', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 22px Inter', color: '#FF8000' }}>A</div>
            <div>
              <div style={{ font: '600 18px Inter', color: '#fff' }}>Alex Mercer</div>
              <div style={{ font: '400 13px Inter', color: '#707070', marginTop: 2 }}>alex@example.com</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5, background: 'rgba(255,128,0,0.12)', border: '1px solid rgba(255,128,0,0.3)', borderRadius: 20, padding: '3px 9px', width: 'fit-content' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF8000' }} />
                <span style={{ font: '600 11px Inter', color: '#FF8000' }}>Premium member</span>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            {[
              { label: 'Credits', value: '122', color: '#fff' },
              { label: 'Campaigns', value: '3', color: '#fff' },
              { label: 'Momentum', value: '62%', color: '#47C7FC' },
              { label: 'Referrals', value: '1', color: '#fff' },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, background: '#0d0f12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '10px 8px', textAlign: 'center' }}>
                <div style={{ font: '700 16px Inter', color: s.color }}>{s.value}</div>
                <div style={{ font: '400 10px Inter', color: '#707070', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Menu */}
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {menuItems.map((item, i) => (
              <button key={i} onClick={() => item.action && onNavigate(item.action)} style={{
                display: 'flex', alignItems: 'center', gap: 13,
                background: '#0d0f12', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: '13px 14px', cursor: 'pointer',
                marginBottom: 6, width: '100%',
              }}>
                <span style={{ width: 36, height: 36, borderRadius: 10, background: '#15181d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">{item.icon}</svg>
                </span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ font: '600 14px Inter', color: '#fff' }}>{item.label}</div>
                  <div style={{ font: '400 11.5px Inter', color: '#707070', marginTop: 2 }}>{item.sub}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="#4a4f57" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>

          {/* Sign out */}
          <button onClick={() => onNavigate('public-home')} style={{
            width: '100%', height: 46, borderRadius: 14, background: 'transparent',
            border: '1px solid rgba(255,59,59,0.3)', color: '#ff4444',
            font: '600 14px Inter', cursor: 'pointer', marginBottom: 30, marginTop: 6,
          }}>
            Sign out
          </button>
        </div>
      </div>

      <TabBar active="profile" onNavigate={onNavigate} />
    </div>
  );
}
