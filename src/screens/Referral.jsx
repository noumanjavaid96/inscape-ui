import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';

const { colors, font, radius } = tokens;

const INVITES = [
  { name: 'Sam R.', status: 'Qualified · Reward earned', statusColor: colors.success, reward: '+40 Campaign Credits', date: 'May 20' },
  { name: 'Jordan P.', status: 'Joined · Qualification pending', statusColor: colors.info, reward: 'In progress', date: 'May 15' },
  { name: 'Emma T.', status: 'Invitation sent', statusColor: colors.textDim, reward: 'Awaiting signup', date: 'Jun 1' },
];

const STEPS = [
  { num: '01', icon: 'users', title: 'Invite', body: 'Share your unique invite link.', color: colors.accent },
  { num: '02', icon: 'check', title: 'They qualify', body: 'Your friend completes the required qualifying action.', color: colors.info },
  { num: '03', icon: 'gift', title: 'You earn', body: 'Bonus Campaign Credits are added to your account.', color: colors.success },
];

export default function Referral() {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 940, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Referral centre" subtitle="Invite friends to join InScape and earn bonus Campaign Credits when they qualify." />

        <div style={{ background: colors.bg3, border: `1px solid ${colors.info}33`, borderRadius: radius.xl, padding: '28px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 60% at 80% 20%, rgba(71,199,252,0.08), transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ font: `500 13px ${font.family}`, color: colors.textDim, marginBottom: 6 }}>Your referral code</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ font: `700 36px/1 ${font.family}`, color: colors.text, letterSpacing: '.06em' }}>ALEX-7K2P</div>
              <button style={{ height: 40, padding: '0 18px', borderRadius: radius.sm, background: 'rgba(71,199,252,0.1)', border: `1px solid ${colors.info}4d`, cursor: 'pointer', font: `600 13px ${font.family}`, color: colors.info }}>Copy code</button>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
              <button style={{ flex: 1, minWidth: 140, height: 46, borderRadius: radius.md, background: colors.info, border: 'none', cursor: 'pointer', font: `600 14px ${font.family}`, color: colors.bg }}>Share invite link</button>
              <button style={{ flex: 1, minWidth: 140, height: 46, borderRadius: radius.md, background: colors.surfaceHover, border: `1px solid ${colors.borderStrong}`, cursor: 'pointer', font: `600 14px ${font.family}`, color: colors.text }}>Share via WhatsApp</button>
            </div>
          </div>
        </div>

        <Card padding="lg" style={{ marginBottom: 24 }}>
          <h2 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: '0 0 22px' }}>How referral rewards work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 20 : 8, alignItems: 'start' }}>
            {STEPS.map((s, i) => (
              <div key={s.title} style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'stretch' }}>
                <div style={{ textAlign: isMobile ? 'left' : 'center', flex: 1 }}>
                  <div style={{ position: 'relative', width: 58, height: 58, margin: isMobile ? '0 0 12px' : '0 auto 14px' }}>
                    <div style={{ width: 58, height: 58, borderRadius: '50%', background: `${s.color}1f`, border: `1.5px solid ${s.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={s.icon} size={22} color={s.color} />
                    </div>
                    <span style={{ position: 'absolute', top: -6, right: isMobile ? 'auto' : -6, left: isMobile ? 42 : 'auto', font: `700 11px ${font.family}`, color: s.color }}>{s.num}</span>
                  </div>
                  <div style={{ font: `600 15px ${font.family}`, color: colors.text, marginBottom: 6 }}>{s.title}</div>
                  <div style={{ font: `400 12.5px/1.5 ${font.family}`, color: colors.textDim, maxWidth: 190, margin: isMobile ? 0 : '0 auto' }}>{s.body}</div>
                </div>
                {!isMobile && i < STEPS.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', paddingTop: 22 }}>
                    <Icon name="arrowRight" size={16} color={colors.textGhost} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 280px' : '1fr', gap: 20, alignItems: 'start' }}>
          <Card padding="lg" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 22px', borderBottom: `1px solid ${colors.borderFaint}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: 0 }}>Referral activity</h2>
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

          {/* Rewards summary — trophy card per the client render */}
          <Card padding="md" style={{ textAlign: 'center' }}>
            <div style={{ font: `700 11.5px ${font.family}`, letterSpacing: '.12em', textTransform: 'uppercase', color: colors.accent, marginBottom: 18 }}>Your referral rewards</div>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: colors.accentSoft, border: `1.5px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Icon name="trophy" size={28} color={colors.accent} />
            </div>
            <div style={{ font: `800 40px/1 ${font.family}`, color: colors.text }}>40</div>
            <div style={{ font: `400 13px ${font.family}`, color: colors.textDim, marginTop: 6, paddingBottom: 16, borderBottom: `1px solid ${colors.borderFaint}` }}>Campaign Credits earned</div>
            <div style={{ font: `800 22px/1 ${font.family}`, color: colors.accent, marginTop: 16 }}>2</div>
            <div style={{ font: `400 12.5px ${font.family}`, color: colors.textDim, marginTop: 4 }}>Referrals in progress</div>
          </Card>
        </div>

        <p style={{ font: `400 11px/1.6 ${font.family}`, color: colors.textGhost, marginTop: 20 }}>
          Referral rewards are awarded when the referred member completes their first qualifying purchase. No cap on referrals.
        </p>
      </div>
    </div>
  );
}
