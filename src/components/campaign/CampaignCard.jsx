import { useState } from 'react';
import tokens from '../../design/tokens';
import Icon from '../ui/Icon';
import StatusPill from './StatusPill';
import Countdown from './Countdown';

const { colors, radius, font } = tokens;

/**
 * Campaign card in three sizes.
 *
 * campaign: {
 *   title, category, prize, status, statusColor, timeLeft,
 *   participants, credits, gradient, glow, allocations
 * }
 *
 * @param {'sm'|'md'|'lg'} size
 *   sm - compact list/grid row (dashboard, my-campaigns)
 *   md - standard grid card (campaigns index)
 *   lg - featured hero card (landing page)
 */
export default function CampaignCard({ campaign, onClick, size = 'md', style }) {
  const [hovered, setHovered] = useState(false);
  const c = campaign;
  const heroHeight = size === 'lg' ? 160 : size === 'sm' ? 100 : 160;
  const glow = c.glow || 'rgba(255,128,0,0.12)';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: size === 'lg' ? c.gradient : colors.bg3,
        border: `1px solid ${hovered ? colors.borderStrong : colors.border}`,
        borderRadius: radius.xl,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        transform: hovered ? `translateY(${size === 'lg' ? -4 : -3}px)` : 'none',
        boxShadow: hovered ? `0 16px 40px ${glow}` : 'none',
        ...style,
      }}
    >
      {/* Hero image area */}
      <div
        style={{
          height: heroHeight,
          background:
            size === 'lg'
              ? `radial-gradient(80% 80% at 30% 30%, ${glow.replace(/0?\.\d+\)/, '0.3)')}, transparent)`
              : c.gradient,
          position: 'relative',
        }}
      >
        {c.image && (
          <img
            src={c.image}
            alt={c.title}
            loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        )}
        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
          <StatusPill status={c.status} size={size === 'sm' ? 'sm' : 'md'} />
        </div>
        {size !== 'sm' && (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(13,15,18,0.85),transparent 55%)' }} />
        )}
        {/* Live countdown (or static fallbacks) */}
        <div style={{ position: 'absolute', right: 12, bottom: 12, zIndex: 2 }}>
          {c.closesAt && c.status !== 'UPCOMING' ? (
            <Countdown target={c.closesAt} size="sm" />
          ) : (
            <div style={{ font: `500 11px ${font.family}`, color: colors.textMuted, background: colors.overlay, borderRadius: 7, padding: '4px 9px', backdropFilter: 'blur(8px)' }}>
              {c.startsIn || (c.timeLeft ? `${c.timeLeft} left` : '')}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: size === 'sm' ? '14px 16px 16px' : '16px 18px 18px' }}>
        <div style={{ font: `400 11px ${font.family}`, color: colors.textDim }}>
          {c.category}{c.prize ? ` · ${c.prize}` : ''}
        </div>
        <div
          style={{
            font: `700 ${size === 'sm' ? 18 : 22}px ${font.display}`,
            lineHeight: 1.1,
            color: colors.text,
            marginTop: 4,
          }}
        >
          {c.title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 14,
            paddingTop: 12,
            borderTop: `1px solid ${colors.borderFaint}`,
          }}
        >
          {/* Participant / allocation counts stay hidden by design decision. */}
          <span style={{ font: `500 12px ${font.family}`, color: colors.textDim }}>
            {c.cost ? `${c.cost} ${c.cost === 1 ? 'Credit' : 'Credits'} to join` : `Draw ${c.drawDate}`}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: `600 13px ${font.family}`, color: colors.accent }}>
            Join
            <Icon name="arrowRight" size={14} color={colors.accent} />
          </span>
        </div>
      </div>
    </div>
  );
}
