import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import PageHeader from '../components/layout/PageHeader';

const { colors, font, radius } = tokens;

const NOTIFS = [
  { time: 'Just now', title: 'Monthly Momentum +25', body: 'You hit 75%, so 25 bonus credits were added to your wallet.', dot: colors.info, fresh: true },
  { time: '2h ago', title: 'Maldives Escape closes in 9h', body: 'You joined with 4 credits. Final chance to add more.', dot: colors.warning, fresh: false },
  { time: '1d ago', title: 'Range Rover Sport, winner announced', body: 'Congratulations to Sarah M. from London. Better luck next campaign.', dot: colors.success, fresh: false },
  { time: '3d ago', title: 'Sam R. qualified, +40 Momentum earned', body: 'Your referral completed their first purchase. Reward posted to wallet.', dot: colors.accent, fresh: false },
  { time: '5d ago', title: '+120 credits added', body: 'Your Premium membership credits for June have been posted.', dot: colors.accent, fresh: false },
];

export default function Notifications({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Notifications" backAction={() => onNavigate('dashboard')} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {NOTIFS.map((n, i) => (
            <div
              key={i}
              style={{ background: n.fresh ? 'rgba(71,199,252,0.04)' : colors.bg2, border: `1px solid ${n.fresh ? `${colors.info}33` : colors.border}`, borderRadius: radius.lg, padding: '16px 18px', display: 'flex', gap: 14, transition: 'background 0.15s' }}
              onMouseEnter={e => { if (!n.fresh) e.currentTarget.style.background = colors.surfaceHover; }}
              onMouseLeave={e => { if (!n.fresh) e.currentTarget.style.background = colors.bg2; }}
            >
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: n.dot, flexShrink: 0, marginTop: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ font: `600 14px ${font.family}`, color: colors.text, flex: 1 }}>{n.title}</div>
                  <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint, flexShrink: 0, whiteSpace: 'nowrap' }}>{n.time}</div>
                </div>
                <div style={{ font: `400 13px/1.55 ${font.family}`, color: colors.textMuted, marginTop: 4 }}>{n.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
