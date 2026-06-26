const TABS = [
  {
    id: 'dashboard',
    label: 'Home',
    icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" stroke={a ? '#FF8000' : '#4a4f57'} strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke={a ? '#FF8000' : '#4a4f57'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="1.5" stroke={a ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/><rect x="13" y="3" width="8" height="8" rx="1.5" stroke={a ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/><rect x="3" y="13" width="8" height="8" rx="1.5" stroke={a ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/><rect x="13" y="13" width="8" height="8" rx="1.5" stroke={a ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/></svg>,
  },
  {
    id: 'offers',
    label: 'Offers',
    icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52 6.38 18.5l2.09-6.26L3 8.26h6.91L12 2Z" stroke={a ? '#FF8000' : '#4a4f57'} strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  },
  {
    id: 'wallet',
    label: 'Wallet',
    icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="14" rx="2.5" stroke={a ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/><path d="M2 10h20" stroke={a ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/><circle cx="16.5" cy="15" r="1.5" fill={a ? '#FF8000' : '#4a4f57'}/></svg>,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (a) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={a ? '#FF8000' : '#4a4f57'} strokeWidth="1.6"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={a ? '#FF8000' : '#4a4f57'} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      height: 72, background: 'rgba(8,10,12,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      {TABS.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            style={{
              flex: 1, height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer',
            }}
          >
            {tab.icon(isActive)}
            <span style={{ font: '500 10px Inter', color: isActive ? '#FF8000' : '#4a4f57' }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
