import { useState } from 'react';
import tokens from '../design/tokens';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import FilmGrain from '../components/cinematic/FilmGrain';
import { useReducedMotion } from '../hooks/useReducedMotion';

const { colors, font } = tokens;

const SLIDES = [
  { icon: 'wallet', kicker: 'CAMPAIGN CREDITS', title: 'Credits are your key', body: 'Joining a campaign costs Credits. You start with 3 free. Membership and top-ups keep you going — and your Credits never expire.', accent: colors.accent },
  { icon: 'grid', kicker: 'DISCOVER', title: 'Join the campaigns you love', body: 'Browse live campaigns across travel, vehicles, tech and more. One Credit joins you to a campaign — add more to boost your participation.', accent: colors.accent },
  { icon: 'bolt', kicker: 'MOMENTUM', title: 'Earn as you go', body: 'Reach 25%, 50%, 75% and 100% participation milestones each month and earn bonus Credits automatically — up to 90 every month.', accent: colors.info },
  { icon: 'users', kicker: 'REFER & EARN', title: 'Bring your friends', body: 'Share your code. When a friend qualifies you earn +40 Momentum plus bonus Credits. There is no cap on referrals.', accent: colors.info },
];

function Orb({ icon, accent, reduced }) {
  const blue = accent === colors.info;
  return (
    <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 36px' }}>
      <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: `radial-gradient(circle, ${blue ? 'rgba(71,199,252,0.18)' : 'rgba(245,133,46,0.18)'}, transparent 70%)`, filter: 'blur(4px)' }} />
      <div
        className="liquid-glass"
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${blue ? 'rgba(71,199,252,0.35)' : colors.accentBorder}`,
          animation: reduced ? 'none' : (blue ? 'none' : 'orbGlow 4s ease-in-out infinite'),
        }}
      >
        <Icon name={icon} size={46} color={accent} />
      </div>
    </div>
  );
}

export default function Onboarding({ onNavigate }) {
  const [slide, setSlide] = useState(0);
  const reduced = useReducedMotion();
  const s = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;
  const blueTheme = slide >= 2;

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(60% 50% at 50% 38%, ${blueTheme ? 'rgba(71,199,252,0.09)' : 'rgba(245,133,46,0.10)'}, transparent)`, transition: 'background 0.6s ease', pointerEvents: 'none' }} />
      <FilmGrain />

      <button onClick={() => onNavigate('campaigns')} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', font: `500 14px ${font.family}`, color: colors.textDim, cursor: 'pointer', zIndex: 2 }}>Skip</button>

      <div style={{ width: '100%', maxWidth: 460, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div key={slide} style={{ animation: reduced ? 'none' : 'slideIn 0.5s cubic-bezier(.2,.7,.2,1) both' }}>
          <Orb icon={s.icon} accent={s.accent} reduced={reduced} />
          <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.18em', color: s.accent, marginBottom: 14 }}>{s.kicker}</div>
          <h1 style={{ font: `600 38px/1.1 ${font.display}`, color: colors.text, margin: '0 0 16px' }}>{s.title}</h1>
          <p style={{ font: `400 16px/1.7 ${font.family}`, color: colors.textMuted, margin: '0 auto', maxWidth: 380 }}>{s.body}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 7, margin: '36px 0 32px' }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to step ${i + 1}`}
              onClick={() => setSlide(i)}
              style={{ width: i === slide ? 28 : 7, height: 7, borderRadius: 4, border: 'none', padding: 0, background: i === slide ? s.accent : colors.bg5, cursor: 'pointer', transition: 'all 0.3s ease' }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {slide > 0 && (
            <Button onClick={() => setSlide((v) => v - 1)} variant="secondary" size="lg" style={{ minWidth: 120 }}>Back</Button>
          )}
          <Button onClick={() => (isLast ? onNavigate('dashboard') : setSlide((v) => v + 1))} size="lg" style={{ minWidth: 180 }}>
            {isLast ? 'Enter InScape' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
