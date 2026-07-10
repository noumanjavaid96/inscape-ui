import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';
import { ACCOUNT, isMember } from '../data/account';

const { colors, font, radius } = tokens;

const TX = [
  { iconName: 'arrowDown', label: 'Monthly Premium Allocation', detail: 'June 1, 2026', amount: '+120', color: colors.success },
  { iconName: 'arrowUp', label: 'Allocated 2 Credits, Range Rover Sport Campaign', detail: 'May 30, 2026', amount: '-2', color: colors.accent },
  { iconName: 'bolt', label: 'Momentum Reward, 50% Milestone', detail: 'May 28, 2026', amount: '+20', color: colors.info },
  { iconName: 'arrowUp', label: 'Allocated 4 Credits, 7 Nights Maldives Campaign', detail: 'May 22, 2026', amount: '-4', color: colors.accent },
  { iconName: 'arrowDown', label: 'Referral Reward, Sam R.', detail: 'May 20, 2026', amount: '+40', color: colors.success },
];

// Credit Overview columns — separate card per the client render.
const OVERVIEW = [
  { label: 'Available', value: String(ACCOUNT.balance), caption: 'Credits', icon: 'wallet', tone: colors.accent },
  { label: 'Allocated', value: '6', caption: 'Credits', icon: 'target', tone: colors.info },
  { label: 'Earned', value: '+60', caption: 'Credits this month', icon: 'trendUp', tone: colors.success },
];

// Membership benefits shown in the sidebar card (members only).
const MEMBER_BENEFITS = [
  { icon: 'star', title: `${ACCOUNT.monthlyCredits} Monthly Credits`, sub: 'Allocated on the 1st of each month' },
  { icon: 'gift', title: '75% Partner Offers Access', sub: 'Exclusive member offers' },
  { icon: 'bell', title: 'Priority Campaign Updates', sub: 'Be first to know' },
];

const toneSoft = (hex) => {
  const n = hex.replace('#', '');
  return `rgba(${parseInt(n.slice(0, 2), 16)},${parseInt(n.slice(2, 4), 16)},${parseInt(n.slice(4, 6), 16)},0.14)`;
};

