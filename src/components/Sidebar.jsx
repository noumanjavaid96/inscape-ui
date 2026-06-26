import { useBreakpoint } from '../hooks/useBreakpoint';

const NAV = [
  {
    id: 'dashboard',
    label: 'Home',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M9 21V12h6v9" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/>
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    id: 'my-campaigns',
    label: 'My Entries',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    id: 'offers',
    label: 'Partner Offers',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52 6.38 18.5l2.09-6.26L3 8.26h6.91L12 2Z" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'wallet',
    label: 'Wallet',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="14" rx="2.5" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/>
        <path d="M2 10h20" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/>
        <circle cx="16.5" cy="15" r="1.5" fill={active ? '#FF8000' : '#4a4f57'}/>
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/>
        <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={active ? '#FF8000' : '#4a4f57'} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Sidebar({ active, onNavigate }) {
  const { sidebarFull } = useBreakpoint();

  return (
    <aside style={{
      width: sidebarFull ? 240 : 68,
      flexShrink: 0,
      height: '100vh',
      position: 'sticky',
      top: 0,
      background: '#080a0c',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      padding: sidebarFull ? '28px 16px' : '28px 8px',
      transition: 'width 0.25s ease',
      zIndex: 50,
      overflowX: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ paddingLeft: sidebarFull ? 8 : 0, marginBottom: 40, display: 'flex', alignItems: 'center', justifyContent: sidebarFull ? 'flex-start' : 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#FF8000,#cc6600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ font: "700 14px/1 'Cormorant Garamond',serif", color: '#fff' }}>I</span>
        </div>
        {sidebarFull && <span style={{ font: "600 20px/1 'Cormorant Garamond',serif", color: '#fff', marginLeft: 10, whiteSpace: 'nowrap' }}>InScape</span>}
      </div>

      {/* Nav items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {NAV.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: sidebarFull ? '11px 12px' : '11px 0',
                justifyContent: sidebarFull ? 'flex-start' : 'center',
                borderRadius: 12,
                background: isActive ? 'rgba(255,128,0,0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(255,128,0,0.2)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s',
                width: '100%',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              {item.icon(isActive)}
              {sidebarFull && (
                <span style={{ font: '500 14px Inter', color: isActive ? '#FF8000' : '#6b7178', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User chip at bottom */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: sidebarFull ? '12px 12px' : '12px 0',
        justifyContent: sidebarFull ? 'flex-start' : 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 16, marginTop: 8,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg,#2a1f0e,#1a1206)',
          border: '2px solid rgba(255,128,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          font: '700 13px Inter', color: '#FF8000', flexShrink: 0,
        }}>A</div>
        {sidebarFull && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ font: '600 13px Inter', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Alex Mercer</div>
            <div style={{ font: '400 11px Inter', color: '#4a4f57' }}>Premium</div>
          </div>
        )}
      </div>
    </aside>
  );
}
