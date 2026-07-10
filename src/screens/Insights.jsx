import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';
import MomentumWidget from '../components/campaign/MomentumWidget';
import { CAMPAIGNS } from '../data/campaigns';

const { colors, font } = tokens;

const toneSoft = (hex) => {
  const n = hex.replace('#', '');
  return `rgba(${parseInt(n.slice(0, 2), 16)},${parseInt(n.slice(2, 4), 16)},${parseInt(n.slice(4, 6), 16)},0.14)`;
};

const SUMMARY = [
  { label: 'Campaigns joined', value: '14', icon: 'target', tone: colors.accent, note: 'Stay active' },
  { label: 'Credits used', value: '38', icon: 'coins', tone: colors.info, note: 'This month' },
  { label: 'Momentum', value: '62%', icon: 'chart', tone: colors.info, note: 'On track' },
  { label: 'Referrals', value: '4', icon: 'users', tone: colors.success, note: '+2 this month' },
];

const MONTHLY = [
  { m: 'Jan', v: 18 }, { m: 'Feb', v: 26 }, { m: 'Mar', v: 22 },
  { m: 'Apr', v: 34 }, { m: 'May', v: 41 }, { m: 'Jun', v: 38 },
];

const UPCOMING = CAMPAIGNS.slice(0, 5).map((c) => ({
  id: c.id, title: c.title, date: c.drawDate, status: c.status, gradient: c.gradient,
}));

const MILESTONES = [
  { label: 'First campaign joined', done: true },
  { label: 'Reached 50% Momentum', done: true },
  { label: 'Referred a friend who qualified', done: true },
  { label: 'Reach 100% Momentum this month', done: false },
];

const statusStyle = (status) => {
  if (status === 'LIVE') return { bg: colors.accent, fg: '#0B0B0D' };
  return { bg: colors.bg5, fg: colors.textDim };
};

