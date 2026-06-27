import { useState } from 'react';
import tokens from '../../design/tokens';
import Icon from '../ui/Icon';
import StatusPill from './StatusPill';

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
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <StatusPill status={c.status} size={size === 'sm' ? 'sm' : 'md'} />
        </div>
        {c.timeLeft && (
          <div
            style={{
              position: 'absolute',
              right: 12,
              top: 12,
              font: `500 11px ${font.family}`,
              color: colors.textMuted,
              background: colors.overlay,
              borderRadius: 7,
              padding: '4px 9px',
            }}
          >
            {c.timeLeft} left
          </div>
        )}
        {size === 'md' && (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(13,15,18,0.7),transparent 60%)' }} />
        )}
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
          {c.allocations != null ? (
            <span style={{ font: `600 13px ${font.family}`, color: colors.textMuted }}>
              Joined: <span style={{ color: colors.accent }}>{c.allocations}</span>
            </span>
          ) : (
            <span style={{ font: `500 12px ${font.family}`, color: colors.textDim }}>{c.participants} participants</span>
          )}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: `600 13px ${font.family}`, color: colors.accent }}>
            Join
            <Icon name="arrowRight" size={14} color={colors.accent} />
          </span>
        </div>
      </div>
    </div>
  );
}
