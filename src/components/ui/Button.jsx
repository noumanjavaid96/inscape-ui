import { useState } from 'react';
import tokens from '../../design/tokens';

const { colors, radius, shadow, transition, font } = tokens;

const SIZES = {
  sm: { height: 38, padding: '0 16px', fontSize: 13 },
  md: { height: 46, padding: '0 22px', fontSize: 14 },
  lg: { height: 56, padding: '0 32px', fontSize: 16 },
};

function variantStyle(variant) {
  switch (variant) {
    case 'secondary':
      return {
        base: { background: colors.surfaceHover, border: `1px solid ${colors.borderStrong}`, color: colors.text, boxShadow: 'none' },
        hover: { background: colors.border, boxShadow: 'none' },
      };
    case 'ghost':
      return {
        base: { background: 'transparent', border: '1px solid transparent', color: colors.textMuted, boxShadow: 'none' },
        hover: { background: colors.surfaceHover, color: colors.text },
      };
    case 'danger':
      return {
        base: { background: 'transparent', border: '1px solid rgba(255,68,68,0.3)', color: colors.danger, boxShadow: 'none' },
        hover: { background: 'rgba(255,68,68,0.08)' },
      };
    case 'primary':
    default:
      return {
        base: { background: colors.accent, border: 'none', color: colors.bg, boxShadow: shadow.glow },
        hover: { boxShadow: shadow.glowStrong },
      };
  }
}

/**
 * Primary interactive button.
 *
 * @param {'primary'|'secondary'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const sz = SIZES[size] || SIZES.md;
  const v = variantStyle(variant);
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...v.base,
        ...(hovered && !isDisabled ? v.hover : null),
        height: sz.height,
        padding: sz.padding,
        width: fullWidth ? '100%' : undefined,
        borderRadius: radius.md,
        fontFamily: font.family,
        fontWeight: font.weightMap.semibold,
        fontSize: sz.fontSize,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
        transform: hovered && !isDisabled ? 'translateY(-1px)' : 'none',
        transition: transition.base,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}
