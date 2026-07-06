import tokens from '../design/tokens';
import Icon from './ui/Icon';

const { colors, font } = tokens;

// Offers must stay reachable on mobile; Winners lives inside Campaigns' tabs.
const TABS = [
  { id: 'dashboard', label: 'Home', icon: 'home' },
  { id: 'campaigns', label: 'Campaigns', icon: 'grid' },
  { id: 'offers', label: 'Offers', icon: 'star' },
  { id: 'wallet', label: 'Wallet', icon: 'wallet' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];

function HomeIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UserIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.6"/>
      <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function TabIcon({ iconName, color }) {
  if (iconName === 'home') return <HomeIcon color={color} />;
  if (iconName === 'user') return <UserIcon color={color} />;
  return <Icon name={iconName} size={22} color={color} />;
}

export default function BottomNav({ active, onNavigate }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 72,
        background: 'rgba(8,10,12,0.92)',
        borderTop: `1px solid ${colors.border}`,
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {TABS.map(tab => {
        const isActive = active === tab.id;
        const color = isActive ? colors.accent : colors.textFaint;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <TabIcon iconName={tab.icon} color={color} />
            <span style={{ font: `500 10px ${font.family}`, color }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
