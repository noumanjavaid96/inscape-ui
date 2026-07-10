import { useState, useEffect } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';
import Section from '../components/layout/Section';
import CampaignCard from '../components/campaign/CampaignCard';
import FeaturedCampaign from '../components/campaign/FeaturedCampaign';
import MomentumWidget from '../components/campaign/MomentumWidget';
import CampaignExplorerWidget from '../components/campaign/CampaignExplorerWidget';
import PartnerOffers from '../components/brand/PartnerOffers';
import { CAMPAIGNS } from '../data/campaigns';

const { colors, font } = tokens;

// The dashboard shows a preview only — one featured cover + two cards — then a
// "Show more" button routes to the full Campaigns page (client feedback).
const FEATURED = CAMPAIGNS[0];
const MONTH_CAMPAIGNS = CAMPAIGNS.slice(1, 3);

// Soonest-closing campaigns for the urgency rail.
const CLOSING_SOON = [...CAMPAIGNS]
  .filter((c) => c.closesAt && c.status !== 'UPCOMING')
  .sort((a, b) => a.closesAt - b.closesAt)
  .slice(0, 3);

// High-level summary only — detailed breakdowns live in Insights. Each card
// carries a headline number plus a month-over-month delta footer.
const SUMMARY_STATS = [
  { key: 'bonus', label: 'Bonus Credits', value: '+20', sub: 'Credits earned', icon: 'sparkle', tone: colors.accent, deltaIcon: 'trendUp', delta: '+8 this month', note: 'Keep it going' },
  { key: 'days', label: 'Days Active', value: '14', sub: 'Days logged in this month', icon: 'calendar', tone: colors.info, deltaIcon: 'calendar', delta: '+3 vs last month', note: 'Great consistency' },
  { key: 'used', label: 'Credits Used', value: '38', sub: 'Credits used this month', icon: 'coins', tone: colors.success, deltaIcon: 'arrowDown', delta: '-12 vs last month', note: 'Smart spending' },
];

// Referral funnel — shown as a stepped progress rail on the dashboard. Green
// keeps it distinct from the orange used elsewhere on the dashboard.
const REFERRAL_STEPS = [
  { value: '4', label: 'Invited', done: true },
  { value: '1', label: 'Qualified', done: true },
  { value: '+10', label: 'Earned', done: false },
];