export default function Wallet({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1020, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Wallet" subtitle="Manage your balance, track activity, and unlock opportunities." />

        {/* Balance + membership status */}
        <Card gradient padding="lg" style={{ marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(50% 50%, rgba(238,140,70,0.08), transparent)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ font: `600 12px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.accent, marginBottom: 8 }}>Campaign Credits</div>
              <div style={{ font: `700 52px/0.9 ${font.family}`, color: colors.text, letterSpacing: '-.03em' }}>{ACCOUNT.balance}</div>
              <div style={{ font: `500 15px ${font.family}`, color: colors.textDim, marginTop: 8 }}>Available Credits</div>
            </div>
            {isMember ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', border: `1.5px solid ${colors.accentBorder}`, background: colors.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="star" size={17} color={colors.accent} />
                  </div>
                  <div>
                    <div style={{ font: `600 15px ${font.family}`, color: colors.text }}>{ACCOUNT.tier} Member</div>
                    <div style={{ font: `400 12.5px ${font.family}`, color: colors.textDim }}>{ACCOUNT.monthlyCredits} monthly credits allocated</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px solid rgba(91,208,138,0.4)', background: 'rgba(91,208,138,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="check" size={16} color={colors.success} />
                  </div>
                  <span style={{ font: `500 13.5px ${font.family}`, color: colors.success }}>Monthly allocation active</span>
                </div>
              </div>
            ) : (
              <Badge label="Free" color="gray" dot />
            )}
          </div>

          {/* Rich two-line action buttons per the render */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12, marginTop: 24 }}>
            <button
              onClick={() => onNavigate('boost')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '15px 20px', borderRadius: radius.md, background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`, border: 'none', cursor: 'pointer', textAlign: 'left', boxShadow: '0 10px 34px rgba(238,140,70,0.30)' }}
            >
              <span>
                <span style={{ display: 'block', font: `700 15px ${font.family}`, color: '#1c1003' }}>Add Campaign Credits</span>
                <span style={{ display: 'block', font: `400 12.5px ${font.family}`, color: 'rgba(28,16,3,0.75)', marginTop: 3 }}>Increase your access to more campaigns</span>
              </span>
              <span style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid rgba(28,16,3,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, font: `600 18px/1 ${font.family}`, color: '#1c1003' }}>+</span>
            </button>
            <button
              onClick={() => onNavigate(isMember ? 'membership-manage' : 'membership')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '15px 20px', borderRadius: radius.md, background: colors.bg3, border: `1px solid ${colors.borderStrong}`, cursor: 'pointer', textAlign: 'left' }}
            >
              <span>
                <span style={{ display: 'block', font: `700 15px ${font.family}`, color: colors.text }}>{isMember ? 'Membership' : 'Become a member'}</span>
                <span style={{ display: 'block', font: `400 12.5px ${font.family}`, color: colors.textDim, marginTop: 3 }}>{isMember ? 'Manage your plan and benefits' : 'Monthly credits, offers and more'}</span>
              </span>
              <Icon name="users" size={19} color={colors.textDim} />
            </button>
          </div>
        </Card>

        {/* Credit Overview + membership sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 330px' : '1fr', gap: 20, marginBottom: 20 }}>
          <Card padding="lg">
            <h2 style={{ font: `600 17px ${font.family}`, color: colors.text, margin: '0 0 24px' }}>Credit Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {OVERVIEW.map((o, i) => (
                <div key={o.label} style={{ display: 'flex', alignItems: 'center', gap: 13, borderLeft: i > 0 ? `1px solid ${colors.borderFaint}` : 'none', paddingLeft: i > 0 ? 16 : 0 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: toneSoft(o.tone), border: `1.5px solid ${o.tone}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={o.icon} size={18} color={o.tone} />
                  </div>
                  <div>
                    <div style={{ font: `600 10.5px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.textDim }}>{o.label}</div>
                    <div style={{ font: `800 30px/1.05 ${font.family}`, color: o.label === 'Earned' ? colors.success : colors.text }}>{o.value}</div>
                    <div style={{ font: `400 11.5px ${font.family}`, color: colors.textFaint }}>{o.caption}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {isMember ? (
            <Card padding="md" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ font: `700 12px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.accent, marginBottom: 16 }}>{ACCOUNT.tier} Membership</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                {MEMBER_BENEFITS.map((b) => (
                  <div key={b.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={b.icon} size={15} color={colors.accent} />
                    </div>
                    <div>
                      <div style={{ font: `600 13px ${font.family}`, color: colors.accent }}>{b.title}</div>
                      <div style={{ font: `400 12px ${font.family}`, color: colors.textDim, marginTop: 2 }}>{b.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingTop: 16, marginTop: 16, borderTop: `1px solid ${colors.borderFaint}` }}>
                <span style={{ font: `400 13px ${font.family}`, color: colors.textDim }}>Next allocation in</span>
                <span style={{ font: `400 13px ${font.family}`, color: colors.textDim }}>
                  <strong style={{ font: `800 24px ${font.family}`, color: colors.accent, marginRight: 5 }}>30</strong>days
                </span>
              </div>
            </Card>
          ) : (
            <Card padding="md" style={{ border: `1px solid ${colors.accentBorder}` }}>
              <div style={{ font: `700 12px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.accent, marginBottom: 10 }}>Become a member</div>
              <p style={{ font: `400 13px/1.55 ${font.family}`, color: colors.textDim, margin: '0 0 14px' }}>Add Campaign Credits to your account and allocate them across eligible active Campaigns. Members receive a monthly allocation automatically.</p>
              <button onClick={() => onNavigate('membership')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', font: `600 13px ${font.family}`, color: colors.accent, padding: 0 }}>
                See plans <Icon name="arrowRight" size={14} color={colors.accent} />
              </button>
            </Card>
          )}
        </div>

        {/* Recent activity */}
        <Card padding="lg" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${colors.borderFaint}` }}>
            <h2 style={{ font: `600 16px ${font.family}`, color: colors.text, margin: 0 }}>Recent Activity</h2>
          </div>
          {TX.map((t, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 22px', borderBottom: i < TX.length - 1 ? `1px solid ${colors.borderFaint}` : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = colors.surfaceHover}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: toneSoft(t.color), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={t.iconName} size={17} color={t.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: `500 14px ${font.family}`, color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.label}</div>
                <div style={{ font: `400 12px ${font.family}`, color: colors.textFaint, marginTop: 2 }}>{t.detail}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span style={{ display: 'block', font: `700 15px ${font.family}`, color: t.color }}>{t.amount}</span>
                <span style={{ display: 'block', font: `400 11px ${font.family}`, color: colors.textFaint }}>Credits</span>
              </div>
            </div>
          ))}
        </Card>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, font: `400 12px ${font.family}`, color: colors.textFaint, marginTop: 18 }}>
          <Icon name="clock" size={13} color={colors.textFaint} />
          Credits never expire. Membership allocations post on the 1st of each month.
        </div>
      </div>
    </div>
  );
}
