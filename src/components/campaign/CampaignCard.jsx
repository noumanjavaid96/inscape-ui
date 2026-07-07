import { useState } from 'react';
import tokens from '../../design/tokens';
import Icon from '../ui/Icon';
import StatusPill from './StatusPill';

const { colors, radius, font } = tokens;

// Days remaining, floored — the card shows one calm "Xd left" line instead of
// a ticking multi-tile countdown (the detail page keeps the live countdown).
const daysLeft = (t) => {
  if (!t) return null;
  const d = Math.floor((t - Date.now()) / 86400000);
  return `${Math.max(d, 0)}d left`;
};

/**
 * Campaign card — deliberately minimal: tall image, category eyebrow, title,
 * and a single "time left / credits" footer row. Status pills only appear for
 * non-live states; everything else lives on the campaign detail page.
 *
 * @param {'sm'|'md'|'lg'} size  sm - compact grids · md/lg - taller feature grids
 */
export default function CampaignCard({ campaign, onClick, size = 'md', style }) {
  const [hovered, setHovered] = useState(false);
  const c = campaign;
  const glow = c.glow || 'rgba(245,133,46,0.12)';
  const upcoming = c.status === 'UPCOMING';
  const timeLabel = upcoming ? (c.startsIn || 'Opening soon') : daysLeft(c.closesAt) || c.timeLeft || '';

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
      {/* Tall editorial image */}
      <div style={{ position: 'relative', aspectRatio: size === 'sm' ? '4 / 3.4' : '4 / 4.4', background: c.gradient, overflow: 'hidden' }}>
        {c.image && (
          <img
            src={c.image}
            alt={c.title}
            loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.45s ease' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        )}
        {/* Only surface a pill when the state is not the default LIVE */}
        {c.status && c.status !== 'LIVE' && (
          <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
            <StatusPill status={c.status} size="sm" />
          </div>
        )}
      </div>

      {/* Minimal body */}
      <div style={{ padding: size === 'sm' ? '13px 15px 14px' : '15px 17px 16px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        <div style={{ font: `700 10px ${font.family}`, letterSpacing: '.12em', textTransform: 'uppercase', color: colors.accent }}>
          {c.category}
        </div>
        <div style={{ font: `600 ${size === 'sm' ? 15 : 17}px/1.25 ${font.family}`, color: colors.text }}>
          {c.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: `400 12px ${font.family}`, color: colors.textDim }}>
            <Icon name="clock" size={12} color={colors.textDim} /> {timeLabel}
          </span>
          {c.cost != null && (
            <span style={{ font: `600 12px ${font.family}`, color: colors.text }}>
              {c.cost} {c.cost === 1 ? 'credit' : 'credits'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
