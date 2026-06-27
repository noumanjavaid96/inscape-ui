import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Stat from '../components/ui/Stat';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';

const { colors, font, radius } = tokens;

const TX = [
  { iconName: 'arrowDown', label: 'Monthly Premium allocation', detail: 'June 1, 2026', amount: '+120', color: colors.success },
  { iconName: 'arrowUp', label: 'Range Rover allocation', detail: 'May 30, 2026', amount: '-2', color: colors.accent },
  { iconName: 'bolt', label: 'Momentum reward · 50%', detail: 'May 28, 2026', amount: '+20', color: colors.info },
  { iconName: 'arrowUp', label: 'Maldives allocation', detail: 'May 22, 2026', amount: '-4', color: colors.accent },
  { iconName: 'arrowDown', label: 'Referral reward — Sam R.', detail: 'May 20, 2026', amount: '+40', color: colors.success },
];

export default function Wallet({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Wallet" subtitle="Credits, history and top-ups" />

        <Card gradient padding="lg" style={{ marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(50% 50%, rgba(255,128,0,0.08), transparent)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ font: `500 12px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.textDim, marginBottom: 8 }}>Available balance</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <span style={{ font: `700 52px/0.9 ${font.family}`, color: colors.text, letterSpacing: '-.03em' }}>124</span>
                <span style={{ font: `500 16px ${font.family}`, color: colors.textDim, paddingBottom: 7 }}>credits</span>
              </div>
            </div>
            <Badge label="Premium" color="orange" dot />
          </div>

          <div style={{ display: 'flex', gap: isDesktop ? 28 : 18, marginTop: 22, marginBottom: 22, paddingTop: 20, borderTop: `1px solid ${colors.borderFaint}`, flexWrap: 'wrap' }}>
            <Stat label="Allocated" value="6 cr" />
            <Stat label="Bonus earned" value="+20 cr" color={colors.success} />
            <Stat label="Total used" value="6 cr" />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Button onClick={() => onNavigate('boost')} size="md" style={{ flex: 1 }}>Boost credits</Button>
            <Button onClick={() => onNavigate('membership')} variant="secondary" size="md" style={{ flex: 1 }}>Membership</Button>
          </div>
        </Card>

        <Card padding="lg" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${colors.borderFaint}` }}>
            <h2 style={{ font: `600 16px ${font.family}`, color: colors.text, margin: 0 }}>Transaction history</h2>
          </div>
          {TX.map((t, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 22px', borderBottom: i < TX.length - 1 ? `1px solid ${colors.borderFaint}` : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = colors.surfaceHover}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ width: 38, height: 38, borderRadius: radius.sm, background: colors.bg5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={t.iconName} size={17} color={t.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: `500 14px ${font.family}`, color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.label}</div>
                <div style={{ font: `400 12px ${font.family}`, color: colors.textFaint, marginTop: 2 }}>{t.detail}</div>
              </div>
              <span style={{ font: `700 15px ${font.family}`, color: t.color, flexShrink: 0 }}>{t.amount}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