// Turn a solid tone into a faint fill for the icon chip backgrounds.
const toneSoft = (hex) => {
  const n = hex.replace('#', '');
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r},${g},${b},0.13)`;
};

const TRANSACTIONS = [
  { label: 'Monthly Premium allocation', detail: 'June 1, 2026', amount: '+120', iconName: 'arrowDown', color: colors.success },
  { label: 'Range Rover allocation', detail: 'May 30, 2026', amount: '-2', iconName: 'arrowUp', color: colors.accent },
  { label: 'Momentum reward · 50%', detail: 'May 28, 2026', amount: '+10', iconName: 'bolt', color: colors.info },
];

// Member state drives the dashboard variant. Wire to real auth/billing later.
// One of: 'free' | 'member' | 'past-due'
const MEMBER_STATE = 'member';

const VARIANTS = {
  free: { balance: '3', tier: 'Free', cta: 'Become a member', ctaAction: 'membership' },
  member: { balance: '124', tier: 'Premium', cta: 'Boost Credits', ctaAction: 'boost' },
  'past-due': { balance: '124', tier: 'Past due', cta: 'Update payment', ctaAction: 'membership' },
};

const closesIn = (t) => {
  if (!t) return '—';
  const ms = t - Date.now();
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  return d > 0 ? `${d}d ${h}h` : `${h}h`;
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
              <div className="shimmer" style={{ height: 420 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                {[0, 1, 2].map((i) => <div key={i} className="shimmer" style={{ height: 110 }} />)}
              </div>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

            {/* High-level analytics on top — details live in Insights */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
              {SUMMARY_STATS.map((s) => (
                <Card key={s.key} padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: 18, minHeight: isDesktop ? 178 : undefined }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: toneSoft(s.tone), border: `1px solid ${s.tone}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={s.icon} size={19} color={s.tone} />
                    </div>
                    <span style={{ font: `700 11px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: s.tone }}>{s.label}</span>
                  </div>
                  <div>
                    <div style={{ font: `800 42px/1 ${font.family}`, letterSpacing: '-0.02em', color: colors.text }}>{s.value}</div>
                    <div style={{ font: `400 13px ${font.family}`, color: colors.textDim, marginTop: 8 }}>{s.sub}</div>
                  </div>
                  <div style={{ height: 1, background: colors.borderFaint }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: toneSoft(s.tone), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={s.deltaIcon} size={15} color={s.tone} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ font: `700 13px ${font.family}`, color: colors.text }}>{s.delta}</div>
                      <div style={{ font: `400 12px ${font.family}`, color: colors.textFaint, marginTop: 1 }}>{s.note}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Campaigns preview: one featured cover, two cards. Stretches to fill
                the column so the cards bottom-align with the right rail (the two
                cards absorb any slack via their flex:1 bodies). */}
            <Section title="This month's campaigns" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                <FeaturedCampaign campaign={FEATURED} compact={isMobile} onOpen={() => onNavigate('campaign-detail', { campaignId: FEATURED.id })} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gridTemplateRows: isDesktop ? 'minmax(0, 1fr)' : 'auto', gap: 14, flex: isDesktop ? 1 : 'none' }}>
                  {MONTH_CAMPAIGNS.map(c => (
                    <CampaignCard
                      key={c.title}
                      campaign={c}
                      size="sm"
                      onClick={() => onNavigate('campaign-detail', { campaignId: c.id })}
                    />
                  ))}
                </div>
              </div>
            </Section>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

            {/* Wallet */}
            <Card gradient padding="md">
              <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.14em', color: colors.textDim, marginBottom: 10 }}>YOUR WALLET</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
                <span style={{ font: `600 52px/0.9 ${font.display}`, color: colors.text }}>{v.balance}</span>
                <span style={{ font: `400 14px ${font.family}`, color: colors.textDim }}>credits available</span>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button
                  onClick={() => onNavigate('boost')}
                  style={{ flex: 1, height: 42, borderRadius: 999, background: '#F4EFE7', border: 'none', cursor: 'pointer', font: `600 13px ${font.family}`, color: '#1c1712' }}
                >Top up</button>
                <button
                  onClick={() => onNavigate('membership')}
                  style={{ flex: 1, height: 42, borderRadius: 999, background: 'transparent', border: `1px solid ${colors.borderStrong}`, cursor: 'pointer', font: `600 13px ${font.family}`, color: colors.text }}
                >{MEMBER_STATE === 'free' ? 'Upgrade' : 'Manage plan'}</button>
              </div>
            </Card>

            <MomentumWidget value={72} nextReward="+25 cr" nextThreshold={75} remaining="12 pts left" resets="in 6 days" />

            <CampaignExplorerWidget joined={3} target={5} nextReward="+10 cr" />

            {MEMBER_STATE === 'free' && (
              <Card padding="md" style={{ border: `1px solid ${colors.accentBorder}`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, background: 'radial-gradient(circle, rgba(238,140,70,0.10), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.14em', color: colors.accent, marginBottom: 8 }}>BECOME A MEMBER</div>
                <div style={{ font: `600 24px/1.1 ${font.display}`, color: colors.text, marginBottom: 8 }}>Unlock 120 credits, monthly.</div>
                <p style={{ font: `400 13px/1.55 ${font.family}`, color: colors.textDim, margin: '0 0 12px' }}>Premium members get monthly Credits, priority access, and the full Offers Hub.</p>
                <button onClick={() => onNavigate('membership')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', font: `600 13px ${font.family}`, color: colors.accent, padding: 0 }}>
                  See plans <Icon name="arrowRight" size={14} color={colors.accent} />
                </button>
              </Card>
            )}

            {/* Referral rewards — stepped funnel progress. Green keeps this rail
                distinct from the orange used elsewhere on the dashboard. */}
            <Card padding="md">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: 0 }}>Referral rewards</h3>
                <Icon name="users" size={16} color={colors.success} />
              </div>

              <div style={{ position: 'relative', marginBottom: 20 }}>
                {/* connecting track */}
                <div style={{ position: 'absolute', top: 21, left: '16.66%', right: '16.66%', height: 3, background: colors.bg4, borderRadius: 2 }}>
                  <div style={{ width: '50%', height: '100%', background: colors.success, borderRadius: 2 }} />
                </div>
                {/* milestone nodes */}
                <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
                  {REFERRAL_STEPS.map((step) => (
                    <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: step.done ? 'rgba(91,208,138,0.14)' : colors.bg4,
                        border: `1.5px solid ${step.done ? colors.success : colors.border}`,
                        font: `700 15px ${font.family}`, color: step.done ? colors.success : colors.textMuted,
                      }}>
                        {step.value}
                      </div>
                      <span style={{ font: `500 11px ${font.family}`, color: colors.textDim }}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={() => onNavigate('referral')} variant="secondary" size="sm" fullWidth>Invite a friend</Button>
            </Card>

            {/* Closing Soon removed to prevent redundancy */}

            {/* Recent activity stretches so the rail bottom-aligns with the
                campaign grid, with a pinned footer link filling the slack */}
            <Card padding="md" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: '0 0 14px' }}>Recent activity</h3>
              <div>
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
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                <Button onClick={() => onNavigate('wallet')} variant="ghost" size="sm" fullWidth>View all activity</Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Show more — full-width so it reads as intentional, not a stray button
            hanging off the left column */}
        <button
          onClick={() => onNavigate('campaigns')}
          style={{ width: '100%', height: 48, marginTop: 20, borderRadius: 14, background: 'transparent', border: `1px solid ${colors.border}`, color: colors.text, font: `600 14px ${font.family}`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.15s ease' }}
          onMouseEnter={e => { e.currentTarget.style.background = colors.surfaceHover; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          Show more campaigns <Icon name="arrowRight" size={15} color={colors.text} />
        </button>

        {/* Featured partner offers — full-width shelf at the foot of the dashboard */}
        <div style={{ marginTop: 28 }}>
          <Section
            title="Featured partner offers"
            action={<Button onClick={() => onNavigate('offers')} variant="ghost" size="sm">Offers Hub</Button>}
          >
            <PartnerOffers
              limit={isDesktop ? 4 : 2}
              columns={isDesktop ? 'repeat(4,1fr)' : isMobile ? '1fr' : 'repeat(2,1fr)'}
              onSelect={(o) => onNavigate('offer-detail', { slug: o.slug })}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}
