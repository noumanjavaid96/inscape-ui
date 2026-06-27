import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Stat from '../components/ui/Stat';
import ProgressBar from '../components/ui/ProgressBar';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';
import MomentumWidget from '../components/campaign/MomentumWidget';

const { colors, font } = tokens;

const SUMMARY = [
  { label: 'Campaigns joined', value: '14', color: colors.text },
  { label: 'Credits used', value: '38', color: colors.text },
  { label: 'Momentum', value: '62%', color: colors.info },
  { label: 'Referrals', value: '4', color: colors.text },
];

const MONTHLY = [
  { m: 'Jan', v: 18 }, { m: 'Feb', v: 26 }, { m: 'Mar', v: 22 },
  { m: 'Apr', v: 34 }, { m: 'May', v: 41 }, { m: 'Jun', v: 38 },
];

const CATEGORIES = [
  { label: 'Travel', pct: 42, color: colors.info },
  { label: 'Vehicles', pct: 28, color: colors.accent },
  { label: 'Tech', pct: 18, color: colors.success },
  { label: 'Cash', pct: 12, color: colors.warning },
];

const MILESTONES = [
  { label: 'First campaign joined', done: true },
  { label: 'Reached 50% Momentum', done: true },
  { label: 'Referred a friend who qualified', done: true },
  { label: 'Reach 100% Momentum this month', done: false },
];

export default function Insights() {
  const { isMobile, isDesktop } = useBreakpoint();
  const max = Math.max(...MONTHLY.map((d) => d.v));

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Insights" subtitle="Your participation and Momentum at a glance." />

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
          {SUMMARY.map((s) => (
            <Card key={s.label} padding="md">
              <Stat label={s.label} value={s.value} color={s.color} size="lg" />
            </Card>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 20, marginBottom: 20 }}>
          {/* Monthly credits used — CSS bar chart */}
          <Card padding="md">
            <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: '0 0 18px' }}>Credits used per month</h3>
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

          {/* Momentum */}
          <MomentumWidget value={62} nextReward="+25 cr" nextThreshold={75} resets="14d" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 20 }}>
          {/* Category breakdown */}
          <Card padding="md">
            <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: '0 0 16px' }}>Where you participate</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {CATEGORIES.map((c) => (
                <div key={c.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ font: `500 13px ${font.family}`, color: colors.textMuted }}>{c.label}</span>
                    <span style={{ font: `600 13px ${font.family}`, color: c.color }}>{c.pct}%</span>
                  </div>
                  <ProgressBar value={c.pct} color={c.color} height={7} />
                </div>
              ))}
            </div>
          </Card>

          {/* Milestones */}
          <Card padding="md">
            <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: '0 0 16px' }}>Milestones</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
        </div>
      </div>
    </div>
  );
}
