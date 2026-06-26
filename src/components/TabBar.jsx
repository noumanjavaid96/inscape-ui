export default function TabBar({ active, onNavigate }) {
  const tabs = [
    {
      id: 'home', label: 'Home',
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={isActive ? 'rgba(255,128,0,0.15)' : 'none'}>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"
            stroke={isActive ? '#FF8000' : '#707070'} strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'campaigns', label: 'Campaigns',
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={isActive ? 'rgba(255,128,0,0.15)' : 'none'}>
          <rect x="4" y="4" width="7" height="7" rx="1.6" stroke={isActive ? '#FF8000' : '#707070'} strokeWidth="1.6"/>
          <rect x="13" y="4" width="7" height="7" rx="1.6" stroke={isActive ? '#FF8000' : '#707070'} strokeWidth="1.6"/>
          <rect x="4" y="13" width="7" height="7" rx="1.6" stroke={isActive ? '#FF8000' : '#707070'} strokeWidth="1.6"/>
          <rect x="13" y="13" width="7" height="7" rx="1.6" stroke={isActive ? '#FF8000' : '#707070'} strokeWidth="1.6"/>
        </svg>
      ),
    },
    {
      id: 'offers', label: 'Offers',
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={isActive ? 'rgba(255,128,0,0.15)' : 'none'}>
          <path d="M4 12V5a1 1 0 0 1 1-1h7l8 8-8 8z" stroke={isActive ? '#FF8000' : '#707070'} strokeWidth="1.6" strokeLinejoin="round"/>
          <circle cx="8.5" cy="8.5" r="1.4" fill={isActive ? '#FF8000' : '#707070'}/>
        </svg>
      ),
    },
    {
      id: 'wallet', label: 'Wallet',
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={isActive ? 'rgba(255,128,0,0.15)' : 'none'}>
          <rect x="3.5" y="6" width="17" height="13" rx="2.5" stroke={isActive ? '#FF8000' : '#707070'} strokeWidth="1.6"/>
          <path d="M3.5 9.5h17" stroke={isActive ? '#FF8000' : '#707070'} strokeWidth="1.6"/>
          <circle cx="16.5" cy="13.7" r="1.3" fill={isActive ? '#FF8000' : '#707070'}/>
        </svg>
      ),
    },
    {
      id: 'profile', label: 'Profile',
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8.5" r="3.6" stroke={isActive ? '#FF8000' : '#707070'} strokeWidth="1.6"/>
          <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" stroke={isActive ? '#FF8000' : '#707070'} strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 78,
        background: 'rgba(8,9,11,0.9)', backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'flex-start', paddingTop: 12, zIndex: 20,
      }}>
        {tabs.map(tab => {
          const isActive = active === tab.id;
          return (
            <button key={tab.id} onClick={() => onNavigate(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}
            >
              {tab.icon(isActive)}
              <span style={{ font: `${isActive ? 600 : 500} 10px Inter`, color: isActive ? '#fff' : '#707070' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 124, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.28)', zIndex: 25,
      }} />
    </>
  );
}
