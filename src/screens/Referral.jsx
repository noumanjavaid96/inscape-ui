import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import PageHeader from '../components/layout/PageHeader';

const { colors, font, radius } = tokens;

const INVITES = [
  { name: 'Sam R.', status: 'Qualified', statusColor: colors.success, reward: '+40 Momentum', date: 'May 20' },
  { name: 'Jordan P.', status: 'Pending', statusColor: colors.warning, reward: 'Awaiting first purchase', date: 'May 15' },
  { name: 'Emma T.', status: 'Invited', statusColor: colors.textDim, reward: 'Not yet active', date: 'Jun 1' },
];

const STEPS = [
  ['Invite', 'Share your code with friends', colors.accent],
  ['Qualify', 'They complete their first purchase', colors.info],
  ['Earn', '+40 Momentum plus bonus credits', colors.success],
];

export default function Referral() {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Referral Centre" subtitle="Share your code. Earn when friends qualify." />

        <div style={{ background: 'linear-gradient(135deg,#0d1422,#080c14)', border: `1px solid ${colors.info}33`, borderRadius: radius.xl, padding: '28px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 60% at 80% 20%, rgba(71,199,252,0.08), transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ font: `500 13px ${font.family}`, color: colors.textDim, marginBottom: 6 }}>Your referral code</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ font: `700 36px/1 ${font.family}`, color: colors.text, letterSpacing: '.06em' }}>ALEX-7K2P</div>
              <button style={{ height: 40, padding: '0 18px', borderRadius: radius.sm, background: 'rgba(71,199,252,0.1)', border: `1px solid ${colors.info}4d`, cursor: 'pointer', font: `600 13px ${font.family}`, color: colors.info }}>Copy code</button>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
              <button style={{ flex: 1, minWidth: 140, height: 46, borderRadius: radius.md, background: colors.info, border: 'none', cursor: 'pointer', font: `600 14px ${font.family}`, color: colors.bg }}>Share invite link</button>
              <button style={{ flex: 1, minWidth: 140, height: 46, borderRadius: radius.md, background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.borderStrong}`, cursor: 'pointer', font: `600 14px ${font.family}`, color: colors.text }}>Share via WhatsApp</button>
            </div>
          </div>
        </div>

        <Card padding="md" style={{ marginBottom: 24 }}>
          <h2 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: '0 0 14px' }}>How referral rewards work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 12 }}>
            {STEPS.map(([t, b, c]) => (
              <div key={t} style={{ background: colors.bg5, borderRadius: radius.md, padding: '16px' }}>
                <div style={{ font: `600 14px ${font.family}`, color: c, marginBottom: 6 }}>{t}</div>
                <div style={{ font: `400 12px/1.5 ${font.family}`, color: colors.textDim }}>{b}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="lg" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 22px', borderBottom: `1px solid ${colors.borderFaint}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: 0 }}>Your invites</h2>
            <span style={{ font: `500 13px ${font.family}`, color: colors.accent }}>{INVITES.length} total</span>
          </div>
          {INVITES.map((inv, i) => (
            <div key={inv.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderBottom: i < INVITES.length - 1 ? `1px solid ${colors.borderFaint}` : 'none' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: colors.bg5, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `600 14px ${font.family}`, color: colors.textDim, flexShrink: 0 }}>{inv.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ font: `500 14px ${font.family}`, color: colors.text }}>{inv.name}</div>
                <div style={{ font: `400 12px ${font.family}`, color: colors.textFaint, marginTop: 2 }}>{inv.reward}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ font: `600 12px ${font.family}`, color: inv.statusColor }}>{inv.status}</div>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textGhost, marginTop: 1 }}>{inv.date}</div>
              </div>
            </div>
          ))}
        </Card>

        <p style={{ font: `400 11px/1.6 ${font.family}`, color: colors.textGhost, marginTop: 20 }}>
          Referral rewards are awarded when the referred member completes their first qualifying purchase. No cap on referrals.
        </p>
      </div>
    </div>
  );
}
