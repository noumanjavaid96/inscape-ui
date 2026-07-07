import tokens from '../../design/tokens';
import Icon from '../ui/Icon';
import { useCountdown } from '../../hooks/useCountdown';

const { colors, font, radius } = tokens;

const pad2 = (n) => String(n).padStart(2, '0');

/**
 * Large "cover" campaign card used at the top of a campaign collection
 * (dashboard, campaigns page, landing). Full-bleed image, serif title, a live
 * CLOSES-IN countdown, cost, and a "Join for X Credits" CTA. Theme-agnostic —
 * it always renders white text over the photo, so it works on light and dark.
 */
export default function FeaturedCampaign({ campaign: c, onOpen, compact = false, kicker = 'LIVE THIS WEEK' }) {
  const t = useCountdown(c.closesAt);
  const upcoming = c.status === 'UPCOMING';

  return (
    <div
      onClick={onOpen}
      style={{
        position: 'relative', borderRadius: radius.xl, overflow: 'hidden', cursor: onOpen ? 'pointer' : 'default',
        minHeight: compact ? 400 : 500, display: 'flex', alignItems: 'flex-end',
        background: c.gradient, border: `1px solid ${colors.border}`,
      }}
    >
      {c.image && (
        <img src={c.image.replace('w=1000', 'w=1600')} alt={c.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,10,8,0.92) 0%, rgba(12,10,8,0.55) 42%, rgba(12,10,8,0.12) 72%, rgba(12,10,8,0.28) 100%)' }} />

      <div style={{ position: 'absolute', top: 22, left: 24, display: 'inline-flex', alignItems: 'center', gap: 8, font: `600 11px ${font.family}`, letterSpacing: '.16em', color: 'rgba(255,255,255,0.9)' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent, animation: upcoming ? 'none' : 'livePulse 2s ease-in-out infinite' }} />
        {upcoming ? 'OPENING SOON' : kicker}
      </div>

      <div style={{ position: 'relative', padding: compact ? '0 22px 24px' : '0 30px 30px', width: '100%' }}>
        <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.14em', color: colors.accent, textTransform: 'uppercase', marginBottom: 8 }}>{c.category}</div>
        <h2 style={{ font: `700 clamp(30px, 3.6vw, 46px)/1.02 ${font.display}`, color: '#fff', margin: '0 0 10px', letterSpacing: '-.01em' }}>{c.title}</h2>
        {c.blurb && <p style={{ font: `400 14px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.82)', margin: '0 0 22px', maxWidth: 500 }}>{c.blurb}</p>}

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 28 }}>
            <div>
              <div style={{ font: `600 10px ${font.family}`, letterSpacing: '.14em', color: 'rgba(255,255,255,0.55)', marginBottom: 6 }}>{upcoming ? 'OPENS' : 'CLOSES IN'}</div>
              {upcoming ? (
                <div style={{ font: `600 20px/1 ${font.display}`, color: '#fff' }}>{c.startsIn || 'Soon'}</div>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  {[[t.days, 'D'], [t.hours, 'H'], [t.minutes, 'M'], [t.seconds, 'S']].map(([v, l]) => (
                    <div key={l} style={{ textAlign: 'center' }}>
                      <div style={{ font: `700 20px/1 ${font.family}`, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{pad2(v)}</div>
                      <div style={{ font: `600 9px ${font.family}`, color: 'rgba(255,255,255,0.5)', letterSpacing: '.1em', marginTop: 3 }}>{l}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onOpen?.(); }}
            style={{ height: 48, padding: '0 24px', borderRadius: 999, background: '#F4EFE7', border: 'none', cursor: 'pointer', font: `600 14px ${font.family}`, color: '#1c1712', display: 'inline-flex', alignItems: 'center', gap: 9 }}
          >
            Join for {c.cost} {c.cost === 1 ? 'Credit' : 'Credits'} <Icon name="arrowRight" size={15} color="#1c1712" />
          </button>
        </div>
      </div>
    </div>
  );
}
