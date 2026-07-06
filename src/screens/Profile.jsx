import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';

const { colors, font } = tokens;

const MENU = [
  { label: 'Personal details', sub: 'Name, email, address', action: null },
  { label: 'Payment methods', sub: 'Cards and billing', action: null },
  { label: 'Notification preferences', sub: 'Campaigns, rewards, news', action: 'notifications' },
  { label: 'Membership', sub: 'Premium · renews Jul 1', action: 'membership-manage' },
  { label: 'Referral Centre', sub: '4 invited · 1 qualified', action: 'referral' },
  { label: 'Official rules', sub: 'How winners are chosen', action: null },
  { label: 'Help and support', sub: 'FAQs, contact us', action: 'support' },
];

const STATS = [
  { label: 'Credits', value: '122', color: colors.text },
  { label: 'Campaigns', value: '3', color: colors.text },
  { label: 'Momentum', value: '62%', color: colors.info },
  { label: 'Referrals', value: '1', color: colors.text },
];

export default function Profile({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();
  const { theme, toggle } = useTheme();

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
          <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'linear-gradient(135deg,#2a1f0e,#1a1206)', border: `2.5px solid ${colors.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `700 26px ${font.family}`, color: colors.accent, flexShrink: 0 }}>A</div>
          <div>
            <h1 style={{ font: `700 24px/1.1 ${font.family}`, color: colors.text, margin: '0 0 4px' }}>Alex Mercer</h1>
            <div style={{ font: `400 14px ${font.family}`, color: colors.textDim, marginBottom: 8 }}>alex@example.com</div>
            <Badge label="Premium member" color="orange" dot />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 28 }}>
          {STATS.map(s => (
            <Card key={s.label} padding="sm" style={{ textAlign: 'center', padding: '14px 10px' }}>
              <div style={{ font: `700 20px ${font.family}`, color: s.color }}>{s.value}</div>
              <div style={{ font: `400 11px ${font.family}`, color: colors.textDim, marginTop: 3 }}>{s.label}</div>
            </Card>
          ))}
        </div>

        <Card padding="lg" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
          {MENU.map((item, i) => (
            <button
              key={item.label}
              onClick={() => item.action && onNavigate(item.action)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', background: 'none', border: 'none', borderBottom: i < MENU.length - 1 ? `1px solid ${colors.borderFaint}` : 'none', padding: '16px 20px', cursor: 'pointer', transition: 'background 0.15s', textAlign: 'left' }}
              onMouseEnter={e => e.currentTarget.style.background = colors.surfaceHover}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ flex: 1 }}>
                <div style={{ font: `500 14px ${font.family}`, color: colors.text }}>{item.label}</div>
                <div style={{ font: `400 12px ${font.family}`, color: colors.textFaint, marginTop: 2 }}>{item.sub}</div>
              </div>
              <Icon name="chevronRight" size={14} color={colors.textGhost} />
            </button>
          ))}
        </Card>

        {/* Appearance — dark is the brand default */}
        <Card padding="lg" style={{ padding: '16px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={18} color={colors.accent} />
          <div style={{ flex: 1 }}>
            <div style={{ font: `500 14px ${font.family}`, color: colors.text }}>Appearance</div>
            <div style={{ font: `400 12px ${font.family}`, color: colors.textFaint, marginTop: 2 }}>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</div>
          </div>
          <button
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggle}
            style={{ position: 'relative', width: 46, height: 26, borderRadius: 999, border: `1px solid ${colors.border}`, background: theme === 'dark' ? colors.bg5 : colors.accent, cursor: 'pointer', transition: 'background 0.2s ease' }}
          >
            <span style={{ position: 'absolute', top: 2.5, left: theme === 'dark' ? 3 : 23, width: 19, height: 19, borderRadius: '50%', background: '#fff', transition: 'left 0.2s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.35)' }} />
          </button>
        </Card>

        <Button onClick={() => onNavigate('public-home')} variant="danger" fullWidth size="md">
          Sign out
        </Button>
      </div>
    </div>
  );
}
