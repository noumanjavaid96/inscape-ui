import tokens from '../design/tokens';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import FadeIn from '../components/cinematic/FadeIn';
import FilmGrain from '../components/cinematic/FilmGrain';
import { useReducedMotion } from '../hooks/useReducedMotion';

const { colors, font, radius } = tokens;

const STEPS = [
  { icon: 'wallet', title: '3 Credits, on us', body: 'No card needed — and your Credits never expire.' },
  { icon: 'grid', title: 'Join campaigns', body: 'Browse live campaigns and join with your Credits.' },
  { icon: 'bolt', title: 'Earn Momentum', body: 'Hit milestones each month for bonus Credits.' },
];

export default function Welcome({ onNavigate }) {
  const reduced = useReducedMotion();
  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 50% at 50% 36%, rgba(245,133,46,0.12), transparent)', pointerEvents: 'none' }} />
      <FilmGrain />
      <div style={{ width: '100%', maxWidth: 460, textAlign: 'center', position: 'relative', zIndex: 1 }}>

        <FadeIn delay={100} duration={800}>
          <div style={{ position: 'relative', width: 104, height: 104, margin: '0 auto 26px' }}>
            <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,133,46,0.22), transparent 70%)', filter: 'blur(4px)' }} />
            <div className="liquid-glass" style={{ position: 'absolute', inset: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.accentBorder}`, animation: reduced ? 'none' : 'orbGlow 4s ease-in-out infinite' }}>
              <Icon name="sparkle" size={44} color={colors.accent} />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={300} duration={800}>
          <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.18em', color: colors.accent, marginBottom: 12 }}>WELCOME TO INSCAPE</div>
          <h1 style={{ font: `700 44px/1.05 ${font.display}`, color: colors.text, margin: '0 0 12px', letterSpacing: '-.01em' }}>You’re in. Let’s begin.</h1>
          <p style={{ font: `400 16px/1.6 ${font.family}`, color: colors.textMuted, margin: '0 0 32px' }}>Your <strong style={{ color: colors.text }}>3 free Credits</strong> are ready. Here is how it works:</p>
        </FadeIn>

        <FadeIn delay={500} duration={800}>
          <div className="liquid-glass" style={{ borderRadius: radius.xl, padding: '22px 24px', marginBottom: 22, textAlign: 'left' }}>
            {STEPS.map((s, i) => (
              <div key={s.title} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < STEPS.length - 1 ? `1px solid ${colors.borderFaint}` : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: radius.md, background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={s.icon} size={20} color={colors.accent} />
                </div>
                <div>
                  <div style={{ font: `600 15px ${font.family}`, color: colors.text }}>{s.title}</div>
                  <div style={{ font: `400 13px ${font.family}`, color: colors.textDim, marginTop: 1 }}>{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={700} duration={800}>
          <Button onClick={() => onNavigate('onboarding')} fullWidth size="lg" style={{ marginBottom: 10 }}>
            Use my 3 Credits
          </Button>
          <Button onClick={() => onNavigate('campaigns')} variant="ghost" fullWidth size="md">
            Skip to campaigns
          </Button>
        </FadeIn>
      </div>
    </div>
  );
}
