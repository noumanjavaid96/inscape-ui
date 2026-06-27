import { useState } from 'react';
import tokens from '../design/tokens';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const { colors, font } = tokens;

const SLIDES = [
  { icon: 'wallet', title: 'Campaign Credits', body: 'Joining a campaign costs credits. You start with 3 free. Membership or top-ups keep you going. Credits are yours — they never expire.', accent: colors.accent },
  { icon: 'grid', title: 'Discover Campaigns', body: 'Browse live campaigns in Travel, Vehicles, Tech and more. One credit joins you to a campaign. Add more credits to boost your participation.', accent: colors.accent },
  { icon: 'bolt', title: 'Earn Momentum', body: 'Hit 25%, 50%, 75%, 100% participation milestones each month and earn bonus credits automatically — up to 90 per month.', accent: colors.info },
  { icon: 'users', title: 'Refer and Earn', body: 'Share your code. When a friend qualifies, you earn +40 Momentum plus bonus credits. No cap on referrals.', accent: colors.info },
];

export default function Onboarding({ onNavigate }) {
  const [slide, setSlide] = useState(0);
  const s = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(60% 50% at 50% 40%, ${slide >= 2 ? 'rgba(71,199,252,0.08)' : 'rgba(255,128,0,0.08)'}, transparent)`, transition: 'background 0.4s', pointerEvents: 'none' }} />

      <button onClick={() => onNavigate('campaigns')} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', font: `500 14px ${font.family}`, color: colors.textDim, cursor: 'pointer' }}>Skip</button>

      <div style={{ width: '100%', maxWidth: 480, textAlign: 'center', position: 'relative' }}>
        <div style={{ width: 96, height: 96, borderRadius: '50%', background: slide >= 2 ? 'rgba(71,199,252,0.1)' : colors.accentSoft, border: `1px solid ${s.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', transition: 'all 0.3s' }}>
          <Icon name={s.icon} size={44} color={s.accent} />
        </div>

        <h1 style={{ font: `600 36px/1.1 ${font.display}`, color: colors.text, margin: '0 0 14px' }}>{s.title}</h1>
        <p style={{ font: `400 16px/1.65 ${font.family}`, color: colors.textMuted, margin: '0 0 40px', maxWidth: 360, display: 'inline-block' }}>{s.body}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 32 }}>
          {SLIDES.map((_, i) => (
            <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 24 : 6, height: 6, borderRadius: 3, background: i === slide ? s.accent : colors.bg4, transition: 'all 0.2s', cursor: 'pointer' }} />
          ))}
        </div>

        <Button onClick={() => isLast ? onNavigate('campaigns') : setSlide(v => v + 1)} fullWidth size="lg">
          {isLast ? 'Explore campaigns' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
