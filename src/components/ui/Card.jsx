import { useState } from 'react';
import tokens from '../../design/tokens';

const { colors, radius, shadow, transition } = tokens;

const PADDING = { sm: '16px 18px', md: '22px 24px', lg: '28px 32px' };

/**
 * Base surface container. Handles hover lift, gradient backgrounds and a
 * coloured accent top-border.
 *
 * @param {'sm'|'md'|'lg'} padding
 * @param {string} accent - hex colour for an accent strip on top.
 */
export default function Card({
  children,
  padding = 'md',
  hover = false,
  gradient = false,
  accent,
  onClick,
  style,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const lift = hover && hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: gradient ? 'linear-gradient(160deg, var(--bg5), var(--bg2))' : colors.bg3,
        border: `1px solid ${lift ? colors.borderStrong : colors.border}`,
        borderTop: accent ? `2px solid ${accent}` : undefined,
        borderRadius: radius.xl,
        padding: PADDING[padding] || PADDING.md,
        cursor: onClick ? 'pointer' : 'default',
        transition: transition.base,
        transform: lift ? 'translateY(-3px)' : 'none',
        boxShadow: lift ? shadow.card : 'none',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
