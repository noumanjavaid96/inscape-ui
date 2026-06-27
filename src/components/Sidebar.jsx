import { useState } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Logo from './ui/Logo';
import Icon from './ui/Icon';

const { colors, radius, transition, font } = tokens;

const NAV = [
  { id: 'dashboard', label: 'Home', icon: 'home' },
  { id: 'campaigns', label: 'Campaigns', icon: 'grid' },
  { id: 'my-campaigns', label: 'My Entries', icon: 'target' },
  { id: 'offers', label: 'Partner Offers', icon: 'star' },
  { id: 'wallet', label: 'Wallet', icon: 'wallet' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];

// Home and user icons are not in the shared set — define inline
function HomeIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UserIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.6"/>
      <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function NavIcon({ iconName, color }) {
  if (iconName === 'home') return <HomeIcon color={color} />;
  if (iconName === 'user') return <UserIcon color={color} />;
  return <Icon name={iconName} size={20} color={color} />;
}

function NavItem({ item, isActive, collapsed, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  const iconColor = isActive ? colors.accent : hovered ? colors.textMuted : colors.textFaint;

  return (
    <button
      onClick={() => onNavigate(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: collapsed ? '11px 0' : '11px 12px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: radius.md,
        background: isActive ? colors.accentSoft : hovered ? colors.surfaceHover : 'transparent',
        border: `1px solid ${isActive ? colors.accentBorder : 'transparent'}`,
        cursor: 'pointer',
        transition: transition.fast,
        width: '100%',
      }}
    >
      <NavIcon iconName={item.icon} color={iconColor} />
      {!collapsed && (
        <span style={{ font: `500 14px ${font.family}`, color: isActive ? colors.accent : colors.textDim, whiteSpace: 'nowrap' }}>
          {item.label}
        </span>
      )}
    </button>
  );
}

export default function Sidebar({ active, onNavigate }) {
  const { sidebarFull } = useBreakpoint();
  const collapsed = !sidebarFull;

  return (
    <aside
      style={{
        width: collapsed ? 68 : 240,
        flexShrink: 0,
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: colors.bg1,
        borderRight: `1px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        padding: collapsed ? '28px 8px' : '28px 16px',
        transition: `width ${transition.slow}`,
        zIndex: 50,
        overflowX: 'hidden',
      }}
    >
      <div style={{ paddingLeft: collapsed ? 0 : 4, marginBottom: 40, display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <Logo size="md" showText={!collapsed} />
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {NAV.map(item => (
          <NavItem
            key={item.id}
            item={item}
            isActive={active === item.id}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: collapsed ? '16px 0 0' : '16px 8px 0',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderTop: `1px solid ${colors.border}`,
          marginTop: 8,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: radius.full,
            background: 'linear-gradient(135deg,#2a1f0e,#1a1206)',
            border: `2px solid ${colors.accentBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: `700 13px ${font.family}`,
            color: colors.accent,
            flexShrink: 0,
          }}
        >
          A
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ font: `600 13px ${font.family}`, color: colors.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Alex Mercer</div>
            <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint }}>Premium</div>
          </div>
        )}
      </div>
    </aside>
  );
}
