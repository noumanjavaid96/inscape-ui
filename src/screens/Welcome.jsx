import tokens from '../design/tokens';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const { colors, font, radius } = tokens;

const STEPS = [
  { num: '1', title: 'You have 3 free credits', body: 'No card needed. Credits never expire.' },
  { num: '2', title: 'Join campaigns', body: 'Browse live campaigns and join with your credits.' },
  { num: '3', title: 'Earn Momentum bonuses', body: 'Hit milestones each month for bonus credits.' },
];

export default function Welcome({ onNavigate }) {
  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 50% at 50% 40%, rgba(255,128,0,0.1), transparent)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 480, textAlign: 'center', position: 'relative' }}>
        <div style={{ width: 90, height: 90, borderRadius: '50%', background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <Icon name="star" size={42} color={colors.accent} />
        </div>

        <h1 style={{ font: `700 42px/1.05 ${font.display}`, color: colors.text, margin: '0 0 12px', letterSpacing: '-.01em' }}>Welcome to InScape</h1>
        <p style={{ font: `400 16px/1.6 ${font.family}`, color: colors.textMuted, margin: '0 0 36px' }}>Your 3 free credits are ready to use. Here is how to get started:</p>

        <div style={{ background: colors.bg3, border: `1px solid ${colors.border}`, borderRadius: radius.xl, padding: '24px 28px', marginBottom: 24, textAlign: 'left' }}>
          {STEPS.map(s => (
            <div key={s.num} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,128,0,0.12)', border: `1px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `700 14px ${font.family}`, color: colors.accent, flexShrink: 0 }}>{s.num}</div>
              <div>
                <div style={{ font: `600 15px ${font.family}`, color: colors.text, marginBottom: 3 }}>{s.title}</div>
                <div style={{ font: `400 13px ${font.family}`, color: colors.textDim }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, borderRadius: radius.lg, padding: '10px 20px', marginBottom: 28 }}>
          <Icon name="bolt" size={18} color={colors.accent} />
          <span style={{ font: `600 15px ${font.family}`, color: colors.accent }}>3 credits added to your wallet</span>
        </div>

        <Button onClick={() => onNavigate('onboarding')} fullWidth size="lg" style={{ marginBottom: 10 }}>
          Use my 3 credits
        </Button>
        <Button onClick={() => onNavigate('campaigns')} variant="ghost" fullWidth size="md">
          Skip to campaigns
        </Button>
      </div>
    </div>
  );
}
