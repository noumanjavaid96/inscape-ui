import { useState, useEffect } from 'react';
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
import CampaignExplorerWidget from '../components/campaign/CampaignExplorerWidget';
import { CAMPAIGNS } from '../data/campaigns';

const { colors, font } = tokens;

// Five campaigns run in a month — one hero card edge-to-edge, the rest beneath.
const HERO_CAMPAIGN = { ...CAMPAIGNS[0], allocations: 2 };
const MONTH_CAMPAIGNS = CAMPAIGNS.slice(1, 5).map((c, i) => ({ ...c, allocations: i === 0 ? 4 : 0 }));

// High-level summary only — detailed breakdowns live in Insights.
const SUMMARY_STATS = [
  { label: 'Earned credits', value: '164', icon: 'bolt' },
  { label: 'Campaigns joined', value: '9', icon: 'grid' },
  { label: 'Bonus credits', value: '+20', icon: 'sparkle' },
];

const TRANSACTIONS = [
  { label: 'Monthly Premium allocation', detail: 'June 1, 2026', amount: '+120', iconName: 'arrowDown', color: colors.success },
  { label: 'Range Rover allocation', detail: 'May 30, 2026', amount: '-2', iconName: 'arrowUp', color: colors.accent },
  { label: 'Momentum reward · 50%', detail: 'May 28, 2026', amount: '+10', iconName: 'bolt', color: colors.info },
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

  // Shimmer while the dashboard's data-heavy cards load. Wire to real API
  // readiness later; the brief timeout demos the skeleton state.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: pad }}>
          <div className="shimmer" style={{ height: 54, width: 260, marginBottom: 28 }} />
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 340px' : '1fr', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="shimmer" style={{ height: 220 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                {[0, 1, 2].map((i) => <div key={i} className="shimmer" style={{ height: 110 }} />)}
              </div>
              <div className="shimmer" style={{ height: 300 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[0, 1, 2].map((i) => <div key={i} className="shimmer" style={{ height: 150 }} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

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

            {/* High-level analytics — details live in Insights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {SUMMARY_STATS.map((s) => (
                <Card key={s.label} padding="md" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={s.icon} size={16} color={colors.accent} />
                  </div>
                  <div>
                    <div style={{ font: `700 24px ${font.family}`, color: colors.text, letterSpacing: '-.02em' }}>{s.value}</div>
                    <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint, marginTop: 2 }}>{s.label}</div>
                  </div>
                </Card>
              ))}
            </div>

            {/* This month's campaigns — hero card edge-to-edge, the rest beneath */}
            <Section
              title="This month's campaigns"
              action={<Button onClick={() => onNavigate('campaigns')} variant="ghost" size="sm">View all</Button>}
            >
              <CampaignCard
                campaign={HERO_CAMPAIGN}
                size="lg"
                onClick={() => onNavigate('campaign-detail', { campaignId: HERO_CAMPAIGN.id })}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginTop: 14 }}>
                {MONTH_CAMPAIGNS.map(c => (
                  <CampaignCard
                    key={c.title}
                    campaign={c}
                    size="sm"
                    onClick={() => onNavigate('campaign-detail', { campaignId: c.id })}
                  />
                ))}
              </div>
            </Section>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            <MomentumWidget value={72} nextReward="+25 cr" nextThreshold={75} remaining="12 pts left" resets="in 6 days" />

            <CampaignExplorerWidget joined={3} target={5} nextReward="+10 cr" />

            {/* Referral rewards — navigation already covers quick actions */}
            <Card padding="md">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: 0 }}>Referral rewards</h3>
                <Icon name="users" size={16} color={colors.accent} />
              </div>
              <div style={{ display: 'flex', gap: 20, marginBottom: 14 }}>
                <Stat label="Invited" value="4" />
                <Stat label="Qualified" value="1" color={colors.success} />
                <Stat label="Earned" value="+10 cr" color={colors.accent} />
              </div>
              <p style={{ font: `400 12px/1.5 ${font.family}`, color: colors.textDim, margin: '0 0 14px' }}>
                Invite friends — earn bonus Credits when they join InScape.
              </p>
              <Button onClick={() => onNavigate('referral')} variant="secondary" size="sm" fullWidth>Invite a friend</Button>
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
