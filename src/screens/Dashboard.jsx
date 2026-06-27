import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Stat from '../components/ui/Stat';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';
import Section from '../components/layout/Section';
import CampaignCard from '../components/campaign/CampaignCard';
import MomentumWidget from '../components/campaign/MomentumWidget';

const { colors, font } = tokens;

const ACTIVE_CAMPAIGNS = [
  { title: 'Range Rover Sport', category: 'Vehicles', prize: '£92,000', status: 'LIVE', statusColor: colors.accent, timeLeft: '2d 14h', allocations: 2, gradient: 'linear-gradient(135deg,#1a2030,#0c1018)', glow: 'rgba(255,128,0,0.1)' },
  { title: 'Maldives Escape', category: 'Travel', prize: '£18,500', status: 'CLOSING SOON', statusColor: colors.warning, timeLeft: '9h 40m', allocations: 4, gradient: 'linear-gradient(135deg,#1a1e28,#0c0e18)', glow: 'rgba(240,180,60,0.1)' },
];

const QUICK_ACTIONS = [
  { label: 'Allocate credits', sub: 'Browse campaigns', action: 'campaigns', icon: 'grid' },
  { label: 'View wallet', sub: '124 credits', action: 'wallet', icon: 'wallet' },
  { label: 'Referral centre', sub: '4 invited · 1 qualified', action: 'referral', icon: 'users' },
  { label: 'Partner offers', sub: '2 member offers', action: 'offers', icon: 'star' },
];

const TRANSACTIONS = [
  { label: 'Monthly Premium allocation', detail: 'June 1, 2026', amount: '+120', iconName: 'arrowDown', color: colors.success },
  { label: 'Range Rover allocation', detail: 'May 30, 2026', amount: '-2', iconName: 'arrowUp', color: colors.accent },
  { label: 'Momentum reward · 50%', detail: 'May 28, 2026', amount: '+20', iconName: 'bolt', color: colors.info },
];

// Member state drives the dashboard variant. Wire to real auth/billing later.
// One of: 'free' | 'member' | 'past-due'
const MEMBER_STATE = 'member';

const VARIANTS = {
  free: { balance: '3', tier: 'Free', tierColor: 'gray', cta: 'Become a member', ctaAction: 'membership' },
  member: { balance: '124', tier: 'Premium', tierColor: 'orange', cta: 'Boost Credits', ctaAction: 'boost' },
  'past-due': { balance: '124', tier: 'Past due', tierColor: 'yellow', cta: 'Update payment', ctaAction: 'membership' },
};

export default function Dashboard({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();
  const pad = isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px';
  const v = VARIANTS[MEMBER_STATE] || VARIANTS.member;

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: pad }}>

        {MEMBER_STATE === 'past-due' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(240,180,60,0.08)', border: `1px solid ${colors.warning}55`, borderRadius: 14, padding: '14px 18px', marginBottom: 20 }}>
            <Icon name="bolt" size={18} color={colors.warning} />
            <div style={{ flex: 1, font: `500 13px ${font.family}`, color: colors.text }}>
              Your membership payment didn’t go through.
              <span style={{ color: colors.textDim }}> Update it to keep your benefits and monthly Credits.</span>
            </div>
            <Button onClick={() => onNavigate('membership')} size="sm">Fix now</Button>
          </div>
        )}

        {MEMBER_STATE === 'free' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, borderRadius: 14, padding: '14px 18px', marginBottom: 20 }}>
            <Icon name="sparkle" size={18} color={colors.accent} />
            <div style={{ flex: 1, font: `500 13px ${font.family}`, color: colors.text }}>
              You’re on the free plan.
              <span style={{ color: colors.textDim }}> Become a member for monthly Credits, Momentum bonuses and exclusive access.</span>
            </div>
            <Button onClick={() => onNavigate('membership')} size="sm">See plans</Button>
          </div>
        )}

        <PageHeader
          title="Alex Mercer"
          subtitle="Good evening"
          actions={
            <button
              onClick={() => onNavigate('notifications')}
              style={{ width: 42, height: 42, borderRadius: '50%', background: colors.bg4, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}
            >
              <Icon name="bell" size={20} color={colors.text} />
              <span style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: '50%', background: colors.accent, border: `1.5px solid ${colors.bg}` }} />
            </button>
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 340px' : '1fr', gap: 24 }}>

          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Balance hero card */}
            <Card gradient padding="lg" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: 'radial-gradient(50% 50%, rgba(255,128,0,0.08), transparent)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ font: `500 12px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.textDim }}>Available balance</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginTop: 8 }}>
                    <span style={{ font: `700 56px/0.9 ${font.family}`, color: colors.text, letterSpacing: '-.03em' }}>{v.balance}</span>
                    <span style={{ font: `500 16px ${font.family}`, color: colors.textDim, paddingBottom: 8 }}>Credits</span>
                  </div>
                </div>
                <Badge label={v.tier} color={v.tierColor} dot />
              </div>

              <div style={{ display: 'flex', gap: 28, marginTop: 20, paddingTop: 20, borderTop: `1px solid ${colors.borderFaint}` }}>
                <Stat label="In play" value="6 cr" />
                <Stat label="Bonus earned" value="+20 cr" color={colors.success} />
                <Stat label="Next Credits" value={MEMBER_STATE === 'free' ? '—' : '12 days'} />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <Button onClick={() => onNavigate(v.ctaAction)} size="md" style={{ flex: 1 }}>{v.cta}</Button>
                <Button onClick={() => onNavigate('wallet')} variant="secondary" size="md">Wallet</Button>
              </div>
            </Card>

            {/* Active campaigns */}
            <Section
              title="Your campaigns"
              action={<Button onClick={() => onNavigate('my-campaigns')} variant="ghost" size="sm">View all</Button>}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
                {ACTIVE_CAMPAIGNS.map(c => (
                  <CampaignCard
                    key={c.title}
                    campaign={c}
                    size="sm"
                    onClick={() => onNavigate('campaign-detail')}
                  />
                ))}
              </div>
            </Section>

            <Button onClick={() => onNavigate('campaigns')} variant="secondary" fullWidth>
              Browse all live campaigns
            </Button>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            <MomentumWidget value={62} nextReward="+25 cr" nextThreshold={75} resets="14d" />

            {/* Quick actions */}
            <Card padding="md">
              <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: '0 0 14px' }}>Quick actions</h3>
              {QUICK_ACTIONS.map((a, i) => (
                <button
                  key={a.label}
                  onClick={() => onNavigate(a.action)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'none', border: 'none', padding: '10px 0', cursor: 'pointer', borderBottom: i < QUICK_ACTIONS.length - 1 ? `1px solid ${colors.borderFaint}` : 'none' }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: colors.bg5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={a.icon} size={18} color={colors.accent} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ font: `500 13px ${font.family}`, color: colors.text }}>{a.label}</div>
                    <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint, marginTop: 1 }}>{a.sub}</div>
                  </div>
                  <Icon name="chevronRight" size={14} color={colors.textGhost} />
                </button>
              ))}
            </Card>

            {/* Recent activity */}
            <Card padding="md">
              <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: '0 0 14px' }}>Recent activity</h3>
              {TRANSACTIONS.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: i < TRANSACTIONS.length - 1 ? `1px solid ${colors.borderFaint}` : 'none' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: colors.bg5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={t.iconName} size={16} color={t.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ font: `500 13px ${font.family}`, color: colors.text }}>{t.label}</div>
                    <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint, marginTop: 1 }}>{t.detail}</div>
                  </div>
                  <span style={{ font: `600 13px ${font.family}`, color: t.color }}>{t.amount}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
