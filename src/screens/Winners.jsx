import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';
import { PAST_WINNERS } from '../data/campaigns';

const { colors, font, radius } = tokens;

const TRUST = [
  ['Independently witnessed', 'Every draw is run under independent supervision.'],
  ['Fully audited', 'Selection evidence and approvals are recorded for every campaign.'],
  ['Winners published', 'Results are published transparently once verified.'],
];

export default function Winners() {
  const { isMobile, isDesktop } = useBreakpoint();
  const [featured, ...rest] = PAST_WINNERS;

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Winners" subtitle="Real members, real prizes — every draw witnessed and audited." />

        {/* Featured winner */}
        <Card padding="lg" gradient style={{ marginBottom: 28, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, background: 'radial-gradient(50% 50%, rgba(245,133,46,0.12), transparent)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Icon name="trophy" size={20} color={colors.accent} />
            <span style={{ font: `600 11px ${font.family}`, letterSpacing: '.14em', color: colors.accent }}>LATEST WINNER</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 24, alignItems: 'center' }}>
            <div>
              <div style={{ font: `400 12px ${font.family}`, color: colors.textDim }}>{featured.category} · {featured.prize}</div>
              <h2 style={{ font: `700 clamp(28px,3.5vw,40px)/1.05 ${font.display}`, color: colors.text, margin: '6px 0 14px' }}>{featured.title}</h2>
              <p style={{ font: `400 15px/1.6 ${font.family}`, color: colors.textMuted, margin: 0 }}>
                Won by <strong style={{ color: colors.text }}>{featured.winner}</strong> from {featured.location}, drawn {featured.date}.
              </p>
            </div>
            <div style={{ height: 180, borderRadius: radius.lg, background: featured.gradient, border: `1px solid ${colors.border}`, overflow: 'hidden', position: 'relative' }}>
              {featured.image && <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
            </div>
          </div>
        </Card>

        {/* Winner gallery */}
        <h3 style={{ font: `600 18px ${font.family}`, color: colors.text, margin: '0 0 16px' }}>Recent winners</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3,1fr)' : isMobile ? '1fr' : 'repeat(2,1fr)', gap: 20, marginBottom: 40 }}>
          {rest.map((w) => (
            <div key={w.id} style={{ background: colors.bg3, border: `1px solid ${colors.border}`, borderRadius: radius.xl, overflow: 'hidden' }}>
              <div style={{ height: 120, background: w.gradient, position: 'relative', overflow: 'hidden' }}>
                {w.image && <img src={w.image} alt={w.title} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(13,15,18,0.6),transparent 60%)' }} />
                <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
                  <Badge label="WINNER" color="green" size="sm" />
                </div>
              </div>
              <div style={{ padding: '16px 18px 18px' }}>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textDim }}>{w.category} · {w.prize}</div>
                <div style={{ font: `700 20px/1.1 ${font.display}`, color: colors.text, marginTop: 4 }}>{w.title}</div>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.borderFaint}`, font: `500 13px ${font.family}`, color: colors.textMuted }}>
                  {w.winner}, {w.location}
                  <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint, marginTop: 2 }}>{w.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 14 }}>
          {TRUST.map(([t, b]) => (
            <Card key={t} padding="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Icon name="check" size={15} color={colors.success} />
                <span style={{ font: `600 14px ${font.family}`, color: colors.text }}>{t}</span>
              </div>
              <p style={{ font: `400 13px/1.55 ${font.family}`, color: colors.textDim, margin: 0 }}>{b}</p>
            </Card>
          ))}
        </div>

        <p style={{ font: `400 11px/1.6 ${font.family}`, color: colors.textGhost, marginTop: 24 }}>
          Winner names and locations are shared with consent. See Official Rules for full selection and publication procedures.
        </p>
      </div>
    </div>
  );
}
