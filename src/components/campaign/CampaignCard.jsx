import { useState } from 'react';
import tokens from '../../design/tokens';
import Icon from '../ui/Icon';
import StatusPill from './StatusPill';
import { useCountdown } from '../../hooks/useCountdown';

const { colors, radius, font } = tokens;

const pad2 = (n) => String(n).padStart(2, '0');

/**
 * Campaign card: tall image with a live countdown overlaid, category eyebrow,
 * title, and a "Join for X Credits" CTA. Status pills only appear for non-live
 * states.
 *
 * @param {'sm'|'md'|'lg'} size  sm - compact grids · md/lg - taller feature grids
 */
export default function CampaignCard({ campaign, onClick, size = 'md', style }) {
  const [hovered, setHovered] = useState(false);
  const c = campaign;
  const glow = c.glow || 'rgba(238,140,70,0.12)';
  const upcoming = c.status === 'UPCOMING';
  const t = useCountdown(c.closesAt);
  const small = size === 'sm';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.bg3,
        border: `1px solid ${hovered ? colors.borderStrong : colors.border}`,
        borderRadius: radius.xl,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 16px 40px ${glow}` : 'none',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Tall editorial image with the live countdown over a bottom scrim */}
      <div style={{ position: 'relative', aspectRatio: small ? '4 / 3.2' : '4 / 4', background: c.gradient, overflow: 'hidden' }}>
        {c.image && (
          <img
            src={c.image}
            alt={c.title}
            loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.45s ease' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,6,0.72) 0%, rgba(10,8,6,0) 42%)' }} />
        {/* Status pill only for non-default states */}
        {c.status && c.status !== 'LIVE' && (
          <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
            <StatusPill status={c.status} size="sm" />
          </div>
        )}
        {/* Live countdown timer */}
        <div style={{ position: 'absolute', left: 12, bottom: 12, zIndex: 2 }}>
          {upcoming ? (
            <span style={{ font: `600 12px ${font.family}`, color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>{c.startsIn || 'Opening soon'}</span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Icon name="clock" size={13} color="rgba(255,255,255,0.85)" />
              <span style={{ font: `700 13px ${font.family}`, color: '#fff', letterSpacing: '.02em', fontVariantNumeric: 'tabular-nums', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
                {t.days > 0 ? `${t.days}d ` : ''}{pad2(t.hours)}:{pad2(t.minutes)}:{pad2(t.seconds)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: small ? '13px 15px 14px' : '15px 17px 16px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        <div style={{ font: `700 10px ${font.family}`, letterSpacing: '.12em', textTransform: 'uppercase', color: colors.accent }}>
          {c.category}
        </div>
        <div style={{ font: `600 ${small ? 15 : 17}px/1.25 ${font.family}`, color: colors.text }}>
          {c.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 10 }}>
          {c.cost != null && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `600 13px ${font.family}`, color: colors.accent }}>
              Join for {c.cost} {c.cost === 1 ? 'Credit' : 'Credits'}
              <Icon name="arrowRight" size={14} color={colors.accent} />
            </span>
          )}
          {c.prize && (
            <span style={{ font: `500 12px ${font.family}`, color: colors.textFaint }}>{c.prize}</span>
          )}
        </div>
      </div>
    </div>
  );
}