export default function Insights({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();
  const max = Math.max(...MONTHLY.map((d) => d.v));
  const cols3 = isDesktop ? 'repeat(3,1fr)' : isMobile ? '1fr' : 'repeat(3,1fr)';

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Insights" subtitle="Your participation and Momentum at a glance." />

        {/* Summary stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
          {SUMMARY.map((s) => (
            <Card key={s.label} padding="md" style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: toneSoft(s.tone), border: `1px solid ${s.tone}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={s.icon} size={19} color={s.tone} />
              </div>
              <div>
                <div style={{ font: `800 26px/1 ${font.family}`, color: s.label === 'Momentum' ? colors.info : colors.text }}>{s.value}</div>
                <div style={{ font: `400 12px ${font.family}`, color: colors.textDim, marginTop: 4 }}>{s.label}</div>
                <div style={{ font: `500 11px ${font.family}`, color: s.tone, marginTop: 2 }}>{s.note}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Chart + Momentum */}
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 18, marginBottom: 18 }}>
          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: 0 }}>Credits used per month</h3>
              <span style={{ font: `500 12px ${font.family}`, color: colors.textDim, padding: '5px 11px', border: `1px solid ${colors.border}`, borderRadius: 8 }}>Last 6 months</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, height: 150 }}>
              {MONTHLY.map((d) => (
                <div key={d.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ font: `600 11px ${font.family}`, color: colors.textMuted }}>{d.v}</div>
                  <div style={{ width: '100%', maxWidth: 34, height: `${(d.v / max) * 100}%`, borderRadius: 7, background: `linear-gradient(180deg, ${colors.accent}, ${colors.accentDark})`, transition: 'height 0.4s ease' }} />
                  <div style={{ font: `500 11px ${font.family}`, color: colors.textFaint }}>{d.m}</div>
                </div>
              ))}
            </div>
          </Card>

          <MomentumWidget value={62} nextReward="+25 cr" nextThreshold={75} resets="14d" />
        </div>

        {/* Upcoming campaigns / Milestones / Referrals */}
        <div style={{ display: 'grid', gridTemplateColumns: cols3, gap: 18, marginBottom: 18 }}>
          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Icon name="calendar" size={16} color={colors.accent} />
              <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: 0 }}>Upcoming Campaigns</h3>
            </div>
            <p style={{ font: `400 12px ${font.family}`, color: colors.textDim, margin: '0 0 14px' }}>Stay active and make the most of each opportunity.</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {UPCOMING.map((c, i) => {
                const ss = statusStyle(c.status);
                return (
                  <button key={c.id} onClick={() => onNavigate && onNavigate('campaign-detail', { campaignId: c.id })}
                    style={{ display: 'flex', alignItems: 'center', gap: 11, width: '100%', background: 'none', border: 'none', padding: '9px 0', cursor: 'pointer', textAlign: 'left', borderBottom: i < UPCOMING.length - 1 ? `1px solid ${colors.borderFaint}` : 'none' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: c.gradient, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ font: `600 12.5px ${font.family}`, color: colors.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
                      <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint, marginTop: 1 }}>{c.date}</div>
                    </div>
                    <span style={{ font: `700 8.5px ${font.family}`, letterSpacing: '.06em', color: ss.fg, background: ss.bg, borderRadius: 999, padding: '3px 8px', whiteSpace: 'nowrap' }}>{c.status}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={() => onNavigate && onNavigate('campaigns')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', font: `600 12px ${font.family}`, color: colors.accent, padding: '12px 0 0' }}>
              View all campaigns <Icon name="arrowRight" size={13} color={colors.accent} />
            </button>
          </Card>

          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Icon name="trophy" size={16} color={colors.accent} />
              <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: 0 }}>Milestones</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {MILESTONES.map((m) => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: m.done ? 'rgba(91,208,138,0.14)' : colors.bg5, border: `1px solid ${m.done ? 'rgba(91,208,138,0.4)' : colors.border}` }}>
                    <Icon name="check" size={12} color={m.done ? colors.success : colors.textGhost} />
                  </span>
                  <span style={{ font: `500 13px ${font.family}`, color: m.done ? colors.text : colors.textDim }}>{m.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Icon name="users" size={16} color={colors.accent} />
              <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: 0 }}>Referrals Centre</h3>
            </div>
            <p style={{ font: `400 12px ${font.family}`, color: colors.textDim, margin: '0 0 16px' }}>Share and earn Campaign Credits.</p>
            <div style={{ paddingBottom: 14, marginBottom: 14, borderBottom: `1px solid ${colors.borderFaint}` }}>
              <div style={{ font: `800 26px/1 ${font.family}`, color: colors.text }}>4</div>
              <div style={{ font: `400 12px ${font.family}`, color: colors.textDim, marginTop: 3 }}>Total referrals</div>
            </div>
            <div style={{ display: 'flex', gap: 22, marginBottom: 16 }}>
              <div>
                <div style={{ font: `800 20px/1 ${font.family}`, color: colors.text }}>2</div>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint, marginTop: 3 }}>Qualified</div>
              </div>
              <div>
                <div style={{ font: `800 20px/1 ${font.family}`, color: colors.success }}>+80 cr</div>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint, marginTop: 3 }}>Credits earned</div>
              </div>
            </div>
            <button onClick={() => onNavigate && onNavigate('referral')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', height: 40, borderRadius: 10, background: 'transparent', border: `1px solid ${colors.accentBorder}`, cursor: 'pointer', font: `600 12.5px ${font.family}`, color: colors.accent }}>
              Go to Referral Centre <Icon name="arrowRight" size={13} color={colors.accent} />
            </button>
          </Card>
        </div>

        {/* Anniversary / Savings / Offers */}
        <div style={{ display: 'grid', gridTemplateColumns: cols3, gap: 18, marginBottom: 18 }}>
          <Card padding="md" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: toneSoft(colors.accent), border: `1px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="star" size={20} color={colors.accent} />
            </div>
            <div>
              <div style={{ font: `700 12px ${font.family}`, color: colors.accent, marginBottom: 8 }}>Membership Anniversary Summary</div>
              <div style={{ font: `400 11px ${font.family}`, color: colors.textDim }}>Member since</div>
              <div style={{ font: `700 16px ${font.family}`, color: colors.text, marginBottom: 8 }}>June 1, 2024</div>
              <div style={{ font: `400 11px ${font.family}`, color: colors.textDim }}>You have been a member for</div>
              <div style={{ font: `700 15px ${font.family}`, color: colors.accent }}>1 Year, 1 Month</div>
            </div>
          </Card>

          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: toneSoft(colors.success), border: `1px solid ${colors.success}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="gift" size={19} color={colors.success} />
              </div>
              <div>
                <div style={{ font: `700 12px ${font.family}`, color: colors.success }}>Offer Savings</div>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textDim }}>Total saved</div>
              </div>
            </div>
            <div style={{ font: `800 28px/1 ${font.family}`, color: colors.success, marginBottom: 14 }}>$1,248</div>
            <div style={{ display: 'flex', gap: 24 }}>
              <div>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint }}>This month</div>
                <div style={{ font: `700 14px ${font.family}`, color: colors.text }}>$248</div>
              </div>
              <div>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint }}>All time</div>
                <div style={{ font: `700 14px ${font.family}`, color: colors.text }}>$1,248</div>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: toneSoft(colors.accent), border: `1px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="inbox" size={19} color={colors.accent} />
              </div>
              <div>
                <div style={{ font: `700 12px ${font.family}`, color: colors.accent }}>Offers Used</div>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textDim }}>Total offers used</div>
              </div>
            </div>
            <div style={{ font: `800 28px/1 ${font.family}`, color: colors.text, marginBottom: 14 }}>12</div>
            <div style={{ display: 'flex', gap: 24 }}>
              <div>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint }}>This month</div>
                <div style={{ font: `700 14px ${font.family}`, color: colors.text }}>3</div>
              </div>
              <div>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint }}>All time</div>
                <div style={{ font: `700 14px ${font.family}`, color: colors.text }}>12</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer CTA */}
        <Card padding="md" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: toneSoft(colors.accent), border: `1px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="gift" size={20} color={colors.accent} />
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ font: `600 15px ${font.family}`, color: colors.text }}>Great work. You are making the most of your membership.</div>
            <div style={{ font: `400 12.5px ${font.family}`, color: colors.textDim, marginTop: 2 }}>Stay active, keep your Momentum up, and unlock even more opportunities.</div>
          </div>
          <button onClick={() => onNavigate && onNavigate('campaigns')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 20px', borderRadius: 999, background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`, border: 'none', cursor: 'pointer', font: `600 13px ${font.family}`, color: '#0B0B0D' }}>
            Explore Campaigns <Icon name="arrowRight" size={15} color="#0B0B0D" />
          </button>
        </Card>
      </div>
    </div>
  );
}
