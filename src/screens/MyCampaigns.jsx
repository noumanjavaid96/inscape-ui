import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import PageHeader from '../components/layout/PageHeader';
import CampaignCard from '../components/campaign/CampaignCard';

const { colors, font, radius } = tokens;

const ACTIVE = [
  { title: 'Range Rover Sport', category: 'Vehicles', prize: '£92,000', allocations: 2, timeLeft: '2d 14h', status: 'LIVE', statusColor: colors.accent, gradient: 'linear-gradient(135deg,#1a2030,#0c1018)', glow: 'rgba(255,128,0,0.12)' },
  { title: '7 Nights, Maldives', category: 'Travel', prize: '£18,500', allocations: 4, timeLeft: '9h 40m', status: 'CLOSING SOON', statusColor: colors.warning, gradient: 'linear-gradient(135deg,#1a1e28,#0c0e18)', glow: 'rgba(240,180,60,0.12)' },
];

const PAST = [
  { title: 'Tesla Model 3', category: 'Vehicles', prize: '£42,000', yours: 1, result: 'Did not win', date: 'Ended May 15' },
  { title: 'NYC Weekend Break', category: 'Travel', prize: '£3,200', yours: 3, result: 'Did not win', date: 'Ended Apr 28' },
];

export default function MyCampaigns({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="My Campaigns" subtitle="Your active and past participations." />

        <div style={{ marginBottom: 36 }}>
          <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.12em', textTransform: 'uppercase', color: colors.accent, marginBottom: 14 }}>Active · {ACTIVE.length}</div>
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(2,1fr)' : '1fr', gap: 16 }}>
            {ACTIVE.map(c => (
              <CampaignCard key={c.title} campaign={c} size="md" onClick={() => onNavigate('campaign-detail')} />
            ))}
          </div>
        </div>

        <div>
          <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.12em', textTransform: 'uppercase', color: colors.textDim, marginBottom: 14 }}>Past · {PAST.length}</div>
          <Card padding="lg" style={{ padding: 0, overflow: 'hidden' }}>
            {PAST.map((c, i) => (
              <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderBottom: i < PAST.length - 1 ? `1px solid ${colors.borderFaint}` : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: radius.md, background: colors.bg5, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ font: `500 14px ${font.family}`, color: colors.textMuted }}>{c.title}</div>
                  <div style={{ font: `400 12px ${font.family}`, color: colors.textFaint, marginTop: 2 }}>{c.date} · joined with {c.yours} credit{c.yours > 1 ? 's' : ''}</div>
                </div>
                <span style={{ font: `500 12px ${font.family}`, color: colors.textFaint }}>{c.result}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
